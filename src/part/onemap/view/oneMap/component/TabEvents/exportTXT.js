////////////////////////////////////////////////
// 导出TXT
// 吴东东
// 2020-11-05 11:52:41
////////////////////////////////////////////////
import { isArray } from "mapbox-print-pdf/js/type-check";
import _api from "./../../apis/map"
// import handleFn from "./../handleCommon"
import Tabs from './../Tab/tab'
var ExportTxT = function () {
    var tab = ""
    tab += '  <div class="wdd-tab-box wdd-tab-wrapper wdd-file-wrapper">';
    tab += '<div class="wdd-tab-file tabId">';
    tab += '      <div class="wdd-tab-item">';
    tab += '        <div class="top clearfix">'
    // tab += '             <div>投影系统设置</div>'
    tab += '             <div class="select_GSC">'
    // tab += '                 <div style="margin:2%;">'
    // tab += '                     <select class="shaw_select">'
    // tab += '                        <option value ="41">GSC_高斯投影_123_41500000</option>'
    // tab += '                        <option value ="42">GSC_高斯投影_126_42500000</option>'
    // tab += '                     </select>'
    // tab += '                 </div>'
    // tab += '                 <div class="change_CSC">'
    // tab += '                    <div id="changeXY"><div class="OneMap_ToolIcon transition"></div></div>'
    // tab += '                 </div>'
    tab += '             </div>'
    tab += '         </div>';
    tab += '         <div class="middle">';
    tab += '             <div class="tabId">';
    tab += '                 <ul class="wdd-tab-ul" id="middleUlTXT">';
    tab += '                 </ul>';
    tab += '                 <div class="wdd-tab-box" id="middleItemTXT">';
    tab += '                 </div>';
    tab += '             </div>';
    tab += '         </div>';
    tab += '      </div>';
    tab += '      <div class="layout_foot_button">';
    // tab += '        <button class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="exportTxt">导出</button>';
    tab += '        <button class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="exportTxtAll">导出</button>';
    tab += '      </div>';
    tab += '  </div>'
    tab += '  </div>'
    this.html = $(tab)
    this.exportData = null
    this.exportDataObj = null
    this.index = 1
    this.event = {
        getMapFeater: function () {}
    }

    this.html.find('#changeXY').click(() => {
        this.xyChange(this.html, this.index)
    })
    this.html.find('#exportTxt').click(() => {
        // var needArr = [];
        // var xyArr = [];
        // var geometry = [];
        // var single
        // this.html.find(".middle").find(".wdd-show").find("table").find("tbody").find("td[sign='XY']").each(function () {
        //     xyArr.push(parseFloat($(this).html()));
        //     if (xyArr.length == 2) {
        //         var item = {
        //             "bigX": xyArr[0],
        //             "bigY": xyArr[1]
        //         };
        //         needArr.push(item);
        //         xyArr = [];
        //     }
        // });
        // geometry.push({
        //     type: 'Region',
        //     //parts: [],
        //     points: needArr
        // });
        // var param = {
        //     geometry: geometry,
        //     dsName: null,
        //     dtName: null,
        //     // qhdm: '230200',
        //     returnMode: 'TXTFORMAT',
        //     number: 41
        // };
        // _api.exportFormData(param, (res) => {
        //     var returnUrl = res.data
        //     var txtUrl = config.InterfaceAddress.AnalysisServiceTest + returnUrl;
        //     var txtName = txtUrl.substring(txtUrl.lastIndexOf("/") + 1);
        //     $.ajax({
        //         url: txtUrl,
        //         success: download.bind(true, "text/html", txtName)
        //     });
        // })
        var obj = ""
        if(this.exportData.length>0) {
            obj = this.exportData[this.index-1]
        }else {
            obj = JSON.stringify(this.exportData.geometry)
        }
        var param = {
            geometrys: [obj],
            // dsName: null,
            // dtName: null,
            // qhdm: '230200',
            returnMode: 'TXTFORMAT',
            //number: 41
        };
        _api.ExportFileOut(param,(res) => {
            var returnUrl = res.data
            var txtUrl = config.InterfaceAddress.AnalysisServiceTest + returnUrl;
            var txtName = txtUrl.substring(txtUrl.lastIndexOf("/") + 1);
            $.ajax({
                url: txtUrl,
                success: download.bind(true, "text/html", txtName)
            });
        })
    })
    this.html.find('#exportTxtAll').click(() => {
        // var allGeo = []
        // var nodeItem = []
        // console.log(this.pointsListAll)
        // for (let i = 0; i < this.pointsListAll.length; i++) {
        //     var arr = []
        //     for (let j = 0; j < this.pointsListAll[i].length; j++) {
        //         if (this.pointsListAll[i][j].length == 2) {
        //             var item = {
        //                 "bigX": this.pointsListAll[i][j][0],
        //                 "bigY": this.pointsListAll[i][j][1]
        //             };
        //             arr.push(item)
        //             //xyArr = [];
        //         }
        //     }
        //     allGeo.push({
        //         type: "Region",
        //         points: arr
        //     })

        // }
        // var param = {
        //     geometry: allGeo,
        //     dsName: null,
        //     dtName: null,
        //     // qhdm: '230200',
        //     returnMode: 'TXTFORMAT',
        //     number: 41
        // };
        // _api.exportFormData(param, (res) => {
        //     var returnUrl = res.data
        //     var txtUrl = config.InterfaceAddress.AnalysisServiceTest + returnUrl;
        //     var txtName = txtUrl.substring(txtUrl.lastIndexOf("/") + 1);
        //     $.ajax({
        //         url: txtUrl,
        //         success: download.bind(true, "text/html", txtName)
        //     });
        // })
        var obj = ""
        if(this.exportData.length) {
            obj = this.exportData
        }else {
            obj = [JSON.stringify(this.exportData.geometry)]
        }
        var param = {
            geometrys: obj,
            dsName: null,
            dtName: null,
            // qhdm: '230200',
            returnMode: 'TXTFORMAT',
            //number: 41
        };
        _api.ExportFileOut(param,(res) => {
            var returnUrl = res.data
            var txtUrl = config.InterfaceAddress.AnalysisServiceTest + returnUrl;
            var txtName = txtUrl.substring(txtUrl.lastIndexOf("/") + 1);
            $.ajax({
                url: txtUrl,
                success: download.bind(true, "text/html", txtName)
            });
        })
    })
    // var _tabItem = new Tabs({
    //     el: this.html.find('.middle'),
    //     defaultIndex: 0
    // })
}
ExportTxT.prototype.getMapFormData = function (data) {
    this.exportData = data
}
ExportTxT.prototype.xyChange = function (el, indexs) {
    el.find('.dt' + indexs + '').find("table").find("tbody").find("tr").each(function () {
        var value1 = $(this).find("td").eq(1).html();
        var value2 = $(this).find("td").eq(2).html();
        $(this).find("td").eq(1).html(value2);
        $(this).find("td").eq(2).html(value1);
    });
}
//导入数据转换
ExportTxT.prototype.getUpGeojson = function(obj,data,type) {
    this.exportData = data
    this.setTableData(obj,type)
}
ExportTxT.prototype.clearEmpty = function() {
    this.html.find('#middleUlTXT').empty()
    this.html.find('#middleItemTXT').empty()
}
ExportTxT.prototype.setTableData = function (data,type) {
    console.log(data)
    console.log(type)
    if(data.coordinates.length=== 0) {
        return false
    }
    
    var tabContent = ""
    var pointsList = data.coordinates
    this.pointsListAll = data.coordinates
    this.ArrayVertex = []
    var coordinateTransformArr = []
    var fileList = []
    var serial = 0;
    var bool = false
    var i = 0
    for (var i = 0; i < pointsList.length; i++) {
        serial = i + 1;
        var points = pointsList[i]
        this.html.find('#middleUlTXT').append('<li>地块' + serial + '</li>')
        // this.html.find('#middleItem').append('<div class="wdd-tab-item" sign="exportTxt"><div class="table-xy dt' + serial + '"></div></div>')
        for (let j = 0; j < points.length; j++) {
            fileList.push({
                id: j,
                x: points[j][0],
                y: points[j][1]
            })
        }
        if (i == 0) {
            tabContent = tabContent + '<div class="layui-tab-item code-table dt' + serial + '">' +
                '<table class="bottom layui-table" lay-size="sm" style="position: absolute;z-index:99;margin: 0;">' +
                '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead>' +
                '</table>' +
                '<div style="height: 196px;overflow-y: auto;">' +
                '<table class="bottom layui-table" lay-size="sm" style="margin: 0;">' +
                '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead><tbody>'
        } else {
            tabContent = tabContent + '<div class="layui-tab-item code-table dt' + serial + '">' +
                '<table class="bottom layui-table" lay-size="sm" style="position: absolute;z-index:99;margin: 0;">' +
                '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead>' +
                '</table>' +
                '<div style="height: 196px;overflow-y: auto;">' +
                '<table class="bottom layui-table" lay-size="sm" style="margin: 0;">' +
                '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead><tbody>'
        }
        var z = 0;
        var secondArr = [];
        if (bool) {
            for (var j = 0; j < endNum; j++) {
                z = z + 1;
                var point = data[j].center;
                secondArr.push({
                    bigX: point.x,
                    bigY: point.y
                });
                tabContent = tabContent + '<tr><td>' + z + '</td><td sign="XY">' + point.x + '</td><td sign="XY">' + point.y + '</td></tr>';
            }
            coordinateTransformArr.push(secondArr)
            tabContent = tabContent + '</tbody></table></div></div>';
        } else {
            for (var j = 0; j < points.length; j++) {
                z = z + 1;
                var point = points[j];
                coordinateTransformArr.push({
                    x: point[0],
                    y: point[1]
                });
                tabContent = tabContent + '<tr><td>' + z + '</td><td sign="XY">' + point[0] + '</td><td sign="XY">' + point[1] + '</td></tr>';
            }
            tabContent = tabContent + '</tbody></table></div></div>';
        }

    }

    this.html.find('#middleItemTXT').html(tabContent)
    var _tabItem = new Tabs({
        el: this.html.find('.middle'),
        defaultIndex: 0
    })
    _tabItem.changeControl((index) => {
        this.index = index + 1
    })
}
export default ExportTxT