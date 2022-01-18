

import toolBar from './toolBar/index'
import './style.css'
import map from './map/index'
import MainMenu from './leftBar/main'
import MapSource from './leftBar/MapSource'
import menuData from '../apis/menuJson'
import MapSort from './map/map3DSort'
export default {
    init: function (Element) {
        setTimeout(function () {
            var _map = new map('Map');
            var _toolBar = new toolBar(_map);
            _toolBar.render(Element);
            var _MapSource = new MapSource();
            var _MainMenu = new MainMenu(Element);
            _MainMenu.setMenu({
                icon: 'MapSource'
            }, _MapSource.html);
            //地图管理
            var _MapSort = new MapSort()
            _map.getSortFaction((obj) => {
                _MapSort.addSortLayer(obj)
            })
            menuData.getJson({},(menuData)=>{
                for (let i = 0; i < menuData[0].children.length; i++) {
                    const element = menuData[0].children[i];
                    _MapSource.addChild(element.children,_MapSort);
                };
                _MapSource.onChange(function (data, value) {
                    _map.change(data, value);
                });
                _MapSource.onViewMap(function (data) {
                    _map.viewMap(data);
                });
            })
            // 初始化地形数据
            menuData.getDevData({}, function (result) {
                _toolBar.setMapDev(result)
            })
        }, 300);
    },
};

