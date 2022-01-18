// import OpacitySlider from './OpacitySlider'
var MapTreeItem = function (data, parent, depth, folder) {
    this.type = "3DMap";
    this.data = data;
    this.parent = parent;
    this.MapSymbolFlag = true
    this.html = $('<div class="OneMap_Tree_Item"></div>');
    this.mapName = $('<div class="OneMap_Tree_Item_name"></div>').appendTo(this.html);
    this.lineBox = $('<div class="OneMap_Tree_Item_line"></div>').appendTo(this.html);
    this.checkEleBox = $('<div class="OneMap_Tree_Item_checkBox"></div>').appendTo(this.mapName);
    this.icon = $('<div class="OneMap_Tree_Item_icon"><i class="fa fa-circle" aria-hidden="true" style="font-size:10px"></i></div>').appendTo(this.mapName);
    this.itemName = $('<div class="OneMap_Tree_Item_itemName" title="' + data.name + '"></div>').appendTo(this.mapName);
    this.button = $('<div class="OneMap_Tree_Item_button"></div>').appendTo(this.mapName);
    this.checkBox = $('<div class="layui-unselect layui-form-checkbox" lay-skin="primary">' +
        '   <span></span>' +
        '   <i class="layui-icon layui-icon-ok"></i>' +
        '</div>').appendTo(this.checkEleBox);
    this.MapSymbol = $('<div class="OneMap_MapSymbol_button _MapSymbol title="图例"><i class="fa fa-image" aria-hidden="true" title="图例"></i></div>');
    this.MapOpacity = $('<div class="OneMap_MapSymbol_button _MapOpacity" title="透明度">...</div>');

    this.viewButton = $('<div class="OneMap_MapSymbol_button _MapSymbol" title="定位">[*]</div>');


    this.MapOpacityEle = $('<div class="OneMap_Tree_Item_MapOpacityEle"></div>').appendTo(this.html);;
    // this.OpacitySlider = null;
    this.MapSymbol.click((e) => {
        e.stopPropagation();
        e.preventDefault();
        this.handleMapSymbol()

    });
    this.folder = folder;
    this.button.append(this.viewButton);



    // this.button.append(this.MapSymbol);
    // this.button.append(this.MapOpacity);
    this.itemName.append(data.name);
    this.data.OpacityValue = data.OpacityValue || 100;
    this.value = false;
    this.mapName.click(() => {
        this.changeValue();
    });
    this.button.hide();
    this.MapOpacityValue = false;
    this.height = null;
    this.MapOpacity.click((e) => {
        e.stopPropagation();
        e.preventDefault();
        this.changeOpacityValue();
    });

    this.viewButton.click((e) => {
        e.stopPropagation();
        e.preventDefault();
        this.viewMap();
    });
    ////////////////////////////////////////////////
    // 
    // 吴东东
    // 2021-06-22 13:08:02
    ////////////////////////////////////////////////
    (data.threeDimensionalIsdisplay === 1 || data.isShow === '1') && (this.parent.initCheck[data.mapId] = data)
};
MapTreeItem.prototype.viewMap = function () {
    this.parent.viewMap(this.data);
};


MapTreeItem.prototype.handleMapSymbol = function () {
    // if (this.MapSymbolFlag) {
    //     if (!this.parent.typeFull) {
    //         this.parent._MapSymbol.show(this.data, this);
    //         // this.MapSymbol.addClass('map_symbol')
    //     } else {
    //         layer.open({
    //             title: '警告',
    //             content: '分屏状态下，无法展示图例'
    //         });
    //     }

    //     this.MapSymbolFlag = false

    // } else {
    //     this.parent._MapSymbol.hide(this)
    //     this.MapSymbolFlag = true
    //     // this.MapSymbol.removeClass('map_symbol')
    // }
}
MapTreeItem.prototype.setOpacityValue = function (value) {
    // if (this.OpacitySlider) {
    //     this.OpacitySlider.setValue(value);
    // };
    // this.data.OpacityValue = value;
};
MapTreeItem.prototype.changeValue = function (value, outSet) {
    if (value === undefined) {
        this.value = !this.value;
    } else {
        if (this.value == value) {
            return
        } else {
            this.value = value;
        }
    };
    if (this.value) {
        this.checkBox.addClass('layui-form-checked');
        this.button.show();
        var _value = this.parent.event.getTreeOpacityValue(this.data.id);
        this.data.OpacityValue = _value;
    } else {
        this.checkBox.removeClass('layui-form-checked');
        this.button.hide();
        if (this.MapOpacityValue) {
            this.changeOpacityValue();
        };
    };
    if (value === undefined || outSet) {
        this.folder.checkFull();
    };
    this.parent.event.change(this.data, this.value);
};
MapTreeItem.prototype.changeOpacityValue = function () {
    this.parent.mark.show();
    this.MapOpacityValue = !this.MapOpacityValue;
    var heigth = this.html.height();
    if (this.height === null) {
        this.height = heigth;
        this.height = this.html.height(this.html.height());
    };
    if (this.MapOpacityValue) {
        this.parent.setActiveOpacityObject(this);
        // this.OpacitySlider = new OpacitySlider(this.MapOpacityEle, (value) => {
        //     this.data.OpacityValue = value;
        //     this.parent.event.syncChangeOpacityValue(this.data);
        // });
        // this.OpacitySlider.setValue(this.data.OpacityValue);
        this.html.height(heigth + 50);
        this.MapOpacityEle.css('opacity', '1');
    } else {
        this.MapOpacityEle.empty();
        // this.OpacitySlider = null;
        this.html.height(heigth - 50);
        this.MapOpacityEle.css('opacity', '0');
    };
    setTimeout(() => {
        this.parent.mark.hide();
    }, 350);
};
var MapTreeItemFolder = function (data, parent, depth, folder) {
    this.type = "folder";
    this.data = data;
    this.parent = parent;
    this.html = $('<div class="OneMap_Tree_Item __folder"></div>');
    this.mapName = $('<div class="OneMap_Tree_Item_name"></div>').appendTo(this.html);
    this.lineBox = $('<div class="OneMap_Tree_Item_line"></div>').appendTo(this.html);
    this.checkEleBox = $('<div class="OneMap_Tree_Item_checkBox"></div>').appendTo(this.mapName);
    this.icon = $('<div class="OneMap_Tree_Item_icon"><i class="fa fa-folder-open" aria-hidden="true"></i></div>').appendTo(this.mapName);
    this.itemName = $('<div class="OneMap_Tree_Item_itemName" title="' + data.name + '"></div>').appendTo(this.mapName);
    this.childrenBox = $('<div class="OneMap_Tree_childrenBox" style="padding:0 0 0 20px"></div>').appendTo(this.html);
    this.checkBox = $('<div class="layui-unselect layui-form-checkbox" lay-skin="primary">' +
        '   <span></span>' +
        '   <i class="layui-icon layui-icon-ok"></i>' +
        '</div>').appendTo(this.checkEleBox);
    this.switch = $('<div class="OneMap_Tree_Folder_switch"><i class="fa fa-minus-square-o" aria-hidden="true"></i></div>').appendTo(this.mapName);
    this.showValue = true;
    this.folder = folder;
    this.switch.click((e) => {
        e.stopPropagation();
        e.preventDefault();
        this.switchChange();
    });
    this.switchChange();
    this.childrenBox.hide();
    this.itemName.append(data.name);
    this.value = false;
    this.mapName.click(() => {
        this.changeValue();
        this.setChildrenValue(this.value);
    });
    this.children = [];
    if (data.children.length == 0) {
        this.switch.hide();
    };
    for (let i = 0; i < data.children.length; i++) {
        const element = data.children[i];
        if (element.type == '3DMap') {
            var item = new MapTreeItem(element, parent, depth + 1, this);
            this.parent.addMapItem(item);
        } else if (element.type == 'folder') {
            var item = new MapTreeItemFolder(element, parent, depth + 1, this);
        };
        this.children.push(item);
        this.childrenBox.append(item.html);
    }
};
MapTreeItemFolder.prototype.checkFull = function () {
    var isAllCheck = !this.value;
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        if (!element.value) {
            isAllCheck = false;
            break;
        };
    };
    if (isAllCheck != this.value) {
        this.changeValue();
    } else {
        this.folder.checkFull();
    };
};
MapTreeItemFolder.prototype.setChildrenValue = function (value) {
    this.setValue(value);
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        if (element.data.type == 'folder') {
            element.setChildrenValue(value);
        } else if (element.data.type == '3DMap') {
            element.changeValue(value);
        };
    };
};
MapTreeItemFolder.prototype.setValue = function (value) {
    this.value = value;
    if (this.value) {
        this.checkBox.addClass('layui-form-checked');
    } else {
        this.checkBox.removeClass('layui-form-checked');
    };
};
MapTreeItemFolder.prototype.clearValue = function () {
    if (this.value) {
        this.setValue(false);
    };
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        if (element.type == 'folder') {
            element.clearValue();
        } else if (element.value && element.type == '3DMap') {
            element.changeValue(undefined, true);
        };
    };
};

MapTreeItemFolder.prototype.switchChange = function () {
    this.showValue = !this.showValue;
    if (!this.showValue) {
        this.switch.find('i').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        this.icon.find('i').removeClass('fa-folder-open').addClass('fa-folder');
        this.childrenBox.hide(300)
    } else {
        this.switch.find('i').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
        this.icon.find('i').addClass('fa-folder-open').removeClass('fa-folder');
        this.childrenBox.show(300)
    };
};
MapTreeItemFolder.prototype.changeValue = function (value) {
    this.value = !this.value;
    if (this.value) {
        this.checkBox.addClass('layui-form-checked');
    } else {
        this.checkBox.removeClass('layui-form-checked');
    };
    this.folder.checkFull();
};
var MapTree = function (menuData) {
    this.data =menuData[0]
    // this._MapSymbol = _MapSymbol;
    // this.typeFull = type
    this.html = $('<div class="OneMap_LeftBar_TreeBox"></div>');
    this.mark = $('<div class="OneMap_LeftBar_TreeBox_mark" style="display:none"></div>');
    this.event = {
        change: function () { },
        syncChangeOpacityValue: function () { },
        getTreeOpacityValue: function () { },
        mapTreeMapSymbol: function () { },
        viewMap: function () { },
    };
    this.children = [];
    this.MapItem = {};

    this.activeOpacityObject = null;
    setTimeout(() => {
        this.html.after(this.mark);
    }, 10);
};
MapTree.prototype.clearTree = function () {
    this.children = [];
    this.MapItem = {};
    this.initCheck = {}
    this.html.empty();
};
MapTree.prototype.setTreeData = function (data) {
    this.clearTree();
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.type == '3DMap') {
            var item = new MapTreeItem(element, this, 0, this);
            this.addMapItem(item);
        } else if (element.type == 'folder') {
            var item = new MapTreeItemFolder(element, this, 0, this);
        }
        this.children.push(item);
        this.html.append(item.html);
    };
};
MapTree.prototype.setActiveOpacityObject = function (item) {
    if (this.activeOpacityObject && this.activeOpacityObject !== item && this.activeOpacityObject.MapOpacityValue) {
        this.activeOpacityObject.changeOpacityValue();
    };
    this.activeOpacityObject = item;
};
MapTree.prototype.addMapItem = function (item) {
    this.MapItem[item.data.mapId] = item;
};
MapTree.prototype.checkFull = function () {

};
// MapTree.prototype.onSyncChangeOpacityValue = function (e) {
//     this.event.syncChangeOpacityValue = e;
// };
// MapTree.prototype.onGetTreeOpacityValue = function (e) {
//     this.event.getTreeOpacityValue = e;
// };

MapTree.prototype.setOpacityValue = function (data) {
    if (this.MapItem.hasOwnProperty(data.mapId)) {
        this.MapItem[data.mapId].setOpacityValue(data.OpacityValue);
    };
};
MapTree.prototype.setValue = function (value) {
    for (let i = 0; i < value.length; i++) {
        const element = value[i];
        if (this.MapItem.hasOwnProperty(element.mapId)) {
            this.MapItem[element.mapId].changeValue(true, true);
        };
    };
};
MapTree.prototype.setSingleValue = function (data, value) {
    if (this.MapItem.hasOwnProperty(data.mapId)) {
        this.MapItem[data.mapId].changeValue(value, true);
    };
};
MapTree.prototype.getValue = function () {
    var _data = []
    for (const key in this.MapItem) {
        if (this.MapItem.hasOwnProperty(key)) {
            const element = this.MapItem[key];
            if (element.value) {
                _data.push(element.data);
            };
        }
    };
    return _data;
};
MapTree.prototype.onChangeValue = function (event) {
    this.event.change = event
};

MapTree.prototype.onViewMap = function (event) {
    this.event.viewMap = event
};
MapTree.prototype.viewMap = function (data) {
    this.event.viewMap(data);
};

MapTree.prototype.clearCheckValues = function () {
    for (const key in this.children) {
        if (this.children.hasOwnProperty(key)) {
            const element = this.children[key];
            if (element.type == 'folder') {
                element.clearValue();
            } else if (element.value && element.type == '3DMap') {
                element.changeValue(undefined, true);
            };
        }
    }
};
// MapTree.prototype.handleMapSymbol = function(event) {
// }

export default MapTree;