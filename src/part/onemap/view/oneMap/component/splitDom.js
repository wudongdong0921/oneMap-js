
// ////////////////////////////////////////////////
// // 
// // 吴东东
// // 2021-07-14 13:22:05
// ////////////////////////////////////////////////
import SplitScreen from "./splitScreen"
var SplitDom = function (options, doms) {
    this.map = options.map
    this.LeftBar = options.LeftBar
    this.MapSource = options.MapSource
    this.MapSort = options.MapSort
    this.doms = options.doms
    this._Double = options._Double
    this.menuData = options.menuData
    this._MapSymbol = options._MapSymbol
    this._Analyse = options._Analyse
    this._MapTools = options._MapTools
    this.mapList = options.mapList
    this.elBox = options.elBox
    this.mapKeyMapping = options.mapKeyMapping
    this.cache = options.cache
    this.type = options.type
    this.count = 0
    this.counts = options.doms.length
    this.maps = []
    this.LeftBars = []
    this.initDom(options.el)
}
var objCreate = (function(fn) {
    var option = {}
    return {
        create: function(obj){
            const {type,maps,el} = obj
            if(option[type]) {
                return option[type]
            }
            return option[type] = new SplitScreen(el,{
                maps:maps
            })
        }
    }
})()
SplitDom.prototype.splitDomFactory = function (fn) {
    var cache = this.cache
    var _self = this
    return {
        create: function (obj) {
            var _obj
            if (cache.length === 0) {
                _obj = fn.call(this, obj)
            } else {
                _self.count ++
                
                _obj = cache.shift()
                //_obj.map.FullscreenControl()
            }
            return _obj
        },
        recover: function (obj) {
            cache.push(obj)
        }
    }
}
SplitDom.prototype.initDom = function (el) {
    var domObj = {}
    var mapObj = {}
    var _this = this
    const MAP = this.map
    const LEFTBAR = this.LeftBar
    const MAPSOURCE = this.MapSource
    const MAPSORT = this.MapSort
    const mapList = this.mapList
    var _splitDomFactory = this.splitDomFactory(function(obj) {
        var map = new MAP(el, _this.menuData)
            //_this.maps.push(map)
            mapObj[i] = map
            obj.domHtml.html(map.comparison)
            var _LeftBar = new LEFTBAR()
            var _MapSource = new MAPSOURCE(map, _this._MapSymbol, _this._Analyse, 'fullFlag', _this._MapTools)
            var _MapSort = new MAPSORT()
            map.getSortFaction((obj) => {
                _MapSort.addSortLayer(obj)
            })
            
            _LeftBar.handleCloseScene(() => {
                _this.elBox.show();
                _this._Double.html.hide()
                _this._MapTools.setToolActive(_this._MapTools.double)
            })
            _this.sceneMapSource(_MapSource, obj.domObj, _MapSort, mapList)
            obj.domHtml.append(_LeftBar.box);
            _LeftBar.renderSubBoxOne(obj.domObj);
            _LeftBar.show(_this.mapKeyMapping.MapSource)
            // _this._Double.html.show()
            _this.elBox.hide()
            map.render(() => {
                //权限
                _this._MapTools.handleToolPermisMap(function (data) {
                    map.handleToolPermisMapControl(data, map.map, () => {
                        _this.count++

                    })
                })
            });
            return {
                map:map,
                domObj:domObj,
                _LeftBar:_LeftBar
            }
    })
    var arr = []
    for (var i = 0; i < this.doms.length; i++) {

        (function (i) {
            
            const dom = _this.doms[i]
            domObj[i] = {}
            var domHtml = _this._Double.html.find('#' + dom)
            var _obj = _splitDomFactory.create({
                domObj:domObj[i],
                domHtml:domHtml
            })
            arr.push(_obj)
            // _obj.map.render(() => {
            //     //权限
            //     _this._MapTools.handleToolPermisMap(function (data) {
            //         _obj.map.handleToolPermisMapControl(data, _obj.map, () => {
            //             _this.count++

            //         })
            //     })
            // });
            
            
        })(i)
    }
    _this._Double.html.show()
    for(let i=0;i<arr.length;i++) {
        _splitDomFactory.recover(arr[i])
        this.maps.push(arr[i].map)
        this.LeftBars.push(arr[i]._LeftBar)
        arr[i]._LeftBar.handleUnfold(() => {
            _this.LeftBars.forEach(item => {
                if (item.off) {
                    item.hide()
                    item.shrink()
                    item.off = false
                } else {
                    item.showScene()
                    item.fold()
                    item.off = true
                }
            })
        })
    }
    
    this._SplitScreenFn()
}
SplitDom.prototype._SplitScreenFn = function () {
    var _this = this
    var arr = []
    if (this.count === this.counts) {
        this.maps.forEach(item => {
            arr.push(item.map)
        })
        // objCreate.create({
        //     el: 'OneMapDouble',
        //     type: _this.type,
        //     maps: arr
        // })
        var _SplitScreen = new SplitScreen('OneMapDouble', {
            maps: arr
        })
    } else {
        setTimeout(this._SplitScreenFn.bind(this), 100)
    }

}
SplitDom.prototype.sceneMapSource = function (ele, mapKey, _MapSort, mapList) {
    for (let i = 0; i < this.menuData.length; i++) {
        const element = this.menuData[i];
        mapKey[element.router] = {
            name: element.name,
            type: element.type,
            icon: element.router,
            event: (function (element) {
                if (element.router == 'MapSource' && element.children) {
                    for (let i = 0; i < element.children.length; i++) {
                        const __element = element.children[i];

                        ele.addChild({
                            menuData: __element.children,
                            mapList: mapList,
                            _MapSort: _MapSort
                        });
                    };
                }
                // if (SourceEvent.hasOwnProperty(element.router)) {
                //     SourceEvent[element.router] = ele;
                // };
                return ele;
            })(element),
        };
    };
}
export default SplitDom