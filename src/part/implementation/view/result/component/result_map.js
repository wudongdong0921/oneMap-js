
var viewMap = function () {

    this.html = $('<div class="layui-form-item FUI-form-item">' +
        '<div id="map"></div>' +
        '</div> ');

    this.event = {
        ChangeSelect: function () { },
        clickSelect: function () { }
    };

};
viewMap.prototype.init = function () {
    // var host = 'http://192.168.0.27:8090';
    this.map = new mapboxgl.Map({
        container: this.$html.find('#map')[0], // container id
        style: {
            "version": 8,
            // "sources": {
            //     "raster-tiles": {
            //         "attribution": '',
            //         "type": "raster",
            //         "tiles": [host + '/iserver/services/map-newzrzy-hljxzqh/rest/maps/hljxzqh%40newzrzy-hljxzqh/zxyTileImage.png?z={z}&x={x}&y={y}'],
            //         "tileSize": 256,
            //     },
            // },
            "layers": [{
                "id": "simple-tiles",
                "type": "raster",
                "source": "raster-tiles",
                "minzoom": 0,
                "maxzoom": 22
            }]
        },
        center: [128.14, 48.49],
        zoom: 4.7,
    });
};
viewMap.prototype.addlayer = function () {



};





export default viewMap