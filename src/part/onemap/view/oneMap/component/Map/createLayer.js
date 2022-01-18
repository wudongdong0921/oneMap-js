var mapList = []
var CreateLayer = function(id,data,map) {
    console.log(id)
        this.id = id;
        this.data = data;
        this.map = map;
        mapList.push(id)
        this.list = mapList
        this.removeMaps()
        this.map.addSource(id, {
            "type": "geojson",
            "data": data
        });
        this.map.addLayer({
            "id": id,
            // "type": "fill", /* fill类型一般用来表示一个面，一般较大 */
            // "source": id,
            // "paint": {
            //     "fill-color": "rgba(0,0,0,0)", /* 填充的颜色 */
            //     "fill-outline-color": "#188ae2",
            //     "fill-opacity": 1     /* 透明度 */
            // },
            "type": "line", /* fill类型一般用来表示一个面，一般较大 */
            "source": id,
            "paint": {
                "line-color": "#3499E5", /* 填充的颜色 */
                "line-width": 3
            },
        });
        //this.init(id,data,map)
        this.view()
}
CreateLayer.prototype.removeMaps = function() {
    for(let i =0;i<this.list.length;i++) {
        //先删集再删源
        this.map.getLayer(this.list[i]) && this.map.removeLayer(this.list[i])
        this.map.getSource(this.list[i]) && this.map.removeSource(this.list[i])
        
    }
}
CreateLayer.prototype.init = function(id,data,map) {
        this.id = id;
        this.data = data;
        this.map = map;
        this.map.addSource(id, {
            "type": "geojson",
            "data": data
        });
        this.map.addLayer({
            "id": id,
            "type": "fill", /* fill类型一般用来表示一个面，一般较大 */
            "source": id,
            "paint": {
                "fill-color": "#F00", /* 填充的颜色 */
                "fill-outline-color": "#fff",
                "fill-opacity": 1     /* 透明度 */
            },
        });
}
CreateLayer.prototype.view = function () {
    // var data = this.map.getSource(this.id);
    var boundingBox = turf.bbox(this.data);
    this.map.fitBounds(boundingBox, { padding: 200 });
};
export default CreateLayer