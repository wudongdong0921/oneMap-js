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
    // this.popups = [];
    //this.popup=''
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

// MapViewShow.prototype.renderPopupHtml = function (code, data) {
//     var html = '';
//     html += '<div class="mapPopup_mapMessage">';
//     html += '   <div class="mapPopup_mapMessage_title">' + this.XZQY[code].dictLabel + ':' + (data.workProgressCode ? data.workProgressCode : "暂无进度") + '</div>';
//     html += '</div>';
//     return html;
// }
MapViewShow.prototype.renderPopupHtml = function (code, data) {

    var html = '';
    try{
        html += '<div class="mapPopup_mapMessage">';
        html += '   <div class="mapPopup_mapMessage_title">' + this.XZQY[code].dictLabel + '</div>';
        html += '   <div class="mapPopup_mapMessage_item">';
        html += '       <span>' + (data.workProgressCode ? data.workProgressCode : "暂无进度") + '</span>';
        html += '   </div>';
        html += '</div>';
    } catch (e){

    }
    return html;
}


MapViewShow.prototype.addLayer = function (data, mapdata) {
    // this.mapLayers

    var layerId = "mapView_" + data.id + icu.util.Guid();

    //console.log(layerId);

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
    // this.popups.push(popup);
    // console.log(popup)
    var popupData = false;

    this.map.addSource(layerId, {
        "type": "geojson",
        "data": geoJson
    });
    var color = '#fff';
    var currentarea = {}
    if (mapdata != null) {
        if (mapdata[0] != null) {
            for (let i = 0; i < mapdata.length; i++) {
                const element = mapdata[i];
                if (element.dictValue == data.xzbm) {
                    currentarea = element;
                    if (LTrim(RTrim(element.workProgressCode)) == '制定方案') {
                        color = '#d6cece';
                    } else if (LTrim(RTrim(element.workProgressCode)) == '建立专家咨询机制') {
                        color = '#aaaaaa';
                    } else if (LTrim(RTrim(element.workProgressCode)) == '展开专题研究') {
                        color = '#8bb2e7';
                    } else if (LTrim(RTrim(element.workProgressCode)) == '完成初步方案') {
                        color = '#5c98e7';
                    } else if (LTrim(RTrim(element.workProgressCode)) == '成果汇总') {
                        color = '#2e7de7';
                    } else if (LTrim(RTrim(element.workProgressCode)) == '成果报批') {
                        color = '#2a5393';
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

    // this.event.getMapLayerMessage(data.xzbm, (res) => {
    // this.popup.remove()

    this.map.on('click', layerId, function () {
        popup.remove();
        _this.event.clickSelect(currentarea)
    })
    var _this = this;


    this.map.on('mouseenter', layerId, (e) => {
        popup.addTo(this.map);
        if (LTrim(RTrim(currentarea.workProgressCode)) == '制定方案') {
            this.map.setPaintProperty(layerId, 'fill-color', '#d6cece');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '建立专家咨询机制') {
            this.map.setPaintProperty(layerId, 'fill-color', '#aaaaaa');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '展开专题研究') {
            this.map.setPaintProperty(layerId, 'fill-color', '#8bb2e7');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '完成初步方案') {
            this.map.setPaintProperty(layerId, 'fill-color', '#5c98e7');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '成果汇总') {
            this.map.setPaintProperty(layerId, 'fill-color', '#2e7de7');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '成果报批') {
            this.map.setPaintProperty(layerId, 'fill-color', '#2a5393');
        } else {
            this.map.setPaintProperty(layerId, 'fill-color', '#fff');
        }
        if (!popupData) {
            popupData = true;
            popup.setHTML(this.renderPopupHtml(data.xzbm, currentarea));

        };
    });

    this.map.on('mouseleave', layerId, () => {
        popup.remove();
        if (LTrim(RTrim(currentarea.workProgressCode)) == '制定方案') {
            this.map.setPaintProperty(layerId, 'fill-color', '#d6cece');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '建立专家咨询机制') {
            this.map.setPaintProperty(layerId, 'fill-color', '#aaaaaa');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '展开专题研究') {
            this.map.setPaintProperty(layerId, 'fill-color', '#8bb2e7');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '完成初步方案') {
            this.map.setPaintProperty(layerId, 'fill-color', '#5c98e7');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '成果汇总') {
            this.map.setPaintProperty(layerId, 'fill-color', '#2e7de7');
        } else if (LTrim(RTrim(currentarea.workProgressCode)) == '成果报批') {
            this.map.setPaintProperty(layerId, 'fill-color', '#2a5393');
        } else {
            this.map.setPaintProperty(layerId, 'fill-color', '#fff');
        }
        //this.map.setPaintProperty(layerId, 'fill-color', "#E7E7E7");
    });

    //if(data)

};
function LTrim(str){
    var i;
    if(str){
        for(i=0;i<str.length;i++){
            if(str.charAt(i)!=" ")
                break;
        }
        str = str.substring(i,str.length);
    }

    return str;
}

function RTrim(str){
    var i;
    if(str){
        for(i=str.length-1;i>=0;i--){
            if(str.charAt(i)!=" ")
                break;
        }
        str = str.substring(0,i+1);
    }

    return str;
}

MapViewShow.prototype.onGetMapLayerMessage = function (e) {
    this.event.getMapLayerMessage = e;
};

MapViewShow.prototype.renderMapView = function (data, colorData) {
    // this.popups
    // console.log(this.popups);

    // for (let i = 0; i < this.popups.length; i++) {
    //     const element = this.popups[i];
    //     element.setHTML('<div style="display:none">加载中</div>');
    // }

    for (let i = 0; i < this.mapLayers.length; i++) {
        const element = this.mapLayers[i];
        this.map.off('mouseenter', element);
        this.map.off('mouseleave', element);
        // this.map.off('click', element);
        //this.map.off('click',element);
        this.map.removeLayer(element);
        this.map.removeSource(element);
    }
    this.mapLayers = [];
    for (let i = 0; i < data.length; i++) {
        const itemData = data[i];
        if (itemData && $.inArray(itemData.properties.adcode, this.mapLayers) == -1) {
            this.addLayer({
                geoJson: itemData.geometry,
                xzbm: itemData.properties.adcode,
                id: itemData.properties.adcode,
            }, colorData);
        };
    };

    if (data.length == 1) {
        const bbox = turf.bbox(data[0].geometry);
        this.map.fitBounds(bbox, { padding: 50 });
    };
};



export default MapViewShow