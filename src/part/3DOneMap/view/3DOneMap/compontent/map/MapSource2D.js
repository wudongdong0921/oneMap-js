var MapSource2D = function (url, data, viewer) {
    this.data = data;
    this.url = url;
    this.mapOrder = data.mapOrder
    this.ImageryProvider = new Cesium.SuperMapImageryProvider({
        url: url//经纬度地图服务
    });
    this.imageryLayers = {};
    this.imageryItemLayer = null;

    this.json = null;
    this.viewer = viewer;
};
// MapSource2D.prototype.addToViewer = function () {
//     this.imageryLayers = this.viewer.imageryLayers.addImageryProvider(this.ImageryProvider);
// };
// wdd
MapSource2D.prototype.addToViewerSort = function (item) {
    //this.clearMapTwo()
    const LAYER = this.viewer.imageryLayers.addImageryProvider(item.ImageryProvider);
    this.imageryLayers[item.data.mapId] = LAYER
    this.imageryItemLayer = LAYER
};

MapSource2D.prototype.view = function () {
    if (this.json) {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(this.json.center.x, this.json.center.y, 100000),
            duration: 3
        });
    } else {
        $.ajax({
            url: this.url + '.json',
            success: (res) => {
                this.json = res;
                this.viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(res.center.x, res.center.y, 100000),
                    duration: 3
                });
            },
        });
    };
};

MapSource2D.prototype.removeToViewer = function () {
    this.viewer.imageryLayers.remove(this.imageryItemLayer);
};

//wdd
// MapSource2D.prototype.removeToViewerSort = function (item) {
//     console.log(item)
//     const ITEM = this.imageryLayers[item.data.mapId]
//     this.viewer.imageryLayers.remove(ITEM);
// };
export default MapSource2D