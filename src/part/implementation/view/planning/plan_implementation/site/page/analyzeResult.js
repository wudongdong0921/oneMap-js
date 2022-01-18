////////////////////////////////////////////////
// 统计分析-table渲染
// 吴野
// 2021-01-23 13:03:44
////////////////////////////////////////////////
var AnalyzeResult = function (view, alldata, backData,suitabillityMain) {
    var _this = this;
    this._suitabillityMain = suitabillityMain
    this.views = view
    this.event = {};
    this._html = $(
        '<div>' +
        '    <div class="layui-row layui-col-space10">' +
        '        <div class="layui-col-md12" id="analyze_list" style="padding: 20px 20px;"></div>' +
        '    </div>' +
        '</div>');
    // 初始化表格
    _this._html.find('#analyze_list').empty();
    var nhss = '';
    var jzyz = "";
    var zxjl = "500"
    if (backData) {
        if (backData.zxjl && backData.zxjl.length !== 0) {
            zxjl = backData.zxjl
        }
        if (backData.nhss && backData.nhss.length !== 0) {
            nhss = backData.nhss.join(',')
        }
        if (backData.yzsx && backData.yzsx.length !== 0) {
            jzyz = backData.yzsx.join(',')
        }
    }
    _this.views.$api.advancedFilter({
        "page": 1,
        "limit": 10,
        "adcode": alldata == undefined?'':alldata.adcode == undefined?'':alldata.adcode,
        "distance": zxjl,
        "nhss": nhss,
        "jzyz": jzyz,
        "rwId": alldata == undefined?'':alldata.rwId == undefined?'':alldata.rwId,
    }, (res) => {
        _this._table = new icu.table({
            tableOptions: {},
            cols: _this.handelHeader(res.columns),
            whereOptions: [
                //不要筛选面积功能
                // {
                //     key: 'str2',
                //     type: 'select',
                //     data: [{
                //         "label": '亩',
                //         "value": '亩'
                //     }, {
                //         "label": '公顷',
                //         "value": '公顷'
                //     }, {
                //         "label": '平方米',
                //         "value": '平方米',
                //     }],
                //     placeholder: '平方米',//默认
                // }
            ],
            whereButtons: [],
            rightButtons: [
                {
                    class: 'Test', // 为按钮添加自定义class 样式
                    name: '导出', // 按钮显示文字
                    event: function(data1){  
                        var data = {
                            "adcode": alldata == undefined?'':alldata.adcode == undefined?'':alldata.adcode,
                            "distance": zxjl,
                            "nhss": nhss,
                            "jzyz": jzyz,
                            "rwId": alldata == undefined?'':alldata.rwId == undefined?'':alldata.rwId,
                        }
                        var url = config.InterfaceAddress.implementService + '/auxLocation/dataTableExcel';
                        var name = new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear() + '辅助选址详情';
                        //var name = '辅助选址' + new Date().getTime();
                        var xhh = new XMLHttpRequest();
                        var page_url = url;
                        xhh.open("post", page_url);
                        xhh.setRequestHeader("Content-type", "application/json; charset=utf-8");
                        xhh.responseType = 'blob';
                        xhh.onreadystatechange = function () {
                            if (xhh.readyState === 4 && xhh.status === 200) {
                                var filename = name + ".xlsx";
                                //直接获取数据流的文件名,跨域问题需要nginx
                                //console.log(xhh.getResponseHeader("Content-Disposition"))
                                //var filename =  xhh.getResponseHeader("Content-Disposition").split(';')[2].split('=')[1].split('"')[1];
                                var blob = new Blob([xhh.response], {
                                    //type: name + '/xls'
                                    type: filename
                                });
                                var csvUrl = URL.createObjectURL(blob);
                                var link = document.createElement('a');
                                link.href = csvUrl;
                                link.download = filename;
                                link.click();
                            }
                        };
                        xhh.send(JSON.stringify(data)) //JSON.stringify(advancedFilterBean)) 
                    },
                    icon: 'add', // 图标
                    template: '' // 传入字符串,格式化为HTML以后,生成按钮。 
                }
            ],
            getEvent: function (data, setData) {
                _this.views.$api.advancedFilter({
                    "page": data.page,
                    "limit": data.limit,
                    "adcode": alldata.adcode,
                    "distance": zxjl,
                    "nhss": nhss,
                    "jzyz": jzyz,
                    "rwId": alldata.rwId
                }, (ress) => {
                    setData({
                        count: ress.data.total,
                        data: ress.data.list,
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
        _this._table.init();
        // 为表格行添加双击方法
        _this._table.on('rowDblclick', function (data, table, row) {
            // _this._suitabillityMain.fitBounds(data.smgeometry)
            _this._suitabillityMain.addDataLayer(data.smgeometry);
        });
    })

}

AnalyzeResult.prototype.handelHeader = function (data) {
    var headerData = []
    if (data !== undefined && data.length !== 0) {
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

AnalyzeResult.prototype.render = function () {
    return this._html;
}
export default AnalyzeResult;