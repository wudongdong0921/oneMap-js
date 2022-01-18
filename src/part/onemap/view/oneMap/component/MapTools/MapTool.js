var session  = icu.session;
import ToolPopup from './../ToolPopup/popup'
import UpMapTab from './../TabEvents/upMapTab' //上图tab
import District from "./../TabEvents/district" //行政区
import ExportTxT from "./../TabEvents/exportTXT" //导出TXT
import Vector from "./../TabEvents/vector" //矢量文件
import Coordinate from "./../TabEvents/coordinate" //坐标转换
import MapPrint from "./../TabEvents/webMapPrint" //打印
import SideMap from "./../TabEvents/sideMap" //时间轴
import util from '../../../../../../common/util'
import toolConfig from './mapToolConfig'
var ToolMenu = function (data, key, parent) {
    this.html = $('<div class="toolMenu '+ key +'"></div>')
    this._ul = $('<ul></ul>').appendTo(this.html)
    var _this = this
    this.parent = parent
    this.html.hide()
    this.appenLi(data)
    this.type = key
    this.off = true
    this._ul.on('click', 'li', function (e) {
        var target = $(e.target)
        var value = $(this).attr('data-type')
        switch (value) {
            case 'measur-line':
                _this.parent.event.handleMeasure('line');
                break;
            case 'meaur-face':
                _this.parent.event.handlePolygonMeasure('polygon');
                break;
            case 'ponit':
                _this.parent.event.handleEventPoint('point');
                break;
            case 'line':
                _this.parent.event.handleEventLine('line');
                break;
            case 'face':
                _this.parent.event.handleEventPolygon('face');
                break;
            case 'txt':
                _this.parent.txtToastPop(() =>{
                    _this.parent.menuFn(_this.parent.toolMenuList, value)
                })
                break;
            case 'vector':
                _this.parent.menuFn(_this.parent.toolMenuList, value);
                break;
            case 'radio':
                _this.parent.event.handleRadioMap('radio');
                break;
            case 'check':
                _this.parent.event.handleCheckMap('check');
                break;
            case 'screenTwo':
                _this.parent.event.handleDouble('screenTwo')
                break;
            case 'screenFour':
                _this.parent.event.handleDouble('screenFour')
                break;
            case 'areacode':
                _this.parent.event.handlePermisMap($(this).attr('data-value'))

        }
        _this.parent.menuFn(_this.parent.menuList, 'none')
        return false
    })
}
ToolMenu.prototype.appenLi = function (data, parent) {

    for (var i = 0; i < data.length; i++) {
        this._ul.append('<li data-type="' + data[i].type + '" data-value="' + data[i].name + '" class="'+ data[i].type +'"><span class="OneMap_ToolIcon icon iconfont '+ data[i].icon+'"></span><span>' + data[i].name + '</span></li>')
    }
}

var signHtml = ''
signHtml += '<div class="sign_box">';
signHtml += '   名称：<input id="signInput" style="margin:10px 0;height:30px"></input>';
signHtml += '   <div class="sign_button">';
signHtml += '       <button class="ok" id="signOk">确定</button>';
signHtml += '       <button class="cancle" id="signCancle">取消</button>';
signHtml += '   <div>';
signHtml += '</div>'
var MapTool = function (el) {
    this.obj = toolConfig.obj
    const obj = toolConfig.obj
    obj.areacodeList = []
     session.get('userInfo').mapAreaCodeList.forEach(item => {
        item != null && obj.areacodeList.push({
            type: "areacode",
            name: item,
            icon: 'icon-biaoji1'
        })
    })

    var _this = this
    this.mapId = ""
    this.splitFlag = true
    this.signFlag = true
    this.html = $('<div class="OneMap_MapTool"></div>');
    this.leftButton = $('<div class="OneMap_left_box_swith"></div>').appendTo(this.html);
    this.box = $('<div class="OneMap_ToolIcon box"></div>').appendTo(this.leftButton);

    this.zoomFull = $('<div class="OneMap_zoom_box"></div>').appendTo(this.html);
    this.maxZoom = $('<div class="OneMap_zoom_in">+</div>').appendTo(this.zoomFull);
    this.minZoom = $('<div class="OneMap_zoom_out">-</div>').appendTo(this.zoomFull);

    this.buttonLine = $('<div  class="OneMap_button_line" style="height:130px"></div>').appendTo(this.html);

    this.click = $('<div data-type="chose" class="OneMap_ToolIcon click" data-content="选择"></div>').appendTo(this.buttonLine);
    this.sign = $('<div class="OneMap_ToolIcon sign" data-content="标记"></div>').appendTo(this.buttonLine);
    this.split = $('<div class="OneMap_ToolIcon split" data-content="卷帘"></div>').appendTo(this.buttonLine);
    this.double = $('<div data-type="splitScreen" class="OneMap_ToolIcon double" data-content="分屏"></div>').appendTo(this.buttonLine);
    this.download = $('<div class="OneMap_ToolIcon download" data-content="打印"></div>').appendTo(this.buttonLine);
    this.upMap = $('<div data-type="upmap" class="OneMap_ToolIcon upMap" data-content="上图"></div>').appendTo(this.buttonLine);
    this.position = $('<div data-type="district" class="OneMap_ToolIcon position" data-content="定位"></div>').appendTo(this.buttonLine);
    this.export = $('<div data-type="exports" class="OneMap_ToolIcon export" data-content="导出"></div>').appendTo(this.buttonLine);
    // this.transition = $('<div data-type="coordinate" class="OneMap_ToolIcon transition"></div>').appendTo(this.buttonLine);
    this.earth = $('<div class="OneMap_ToolIcon earth" data-content="三维模式"></div>').appendTo(this.buttonLine);
    this.swiper = $('<div class="OneMap_ToolIcon swiper" data-content="时间轴"></div>').appendTo(this.buttonLine);
    this.boundary = $('<div data-type="areacodeList" class="iconfont icon-cedaohang-quanxian boundary" data-content="角色"></div>').appendTo(this.buttonLine);

    this.topLine = $('<div class="OneMap_top_line"></div>').appendTo(this.html);

    this.location = $('<div class="OneMap_ToolIcon location" data-content="全幅"></div>').appendTo(this.topLine);
    this.measure = $('<div data-type="meauses" data-content="测量" class="OneMap_ToolIcon measure"></div>').appendTo(this.topLine);
    this.select = $('<div class="OneMap_ToolIcon select" data-content="识别"></div>').appendTo(this.topLine);
    this.draw = $('<div data-type="physons" class="OneMap_ToolIcon draw" data-content="绘制"></div>').appendTo(this.topLine);
    this.clear = $('<div class="OneMap_ToolIcon clear" data-content="清除"></div>').appendTo(this.topLine);

    this.event = {
        handleMeasure: function () {},
        handlePolygonMeasure: function () {},
        handlePoint: function () {},
        handleEventLine: function () {},
        handlePolygon: function () {},
        fullScreen: function () {},
        handleLayerClear: function () {},
        handleMaxZoom: function () {},
        handleMinZoom: function () {},
        handleSign: function () {},
        handleSplit: function () {},
        handleSplitClose: function() {},
        handleDouble: function () {},
        handleMapDownLoad: function () {},
        mapToolCreateMap: function() {},
        handleRadioMap: function() {},
        handleCheckMap: function() {},
        handleSelectMap: function() {},
        handlePermisMap: function() {},
        toolOutMapList: function() {},
        roolStop: function() {},
        handleUpMap: function() {},
        handleDeleteBusinessTool: function() {},
        clearBusiness:function() {},
        handleSignClear: function() {},
        MapToolPremise:function(){}

    }
    this._UpMapTab = new UpMapTab()
    this._District = new District()
    this._ExportTxT = new ExportTxT()
    this._Vector = new Vector()
    this._Coordinate = new Coordinate()
    this._MapPrint = new MapPrint()
    var isShowBox = false;
    this.menuList = []
    this.toolMenuList = []
    this.txtFlagPop = false
    this.upMapTxtFlag = false
    var webuiPopoverFn = function(data) {
        data.forEach(item => {
            item.webuiPopover({
                style: 'inverse',
                trigger: 'hover',
                placement: 'top',
                autoHide:1000
            });
        })
    }
    //可优化
    webuiPopoverFn([this.clear,this.click,this.sign,this.split,this.double,this.download,this.upMap,this.upMap,this.position,this.export,this.location,this.measure,this.select,this.draw,this.swiper,this.boundary,this.earth])
    
    
    for (let key in obj) {
        var toolMenu = new ToolMenu(obj[key], key, this)
        this.menuList.push(toolMenu)
        switch (key) {
            case 'meauses':
                this.measure.html(toolMenu.html);
                break;
            case 'physons':
                this.draw.html(toolMenu.html);
                break;
            case 'chose':
                toolMenu.html.appendTo(this.html)
                //this.click.html(toolMenu.html);
                break;
            case 'exports':
                this.export.html(toolMenu.html);
                break;
            case 'splitScreen':
                toolMenu.html.appendTo(this.html);
                break;
            case 'areacodeList':
                this.obj.areacodeList.length>0 && this.boundary.html(toolMenu.html)
                
        }
    }
    //
    for (let key in toolConfig.popupObj) {
        var toolPopup = new ToolPopup(key, this)
        this.toolMenuList.push(toolPopup)
        switch (key) {
            case 'upmap':
                toolPopup.handleShow({
                    title: '上图工具',
                    mask: true,
                    width: '700px',
                    left: '50%',
                    top: '50%',
                    height: '400px',
                    content: 'content',
                    //transform: 'translate(-50%,-50%)',
                    onClose: function () {}
                })
                toolPopup.html.find('.layout-dialog-body').append(this._UpMapTab.html)
                toolPopup.obj = this._UpMapTab
                toolPopup.html.appendTo(el);
                break;
            case 'district':
                toolPopup.handleShow({
                    title: '行政区定位',
                    mask: true,
                    width: '500px',
                    left: '50%',
                    top: '50%',
                    height: '400px',
                    content: 'content',
                    //transform: 'translate(-50%,-50%)',
                    onClose: function () {}
                })
                toolPopup.html.find('.layout-dialog-body').append(this._District.html)
                toolPopup.obj = this._District
                toolPopup.html.appendTo(el);
                break;
            case 'txt':
                toolPopup.handleShow({
                    title: '导出TXT坐标',
                    mask: true,
                    width: '500px',
                    left: '50%',
                    top: '50%',
                    height: '400px',
                    content: 'content',
                    //transform: 'translate(-50%,-50%)',
                    onClose: function () {}
                })
                toolPopup.html.find('.layout-dialog-body').append(this._ExportTxT.html)
                toolPopup.obj = this._ExportTxT
                toolPopup.html.appendTo(el)
                break;
            case 'vector':
                toolPopup.handleShow({
                    title: '导出矢量文件',
                    mask: true,
                    width: '500px',
                    left: '50%',
                    top: '50%',
                    height: '400px',
                    content: 'content',
                    //transform: 'translate(-50%,-50%)',
                    onClose: function () {}
                })
                toolPopup.html.find('.layout-dialog-body').append(this._Vector.html)
                toolPopup.obj = this._Vector
                // _Vector.handleCloseVectorEvent(() => {
                //     toolPopup.closePoup()
                // })
                toolPopup.html.appendTo(el);
                break;
            case 'coordinate':
                toolPopup.handleShow({
                    title: '坐标转换工具',
                    mask: true,
                    width:'760px',
                    left:'50%',
                    top:'50%',
                    height:'460px',
                    //transform:'translate(-50%,-50%)',
                    onClose: function () {}
                })
                toolPopup.html.find('.layout-dialog-body').append(this._Coordinate.html)
                toolPopup.obj = this._Coordinate
                toolPopup.html.appendTo(el);
        }
    }
    this.leftButton.click(() => {
        if (isShowBox) {
            return
        };
        var height = this.buttonLine.height();
        isShowBox = true;
        if (height == 130) {
            this.buttonLine.css('overflow', 'hidden');
            this.buttonLine.css('height', '0px');
            setTimeout(() => {
                isShowBox = false;
            }, 300);
            this.menuFn(this.menuList, 'none')
        } else {
            this.buttonLine.css('height', '130px');
            setTimeout(() => {
                isShowBox = false;
                this.buttonLine.css('overflow', 'inherit');
            }, 300);
        };
    });
    this.leftButton.click()
    this.actvieTool = {}
    var toolCommonTool = function(that,flag){
       var toolFlag = _this.event.roolStop()
       if(toolFlag) {
        var type = that.attr('data-type')
        _this.menuFn(_this.menuList, type)
        !flag && _this.setToolActive(that,type)
        return true
       }else {
           return false
       }
      
        //return false
    }
    var MapToolPremiseFn = function(callback) {
        if(!_this.event.MapToolPremise() && _this.event.MapToolPremise() !== undefined) {
            return false
        }
        callback()
    }
    this.measure.click(function (event) {
        MapToolPremiseFn(() => {
            toolCommonTool($(this))
        })
    })
    this.draw.click(function (event) {
        MapToolPremiseFn(() => {
            toolCommonTool($(this))
        })
    })
    this.click.click(function () {
        toolCommonTool($(this))
    })
    this.export.click(function () {
        toolCommonTool($(this),flag)
    })
    this.boundary.click(function () {
        toolCommonTool($(this))
    })
    this.location.click(function() {
        // var toolFlag = _this.event.roolStop()
        var type = $(this).attr('data-type')
        _this.menuFn(_this.menuList, type)
        !flag && _this.setToolActive($(this),type)
        _this.event.fullScreen()
    })
    this.clear.click(function() {
        
        var flag = false
        toolCommonTool($(this),flag) && _this.event.handleEventClear()
        _this.event.clearBusiness()
        
    })
    this.maxZoom.click(function() {
        
        toolCommonTool($(this)) && _this.event.handleMaxZoom()
    })
    this.minZoom.click(function() {
        toolCommonTool($(this)) && _this.event.handleMinZoom()
        
    })
    this.sign.click(function() {
        toolCommonTool($(this)) && _this.event.handleSign(signHtml)
        _this.signFlag || _this.event.handleSignClear()
        
    })
    this.split.click(function() {
        _this.menuFn(_this.toolMenuList,'none')
        if(_this.splitFlag){
            _this.event.handleSplit()
            _this.splitFlag = false
        } else {
            _this.event.handleSplitClose()
            _this.splitFlag = true
        }
        
    })

    //二三维联动
    this.earth.click(function() {
        toolCommonTool($(this))
    })
    //时间轴
    var _SideMap = new SideMap()
    $('body').append(_SideMap.sideMap)
    this.swiper.click(() => {
        var code = this.obj.areacodeList.length === 0 ? null : this.obj.areacodeList[0].name
        var swiperFlag = _this.event.roolStop()
        swiperFlag && _SideMap && this.mapId &&_SideMap.init(this.mapId,this,_SideMap.sideMap,code)
        _this.menuFn(_this.menuList, 'none')
        
        
    })
    //分屏
    this.double.click(function() {
        // if(!_this.event.roolStop()) {
        //     return false
        // }
        // _this.setToolActive($(this))
        // _this.event.roolStop()
        // _this.event.handleDouble()
        toolCommonTool($(this))
    })
    
    this._MapPrint.html.appendTo(el)
    this._MapPrint.closePrint(() => {
        this.download.click()
    })
    var flag = true
    //pdf打印
    this.download.click(function() {
        _this.setToolActive($(this))
        _this.menuFn(_this.menuList, 'none')
        var downFlag = _this.event.roolStop()
        if(flag && downFlag) {
            _this._MapPrint.html.show()
            flag = false
        }else {
            _this._MapPrint.html.hide()
            flag = true
        }
        //this.event.handleMapDownLoad()
    })
    var getToolFlag = function(callback) {
        var flag = _this.event.roolStop()
        console.log(flag)
        flag && callback()
    }
    //识别
    this.select.click(function() {
        getToolFlag(() => {
            var type = $(this).attr('data-type')
            _this.setToolActive($(this),type)
            _this.menuFn(_this.menuList, 'none')
            _this.event.handleSelectMap()
        })
        
    })
    //上图
    this.upMap.click(function () {
        MapToolPremiseFn(() => {
            getToolFlag(() => {
                _this.setToolActive($(this),type)
                var type = $(this).attr('data-type')
                _this.menuFn(_this.toolMenuList, type,$(this))
               _this.menuFn(_this.menuList, 'none')
            })
        })
       
        
    })
    // 三维地图联动
    this.earth.click(()=>{
        // window.mapView.$el.find('#OneMapBox').empty()
        // map3DRenderfView(window.mapView.$el.find('#OneMapBox'),"/3DOneMap")  // 在当前页面渲染三维地图
        // window.thisView.gotoPage('true', "/3DOneMap")
        window.mapView.goto("/3DOneMap")
    })
    
    //行政区定位
    this.position.click(function () {
        getToolFlag(() => {
            var type = $(this).attr('data-type')
            _this.menuFn(_this.toolMenuList, type,$(this))
            _this.setToolActive($(this),type)
            _this.menuFn(_this.menuList, 'none')
        })
    })
    // //坐标转换
    // this.transition.click(function () {
    //     var type = $(this).attr('data-type')
    //     _this.menuFn(_this.toolMenuList, type)
    // })
    //预览
    this._UpMapTab.handleCreateMapRaseter((data,para,list,epsgCode) => {
        console.log(list)
        this.event.mapToolCreateMap(data,para,1,this.documentId,true,list,epsgCode)
    })
    //返回上传的geojson
    this._UpMapTab.getUploadMapList((data,type,flag,epsgCode) => {
        this.event.toolOutMapList(data,epsgCode)
        var obj = {
            coordinates: []
        }
        for(let i =0;i<data.length;i++) {
            var item = JSON.parse(data[i])
            if(item.type == 'MultiPolygon') {
                var listArr = []
                for(let k = 0;k<item.coordinates.length;k++) {
                    listArr = listArr.concat(...item.coordinates[k])
                }
                obj.coordinates.push(listArr)
            } else{
                obj.coordinates.push(...item.coordinates)
            }
        }
        this.txtFlagPop= type
        this.upMapTxtFlag = flag
        //上图文件数据导出，但需要导出操作的上图数据
        this._ExportTxT.getUpGeojson(obj,data,type)
        this._Vector.getMapFormData(data,obj)
    })
    //
    this._UpMapTab.handleDeleteBusinessAll(() =>{
        this.event.handleDeleteBusinessTool()
    })
    //上图
    this._UpMapTab.handleBusinessUpMap((data,callback) => {
        this.event.handleUpMap(data,this.documentId,callback)
    })
    //上图关闭
    this._UpMapTab.handleBusinessUpMapClose(() => {
        this.menuFn(this.toolMenuList, 'upmap')
    })
    //转换预览
    this._Coordinate.handleCreateMapRaseter((data) => {
        this.event.mapToolCreateMap(data)
    })
    //
    this._District.handleGetSelect((data,value) => {
        var arr = []
        arr.push({
            type: 'Feature',
            geometry: data
        })
        var obj = {
            type: "FeatureCollection",
            features: arr
        }
        //this.event.mapToolCreateMap(obj,obj.features[0],2)//行政区定位做分析就开启
        this.event.mapToolCreateMap(obj)
    })
};
MapTool.prototype.setToolActive = function(that,type) {
    if(that.hasClass('active')) {
        this.signFlag = false
        that.removeClass('active')
    } else {
        this.signFlag = true
        this.actvieTool.type && this.actvieTool.type.removeClass('active')
        that.addClass('active')
    }
    this.actvieTool.type = that
}
MapTool.prototype.handleDeleteBusinessAlls = function(event) {
    this.event.handleDeleteBusinessTool = event
}
//卷帘控制
MapTool.prototype.getHandleRoolStop = function(event) {
    this.event.roolStop = event
}
MapTool.prototype.getPrintPdf = function(map) {
    this._MapPrint.getPrintPdfMap(map)
}
MapTool.prototype.getOutMapId = function(data) {
    this.mapId = data
}
//绘制导出
MapTool.prototype.getMapPolyList = function(data) {
    this.polyList = data
    var arr = {
        geometry: {},
        type: ""
    }
    if(data && data.geometry.type === "MultiPolygon") {
        this.txtFlagPop = true
        arr.geometry.coordinates = [data.geometry.coordinates]
        arr.geometry.type = data.geometry.type
        console.log(arr)
        this._ExportTxT.getMapFormData(arr)
        this._Vector.getMapFormData(arr)
    } else {
        this.txtFlagPop = false
        this._ExportTxT.getMapFormData(data)
        this._Vector.getMapFormData(data)
    }
    
}
MapTool.prototype.getAdministrativeGeojson = function(data) {
    this._UpMapTab.getAdministrativeGeojson(data)
}
MapTool.prototype.txtToastPop = function(callback) {
    var type = this.txtFlagPop
    const text = this.upMapTxtFlag ? '业务数据暂不支持导出TXT' : '仅支持单一地块导出txt坐标'
    if(type || !this.polyList) {
        layer.open({
            title: '警告',
            content: text
        });
       return false
    }
    callback && !type && callback()
    
}
MapTool.prototype.menuFn = function (arr, type,that) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].html.hide()
        if (arr[i].type === type && arr[i].off) {
            arr[i].html.show()
            arr[i].off = false
            arr[i].active = that
            if(arr[i].type=== 'txt') {
                arr[i].obj.clearEmpty()
                console.log(this.polyList)
                this.polyList && arr[i].obj.setTableData(this.polyList.geometry)
            } else if(arr[i].type === 'district') {
                arr[i].obj.arrLevelList = []
                arr[i].obj.clearInputs()
                arr[i].obj.districtPositioningSql({
                    roleArea:config.InterfaceAddress.roleArea,
                    clickArea: config.InterfaceAddress.roleArea,
                    type: '1'
                },() => {

                })
            }
            else if(arr[i].type === 'upmap') {
                this.documentId = util.Guid()
                arr[i].off || arr[i].obj.clearFileLists()
                arr[i].obj.setPermissions(this.abovePermissionsFlag)
            }
        } else {
            arr[i].html.hide()
            arr[i].off = true
        }
    }
}
MapTool.prototype.abovePermissions = function(type) {
    //业务上图清除隐藏
    //this.clear.hide()
    this.abovePermissionsFlag = type
    if(type) {
        for(let i =0 ;i<this.toolMenuList.length;i++) {
            var item = this.toolMenuList[i]
            if(item.type === 'upmap') {
                item.html.show()
                item.off = false
            }
        }
    }
}
MapTool.prototype.handleEventMeaurse = function (event) {
    this.event.handleMeasure = event
}
MapTool.prototype.handleFullScreen = function (event) {
    this.event.fullScreen = event
}
MapTool.prototype.handleEventPolygonMeasure = function (event) {
    this.event.handlePolygonMeasure = event
}
//绘制点
MapTool.prototype.handlePoint = function (event) {
    this.event.handleEventPoint = event
}
//绘制线
MapTool.prototype.handleLine = function (event) {
    this.event.handleEventLine = event
}
//绘制面
MapTool.prototype.handlePolygon = function (event) {
    this.event.handleEventPolygon = event
}
MapTool.prototype.useClearBusiness = function(callback) {
    this.event.clearBusiness = callback
}
//清除
MapTool.prototype.handleLayerClear = function (event) {
    this.event.handleEventClear = event
}
//放大
MapTool.prototype.handleZoomIn = function (event) {
    this.event.handleMaxZoom = event
}
//缩小
MapTool.prototype.handleZoomOut = function (event) {
    this.event.handleMinZoom = event
}
//标注
MapTool.prototype.handleToolSign = function (event) {
    this.event.handleSign = event
}
//
MapTool.prototype.handleToolSignClear = function (event) {
    this.event.handleSignClear = event
}
//卷帘
MapTool.prototype.handleToolSplit = function (event,events) {
    this.event.handleSplit = event
    this.event.handleSplitClose = events
}
//分屏
MapTool.prototype.handleToolDouble = function (event) {
    this.event.handleDouble = event
}
//打印
// MapTool.prototype.handleMapToolDownLoad = function (event) {
//     this.event.handleMapDownLoad = event
// }
//打印
//上图
MapTool.prototype.handleToolUpMap = function (event) {
    this.event.handleUpMap = event
}
//预览地图
MapTool.prototype.handleMapToolCreateMap = function(event) {
    this.event.mapToolCreateMap = event
}
MapTool.prototype.handleToolOutMapList = function(event) {
    this.event.toolOutMapList = event
}
//选择单选
MapTool.prototype.handleToolRadioMap = function(event) {
    this.event.handleRadioMap = event
}
//选择连选
MapTool.prototype.handleToolCheckMap = function(event) {
    this.event.handleCheckMap = event
}
//识别
MapTool.prototype.handleToolSelectMap = function(event) {
    this.event.handleSelectMap = event
}
//权限
MapTool.prototype.handleToolPermisMap = function(event) {
    this.event.handlePermisMap = event
    if(this.obj.areacodeList.length > 0) {
        this.event.handlePermisMap(this.obj.areacodeList[0].name)
    } else {
        this.event.handlePermisMap(null)
    }
}
MapTool.prototype.handleMapToolPremise = function(event) {
    this.event.MapToolPremise = event
}
export default MapTool;