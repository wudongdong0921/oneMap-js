
var MapSource = function (data) {
    this.html = $('<div class="OneMap_MapSource"></div>');
    this.name = $('<div class="OneMap_MapSource_Name">' + data.name + '</div>').appendTo(this.html);
    this.Opacity = $('<div class="OneMap_MapSource_Opacity">' + data.OpacityValue + '</div>').appendTo(this.html);
};
MapSource.prototype.changeOpacity = function (value) {
    this.Opacity.text(value);
};

var map = function () {
    this.html = $('<div class="OneMap_contentMap"></div>');
    // this.mapDemo = $('<div class="OneMap_mapDemu"></div>').appendTo(this.html);
    this.MapSource = {};
};

map.prototype.changeMapOpacity = function (data) {
    if (this.MapSource.hasOwnProperty(data.id)) {
        this.MapSource[data.id].changeOpacity(data.OpacityValue);
    };
};
map.prototype.addMapSource = function (data) {
    if (!this.MapSource.hasOwnProperty(data.id)) {
        this.MapSource[data.id] = new MapSource(data);
        this.mapDemo.append(this.MapSource[data.id].html);
    };
};
map.prototype.removeMapSource = function (data) {
    if (this.MapSource.hasOwnProperty(data.id)) {
        this.MapSource[data.id].html.remove();
        delete this.MapSource[data.id];
    };
};

map.prototype.render = function (option) {
    var _this = this
    option._api.getMapBottomLarer((res) => {
        //this.mapPermissions = res
        var url = res.data.baseMapAddress
        option._api.getMapVectorstyles(url, (mapStyle) => {
            var zoom = mapStyle.zoom == null ? 0 : mapStyle.zoom;
            option._api.getMapJson(url, (mapConfig) => {
                this.map = new mapboxgl.Map({
                    container: this.html[0],
                    style: {
                        "version": 8,
                        "sources": {
                            "raster-tiles": {
                                "type": "raster",
                                //tiles: [url + '/zxyTileImage.png?prjCoordSys={"epsgCode":4490}&z={z}&x={x}&y={y}'],
                                tiles: [url],
                                rasterSource: 'iserver',
                                "tileSize": 256,
                            }
                        },
                        "layers": [{
                            "id": "simple-tiles",
                            "type": "raster",
                            "source": "raster-tiles",
                            "minzoom": 0,
                            "maxzoom": 18 //最大不能小于设置
                        }]
                    },
                    crs: "EPSG:" + mapConfig.prjCoordSys.epsgCode,
                    center: mapStyle.center,
                    zoom: zoom,
                    maxZoom: 17,
                })


                this.map.on('load', function () {
                    // var _this = this
                    var sql = "";
                    sql = "XZQDM = '230000'";
                    var param = new SuperMap.GetFeaturesBySQLParameters({
                        queryParameter: {
                            name: "XZQDW@全国行政区划",
                            attributeFilter: sql
                        },
                        fromIndex: '0', // 开始查询位置
                        toIndex: '1000', // 结束查询位置
                        datasetNames: ["全国行政区划:XZQDW"]
                    })
                    var queryService = new mapboxgl.supermap.FeatureService(config.InterfaceAddress.iserverService + '/data-XZQDW/rest/data')
                    queryService.getFeaturesBySQL(param, function (serviceResult) {
                        
                        var layers = serviceResult.result.features.features[0].geometry;
                        _this.map.addSource('layerIdAllevent', {
                            "type": "geojson",
                            "data": layers
                        });
                        _this.map.addLayer({
                            "id": 'layerIdAllLayer',
                            "type": "fill",
                            "source": 'layerIdAllevent',
                            "paint": {
                                "fill-color": '#fff',
                                "fill-outline-color": '#4BBBEE',
                            },
                        });
                        const bbox = turf.bbox(layers);
                        setTimeout(function () {
                            _this.map.fitBounds(bbox, {
                                padding: 200
                            });
                        }, 10);
                    });
                    _this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
                    _this.scale = new mapboxgl.ScaleControl({
                        maxWidth: 80,
                        unit: 'imperial'
                    });
                    _this.map.addControl(_this.scale);
                })
                var permissions = ""
                if (_this.permisCode) {
                    permissions = _this.permisCode

                } else {
                    if (res.data.codeDistrict) {
                        permissions = res.data.codeDistrict;
                    } else {
                        permissions = res.data.codeCity ? res.data.codeCity : res.data.codeProvince
                    }
                }
                this.permissionsBase = permissions
                //_this.setMapPermissions(permissions)

            });
        });
    })
    return this.html;
};

//绘制点
map.prototype.handlePointControl = function () {
    //this.map.off('draw.create', this.serviceMapClass)
    this.clearInteraction()
    this.createDraws()
    this.map.on('draw.create', this.getMapCircle)
    this.mapType = 'circle'
    this.draw.changeMode('draw_point')
}
map.prototype.clearInteraction = function () {
    var _this = this
    if (this.draw) {
        this.map.off('click')
        this.updateLine && this.map.off('draw.create', this.updateLine);
        this.updatePolygon && this.map.off('draw.create', this.updatePolygon);
        this.serviceMapClass && this.map.off('draw.create', this.serviceMapClass)
        this.getMapPolygon && this.map.off('draw.create', this.getMapPolygon)
        this.callbackClick && this.map.off('click', this.callbackClick)
        this.getMapCircle && this.map.off('draw.create', this.getMapCircle)
        this.getMapLine && this.map.off('draw.create', this.getMapLine)
        //this.marker && this.marker.remove()
    }
}
map.prototype.createDraws = function () {
    this.draw && this.map.removeControl(this.draw)
    this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            // point: true
            // line_string: true,
            // polygon: true,
            // trash: true
        }
    });
    //this.map.addControl(new MapboxExportControl(), 'top-right');
    this.map.addControl(this.draw, "top-left");
}
export default map
