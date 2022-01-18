
var tabItem2 = function (name, parent) {
    this.parent = parent;
    this.name = name;
    this.html = $(`<div class="item" id="province">${name}</div>`)
    this.event = {
        active: function () { },

    };

    this.html.unbind().bind('click', () => {
        this.parent.activeChild(this.name)
        this.parent.event.activeEvent(this.name);
    })
}
tabItem2.prototype = {
    render: function () {
        return this.html
    },
    onactive: function (event) {
        this.event.active = event;
    },
    active: function () {
        this.html.addClass('active');
    },
    unactive: function () {
        this.html.removeClass('active');
    }
}

var ChartTab2 = function (allData) {
    this.renderData = allData;
    this.childrenlist = []
    this.$html = $(`<div class="">
                    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                        <div class="layui-tab-content chartBox" >
                            <div class="layui-tab-item layui-show" style="height: 400px;">
                                <div id="chartShow" style="height: 80%;"></div>
                            </div>
                        </div>
                    </div>
                </div>`);

    // 添加监听事件
    this.event = {
        onChangeTab: function () { },
        changeChart: function () { },
        activeEvent: function () { }
    };

}
ChartTab2.prototype.render = function () {
    return this.$html
}

ChartTab2.prototype.onActiveEvent = function (event) {
    this.event.activeEvent = event

}

ChartTab2.prototype.initChart = function (options2, options3) {

    var option = {
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            down: 'left',
        },

        series: [
            {
                name: '',
                type: 'pie',
                radius: '75%',
                center: ['25%', '55%'],
                data: options2,
                startAngle: 90,
                label: {
                    normal: {
                        position: "inner",
                        show: false
                    }
                },
            },
            {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['75%', '55%'],
                data: options3,
                label: {
                    normal: {
                        position: "inner",
                        show: false
                    }
                },
            }
        ]
    };
    var myChart = echarts.init(this.$html.find('#chartShow')[0]);
    myChart.setOption(option);
    //myChart.on("click", pieConsole);
    //function pieConsole(param) {

        //     获取data长度
        //alert(option.series[0].data.length);
        //      获取地N个data的值
        // 　　alert(option.series[0].data[i]);
        //     获取series中param.dataIndex事件对应的值
        //alert(param.value);
        //alert(param.name);
        //alert(option.series[param.seriesIndex].data[param.dataIndex].value);
        //alert(option.series[param.seriesIndex].data[param.dataIndex].name);
        // 　　clickFunc(param.dataIndex);//执行点击效果,触发相应js函数
        //param具体包含的方法见 https://blog.csdn.net/allenjay11/article/details/76033232

        //刷新页面
        // location.reload();
        // window.location.reload();

        //if(param.name == '审查通过'){
        //    option.series[0].startAngle = Math.round(360 * (param.value/(options2[0].value + options2[1].value + options2[2].value))/2)
            //option.series[0].center = ["25%", "50%"]
            // option.series[1] =  {
            //     name: '',
            //     type: 'pie',
            //     radius: '55%',
            //     center: ['75%', '50%'],
            //     data: options3,
            //     label: {
            //         normal: {
            //             position: "inner",
            //             show: false
            //         }
            //     },
            // }
        //}
        // }else{
        //     option.series[0].startAngle = 90
        //     option.series.splice(1, 1)
        // }
        myChart.setOption(option);
    //}
}


export default ChartTab2;