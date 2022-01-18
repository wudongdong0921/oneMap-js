import mapComTool from './mapComTool'
const MapSort = function () {
    this.layerSort = {}
}
MapSort.prototype.setMapLayerSort = function (_child) {
    this.layerItem = {}
    const {
        tree
    } = _child
    if(tree.data) {
        const list = mapComTool.getAllLayer(tree.data)
    list.forEach(item => {
        this.layerItem[item.mapId] = new MapSortItem(item)
    })
    this.layerSort[tree.data.id] = this.layerItem
    }
    
}
const MapSortItem = function (data) {
    this.id = data.id
    this.mapOrder = data.mapOrder
    this.mapId = data.mapId
    this.name = data.name
}
MapSort.prototype.getItem = function(id) {
    var obj= {}
    for(let key in this.layerSort) {
        for(let item in this.layerSort[key]) {
            if(id === item) {
                obj.layerItem = this.layerSort[key][item]
                obj.layers = this.layerSort[key]
        }
    }}
    return obj
}
MapSort.prototype.addSortLayer = function(obj){
    const {sourceData,_map} = obj
    if(sourceData) {
        const layer = this.getItem(sourceData.mapId)
        // if(permissionsList.length>0) {
        //     layer.layers[String(permissionsList[0].id)] = {
        //         mapId: String(permissionsList[0].id),
        //         mapOrder: "0"
        //     }
        // }
        obj.layers = layer.layers
        obj.layer = layer.layerItem
        const beforeId = mapComTool.getMinId(obj)
        obj.beforeId = beforeId
        _map.addToViewerSort(_map)
    }
    
}

export default MapSort