var Echarts = function () {
    this.echc = null;
}

Echarts.prototype.barChart = function (el, data) {
    var xData = [];
    var yData = [];
    data.forEach(element => {
        xData.push(element.scoreYear);
        yData.push(element.weightGrade);
    });
    var option = {
        title: {
            text: '分数变化趋势',
            top: 10,
            left: 10,
            textStyle: {
                fontWeight: '400'
            }
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            formatter: "{a} <br/>{b} : {c} "
        },
        xAxis: { type: 'category', data: xData },
        yAxis: {

        },
        series: [
            { type: 'bar', name: '分数', barWidth: 25, data: yData },
        ]
    };
    let echc = echarts.init(el);
    echc.setOption(option);
}

Echarts.prototype.radarChart = function (el, data) {
    var seriesData = [];
    var indicatorData = [];
    var legend = [];
    data.forEach(element => {
        var value = [];
        element.weightGradeList.forEach(subItem => {
            value.push(subItem.weightGrade);
        });
        seriesData.push({
            name: element.year,
            value : value
        });
        legend.push(element.year);
    });
    if (data.length > 0) {
        data[0].weightGradeList.forEach(element => {
            indicatorData.push({
                name : element.zblxParent,
                max: 120
                //满分最大100，宽限到120，测试数据可能会超出100
                //echarts.radarChart方法只有evaluationOverview.js用，改prototype不影响其他
            });
        });
    }
    var option = {
        title: {
            text: ''
        },
        tooltip: {},
        legend: {
            data: ['标签'],
            left: 0,
            bottom : 0
        },
        legend: {
            data: legend,
            left: 0,
            top : 0
        },
        radar: {
            radius: 80, // 2021-05-07 陈薪名 修改bug HNXGTKJ-1227
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator:indicatorData
        },
        series: [{
            type: 'radar',
            data: seriesData
        }]
    };
    let echc = echarts.init(el);
    this.echc = echc;
    echc.setOption(option,true);
}

Echarts.prototype.clear = function () {
    this.echc.clear();
}

export default Echarts