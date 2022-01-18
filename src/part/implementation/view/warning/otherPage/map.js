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
    this.isShowPopup = false;
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
MapBoxGlView.prototype.mapOnload = function (cb) {
    this.map.on('load', function () {
        if (cb) {
            cb()
        }
    })
}

MapBoxGlView.prototype.addColorLayer = function (data, options) {
    this.isShowPopup = options.isShowPopup;
    this.onGetMapLayerMessage((code, callback) => {
        data.forEach(element => {
            if (element.xzqhId == code) {
                if (options.type == 'evaluation') {
                    callback({
                        value: element[options.popupKey],
                        type: options.type,
                        areaName: element[options.areaNameKey],
                        color: element.color
                    });
                } else {
                    callback({
                        monitoringValue: element.monitoringValue,
                        planTyv: element.planTyv,
                        type: options.type,
                        areaName: element[options.areaNameKey],
                    });
                }
                return;
            }
        });
        callback({ value: '' });
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
        if (!this.isShowPopup) return;
        this.popupXzbm = data.xzbm;
        this.event.getMapLayerMessage(data.xzbm, (res) => {
            if (res.value == '') return;
            popup.addTo(this.map);
            this.map.setPaintProperty(layerId, 'fill-color', '#74A5E7');
            if (res.type == 'evaluation') {
                popup.setHTML(this.renderPopupHtmlEvaluation(res));
            } else {
                popup.setHTML(this.renderPopupHtmlIndex(res));
            }
        })

    });
    this.map.on('mouseleave', layerId, () => {
        if (!this.isShowPopup) return;
        popup.remove();
        this.map.setPaintProperty(layerId, 'fill-color', "#E7E7E7");
    });
}

/**
 * 评估类型的popup
 */
MapBoxGlView.prototype.renderPopupHtmlEvaluation = function (res) {
    var html = '';
    html += '<div class="mapPopup_mapMessage">';
    html += '   <div class="mapPopup_mapMessage_title">' + res.areaName + '</div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:' + res.color + ';"></div><span> ' + res.value + '分</span>';
    html += '   </div>';
    html += '</div>';
    return html;
}

/**
 * 指标类型的popup
 */
MapBoxGlView.prototype.renderPopupHtmlIndex = function (res) {
    var html = '';
    html += '<div class="mapPopup_mapMessage">';
    html += '   <div class="mapPopup_mapMessage_title">' + res.areaName + '</div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:rgba(0,0,0,0);"></div><span> 监测值：' + res.monitoringValue + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:rgba(0,0,0,0);"></div><span> 规划值： ' + res.planTyv + '</span>';
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
                //xzbm: element.properties.XZQDM,
                xzbm: element.properties.adcode,
                //id: element.properties.SMID,
            });
        };
    };
    // if (data.length == 1) {
    //     const bbox = turf.bbox(data[0].geometry);
    //     this.map.fitBounds(bbox, { padding: 50, maxZoom: 4.7 });
    // } else {
    //     const bbox = turf.bbox(data[0].geometry);
    //     this.map.fitBounds(bbox, { padding: 50, maxZoom: 4.7 });
    // };
}

MapBoxGlView.prototype.setCenter = function (data, level,cb) {
    const bbox = turf.bbox(data[0].geometry);
    if (this.map) {
        let showLevel = 4.7;
        switch (level) {
            case 0:
                showLevel = 4.7;
                break;
            case 1:
                showLevel = 8.7
                break;
            case 2:
                showLevel = 14.7
                break;
            default:
                break;
        }
        this.map.fitBounds(bbox, { padding: 50, maxZoom: showLevel });
        if(cb){
            cb()
        }
    }
}

MapBoxGlView.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

export default MapBoxGlView;