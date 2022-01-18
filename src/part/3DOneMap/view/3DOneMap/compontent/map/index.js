import MapSource3D_OSGB from './MapSource3D_OSGB.js';
import MapSource2D from './MapSource2D.js';
import MapSource3D_DEM from './MapSource3D_DEM';
import MapSource_TDT from './MapSourceTdt';

var map = function (id) {
    this.mapList = []
    this.viewer = new Cesium.Viewer(id, {
        selectionIndicator: false,
        infoBox: false
    });
    this.event = {
        getSortFaction: function(){}
    }
    var scene = this.viewer.scene;
    scene.globe.enableLighting = false;
    // viewer.scene.globe.enableLighting = false;
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.imageryLayers = this.viewer.imageryLayers
    this.childrenData = {};

    //wdd 挂事件
    // this.viewer.camera.changed.addEventListener((percentage) => {
    //     console.log(percentage)
    // })
    // var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    
    // handler.setInputAction((e) => {
    //     console.log(e)
    //     var rectangle = this.viewer.camera.computeViewRectangle();
    //     var west =rectangle.west / Math.PI * 180;
    //     var east = rectangle.east / Math.PI * 180;
    //     console.log(west,east)
    //     // this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = minZoom;
    //     // this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = maxZoom;
    // }, Cesium.ScreenSpaceEventType.WHEEL)
};
map.prototype.viewMap = function (data) {
    var id = data.mapId;
    if (this.childrenData.hasOwnProperty(id)) {
        const element = this.childrenData[id];
        element.view();
    }
};

map.prototype.change = function (data, type) {
    var id = data.mapId;
    var url = data.url;
    if (!id || !url) {
        return;
    };
    if (this.childrenData.hasOwnProperty(id) && type === false) {
        data.mapType === '2D' && this.changeRemoveMapSort(this.mapList,id)
        const element = this.childrenData[id];
        element.removeToViewer && element.removeToViewer();
        delete this.childrenData[id];
    } else if (!this.childrenData.hasOwnProperty(id) && type === true) {

        if (data.mapType == 'S3MB') {
            var _map = new MapSource3D_OSGB(data.url, data, this.viewer);
        } else if (data.mapType == 'DEM') {
            var _map = new MapSource3D_DEM(data.url, data, this.viewer);
        } else if (data.mapType == 'TDT') {
            var _map = new MapSource_TDT(data.url, data, this.viewer);
        } else {
            var _map = new MapSource2D(data.url, data, this.viewer);
            // wdd
            
            var mapOrders = this.mapList
            var obj = {
                data: data,
                mapOrders: mapOrders,
                _map: _map
            }
            this.mapList.push(data.mapId)
            this.changeMapSort(obj)
        };
        this.childrenData[id] = _map;
        _map.addToViewer && _map.addToViewer();
    };
};
//wdd
map.prototype.getSortFaction = function(event) {
    this.event.getSortFaction = event
}
// map.prototype.mapSort = function(list) {
//     list.sort(function (a, b) {
//         return b.mapOrder - a.mapOrder
//     })
// }
//wdd
map.prototype.changeMapSort = function(obj) {
    this.event.getSortFaction({
        sourceData: obj.data,
        mapOrders: obj.mapOrders,
        _map: obj._map
    })
}
//wdd
map.prototype.changeRemoveMapSort = function(list,id) {
    for(let i =0;i<list.length;i++) {
        const item = list[i]
        if(item === id) {
            list.splice(i, 1)
        }
    }
}


export default map;

