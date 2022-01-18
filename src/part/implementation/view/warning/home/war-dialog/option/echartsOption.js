function echOption(data,title,dw) {
    var option = {
        title: {
            text: title,
            subtext: '单 位: ' + dw,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: "{b} <br/>{a} : {c} "+data.unitCodeArray[0]
        },
        toolbox: {
            show: true,
            feature: {
                // dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            },
            right: 100,
            itemSize: 20
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.xData,
            axisLabel: {
                margin: 18
            },
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            // data: data.yData,
            axisLabel: {
                margin: 18
            },
            min : 0
        },
        series: [
            {
                name: '监测值',
                type: 'line',
                data: data.seriesData,
                lineStyle: {
                    color: 'rgb(56, 190, 176)'
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(56, 190, 176)'
                    }
                }
            },
            {
                name: '监测值',
                type: 'bar',
                data: data.seriesData,
                lineStyle: {
                    color: '#3bbfb1'
                },
                barWidth: 30,
                itemStyle: {
                    color: '#3c515f',
                }
            }
        ]
    };
    return option;
}

export default echOption;
