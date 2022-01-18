var Echarts = function () {
}

Echarts.prototype.barChart = function (el, data) {
    var xData = [];
    var yData1 = [];
    var yData2 = [];
    var yData3 = [];
    var yData4 = [];
    data.forEach(element => {
        xData.push(element.ZBXZ);
        yData1.push(element.IndicatorData.zczb);
        yData2.push(element.IndicatorData.yjzb);
        yData3.push(element.IndicatorData.cbzb);
        yData4.push(parseInt(element.IndicatorData.zczb) + parseInt(element.IndicatorData.yjzb) + parseInt(element.IndicatorData.cbzb));
    });
    var option = {
        title: {
            text: '指标分类预警情况',
            top: 10,
            left: 10,
            textStyle: {
                fontWeight: '400'
            }
        },
        legend: {
            data: ['监测指标', '正常指标', '预警指标', '超标指标'],
            top: 10
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        xAxis: { type: 'category', data: xData },
        yAxis: {

        },
        series: [
            { type: 'bar', name: '监测指标', barWidth: 25, data: yData4, barWidth: 20 },
            { type: 'bar', name: '正常指标', barWidth: 25, data: yData1, barWidth: 20 },
            { type: 'bar', name: '预警指标', barWidth: 25, data: yData2, barWidth: 20 },
            { type: 'bar', name: '超标指标', barWidth: 25, data: yData3, barWidth: 20 },
        ]
    };
    let echc = echarts.init(el);
    echc.setOption(option);
}

Echarts.prototype.barAndLineChart = function (el, data, callback) {
    var xData = [];
    var yData1 = [];
    var yData2 = [];
    var yData3 = [];

    data.forEach(element => {
        xData.push(element.dataOfScore);
        yData1.push(element.cbzb);
        yData2.push(element.yjzb);
        yData3.push(element.yczb);
    });
    var option = {
        title: {
            text: '指标预警走势',
            top: 10,
            left: 10,
            textStyle: {
                fontWeight: '400'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['超标指标', '预警指标', '异常指标'],
            top: 10
        },
        // toolbox: {
        //     feature: {
        //         magicType: { show: true, type: ['line', 'bar'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category', data: xData, axisPointer: { type: 'shadow' },
                inverse: true
            }
        ],
        yAxis: [
            { type: 'value' }
        ],
        series: [
            {
                name: '超标指标',
                type: 'bar',
                data: yData1,
                barWidth: 20
            },
            {
                name: '预警指标',
                type: 'bar',
                data: yData2,
                itemStyle: {
                    normal: {
                        color: 'rgb(247, 144, 99)'
                    }
                },
                barWidth: 20
            },
            {
                name: '异常指标',
                type: 'line',
                data: yData3,
                itemStyle: {
                    color: 'rgb(12, 162, 148)'
                },
                barWidth: 20
            }
        ]
    };
    let echc = echarts.init(el);
    echc.setOption(option);
    callback(echc, option);
}

Echarts.prototype.pieChart = function (el, value1, value2, value3) {
    var alldata = [
        {
            value: value1 == null ? '0' : value1, // 2021-05-06 陈薪名 修改 当值为null赋值为0
            name: '预警',
            itemStyle: {
                normal: {
                    color: 'rgb(217, 123, 36)'
                }
            }
        },
        {
            value: value2 == null ? '0' : value2,
            name: '正常',
            itemStyle: {
                normal: {
                    color: 'rgb(12, 162, 148)'
                }
            }
        },
        {
            value: value3 == null ? '0' : value3,
            name: '超标',
            itemStyle: {
                normal: {
                    color: 'rgb(215, 57, 73)'
                }
            }
        }
    ]

    var option = {
        title: {
            text: '预警等级分布图',
            left: '10',
            textStyle: {
                fontWeight: '400',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} <br/>{b} : {c} %"
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br />指标：{c}<br />占比：{d}%'
        },
        series: [
            {
                type: 'pie',
                radius: '60%',
                name: '状态',
                center: ['50%', '50%'],
                data: alldata,
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
    let echc = echarts.init(el);
    echc.setOption(option);
};

export default Echarts
