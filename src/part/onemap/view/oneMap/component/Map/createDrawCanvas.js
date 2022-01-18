// //根据geojson绘制面，点
var MapSourceLayer = function (obj) {
    this.parent = obj
    obj.parent.mapTop.addSource(obj.id, {
        "type": "geojson",
        "data": obj.data
    });
    switch (obj.type) {
        case 'fill':
            obj.parent.mapTop.addLayer({
                "id": obj.id,
                "type": "fill",
                "paint": {
                    "fill-color": "#80FFFF",
                    /* 填充的颜色 */
                    "fill-outline-color": "#188ae2",
                    "fill-opacity": 0.15 /* 透明度 */
                },
                "source": obj.id,
                'filter': ['==', '$type', 'Polygon']
                // minzoom: 0,
                // maxzoom: 17
            });
            break;
        case 'circle':
            obj.parent.mapTop.addLayer({
                'id': obj.id,
                'type': 'circle',
                'source': obj.id,
                'paint': {
                    'circle-radius': 6,
                    'circle-color': '#B42222'
                },
            });
            break;
        case 'line':
            obj.parent.mapTop.addLayer({
                'id': obj.id,
                'type': 'line',
                "source": obj.id,
                "paint": {
                    "line-color": "#fff",
                    "line-width": 3,
                },
            });
    }

}
//根据geojson绘制面，点
// var MapSourceLayer = function (obj) {
//     this.parent = obj
//     const sourceId = obj.id
//     obj.parent.mapTop.addSource(sourceId, {
//         "type": "geojson",
//         "data": obj.data
//     });
//     obj.parent.mapTop.addLayer({
//         "id": obj.parent.util.Guid(),
//         "type": "fill",
//         "paint": {
//             "fill-color": "#80FFFF",
//             /* 填充的颜色 */
//             "fill-outline-color": "#188ae2",
//             "fill-opacity": 0.5 /* 透明度 */
//         },
//         "source": sourceId,
//         'filter': ['==', '$type', 'Polygon']
//         // minzoom: 0,
//         // maxzoom: 17
//     });
//     obj.parent.mapTop.addLayer({
//         'id': obj.parent.util.Guid(),
//         'type': 'circle',
//         'source': sourceId,
//         'paint': {
//             'circle-radius': 6,
//             'circle-color': '#B42222'
//         },
//     });
//     obj.parent.mapTop.addLayer({
//         'id': obj.parent.util.Guid(),
//         'type': 'line',
//         "source": sourceId,
//         "paint": {
//             "line-color": "#fff",
//             "line-width": 3,
//         },
//     });

// }
//通过id删除图层
MapSourceLayer.prototype.removeSourceTool = function () {
    this.parent.parent.mapTop.getLayer(this.parent.id) && this.parent.parent.mapTop.removeLayer(this.parent.id)
    // this.parent.parent.mapTop.getSource(this.parent.id) && this.parent.parent.mapTop.removeSource(this.parent.id)
}
export default MapSourceLayer