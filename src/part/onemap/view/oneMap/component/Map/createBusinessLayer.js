var mapBusinessList = []
var CreateLayer = function(id,data,map) {
        this.id = id;
        this.data = data;
        this.map = map;
        mapBusinessList.push(id)
        this.list = mapBusinessList
        this.removeMaps(id)
        this.map.addSource(id, {
            "type": "geojson",
            "data": data
        });
        this.map.addLayer({
            "id": id,
            "type": "fill", /* fill类型一般用来表示一个面，一般较大 */
            "source": id,
            "paint": {
                "fill-color": "rgba(0,0,0,0.15)", /* 填充的颜色 */
                "fill-outline-color": "#188ae2",
                "fill-opacity": 1     /* 透明度 */
            },
        });
        //this.init(id,data,map)
        this.view()
}
CreateLayer.prototype.removeMaps = function(id) {
        this.map.getLayer(this.id) && this.map.removeLayer(this.id)
        this.map.getSource(this.id) && this.map.removeSource(this.id)
}
CreateLayer.prototype.view = function () {
    // var data = this.map.getSource(this.id);
    var boundingBox = turf.bbox(this.data);
    this.map.fitBounds(boundingBox, { padding: 60 });
};
export default CreateLayer