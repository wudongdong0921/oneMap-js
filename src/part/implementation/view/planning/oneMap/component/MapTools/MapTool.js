// import session from '../../../../component/session';
// import ToolPopup from './../ToolPopup/popup'
// import UpMapTab from './../TabEvents/upMapTab' //上图tab
// import District from "./../TabEvents/district" //行政区
// import ExportTxT from "./../TabEvents/exportTXT" //导出TXT
// import Vector from "./../TabEvents/vector" //矢量文件
// import Coordinate from "./../TabEvents/coordinate" //坐标转换
// import MapPrint from "./../TabEvents/webMapPrint" //打印
// import SideMap from "./../TabEvents/sideMap" //时间轴
// var _UpMapTab = new UpMapTab()
// var _District = new District()
// var _ExportTxT = new ExportTxT()
// var _Vector = new Vector()
// var _Coordinate = new Coordinate()
// var _MapPrint = new MapPrint()
// _District.districtPositioning({
//     value: '00',
//     type: '1'
// })
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
                _this.parent.menuFn(_this.parent.toolMenuList, value)
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
    var obj = {
        meauses: [{
                name: '测量线',
                type: 'measur-line'
            },
            {
                name: '测量面',
                type: 'meaur-face'
            }
        ],
        physons: [{
                name: '绘制点',
                type: 'ponit'
            },
            {
                name: '绘制线',
                type: 'line'
            },
            {
                name: '绘制面',
                type: 'face'
            }
        ],
        chose: [{
                name: '单选',
                type: 'radio'
            },
            {
                name: '连选',
                type: 'check'
            }
        ],
        exports: [{
                name: 'TXT坐标',
                type: 'txt'
            },
            {
                name: '矢量文件',
                type: 'vector'
            }
        ],
        areacodeList:[]
    }
    this.obj = obj
     icu.session.get('userInfo').mapAreaCodeList.forEach(item => {
        item != null && obj.areacodeList.push({
            type: "areacode",
            name: item,
            icon: 'icon-biaoji1'
        })
    })
    var popupObj = {
        upmap: {
            name: '上图',
            type: 'upmap'
        },
        district: {
            name: '行政区定位',
            type: 'district'
        },
        txt: {
            name: 'TxT坐标',
            type: 'txt'
        },
        vector: {
            name: '矢量文件',
            type: 'vector'
        },
        coordinate: {
            name: '坐标转换工具',
            type: 'coordinate'
        }
    }

    var _this = this
    this.mapId = ""
    this.splitFlag = true
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
    this.double = $('<div class="OneMap_ToolIcon double" data-content="分屏"></div>').appendTo(this.buttonLine);
    this.download = $('<div class="OneMap_ToolIcon download" data-content="打印"></div>').appendTo(this.buttonLine);
    this.upMap = $('<div data-type="upmap" class="OneMap_ToolIcon upMap" data-content="上图"></div>').appendTo(this.buttonLine);
    this.position = $('<div data-type="district" class="OneMap_ToolIcon position" data-content="定位"></div>').appendTo(this.buttonLine);
    this.export = $('<div data-type="exports" class="OneMap_ToolIcon export" data-content="导出"></div>').appendTo(this.buttonLine);
    // this.transition = $('<div data-type="coordinate" class="OneMap_ToolIcon transition"></div>').appendTo(this.buttonLine);
    this.earth = $('<div class="OneMap_ToolIcon earth"></div>').appendTo(this.buttonLine);
    this.swiper = $('<div class="OneMap_ToolIcon swiper" data-content="时间轴"></div>').appendTo(this.buttonLine);
    this.boundary = $('<div data-type="areacodeList" class="iconfont icon-cedaohang-quanxian boundary" data-content="角色"></div>').appendTo(this.buttonLine);

    this.topLine = $('<div class="OneMap_top_line"></div>').appendTo(this.html);

    this.location = $('<div class="OneMap_ToolIcon location" data-content="缩放至全图"></div>').appendTo(this.topLine);
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

    }
    var isShowBox = false;
    this.menuList = []
    this.toolMenuList = []
    this.clear.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.click.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.sign.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.split.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.double.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.download.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.upMap.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.position.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.export.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.location.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.measure.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.select.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.draw.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.swiper.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
    this.boundary.webuiPopover({
        style: 'inverse',
        trigger: 'hover',
        placement: 'top'
    });
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
            case 'areacodeList':
                this.boundary.html(toolMenu.html)
        }

    }
    //
    // for (let key in popupObj) {
    //     var toolPopup = new ToolPopup(key, this)
    //     this.toolMenuList.push(toolPopup)
    //     switch (key) {
    //         case 'upmap':
    //             toolPopup.handleShow({
    //                 title: '上图工具',
    //                 mask: true,
    //                 width: '700px',
    //                 left: '50%',
    //                 top: '50%',
    //                 height: '400px',
    //                 content: 'content',
    //                 //transform: 'translate(-50%,-50%)',
    //                 onClose: function () {}
    //             })
    //             toolPopup.html.find('.layout-dialog-body').append(_UpMapTab.html)
    //             toolPopup.obj = _UpMapTab
    //             toolPopup.html.appendTo(el);
    //             break;
    //         case 'district':
    //             toolPopup.handleShow({
    //                 title: '行政区定位',
    //                 mask: true,
    //                 width: '500px',
    //                 left: '50%',
    //                 top: '50%',
    //                 height: '400px',
    //                 content: 'content',
    //                 //transform: 'translate(-50%,-50%)',
    //                 onClose: function () {}
    //             })
    //             toolPopup.html.find('.layout-dialog-body').append(_District.html)
    //             toolPopup.obj = _District
    //             toolPopup.html.appendTo(el);
    //             break;
    //         case 'txt':
    //             toolPopup.handleShow({
    //                 title: '导出TXT坐标',
    //                 mask: true,
    //                 width: '500px',
    //                 left: '50%',
    //                 top: '50%',
    //                 height: '400px',
    //                 content: 'content',
    //                 //transform: 'translate(-50%,-50%)',
    //                 onClose: function () {}
    //             })
    //             toolPopup.html.find('.layout-dialog-body').append(_ExportTxT.html)
    //             toolPopup.obj = _ExportTxT
    //             toolPopup.html.appendTo(el)
    //             break;
    //         case 'vector':
    //             toolPopup.handleShow({
    //                 title: '导出矢量文件',
    //                 mask: true,
    //                 width: '500px',
    //                 left: '50%',
    //                 top: '50%',
    //                 height: '400px',
    //                 content: 'content',
    //                 //transform: 'translate(-50%,-50%)',
    //                 onClose: function () {}
    //             })
    //             toolPopup.html.find('.layout-dialog-body').append(_Vector.html)
    //             toolPopup.obj = _Vector
    //             // _Vector.handleCloseVectorEvent(() => {
    //             //     toolPopup.closePoup()
    //             // })
    //             toolPopup.html.appendTo(el);
    //             break;
    //         case 'coordinate':
    //             toolPopup.handleShow({
    //                 title: '坐标转换工具',
    //                 mask: true,
    //                 width:'760px',
    //                 left:'50%',
    //                 top:'50%',
    //                 height:'460px',
    //                 //transform:'translate(-50%,-50%)',
    //                 onClose: function () {}
    //             })
    //             toolPopup.html.find('.layout-dialog-body').append(_Coordinate.html)
    //             toolPopup.obj = _Coordinate
    //             toolPopup.html.appendTo(el);
    //     }
    // }
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

    this.measure.click(function (event) {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.menuList, type)
        return false
    })
    this.draw.click(function (event) {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.menuList, type)
        return false
    })
    this.click.click(function () {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.menuList, type)
        return false
    })
    this.export.click(function () {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.menuList, type)
        return false
    })
    this.boundary.click(function () {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.menuList, type)
        return false
    })
    this.location.click(() => {
        this.event.fullScreen()
    })
    this.clear.click(() => {
        this.event.handleEventClear()
    })
    this.maxZoom.click(() => {
        this.event.handleMaxZoom()
    })
    this.minZoom.click(() => {
        this.event.handleMinZoom()
    })
    this.sign.click(() => {
        this.event.handleSign(signHtml)
    })
    this.split.click(() => {
        if(this.splitFlag){
            this.event.handleSplit()
            this.splitFlag = false
        } else {
            this.event.handleSplitClose()
            this.splitFlag = true
        }
        
    })
    //识别
    this.select.click(() => {
        this.event.handleSelectMap()
    })
    //上图
    this.upMap.click(function () {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.toolMenuList, type)
    })
    //行政区定位
    this.position.click(function () {
        var type = $(this).attr('data-type')
        _this.menuFn(_this.toolMenuList, type)
    })
    // //坐标转换
    // this.transition.click(function () {
    //     var type = $(this).attr('data-type')
    //     _this.menuFn(_this.toolMenuList, type)
    // })
    //预览
};
MapTool.prototype.getPrintPdf = function(map) {
    _MapPrint.getPrintPdfMap(map)
}
MapTool.prototype.getOutMapId = function(data) {
    this.mapId = data
}
MapTool.prototype.getMapPolyList = function(data) {
    this.polyList = data
    _ExportTxT.getMapFormData(data)
    _Vector.getMapFormData(data)
}
MapTool.prototype.getAdministrativeGeojson = function(data) {
    _UpMapTab.getAdministrativeGeojson(data)
}
MapTool.prototype.menuFn = function (arr, type) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].html.hide()
        if (arr[i].type === type && arr[i].off) {
            arr[i].html.show()
            arr[i].off = false
            if(arr[i].type=== 'txt') {
                this.polyList && arr[i].obj.setTableData(this.polyList.geometry)
            } else if(arr[i].type === 'district') {
                arr[i].obj.districtPositioning({
                    value: '00',
                    type: '1'
                },(serviceResult) => {
                    arr[i].obj.districtPositioning({
                        value: serviceResult.result.features.features[0].properties.XZQDM,
                        type: '1'
                    },(serviceResult) => {
                    })
                })
            }
            else if(arr[i].type === 'upmap') {
                arr[i].off || arr[i].obj.clearFileLists()
            }
        } else {
            arr[i].html.hide()
            arr[i].off = true
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
export default MapTool;