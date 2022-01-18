////////////////////////////////////////////////
// 绘制基础
// 吴东东
// 2021-03-29 08:53:55
////////////////////////////////////////////////
import MapSourceLayer from './createDrawCanvas.js'
import MapAssist from "./mapAssist"
const mapFeatureCollection = {
    type: "Feature",
    geometry: {
        type: 'LineString',
        coordinates: []
    }
}
const mapPolygonFeatureCollection = {
    type: "Feature",
    geometry: {
        type: 'Polygon',
        coordinates: [
            []
        ] // **
    }
}
const mapPointnFeatureCollection = {
    type: "Feature",
    geometry: {
        type: 'Point',
        coordinates: [] // **
    }
}
const point = {
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: []
    },
    //properties: {id:id, properties: {length: ""}}
};

const line = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: []
    },
};
// 绘制基础
var measureMap = function (obj) {

    this.map = obj.map
    this.mapTop = obj.mapTop
    this.api = obj.api
    this.util = obj.util
    this.permisCode = obj.permisCode
    this.MapFirstKey = obj.MapFirstKey
    this.parent = obj.parent
    this.MapSourceLayer = null
    this._MapAssist = null
    this.isMeasure = true //开启测量
    this.isPolygonMeasure = true
    this.linePoint = [] //记录移动的数组
    this.linePointList = [] //记录点击的数组
    this.polygonPoint = [] //记录面移动
    this.polygonPointList = [] //记录面点击
    this.polygonDrawPointList = [] //记录绘制面的点击
    this.drawMarkers = []
    this.mapFeatureCollection = mapFeatureCollection
    this.mapPolygonFeatureCollection = mapPolygonFeatureCollection
    this.mapPointnFeatureCollection = mapPointnFeatureCollection
    this._data = {
        type: 'FeatureCollection',
        features: []
    }
    this.event = {
        BusinessGeojson: function(){},
        outDrawMapDataBack: function () {}
    }
}
var CreateMeasureTool = function (map) {
    //创建标记
    this.measureTooltipElement = document.createElement('div');
    this.measureDesc = document.createElement('div')
    this.measureTooltipElement.className = 'dis-tooltip tooltip-measure';
    this.marker = new mapboxgl.Marker({
        element: this.measureTooltipElement
    })
    this.measureTooltipElement.appendChild(this.measureDesc)
    this.marker.setLngLat([0, 0]).addTo(map)
}
//初始方法
measureMap.prototype.createDrawInit = function (type) {
    var _this = this
    this.map.getCanvas().style.cursor = 'crosshair'
    this.drawType = type
    //分布清除
    this.clearDrawHander()
    this.linePoint = []
    if (type === 'drawLine' || type === 'drawPolygon') {
        this._createMeasureTool = new CreateMeasureTool(this.mapTop)
        this.drawMarkers.push(this._createMeasureTool)
    } else if (this.drawType === 'meausePolygon' || this.drawType === 'meauseLine') {
        this._createMeasureTool = new CreateMeasureTool(this.mapTop)
        this.parent.markerList.push(this._createMeasureTool)
    }

    this.mapDrawHander = this.mapDrawHander.bind(this)
    this.clearDrawEnd = this.clearDrawEnd.bind(this)
    this.map.on('click', this.mapDrawHander);



    type === 'circle' || this.map.on('contextmenu', this.clearDrawEnd);
}
//辅助线
measureMap.prototype.setDataRefresh = function (coordinates) {
    line.geometry.coordinates = coordinates
    this._MapSourceLayer.parent.parent.mapTop.getSource('assist') && this._MapSourceLayer.parent.parent.mapTop.getSource('assist').setData(this._data)
}
//点击
measureMap.prototype.mapDrawHander = function (event) {
    //this.map.getCanvas().style.cursor = ''
    var id = this.util.Guid();



    this._data.features.push(point);
    this._data.features.push(line);
    this.isMeasure = this.drawType === 'circle' ? false : true
    if (this.isMeasure) {
        var lngLat = [event.lngLat.lng, event.lngLat.lat];
        this.moveMapDistance = this.moveMapDistance.bind(this)
        this.map.on("mousemove", this.moveMapDistance)
        this.distanceLeng = [event.lngLat.lng, event.lngLat.lat];
        (this.drawType === 'meauseLine' || this.drawType === 'drawLine') && this.linePoint.push(lngLat);
        (this.drawType === 'meausePolygon' || this.drawType === 'drawPolygon') && this.polygonPoint.push(lngLat)
    }
    if (this.drawType === 'meauseLine' || this.drawType === 'drawLine') {
        if (this.mapFeatureCollection.geometry.coordinates.length !== 0) {
            return false
        }
        this._MapSourceLayer = new MapSourceLayer({
            id: id,
            data: this.mapFeatureCollection,
            parent: this,
            type: 'line'
        })
    } else if (this.drawType === 'meausePolygon' || this.drawType === 'drawPolygon') {
        if (this.mapPolygonFeatureCollection.geometry.coordinates[0].length !== 0) {
            return false
        }
        this._MapSourceLayer = new MapSourceLayer({
            id: id,
            data: this.mapPolygonFeatureCollection,
            parent: this,
            type: 'fill'
        })
    } else {
        this.mapPointnFeatureCollection.geometry.coordinates = [event.lngLat.lng, event.lngLat.lat]
        this._MapSourceLayer = new MapSourceLayer({
            id: id,
            data: this.mapPointnFeatureCollection,
            parent: this,
            type: 'circle'
        })
        this.measureMapCkeckJson(this.mapPointnFeatureCollection, 'circle-color')
    }
    // this.setDataRefresh([event.lngLat.lng, event.lngLat.lat])
}
//清除标记
measureMap.prototype.clearDrawMarkers = function () {
    for (let i = 0; i < this.drawMarkers.length; i++) {
        var item = this.drawMarkers[i]
        item.marker && item.marker.remove()
        item.marker || item.remove()
    }
}
//移动鼠标
measureMap.prototype.moveMapDistance = function (event) {
    if (this.isMeasure) {
        var _tool = this._createMeasureTool
        this.distanceLeng = [event.lngLat.lng, event.lngLat.lat];
        _tool.marker.setLngLat(this.distanceLeng)
        // _tool.measureTooltipElement.innerHTML = this.linePoint.length === 0 ? '' : this.addMeasureDistance(this.distanceLeng)
        var rounded_area
        if (this.drawType === 'meauseLine' || this.drawType === 'drawLine') {
            rounded_area = this.addMeasureDistance(this.distanceLeng)
            _tool.measureTooltipElement.innerHTML = rounded_area ? (rounded_area + '<br>' + '单击继续，右击结束') : '单击继续，右击结束'
        } else if (this.drawType === 'meausePolygon' || this.drawType === 'drawPolygon') {
            _tool.measureTooltipElement.innerHTML = this.polygonPoint.length === 0 ? '' : this.addMeasurePolygonDistance(this.distanceLeng)
            rounded_area = this.addMeasurePolygonDistance(this.distanceLeng) ? this.addMeasurePolygonDistance(this.distanceLeng) : 0;
            _tool.measureTooltipElement.innerHTML = rounded_area ? (rounded_area + '<br>' + '单击继续，右击结束') : '单击继续，右击结束'
        }
        this.rounded_area = rounded_area

    }
}
//计算线距离
measureMap.prototype.addMeasureDistance = function (dis) {
    var linePoint = this.linePoint.concat([dis]);
    this.linePointList = linePoint
    this.mapFeatureCollection.geometry.coordinates = this.linePointList
    this._MapSourceLayer.parent.parent.mapTop.getSource(this._MapSourceLayer.parent.id).setData(this.mapFeatureCollection)
    this.setDataRefresh(this.linePointList)
    if (this.drawType === 'drawLine') {
        return false
    }
    var line = turf.lineString(linePoint);
    var len = turf.length(line);
    if (len < 1) {
        len = Math.round(len * 1000) + '.00m';
    } else {
        len = len.toFixed(2) + 'km';
    }
    return len;
}
//计算面距离
measureMap.prototype.addMeasurePolygonDistance = function (area) {
    var polygonPoint = this.polygonPoint.concat([area]);
    polygonPoint = polygonPoint.concat([this.polygonPoint[0]]) //闭合
    this.polygonPointList = polygonPoint
    var obj = {
        features: [{
            geometry: {
                coordinates: [polygonPoint],
                type: 'Polygon'
            },
            type: "Feature"
        }],
        type: "FeatureCollection"
    }
    this.mapPolygonFeatureCollection.geometry.coordinates = [polygonPoint]
    this._MapSourceLayer.parent.parent.mapTop.getSource(this._MapSourceLayer.parent.id).setData(this.mapPolygonFeatureCollection)
    this.setDataRefresh(polygonPoint)
    if (polygonPoint.length >= 4) {
        var center = turf.center(obj)
        this._createMeasureTool.marker.setLngLat(center.geometry.coordinates)
        if (this.drawType === 'drawPolygon') {
            return false
        }
        var polygon = turf.polygon([polygonPoint]);
        var area = turf.area(polygon);
        area = Math.round(area) + 'm²';
        // if (area < 1000) {
        //     area = Math.round(area) + 'm²';
        // } else {
        //     area = (area / 1000000).toFixed(2) + 'km²';
        // }
        return area;
    }
}
//右击结束
measureMap.prototype.clearDrawEnd = function (e) {
    console.log('双击结束')
    this.isMeasure = false;
    this.map.getCanvas().style.cursor = 'crosshair';
    var colorType
    var obj
    if (this.drawType === 'meauseLine' || this.drawType === 'drawLine') {
        //mapFeatureCollection.geometry.coordinates = this.linePointList
        obj = this.mapFeatureCollection
        colorType = 'line-color'
    } else {
        //mapPolygonFeatureCollection.geometry.coordinates 
        obj = this.mapPolygonFeatureCollection
        colorType = 'fill-color'
    }

    obj.geometry.coordinates[0].length > 0 && this.measureMapCkeckJson(obj, colorType)
}
measureMap.prototype.getObjBusinessGeojson = function(event) {
    this.event.BusinessGeojson = event
}
measureMap.prototype.measureMapCkeckJson = function (obj, colorType) {
    var objParent = {
        xzqhGeometrys: this.permisCode ? [JSON.stringify(this.MapFirstKey)] : [JSON.stringify(obj.geometry)],
        drawGeometrys: [JSON.stringify(obj.geometry)]
    }
    if (this.drawType === 'drawLine' || this.drawType === 'drawPolygon') {
        this.clearDrawMarkers()
    }
    this.api.ckeckJson(objParent, (res) => {
        if (res.data) {
            if (this.drawType === 'drawLine' || this.drawType === 'drawPolygon') {
                this.parent.pushLayerHigh(this._MapSourceLayer.parent.id, obj, colorType)
                this.parent.changeLayerHighColor(this._MapSourceLayer.parent.id, this.mapTop)
                this.parent.sourceIdList.push(this._MapSourceLayer)
                this._createMeasureTool = new CreateMeasureTool(this.mapTop)
                this.drawMarkers.push(this._createMeasureTool)
                this.drawType === 'drawPolygon' && this.event.outDrawMapDataBack(JSON.parse(JSON.stringify(obj)))
            } else if (this.drawType === 'meauseLine' || this.drawType === 'meausePolygon') {
                //再次创建
                this._createMeasureTool = new CreateMeasureTool(this.mapTop)
                this.parent.markerList.push(this._createMeasureTool)
                //更新标记
                this.parent.markerList[this.parent.markerList.length - 2].measureTooltipElement.innerHTML = this.rounded_area
                this.parent.pushLayerHigh(this._MapSourceLayer.parent.id, obj, colorType)
                this.parent.changeLayerHighColor(this._MapSourceLayer.parent.id, this.mapTop)
                this.parent.sourceIdList.push(this._MapSourceLayer)
            } else {
                this.parent.pushLayerHigh(this._MapSourceLayer.parent.id, obj, colorType)
                this.parent.changeLayerHighColor(this._MapSourceLayer.parent.id, this.mapTop)
                this.parent.sourceIdList.push(this._MapSourceLayer)
            }
            this.event.BusinessGeojson(JSON.stringify(obj.geometry))

        } else {
            this.event.BusinessGeojson()
            this.errPermissions()

            this.clearMapAssistUp()
        }
        this.mapFeatureCollection.geometry.coordinates = []
        this.mapPolygonFeatureCollection.geometry.coordinates = [
            []
        ]
        this.linePointList = []
        this.linePoint = []
        this.pointContin = []
        this.pointContinList = []
        this.polygonPointList = []
        this.polygonPoint = []
    })
}
measureMap.prototype.errPermissions = function () {
    _Msg.openMsg('绘制图形不在地图权限范围内')
    this._MapSourceLayer.removeSourceTool()
    var item
    if (this.drawType === 'drawLine' || this.drawType === 'drawPolygon') {
        item = this.drawMarkers[this.drawMarkers.length - 1]
        item.marker && item.marker.setLngLat([0, 0])
    } else if (this.drawType === 'meauseLine' || this.drawType === 'meausePolygon') {
        item = this.parent.markerList[this.parent.markerList.length - 1]
        item.marker && item.marker.setLngLat([0, 0])
    }

}
measureMap.prototype.outDrawMapData = function (callback) {
    this.event.outDrawMapDataBack = callback
}
measureMap.prototype.setMapStyle = function() {
    this.map.getCanvas().style.cursor = ''
}
//清除绑定
measureMap.prototype.clearDrawHander = function () {
    this.mapDrawHander && this.map.off('click', this.mapDrawHander)
    this.moveMapDistance && this.map.off('mousemove', this.moveMapDistance)
    this.clearDrawEnd && this.map.off('contextmenu', this.clearDrawEnd)
    this.clearMapAssistUp()
}
measureMap.prototype.clearMapAssistUp = function() {
    this._MapAssist && this._MapAssist.removeMapAssist()
    this._data = {
        type: 'FeatureCollection',
        features: []
    }
    //
    this._MapAssist = new MapAssist({
        data: this._data,
        parent: this,
    })
}
export default measureMap