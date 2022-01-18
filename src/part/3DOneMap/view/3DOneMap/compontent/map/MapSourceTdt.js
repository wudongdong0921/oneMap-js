var MapSourceTdt = function (url, data, viewer) {
    this.data = data;
    this.url = url;
    this.viewer = viewer;
    this.layer = null;
    this.promise = null;
    this.tiandituTk = '03441c15976ca788be3b86fc9a7d0cdd';
    this.subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
}
MapSourceTdt.prototype.addToViewer = function () {
    this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: "http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + this.tiandituTk,
        subdomains: this.subdomains,
        layer: "tdtCiaLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: true
    }));
    this.view()
}

MapSourceTdt.prototype.view = function () {
    this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
        orientation: {
            heading: Cesium.Math.toRadians(348.4202942851978),
            pitch: Cesium.Math.toRadians(-89.74026687972041),
            roll: Cesium.Math.toRadians(0)
        },
        complete: function callback() {
            // 定位完成之后的回调函数
        }
    });
}
MapSourceTdt.prototype.removeToViewer = function () {
    this.viewer.imageryLayers.remove(this.imageryLayers);
};
export default MapSourceTdt;