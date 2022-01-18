var DirLoading = function (params) {
    var _this = this;
    this.param = params;
    this.obj = params._obj
    this.resData = null
    this._html = $('<div>' +
        '<div class="layui-row layui-col-space5">' +
        '    <div class="layui-col-md8">' +
        '        <div class="layui-row grid-demo" >' +
        '            <div class="layui-col-md12" id="staticInfoBtn"></div>' +
        '            <div id="myfx" ></div>' +
        '            <div class="layui-col-md12" id="staticEachart"  style="width: 600px;height:200px;"></div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>');
    this.event = {
        staticOn: function () { },
        error: function () { }
    }
    this.staticInfoBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i>统计详情</div>');
    this._html.find('#staticInfoBtn').append(this.staticInfoBtn);
    this.initData()
}
DirLoading.prototype.initData = function () {
    var _this = this;
    this.param.view.$api.getDirlogDatas(this.param.obj, function (resData) {
        if (resData == '500') {
            _this.event.error('500')
            return false
        }else{
            _this.event.error('200')
        }
        _this.StaticData = resData;
        // if (_this.param.Amap.map.map.getLayer('counties')) {
        //     _this.param.Amap.map.map.removeLayer('counties');
        //     _this.param.Amap.map.map.removeSource('counties');
        // }
        // http://192.168.0.27:8091/iserver/services/map-JBNT/rest/maps/jbntbhtb%40JBNTBHTB_220523
        // http://192.168.0.38:8195/portalproxy/iserver/services/map-TDLY/rest/maps/2018%E5%B9%B4%E7%BB%8F%E7%BA%AC%E5%BA%A6%E5%9C%9F%E5%9C%B0%E5%88%A9%E7%94%A8%E7%8E%B0%E7%8A%B6
        // _this.param.Amap.map.map.addSource('counties', {
        //     "type": 'raster',
        //     "tiles": [resData.mapAddress],
        //     "tileSize": 256,
        //     rasterSource: 'iserver',
        // });
        // _this.param.Amap.map.map.addLayer({
        //     id: 'counties',
        //     type: 'raster',
        //     source: "counties",
        //     "minzoom": 0,
        //     "maxzoom": 22

        // });
        // _this.param.Amap.map.map.removeSource('counties');
        //wdd -- 识别，连选，单选
        _this.drawFactory(resData)
        _this.newChart = new Eachart(_this._html.find('#staticEachart')[0], resData.type, resData.data);
        _this.staticInfoBtn.unbind().bind('click', function () {
            // StaticData 无数据
            if (_this.StaticData.data.length > 0) {
                _this.event.staticOn(_this.StaticData);
            } else {
                // 2021-05-26 陈薪名 修改bug HNXGTKJ-1653
                top.layer.open({
                    title :'提示',
                    content: '暂无数据！',
                })
            }
        })
    })
}
//wdd
DirLoading.prototype.drawFactory = function(resData) {
    resData.mapId  = resData.dtxxbId
    this.obj && this.param.Amap.map.removeMapSource(this.obj.resData)
    //this.clearMap()
    //this.param.Amap.map.dataMenuList = []
    this.param.Amap.map.addMapSource(resData)
    this.resData = resData
}
DirLoading.prototype.clearMap = function() {
    this.param.Amap.map.dataMenuList.forEach(item => {
        this.param.Amap.map.removeMapSource(item)
    })
    
}
DirLoading.prototype.render = function () {
    return this._html;
}
DirLoading.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};
var Eachart = function (el, optionType, data) {
    this.myChart = echarts.init(el);
    var option = {}
    if (optionType == 'BZT') {
        var getPieData = hendlePieData(data)
        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: '80px',
                data: getPieData._titleArray
            },
            color: getPieData.colorArray,
            series: [
                {
                    type: 'pie',
                    radius: '80%',
                    center: ['40%', '50%'],
                    data: getPieData.pieData.length !== 0 ? getPieData.pieData : [],
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
    } else {
        var getBarData = hendleBarData(data)
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: getBarData.legendData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '34%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}%'
                },
                show: true,
                max:100,
            },
            yAxis: {
                type: 'category',
            },
            series: getBarData.seriesData
        };
    }
    // 有数据才加载图形
    if (data.length > 0) {
        this.myChart.setOption(option);
    } else {
        $('#myfx').empty();
        $('#myfx').append('<div style="text-align: center;color: #b9b7b7;padding-top: 50px;padding-left: 250px;">暂无数据</div>');
    }
}

function hendlePieData(data) {
    var colorArray = [];
    var pieData = [];
    var _titleArray = [];
    var thisColor = ['#FF9999', '#66CC99', '#FFCC66'];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        _titleArray.push(item.dictLabel)
        var pieObj = { 'name': item.dictLabel, 'value': item.count }
        pieData.push(pieObj)
        if (item.color) {
            colorArray.push(item.color);
        } else {
            colorArray.push(thisColor[i]);
        }
    }
    return {
        colorArray: colorArray,
        pieData: pieData
    }
}

function hendleBarData(data) {
    var legendData = []
    var seriesData = []
    var thisColor = ['rgba(20, 162, 79, 1)', 'rgba(34, 154, 84, 0.83)', 'rgba(34, 154, 84, 0.59)']
    var sumCount = 0;
    for (let i = 0; i < data.length; i++) {
        sumCount += data[i].count;
    }
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        var obj = {
            name: item.dictLabel,
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            barWidth: 40,
            data: [((item.count/sumCount)*100).toFixed(2)],
            itemStyle: {
                color: item.color ? item.color : thisColor[i],
                borderColor: item.color ? item.color : thisColor[i]
            }
        }
        seriesData.push(obj)
        legendData.push(item.dictLabel)
    }
    return { legendData: legendData, seriesData: seriesData }
}

export default DirLoading








// [
//     {
//         name: '极重要',
//         type: 'bar',
//         stack: '总量',
//         label: {
//             show: true,
//             position: 'insideRight'
//         },
//         barWidth: 40,
//         data: [20],
//         itemStyle: {
//             color: "rgba(20, 162, 79, 1)",
//             borderColor: "rgba(20, 162, 79, 1)"
//         }
//     },
//     {
//         name: '重要',
//         type: 'bar',
//         stack: '总量',
//         barWidth: 40,
//         label: {
//             show: true,
//             position: 'insideRight'
//         },
//         data: [12],
//         itemStyle: {
//             color: "rgba(34, 154, 84, 0.83)",
//             borderColor: "rgba(34, 154, 84, 0.83)"
//         }
//     },
//     {
//         name: '一般重要',
//         type: 'bar',
//         stack: '总量',
//         barWidth: 40,
//         label: {
//             show: true,
//             position: 'insideRight'
//         },
//         data: [22],
//         itemStyle: {
//             color: "rgba(34, 154, 84, 0.59)",
//             borderColor: "rgba(34, 154, 84, 0.59)"
//         }
//     }
// ]