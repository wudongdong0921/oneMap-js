var Echarts = function () {
}

Echarts.prototype.barChart = function (el, data) {
    var xData = [];
    var yData = [];
    data.forEach(element => {
        xData.push(element.scoreYear);
        yData.push(element.score);
    });
    var option = {
        title: {
            text: '指标分数变化趋势',
            top: 10,
            left: 10,
            textStyle: {
                fontWeight: '400'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: "{b} <br/> {a} : {c} "
        },
        xAxis: { type: 'category', data: xData },
        yAxis: {
            max: 100,
        },
        series: [
            { type: 'bar', name: '分数', barWidth: 25, data: yData },
        ]
    };
    let echc = echarts.init(el);
    echc.setOption(option);
}

Echarts.prototype.pieChart = function (el, value1, value2, value3) {
    var option = {
        title: {
            text: '城市分数占比图',
            left: '10',
            textStyle: {
                fontWeight: '400',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br />城市统计：{c}<br />占比：{d}%'
        },
        series: [
            {
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                data: [
                    {
                        value: value1,
                        name: '80-100分',
                        itemStyle: {
                            normal: {
                                color: 'rgb(12, 162, 148)'
                            }
                        }
                    },
                    {
                        value: value2,
                        name: '60-80分',
                        itemStyle: {
                            normal: {
                                color: 'rgb(217, 123, 36)'
                            }
                        }
                    },
                    {
                        value: value3,
                        name: '60分以下',
                        itemStyle: {
                            normal: {
                                color: 'rgb(215, 57, 73)'
                            }
                        }
                    }
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
    let echc = echarts.init(el);
    echc.setOption(option);
};

export default Echarts
