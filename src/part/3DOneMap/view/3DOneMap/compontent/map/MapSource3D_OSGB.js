import MINMAXVISIBLE from './minMaxVisible'
var MapSource3D_OSGB = function (url, data, viewer) {
    this.data = data;
    this.url = url + '/config';
    this.viewer = viewer;
    this.layer = null;
    this.promise = null;
};
MapSource3D_OSGB.prototype.addToViewer = function () {
    this.promise = this.viewer.scene.addS3MTilesLayerByScp(this.url, { name: this.data.mapId });
    Cesium.when(this.promise, (layer) => {
        this.layer = layer;
        this.layer.minVisibleAltitude = MINMAXVISIBLE[this.data.maxShowLevel].max;
		this.layer.maxVisibleAltitude = MINMAXVISIBLE[this.data.minShowLevel].min;
    });
};
MapSource3D_OSGB.prototype.view = function () {
    if (this.layer === null) {
        return;
    };
    var ceterCartesianPosition = this.layer._position;
    var boundingSphere = new Cesium.BoundingSphere(ceterCartesianPosition, 200);
    var camera = this.viewer.scene.camera;
    camera.flyToBoundingSphere(boundingSphere);
};
MapSource3D_OSGB.prototype.removeToViewer = function () {
    this.viewer.scene.layers.remove(this.data.mapId, true);
};
export default MapSource3D_OSGB;