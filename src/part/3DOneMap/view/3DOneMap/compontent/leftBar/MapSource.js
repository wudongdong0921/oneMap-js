////////////////////////////////////////////////
// 地图列表
// 穆松鹤
// 2020-09-28 09:19:27
////////////////////////////////////////////////

import subMenu from './subMenu';
import carouselMenu from './carouselMenu';
import MapTree from './MapTree'


var MapSource = function () {
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.carousel = new carouselMenu();
    this.html.append(this.carousel.html);
    this.children = [];
    this.values = {};
    // this.lastChangeObject = null;
    // this._map = _Map;
    // this._MapSymbol = _MapSymbol;
    // this.type = type
    this.event = {
        change: function () { },
        viewMap: function () { },
    }

};

MapSource.prototype.setMapTreeOpacityValue = function (data, object) {
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        if (element !== object) {
            element.tree.setOpacityValue(data);
        };
    };
};
MapSource.prototype.getTreeOpacityValue = function (id) {
    if (this.values.hasOwnProperty(id)) {
        const element = this.values[id];
        return element.OpacityValue
    } else {
        return 100;
    };
};

MapSource.prototype.onChange = function (event) {
    this.event.change = event;
};
MapSource.prototype.onViewMap = function (event) {
    this.event.viewMap = event
};
MapSource.prototype.change = function (data, value, object) {
    if (value) {
        this.values[data.mapId] = data;
    } else {
        delete this.values[data.mapId];
    };
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        if (element !== object) {
            element.tree.setSingleValue(data, value);
        };
    };
    this.event.change(data, value);
};

MapSource.prototype.addChild = function (menuData,_MapSort) {
    var SubMenu = new subMenu();
    var tree = new MapTree(menuData);

    SubMenu.setChildren(menuData);
    var _child = {
        tree: tree,
        subMenu: SubMenu,
    };
    tree.onChangeValue((data, value) => {
        this.change(data, value, _child);
    });
    tree.onViewMap((data) => {
        this.event.viewMap(data);
    });

    SubMenu.onClick((data) => {
        tree.setTreeData(data.children);
        var _values = [];

        for(let k in tree.initCheck) {
            this.values[k] = tree.initCheck[k]
        }
        for (const key in this.values) {
            if (this.values.hasOwnProperty(key)) {
                const element = this.values[key];
                _values.push(element);
            }
        };
        tree.setValue(_values);
    });
    // tree.onSyncChangeOpacityValue((data) => {
    //     this._map.changeMapOpacity(data);
    //     this.setMapTreeOpacityValue(data, _child);
    // });
    // tree.onGetTreeOpacityValue((id) => {
    //     return this.getTreeOpacityValue(id);
    // });
    if(_child) {
        this.children.push(_child);
        _MapSort.setMapLayerSort(_child)
    }
   
    var subBox = $('<div class="OneMap_LeftBar_subBox"></div>');
    var clearButton = $('<div class="OneMap_LeftBar_clearButton"><i class="fa fa-trash-o" aria-hidden="true"></i></div>').appendTo(subBox);
    clearButton.click(() => {
        _child.tree.clearCheckValues();
        this._map.leftMenuClear()
    });
    subBox.append(tree.html);
    subBox.append(SubMenu.html);
    this.carousel.addChildren(subBox);
};
// MapSource.prototype.getMapSymbolStatus = function(type) {
//     this.event.mapSourceMapSymbol(type)
// }
MapSource.prototype.render = function () {
    return this.html
};
export default MapSource;