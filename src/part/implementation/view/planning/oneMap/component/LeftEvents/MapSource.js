////////////////////////////////////////////////
// 地图列表
// 穆松鹤
// 2020-09-28 09:19:27
////////////////////////////////////////////////

import subMenu from '../LeftBar/subMenu';
import carouselMenu from '../LeftBar/carouselMenu';
import MapTree from '../LeftBar/MapTree'
var MapSource = function (_Map, _MapSymbol) {
    this.html = $('<div class="OneMap_LeftBar_box"></div>');

    this.carousel = new carouselMenu();
    this.html.append(this.carousel.html);
    this.children = [];
    this.values = {};
    this.lastChangeObject = null;
    this._map = _Map;
    this._MapSymbol = _MapSymbol;
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



MapSource.prototype.change = function (data, value, object) {
    var changeString = data.id + value;
    if (this.lastChangeObject == changeString) {
        return;
    } else {
        this.lastChangeObject = changeString;
    };
    if (value) {
        this.values[data.id] = data;
        this._map.addMapSource(data);
    } else {
        delete this.values[data.id];
        this._map.removeMapSource(data);
        this._MapSymbol.checkHide(data);
    };
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        if (element !== object) {
            element.tree.setSingleValue(data, value);
        };
    };
};

MapSource.prototype.addChild = function (menuData) {
    var SubMenu = new subMenu();
    var tree = new MapTree(this._MapSymbol);
    SubMenu.setChildren(menuData);
    var _child = {
        tree: tree,
        subMenu: SubMenu,
    };
    tree.onChangeValue((data, value) => {
        this.change(data, value, _child);
    });
    SubMenu.onClick((data) => {
        tree.setTreeData(data.children);
        var _values = [];
        for (const key in this.values) {
            if (this.values.hasOwnProperty(key)) {
                const element = this.values[key];
                _values.push(element);
            }
        };
        tree.setValue(_values);
    });
    tree.onSyncChangeOpacityValue((data) => {
        this._map.changeMapOpacity(data);
        this.setMapTreeOpacityValue(data, _child);
    });
    tree.onGetTreeOpacityValue((id) => {
        return this.getTreeOpacityValue(id);
    });

    this.children.push(_child);
    var subBox = $('<div class="OneMap_LeftBar_subBox"></div>');
    var clearButton = $('<div class="OneMap_LeftBar_clearButton"><i class="fa fa-trash-o" aria-hidden="true"></i></div>').appendTo(subBox);
    clearButton.click(() => {
        _child.tree.clearCheckValues();
    });
    subBox.append(tree.html);
    subBox.append(SubMenu.html);
    this.carousel.addChildren(subBox);
};

MapSource.prototype.render = function () {
    return this.html
};

export default MapSource;