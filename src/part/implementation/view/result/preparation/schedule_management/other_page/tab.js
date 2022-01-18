////////////////////////////////////////////////
// 
// 李雪
// 2020-10-26 11:48:05
////////////////////////////////////////////////

var tabItem = function (name, parent) {
    this.parent = parent;
    this.name = name;
    this.html = $(`<li class="">${name}</li>`)
    this.event = {
        active: function () { },

    };

    this.html.unbind().bind('click', () => {
        this.parent.activeChild(this.name)
        this.parent.event.activeEvent(this.name);
    })
}
tabItem.prototype = {
    render: function () {
        return this.html
    },
    onactive: function (event) {
        this.event.active = event;
    },
    active: function () {
        this.html.addClass('layui-this');
    },
    unactive: function () {
        this.html.removeClass('layui-this');
    }
}

var tabView = function () {
    this.childrenlist = [];
    this.html = $(`
        <div>
            <h2 style="line-height:50px">规划编制进度</h2>
            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                <ul class="layui-tab-title tabBox" style="text-align: center">
                                    
                </ul>
                <div class="layui-tab-content chartBox" >
                    <div class="layui-tab-item layui-show" style="height: 500px;"><div id="chartShow" style="height: 100%;"></div></div>
                </div>
            </div> 
        </div>
    `)
    this.event = {
        activeEvent: function (e) { }
    }

}
tabView.prototype = {
    constructor: this,
    render: function () {

        return this.html
    },
    initData: function (type) {
        this.html.find('.tabBox').empty()
        if (type == "province") {
            var name = ['省级', '市级', '县级']
        } else if (type == "city") {
            var name = ['市级', '县级']
        } else {
            var name = ['县级']
        }
        this.childrenlist = [];
        for (let i = 0; i < name.length; i++) {
            const element = name[i];
            var tabChild = new tabItem(element, this);
            this.childrenlist.push(tabChild)
            this.html.find('.tabBox').append(tabChild.render())
        }
        this.activeChild(name[0])

    },
    onActiveEvent: function (event) {
        this.event.activeEvent = event

    },
    initChart(options) {
        //console.log(echarts)
        console.log(options);
        if(options){
            for(let item of options){
                switch(item.name){
                    case '暂无进度':
                        item.itemStyle = {
                            normal: {
                                color: '#F3F3F3FF',//移入前的颜色
                            },
                            emphasis:{
                                color:"#F3F3F3FF",//移入后的颜色
                            }
                        }
                        break;
                    case '制定方案':
                        item.itemStyle = {
                            color: '#e2e0e0'
                        }
                        break;
                    case '建立专家咨询机制':
                        item.itemStyle = {
                            color: 'rgb(170, 170, 170)'
                        }
                        break;
                    case '展开专题研究':
                        item.itemStyle = {
                            color: 'rgb(139, 178, 231)'
                        }
                        break;
                    case '完成初步方案':
                        item.itemStyle = {
                            color: 'rgb(92, 152, 231)'
                        }
                        break;
                    case '成果汇总':
                        item.itemStyle = {
                            color: 'rgb(46, 125, 231)'
                        }
                        break;
                    case '成果报批':
                        item.itemStyle = {
                            color: 'rgb(42, 83, 147)'
                        }
                        break;
                }
            }
        }
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 10,
            //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            // },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: options
                }
            ]
        };
        this.myChart = echarts.init(this.html.find('#chartShow')[0]);

        this.myChart.setOption(option);
    },
    activeChild(name) {
        //console.log(item)
        for (let i = 0; i < this.childrenlist.length; i++) {
            const element = this.childrenlist[i];
            element.unactive()
            if (element.name == name) {
                element.active()
                this.initChart()
            }
        }
    }

}
export default tabView

