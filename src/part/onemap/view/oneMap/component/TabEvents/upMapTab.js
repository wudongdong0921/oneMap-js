import Tabs from './../Tab/tab'
import UploadFile from "./../UploadFile/uploadFile"
import UploadFileMultiple from "./../UploadFile/uploadFileMultiple"
import api from "./../../apis/map"
var FileProgress = function (item, i, parent) {
    this.parent = parent
    this.index = i
    this.lastModified = item.lastModified
    this.fileName = item.fileName
    this.files = $('<tr id="upload-' + i + '"></tr>')
    this.name = $('<td>' + item.fileName + '</td>').appendTo(this.files)
    this.size = $('<td>' + (item.fileSize / 1014).toFixed(2) + 'KB</td>').appendTo(this.files)
    this.wait = $('<td class="td-status">等待上传</td>').appendTo(this.files)
    this.tdButton = $('<td></td>').appendTo(this.files)
    this.refre = $('<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>').appendTo(this.tdButton)
    this.del = $('<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>').appendTo(this.tdButton)
    this.del.click(() => {
        this.parent.deleteFileList(this)
    })
}
var UpMapTab = function () {
    var tab = ""
    tab += '<div class="wdd-tab-wrapper wdd-file-wrapper">';
    tab += '<div class="wdd-tab-file tabId">';
    tab += '  <ul class="wdd-tab-ul">';
    // tab += '      <li>坐标文件</li>';
    tab += '      <li>图形文件</li>';
    tab += '  </ul>';
    tab += '  <div class="wdd-tab-box">';
    // tab += '      <div class="wdd-tab-item">';
    // tab += '        <div class="top clearfix">'
    // tab += '             <div>投影系统设置</div>'
    // tab += '             <div class="select_GSC">'
    // tab += '                 <div style="margin:2%;">'
    // tab += '                     <select class="shaw_select">'
    // tab += '                        <option value ="41">GSC_高斯投影_123_41500000</option>'
    // tab += '                        <option value ="42">GSC_高斯投影_126_42500000</option>'
    // tab += '                     </select>'
    // tab += '                 </div>'
    // tab += '                 <div class="change_CSC">'
    // tab += '                    <div id="changeXY"><div class="OneMap_ToolIcon transition"></div></div>'
    // tab += '                 </div>'
    // tab += '             </div>'
    // tab += '         </div>';
    // tab += '         <div class="middle" style="">';
    // tab += '             <div class="tabId">';
    // tab += '                 <ul class="wdd-tab-ul" id="middleUl">';
    // tab += '                 </ul>';
    // tab += '                 <div class="wdd-tab-box" id="middleItem">';
    // tab += '                 </div>';
    // tab += '             </div>';
    // tab += '         </div>';
    // tab += '         <div class="layout_foot_button">'
    // tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" id="upload" style="width:80px; margin-top:-10px;">导入面</button><input class="layui-upload-file" type="file" accept="" name="file">'
    // tab += '             <button class="wdd-btn wdd-btn-primary wdd-btn-sm " style="width:80px; margin-top:-10px;" id="previewButton">预览</button>'
    // tab += '             <button class="wdd-btn wdd-btn-primary wdd-btn-sm " style="width:80px; margin-top:-10px;" id="uploadButton">上图</button>'
    // tab += '             <button class="wdd-btn wdd-btn-primary wdd-btn-sm " style="width:80px; margin-top:-10px;" id="uploadButtonClose">上图并关闭</button>'
    // tab += '         </div>';
    // tab += '      </div>';
    tab += '      <div class="wdd-tab-item">';

    tab += '         <div class="" id="fileTable" style="height:230px;overflow-x: auto;">';
    tab += '             <table class="layui-table">';
    tab += '                 <thead>';
    tab += '                     <tr>';
    tab += '                         <th>文件名</th>';
    tab += '                         <th>大小</th>';
    tab += '                         <th>状态</th>';
    tab += '                         <th>操作</th>';
    tab += '                     </tr>';
    tab += '                 </thead>';
    tab += '                    <tbody id="fileList"></tbody>';
    tab += '             </table>';
    tab += '           </div>';
    tab += '         <div class="layout_foot_button">';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="graphicalImport">导入</button><input class="layui-upload-file" type="file" accept="" name="file" multiple="">';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="graphicalPreview">预览</button>';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="graphicalImportAction">上图</button>';
    tab += '             <button type="button" class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="graphicalImportActionClose">上图并关闭</button>';
    tab += '         </div>';
    tab += '      </div>';
    tab += '  </div>'
    tab += ' </div>'
    tab += ' </div>'
    this.html = $(tab)
    this.index = 1
    this.fileList = null
    this.objPara = null
    this.analyseisPara = []
    this.businessPara = []
    this.analyseisSplit = []
    this.epsgCode = null,
    this.createBusinessMap = []
    this.itemList = []
    this.moreGeomertry = []
    this.checkMultiPolygon = false
    this.checkTxt = false
    this.txtFlag = false
    this.event = {
        CreateMapRaseter: function () {},
        OutUploadMapList: function () {},
        businessUpMap: function () {},
        businessUpMapClose: function () {}
    }
    
    this.geoJson = ""
    var _tabs = new Tabs({
        el: this.html,
        defaultIndex: 0
    })
    this.exportCheck = function(data,checkMultiPolygon) {
        var checkTxt = false
        for(let i =0;i<data.length;i++) {
            var item = data[i]
            var str = item.fileName.split(".");
            str = str[str.length-1]
            if(".txt".indexOf(str) > -1){
                checkTxt = true
            }
        }
        var flag = checkTxt && checkMultiPolygon ? true : false
        return flag
    }
    var _UploadFile = new UploadFile()
    var _UploadFileMultiple = new UploadFileMultiple()
    _UploadFile.HandleSetCoordinate((data, file) => {
        this.geoJson = data
        this.file = file
        this.index == 1 && this.setTableData(data)
    })
    _UploadFileMultiple.HandleSetCoordinate((data, file) => {
        this.geoJson = data
        this.analyseisPara = this.analyseisPara.concat(data)
        this.checkEpsgCodeError(data)
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            var _FileProgress = new FileProgress(data[i], i, this)
            this.itemList.push(_FileProgress)
            this.html.find('#fileList').append(_FileProgress.files);
        }
        
        this.choseAnalyseisSplit(data, file)
    }, (files) => {
        var fileList = files
    })
    //坐标文件导入
    this.html.find('#upload').click(() => {
        _UploadFile.uploadFile()
    })
    // this.html.find('#previewButton').click(() => {
    //     this.event.CreateMapRaseter({
    //         type: 'Feature',
    //         geometry: this.geoJson
    //     })
    // })
    //上图
    this.html.find('#uploadButton').click(() => {
        var file = this.file[0]
        var formData = new FormData()
        formData.append('file', file)
        api.getUpMap(formData, (res) => {
            console.log(res)
        })
    })
    _tabs.changeControl((index) => {
        this.index = index + 1
    })
    this.html.find('#changeXY').click(() => {
        this.xyChange(this.html, this.index)
    })
    //图形导入
    this.html.find('#graphicalImport').click(() => {
        _UploadFileMultiple.uploadFile()
    })
    //
    this.html.find('#graphicalPreview').click(() => {
        //通过行政区权限的geojson和导入的多图形进行交集判断
        this.previewMap(true)
        this.txtFlag = true

    })
    //上图
    this.html.find('#graphicalImportAction').click(() => {
        this.previewMap(false,() => {
            this.event.businessUpMap(this.analyseisPara,(type) => {
                //this.analyseisPara = []
                type && this.choseAnalyseisSplit(this.analyseisPara,this.itemList,type)
            })  
        })
        
    })
    //上图并关闭
    this.html.find('#graphicalImportActionClose').click(() => {
        this.previewMap(false,() => {
            this.event.businessUpMap(this.analyseisPara,(type) => {
                this.analyseisPara = []
                this.event.businessUpMapClose()
                type && this.choseAnalyseisSplit(this.analyseisPara,this.itemList,type)
            })
        })
        
    })
}
UpMapTab.prototype.checkEpsgCodeError = function(item) {
    const result = this.checkEpsgCode(item)
    if(!result) {
        layer.open({
            title: '警告',
            content: '多文件数据坐标系不一致！'
        });
        this.deleteEpsgCode()
        return false
    }
}
UpMapTab.prototype.deleteEpsgCode = function() {
    for(let i=0;i<this.itemList.length;i++) {
        const item = this.itemList[i]
        this.deleteFileList(item)
    }
}
UpMapTab.prototype.checkEpsgCode = function(item) {
    for(let i=0;i<this.analyseisPara.length;i++) {
        const _item = this.analyseisPara[i]
        if(item[0].epsgCode !== _item.epsgCode){
            return false
        }
    }
    return item
}
UpMapTab.prototype.choseAnalyseisSplit = function(data, file,type) {
    var checkMultiPolygon = false
    //this.fileData= data
        //this.analyseisPara = result.data
        //this.analyseisPara = this.analyseisPara.concat(data)
        for (let i = 0; i < data.length; i++) {
            var arrBusiness= []
                var item = data[i].geometrys
                this.epsgCode = data[i].epsgCode
                for (let h = 0; h < item.length; h++) {
                    var list = JSON.parse(item[h])
                    var listArr = []
                    if (list.type === "MultiPolygon") {
                        checkMultiPolygon = true
                        // for(let k =list.coordinates.length-1;k>=0;k--) {
                        //     listArr = listArr.concat(list.coordinates[k])
                        // }
                        for (let k = 0; k < list.coordinates.length; k++) {
                            listArr = listArr.concat(list.coordinates[k])
                        }
                        this.moreGeomertry.push({
                            type: 'Feature',
                            geometry: {
                                coordinates: [listArr],
                                type: 'MultiPolygon'
                            }
                        })
                        arrBusiness.push({
                            type: 'Feature',
                            geometry: {
                                coordinates: [listArr],
                                type: 'MultiPolygon'
                            }
                        })
                    } else {
                        this.moreGeomertry.push({
                            type: 'Feature',
                            geometry: JSON.parse(item[h])
                        })
                        arrBusiness.push({
                            type: 'Feature',
                            geometry: JSON.parse(item[h])
                        })
                    }
                }
            this.createBusinessMap.push({
                type: 'FeatureCollection',
                features: arrBusiness,
                fileName:  data[i].fileName
            })
            this.businessPara = this.businessPara.concat(item)

            this.analyseisSplit.push(item)
        }
        this.txtFlag = true//this.exportCheck(this.analyseisPara,checkMultiPolygon)
        this.objPara = {
            type: "FeatureCollection",
            features: this.moreGeomertry
        }
        this.file = file
        this.index == 1 && this.setTableData(data)
        $('#fileList').find("tr").each(function (index, e) {
            $(this).find('.td-status').html('<span style="color: #5FB878;">上传成功</span>')
            type && $(this).find('.demo-delete').remove()
            for (var x in this.file) {
                delete this.file[x];
            }
        })
}
UpMapTab.prototype.handleDeleteBusinessAll = function(event) {
    this.event.handleDeleteBusinessAllEvent = event
}
UpMapTab.prototype.previewMap = function (flag,callback) {
    this.event.handleDeleteBusinessAllEvent()
    var obj = {
        xzqhGeometrys: this.administrativeGeojson.type ? [JSON.stringify(this.administrativeGeojson.data)] : null,
        drawGeometrys: this.businessPara
    }
    var type
    api.ckeckJson(obj, (res) => {
        if (res.data) {
            flag && this.event.CreateMapRaseter(this.createBusinessMap, this.analyseisSplit,this.handleUploadList(this.analyseisSplit),this.epsgCode)
            this.event.OutUploadMapList(this.handleUploadList(this.analyseisSplit),this.txtFlag,true,this.epsgCode)
            type = true
        } else {
            _Msg.openMsg('上传图形不在地图范围权限')
            type = false
        }
        type && callback && callback()
    })
}
UpMapTab.prototype.handleBusinessUpMapClose = function (event) {
    this.event.businessUpMapClose = event
}
UpMapTab.prototype.handleBusinessUpMap = function (event) {
    this.event.businessUpMap = event
}
UpMapTab.prototype.handleUploadList = function (data) {
    var arr = []
    for (let i = 0; i < this.analyseisSplit.length; i++) {
        for (let j = 0; j < this.analyseisSplit[i].length; j++) {
            arr.push(this.analyseisSplit[i][j])
        }
    }
    return arr
}
UpMapTab.prototype.deleteFileList = function (item) {
    this.createBusinessMap =  []
    this.analyseisSplit = []
    // this.analyseisPara = []
    this.businessPara = []
    item.files.remove()       
    for (let i = 0; i < this.analyseisPara.length; i++) {
        var fileEle = this.analyseisPara[i]
        
        if ((fileEle.lastModified === item.lastModified) && (fileEle.fileName === item.fileName)) {
            //delete this.file[item.index]
            this.itemList.splice(i, 1)
            this.analyseisPara.splice(i,1)
            //this.fileData.splice(i,1)
        }
    }
    this.choseAnalyseisSplit(this.analyseisPara,this.itemList)
    //this.previewMap(false)
    
}
UpMapTab.prototype.xyChange = function (el, indexs) {
    el.find('.dt' + indexs + '').find("table").find("tbody").find("tr").each(function () {
        var value1 = $(this).find("td").eq(1).html();
        var value2 = $(this).find("td").eq(2).html();
        $(this).find("td").eq(1).html(value2);
        $(this).find("td").eq(2).html(value1);
    });
}

UpMapTab.prototype.handleCreateMapRaseter = function (event) {
    this.event.CreateMapRaseter = event
}
UpMapTab.prototype.getUploadMapList = function (event) {
    this.event.OutUploadMapList = event
}
UpMapTab.prototype.setTableData = function (data) {
    this.html.find('#middleUl').empty()
    var tabContent = ""
    // var pointsList = data.coordinates
    var pointsList = data
    this.ArrayVertex = []
    var coordinateTransformArr = []
    var fileList = []
    var serial = 0;
    var bool = false
    var i = 0
    for (var i = 0; i < pointsList.length; i++) {
        serial = i + 1;
        var points = pointsList[i]
        this.html.find('#middleUl').append('<li>地块' + serial + '</li>')
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
                '<table class="bottom layui-table" lay-size="sm">' +
                '<thead><tr><th width="20%">序号</th><th>X</th><th>Y</th></tr></thead><tbody>'
        } else {
            tabContent = tabContent + '<div class="layui-tab-item code-table dt' + serial + '">' +
                '<table class="bottom layui-table" lay-size="sm">' +
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
            tabContent = tabContent + '</tbody></table></div>';
        } else {
            if (pointsList.length > 1) {
                for (var j = 0; j < points.length; j++) {

                    var point = points[j];
                    for (let i = 0; i < point.length; i++) {
                        z = z + 1;
                        var pointItem = point[i]
                        coordinateTransformArr.push({
                            x: pointItem[0],
                            y: pointItem[1]
                        });
                        tabContent = tabContent + '<tr><td>' + z + '</td><td sign="XY">' + pointItem[0] + '</td><td sign="XY">' + pointItem[1] + '</td></tr>';
                    }

                }
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

            }
            tabContent = tabContent + '</tbody></table></div>';


        }

    }

    this.html.find('#middleItem').html(tabContent)
    // var _tabItem = new Tabs({
    //     el: this.html.find('.middle'),
    //     defaultIndex: 0
    // })
    // _tabItem.changeControl((index) => {
    //     console.log(index)
    //     this.index= index + 1
    // })
}
UpMapTab.prototype.getAdministrativeGeojson = function (data) {
    this.administrativeGeojson = data
}
UpMapTab.prototype.clearFileLists = function (id) {
    this.html.find('#fileList').empty()
    this.itemList = []
    this.businessPara = []
    this.analyseisPara = []
    this.createBusinessMap = []
    this.analyseisSplit = []
}
UpMapTab.prototype.setPermissions = function(type) {
    if(type) {
        this.html.find('#graphicalImportAction').show()
        this.html.find('#graphicalImportActionClose').show()
    } else{
        this.html.find('#graphicalImportAction').hide()
        this.html.find('#graphicalImportActionClose').hide() 
    }
}
UpMapTab.prototype.moreCoordiantes = function (coordinateTransformArr, points, z, tabContent) {


}
export default UpMapTab