////////////////////////////////////////////////
// 地图列表
// 穆松鹤
// 2020-09-28 09:19:27
////////////////////////////////////////////////

// 子菜单 
import subMenu from '../LeftBar/subMenu';
// 轮播页面，超过5个子菜单就需要
import carouselMenu from '../LeftBar/carouselMenu';
// 树组件
import MapTree from '../LeftBar/MapTree'
// 树的整体div
import TreeSlider from '../LeftBar/TreeSlider'

var MapSource = function (_Map, _MapSymbol,_Analyse,type) {
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.carousel = new carouselMenu();
    
    this.html.append(this.carousel.html);
    this.children = [];
    this.treeSunberLists = []
    this.values = {};
    this.lastChangeObject = null;
    this._map = _Map;
    this._MapSymbol = _MapSymbol;
    this.type = type
};

MapSource.prototype.setMapTreeOpacityValue = function (data, object) {
    for (let i = 0; i < this.treeSlider.length; i++) {
        const element = this.treeSlider[i];
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



MapSource.prototype.change = function (data, value, object,folderdata) {
    this._map.clearInteraction()
    this._map.createDraws()
    var changeString = data.mapId + value;
    if (this.lastChangeObject == changeString) {
        return;
    } else {
        this.lastChangeObject = changeString;
    };
    if (value) {
        this.values[data.mapId] = data;
        this._map.addMapSource(data,folderdata);
    } else {
        delete this.values[data.mapId];
        this._map.removeMapSource(data);
        this._MapSymbol.checkHide(data);
    };
    for (let i = 0; i < this.treeSlider.length; i++) {
        const element = this.treeSlider[i];
        if (element !== object) {
            element.tree.setSingleValue(data, value);
        };
    };
};
MapSource.prototype.addChild = function (obj) {
    var that = this
    const {menuData,_MapSort,mapList} = obj
    var SubMenu = new subMenu();
    var treeSlider = new TreeSlider();
    //var tree = new MapTree(this._MapSymbol,this.type);
    SubMenu.setChildren(menuData);
   
    // var _child = {
    //     tree: tree,
    //     subMenu: SubMenu,
    // };
    // // tree.handleMapSymbol((event) => {
    // //     this.event.mapSourceMapSymbol = event
    // // })
    // tree.onChangeValue((data, value,folderdata) => {
    //     this.change(data, value, _child,folderdata);
    // });
    ////////////////////////////////////////////////
    // 一对一
    // 吴东东
    // 2021-04-08 10:24:54
    ////////////////////////////////////////////////
    var treeSliderObj = {}
    var getTreeSingle = function(fn) {
        return function(data,treeSliderObj,that) {
            var result;
            for(let key in treeSliderObj) {
                if(key === data) {
                    result = true
                }
            }
            return result || (result = fn.apply(that,arguments))
        }
    }
    var createTreeDom = function() {
        var treeItem = new MapTree(this._MapSymbol,this.type,this.data);
        treeSlider.addTreeChild(treeItem,this.data)
        treeItem.setTreeData(this.data.children)
        return treeItem
    }
    var createTreeDomITem = getTreeSingle(createTreeDom)

    SubMenu.onClick((data,index) => {
        this.data = data
        this.treeSlider = treeSlider
        var treeSliderItem = createTreeDomITem(data.id,treeSliderObj,this);
        treeSliderObj[data.id] = treeSliderItem
        for(let k in treeSliderItem.initCheck) {
            this.values[k] = treeSliderItem.initCheck[k]
        }
        
        // this.treeSlider.treeSliderLayout.css({
        //     left: '-' + index * 300 + 'px',
        // });
        
        var _values = [];
        for (const key in this.values) {
            if (this.values.hasOwnProperty(key)) {
                const element = this.values[key];
                _values.push(element);
            }
        };
        if(treeSliderItem !== true) {
            var _child = {
                tree: treeSliderItem,
                subMenu: SubMenu,
            };
            _child[data.id] = treeSliderItem
            // tree.handleMapSymbol((event) => {
            //     this.event.mapSourceMapSymbol = event
            // })
            treeSliderItem.onChangeValue((data, value,folderdata) => {
                this._map.on('initLoad',() => {
                    this.change(data, value, _child,folderdata);
                })
                this._map.zoomFlag && this.change(data, value, _child,folderdata);
                
            });
            //treeSliderItem.setTreeData(data.children);
            treeSliderItem.setValue(_values);
            treeSliderItem.onSyncChangeOpacityValue((data) => {
            this._map.changeMapOpacity(data);
            this.setMapTreeOpacityValue(data, _child);
        });
        treeSliderItem.onGetTreeOpacityValue((id) => {
            return this.getTreeOpacityValue(id);
        });
        }
        if(_child) {
            this.children.push(_child);
            //_MapSort.setMapLayerSort(_child)
        }
        _MapSort.setMapLayerSort(mapList)
        
        for(let i = 0; i< treeSlider.children.length;i++) {
            var item = treeSlider.children[i];
            item.tree.html.hide()
        }
        for(let i = 0; i< treeSlider.children.length;i++) {
            var item = treeSlider.children[i];
            item[data.id] && item[data.id].html.show()
        }
        
    });
    // tree.onSyncChangeOpacityValue((data) => {
    //     this._map.changeMapOpacity(data);
    //     this.setMapTreeOpacityValue(data, _child);
    // });
    // tree.onGetTreeOpacityValue((id) => {
    //     return this.getTreeOpacityValue(id);
    // });
    
    var subBox = $('<div class="OneMap_LeftBar_subBox"></div>');
    var clearButton = $('<div class="OneMap_LeftBar_clearButton"><i class="fa fa-trash-o" aria-hidden="true"></i></div>').appendTo(subBox);
    clearButton.click(() => {
        this.values = [] // 清空记录的节点，防止重复绘制wdd
        for(let i = 0; i< this.children.length;i++) {
            var item = this.children[i];
            item && item.tree.clearCheckValues();
        }
       // _child.tree.clearCheckValues();
        this._map.leftMenuClear()
        
    });
    //subBox.append(tree.html);
    subBox.append(treeSlider.html)
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