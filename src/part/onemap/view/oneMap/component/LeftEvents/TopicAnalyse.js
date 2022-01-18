////////////////////////////////////////////////
// 分析列表
// 穆松鹤
// 2020-09-28 09:19:45
////////////////////////////////////////////////
import subMenu from '../LeftBar/subMenu'
import ToolPopup from './../ToolPopup/popup'
import AnalysisProgress from './../LeftEvents/AnalysisProgress'
import Progress from './../LeftEvents/progress'
import Year from './../year'
import YearSelect from './../yearSelect'
import api from './../../apis/map'
// const progressData = {
//     columns: [
//         {
//             title: "名称",
//             dataIndex: "analysisTaskName"
//         },
//         {
//             title: "状态",
//             dataIndex: "executingStateCN"
//         }
//     ]
// }
// var progress = new Progress()
// //wdd
// var _ToolPopup = new ToolPopup()
// var _AnalysisProgress = new AnalysisProgress(_ToolPopup)
// _ToolPopup.handleShow({
//     title: '分析控制台',
//     mask: true,
//     icon: true,
//     width: '500px',
//     left: '50%',
//     top: '50%',
//     height: '400px',
//     content: 'content',
//     //transform: 'translate(-50%,-50%)',
// })
// _ToolPopup.html.find('.layout-dialog-body').append(_AnalysisProgress.html)
// _ToolPopup.html.appendTo($('body'));
// var _ToolPopupYear = new ToolPopup()
// var date = new Date
// var yearDefault = date.getFullYear()
// var _Year = new Year(yearDefault)
// _ToolPopupYear.handleShow({
//     title: '分析条件设置',
//     mask: false,
//     width: '300px',
//     left: '50%',
//     top: '50%',
//     height: '400px',
//     content: 'content',
//     //transform: 'translate(-50%,-50%)',
// })
// _ToolPopupYear.html.find('.layout-dialog-body').append(_Year.yearHtml)
// _ToolPopupYear.html.appendTo($('body'));
// // var _YearSelect = new icu.SelectDataStatic({
// //     el: '#demoYear',
// //     type: 'year',
// //     showBottom: false,
// //     theme: '#188ae2'
// // })
var TopicAnalyseItem = function (data, parent) {
    this.parent = parent;
    this.data = data;
    this.timers = null
    this.html = $('<div class="OneMap_TopicAnalyse_Item"></div>');
    this.icon = $('<div class="OneMap_TopicAnalyse_Icon"></div>').appendTo(this.html);
    this.title = $('<div class="OneMap_TopicAnalyse_Title"></div>').text(data.name).appendTo(this.html);
    this.des = $('<div class="OneMap_TopicAnalyse_Des" title="' + data.remark + '"></div>').text(data.remark || "").appendTo(this.html);
    this.timer = null;
    this.abotr = null
    this.progressVisible = false;
    
    this.html.click(() => {
        var obj = {
            data: data
        }
        var analysisType;
        if(data.analysisType === 'DJFX') {
            analysisType = '0'
            obj.type = analysisType
            obj.api = 'api'
        } else if(data.analysisType === 'EDXZFX') {
            analysisType = '5'
            obj.type = analysisType
            obj.api = 'apiEd'
            
        } else if(data.analysisType === 'SDXZFX') {
            analysisType = '6'
            obj.type = analysisType
            obj.api = 'apiSd'
        }
        this.handleClickAnalyse(obj,this.parent)
        // var list = this.parent.getMapGeojsons ? this.parent.getMapGeojsons.geometry : []
        // var geoObj = ""
        
        // var arr = []
        // //可优化
        // if (this.parent.typeFlag === 1) {
        //     geoObj = [JSON.stringify(list.coordinates)]
        // } else if (this.parent.typeFlag === 2) {
        //     geoObj = [JSON.stringify(list)]
        // } else if (this.parent.typeFlag === 3) {
        //     for (let i = 0; i < list.coordinates.length; i++) {
        //         var item = list.coordinates[i]
        //         arr.push(JSON.stringify(item))
        //     }
        //     geoObj = arr
        // } else {
        //     geoObj = this.parent.getMapGeojsons
        // }
        // if (this.parent.getMapGeojsons) {
        //     // _ToolPopup.html.show()
        //     var param = {
        //         ywfxId: data.analyzeBusinessId,
        //         year: "",
        //         // geojson: {
        //         //     type: 'Polygon',
        //         //     coordinates: this.parent.getMapGeojsons.geometry.coordinates
        //         // }
        //         geojson: geoObj //this.parent.typeFlag === 1 ? [JSON.stringify(this.parent.getMapGeojsons.geometry.coordinates)] : [JSON.stringify(this.parent.getMapGeojsons.geometry)]
        //     }
        //     if (this.data.isTimeIndex === '0') {

        //         // var _YearSelect = new YearSelect({
        //         //     el: _Year.yearHtml.find('.wdd-year-box')
        //         // })
                
        //         _YearSelect.on('onChange',function(val) {
        //             console.log(val)
        //             _Year.yearHtml.find('input').val(val)
        //         })
        //         // _Year.yearHtml.find('input').click(function () {
        //         //     console.log(_YearSelect)
        //         //     var val = $(this).val()
        //         //     _YearSelect.render(val)
        //         // })
        //         _ToolPopupYear.html.show()
        //         // _YearSelect.getYear((val) => {
        //         //     _Year.yearHtml.find('input').val(val)
        //         // })
        //         _Year.handleSubmit(() => {
        //             var val = _Year.yearHtml.find('input').val()
        //             param.year = val
        //             this.year = val
        //             this.abotr = api.createMapStatus(param, (res) => {
        //                 var result = res.data
        //                 param.rwbmIds = result
        //                 this.abotr = api.executeTaskJava(null,(res) => {
        //                     _ToolPopupYear.html.hide()
        //                     _ToolPopup.html.show()
        //                     _AnalysisProgress.openTiming()
        //                     this.LookAnalyse(result)
        //                 })
        //                 _AnalysisProgress.handleStopStatus(() => {
        //                     this.stopStatus(res.data)
        //                 })
        //             })
                    
        //         })
        //         _Year.handleClose(() => {
        //             _ToolPopupYear.html.hide()
        //         }) 
        //     } else {
        //         param.year = ""
        //         this.year = ""
        //         this.abotr = api.createMapStatus(param, (res) => {
        //             var result = res.data
        //             param.rwbmIds = result
        //                 this.abotr = api.executeTaskJava(null,(res) => {
        //                     _ToolPopup.html.show()
        //                     _AnalysisProgress.openTiming()
        //                     this.LookAnalyse(result)
        //                 })
                    
        //             _AnalysisProgress.handleStopStatus(() => {
        //                 this.stopStatus(res.data)
        //             })
        //         })
                
        //     }
        // } else {
        //     layer.msg('无数据,请绘制图形')
        // }
    });
    
};
TopicAnalyseItem.prototype.handleClickAnalyse = function(){
   
}
//强行终止
TopicAnalyseItem.prototype.stopStatus = function(data) {
   
}
TopicAnalyseItem.prototype.LookAnalyse = function (arrIdList) {
    
}
var TopicAnalyse = function (_Map, _MapSymbol, _Analyse) {
    this._Map = _Map
    this._Analyse = _Analyse;
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.subMenu = new subMenu();
    this.html.append(this.subMenu.html);
    this.Content = $('<div class="OneMap_TopicAnalyse_content"></div>').appendTo(this.html);
    this.children = [];
};

TopicAnalyse.prototype.render = function () {
    return this.html
};

TopicAnalyse.prototype.addChild = function (menuData,_AnalyCommon) {
    this.subMenu.setChildren(menuData);
    this.subMenu.onClick((data) => {
        this.children = [];
        this.Content.empty();
        for (let i = 0; i < data.children.length; i++) {
            const element = data.children[i];
            TopicAnalyseItem.prototype = _AnalyCommon
            var _item = new TopicAnalyseItem(element, this);
            
            this.Content.append(_item.html);
            this.children.push(_item);
        };
    });
};
TopicAnalyse.prototype.getMapGeojson = function () {
    
}

export default TopicAnalyse;