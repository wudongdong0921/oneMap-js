////////////////////////////////////////////////
// 分析评价-风险识别
// 吴东东
// 2021-02-18 09:13:44
////////////////////////////////////////////////
import Suitabillity from "./suitabillity"
import api from './.././../../../../api/planning/doubleEvaluation'
import Select from '../../../component/select'
import Ztree from '../../../component/zTree'
var SuitabillityMainItem = function () { }
var SuitabillityMain = function (_Map, _MapSymbol, analyses, parent) {
    var _this = this;
    this.view = parent
    this._Map = _Map.map
    this._MapSymbol = _MapSymbol
    this.analyses = analyses
    icu.session.set('typeMap', 'oneMap')
    this._select = new Select();
    this.TreeView = new Ztree();
    this.event = {
        resultStatic: function () { }
    };
    // 2021-05-08 陈薪名 修改bug HNXGTKJ-1242
    this._html = $('<div>' +
        '<div class="suitabillityMain" id="suitabillityMain">' +
        '    <div style="padding: 20px 20px 0px 1px;" id="selectContent"></div>' +
        '    <div class="layui-container">' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>1</span>分析类型' +
        '        </div>' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <div class="mag-l-20 formSelect" id="formSelect"></div>' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>2</span>数据图层' +
        '        </div>' +
        '        </div>' +
        '        <div class="layui-row">' +
        '           <div style="width: 230px;">' +
        '              <ul id="layerItem" class="mag-l-20">' +
        '              </ul>' +
        '           </div>' +
        '        </div>' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>3</span>分析内容' +
        '        </div>' +
        '        </div>' +
        '        <div class="layui-row mag-l-20" id="selectChecklist" style="width: 190px;"></div>' +
        '        <div class="layui-row">' +
        '            <div class="layui-col-md3 mainTitle">' +
        '                <span>4</span>分析描述' +
        '        </div>' +
        '        </div>' +
        '        <div id="riskDesc" class="layui-row mag-l-20" style="width: 180px;">' +

        '    </div>' +
        '        <div class="layui-row" style="margin-top: 110px;">' +
        '            <div class="layui-col-md2" id="resultStatic"></div>' +
        '            <div class="layui-col-md1" id="resetBtn"></div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>');
    this.resultStaticBtn = $(' <div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i> 开始分析</div>').appendTo(this._html.find('#resultStatic'));
    this.rsetBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i> 重置</div>').appendTo(this._html.find('#resetBtn'));
    this.rsetBtn.unbind().bind('click', () => {
        this.view.goto('/planning/plan_implementation/analyse')
        this.view.goto('/planning/double_assess/risk')
    })
    // this.select = new icu.formElement.select({
    //     data: [
    //         { "label": "生态保护风险分析", "value": "生态保护风险分析" },
    //         { "label": "耕地风险分析", "value": "耕地风险分析" },
    //         { "label": "城镇用地风险分析", "value": "城镇用地风险分析" },
    //         { "label": "农村居住点风险分析", "value": "农村居住点风险分析" },
    //     ],
    //     default: '生态保护风险分析'
    // });
    // this._html.find('#formSelect').append(this.select.html);
    SuitabillityMainItem.prototype = _Map._AnalyCommon
    var _SuitabillityMainItem = new SuitabillityMainItem()

    this._select.on('rightAdministrativeDivision', function (type, value) {

        _Map.map.handlePermisMapFull(value.rightAdministrativeDivision)
        _this.xzqhCode = value.rightAdministrativeDivision
    })
    this._html.find('#selectContent').append(this._select._form.$html)


    this.getRiskSelect(function () {
        _this.select.onChange((value) => {
            if(_this.removeArtlist){
                for (let index = 0; index < _this.removeArtlist.length; index++) {
                    const element = _this.removeArtlist[index];
                    _this._Map.removeMapSource(element)
                }
            }
            _this.getOrderDetail(value)
        })
    })


    this.resultStaticBtn.unbind().bind('click', function () {
        _this.event.resultStatic()
        var idList = []
        _this.select.get((emsg, value) => {
            idList = value
        })
        var obj = {
            data: {
                analyzeBusinessId: idList
            },
            type: "2",
            xzqh: _this.xzqhCode
        }
        obj.api = 'api'
        _SuitabillityMainItem.handleClickAnalyse(obj, _this)
    })
}
SuitabillityMain.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};
SuitabillityMain.prototype.render = function () {
    var _this = this;
    return this._html;
}
SuitabillityMain.prototype.initializationData = function (params, cb) {
    var _this = this;
    this.view.$api.getTreeData({}, function (resData) {
        var jsonDataTree = transData(resData.data, 'id', 'pid', 'children')
        cb(jsonDataTree)
    })
}
SuitabillityMain.prototype.getRiskSelectNew = function (data, obj) {
    var arr = []
    var arrValue = []
    for (let i = 0; i < data.length; i++) {
        var item = data[i]
        arr.push({
            label: item[obj.key] ? item[obj.key] : item,
            value: item[obj.value] ? item[obj.value] : item
        })
        arrValue.push(item[obj.value] ? item[obj.value] : item)
    }
    return {
        arr: arr,
        arrValue: arrValue
    }
}
SuitabillityMain.prototype.getOrderDetail = function (id) {
    api.getRiskOederData(id, (res) => {
        this.setRiskCheck(this.getRiskSelectNew(res.data.analysisContentList, {}).arr, this.getRiskSelectNew(res.data.analysisContentList, {}).arrValue)
        this.setRiskLayer(this.getRiskSelectNew(res.data.dataLayerList, {}), res)
        this.setRiskDesc(res.data.analysisDescription)
    })
}
SuitabillityMain.prototype.setRiskCheck = function (data, value) {
    this._html.find('#selectChecklist').empty()
    this.checkList = new icu.checkList({
        checkAll: false, // 是否显示全选
        getType: 'array',
        // 进行赋值的数组
        data: data,
    });
    this.checkList.set(value)
    this.checkList.readonly(value, 'value')
    // 渲染元素
    this._html.find('#selectChecklist').append(this.checkList.html)
}
SuitabillityMain.prototype.setRiskLayer = function (data, res) {
    var _this = this
    this.res = res;
    this.howmapData = {};
    this.removeArtlist = [];
    this._html.find('#layerItem').empty()
    console.log();
    // 2021-05-13 陈薪名 修改bug HNXGTKJ-1642
    var itemHtml = '';
    for (let i = 0; i < data.arr.length; i++) {
        itemHtml = $('<div class="layui-row" id="mylayerItem' + i + '"><div class="layui-col-xs10 ><li style="color:#666666;width: 223px;">' + data.arr[i].label + '</li></div>' +
            '<div class="layui-col-xs1 layui-col-xs-offset1"><img src="./static/img/yanjingk.png" id="yanjingImg' + i + '"></img></div></div>');

        // 默认开启眼睛图片 2021-06-01 陈薪名 修改bug HNXGTKJ-1642
        _this.showmapData = {
            mapId: _this.res.data.dataLayer.split(',')[i] == null ? '' : _this.res.data.dataLayer.split(',')[i],
            mapAddress: _this.res.data.mapDataList[i].mapAddress == null ? '' : _this.res.data.mapDataList[i].mapAddress,
            mapServerName: _this.res.data.mapDataList[i].mapServerName == null ? '' : _this.res.data.mapDataList[i].mapServerName,
            sjyName: _this.res.data.mapDataList[i].sjyName == null ? '' : _this.res.data.mapDataList[i].sjyName,
            sjbNameL: _this.res.data.mapDataList[i].sjbName == null ? '' : _this.res.data.mapDataList[i].sjbName
        }
        this.removeArtlist.push(_this.showmapData)
        _this._Map.addMapSource(_this.showmapData);

        itemHtml.on("click", function () {
            var srcImg = $("#yanjingImg" + i)[0].src;
            srcImg = srcImg.substring(srcImg.lastIndexOf('/') + 1, srcImg.length);

            for (let j = 0; j < _this.res.data.mapDataList.length; j++) {
                if (_this.res.data.mapDataList[j].mapName == data.arr[i].label) {
                    _this.showmapData = {
                        mapId: _this.res.data.dataLayer.split(',')[j] == null ? '' : _this.res.data.dataLayer.split(',')[j],
                        mapAddress: _this.res.data.mapDataList[j].mapAddress == null ? '' : _this.res.data.mapDataList[j].mapAddress,
                        mapServerName: _this.res.data.mapDataList[j].mapServerName == null ? '' : _this.res.data.mapDataList[j].mapServerName,
                        sjyName: _this.res.data.mapDataList[j].sjyName == null ? '' : _this.res.data.mapDataList[j].sjyName,
                        sjbNameL: _this.res.data.mapDataList[j].sjbName == null ? '' : _this.res.data.mapDataList[j].sjbName
                    }
                    break;
                }
            }
            // var sql = "";
            // sql = "SMID = " + row.data.SMID ;
            // var param = new SuperMap.GetFeaturesBySQLParameters({
            //     queryParameter: {
            //         name: resTable.iserverQueryPram.sjbEnglishName +"@"+resTable.iserverQueryPram.iserverDataName,
            //         attributeFilter: sql
            //     },
            //     fromIndex: '0', // 开始查询位置
            //     toIndex: '1000', // 结束查询位置
            //     datasetNames: [resTable.iserverQueryPram.iserverDataName + ":" + resTable.iserverQueryPram.sjbEnglishName]
            // })
            // var queryService = new mapboxgl.supermap.FeatureService(resTable.iserverQueryPram.iserverAddress)//config.InterfaceAddress.iserverService + '/data-XZQDW/rest/data'
            // queryService.getFeaturesBySQL(param, function (serviceResult) {
            //     // console.log(serviceResult)
            //     if (serviceResult.result !== undefined) {
            //         var layers = serviceResult.result.features.features[0].geometry;
            //         _this.__OneMaps.map.addDataLayer(JSON.stringify(layers));
            //     }
            // });
            if (srcImg == 'yanjingk.png') {
                $("#yanjingImg" + i).attr("src", "./static/img/yanjingb.png");
                _this._Map.removeMapSource(_this.showmapData);
            } else {
                $("#yanjingImg" + i).attr("src", "./static/img/yanjingk.png");
                _this._Map.addMapSource(_this.showmapData);
            }
        });
        this._html.find('#layerItem').append(itemHtml);
    }
}
SuitabillityMain.prototype.setRiskDesc = function (data) {
    this._html.find('#riskDesc').html(data)
}
// 2021-03-31 陈薪名 修改分析类型默认为请选择 注释掉了 default: arr[0].value,及 this.getOrderDetail(arr[0].value);
SuitabillityMain.prototype.getRiskSelect = function (callback) {
    api.getRiskSelectData(res => {
        var arr = this.getRiskSelectNew(res.data, {
            key: 'analysisName',
            value: 'id'
        }).arr
        this.select = new icu.formElement.select({
            data: arr,
            // default: arr[0].value,
            placeholder: '- 请选择 -',
        });
        // this.getOrderDetail(arr[0].value);
        this._html.find('#formSelect').append(this.select.html);

        setTimeout(() => {
            var $select = $('.form_select_option');
            for (let index = 0; index < $select.length; index++) {
                const element = $select[index];
                $(element).attr('title', arr[index].label)
            }
        }, 300);
        callback && callback()
    })
}
export default SuitabillityMain