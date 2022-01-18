import mapComTool from './../../../../../../common/mapComTool'
import mapAddLayer from './mapAddLayer'
const MapSort = function () {
    this.layerSort = {}
    this._mapAddLayer = new mapAddLayer()
}
MapSort.prototype.setMapLayerSort = function (mapList) {
    this.layerItem = {}
    // const {
    //     tree
    // } = _child
    // const list = mapComTool.getAllLayer(tree.data)
    const list = mapComTool.getAllLayer(mapList)
    list.forEach(item => {
        this.layerItem[item.dtxxbId] = new MapSortItem(item)
    })
    //this.layerSort[tree.data.id] = this.layerItem
}
const MapSortItem = function (data) {
    this.id = data.id
    this.mapOrder = data.mapOrder
    this.mapId = data.dtxxbId
    this.name = data.name
}
MapSort.prototype.getItem = function(id) {
    var obj= {}
    obj.layers = this.layerItem
    obj.layerItem = obj.layers[id]
    // for(let item in this.layerItem) {
    //     obj.layerItem = this.layerItem[item]
    // }
    // for(let key in this.layerSort) {
    //     for(let item in this.layerSort[key]) {
    //         if(id === item) {
    //             obj.layerItem = this.layerSort[key][item]
    //             obj.layers = this.layerSort[key]
    //     }
    // }}
    return obj
}
MapSort.prototype.addSortLayer = function(obj){
    const {sourceData,map,permissionsList,rollerFilag,data} = obj
    if(sourceData) {
        const layer = this.getItem(sourceData.mapId)
        if(permissionsList.length>0) {
            layer.layers[String(permissionsList[0].id)] = {
                mapId: String(permissionsList[0].id),
                mapOrder: "0"
            }
        }
        obj.layers = layer.layers
        obj.layer = layer.layerItem
        const beforeId = mapComTool.getMinId(obj)
        obj.beforeId = beforeId
        this.addSourceLayer(obj)
    }
    
}

MapSort.prototype.addSourceLayer = function(obj) {
    const {map,beforeId,sourceData,permissionsList} = obj
    var type
    if(sourceData.dynamicProjection === 1){
        type = 'isLayerArcMap'
    }else{
        type = 'islayerLatitue'
    }
    this._mapAddLayer.addMapType(type,obj)
    // if (permissionsList.length > 0) {
    //     map.getLayer(sourceData.mapId) || map.addLayer({
    //         id: sourceData.mapId,
    //         type: 'raster',
    //         source: sourceData.mapId,
    //         "minzoom": 0,
    //         "maxzoom": 17

    //     }, beforeId);
    // } else {
    //     map.getLayer(sourceData.mapId) || map.addLayer({
    //         id: sourceData.mapId,
    //         type: 'raster',
    //         source: sourceData.mapId,
    //         "minzoom": 0,
    //         "maxzoom": 17

    //     }, beforeId);
    // }

}
export default MapSort