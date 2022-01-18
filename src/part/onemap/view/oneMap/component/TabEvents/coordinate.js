////////////////////////////////////////////////
// 坐标转换
// 吴东东
// 2020-11-05 11:34:01
////////////////////////////////////////////////
import Tabs from './../Tab/tab'
import UploadFile from "./../UploadFile/uploadFile"
import api from "./../../apis/map"
var Coordinate = function() {
    var tab = ""
    tab += '  <div class="wdd-tab-wrapper wdd-tab-box wdd-file-wrapper clearfix">';
    tab += '<div class="wdd-tab-file tabId">';
    tab += '      <div class="wdd-tab-item transform-left">';
    tab += '        <div class="top clearfix">'
    tab += '             <div>投影系统设置</div>'
    tab += '             <div class="select_GSC">'
    tab += '                 <div style="margin:2%;">'
    tab += '                     <select class="shaw_select" id="selectSource">'
    tab += '                        <option value ="41">GSC_高斯投影_123_41500000</option>'
    tab += '                        <option value ="42">GSC_高斯投影_126_42500000</option>'
    tab += '                     </select>'
    tab += '                 </div>'
    tab += '             </div>'
    tab += '         </div>';
    tab += '         <div class="middleLf wdd-file-wrapper clearfix">';
    tab += '             <div class="tabId">';
    tab += '                 <ul class="wdd-tab-ul" id="middleUlCoordinateLf">';
    tab += '                 </ul>';
    tab += '                 <div class="wdd-tab-box" id="middleItemCoordinateLf">';
    tab += '                 </div>';
    tab += '             </div>';
    tab += '         </div>';
    tab += '      </div>';
    tab += '      <div class="wdd-tab-item transform-left">';
    tab += '        <div class="top clearfix">'
    tab += '             <div>投影系统设置</div>'
    tab += '             <div class="select_GSC">'
    tab += '                 <div style="margin:2%;">'
    tab += '                     <select class="shaw_select" id="selectTarget">'
    tab += '                        <option value ="41">GSC_高斯投影_123_41500000</option>'
    tab += '                        <option value ="42">GSC_高斯投影_126_42500000</option>'
    tab += '                     </select>'
    tab += '                 </div>'
    tab += '             </div>'
    tab += '         </div>';
    tab += '         <div class="middleRg wdd-file-wrapper clearfix">';
    tab += '             <div class="tabId">';
    tab += '                 <ul class="wdd-tab-ul" id="middleUlCoordinateRg">';
    // tab += '                     <li>地块1</li>';
    tab += '                 </ul>';
    tab += '                 <div class="wdd-tab-box" id="middleItemCoordinateRg">';
    tab += '             </div>';
    tab += '         </div>';
    tab += '      </div>';
    tab += '      <div class="wdd-tab-item">';
    tab += '        <div class="layout_foot_button">'
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="transformExport">导入面</button>';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="transformCode">转换</button>';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="transformPreview">预览</button>';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="transformFileOut">导出</button>';
    tab += '        </div>';
    tab += '      </div>';
    tab += '  </div>'
    tab += '  </div>'
    this.html =  $(tab)
    this.geoJson = ""
    this.event = {
        CreateMapRaseter: function() {}
    }
    var _UploadFile = new UploadFile()
    this.html.find('#transformExport').click(() => {
        _UploadFile.uploadFile()
    })
    _UploadFile.HandleSetCoordinate((data,file) => {
        this.geoJson = data
        this.file = file
        var elLeft = this.html.find('#middleUlCoordinateLf')
        var elLeftBox = this.html.find('#middleItemCoordinateLf')
        var tabEl = this.html.find('.middleLf')
        this.setTableData(elLeft,elLeftBox,tabEl,data)
    })
    //转换
    this.html.find('#transformCode').click(() => {
        this.transformCode(this.coordinateTransformArr,this.geoJson)
    })
    //预览
    this.html.find('#transformPreview').click(() => {
    this.event.CreateMapRaseter({
        type: 'Feature',
        geometry: this.geoJson
    })
    })
    //导出
    this.html.find('#transformFileOut').click(() => {
        var needArr = [];
            var xyArr = [];
            var geometry = [];
            this.html.find(".middleRg").find(".wdd-show").find("table").find("tbody").find("td[sign='XY']").each(function () {
                xyArr.push(parseFloat($(this).html()));
                if (xyArr.length == 2) {
                    var item = { "bigX": xyArr[0], "bigY": xyArr[1] };
                    needArr.push(item);
                    xyArr = [];
                }
            });
            var param = handleFn.exportTXTFile(this.html,'1',geometry,needArr)
        _api.exportFormData(param,(res) => {
            var returnUrl = res.data
            var txtUrl = config.InterfaceAddress.AnalysisServiceTest + returnUrl;
        var txtName = txtUrl.substring(txtUrl.lastIndexOf("/")+1);
        $.ajax({
            url: txtUrl,
            success: download.bind(true, "text/html",txtName)
        });
        })
    })
}
Coordinate.prototype.handleCreateMapRaseter = function(event) {
    this.event.CreateMapRaseter = event
}
//坐标转换
Coordinate.prototype.transformCode = function(option,geojson) {
    var elLeft = this.html.find('#middleUlCoordinateRg')
        var elLeftBox = this.html.find('#middleItemCoordinateRg')
        var tabEl = this.html.find('.middleRg')
    var op = null
        if(option.length == 0){
            return;
        }
        var coordinateTransformArr = []
        var sourceEpsgCode = this.html.find('#selectSource').val();
        var targetEpsgCode = this.html.find('#selectTarget').val();
        var param = {
            "sourcePoints":option,
            "sourceEpsgCode":sourceEpsgCode,
            "targetEpsgCode":targetEpsgCode
        };
        $.ajax({
            type : "post",
            url : config.InterfaceAddress.coordinateTransformationServer,
            contentType: "application/json",
            data:JSON.stringify(param),
            success : function(data){
                $.ajax({
                    type : "get",
                    url : data.newResourceLocation,
                    success : function(data){
                        var tabUl = "";
                        var tabContent = "";
                        var tabItem = ""
                        var serial = 0;
                        var startNum = 0;
                        var endNum = 0;
                        for(var i=0;i<geojson.length;i++){
                            var points = geojson[i].points
                            serial = i+ 1;
                            tabUl = tabUl + '<li class="layui-this">地块'+ serial + '</li>';
                            //option.ul.append('<li>地块'+ serial +'</li>')
                            //option.item.append('<div class="wdd-tab-item"><div class="table-xy dt'+ serial +'"></div></div>')
                            tabItem = tabItem + '<div class="wdd-tab-item"><div class="table-xy dt'+ serial +'"></div></div>'
                           
                            endNum = endNum + points.length;
                            op = this.setTableData(elLeft,elLeftBox,tabEl,data)
                        }
                        // var _tabRg = new Tabs({
                        //     el: option.el.find('.middleRg'),
                        //     defaultIndex: 0
                        // })
                        // _tabRg.changeControl((index) => {
                        //     console.log(index)
                        //     var index1 = index + 1
                        //     option.el.find('.middleRg').find('.dt' + index1 + '').html(op.tabContent)
                        // })
                        option.op = op
                    }
                });
            },
            error:function(){
    
            }
        });
        
        return option
}
Coordinate.prototype.setTableData = function(elLeft,elLeftBox,tabEl,data) {
    elLeft.empty()
    var tabContent = ""
    var pointsList = data.coordinates
    this.ArrayVertex = []
    var coordinateTransformArr = []
    var fileList = []
    var serial = 0;
    var bool = false
    var i = 0
    for (var i = 0; i < pointsList.length; i++) {
        serial = i + 1;
        var points = pointsList[i]
        elLeft.append('<li>地块' + serial + '</li>')
        // this.html.find('#middleItem').append('<div class="wdd-tab-item" sign="exportTxt"><div class="table-xy dt' + serial + '"></div></div>')
        for (let j = 0; j < points.length; j++) {
            fileList.push({
                id: j,
                x: points[j][0],
                y: points[j][1]
            })
        }
        if (i == 0) {
            tabContent = tabContent + '<div class="layui-tab-item code-table-coor dt' + serial + '">'
                + '<table class="bottom layui-table" lay-size="sm">'
                + '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead><tbody>'
        } else {
            tabContent = tabContent + '<div class="layui-tab-item code-table-coor dt' + serial + '">'
                + '<table class="bottom layui-table" lay-size="sm">'
                + '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead><tbody>'
        }
        var z = 0;
        var secondArr = [];
        if(bool) {
            for (var j = 0; j < endNum; j++) {
                z = z + 1;
                var point = data[j].center;
                secondArr.push({bigX:point.x,bigY:point.y});
                tabContent = tabContent + '<tr><td>' + z + '</td><td sign="XY">' + point.x + '</td><td sign="XY">' + point.y + '</td></tr>';
            }
            coordinateTransformArr.push(secondArr)
            tabContent = tabContent + '</tbody></table></div>';
        } else {
            for (var j = 0; j < points.length; j++) {
                z = z + 1;
                var point = points[j];
                coordinateTransformArr.push({x:point[0],y:point[1]});
                tabContent = tabContent + '<tr><td>' + z + '</td><td sign="XY">' + point[0] + '</td><td sign="XY">' + point[1] + '</td></tr>';
            }
            tabContent = tabContent + '</tbody></table></div>';
        }

    }
    
    elLeftBox.html(tabContent)
    this.coordinateTransformArr = coordinateTransformArr
    var _tabItem = new Tabs({
        el: tabEl,
        defaultIndex: 0
    })
}
export default Coordinate