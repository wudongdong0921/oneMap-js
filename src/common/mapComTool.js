const getAllLayer = function (source) {
    // var target_arr = []
    // var list = source.children
    // const ReshSource = function (arr) {
    //     arr.forEach(item => {
    //         if (item.type === 'map') {
    //             target_arr.push(item)
    //         }
    //         if (item.children.length > 0) {
    //             ReshSource(item.children)
    //         }

    //     });
    // }
    // ReshSource(list)
    return source
}
const getMinId = function(obj) {
    const {mapLayers,mapOrders,sourceData,layers,layer} = obj
    let min = Number(layer.mapOrder)
    let beforeId = ""
    let newArr= []
    mapOrders.forEach((item,index) => {
        const layerMap = layers[item]
        var index = layerMap && (layer.mapOrder - layerMap.mapOrder)
        if(layerMap && index>0) {
            newArr[index] = layerMap.mapId
            // min = layerMap.mapOrder
            // beforeId = layerMap.mapId
        }
        
    })
    for(var i=0;i<newArr.length;i++){
        if(newArr[i]) {
            return beforeId = newArr[i]
        }
    }
    return beforeId
}
export default {
    getAllLayer: getAllLayer,
    getMinId: getMinId
}