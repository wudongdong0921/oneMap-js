////////////////////////////////////////////////
// 一张图项目入口
// 穆松鹤
// 2020-09-22 14:53:39
////////////////////////////////////////////////
import './styles.css'
import Map from './Map/map'
import MineMenu from './MainMenu'
import ButtonBar from './ButtonBar'
import Header from './Header/Header'
import LeftBar from './LeftBar/LeftBar'
import MapTools from './MapTools/MapTool'
import MapSymbol from './MapSymbol'
import Analyse from './AnalyseBox/Analyse'

// 数据目录 ：MapSource
// 专题分析 ：TopicAnalyse
// 分析历史 ：AnalyseHistory
// 数据统计 ：DatumStatistics
// 数据展示 ：DatumShow
// 地图查询 ：MapSearch

import MapSource from './LeftEvents/MapSource'
import TopicAnalyse from './LeftEvents/TopicAnalyse'
import AnalyseHistory from './LeftEvents/AnalyseHistory'
import DatumStatistics from './LeftEvents/DatumStatistics'
import MapSearch from './LeftEvents/MapSearch'
import Suitabillity from './LeftEvents/Suitabillity'


import menuData from '../apis/menuJson'

export default {
    init: function (el, options) {
        this.option = $.extend({}, {
            useHeader: true,
        }, options);

        // 实例化地图
        var _Map = new Map();
        el.append(_Map.html);
        _Map.render(this.option);
        







        // 实例化主导航
        var _mineMenu = new MineMenu();
        el.append(_mineMenu.html);

        // 实例化底部菜单
        var _ButtonBar = new ButtonBar();
        el.append(_ButtonBar.html);

        // 左侧菜单
        var _LeftBar = new LeftBar();
        el.append(_LeftBar.html);

        // 地图工具栏
        var _MapTools = new MapTools();
        el.append(_MapTools.html);
        //绘制点
        _MapTools.handlePoint(function () {
            _Map.handlePointControl()
        })

        // 地图图例
        var _MapSymbol = new MapSymbol();
        el.append(_MapSymbol.html);

        // 自定义分析
        var _Analyse = new Analyse();
        el.append(_Analyse.html);

        // 实例化顶部菜单
        if (this.option.useHeader) {
            var _Header = new Header();
            el.append(_Header.html);
        } else {
            _mineMenu.html.css('top', '0px');
            _LeftBar.html.css('top', '0px');
        };

        // 绑定关联关系
        _mineMenu.onAfterSet(function (mapKeyMapping) {
            _LeftBar.renderSubBox(mapKeyMapping);
        });

        var EventMapping = {
            MapSource: MapSource,
            TopicAnalyse: TopicAnalyse,
            AnalyseHistory: AnalyseHistory,
            DatumStatistics: DatumStatistics,
            MapSearch: MapSearch,
            Suitabillity: Suitabillity,
        };

        var SourceEvent = {
            MapSource: null,
            TopicAnalyse: null,
            AnalyseHistory: null,
            DatumStatistics: null,
            MapSearch: null,
            Suitabillity: null,
        };

        var mapKeyMapping = {};
        for (let i = 0; i < menuData.length; i++) {
            const element = menuData[i];
            mapKeyMapping[element.router] = {
                name: element.name,
                type: element.type,
                icon: element.router,
                event: (function (element) {
                    var event = EventMapping.hasOwnProperty(element.router) ? new EventMapping[element.router](_Map, _MapSymbol, _Analyse) : '';
                    if (event) {
                        if (element.router == 'MapSource' && element.children) {
                            for (let i = 0; i < element.children.length; i++) {
                                const __element = element.children[i];
                                event.addChild(__element.children);
                            };
                        } else if (element.router == 'TopicAnalyse' && element.children) {
                            event.addChild(element.children);
                        } else if (element.router == 'AnalyseHistory') {
                            event.getList();
                        } else if (element.router == 'DatumStatistics') {
                            event.getList();
                        } else if (element.router == 'MapSearch') {
                            event.render();
                        } else if (element.router == 'Suitabillity') {
                            event.render();
                        };
                    };
                    if (SourceEvent.hasOwnProperty(element.router)) {
                        SourceEvent[element.router] = event;
                    };
                    return event;
                })(element),
            };
        };
        _MapSymbol.onChangeView(function (type) {
            _Analyse.changeRightView(type);
        });


        _mineMenu.setMapping(mapKeyMapping);
        _mineMenu.onActive((data) => {
            if (data) {
                if (data.type == 'link') {
                    icu.alert.success({
                        title: '',
                        text: data.name
                    });
                } else {
                    _LeftBar.show(data);
                };
                _Analyse.changeLeftView(true);
            } else {
                _LeftBar.hide();
                _Analyse.changeLeftView(false);
            }
        });

        _ButtonBar.positionEvent(['147.01245546', '23.456548']);
        _ButtonBar.mapScaleEvent('200000');

        _mineMenu.MineItems[1].html.click();
    },
}