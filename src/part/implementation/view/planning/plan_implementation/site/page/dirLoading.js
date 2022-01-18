var DirLoading = function () {
    var _this = this;
    this._html = $('<div>' +
        '<div class="layui-row layui-col-space5">' +
        '    <div class="layui-col-md8">' +
        '        <div class="layui-row grid-demo">' +
        '            <div class="layui-col-md12" id="staticInfoBtn"></div>' +
        '            <div class="layui-col-md12" id="staticEachart"  style="width: 600px;height:200px;"></div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>');
    this.event = {
        staticOn:function(){}
    }
    this.staticInfoBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i>统计详情</div>');
    this._html.find('#staticInfoBtn').append(this.staticInfoBtn);
    this.newChart = new Eachart(this._html.find('#staticEachart')[0]);
    this.staticInfoBtn.unbind().bind('click',function(){
        _this.event.staticOn()
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
var Eachart = function (el) {
    this.myChart = echarts.init(el);
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['极重要', '重要', '一般重要']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
            },
            show: true,
            max: 100
        },
        yAxis: {
            type: 'category',
            data: []
        },
        series: [
            {
                name: '极重要',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                barWidth: 40,
                data: [20],
                itemStyle: {
                    color: "rgba(20, 162, 79, 1)",
                    borderColor: "rgba(20, 162, 79, 1)"
                }
            },
            {
                name: '重要',
                type: 'bar',
                stack: '总量',
                barWidth: 40,
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [12],
                itemStyle: {
                    color: "rgba(34, 154, 84, 0.83)",
                    borderColor: "rgba(34, 154, 84, 0.83)"
                }
            },
            {
                name: '一般重要',
                type: 'bar',
                stack: '总量',
                barWidth: 40,
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: [22],
                itemStyle: {
                    color: "rgba(34, 154, 84, 0.59)",
                    borderColor: "rgba(34, 154, 84, 0.59)"
                }
            }
        ]
    };
    this.myChart.setOption(option);
}
export default DirLoading