var CreateLayer = function(id,data,map) {
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
                "fill-color": "rgba(21,69,91,0.56)", /* 填充的颜色 */
                // "fill-outline-color": "#fff",
                "fill-opacity": 1     /* 透明度 */
            },
        });
        //this.init(id,data,map)
}
CreateLayer.prototype.removeMaps = function(mapObj) {
    mapObj.getLayer(this.id) && mapObj.removeLayer(this.id)
    mapObj.getSource(this.id) && mapObj.removeSource(this.id)
}
export default CreateLayer