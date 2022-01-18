////////////////////////////////////////////////
// 合规性分析
// 吴东东
// 2021-02-18 09:18:44
////////////////////////////////////////////////
import Suitabillity from "./suitabillity"
import api from './.././../../../../api/planning/doubleEvaluation'
var SuitabillityMainItem = function() {}
var SuitabillityMain = function (_Map, _MapSymbol, analyses,view) {
    var _this = this;
    this._Map = _Map.map
    this._MapSymbol = _MapSymbol
    this.analyses = analyses
    this.event = {
        resultStatic:function(){}
    };
    this._html = $('<div>' +
        '<div class="suitabillityMain" id="suitabillityMain">' +
        '    <div class="layui-container">' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>1</span>项目土地用途' +
        '        </div>' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <div class="mag-l-20 formSelect" id="formSelect" style="width: 190px;"></div>' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>2</span>项目名称' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <input spellcheck="false" id="progectName" autocomplete="off" type="text" class="form-control" placeholder="项目名称" style="width: 190px;margin: 20px 40PX;" maxlength="20">' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>3</span>分析内容' +
        '        </div>' +
        '        </div>' +
        '        <div class="layui-row mag-l-20" id="selectChecklist" style="width: 170px;"></div>' +
        '        <div class="layui-row" style="margin-top: 178px;margin-left: 35px;">' +
        '            <div class="layui-col-md2" id="resultStatic" style="width: 113px;"></div>' +
        '            <div class="layui-col-md1" id="resetBtn"></div>' +
        '        </div>' +
        '        <div class="layui-row" style="margin-left: 35px;">' +
        '            <div class="layui-col-md2" id="downBtn" style="display:none;"></div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>');
        this.resultStaticBtn = $(' <div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i> 开始分析</div>').appendTo(this._html.find('#resultStatic'));
        this.rsetBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i> 重置</div>').appendTo(this._html.find('#resetBtn'));
        this.rsetBtn.unbind().bind('click',()=>{
            this.getCheckList()
            this.getPurposeSelect()
            this._html.find('#progectName').val("")
            _SuitabillityMainItem._Analyse.hide()
            // view.goto('/planning/double_assess/risk')
            // view.goto('/planning/plan_implementation/analyse')
        })
        this.downBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="width: 189px;"><i class="buttonIcon exchange" style="left: 43px;position: absolute;"></i> 下载报告</div>').appendTo(this._html.find('#downBtn'));
        // this.select = new icu.formElement.select({
        //     data: [
        //         { label: '商业服务业用地', value: '商业服务业用地' },
        //         { label: '工矿用地', value: '工矿用地' },
        //         { label: '住宅用地', value: '住宅用地' },
        //         { label: '公共管理与公共服务用地', value: '公共管理与公共服务用地' },
        //         { label: '特殊用地', value: '特殊用地' },
        //         { label: '交通运输用地', value: '交通运输用地' },
        //         { label: '水域与水利设施用地', value: '水域与水利设施用地' }
        //     ],
        //     default: '商业服务业用地'
        // });
        SuitabillityMainItem.prototype = _Map._AnalyCommon
        var _SuitabillityMainItem = new SuitabillityMainItem()
        // this._html.find('#formSelect').append(this.select.html);

        this.getCheckList()
        this.getPurposeSelect()
        //开始分析按钮
        this.resultStaticBtn.unbind().bind('click',function(){
            _this.event.resultStatic()
            var idList = []
            _this.checkList.get((emsg,value)=>{
                idList =value
            })
            var obj = {
                data: {
                    analyzeBusinessId:idList
                },
                type: "3"
            }
            obj.api = 'api'
            _SuitabillityMainItem.handleClickAnalyse(obj,_this)
            //_this.downBtn.css("display","block");
        })
        //点击下载报告
        this.downBtn.click(() => {
            this.select.get((emsg,value)=>{
                this.xmytId = value
            })
            var obj = {
                rwId: _SuitabillityMainItem.rwid ? (_SuitabillityMainItem.rwid).join(',') : "",
                projectName: this._html.find('#progectName').val(),
                xmytId: this.xmytId,
                unitCode: _SuitabillityMainItem._Analyse.unitSelect
            }
            api.getDownReport(obj,(res) => {
                var date = new Date($.ajax({async:false}).getResponseHeader("Date"));
                var y = date.getFullYear()
                var m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                var d = date.getDate()
                d = d < 10 ? ('0' + d) : d

                var a = document.createElement("a"); // 转换完成，创建一个a标签用于下载
                    a.download = _this._html.find('#progectName').val() + '项目合规性分析报告-' + y +"年-" + m + "月-" + d + "日" + ".pdf"; // xxxxx项目合规性分析报告-xxxx年-xx月-xx日.pdf
                    a.href = res.data;
                    a.target="_blank";
                    $("body").append(a); // 修复firefox中无法触发click
                    a.click();
                    $(a).remove();
            })
        })
}
SuitabillityMain.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};
SuitabillityMain.prototype.render = function () {
    return this._html;
}

//
SuitabillityMain.prototype.pushCheckList = function(data) {
    var arr = []
    for(let i = 0;i<data.length;i++){
        var item = data[i]
        arr.push({
            label: item.specialName,
            value: item.ztId
        })
    }
    return arr
}
SuitabillityMain.prototype.pushPurposeSelect = function(data) {
    var arr = []
    for(let i = 0;i<data.length;i++){
        var item = data[i]
        arr.push({
            label: item.dictLabel,
            value: item.dictValue
        })
    }
    return arr
}
SuitabillityMain.prototype.getCheckList = function() {
    api.getTreeDictionaryInfoData(res => {
        this._html.find('#selectChecklist').empty()
        this.checkList = new icu.checkList({
            checkAll: false, // 是否显示全选
            getType: 'array',
            // 进行赋值的数组
            data: this.pushCheckList(res.data)
        });
        this.checkList.set(['永久基本农田保护线', '城镇开发边界', '国土空间规划分区', '国土空间规划分类'])
        this.checkList.readonly(['永久基本农田保护线', '生态保护红线','城镇开发边界', '国土空间规划分区', '国土空间规划分类'], 'value')
        // 渲染元素
        this._html.find('#selectChecklist').append(this.checkList.html)
    })
}
SuitabillityMain.prototype.getPurposeSelect = function() {
    api.getDataField({type: "GHYTFL"},res => {
        this._html.find('#formSelect').empty()
        var arr = this.pushPurposeSelect(res.data)
        this.select = new icu.formElement.select({
            checkAll: false, // 是否显示全选
            getType: 'array',
            // 进行赋值的数组
            data: arr,
            default: arr[0].value
        });
        // 渲染元素
        this._html.find('#formSelect').append(this.select.html);
    })
}
export default SuitabillityMain