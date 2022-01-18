
var mapAddLayerManger = (function() {
    var addLayerTypeCommon = function (obj) {
        obj.map.getLayer(obj.sourceData.mapId) || obj.map.addLayer({
            id: obj.sourceData.mapId,
            type: 'raster',
            source: obj.sourceData.mapId,
            "minzoom": 0,
            "maxzoom": 17

        }, obj.beforeId);
    }
    var addArcMap = function(obj){
        obj.map.getSource(obj.sourceData.mapId) || obj.map.addSource(obj.sourceData.mapId, {
            "type": 'raster',
            "tiles": [obj.sourceData.mapAddress + '?prjCoordSys={"epsgCode":4490}'],
            //"tiles": [sourceData.mapAddress]
            "tileSize": 256,
            rasterSource: 'iserver',
        });
        addLayerTypeCommon(obj)
    }
    var addLatitue = function(obj){
        obj.map.getSource(obj.sourceData.mapId) || obj.map.addSource(obj.sourceData.mapId, {
            "type": 'raster',
            //"tiles": [obj.sourceData.mapAddress + '/zxyTileImage.png?prjCoordSys={"epsgCode":4490}&z={z}&x={x}&y={y}&transparent=true'], //http://192.168.0.38:8090/iserver/services/map-TDLY-LS/rest/maps/龙沙区现状图
            "tiles": [obj.sourceData.mapAddress],
            "tileSize": 256,
            rasterSource: 'iserver',
        });
        addLayerTypeCommon(obj)
    }
    return {
        addArcMap: addArcMap,
        addLatitue: addLatitue
    }
})()
var mapAddLayer = function () {
    this.cache = {
        isLayerArcMap: 'addArcMap',
        islayerLatitue: 'addLatitue'
    }
}
mapAddLayer.prototype.addMapType = function (type,obj) {
    mapAddLayerManger[this.cache[type]](obj)
    // for(let key in this.cache) {
    //     if(key === type) {
    //         let typeMap = this.cache[key]
    //         mapAddLayerManger[typeMap].apply(this,obj)
    //         return false
    //     }
    // }
    
}
export default mapAddLayer