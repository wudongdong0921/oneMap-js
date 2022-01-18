////////////////////////////////////////////////
// 时间轴
// 吴东东
// 2020-11-25 18:00:00
////////////////////////////////////////////////
import Map from "./../Map/map"
import api from "./../../apis/map"
var Sides = function (data, parent,index) {
    var _this = this
    this.parent = parent
    this.html = $('<div class="side_item"></div>')
    this.timer = $('<div class="side_timer">' + data.year + '</div>').appendTo(this.html)
    this.circle = $('<div class="side_circle"></div>').appendTo(this.html)
    this.circle.click(function (e) {
        //.eq($(this).index())
        _this.parent.index = index
        clearInterval(_this.parent.timer)
        _this.parent.over.hide()
        _this.parent.play.show()
        for (let i = 0; i < _this.parent.arrList.length; i++) {
            _this.parent.arrList[i].circle.removeClass('active');
            _this.parent._sideMap.map.setLayoutProperty(_this.parent.dataMenuList[i].year, "visibility", "none");
        }
        $(this).addClass('active')
        _this.parent._sideMap.map.setLayoutProperty(data.year, "visibility", "visible");
    })
}
var SideMap = function () {
    this.arrList = []
    this.timer = null
    this.sideMap = $('<div class="side_map_wrapper"></div>')
    this.sideMapBox = $('<div class="side_map_box"></div>').appendTo(this.sideMap)
    this.sideMapId = $('<div id="sideMap"></div>').appendTo(this.sideMapBox)
    this.sideBox = $('<div class="side_box"></div>').appendTo(this.sideMapBox)
    this.box = $('<div class="box"></div>').appendTo(this.sideBox)
    this.sideItem = $('<div class="box_item_box"></div>').appendTo(this.box)
    this.play = $('<div class="play"><span class="iconfont icon-kaishi1"></span></div>').appendTo(this.box)
    this.over = $('<div class="over"><span class="iconfont icon-kaishi"></span></div>').appendTo(this.box)
    this.backOut = $('<div class="backOut iconfont icon-jieshu"></div>').appendTo(this.box)
    this.sideMap.hide()
    this.over.hide()
    
    //this.sideBox.hide()
    this.play.click(() => {
        this.play.hide()
        this.over.show()
        this.autoPlay()

    })
    this.over.click(() => {
        clearInterval(this.timer)
        this.over.hide()
        this.play.show()
    })
    this.backOut.click(() => {
        clearInterval(this.timer)
        this.sideMap.hide()
        this.play.show()
        this.over.hide()
    })
}
SideMap.prototype.mapSliderPromise = function(mapId){
    var _this = this
    return new Promise((resolve,reject) => {
        api.getTimerMap(mapId, (res) => {
            if(res.code === 200) {
                _this.sideMapId.append(_this._sideMap.comparison)
                resolve(res)
            }
        },(err) => {
            console.log(err)
        })
    })
}
SideMap.prototype.init = function (mapId,_MapTools,sildeMap,code) {
    var _this = this
    this._sideMap = !this.flag ? new Map() : this._sideMap;
    this.index = 0
    this.sideMapId.empty()
    this.sideItem.empty()
    if(!this.flag){
        this._sideMap.render(() => {
            this.siderInit(mapId,code,sildeMap,'333')
        })
    }else{
        this.siderInit(mapId,code,sildeMap)
    } 

}
SideMap.prototype.siderInit = function(mapId,data,sildeMap,t) {
    this.mapSliderPromise(mapId).then((res) => {
        sildeMap.show()
        this.flag = true
        this._sideMap.handleToolPermisMapControl(data)
   this._sideMap.map.resize()
    this.autoTimer = res.data.byInterval
    var list = res.data.pictureMaps
    this.arrList = []
    this.sideBox.show()
    //this._sideMap && this.sideMap.show()
    this.box.show()
    this.dataMenuList = list
    for (let i = 0; i < list.length; i++) {
        var _Sides = new Sides(list[i], this,i)
        this.arrList.push(_Sides)
        this.sideItem.append(_Sides.html)
        this.addMapSource(list)
    }
    },(err) => {
        console.log(err)
    })
}
SideMap.prototype.addMapSource = function (data) {
    setTimeout(() => {
        this.getMaxCode(data)
    }, 200)

    // if (!this.MapSource.hasOwnProperty(data.mapId)) {
    //     this.MapSource[data.mapId] = new MapSource(data);
    //     this.mapDemo.append(this.MapSource[data.mapId].html);
    // };
};
SideMap.prototype.getMaxCode = function (data) {
    // data.sort(function (a, b) {
    //     return b.mapOrder - a.mapOrder
    // })
    for (let i = 0; i < data.length; i++) {
        this._sideMap.map.getSource(data[i].year) || this._sideMap.map.addSource(data[i].year, {
            "type": 'raster',
            "tiles": [data[i].mapAddress],
            "tileSize": 256,
            rasterSource: 'iserver',
        });
        this._sideMap.map.getLayer(data[i].year) || this._sideMap.map.addLayer({
            id: data[i].year,
            type: 'raster',
            source: data[i].year,
            "minzoom": 0,
            "maxzoom": 17

        });
    }
    this.arrList[0].circle.click()
}
SideMap.prototype.autoPlay = function () {
    
    clearInterval(this.timer)
    this.timer = setInterval(() => {
        
        if (this.index >= this.arrList.length) {
            this.index = 0
        }
        for (var i = 0; i < this.dataMenuList.length; i++) {
            this.arrList[i].circle.removeClass('active')
            this._sideMap.map.setLayoutProperty(this.dataMenuList[i].year, "visibility", "none");
        }
        this.arrList[this.index].circle.addClass('active')
        this._sideMap.map.setLayoutProperty(this.dataMenuList[this.index].year, "visibility", "visible");
        this.index++
    }, this.autoTimer*1000);
}
export default SideMap