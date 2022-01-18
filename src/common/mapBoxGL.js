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
        center: [128.14, 45.49],
        zoom: 6.7,
    });
}

MapBoxGlView.prototype.addColorLayer = function (data) {
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
MapBoxGlView.prototype.renderPopupHtml = function (code, data) {

    var html = '';
    html += '<div class="mapPopup_mapMessage">';
    html += '   <div class="mapPopup_mapMessage_title">' + this.XZQY[code].dictLabel + '</div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:#2b5394"></div><span> 已入库 : ' + (data ? data['已入库'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:#2e7de7"></div><span>  未入库 : ' + (data ? data['未入库'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:#5c98e7"></div><span>  质检通过 : ' + (data ? data['质检通过'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:#8bb2e7"></div><span>  审查中 : ' + (data ? data['审查中'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:#2e7de7"></div><span>  审查通过 : ' + (data ? data['审查通过'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <div class="mapPopup_mapMessage_image" style="background-color:#aaaaaa"></div><span>  审查驳回 : ' + (data ? data['审查驳回'] : 0) + '</span>';
    html += '   </div>';
    html += '</div>';
    return html;
}
MapBoxGlView.prototype.addLayer = function (data) {
    var geoJson = data.geoJson;
    var center = turf.centerOfMass(geoJson);
    var popup = new mapboxgl.Popup({
        closeButton: false,
        className: 'popupLayers',
        anchor: 'left',
    }).setLngLat(center.geometry.coordinates).setHTML('<div class="mapPopup_mapMessage">加载中</div>');

    var popupData = false;
    var layerId = "mapView_" + data.id + icu.util.Guid();
    this.mapLayers.push(layerId);
    var center = turf.centerOfMass(geoJson);
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
    this.map.on('mouseenter', layerId, (e) => {
        popup.addTo(this.map);
        this.map.setPaintProperty(layerId, 'fill-color', '#74A5E7');
        if (!popupData) {
            popupData = true;
            this.event.getMapLayerMessage(data.xzbm, (res) => {
                popup.setHTML(this.renderPopupHtml(data.xzbm, res.data.rramsAchievementCount));
            })
        }
    });
    this.map.on('mouseleave', layerId, () => {
        popup.remove();
        this.map.setPaintProperty(layerId, 'fill-color', "#E7E7E7");
    });
}

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