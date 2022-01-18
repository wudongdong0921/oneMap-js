// import Map from './map'
import MapBoxGls from '../../otherPage/map'
import TabLableView from '../../../../../../../common/tabLable';
import CustomDst from '../../../../../../../common/customForm_districtLinkage';
import UTIL from '../../../../../../../common/util'
var EchartList = function (api, view, options) {
    this.apis = api
    var _this = this;
    _this.mapView = '';// 默认展现地图轮廓
    _this.view = view;
    // _this.tabValue = ''; // 定义tab选中值
    this.option = $.extend({}, {
        acCode: '', // 行政区划
        tabValue: '', // 定义tab选中值
        year: '', // 年份选择
    }, options)
    this.event = {
        changeBt: function () { }
    }
    this._html = $(
        '<div class="layui-container">' +
        '    <div class="layui-row">' +
        '        <div class="layui-col-md7 formSelect" id="formSelect"></div>' +
        '        <div class="layui-col-md5 checkBtn" id="checkBtn"></div>' +
        '    </div>' +
        '    <div class="layui-row">' +
        '        <div class="checkChartBtn" id="checkChartBtn"></div>' +
        '    </div>' +
        '    <div class="layui-row">' +
        '        <div class="chartView" id="chartView" style="width:820px;height:700px;position: absolute;"></div>' +
        '        <div class="chartView" id="chartList" style="display:none;padding-right:10px"></div>' +
        '    </div>' +
        '</div>');
    this._form = icu.templateForm({
        labelwidth: 110, // labelwidth 整体控制表单前方元素宽度
    });
    this._form.$setOptions([
        [{
            key: 'rightAdministrativeDivision',
            formlabel: '行政区划',
            col: 6,
            getKey: 'dictValue',
            object: CustomDst,
            onChange: function (value) {
                // _this.acCode = value
                _this.mapView = ''; // 切换行政区后，默认展现地图需重新设置
                _this.option.acCode = value.dictValue
                _this.handelLevels(value)
                _this.renderMap()
                _this._tableView = new TableView(_this.option);
                _this._html.find('#chartList').empty()
                _this._html.find('#chartList').append(_this._tableView._table.html);
                _this._tableView._table.init();
            },
        }, {
            key: 'flowstatus',
            type: 'inputDate',
            formlabel: '年份',
            col: 6,
            // readonly: true,
            layDataOption: {
                type: 'year',
                done: function (value, date, endDate) {
                    _this.option.year = value;
                    _this.renderMap()
                    _this._tableView = new TableView(_this.option);
                    _this._html.find('#chartList').empty()
                    _this._html.find('#chartList').append(_this._tableView._table.html);
                    _this._tableView._table.init();
                },
                //对比HNXGTKJ-1896
                ready: function () {
                    $(".laydate-btns-clear").hide();
                }
            },
            //对比HNXGTKJ-1895
            default: new Date($.ajax({ async: false }).getResponseHeader("Date")).getFullYear(),
        }]
    ]);
    this._form.flowstatus.html.attr('readonly', 'readonly');

    this._html.find('#formSelect').append(this._form.$html);

    this.checkBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon squareExchange"></i>切换图表</div>');
    this._html.find('#checkBtn').append(this.checkBtn);
    this.tabView = new TabLableView({
        itemArray: [{
            lable: '省级',
            id: 'shengji',
            value: 1
        }, {
            lable: '市级',
            id: 'shiji',
            value: 2
        }, {
            lable: '县级',
            id: 'xianji',
            value: 3
        }],
        default: 1,
        onClick: undefined
    })
    this.tabView.on('onClick', function (selectTabData) {
        _this.option.tabValue = selectTabData.value
        // 2021-05-10 陈薪名 修改bug HNXGTKJ-1645
        _this.option.typeLevels = selectTabData.value
        _this.renderMap()
        _this._tableView = new TableView(_this.option);
        _this._html.find('#chartList').empty()
        _this._html.find('#chartList').append(_this._tableView._table.html);
        _this._tableView._table.init();
    })

    // Map({}, this._html.find(".chartView")[0], 99999);


    this.checkBtn.unbind().bind('click', function () {
        var evel = _this._html.find('#chartList')[0];
        var isChartListShow = false;
        if (evel.style.display === "none") {
            isChartListShow = true;
            _this._html.find('#chartList').show();
            _this._html.find('#chartView').hide();
            _this.view.find('.item-div').hide()
            // _this._tableView = new TableView(_this.option);
            // _this._html.find('#chartList').empty()
            // _this._html.find('#chartList').append(_this._tableView._table.html);
            // _this._tableView._table.init();
        } else {
            _this.renderMap()
            isChartListShow = false;
            _this._html.find('#chartList').hide();
            _this._html.find('#chartView').show();
            _this.view.find('.item-div').show()
        }
    })
}

EchartList.prototype.render = function () {
    this._html.find('#checkChartBtn').append(this.tabView.init())
    return this._html;
}
EchartList.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};
// 2021-05-10 陈薪名 修改bug HNXGTKJ-1643
var TableView = function (option) {
    var _this = this
    this.options = $.extend({}, {}, option)
    this._table = new icu.table({
        tableOptions: {},
        cols: [{
            key: "index",
            type: 'index',
            width: '60px',
            name: '序号',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: 'areaName',
            sort: true,
            width: '150px',
            type: 'string',
            name: '行政区划',
        }, {
            key: 'adCode',
            sort: true,
            width: '150px',
            type: 'string',
            name: '行政区划代码',
        }, {
            key: 'planTyv',
            sort: true,
            width: '150px',
            type: 'string',
            name: '规划目标年值',
        }, {
            key: 'ieValue',
            sort: true,
            width: '150px',
            type: 'string',
            name: '执行情况',
        }, {
            key: 'unitCode',
            sort: true,
            width: '120px',
            type: 'string',
            name: '单位',
        }, {
            key: 'monitorSituation',
            type: 'buttons',
            width: '150px',
            name: '预警状态',
            buttons: [function (unit, row, data, events) {
                var background = '';
                if (mapCNColor[data.monitorSituation]) {
                    background = mapCNColor[data.monitorSituation].color;
                }
                var color = (background == '#fcfcd4') ? '#F59A23': '#fff';
                var button = $('<div class="layui-btn layui-btn-sm" style="margin: -20px 0;color:' + color + ';background:' + background + '">' + data.monitorSituation + '</div>');
                return button;
            }],
        }],
        // 2021-05-10 陈薪名 修改bug HNXGTKJ-1646
        rightButtons: [
            {
                class: 'layui-btn Testo',
                name: '导出',
                icon: 'exchange',
                event: function (data) {
                    //console.log(_this.options)
                    var url = config.InterfaceAddress.implementService + '/warningDetails/ieValueExcel?zbxxxbId=' + _this.options.zbxxxbId + '&areaLeavel=' + _this.options.typeLevels + '&year=' + _this.options.year + '&adCode=' + _this.options.acCode;
                    var name = _this.options.indexName;
                    var xhh = new XMLHttpRequest();
                    var page_url = url;
                    xhh.open("get", page_url);
                    xhh.setRequestHeader("Content-type", "application/json; charset=utf-8");
                    xhh.responseType = 'blob';
                    xhh.onreadystatechange = function () {
                        if (xhh.readyState === 4 && xhh.status === 200) {
                            var filename = name + ".xlsx";
                            var blob = new Blob([xhh.response], {
                                type: name + '/xlsx'
                            });
                            var csvUrl = URL.createObjectURL(blob);
                            var link = document.createElement('a');
                            link.href = csvUrl;
                            link.download = filename;
                            link.click();
                        }
                    };
                    xhh.send()
                }
            }
        ],
        getEvent: function (data, setData) {
            _this.options.thisView.$api.warningInfo({
                'zbxxxbId': _this.options.zbxxxbId ? _this.options.zbxxxbId : '',
                'areaLeavel': _this.options.typeLevels ? _this.options.typeLevels : '0',
                'limit': data.limit,
                'page': data.page,
                year: _this.options.year ? _this.options.year : new Date($.ajax({ async: false }).getResponseHeader("Date")).getFullYear(),
                adcode: _this.options.acCode ? _this.options.acCode : ''
            }, function (res) {
                if (res.code == 200) {
                    setData({
                        count: res.count,
                        data: res.data,
                    });
                }
            })

        },
        indexKey: 'page',
        countKey: 'limit',
        dataKey: 'data',
        totalKey: 'count'
    });

}
EchartList.prototype.renderMap = function (params) {
    // 初始化地图
    var _this = this;
    _this.mapBoxView = new MapBoxGls();
    _this._html.find('#chartView').empty();
    _this._html.find('#chartView').append(_this.mapBoxView.render());
    var isNeedZoom = this.isNeedZoom(_this.option.acCode);
    _this.apis.getMapGeojson(_this.option.acCode ? _this.option.acCode : '', _this.option.typeLevels - 1, (res) => {
        // 2021-06-02 陈薪名 修改bug HLJSSJDXT-472
        if (_this.mapView == '') {
            _this.mapView = res;
        }
        if (isNeedZoom == 1 && (_this.option.typeLevels - 1) == 2) {
            _this.apis.getMapGeojson(_this.option.acCode, isNeedZoom, (res) => {
                _this.mapBoxView.setCenter(res)
            }, _this.mapBoxView.loading)
        }
        _this.mapBoxView.renderMapView(res, _this.mapView);
        _this.fnRenderColorMap(_this.mapBoxView, res);
    }, _this.mapBoxView.loading);
}
EchartList.prototype.isNeedZoom = function (adCode) {
    if ((adCode.charAt(2) == '0' && adCode.charAt(3) == '0') &&
        (adCode.charAt(4) == '0' && adCode.charAt(5) == '0')) { //adCode，第5,6位为0，则说明不是县级，3,4其中一个不为0，则为市级，例如：230100
        return 0;
    }
    if ((adCode.charAt(2) != '0' || adCode.charAt(3) != '0') &&
        (adCode.charAt(4) == '0' && adCode.charAt(5) == '0')) { //adCode，第5,6位为0，则说明不是县级，3,4其中一个不为0，则为市级，例如：230100
        return 1;
    }
    return 2;
}
EchartList.prototype.fnRenderColorMap = function (mapBoxView, mapData) {
    var _this = this;
    var areas = [];
    mapData.forEach(element => {
        areas.push(element);
    });
    _this.option.thisView.$api.warningInfo({
        'zbxxxbId': _this.option.zbxxxbId ? _this.option.zbxxxbId : '',
        'areaLeavel': _this.option.typeLevels ? _this.option.typeLevels : '0',
        'limit': 1000000,
        'page': 1,
        year: _this.option.year ? _this.option.year : '',
        adcode: _this.option.acCode ? _this.option.acCode : ''
    }, function (res) {
        if (res.code == 200) {
            if (res.data.length !== 0) {
                mapBoxView.addColorLayer(_this.fnBuildColorLayerParam(res.data, areas), {
                    isShowPopup: true,
                    type: 'index',
                    areaNameKey: 'xzqhName'
                });
            }
        }
    });
}

//返回具体数据
EchartList.prototype.fnBuildColorLayerParam = function (colorAreas, areas) {
    for (let i = 0; i < colorAreas.length; i++) {
        var item = colorAreas[i];
        for (let j = 0; j < areas.length; j++) {
            var itemJ = areas[j];
            if (item.adCode == itemJ.properties.XZQDM) {
                item.geoJson = itemJ.geometry;
                item.xzbm = itemJ.properties.XZQDM;
                item.id = itemJ.properties.SMID;
                // 2021-05-10 陈薪名 修改bug 
                if (mapCNColor[item.monitorSituation ? item.monitorSituation : '正常']) {
                    item.color = mapCNColor[item.monitorSituation ? item.monitorSituation : '正常'].color;
                } else {
                    item.color = '#e7e7e7';
                }

            }
        }
    }
    return colorAreas;
}
var mapColor = {
    0: {
        color: '#2b5394'
    },
    1: {
        color: '#CCC'
    },
    2: {
        color: '#ff8848'
    },
    4: {
        color: '#fcfcd4'
    },
    3: {
        color: '#c2e5e5'
    }
}
// if (data.monitorSituation == '2') {

//     var button = $('<div class="layui-btn layui-btn-sm" style="margin: -20px 0;">正常</div>');
// } else if (data.monitorSituation == '4') {

//     var button = $('<div class="layui-btn layui-btn-sm layui-btn-warm" style="margin: -20px 0;">超标</div>');
// } else if (data.monitorSituation == '3') {

//     var button = $('<div class="layui-btn layui-btn-sm layui-btn-danger" style="margin: -20px 0;">预警</div>');
// }
var mapCNColor = {
    0: {
        color: '#2b5394'
    },
    1: {
        color: '#CCC'
    },
    '正常': {
        color: '#c2e5e5'
    },
    '预警': {
        color: '#fcfcd4'
    },
    '超标': {
        color: '#ff8848'
    },
    '未监测': {
        color: '#CCC'
    }
}
EchartList.prototype.handelLevels = function (areacodeList) {
    var _this = this;
    // 2021-05-10 陈薪名 修改bug HNXGTKJ-1645
    this.option.typeLevels = UTIL.levelHandels([areacodeList.dictValue])
    // this.option.typeLevels = UTIL.levelHandels(areacodeList)
    this.newLevel = ''
    switch (this.option.typeLevels) {
        case '0':
            _this.view.find('#shengji').show();
            _this.view.find('#shiji').show();
            _this.view.find('#xianji').show();
            _this.view.find('#shengji').addClass('tab-active')
            _this.view.find('#shiji').removeClass('tab-active')
            _this.view.find('#xianji').removeClass('tab-active')
            break;
        case '1':
            _this.view.find('#shengji').show();
            _this.view.find('#shiji').show();
            _this.view.find('#xianji').show();
            _this.view.find('#shengji').addClass('tab-active')
            _this.view.find('#shiji').removeClass('tab-active')
            _this.view.find('#xianji').removeClass('tab-active')
            break;
        case '2':
            _this.view.find('#shengji').hide();
            _this.view.find('#shiji').show();
            _this.view.find('#xianji').show();
            _this.view.find('#shiji').addClass('tab-active')
            _this.view.find('#xianji').removeClass('tab-active')
            break;
        case '3':
            _this.view.find('#shengji').hide();
            _this.view.find('#shiji').hide();
            _this.view.find('#xianji').show();
            _this.view.find('#xianji').addClass('tab-active')
            break;
        default:
            break;
    }
}

export default EchartList;