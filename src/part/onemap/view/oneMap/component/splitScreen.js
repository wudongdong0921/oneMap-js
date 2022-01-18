////////////////////////////////////////////////
// 
// 吴东东
// 2021-07-14 10:31:04

import map from "./Map/map"

////////////////////////////////////////////////
var cloneObj = function(obj) {
    var target = {}
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            target[key] = obj[key]
        }
    }
    return target
}
var isObject = (function() {
    var Type = {}
    return function() {
        for(var i = 0,type;type = ['String','Array','Number'][i++];) {
            (function(type) {
                Type['is' + type] = function(obj) {
                    return Object.prototype.toString.call(obj) === '[object '+ type +']'
                }  
            })(type)
        }
        return Type
    }
})()
var setAttributeStyle = function(obj) {
    var clones = cloneObj(obj)
    var style = ""
    for(let key in clones) {
        if(clones.hasOwnProperty(key)) {
            style += key + ':' + clones[key] + ';'
        }
    }
    return style
}
var SplitScreen = function(container,options) {
    if(isObject().isString(container)) {
        container = document.getElementById(container)
    }
    this.container = container
    this.options = options
    this.init()
}
SplitScreen.prototype.init = function() {
    this.initMaps()
    mapboxgl.syncMaps(...this.options.maps)
}
SplitScreen.prototype.initMaps = function() {
    const {mapScreenWidth,mapScreenHeight} = this.getMapContainer()
    var mapObj = {}
    for(var i = 0;i<this.options.maps.length;i++) {
        const map = this.options.maps[i]
        const mapContainer = map.getContainer()
        mapObj[mapContainer.parentNode.parentNode] = map
        mapContainer.parentNode.parentNode.setAttribute('style',setAttributeStyle({
            width: mapScreenWidth + 'px',
            height: mapScreenHeight + 'px',
            position: 'relative'
        }))
        if(!this.waitMapStyleLoad(mapObj[mapContainer.parentNode.parentNode])) {
            this.waitMapStyleLoad(mapObj[mapContainer.parentNode.parentNode])
        }else{
            mapObj[mapContainer.parentNode.parentNode].resize()
        }
        
    }
}
SplitScreen.prototype.getMapContainer = function() {
    const maps = this.options.maps
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const mapScreenWidth = containerWidth/2
    var t = maps.length/2
    const mapScreenHeight = containerHeight/t
    return {
        mapScreenWidth: mapScreenWidth,
        mapScreenHeight: mapScreenHeight
    }
}
SplitScreen.prototype.waitMapStyleLoad = function(map) {
    var TIMEOUT = 100;
    var maxWait = 100000;
    var waited = -1 * TIMEOUT;
    return new Promise((resolve,reject) => {
        var checkStyleLoadEd = function() {
            if(map.isStyleLoaded()) {
                resolve(map)
            }else{
                waited += TIMEOUT
                if(waited >= maxWait){
                    reject('时间过长')
                }else{
                    setTimeout(checkStyleLoadEd,TIMEOUT)
                }
            }
        }
        checkStyleLoadEd()
    })
}
export default SplitScreen