
var tabItem = function (name, parent) {
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
tabItem.prototype = {
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

var ChartTab = function (allData) {
    this.renderData = allData;
    this.childrenlist=[]
    this.$html = $(`<div class="province_tab">

    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                <ul class="layui-tab-title tab_title" style="text-align: center">
                                    
                </ul>
                <div class="layui-tab-content chartBox" >
                    <div class="layui-tab-item layui-show" style="height: 400px;"><div id="chartShow" style="height: 80%;"></div></div>
                </div>
            </div> 
                                          
                </div>`);

    // 添加监听事件
    this.event = {
        onChangeTab: function () { },
        changeChart: function () { },
        activeEvent:function(){}
    };

}
ChartTab.prototype.render = function () {
    return this.$html
}
ChartTab.prototype.initData = function (type) {
    this.$html.find('.tab_title').empty()
    if (type == "province") {
        var name = ['省级', '市级', '县级']
    } else if (type == "city") {
        var name = ['市级', '县级']
    } else {
        var name = ['县级']
    }
    for (let i = 0; i < name.length; i++) {
        const element = name[i];
        var tabChild = new tabItem(element, this);
        this.childrenlist.push(tabChild)
        this.$html.find('.tab_title').append(tabChild.render())
    }
    this.activeChild(name[0])
}
ChartTab.prototype.activeChild=function(name){
    //console.log(item)
    for (let i = 0; i < this.childrenlist.length; i++) {
        const element = this.childrenlist[i];
        element.unactive()
        if (element.name == name) {
            element.active()
            //this.initChart()
        }
    }
}
ChartTab.prototype.onActiveEvent = function(event){
    this.event.activeEvent = event
    
}
ChartTab.prototype.changeChartShow = function (data) {

}
ChartTab.prototype.initChart = function (options) {
    // console.log(options);
    // 设置饼状图颜色
    // if(options){
    //     for(let item of options){
    //         switch(item.name){
    //             case '已汇交':
    //                 item.itemStyle = {
    //                     color: 'blue'
    //                 }
    //                 break;
    //             case '未汇交':
    //                 item.itemStyle = {
    //                     color: 'red'
    //                 }
    //                 break;
    //         }
    //     }
    // }
    var option = {
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     top: '5%',
        //     left: 'center'
        // },
        series: [
            {
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data:options
            }
        ]
    };
    this.myChart = echarts.init(this.$html.find('#chartShow')[0]);
    this.myChart.setOption(option);
}


// ChartTab.prototype.setItemValue = function (data) {
//     this.oneText.text(data.oneText);
//     this.twoText.text(data.twoText);
//     this.threeText.text(data.threeText);
//     this.fourText.text(data.fourText);
//     this.fiveText.text(data.fiveText);
//     this.sixText.text(data.sixText)
// }

export default ChartTab;