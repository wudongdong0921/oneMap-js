
import MINMAXVISIBLE from './minMaxVisible'
var MapSource3D_DEM = function (url, data, viewer) {
    this.data = data;
    this.url = url;
    this.viewer = viewer;
    this.layer = null;
    this.promise = null;
};
MapSource3D_DEM.prototype.addToViewer = function () {
    this.terrainProvider = new Cesium.CesiumTerrainProvider({
        url: this.url,
        requestWaterMask: false,
        requestVertexNormals: false,
        isSct: true
    });
    // this.promise = this.viewer.scene.addS3MTilesLayerByScp(this.url, { name: this.data.mapId });
    Cesium.when(this.terrainProvider.readyPromise, (layer) => {
        this.layer = this.terrainProvider;
        this.viewer.terrainProvider = this.terrainProvider;
        this.layer.minVisibleAltitude = MINMAXVISIBLE[this.data.maxShowLevel].max;
		this.layer.maxVisibleAltitude = MINMAXVISIBLE[this.data.minShowLevel].min;
    });
};
MapSource3D_DEM.prototype.view = function () {
    if (this.layer === null) {
        return;
    };
    var layer = this.layer;
    var west = Cesium.Math.toRadians(layer._bounds.west);
    var south = Cesium.Math.toRadians(layer._bounds.south);
    var east = Cesium.Math.toRadians(layer._bounds.east);
    var north = Cesium.Math.toRadians(layer._bounds.north);
    var rectangle = new Cesium.Rectangle(west, south, east, north);
    var camera = this.viewer.scene.camera;
    camera.flyTo({
        destination: rectangle
    });
};
MapSource3D_DEM.prototype.removeToViewer = function () {
    this.viewer.scene.layers.remove(this.data.mapId, true);
    this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
};
export default MapSource3D_DEM