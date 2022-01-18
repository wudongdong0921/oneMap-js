var staticChart = function(el, data) {
    this.html = el;
    this.data = data
    this.event = {
        chartSelect: function () { }    // 点击chart事件
    }

    this.view(data.res, data.colorList);
}

staticChart.prototype.view = function(res, colorList) {
    var that = this;
    
    let data = res.data;
    if (data.length <= 0) {
        if (res.backId !== "0") {
            return top.layer.msg("没有下一层了")
        } else {
            $('<div class="nodata">该项内无数据</div>').appendTo(that.html)
            return
        }
    }
    
    this.html.empty();
    var chartsDiv = $('<div id="chartsDiv" style="width: 600px; height: 440px;"></div>').appendTo(this.html)
    var statisChart = echarts.init(chartsDiv[0]);
    var option;

    if (this.data.statisData.chartStyle == 0) { 
        let chartData = [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            chartData.push({
                name: item.dictLabel,
                value: item.value,
                dataId: item.id,
                itemStyle: { color: colorList[index] } 
            });
            
        }
        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} <br /> {d} %'
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: '5%',
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'normal'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: chartData
                }
            ],
            dataId: '',
            graphic: [{
                type: 'text',
                left: 50,
                bottom: 20,
                style: {
                    text: "< 返回上一层",
                    fontSize: 14,
                    fill: '#3170BE'
                },
                onclick: function () {
                    that.event.chartSelect(res.backId);
                }
            }]
        }
    } else {
        let xAxis = [],
            chartData = [];
        for (const item of data) {
            xAxis.push(item.dictLabel);
            chartData.push({
                dataId: item.id,
                value: item.value
            });
        }
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            dataId: '',
            dataset: chartData,
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: xAxis,
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                // name: chartTitle,
                type: 'bar',
                barWidth: '60%',
                data: chartData
            }],
            graphic: [{
                type: 'text',
                left: 50,
                top: 20,
                style: {
                    text: '返回上一层',
                    fontSize: 14
                },
                onclick: function () {
                    that.event.chartSelect(res.backId);
                }
            }]
        };
    }

    statisChart.off('click').on('click', function (event) {
        if (event.componentType != "graphic") {
            that.event.chartSelect(event.data.dataId);
        }
    })

    statisChart.setOption(option);

}

staticChart.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    }
}

export default staticChart