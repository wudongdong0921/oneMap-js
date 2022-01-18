////////////////////////////////////////////////
// 统计详情
// 吴野
// 2021-01-22 17:09:31
////////////////////////////////////////////////
var AnalyzeResult = function (data, view, xzqh, syxIds,__OneMap) {
    this.StaticDataAll = data;
    this.views = view
    this.xzqhs = xzqh
    this.syxId = syxIds
    this.syxdj = ''; // 适应性等级，树节点单击切换数据列表
    this._table = '';
    this.__OneMaps = __OneMap // 用于列表数据双击后定位地图
    var _this = this;
    this.event = {};
    this.selectType = 3; // 单位下拉框坐标
    this._html = $(
        '<div>' +
        '    <div class="layui-row layui-col-space10" style="padding-left: -10px;display:flex;width:100%;">' +//2021-06-01 陈薪名 修改bug HNXGTKJ-1748
        '        <div class=" analyze_item_tree" id="analyze_item_tree" style="width:20%;">' +
        '            <div>' +
        '                <div class="treeLineView" style="overflow:auto;height:200px;">' +
        '                    <div class="item_title">统计结果</div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        // '        <div class="layui-col-md5" id="analyze_pie" style="width: 560px;height:200px;"></div>' +
        '        <div class="" id="analyze_pie" style="width: 375px;height:200px;"></div>' +
        '        <div class=" bear_table" id="analyze_list" style="padding: 20px 0px;width: 47%;"></div>' +
        '    </div>' +
        '</div>');
    var md = '50%';// 当禁用统计数或图标时，table列表设置的宽度
    if (_this.StaticDataAll.openStatisticsTree == 1 && _this.StaticDataAll.openStatisticalChart == 1) {
        this.initTreeLine(null, '3')
        this.echartView = new Echart(this._html.find('#analyze_pie')[0], this.StaticDataAll.data, '3');
        md = '50%';
    }
    if(_this.StaticDataAll.openStatisticsTree == 0 && _this.StaticDataAll.openStatisticalChart == 1) {
        // 统计树不开启时，删除该元素
        this._html.find('.analyze_item_tree').remove();
        this.echartView = new Echart(this._html.find('#analyze_pie')[0], this.StaticDataAll.data, '3');
        md = '80%';
    }
    if (_this.StaticDataAll.openStatisticsTree == 1 && _this.StaticDataAll.openStatisticalChart == 0) {
        this._html.find('#analyze_pie').remove();
        this.initTreeLine(null, '3')
        md = '80%';
    }
    if (_this.StaticDataAll.openStatisticsTree == 0 && _this.StaticDataAll.openStatisticalChart == 0) {
        this._html.find('.analyze_item_tree').remove();
        this._html.find('#analyze_pie').remove();
        md = '98%';
    }

    // 渲染treeline
    // 判断是否开启统计树 1是开启
    // this.initTreeLine()
    // if (_this.StaticDataAll.openStatisticsTree == 1) {
    //     this.initTreeLine(null, '3')
    //     md = '55%';
    // } else {
    //     // 统计树不开启时，删除该元素
    //     this._html.find('.analyze_item_tree').remove();
    //     if (_this.StaticDataAll.openStatisticalChart == 1) {
    //         md = '70%';
    //     }else{
    //         md = '55%';
    //     }
    // }
    // // 初始化图表
    // // this.echartView = new Echart(this._html.find('#analyze_pie')[0], this.StaticDataAll);
    // if (_this.StaticDataAll.openStatisticalChart == 1) {
    //     this.echartView = new Echart(this._html.find('#analyze_pie')[0], this.StaticDataAll.data, '3');
    // } else {
    //     // 统计图表不开启时，删除该元素
    //     this._html.find('#analyze_pie').remove();
    //     if (md == '55%') {// 统计数和图标都禁用情况下
    //         md = '98%';
    //     } else {
    //         md = '80%';
    //     }
    // }
    // 2021-05-11 陈薪名 修改bug HNXGTKJ-1657
    // 根据统计树和图表判断列表宽度
    if (md !== '') {
        this._html.find('#analyze_list').css({"width":md});
    }
    // 初始化表格
    this.initTable()
}

AnalyzeResult.prototype.initTable = function (params) {
    var _this = this;
    var thisselect = new icu.formElement.select({
        setKey: 'id', // 改变赋值时所选择的对象
        getKey: 'object', // 特殊关键字 取值时取得select所选对象 
        showKey: 'name', // 显示用字段
        data: [{
            "name": '亩',
            "id": '1'
        }, {
            "name": '公顷',
            "id": '2'
        }, {
            "name": '平方千米',
            "id": '3'
        }],
        onChange: function () {
            thisselect.get((emsg, value) => {
                var newData = this.StaticDataAll;
                if ($("#analyze_pie")[0] && $("#analyze_item_tree")[0]) {
                    $("#analyze_pie")[0].setAttribute('_echarts_instance_', '');
                    _this.initTreeLine(_this.StaticDataAll.data, value.id)
                    _this.echartView = new Echart(_this._html.find('#analyze_pie')[0], _this.StaticDataAll.data, value.id);
                }
                if(!$("#analyze_pie")[0] && $("#analyze_item_tree")[0]){
                    _this.initTreeLine(_this.StaticDataAll.data, value.id)
                }
                if($("#analyze_pie")[0] && !$("#analyze_item_tree")[0]){
                    $("#analyze_pie")[0].setAttribute('_echarts_instance_', '');
                    _this.echartView = new Echart(_this._html.find('#analyze_pie')[0], _this.StaticDataAll.data, value.id);
                }
                _this.selectType = value.id
                //列表数据执行重载
                _this._table.refresh();
            });
        }
    });
    thisselect.set("3");
    _this._html.find('#analyze_list').append(thisselect.html);
    this.views.$api.getTableData({
        fzckzdIdValue:'',
        adcode: _this.xzqhs,
        // adcode: "",
        syxId: _this.syxId,
        page: 1,
        limit: 10
    }, function (resTable) {
        // _this.resTable = resTable;
        var getTableData = getHandelTableData(resTable.columns)
        _this._table = new icu.table({
            tableOptions: {},
            cols: getTableData,
            whereOptions: [],
            whereButtons: [],
            cellMinWidth: 100,//2021-06-01 陈薪名 修改bug HNXGTKJ-1748
            rightButtons: [
                {
                    class:'layui-btn Testo',// 2021-05-13 陈薪名 修改bug HNXGTKJ-1649
                    name: '导出', // 按钮显示文字
                    event: function(data){  
                        var url = config.InterfaceAddress.implementService + '/devSuitability/dataTableExcel?syxId=' + _this.syxId + '&adcode=' + _this.xzqhs + '&fzckzdIdValue=' + _this.syxdj;
                        var name = '开发适宜性评价' + new Date($.ajax({async:false}).getResponseHeader("Date")).getTime();
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
                _this.views.$api.getTableData({
                    fzckzdIdValue: _this.syxdj,
                    adcode: _this.xzqhs,
                    //adcode: "",
                    syxId: _this.syxId,
                    page: data.page,
                    limit: data.limit
                }, function (resTable) {
                    // 2021-06-01 陈薪名 修改bug 切换单位时，列表数据面积重新计算、
                    resTable.data.list = handelMJ(resTable.data.list,_this.selectType)
                    console.log(resTable.data.list)
                    setData({
                        count: resTable.data.total,
                        data: resTable.data.list,
                    });
                })
            },
            pagingOptions: {
                hasQuick: false, // 开启快速跳页
                limitPage: false, // 开启筛选分页
                countPage: true, // 开启总页数
                index: 1, // 初始页面序号
                count: 3, // 初始分页数量
            },
            indexKey: 'page',
            countKey: 'limit',
            dataKey: 'data',
            totalKey: 'count'
        });
        _this._html.find('#analyze_list').append(_this._table.html);
        // 2021-05-13 陈薪名 修改bug HNXGTKJ-1649
        //监听行单击事件（双击事件为：rowDouble）
        _this._table.on('rowDblclick', function (data, table, row) {
            var sql = "";
            sql = "SMID = " + row.data.SMID ;
            var param = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: resTable.iserverQueryPram.sjbEnglishName +"@"+resTable.iserverQueryPram.iserverDataName,
                    attributeFilter: sql
                },
                fromIndex: '0', // 开始查询位置
                toIndex: '1000', // 结束查询位置
                datasetNames: [resTable.iserverQueryPram.iserverDataName + ":" + resTable.iserverQueryPram.sjbEnglishName]
            })
            var queryService = new mapboxgl.supermap.FeatureService(resTable.iserverQueryPram.iserverAddress)//config.InterfaceAddress.iserverService + '/data-XZQDW/rest/data'
            queryService.getFeaturesBySQL(param, function (serviceResult) {
                // console.log(serviceResult)
                if (serviceResult.result !== undefined) {
                    var layers = serviceResult.result.features.features[0].geometry;
                    _this.__OneMaps.map.addDataLayer(JSON.stringify(layers));
                }
            });
            //标注选中样式
            // row.html.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        });
        _this._table.init();
    })
}

AnalyzeResult.prototype.initTreeLine = function (paramsData, type) {
    var _this = this;
    var thisData = handelAcre(paramsData ? paramsData : _this.StaticDataAll.data, type)
    this._html.find('.treeLineView').empty()
    this._html.find('.treeLineView').append('<div class="item_title">统计结果</div>')
    var treeLineData = thisData ? thisData : _this.StaticDataAll.data;
    var sumCount = 0;
    var itemHtml = '';
    if (treeLineData.length !== 0) {
        for (let i = 0; i < treeLineData.length; i++) {
            sumCount += treeLineData[i].count;
        }
        for (let i = 0; i < treeLineData.length; i++) {
            const item = treeLineData[i];
            itemHtml = $('<div class="item" id="treeLineItem'+ i +'">' + item.dictLabel + '：' + item.value + '</br>占比：' + ((item.count/sumCount)*100).toFixed(2) + '%</div>');
            itemHtml.on("click",function(){
                console.log(item.dictLabel)
                for(let j=0;j<_this.StaticDataAll.data.length;j++) {
                    if (_this.StaticDataAll.data[j].dictLabel == item.dictLabel) {
                        _this.syxdj = _this.StaticDataAll.data[j].dictValue;
                        break;
                    }
                }
                //执行重载
                _this._table.refresh();
            });
            _this._html.find('.treeLineView').append(itemHtml)
        }
    }
    this._html.find('.treeLineView').append('<div class="last_item"></div>')
}

AnalyzeResult.prototype.render = function () {
    return this._html;
}

var Echart = function (el, StaticDataAll, type) {
    var getPieData = getHandelPieData(StaticDataAll, type)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            // orient: 'vertical',
            left: 'center',
            data: getPieData._titleArray
        },
        color: getPieData.colorArray,
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                //center: ['50%', '60%'],
                center: ['50%', '45%'],
                data: getPieData.seriesArray,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    this.myChartPie = echarts.init(el);
    this.myChartPie.setOption(option);
}
function getHandelPieData(data, type) {
    var thisData = handelAcre(data, type)
    var _seriesArray = [];
    var _colorArray = [];
    var _titleArray = [];
    var thisColor = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    for (let i = 0; i < thisData.length; i++) {
        const item = thisData[i];
        _titleArray.push(item.dictLabel)
        var obj = { value: item.count, name: '' + item.dictLabel + '： ' + item.value }
        _seriesArray.push(obj)
        if (item.color) {
            _colorArray.push(item.color)
        } else {
            _colorArray.push(thisColor[i])
        }
    }
    return { seriesArray: _seriesArray, colorArray: _colorArray, _titleArray: _titleArray }
}

function getHandelTableData(data) {
    var headerData = []
    if (data.length !== 0) {
        headerData.push({
            key: "index",
            type: 'index',
            width: '70px',
            name: '序号',
            titleAlign: 'center',
            textAlign: 'center',
        })
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            var obj = {
                key: item.key,
                sort: true,
                width: '150px',
                type: 'string',
                name: item.name,
            }
            headerData.push(obj)
        }
    }
    return headerData;
}

function handelAcre(data, type) {
    var newData = data
    if (type == 1) {
        for (let i = 0; i < newData.length; i++) {
            const item = newData[i];
            item['value'] = (item.sumArea * 0.0015).toFixed(2) + '亩'
        }
    } else if (type == 2) {
        for (let i = 0; i < newData.length; i++) {
            const item = newData[i];
            item['value'] = (item.sumArea * 0.0001).toFixed(4) + '公顷'
        }
    } else {
        for (let i = 0; i < newData.length; i++) {
            const item = newData[i];
            item['value'] = (item.sumArea / 1000000).toFixed(2) + '平方千米'
        }
    }
    return newData
}
// 用于单位切换后，列表数据重新加载 （平方千米 转 ——亩，公顷，平方千米）
function handelMJ(data, type) {
    var newData = data
        if (type == 1) {
            for (let i = 0; i < newData.length; i++) {
                const item = newData[i];
                item.MJ = (item.MJ * 1500).toFixed(2)
            }
        } else if (type == 2) {
            for (let i = 0; i < newData.length; i++) {
                const item = newData[i];
                item.MJ = (item.MJ * 100).toFixed(2)
            }
        }
    return newData
}

export default AnalyzeResult;