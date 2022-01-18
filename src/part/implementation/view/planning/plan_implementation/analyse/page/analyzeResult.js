var AnalyzeResult = function () {
    var _this = this;
    this.event = {};
    this._html =$(
        '<div>' +
        '    <div class="layui-row layui-col-space10">' +
        '        <div class="layui-col-md2 analyze_item_tree" id="analyze_item_tree">' +
        '            <div>' +
        '                <div class="treeLineView">' +
        '                    <div class="item_title">统计结果</div>' +
        '                    <div class="item">极重要：1032平方千米，占比65%</div>' +
        '                    <div class="item">重要：232.01平方千米，占比25%</div>' +
        '                    <div class="item">一般重要：92.01平方铅笔，占比10%</div>' +
        '                    <div class="last_item"></div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="layui-col-md5" id="analyze_pie" style="width: 560px;height:200px;"></div>' +
        '        <div class="layui-col-md5" id="analyze_list" style="padding: 20px 0px;"></div>' +
        '    </div>' +
        '</div>');
    // 初始化图表
    this.echartView = new Echart(this._html.find('#analyze_pie')[0]);
    // 初始化表格
    this._table = new icu.table({
        tableOptions: {},
        cols: [{
            key: "index",
            type: 'index',
            width: '70px',
            name: '序号',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: 'AAA',
            sort: true,
            width: '150px',
            type: 'string',
            name: '行政区划',
        }, {
            key: 'BBB',
            sort: true,
            width: '120px',
            type: 'string',
            name: '保护级别',
        }, {
            key: 'CCC',
            sort: true,
            width: '120px',
            type: 'string',
            name: '土地性质',
        }, {
            key: 'DDD',
            sort: true,
            width: '110px',
            type: 'string',
            name: '面积',
        }],
        whereOptions: [
            {   
                key: 'str2',
                type: 'select',
                data:[{
                    "label":'亩',
                    "value":'亩'
                },{
                    "label":'公顷',
                    "value":'公顷'  
                },{
                    "label":'平方千米',
                    "value":'平方千米'
                }],
            }
        ],
        whereButtons: [],
        rightButtons: [
            {
                class: 'Test', // 为按钮添加自定义class 样式
                name: '导出', // 按钮显示文字
                event: function(data){  
                    var _this = this;
                    let xhr = new XMLHttpRequest()
                    var url = config.InterfaceAddress.AnalysisServiceTest + '/csvExportController/download'
                    xhr.open('POST', url, true)
                    // 这部至关重要，命令xhr返回给你的时blob(二进制大对象)类型的数据
                    xhr.responseType = 'blob'
                    xhr.traditional=true
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onload = function () {
                        if (this.status === 200) {
                            var blob = this.response;
                            var reader = new FileReader();
                            //reader.readAsText(blob);
                            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
                            reader.onload = function (e) {
                                var a = document.createElement("a"); // 转换完成，创建一个a标签用于下载
                                a.download = '分析' + ".xlsx";
                                a.href = e.target.result;
                                $("body").append(a); // 修复firefox中无法触发click
                                a.click();
                                $(a).remove();
                            };
                        }
                    }
                    xhr.send(JSON.stringify(this.arrIdList))
                }
            }
        ],
        getEvent: function (data, setData) {
            setData({
                count: 20,
                data: [{
                    index: 1,
                    AAA: '1省',
                    BBB: "1111",
                    CCC: "200",
                    DDD: "-800",
                }, {
                    index: 1,
                    AAA: '1省',
                    BBB: "2222",
                    CCC: "200",
                    DDD: "-800",
                }, {
                    index: 1,
                    AAA: '1省',
                    BBB: "3333",
                    CCC: "200",
                    DDD: "-800",
                }],
            });
        },
        pagingOptions : {
            hasQuick: true, // 开启快速跳页
            limitPage: true, // 开启筛选分页
            countPage: true, // 开启总页数
            index : 1, // 初始页面序号
            count : 10, // 初始分页数量
        },
        indexKey: 'page',
        countKey: 'limit',
        dataKey: 'data',
        totalKey: 'count'
    });
    this._html.find('#analyze_list').append(this._table.html);
    this._table.init();
}

AnalyzeResult.prototype.render = function () {
    return this._html;
}

var Echart = function(el){
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '极重要： 1032.01平方千米占比：65%'},
                    {value: 310, name: '重要：232.01平方千米，占比25%'},
                    {value: 234, name: '一般重要：92.01平方铅笔，占比10%'}
                ],
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
export default AnalyzeResult;