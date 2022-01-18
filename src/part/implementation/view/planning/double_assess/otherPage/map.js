var MapBoxGlView = function (options) {
    var _this = this;
    this._html = $(`<div class="layui-form-item FUI-form-item">
                        <div id="map" style="position:absolute;left:0px;right:5px;top:0;bottom:5px"></div>
                    </div>`);
    this.option = $.extend({}, {

    }, options)
    this.event = {
        renderMapView: function () { },
        getMapLayerMessage: function () { }
    }
    this.XZQH = {};
    var XZQY = icu.optionSide.get('XZQY');
    for (let i = 0; i < XZQY.length; i++) {
        const item = XZQY[i];
        this.XZQH[item.dictValue] = item;
    }
    this.mapLayers = [];
    this.loading = icu.loading(this._html);
    this.popupXzbm = '';
}

MapBoxGlView.prototype.setCenter = function(data){
    const bbox = turf.bbox(data[0].geometry);
    this.map.fitBounds(bbox, { padding: 50, maxZoom: 6.7 });
}
MapBoxGlView.prototype.render = function () {
    var _this = this;
    setTimeout(function () {
        _this.init();
    }, 20);
    return this._html;
};

MapBoxGlView.prototype.init = function () {
    this.map = new mapboxgl.Map({
        container: this._html.find('#map')[0], // container id
        style: {
            version: 8,
            name: "BlankMap",
            sources: {},
            layers: [{
                id: 'background',
                type: 'background',
                paint: { 'background-color': '#fff' } /* 背景颜色 */
            }]
        },
        center: [128.14, 48.49],
        zoom: 4.7,
    });
}

MapBoxGlView.prototype.addColorLayer = function (data, options) {
    this.onGetMapLayerMessage((code, callback) => {
        data.forEach(element => {
            if(element.xzbm == code){
                callback(element);
                return;
            }
            // if (element.xzqhId == code) {
            //     callback(element);
            //     return;
            // }
        });
    });
    for (let i = 0; i < data.length; i++) {
        var item = data[i];
        var layerId = "mapView_" + item.id + icu.util.Guid();
        this.mapLayers.push(layerId);
        var geoJson = item.geoJson;
        this.map.addSource(layerId, {
            "type": "geojson",
            "data": geoJson
        });
        this.map.addLayer({
            "id": layerId,
            "type": "fill",
            "source": layerId,
            "paint": {
                "fill-color": item.color,
                "fill-outline-color": '#4BBBEE',
            },
        });
    }
}

MapBoxGlView.prototype.addLayer = function (data) {
    var geoJson = data.geoJson;
    var layerId = "mapView_" + data.id + icu.util.Guid();
    this.mapLayers.push(layerId);
    this.map.addSource(layerId, {
        "type": "geojson",
        "data": geoJson
    });
    this.map.addLayer({
        "id": layerId,
        "type": "fill",
        "source": layerId,
        "paint": {
            "fill-color": "#E7E7E7",
            "fill-outline-color": '#4BBBEE',
        },
    });

    var geoJson = data.geoJson;
    var center = turf.centerOfMass(geoJson);
    var popup = new mapboxgl.Popup({
        closeButton: false,
        className: 'popupLayers',
        anchor: 'left',
    }).setLngLat(center.geometry.coordinates).setHTML('<div class="mapPopup_mapMessage"></div>');
    this.map.on('mouseenter', layerId, (e) => {
        this.popupXzbm = data.xzbm;
        this.event.getMapLayerMessage(data.xzbm, (res) => {
            popup.addTo(this.map);
            popup.setHTML(this.renderPopupHtml(res));
        })
    });
    this.map.on('mouseleave', layerId, () => {
        popup.remove();
        this.map.setPaintProperty(layerId, 'fill-color', "#E7E7E7");
    });
}

/**
 * 指标类型的popup
 */
MapBoxGlView.prototype.renderPopupHtml = function (res) {
    var html = '';
    html += '<div class="mapPopup_mapMessage">';
    html += '   <div class="mapPopup_mapMessage_title">' + res.areaName + '</div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    //html += '       <div class="mapPopup_mapMessage_image label_color" style="background-color:' + res.color + ';"></div><span>' + res.monitorSituation + '</span>';
    html += '       <div class="mapPopup_mapMessage_image label_color" style="background-color:' + res.color + ';"><div class="label_color" style="margin-left:48px;line-height:15px;;width:50px;">' + res.monitorSituation + '</div></div>';
    html += '   </div>';
    // res.forEach(element => {
    //     html += '   <div class="mapPopup_mapMessage_item">';
    //     html += '       <span> ' + element.indexName + '：' + element.planTyv + element.unitName+'</span>';
    //     html += '   </div>';
    //     html += '   <div class="mapPopup_mapMessage_item">';
    //     html += '       <span> ' + element.indexName + '：' + element.monitoringValue + element.unitName+'</span>';
    //     html += '   </div>';
    // });
        html += '   <div class="mapPopup_mapMessage_item">';
        html += '       <span> ' + '规划值' + '：' + res.planTyv + ((res.unitCode == null) ? '' : res.unitCode) +'</span>';
        html += '   </div>';
        html += '   <div class="mapPopup_mapMessage_item">';
        html += '       <span> ' + '执行情况' + '：' + res.ieValue + ((res.unitCode == null) ? '' : res.unitCode) +'</span>';
        html += '   </div>';

    html += '</div>';
    return html;
}

MapBoxGlView.prototype.onGetMapLayerMessage = function (e) {
    this.event.getMapLayerMessage = e;
};

MapBoxGlView.prototype.renderMapView = function (data) {
    for (let i = 0; i < this.mapLayers.length; i++) {
        const element = this.mapLayers[i];
        this.map.off('mouseenter', element);
        this.map.off('mouseleave', element);
        this.map.removeLayer(element);
        this.map.removeSource(element);
    }
    this.mapLayers = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element) {
            this.addLayer({
                geoJson: element.geometry,
                xzbm: element.properties.XZQDM,
                id: element.properties.SMID,
            });
        };
    };
    if (data.length == 1) {
        const bbox = turf.bbox(data[0].geometry);
        this.map.fitBounds(bbox, { padding: 50 });
    };
}

MapBoxGlView.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

export default MapBoxGlView;