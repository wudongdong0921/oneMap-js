////////////////////////////////////////////////
// 一张图项目入口
// 穆松鹤
// 2020-09-22 14:53:39
////////////////////////////////////////////////
// import "./../../../../static/libs/map/bootstrap.min.css"
import "./Loading/loading"
import './style.css'
import './font/iconfont.css'
import Msg from "./../component/msg"

import Map from './Map/map'
import MineMenu from './MainMenu'
import ButtonBar from './ButtonBar'
import Header from './Header/Header'
import LeftBar from './LeftBar/LeftBar'
import MapTools from './MapTools/MapTool'
import MapSymbol from './MapSymbol'
import Analyse from './AnalyseBox/Analyse'
import Double from './Map/double/double'
import MapSort from './Map/mapSort'
// 数据目录 ：MapSource
// 专题分析 ：TopicAnalyse
// 分析历史 ：AnalyseHistory
// 数据统计 ：DatumStatistics
// 数据展示 ：DatumShow
// 地图查询 ：MapSearch
import AnalyCommon from './LeftEvents/AnalyCommon'

import MapSource from './LeftEvents/MapSource'
import TopicAnalyse from './LeftEvents/TopicAnalyse'
import AnalyseHistory from './LeftEvents/AnalyseHistory'
import DatumStatistics from './LeftEvents/DatumStatistics'
import MapSearch from './LeftEvents/MapSearch'
// import SplitScreen from "./splitScreen"
import BusinessQueries from './LeftEvents/BusinessQueries'
import SplitDom from "./splitDom"
var _Msg = new Msg({
    el: $('body'),
    index: 999999999
})
window._Msg = _Msg

export default {
    init: function (el, elBox, options, menuData,mapList) {
        var _this = this
        this.option = $.extend({}, {
            useHeader: true,
        }, options);
        // 实例化地图
        var _Map = new Map(el, menuData);
        elBox.append(_Map.comparison);
        el.append(_Map.mapTopHtml)
        el.append(_Map.mapBusinessTopHtml)
        

        // 实例化主导航
        var _mineMenu = new MineMenu();
        elBox.append(_mineMenu.html);

        // 实例化底部菜单
        var _ButtonBar = new ButtonBar();
        elBox.append(_ButtonBar.html);

        // 左侧菜单
        var _LeftBar = new LeftBar();
        elBox.append(_LeftBar.html);

        // 地图工具栏
        var _MapTools = new MapTools(el);
        elBox.append(_MapTools.html);

        // 地图图例
        var _MapSymbol = new MapSymbol();
        elBox.append(_MapSymbol.html);

        // 自定义分析
        var _Analyse = new Analyse();
        elBox.append(_Analyse.html);

        // 实例化顶部菜单
        if (this.option.useHeader) {
            var _Header = new Header();
            elBox.append(_Header.html);
        } else {
            _mineMenu.html.css('top', '0px');
            _LeftBar.html.css('top', '0px');
        };
        //分屏
        var _Double = new Double()
        el.append(_Double.html)
        // 绑定关联关系
        _mineMenu.onAfterSet(function (mapKeyMapping) {
            _LeftBar.renderSubBox(mapKeyMapping);
        });
        //地图管理
        var _MapSort = new MapSort()
        _Map.getSortFaction((obj) => {
            _MapSort.addSortLayer(obj)
        })
        // var _AnalyCommon = new AnalyCommon()
        var EventMapping = {
            MapSource: MapSource,
            TopicAnalyse: TopicAnalyse,
            AnalyseHistory: AnalyseHistory,
            DatumStatistics: DatumStatistics,
            MapSearch: MapSearch,
            BusinessQueries: BusinessQueries
        };

        var SourceEvent = {
            MapSource: null,
            TopicAnalyse: null,
            AnalyseHistory: null,
            DatumStatistics: null,
            MapSearch: null,
            BusinessQueries: null
        };

        var mapKeyMapping = {};
        var _AnalyCommon = new AnalyCommon(_Analyse)
        for (let i = 0; i < menuData.length; i++) {
            const element = menuData[i];
            mapKeyMapping[element.router] = {
                name: element.name,
                type: element.type,
                icon: element.router,
                event: (function (element) {
                    var event = EventMapping.hasOwnProperty(element.router) ? new EventMapping[element.router](_Map, _MapSymbol, _Analyse,null,_MapTools) : '';
                    if (event) {
                        if (element.router == 'MapSource' && element.children) {
                            for (let i = 0; i < element.children.length; i++) {
                                const __element = element.children[i];
                                event.addChild({
                                    menuData:__element.children,
                                    mapList:mapList,
                                    _MapSort: _MapSort
                                });
                            };
                        } else if (element.router == 'TopicAnalyse' && element.children) {
                            
                            event.addChild(element.children,_AnalyCommon);
                        } else if (element.router == 'AnalyseHistory') {
                            event.getList();
                        } else if (element.router == 'DatumStatistics') {
                            event.getList();
                        } else if (element.router == 'MapSearch') {
                            event.render();
                        } else if(element.router == 'BusinessQueries'){
                            event.addChild(element.children,_AnalyCommon);
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
            // SourceEvent.MapSource.getMapSymbolStatus(type)
        });
        

        _mineMenu.setMapping(mapKeyMapping);
        var a,b;
        const recordSate = function(a,b) {
            if(a === 'BusinessQueries' || b === 'BusinessQueries') {
                _Map.handleClearControl()
            }
            if(b === 'BusinessQueries') {
                _MapTools.handleMapToolPremise(function() {
                    return false
                })
                _MapTools.menuFn(_MapTools.menuList, 'none')
            } else {
                _MapTools.handleMapToolPremise(function() {
                    return true
                })
            }
        }
        _mineMenu.onActive((data) => {
            a = b
            b= data ? data.icon : ""
            recordSate(a,b)
            if (data) {
                if (data.type == 'link') {
                    icu.alert.success({
                        title: '',
                        text: data.name
                    });
                } else {
                    _LeftBar.show(data);
                    _ButtonBar.html.css({'left':'370px'})
                    //_Map.changeMapSize('menu',true)
                };
               //_Analyse.hide()
                _Analyse.changeLeftView(true);
            } else {
                _LeftBar.hide();
                //_Analyse.show()
                _ButtonBar.html.css({'left':'50px'})
                //_Map.changeMapSize('menu',false)
                _Analyse.changeLeftView(false);
            }
        });
        // _mineMenu.MineItems[5] && _mineMenu.MineItems[5].html.click();

        _Map.render(() => {
            //权限
            _MapTools.handleToolPermisMap(function (data) {
                _Map.setMapSelect(data)
                _Map.handleToolPermisMapControl(data)
            })
        });
        _Map.getMapMouseCode(function(data) {
            _ButtonBar.positionEvent([data.lng.toFixed(4), data.lat.toFixed(4)]);
        })
        //比例尺
        _Map.getMapScalse(function (data) {
            _ButtonBar.mapScaleEvent(data);
            _MapTools._MapPrint.getScaleValue(data)
        });
        _mineMenu.onAfterSet(function (mapKeyMapping) {
            _LeftBar.renderSubBox(mapKeyMapping);
        });

        // 绑定关联关系

        //
        _MapTools.getHandleRoolStop(() => {
            return _Map.handleRoolMapStop(() => {})
        })
        _Map.outMapList(function (data, type) {
            _MapTools.getMapPolyList(data, type)
            // SourceEvent.TopicAnalyse.getMapGeojson(data,type)
        }, function (data, type) {
            data = data ? [JSON.stringify(data.geometry)] : null
            //_MapTools.getAnalysisLightList(data,type)
            //SourceEvent.TopicAnalyse.getMapGeojson(data, type)
            _AnalyCommon.getMapGeojson({
                data: data,
                type: 4,
                _Analyse: _Analyse,
                epsgCode: '4490'
            })
        })
        //mapId
        _Map.outMapId(function (data) {
            _MapTools.getOutMapId(data)
        })
        //行政区范围
        _Map.outAdministrativeGeojson(function (data,type) {
            var obj = {
                data: data,
                type: type,
                
            }
            _MapTools.getAdministrativeGeojson(obj)
        })
        //
        _MapTools.handleDeleteBusinessAlls(function() {
            _Map.deleteBusinessAll()
        })
        //测量线
        _MapTools.handleEventMeaurse(function (type) {
            _Map.measureDistance(type)
        })
        //测量面
        _MapTools.handleEventPolygonMeasure(function (type) {
            _Map.measurePolygonDistance(type)
        })
        //全幅
        _MapTools.handleFullScreen(function () {
            _Map.FullscreenControl()
        })
        //绘制点
        _MapTools.handlePoint(function () {
            _Map.handlePointControl()
        })
        //绘制线
        _MapTools.handleLine(function () {
            _Map.handleLineControl()
        })
        //绘制面
        _MapTools.handlePolygon(function () {
            _Map.handleFaceControl()
        })
        //清除
        _MapTools.handleLayerClear(function () {
            _Map.handleClearControl()
        })
        //放大
        _MapTools.handleZoomIn(function () {
            _Map.handleZoomInControl()
        })
        //缩小
        _MapTools.handleZoomOut(function () {
            _Map.handleZoomOutControl()
        })
        //标注
        _MapTools.handleToolSign(function (ele) {
            _Map.handleToolSignControl(ele)
        })
        _MapTools.handleToolSignClear(function() {
            _Map.markClearHeander()
        })
        //卷帘
        _MapTools.handleToolSplit(function () {
            _Map.handleToolSplitControl()
        }, function () {
            _Map.handleToolSplitCloseControl()
        })
        //下载
        // _MapTools.handleMapToolDownLoad(function() {
        //     _Map.handleMapToolDownLoadControl()
        // })
        //打印
        _MapTools.getPrintPdf(_Map,_ButtonBar)
        // //上图
        // _MapTools.handleToolUpMap(function () {
        //     _Map.handleToolUpMapControl()
        // })
        //上图相关
        _MapTools.handleMapToolCreateMap(function (data, para, type,id,flag,list,epsgCode) {
            if(flag) {
                for(let i =0;i<data.length;i++) {
                    _Map.createBusinessMapLayer({
                        obj: {features: data[i].features,type: "FeatureCollection"},
                        fileName: data[i].fileName
                    })
                }
                _Map.muplyLayerBox(list,'mapTop')
            }else {
                _Map.createMapLayer(data,id)
            }
            //4 为上图，不特殊处理
            _AnalyCommon.getMapGeojson({
                data: list,
                type: 4,
                _Analyse: _Analyse,
                epsgCode: epsgCode
            })
            //SourceEvent.TopicAnalyse.getMapGeojson(para, type)
            
            //
            //_MapTools.getMapPolyList(list, type)
        })
        //多文件
        _MapTools.handleToolOutMapList(function (data,epsgCode) {
            SourceEvent.TopicAnalyse.getMapGeojson({
                data: data,
                type: 4,
                epsgCode: epsgCode
            })
        })
        //选择单选
        _MapTools.handleToolRadioMap(function () {
            _Map.handleToolRadioMapControl()
        })
        //选择连选
        _MapTools.handleToolCheckMap(function () {
            _Map.handleToolCheckMapControl()
        })
        //识别
        _MapTools.handleToolSelectMap(function () {
            _Map.handleToolSelectMapControl()
        })
        //分屏
        var cache = []
        _MapTools.handleToolDouble(function (type) {
            var count = 0
            // var _SplitScreen = new SplitScreen()
            //_Map.handleClearControl()//清除
            // 实例化顶部菜单
            if (_this.option.useHeader) {
                var _Header = new Header();
                el.append(_Header.html);
            }
            var doms;
            if(type === 'screenTwo') {
                doms = ['sceneLeftMap','sceneRightMap']
            }else {
                doms = ['sceneLeftMap','sceneRightMap','sceneLeftMap1','sceneRightMap1']
            }
            var _SplitDom = new SplitDom({
                map: Map,
                LeftBar: LeftBar,
                MapSource: MapSource,
                MapSort: MapSort,
                doms:doms,
                type:type,
                _Double:_Double,
                mapList:mapList,
                cache:cache,
                menuData: menuData,
                _MapSymbol: _MapSymbol,
                _Analyse: _Analyse,
                _MapTools: _MapTools,
                mapKeyMapping: mapKeyMapping,
                el:el,
                elBox: elBox
            })
        //     var sceneLeftMap = _Double.html.find('#sceneLeftMap')
        //     var sceneRightMap = _Double.html.find('#sceneRightMap')
        //     // 实例化地图
        //     var _MapDoubleLeft = new Map(el, menuData);
        //     var _MapDoubleRight = new Map(el, menuData);
        //     sceneLeftMap.html(_MapDoubleLeft.comparison);
        //     sceneRightMap.html(_MapDoubleRight.comparison);
            
        //     // 左侧菜单
        //     var _LeftBarDouble = new LeftBar();
        //     var _RightBarDouble = new LeftBar();
        //     var _MapSourceLeft = new MapSource(_MapDoubleLeft, _MapSymbol,_Analyse,'fullFlag')
        //     var _MapSourceRight = new MapSource(_MapDoubleRight, _MapSymbol,_Analyse,'fullFlag')
        //     //地图管理
        // var _MapSortL = new MapSort()
        // _MapDoubleLeft.getSortFaction((obj) => {
        //     _MapSortL.addSortLayer(obj)
        // })
        // //地图管理
        // var _MapSortR = new MapSort()
        // _MapDoubleRight.getSortFaction((obj) => {
        //     _MapSortR.addSortLayer(obj)
        // })
        //     var mapKeyMappingLeft = {};
        //     var mapKeyMappingRight = {}
        //     var sceneMapSource = function (ele, mapKey,_MapSort) {
        //         for (let i = 0; i < menuData.length; i++) {
        //             const element = menuData[i];
        //             mapKey[element.router] = {
        //                 name: element.name,
        //                 type: element.type,
        //                 icon: element.router,
        //                 event: (function (element) {
        //                     if (element.router == 'MapSource' && element.children) {
        //                         for (let i = 0; i < element.children.length; i++) {
        //                             const __element = element.children[i];
                                    
        //                             ele.addChild({
        //                                 menuData:__element.children,
        //                                 _MapSort: _MapSort
        //                             });
        //                         };
        //                     }
        //                     // if (SourceEvent.hasOwnProperty(element.router)) {
        //                     //     SourceEvent[element.router] = ele;
        //                     // };
        //                     return ele;
        //                 })(element),
        //             };
        //         };
        //     };
        //     _LeftBarDouble.handleCloseScene(() => {
        //         elBox.show();
        //         _Double.html.hide()
        //         _MapTools.setToolActive(_MapTools.double)
        //     })
        //     _RightBarDouble.handleCloseScene(() => {
        //         elBox.show();
        //         _Double.html.hide()
        //         _MapTools.setToolActive(_MapTools.double)
        //     });
        //     sceneMapSource(_MapSourceRight, mapKeyMappingRight,_MapSortR)
        //     sceneMapSource(_MapSourceLeft, mapKeyMappingLeft,_MapSortL)
        //     sceneLeftMap.append(_LeftBarDouble.box);
        //     sceneRightMap.append(_RightBarDouble.box)
        //     _LeftBarDouble.renderSubBoxOne(mapKeyMappingLeft);
        //     _RightBarDouble.renderSubBoxOne(mapKeyMappingRight);
        //     _LeftBarDouble.show(mapKeyMapping.MapSource)
        //     _RightBarDouble.show(mapKeyMapping.MapSource)
        //     _Double.html.show()
        //     elBox.hide()
        //     _MapDoubleLeft.render(() => {
                
        //         //权限
        //     _MapTools.handleToolPermisMap(function (data) {
        //         _MapDoubleLeft.handleToolPermisMapControl(data,_MapDoubleLeft.map,() => {
        //             count ++
        //             // _MapDoubleLeft.map.on('drag', function (e) {
        //             //     var lat = this.getCenter().lat
        //             //     var lng = this.getCenter().lng
        //             //     _MapDoubleRight.map.setCenter([lng,lat])
        //             // });
        //             // _MapDoubleLeft.map.on('zoom', function (e) {
        //             //     var zooms = this.getZoom()
        //             //     _MapDoubleRight.map.setZoom(zooms)
        //             //     var lat = this.getCenter().lat
        //             //     var lng = this.getCenter().lng
        //             //     _MapDoubleRight.map.setCenter([lng,lat])
                        
        //             // });
                   
        //         })
        //     })
        //     });
        //     _MapDoubleRight.render(() => {
                
        //         //权限
        //     _MapTools.handleToolPermisMap(function (data) {
        //         _MapDoubleRight.handleToolPermisMapControl(data,_MapDoubleRight.map,() => {
        //             count ++
        //             // _MapDoubleRight.map.on('drag', function (e) {
        //             //     var lat = this.getCenter().lat
        //             //     var lng = this.getCenter().lng
        //             //     _MapDoubleLeft.map.setCenter([lng,lat])
        //             // });
        //             // _MapDoubleRight.map.on('zoom', function (e) {
        //             //     var zooms = this.getZoom()
        //             //     _MapDoubleLeft.map.setZoom(zooms)
        //             //     var lat = this.getCenter().lat
        //             //     var lng = this.getCenter().lng
        //             //     _MapDoubleLeft.map.setCenter([lng,lat])
        //             // });
                    
        //         })
        //     })
        //     });
        //     var _SplitScreenFn = function() {
        //         if(count === 2) {
        //             var _SplitScreen = new SplitScreen('OneMapDouble',{
        //                 maps: [_MapDoubleRight.map,_MapDoubleLeft.map]
        //             })
        //         }else {
        //             setTimeout(_SplitScreenFn,100)
        //         }
            
        //     }
        //     _SplitScreenFn()
            
            
        })
        
        //时间轴
        return {
            addMainMenu: function (event) {
                _mineMenu.setSingle(event);
                _LeftBar.setSingle(event);
            },
            map: _Map,
            MineMenu: _mineMenu,
            elBox:elBox,
            _MapTools: _MapTools,
            _AnalyCommon: _AnalyCommon,
            _Analyse: _Analyse
        }
    },
}
