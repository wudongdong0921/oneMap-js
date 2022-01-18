////////////////////////////////////////////////
// 
// 李雪
// 2020-10-14 17:14:35
////////////////////////////////////////////////

var MapViewShow = function (allData, name, divId, readonly) {
    var _this = this;
    this.renderData = allData;
    this.$html = $(`<div class="layui-form-item FUI-form-item">
                    <div id="map" style="position:absolute;left:0px;right:5px;top:0;bottom:5px"></div>
                </div>`);
    this.event = {
        ChangeSelect: function () { },
        clickSelect: function () { },
        getMageInfoData: function () { },
        renderMapView: function () { },
        getMapLayerMessage: function () { },
    };
    this.XZQY = {};
    var XZQY = icu.optionSide.get('XZQY');
    for (let i = 0; i < XZQY.length; i++) {
        const element = XZQY[i];
        this.XZQY[element.dictValue] = element;
    };

    this.mapLayers = [];
    this.loading = icu.loading(this.$html);
};
MapViewShow.prototype.render = function () {
    var _this = this;
    setTimeout(function () {
        _this.init();
    }, 20);
    return this.$html;
};
// MapViewShow.prototype.onGetMageInfoData = function (e) {
//     this.event.getMageInfoData = e;
// };
MapViewShow.prototype.init = function () {
    this.map = new mapboxgl.Map({
        container: this.$html.find('#map')[0], // container id
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
MapViewShow.prototype.onClickSelect = function (event) {
    this.event.clickSelect = event;
};

MapViewShow.prototype.renderPopupHtml = function (code, data) {

    var html = '';
    html += '<div class="mapPopup_mapMessage">';
    html += '   <div class="mapPopup_mapMessage_title">' + this.XZQY[code].dictLabel + '</div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <span> 已入库 : ' + (data ? data['已入库'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <span>  未入库 : ' + (data ? data['未入库'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <span>  审查中 : ' + (data ? data['审查中'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <span>  审查通过 : ' + (data ? data['审查通过'] : 0) + '</span>';
    html += '   </div>';
    html += '   <div class="mapPopup_mapMessage_item">';
    html += '       <span>  审查驳回 : ' + (data ? data['审查驳回'] : 0) + '</span>';
    html += '   </div>';
    html += '</div>';
    return html;
}


MapViewShow.prototype.addLayer = function (data, colorData) {
    // this.mapLayers

    var layerId = "mapView_" + data.id + icu.util.Guid();
    this.mapLayers.push(layerId);
    var geoJson = data.geoJson;


    // const bbox = turf.bbox(geoJson);
    var center = turf.centerOfMass(geoJson);
    // console.log();


    var popup = new mapboxgl.Popup({
        closeButton: false,
        className: 'popupLayers',
        anchor: 'left',
    }).setLngLat(center.geometry.coordinates).setHTML('<div class="mapPopup_mapMessage">加载中</div>');
    // popup.addTo(this.map);
    // popup.close();
    var popupData = false;

    this.map.addSource(layerId, {
        "type": "geojson",
        "data": geoJson
    });
    var color = '#fff';
    var currentarea = {}
    if (colorData != null) {
        //初始化  OnlyAdCodeCount
        if(colorData.OnlyAdCodeCount){
            currentarea = colorData.OnlyAdCodeCount
            if (currentarea.hjstatus == '1') {
                color = '#77abee';
            } else if (currentarea.hjstatus == '0') {
                color = '#e9e9e9';
            }
        }
        if (colorData.listMap) {
            for (let i = 0; i < colorData.listMap.length; i++) {
                const element = colorData.listMap[i];
                if (element.dictValue == data.xzbm) {
                    currentarea = element;
                    if (element.hjstatus == '1') {
                        color = '#77abee';
                    } else if (element.hjstatus == '0') {
                        color = '#e9e9e9';
                    }
                }
            }
        }
    }

    this.map.addLayer({
        "id": layerId,
        "type": "fill",
        "source": layerId,
        "paint": {
            "fill-color": color,
            "fill-outline-color": '#4BBBEE',
        },
    });


    this.map.on('mouseenter', layerId, (e) => {
        popup.addTo(this.map);
        this.map.setPaintProperty(layerId, 'fill-color', '#5c98e7');
        if (!popupData) {
            popupData = true;
            this.event.getMapLayerMessage(data.xzbm, (res) => {
                popup.setHTML(this.renderPopupHtml(data.xzbm, res.data.rramsAchievementCount));
            });
        };
    });

    this.map.on('mouseleave', layerId, () => {
        popup.remove();
        if (currentarea.hjstatus == '0') {
            this.map.setPaintProperty(layerId, 'fill-color', '#e9e9e9');
        } else if (currentarea.hjstatus == '1') {
            this.map.setPaintProperty(layerId, 'fill-color', '#77abee');
        }else{
            this.map.setPaintProperty(layerId, 'fill-color', "#fff");
        }
    });



};
MapViewShow.prototype.onGetMapLayerMessage = function (e) {
    this.event.getMapLayerMessage = e;
};

MapViewShow.prototype.renderMapView = function (data, colorData) {
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
                xzbm: element.properties.adcode,
                id: element.properties.adcode,
            }, colorData);
        };
    };

    if (data.length == 1) {
        const bbox = turf.bbox(data[0].geometry);
        this.map.fitBounds(bbox, { padding: 50 });
    };
};



export default MapViewShow