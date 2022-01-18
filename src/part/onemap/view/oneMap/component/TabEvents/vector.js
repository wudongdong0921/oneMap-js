////////////////////////////////////////////////
// 矢量文件
// 吴东东
// 2020-11-05 11:30:53
////////////////////////////////////////////////
import _api from "./../../apis/map"
var Vector = function() {
    var tab = ""
    tab += '<div class="wdd-tab-wrapper wdd-file-wrapper">';
    // tab += '  <div class="exportVectorFileTit" style="margin-top:0; padding-top:3%;">投影系统设置：</div>';
    // tab += '             <div class="select_GSC">'
    // tab += '                 <div style="margin:2%;">'
    // tab += '                     <select class="shaw_select" id="GscSelect">'
    // tab += '                        <option value ="41">GSC_高斯投影_123_41500000</option>'
    // tab += '                        <option value ="42">GSC_高斯投影_126_42500000</option>'
    // tab += '                     </select>'
    // tab += '                 </div>'
    // tab += '             </div>'
    tab += '  <div class="exportVectorFileTit" style="margin-top:0; padding-top:3%;">导出文件类型设置：</div>';
    tab += '             <div class="select_GSC">'
    tab += '                 <div style="margin:2%;">'
    tab += '                     <select class="shaw_select" id="fileType">'
    tab += '                        <option value ="SHPFORMAT">ArcView Shape文件</option>'
    // tab += '                        <option value ="DWGFORMAT">AutoCAD Drawing 文件</option>'
    tab += '                        <option value ="GEOFORMAT">GeoJson</option>'
    tab += '                     </select>'
    tab += '                 </div>'
    tab += '             </div>'
    tab += ' <div class="layout_foot_button">';
    tab += '     <button class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="exportTxt">导出</button>';
    // tab += '     <button class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="exportTxtClose">取消</button>';
    tab += ' </div>';
    tab += ' </div>'
    this.html = $(tab)
    this.exportData = null
    this.event = {
        handleCloseVector: function() {}
    }
    this.html.find('#exportTxtClose').click(() => {
        this.event.handleCloseVector()
    })
    this.html.find('#exportTxt').click(() => {
        console.log(this.exportData)
        // var ArrayVertex= this.exportData.geometry.coordinates
        // var array = []
        //             for (let i = 0; i <ArrayVertex.length; i++) {
        //                 for (let j = 0; j < ArrayVertex[i].length; j++) {
        //                     array.push({
        //                         bigX: ArrayVertex[i][j][0],
        //                         bigY: ArrayVertex[i][j][1]
        //                     })
        //                 }
        //             }
        //             var single = {
        //                 type: 'Region',
        //                 parts: [],
        //                 points: array
        //             }
        //             var geometry = []
        //             geometry.push(single);
        //             var param = {
        //                 geometry: geometry,
        //                 dsName: null,
        //                 dtName: null,
        //                 qhdm: '230200',
        //                 returnMode: this.html.find('#fileType').val()
        //             };
        //             _api.exportFormData(param,(res) => {
        //                 var returnUrl = res.data
        //                 window.open(config.InterfaceAddress.AnalysisServiceTest + returnUrl);
        //          })
        var obj = []
        if(this.exportData.length) {
            //导入
            obj = this.exportData
        }else {
            for(let i =0;i<this.exportData.geometry.coordinates[0].length;i++) {
                var item = this.exportData.geometry.coordinates[0][i]
                obj.push(JSON.stringify(item))
            }
            //obj = //[JSON.stringify(this.exportData.geometry)]
        }
        console.log(this.exportData)
        if(this.exportData.geometry && this.exportData.geometry.type === 'Polygon') {
            obj = [JSON.stringify(this.exportData.geometry)]
        }
        var param = {
            geometrys: obj,
            // dsName: null,
            // dtName: null,
            // qhdm: '230200',
            returnMode: this.html.find('#fileType').val()
            //number: 41
        };
        _api.ExportFileOut(param,(res) => {
            var returnUrl = res.data
            window.open(config.InterfaceAddress.AnalysisServiceTest + returnUrl);
        })
    })
}
Vector.prototype.getMapFormData = function(obj,data) {
    this.exportData = obj
}
Vector.prototype.handleCloseVectorEvent = function(event) {
    this.event.handleCloseVector = event
}
export default Vector