// import MapboxExportControl from "@watergis/mapbox-gl-export";
import CreateLayer from "./createLayer"
import createDataLayer from "./createDataLayer"
import CreateBusinessLayer from "./createBusinessLayer"
import ToolPopup from "./../ToolPopup/popup"
import Attribute from "./attribute/attribute"
import util from "../../../../../../common/util"
import api from "./../../apis/map"
import handleGetScale from "./scale"
import MapLayerHigh from './../LeftEvents/mapLayerHigh'
import MeasureMap from './measureMap'
import MapSourceLayer from './createDrawCanvas.js'
import common from './../../../../../../common/stringAddress'
import ToolFaction from './../../../../../../common/mapComTool'
//单独创建选择，识别工具---
var MapSourceLayerOption = function (obj) {
    this.parent = obj
    obj.parent.mapTop.addSource(obj.id, {
        "type": "geojson",
        "data": obj.data
    });
    if (obj.type === 'line') {
        obj.parent.mapTop.addLayer({
            'id': obj.id,
            'type': 'line',
            "source": obj.id,
            "paint": {
                "line-color": "#fff",
                "line-width": 3,
            },
        });
    } else {
        obj.parent.mapTop.addLayer({
            "id": obj.id,
            "type": "fill",
            "paint": {
                "fill-color": "#80FFFF",
                /* 填充的颜色 */
                "fill-opacity": 0.5 /* 透明度 */
            },
            "source": obj.id,
            'filter': ['==', '$type', 'Polygon']
            // minzoom: 0,
            // maxzoom: 17
        });
    }
}
//通过id删除图层
MapSourceLayerOption.prototype.removeSourceTool = function () {
    this.parent.parent.mapTop.getLayer(this.parent.id) && this.parent.parent.mapTop.removeLayer(this.parent.id)
    this.parent.parent.mapTop.getSource(this.parent.id) && this.parent.parent.mapTop.removeSource(this.parent.id)
}

var SignPopup = function () {
    var signHtml = ''
    signHtml += '<div class="sign_box">';
    signHtml += '   名称：<input id="signInput" style="margin:10px 0;height:30px;width:230px"></input>';
    signHtml += '   <div class="sign_button">';
    signHtml += '       <button class="ok" id="signOk">确定</button>';
    signHtml += '       <button class="cancle" id="signCancle">删除</button>';
    signHtml += '   <div>';
    signHtml += '</div>'
    this.event = {
        //ok: function() {}
    }
    this.signHtmlDom = $(signHtml)
    this.signHtml = signHtml
    this.signObj = null
}
// var _that = null
var map = function (el) {
    this._el = el
    this.comparison = $('<div id="comparison-container"></div>')
    this.html = $('<div class="OneMap_contentMap" id="before"></div>').appendTo(this.comparison)
    this.htmlAfter = $('<div class="" id="after"></div>').appendTo(this.comparison)
    this.mapTopHtml = $('<div id="mapTop"></div>')
    this.mapBusinessTopHtml = $('<div id="mapBusinessTop"></div>')

    //this.mapDemo = $('<div class="OneMap_mapDemu"></div>').appendTo(this.comparison);
    this.MapSource = {};
    this.mapTimerList = []
    this.map = null;
    this.buteType = ""
    this.rollerFilag = false
    this.choseFlag = true
    this._MapSourceLayer = null
    this._MapSourceLayerOption = null
    this.mapLightList = []
    this.sourceIdList = [] //图形
    this.markerList = []
    this.markerPoly = []
    this.markerDrawPoly = []
    this.MapFirstKey = null
    this.mapType = null
    this.mapDataUrl = null; //数据服务地址
    this.dataMenuList = []
    this.createDataList = []
    this.layerHighLists = []
    this.permissionsList = []
    this.businessAllList = []
    this.businessmapBusinessTop = []
    this.pointContin = [] //记录连续线点
    this.pointContinList = []
    this.drawLineMarkers = []
    this.event = {
        getMapLightList: function () {},
        getAnalysisLightList: function () {},
        outMapCode: function () {},
        outMapScale: function () {},
        administrativeGeojson: function () {}, //行政区权限的地图范围
        handleOutMapId: function () {},
        getSortFaction: function () {}
    }
    this._ToolPopup = new ToolPopup()
};
map.prototype.changeMapOpacity = function (data) {
    this.map.setPaintProperty(data.mapId, 'raster-opacity', data.OpacityValue / 100)
    // if (this.MapSource.hasOwnProperty(data.mapId)) {
    //     this.MapSource[data.mapId].changeOpacity(data.OpacityValue);
    // };
};
// map.prototype.clearTreeLayer = function (map, list) {
//     for (let i = 0; i < list.length; i++) {
//         var item = list[i]
//         map.getLayer(item.mapId) && map.removeLayer(item.mapId)
//     }
// }
map.prototype.addMapSource = function (data, folderdata) {
    // this.clearTreeLayer(this.map, this.dataMenuList)
    //this.rollerFilag && this.clearTreeLayer(this.mapAfter, this.dataMenuList.slice(0, this.dataMenuList.length - 1))
    data && this.dataMenuList.push(data)
    setTimeout(() => {
        this.dataMenuList.length > 0 && this.getMaxCode(this.dataMenuList, folderdata, data)
    }, 200)
};
map.prototype.getSortFaction = function (event) {
    this.event.getSortFaction = event
}
map.prototype.addMaxCodeLayer = function ({ map, data, sourceData, rollerFilag }) {
    var mapOrders = map.style._order;
    var mapLayers = map.style._layers
    this.rollerForLayer({ map, data, sourceData, rollerFilag, mapOrders, mapLayers })
    setTimeout(() => {
        //默认层级
        var zooms = this.map.getZoom()
        this.handleZoomLayers(this.dataMenuList, this.map, zooms)
    }, 0)
}
map.prototype.rollerForLayer = function({ map, data, sourceData, rollerFilag, mapOrders, mapLayers }) {
    if (rollerFilag) {
        data.forEach(item => {
            this.event.getSortFaction({
                mapLayers: mapLayers,
                mapOrders: mapOrders,
                sourceData: item,
                map: map,
                data: data,
                rollerFilag: rollerFilag,
                permissionsList: this.permissionsList
            })
        })
    } else {
        this.event.getSortFaction({
            mapLayers: mapLayers,
            mapOrders: mapOrders,
            sourceData: sourceData,
            map: map,
            data: data,
            rollerFilag: rollerFilag,
            permissionsList: this.permissionsList
        })
    }
}
map.prototype.getMaxCode = function (data, folderdata, sourceData) {
    data.sort(function (a, b) {
        return b.mapOrder - a.mapOrder
    })
    //this.setMapTop(data)
    var afterData = data.slice(0, data.length - 1)
    this.addMaxCodeLayer({ map: this.map, data: data, sourceData, rollerFilag: this.rollerFilag })
    this.rollerFilag && this.addMaxCodeLayer({ map: this.mapAfter, data: afterData, rollerFilag: this.rollerFilag })
    var after = data[data.length - 1]
    this.mapTopId = after.mapId
    this.event.handleOutMapId(after.mapId)
    this.mapDataUrl = after.mapServerName
    this.sjbName = after.sjbName
    this.sjyName = after.sjyName
}
//置顶
map.prototype.setMapTop = function (data) {
    let count = 0
    let index = 0
    data.forEach((item, i) => {
        if (item.top === '1') {
            count++
            index = i + 1
        }
    })
    if (index > 0) {
        const x = index - count
        const newData = data.splice(x, count)
        newData.sort(function (a, b) {
            return b.mapOrder - a.mapOrder
        })
        data.splice(data.length, 0, ...newData)
    }
}
map.prototype.outMapId = function (event) {
    this.event.handleOutMapId = event
}
//菜单清除图层
map.prototype.leftMenuClear = function () {
    for (let i = 0; i < this.dataMenuList.length; i++) {
        var item = this.dataMenuList[i]
        this.map.getLayer(item.mapId) && this.map.removeLayer(item.mapId)
    }
}
map.prototype.rollerTopRemoveLayer = function(data, list) {
    // 卷帘特殊情况下（删除是最上图层）
    if(this.rollerFilag && list.length >= 2) {
        let afterMapId = list[list.length-2].mapId
        if(data.mapId === list[list.length-1].mapId) {
            this.mapAfter.getLayer(afterMapId) && this.mapAfter.removeLayer(afterMapId)
        }
    }
}
map.prototype.removeRoolLayer = function (map, data, list, type) {
    this.rollerTopRemoveLayer(data, list)
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === data.id) {
            list.splice(i, 1)
        }
    }
    // list.sort(function (a, b) {
    //     return b.mapOrder - a.mapOrder
    // })
    
    //this.setMapTop(list)
    map.getLayer(data.mapId) && map.removeLayer(data.mapId)
    //需求
    type && map.getLayer(list[0].mapId) && map.removeLayer(list[0].mapId)
}
map.prototype.removeMapSource = function (data) {
    this.removeRoolLayer(this.map, data, this.dataMenuList)
    this.rollerFilag && this.removeRoolLayer(this.mapAfter, data, this.dataMenuList) //this.dataMenuList.slice(0, this.dataMenuList.length - 1)
    //需求
    this.rollerFilag && this.dataMenuList.length === 1 && this.removeRoolLayer(this.mapAfter, data, this.dataMenuList, true)
    var arr = this.dataMenuList.slice(0, this.dataMenuList.length)
    if (arr.length > 0) {
        var after = arr[arr.length - 1]
        this.event.handleOutMapId(after.mapId)
        this.mapTopId = after.mapId
        this.mapDataUrl = after.mapServerName
        this.sjbName = after.sjbName
        this.sjyName = after.sjyName
    } else {
        this.event.handleOutMapId("")
        this.mapTopId = ""
        this.mapDataUrl = ""
        this.sjbName = ""
        this.sjyName = ""
    }
};
//全幅
map.prototype.FullscreenControl = function () {
    if (this.MapFirstKey) {
        const bbox = turf.bbox(this.MapFirstKey);
        this.map.fitBounds(bbox, {
            padding: 50
        });
    }
};
map.prototype.measureDistance = function (type) {
    this.clearInteraction()
    this.measureMap.createDrawInit('meauseLine')
}
map.prototype.measurePolygonDistance = function () {
    this.clearInteraction()
    this.measureMap.createDrawInit('meausePolygon')
}
map.prototype.pushLayerHigh = function (id, data, type) {
    var _MapLayerHigh = new MapLayerHigh({
        id: id,
        data: data,
        type: type
    })
    this.layerHighLists.push(_MapLayerHigh)
}
map.prototype.changeLayerHighColor = function (id, map) {
    for (let i = 0; i < this.layerHighLists.length; i++) {
        var item = this.layerHighLists[i]
        if (map.getSource(item.layerId)) {
            map.setPaintProperty(item.layerId, item.type, '#f03b20')
            if (id === item.layerId) {
                map.setPaintProperty(item.layerId, item.type, '#3499E5')
            }
        }
    }
}
map.prototype.createMapLayer = function (data) {
    var id = util.Guid();
    this.createMapId = id
    this.pushLayerHigh(id, data, 'line-color')
    this.changeLayerHighColor(id, this.mapTop)
    return new CreateLayer(id, data, this.mapTop)
}
map.prototype.createBusinessMapLayer = function (data) {
    this.createMapId = data.fileName
    this.pushLayerHigh(data.fileName, data.obj, 'fill-color')
    // this.changeLayerHighColor(data.fileName,this.mapTop)
    var _CreateBusinessLayer = new CreateBusinessLayer(data.fileName, data.obj, this.mapTop)
    this.businessAllList.push(_CreateBusinessLayer)
}
map.prototype.createBusinessMapLayerTop = function (data) {
    this.createMapId = data.fileName
    this.pushLayerHigh(data.fileName, data.obj, 'fill-color')
    // this.changeLayerHighColor(data.fileName,this.mapTop)
    var _CreateBusinessLayer = new CreateBusinessLayer(data.fileName, data.obj, this.mapBusinessTop)
    this.businessmapBusinessTop.push(_CreateBusinessLayer)
}
//根据边界取中心
map.prototype.muplyLayerBox = function (data, mapName, type) {
    var bounds = [
        [],
        []
    ];
    var polygon;
    var latitude;
    var longitude;
    for (var i = 0; i < data.length; i++) {
        var item = type ? JSON.parse(data[i]) : JSON.parse(data[i]);
        if (item.coordinates.length === 1) {
            // Polygon coordinates[0][nodes]
            polygon = item.coordinates[0];
        } else {
            // Polygon coordinates[poly][0][nodes]
            // polygon = item.coordinates[i][0];
            for (let k = 0; k < item.coordinates.length; k++) {
                polygon = item.coordinates[k];
            }

        }
        for (var j = 0; j < polygon.length; j++) {
            longitude = polygon[j][0];
            latitude = polygon[j][1];

            bounds[0][0] = bounds[0][0] < longitude ? bounds[0][0] : longitude;
            bounds[1][0] = bounds[1][0] > longitude ? bounds[1][0] : longitude;
            bounds[0][1] = bounds[0][1] < latitude ? bounds[0][1] : latitude;
            bounds[1][1] = bounds[1][1] > latitude ? bounds[1][1] : latitude;
        }
    }
    this[mapName].fitBounds(bounds, {
        padding: 40
    })
    //return bounds;
}
map.prototype.deleteBusinessAll = function () {
    for (let i = 0; i < this.businessAllList.length; i++) {
        var item = this.businessAllList[i]
        item.removeMaps(this.mapTop)
    }
}
map.prototype.deleteBusinessAllTop = function () {
    for (let i = 0; i < this.businessmapBusinessTop.length; i++) {
        var item = this.businessmapBusinessTop[i]
        item.removeMaps(this.mapBusinessTop)
    }
}
map.prototype.createDataMapLayer = function (id, data, mapObj) {
    var id = "" + id
    var _createDatas = new createDataLayer(id, data, mapObj)
    this.createDataList.push(_createDatas)
}
map.prototype.deleteCreateDataList = function (mapObj) {
    for (let i = 0; i < this.createDataList.length; i++) {
        var item = this.createDataList[i]
        item.removeMaps(mapObj)
    }
}
map.prototype.removeCreateMap = function () {
    this.createMapId && this.mapTop.removeLayer(this.createMapId)

    this.mapTop.getLayer('TableData') && this.mapTop.removeLayer('TableData')
    this.mapTop.getSource('TableData') && this.mapTop.removeSource('TableData')
}
map.prototype.clearInteraction = function () {
    var _this = this
    this.serviceMapClass && this.map.off('draw.create', this.serviceMapClass)
    this.callbackClick && this.map.off('click', this.callbackClick)
    this.measureMap && this.measureMap.clearDrawHander()
    this.signEle && this.map.off('click', this.signEle)
}
//绘制点
map.prototype.handlePointControl = function () {
    this.measureMap.createDrawInit('circle')

    // this.clearInteraction()
    // this.createDraws()
    // this.map.on('click', this.getMapCircle)
    // this.mapType = 'circle'
    // this.draw.changeMode('draw_point')
}
//绘制线
map.prototype.handleLineControl = function () {
    this.clearInteraction()
    this.measureMap.createDrawInit('drawLine')
}
//绘制面
map.prototype.handleFaceControl = function () {
    let _this = this
    this.clearInteraction()
    this.measureMap.createDrawInit('drawPolygon')
    this.measureMap.outDrawMapData((obj) => {
        _this.event.getMapLightList(obj, 2) //针对导出
        _this.event.getAnalysisLightList(obj, 2) //针对分析
    })

}
// map.prototype.getMapCircle = function (e) {
//     var _that = this._that
//     _that.drawPromise(_that, e, 'circle', 'circle-color', 'Point')
// }
map.prototype.drawPromise = function (_that, e, type, typeColor, geo) {
    var obj
    if (geo === 'Point') {
        _that.draw.changeMode('draw_point')
        var lngLat = [e.lngLat.lng, e.lngLat.lat];
        var para = {
            type: "Feature",
            geometry: {
                type: geo,
                coordinates: lngLat
            } //e.features[0].geometry
        }
        obj = {
            xzqhGeometrys: this.permisCode ? [JSON.stringify(_that.MapFirstKey)] : [JSON.stringify(para.geometry)],
            drawGeometrys: [JSON.stringify(para.geometry)]
        }
    } else {

        var para = {
            type: "Feature",
            geometry: {
                type: geo,
                coordinates: _that.pointContinList
            } //e.features[0].geometry
        }
        obj = {
            xzqhGeometrys: this.permisCode ? [JSON.stringify(_that.MapFirstKey)] : [JSON.stringify(para.geometry)],
            drawGeometrys: [JSON.stringify(para.geometry)]
        }

    }
    api.ckeckJson(obj, (res) => {
        if (res.data) {
            var id = util.Guid();

            // _that.MapSourceLayer && _that.MapSourceLayer.removeSourceTool()
            _that.MapSourceLayer = new MapSourceLayer({
                id: id,
                data: para,
                parent: _that,
                type: type
            })
            _that.pushLayerHigh(id, para, typeColor)
            _that.changeLayerHighColor(id, _that.mapTop)

            _that.sourceIdList.push(_that.MapSourceLayer)
        } else {
            _Msg.openMsg('绘制图形不在地图权限范围内')
            _that.draw.deleteAll()
        }
        _that.pointContin = []
        _that.pointContinList = []
    })
}
map.prototype.outMapList = function (event, events) {
    this.event.getMapLightList = event
    this.event.getAnalysisLightList = events
}
map.prototype.clearSourceIdList = function () {
    //清除绘制的图形
    for (let i = 0; i < this.sourceIdList.length; i++) {
        this.sourceIdList[i].removeSourceTool()
    }
}
//清除
map.prototype.handleClearControl = function () {
    this.splitList = []
    this.layerHighLists = []
    this.event.getMapLightList() //针对导出
    this.event.getAnalysisLightList() //针对分析
    this.removeCreateMap() //清除上图预览和行政区定位
    this.createDraws()
    this.clearInteraction()

    this._MapSourceLayerOption && this._MapSourceLayerOption.removeSourceTool()
    //清除上图
    this.deleteBusinessAll()
    //清除业务上图
    this.deleteBusinessAllTop()
    //清除绘制的图形
    for (let i = 0; i < this.sourceIdList.length; i++) {
        this.sourceIdList[i].removeSourceTool()
    }
    //清除标记
    for (let i = 0; i < this.markerList.length; i++) {
        var item = this.markerList[i]
        item.marker && item.marker.remove()
        item.marker || item.remove()
    }
    for (let i = 0; i < this.markerPoly.length; i++) {
        var item = this.markerPoly[i]
        item.marker && item.marker.remove()
        item.marker || item.remove()
    }
    this._createMeasureToolDrawPolygon && this._createMeasureToolDrawPolygon.marker.remove()
    this.map.getCanvas().style.cursor = '' //pointer;
}
//放大
map.prototype.handleZoomInControl = function () {
    $('.mapboxgl-ctrl-zoom-in').click()
}
//缩小
map.prototype.handleZoomOutControl = function () {
    $('.mapboxgl-ctrl-zoom-out').click()
}
//标记弹层
map.prototype.signEle = function (e) {
    var _this = this._that
    if (_this.signEleFlag) {

        var signDom = new SignPopup()
        _this.popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true
        })
        _this.popup.setLngLat(e.lngLat)
        _this.popup.setHTML(signDom.signHtml)
        _this.popup.addTo(_this.mapTop)
        _this.popup.setMaxWidth("350px")
        var popupElem = _this.popup.getElement()
        var signOk = document.getElementById('signOk')
        var signCancle = document.getElementById('signCancle')
        signOk.onclick = function () {
            var signVlaue = document.getElementById('signInput').value
            var type = 'sign'
            _this.markCreate(signVlaue, e.lngLat, signDom, _this.popup, type)
        }
        signCancle.onclick = function () {
            signDom.signObj && signDom.signObj.remove()
        }
        _this.signEleFlag = false
    }

}
//鼠标移动获取坐标
map.prototype.getMapMouseCode = function (event) {
    this.event.outMapCode = event
}
//比例尺
map.prototype.getMapScalse = function (event) {
    var _this = this
    this.event.outMapScale = event
}
//标记
map.prototype.markCreate = function (signVlaue, lngLat, signDom, popup) {
    signDom.signObj && signDom.signObj.remove()
    var measureToolBox = document.createElement('div');
    var measureTooltipElement = document.createElement('div');
    var signIcon = document.createElement('div');
    measureTooltipElement.className = 'dis-tooltip tooltip-measure';
    signIcon.className = 'sign_icon iconfont icon-biaoji1'
    measureToolBox.appendChild(signIcon)
    measureToolBox.appendChild(measureTooltipElement)
    this.markerSign = new mapboxgl.Marker({
        element: measureToolBox
    })
    this.markerSign.setLngLat(lngLat)
    this.markerSign.setPopup(popup)
    this.markerSign.addTo(this.map)
    this.markerList.push(this.markerSign)
    measureTooltipElement.innerHTML = signVlaue
    this.popup && this.popup.remove()
    signDom.signObj = this.markerSign
    this.map.getCanvas().style.cursor = '';
    this.map.off('click', this.signEle)
}
//清除标注操作
map.prototype.markClearHeander = function () {
    this.popup.remove()
    this.map.getCanvas().style.cursor = '';
    this.map.off('click', this.signEle)
}
//标注
map.prototype.handleToolSignControl = function (ele) {
    // this.handleToolSignControl()
    this.signDom = ele
    this.clearInteraction()
    this.createDraws()
    this.signEleFlag = true
    this.map.getCanvas().style.cursor = 'crosshair';
    this.map.on('click', this.signEle)
}
var waitMapStyleLoad = function (map) {
    const TIMEOUT = 100
    const MAXTIME = 10000
    var waited = -1 * TIMEOUT
    return new Promise(function (resolve, reject) {
        var checkStyleFn = function () {
            if (map.isStyleLoaded()) {
                resolve(map)
            } else {
                waited += TIMEOUT
                if (waited >= MAXTIME) {
                    reject(new Error('地图加载时间过长'))
                } else {
                    setTimeout(checkStyleFn, TIMEOUT)
                }
            }
        }
        checkStyleFn()
    })
}
//卷帘
map.prototype.handleToolSplitControl = function () {
    var _this = this
    this.rollerFilaging = true
    this.htmlAfter.addClass('OneMap_contentMap')
    this.mapAfter = new mapboxgl.Map({
        container: this.htmlAfter[0],
        style: {
            "version": 8,
            "sources": {
                "raster-tiles": {
                    "type": "raster",
                    //"attribution": attribution,
                    tiles: [this.mapBaseUrl],
                    rasterSource: 'iserver',
                    "tileSize": 256
                }
            },
            "layers": [{
                "id": "simple-tiless",
                "type": "raster",
                "source": "raster-tiles",
                "minzoom": 0,
                "maxzoom": 22
            }]
        },
        crs: 'EPSG:4326',
        center: [0, 0], // starting position
        zoom: 2 // starting zoom
    })
    this.clearInteraction()
    var container = '#comparison-container';
    if (!this.mapSplit) {
        this.mapSplit = new mapboxgl.Compare(this.map, this.mapAfter, container, {});
    }
    this.handleToolPermisMapControl(this.permisCode, this.mapAfter, () => {
        this.rollerFilag = true
        setTimeout(() => {
            this.addMapSource()
        }, 200)
        waitMapStyleLoad(_this.mapAfter).then(function (map) {
            var afterData = _this.dataMenuList.slice(0, _this.dataMenuList.length - 1)
            var list = afterData.length === 0 ? [] : [afterData[afterData.length - 1]]
            map.on('move', function () {
                var zooms = _this.map.getZoom()
                _this.handleZoomLayers(list, map, zooms)
            })
        })
    })
}
map.prototype.handleToolSplitCloseControl = function () {
    this.mapSplit.remove();
    this.mapAfter.remove()
    this.rollerFilag = false
    this.rollerFilaging = false
    this.htmlAfter.removeClass('OneMap_contentMap')
    this.mapSplit = null
}
//下载--打印（可删除）
// map.prototype.handleMapToolDownLoadControl = function () {
//     var hrefDown = document.createElement('a')
//     hrefDown.setAttribute("id", 'doload')
//     hrefDown.download = '地图' + ".png";
//     var content = this.map.getCanvas().toDataURL()
//     hrefDown.href = content
//     document.body.appendChild(hrefDown);
//     hrefDown.click()
//     document.getElementById('doload').remove()

// }
//选择单选
map.prototype.handleToolRadioMapControl = function () {
    this.clearInteraction()
    this.createDraws()
    this.buteType = 'radio'
    // this._MapSourceLayerOption && this._MapSourceLayerOption.removeSourceTool()
    this.splitList = []
    this.outLsit = []
    this.outLsits = []
    this.featuresId = []
    //this.map.off('click',this.callbackClick)
    this.map.on('click', this.callbackClick)
    this.draw.changeMode('draw_point')
}
//选择连选
map.prototype.callbackClick = function (e) {
    var _that = this._that
    _that.draw.changeMode('draw_point')
    if (!_that.sjyName && !_that.sjbName && !_that.mapDataUrl) {
        layer.msg('当前地图未配置数据服务')
        return false
    }
    var x = e.lngLat.lng;
    var y = e.lngLat.lat;
    if (x < -180.0 || x > 180.0 || y < -90 || y > 90) {
        return;
    }
    var geo = {
        coordinates: [x, y],
        type: "Point"
    }
    var param = new SuperMap.GetFeaturesByGeometryParameters({
        geometry: geo,
        datasetNames: [_that.sjyName + ':' + _that.sjbName],
        spatialQueryMode: "INTERSECT"
    });
    var queryService = new mapboxgl.supermap.FeatureService(_that.mapDataUrl);
    queryService.getFeaturesByGeometry(param, (serviceResult) => {
        _that.setMapChoseSplitStyle(serviceResult)
    });

}
//连选
map.prototype.handleToolCheckMapControl = function () {
    var _this = this
    this.clearInteraction()
    this.createDraws()
    this._MapSourceLayerOption && this._MapSourceLayerOption.removeSourceTool()
    this.splitList = []
    this.outLsit = []
    this.outLsits = []
    this.featuresId = []
    this.buteType = 'check'
    this.map.on('click', this.callbackClick)
}
//识别
map.prototype.handleToolSelectMapControl = function () {
    this.clearInteraction()
    this.createDraws()
    this.buteType = 'identify'
    this.map.on('draw.create', this.serviceMapClass)
    this.draw.changeMode('draw_point')

}
map.prototype.serviceMapClass = function (e) {
    var _that = this._that
    var obj = {
        xzqhGeometrys: this.permisCode ? [JSON.stringify(_that.MapFirstKey)] : [JSON.stringify(e.features[0].geometry)],
        drawGeometrys: [JSON.stringify(e.features[0].geometry)]
    }

    api.ckeckJson(obj, (res) => {
        if (res.data) {
            var geo = e.features[0].geometry
            console.log(_that.sjyName, _that.sjbName)
            if (_that.sjyName && _that.sjbName) {
                //不配置数据源数据集datasetNames不能为空
                var param = new SuperMap.GetFeaturesByGeometryParameters({
                    geometry: geo,
                    datasetNames: [_that.sjyName + ':' + _that.sjbName], //数据源数据集
                    spatialQueryMode: "INTERSECT"
                });
                var queryService = new mapboxgl.supermap.FeatureService(_that.mapDataUrl);
                queryService.getFeaturesByGeometry(param, (serviceResult) => {
                    _that.setMapChoseStyle(serviceResult)
                });
            } else {
                layer.msg('当前地图未配置数据服务')
            }

        } else {
            _Msg.openMsg('不可识别超出范围的地图')
        }
    })

}
//选择连选绘制
map.prototype.setMapChoseSplitStyle = function (serviceResult) {
    var _that = this
    if (serviceResult.error) {
        _Msg.openMsg('当前地图未配置数据服务')
        _that.draw.deleteAll()
        return false
    }
    var features = serviceResult.result.features.features[0];
    if (_that.buteType == 'radio') {
        _that.splitList = []
        _that.outLsit = []
        _that.outLsits = []
        _that.featuresId = []
    } else {
        for (let i = 0; i < _that.featuresId.length; i++) {
            if (_that.featuresId[i] === features.id) {
                _that.splitList.splice(i, 1);
                _that.outLsits.splice(i, 1);
                _that.outLsit.splice(i, 1);
            }
        }
    }

    _that.featuresId.push(features.id)
    _that.splitList.push({
        type: 'Feature',
        geometry: features.geometry
    })
    _that.outLsit.push(features.geometry) //features.geometry.coordinates[0][0]
    _that.outLsits.push(features.geometry)
    var obj = {
        geometry: {
            coordinates: _that.outLsit,
            type: features.geometry.type
        }
    }
    var objs = {
        geometry: {
            coordinates: _that.outLsits
        }
    }
    var id = util.Guid();
    _that.event.getMapLightList(obj, 1)
    _that.event.getAnalysisLightList(objs, 3)
    var para = {
        type: "FeatureCollection",
        features: _that.splitList
    }
    _that._MapSourceLayerOption && _that._MapSourceLayerOption.removeSourceTool()
    _that._MapSourceLayerOption = new MapSourceLayerOption({
        id: id, //'queryDataSplit',
        data: para,
        parent: _that,
        type: 'line'
    })
    _that.pushLayerHigh(id, features, 'line-color')
    _that.changeLayerHighColor(id, _that.mapTop)
    _that.draw.deleteAll()
}
//选择遮盖图层
map.prototype.setMapChoseStyle = function (serviceResult) {
    var _that = this
    if (serviceResult.error) {
        _Msg.openMsg('该区域无属性信息')
        return false
    }

    var features = serviceResult.result.features.features[0];
    var para = {
        type: "Feature",
        geometry: features.geometry
    }
    var obj = {
        geometry: {
            coordinates: features.geometry.coordinates[0],
            type: features.geometry.type
            //coordinates: features.geometry
        }
    }
    var objs = {
        geometry: {
            //coordinates: features.geometry.coordinates[0]
            coordinates: features.geometry
        }
    }
    var id = util.Guid();
    _that._MapSourceLayerOption && _that._MapSourceLayerOption.removeSourceTool()
    _that._MapSourceLayerOption = new MapSourceLayerOption({
        id: id,
        data: para,
        parent: _that,
        type: 'fill'
    })
    _that.pushLayerHigh(id, features, 'fill-color')
    _that.changeLayerHighColor(id, _that.mapTop)
    _that.draw.deleteAll()
    _that.event.getMapLightList(obj, 1)
    _that.event.getAnalysisLightList(objs, 1)
    _that.buteType === 'identify' && _that.showAttribute(features.properties)

}
//属性信息
map.prototype.showAttribute = function (data) {
    var _that = this
    _that.map.getCanvas().style.cursor = '';
    _that._ToolPopup.html.find('.layout-dialog-body').empty()
    _that._ToolPopup.handleShow({
        title: '属性',
        mask: true,
        width: '340px',
        left: '50%',
        top: '50%',
        height: '400px',
        content: 'content',
        transform: 'translate(-50%,-50%)',
        onClose: function () {}
    })
    var _Attribute = new Attribute(data, _that.mapTopId)
    _that._ToolPopup.html.find('.layout-dialog-body').append(_Attribute.bute)
    _that._ToolPopup.html.appendTo(_that._el);
    _that._ToolPopup.html.show()
}

map.prototype.addDataLayer = function (json) {
    json = JSON.parse(json);
    var data = this.mapTop.getSource('TableData');
    if (!data) {
        data = this.mapTop.addSource("TableData", {
            "type": "geojson",
            "data": json
        });
        this.mapTop.addLayer({
            "id": "TableData",
            "type": "line",
            /* fill类型一般用来表示一个面，一般较大 */
            "source": "TableData",
            "paint": {
                "line-color": "#3499E5",
                /* 填充的颜色 */
                "line-width": 3
            },
        });
    } else {
        data.setData(json);
    };
    const bbox = turf.bbox(json);
    this.mapTop.fitBounds(bbox, {
        padding: 200
    });
};
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
//根据行政区获取全幅
map.prototype.handlePermisMapFull = function (obj, callback) {
    var _this = this
    var sql = "";
    sql = "XZQDM = '" + obj + "'";
    var param = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: config.InterfaceAddress.dataSourceSql,
            attributeFilter: sql
        },
        fromIndex: '0', // 开始查询位置
        toIndex: '1000', // 结束查询位置
        datasetNames: [config.InterfaceAddress.datasetNames]
    })
    var queryService = new mapboxgl.supermap.FeatureService(config.InterfaceAddress.NationalDataUrlCenter)
    queryService.getFeaturesBySQL(param, function (serviceResult) {

        if (serviceResult.result.features.features.length > 0) {
            _this.clearInteraction()
            _this.MapFirstKey = serviceResult.result.features.features[0].geometry
            _this.event.administrativeGeojson(_this.MapFirstKey, _this.permisCode)
            //_this.map.setMaxBounds(turf.bbox(_this.MapFirstKey)) //边界权限
            _this.measureMap = new MeasureMap({
                map: _this.map,
                mapTop: _this.mapTop,
                api: api,
                util: util,
                MapFirstKey: _this.MapFirstKey,
                permisCode: _this.permisCode,
                parent: _this
            });
            _this.measureMap.setMapStyle()
            _this.FullscreenControl()

            setTimeout(() => {
                callback && callback()

            }, 5000)
        }
    })
}
//
map.prototype.getMapSelect = function (_selectRisk) {
    this._selectRisk = _selectRisk
}
map.prototype.setMapSelect = function (data) {
    this._selectRisk && this._selectRisk._form.rightAdministrativeDivision.Linkage.setMapCode(data)
}
//卷帘下不支持操作
map.prototype.handleRoolMapStop = function (callback) {
    if (this.rollerFilaging) {
        layer.open({
            title: '警告',
            content: '卷帘状态下不支持操作'
        });
        return false
    }
    return true
    callback()
}
//通过底图行政区范围获取
map.prototype.setMapPermissions = function (obj, mapObj, callback) {
    var _this = this
    var sql = "";
    _this.deleteCreateDataList(mapObj)
    var len = ""
    obj.replace(/[0]+$/g, function (e) {
        len = e.length
    })
    var provinceString = obj.substring(0, 2)
    // if (len == 3 || len == 2) {
    //     //市级
    //     //sql = "XZQDM like '" + provinceString + "%' and SJXZQDM != '" + obj + "' and SJXZQDM != '' and SJXZQDM not like '%0000'";
    //     sql = "XZQDM like '" + provinceString + "%' and SJXZQDM != '" + obj + "' and SJXZQDM != '' and SJXZQDM not like '%0000'";

    // } else if (len == 1 || !len) {
    //     //县级
    //     //sql = "XZQDM like '" + provinceString + "%' and XZQDM != '" + obj + "'";
    //     sql = "XZQDM like '" + provinceString + "%' and XZQDM != '" + obj + "' and SJXZQDM != '' and SJXZQDM not like '%0000'";
    // } else{
    //     sql = "XZQDM like '%0000' and XZQDM != '"+obj+"'"
    // }
    if (len == 3 || len == 2) {
        //市级
        sql = "(SJXZQDM is null and XZQDM != '" + provinceString + "0000') or (SJXZQDM =230000 and XZQDM != '" + obj + "')";
    } else if (len == 1 || !len) {
        //县级
        sql = " (SJXZQDM is null and XZQDM != '" + provinceString + "0000') or ( XZQDM like '" + provinceString + "%' and XZQDM != '" + obj + "' and SJXZQDM not like '%0000')"
    } else {
        //省级
        sql = "XZQDM like '%0000' and XZQDM != '" + obj + "'"
    }
    var loading = new icu.loading($('body'));
    loading.show()
    var param = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: config.InterfaceAddress.dataSourceSql,
            attributeFilter: sql
        },
        fromIndex: '0', // 开始查询位置
        toIndex: '1000', // 结束查询位置
        datasetNames: [config.InterfaceAddress.datasetNames]
    })
    if (sql) {
        var queryService = new mapboxgl.supermap.FeatureService(config.InterfaceAddress.NationalDataUrlCenter)
        queryService.getFeaturesBySQL(param, function (serviceResult) {
            console.log(serviceResult)
            var list = serviceResult.result.features.features
            _this.permissionsList = serviceResult.result.features.features
            for (let i = 0; i < list.length; i++) {
                _this.createDataMapLayer(list[i].id, list[i].geometry, mapObj)
            }
            // _this.mapTimerChuck(list,(data) => {
            //     _this.createDataMapLayer(data.id, data.geometry, mapObj)
            // },10)()
            setTimeout(() => {
                callback && callback()
            }, 5000)
            _this.waitMapStyleLoad().then(res => {
                if (res) {
                    loading.hide()
                }
            })

        })

    } else {
        _this.permissionsList = []
        callback && callback()
    }

}
// map.prototype.mapTimerChuck = function(arr,fn,count) {
//     var obj,t;
//     var len = arr.length;
//     var start = function() {
//         for(var i = 0;i<Math.min(count || 1,arr.length);i++) {
//             var obj = arr.shift()
//             fn(obj)
//         }
//     }
//     return function() {
//         t = setInterval(() => {
//             if(arr.length === 0) {
//                 return clearInterval(t)
//             }
//             start()
//         },20)
//     }

// }
map.prototype.outAdministrativeGeojson = function (event) {
    this.event.administrativeGeojson = event
}
map.prototype.handleToolPermisMapControl = function (data, mapObj, callback) {
    this.permisCode = data
    // this.handlePermisMapFull(this.permisCode, mapObj)
    this.permisCode && this.handlePermisMapFull(this.permisCode)
    var mapObjs = mapObj ? mapObj : this.map
    if (data) {
        this.setMapPermissions(this.permisCode, mapObjs, () => {
            callback && callback()
        })
    } else {
        // this.handlePermisMapFull(this.permissionsBase, mapObjs)
        this.handlePermisMapFull(this.permissionsBase, () => {
            callback && callback()
        })
    }

}
//根据菜单和分析改变地图尺寸
map.prototype.changeMapSize = function (type, flag) {
    var _this = this
    //菜单打开
    if (type === 'menu') {
        if (flag) {
            _this.html.css({
                left: '350px'
            })
            _this.map.resize();
            _this.mapTop.resize()
        } else {
            _this.html.css({
                left: '50px'
            })
            _this.mapTop.resize()
            _this.map.resize();
        }
    } else if (type === 'analysis') {
        if (flag) {
            //分析打开
            _this.html.css({
                bottom: '350px'
            })
            _this.map.resize();
            _this.mapTop.resize()
        } else {
            _this.html.css({
                bottom: '0px'
            })
            _this.map.resize();
            _this.mapTop.resize()
        }
    }


}
//根据层级加载图层
map.prototype.handleZoomLayers = function (list, map, zoom) {
    var zoom = Math.round(zoom)
    list.forEach(item => {
        if (!item.maxShowLevel) {
            return false
        }
        map.setLayoutProperty(item.mapId, "visibility", "none");
        if (item.minShowLevel <= zoom && zoom <= item.maxShowLevel) {

            if (map.getSource(item.mapId)) {
                map.setLayoutProperty(item.mapId, "visibility", "visible");
            }

        }
    })
}
map.prototype.on = function (type, event) {
    if (this.event[type] && Object.prototype.toString.call(this.event[type]) === '[object Array]') {
        this.event[type].push(event)
    } else {
        this.event[type] = [event]
    }
}
map.prototype.handleEventTypeList = function (evType) {
    const event = this.event[evType]
    if (!event) {
        return false
    }
    for (let i = 0; i < event.length; i++) {
        event[i].apply(this)
    }
}
map.prototype.render = function (callback) {
    var _this = this

    api.getMapBottomLarer((res) => {
        //this.mapPermissions = res
        var url = res.data.baseMapAddress
        var zoom = 1
        _this.mapBaseUrl = url

        api.getMapJson(url, (mapConfig) => {
            var center = [mapConfig.center.x, mapConfig.center.y]
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
                        "maxzoom": 17 //最大不能小于设置
                    }],
                },
                crs: "EPSG:" + mapConfig.prjCoordSys.epsgCode,
                center: center,
                zoom: zoom,
                maxZoom: 17,
            })

            // 坐标绘制容器
            this.mapTop = new mapboxgl.Map({
                container: 'mapTop', // container id
                style: {
                    version: 8,
                    name: "BlankMap",
                    sources: {},
                    layers: [{
                        id: 'background',
                        type: 'background',
                        paint: {
                            'background-color': '#fff',
                            'background-opacity': 0
                        },
                    }]
                },
                crs: "EPSG:" + mapConfig.prjCoordSys.epsgCode,
                center: center,
                zoom: zoom,
                maxZoom: 17,
            })
            // 业务上图
            this.mapBusinessTop = new mapboxgl.Map({
                container: 'mapBusinessTop', // container id
                style: {
                    version: 8,
                    name: "BlankMap",
                    sources: {},
                    layers: [{
                        id: 'background',
                        type: 'background',
                        paint: {
                            'background-color': '#fff',
                            'background-opacity': 0
                        },
                    }]
                },
                crs: "EPSG:" + mapConfig.prjCoordSys.epsgCode,
                center: center,
                zoom: zoom,
                maxZoom: 17,
            })

            // 图层联动关联

            mapboxgl.syncMaps(this.mapTop, this.map, this.mapBusinessTop);
            this.map._that = this
            this.map.on('load', function () {
                // _this.map.addSource('counties', {
                //     "type": 'raster',
                //     "tiles": ['http://192.168.0.62:8090/iserver/services/map-TDLY-2/rest/maps/2009%E5%9C%9F%E5%9C%B0%E5%88%A9%E7%94%A8%E7%8E%B0%E7%8A%B6%E5%9B%BE/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}&transparent=true'],
                //     "tileSize": 256,
                //     //rasterSource: 'iserver',
                // });
                // _this.map.addLayer({
                //     id: 'counties',
                //     type: 'raster',
                //     source: "counties",
                //     // paint: {
                //     //     'raster-opacity': 1,

                //     //     // 'raster-transparent': true,

                //     //     'raster-opacity-transition': {

                //     //     'duration': 0

                //     // },

                //     // 'raster-fade-duration': 5
                //     // },
                //     "minzoom": 0,
                //     "maxzoom": 22

                // });

                _this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
                //比例尺
                _this.scale = new mapboxgl.ScaleControl({
                    maxWidth: 80,
                    unit: 'imperial'
                });
                _this.map.addControl(_this.scale);
                _this.map.setMinZoom(1)
                _this.scale.setUnit('metric');
                _this.map.on('mousemove', function (e) {
                    _this.event.outMapCode(e.lngLat.wrap())
                });
                var scaleInit = handleGetScale(zoom)
                _this.event.outMapScale(scaleInit);
                _this.map.on('moveend', function (e) {
                    var zooms = _this.map.getZoom()
                    _this.handleZoomLayers(_this.dataMenuList, _this.map, zooms)
                    var scale = handleGetScale(zooms)
                    _this.event.outMapScale(scale);
                });

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
            _this.permissionsBase = permissions
            callback && callback()
            _this.handleEventTypeList('initLoad')
            _this.zoomFlag = true

        });
    })
    return this.html;
};
map.prototype.waitMapStyleLoad = function () {
    var _this = this
    var TIMEOUT = 100;
    var maxWait = 10000;
    var waited = -1 * TIMEOUT;
    return new Promise((resolve, reject) => {
        var checkStyleLoadEd = function () {
            if (_this.map.isStyleLoaded()) {
                resolve(_this.map)
            } else {
                waited += TIMEOUT
                if (waited >= maxWait) {
                    reject('时间过长')
                } else {
                    setTimeout(checkStyleLoadEd, TIMEOUT)
                }
            }
        }
        checkStyleLoadEd()
    })
}
export default map