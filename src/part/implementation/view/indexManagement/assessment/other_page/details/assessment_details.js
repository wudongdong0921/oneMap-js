////////////////////////////////////////////////
// 指标管理-指标实施评估值-详情
// 杨爽
// 2020-11-09 13:50:59
////////////////////////////////////////////////

export default {
    render: function () {
        var _this = this;
        console.log(_this.$data);
        // console.log(_this.$data)
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                // 2021-03-31 陈薪名 修改 标题显示
                // text:'万人发明专利拥有量',
                // subtext:'单位：万人/件',
                text: _this.$data.indexName,
                subtext:'单位：' + (_this.$data.unitCode == null ? '' : _this.$data.unitCode),
                x:'50%',
                y:'top',
                textAlign:'center',
                fontSize:18,
                subtextStyle:{
                    fontSize:16,
                    color:'#000',
                }
            },
            tooltip: {},
            grid: {
                top: "25%",
                right: "0",
                bottom: "20",
                left: "45"
            },
            toolbox: {
                // 2021-03-31 陈薪名 修改 工具栏位置微调
                x: '520',
                y: '25',
                feature: {
                    // dataZoom: {
                    //     yAxisIndex: 'none'
                    // },
                    // restore: {},
                    // saveAsImage: {}
                }
            },
            xAxis: {
                data:[]
            },
            yAxis: {},
            series: [{
                    //2021-5-24 16:44:33刘长明修改鼠标进入提示名(检测值修改为评估值)
                    name: '评估值',
                    type: 'bar',
                    barWidth: "30",
                    itemStyle: {
                        normal: {
                        barBorderRadius: 0,
                        color: "#4F81BD"
                        }
                    },
                    data: []
                },{
                    //2021-5-24 16:44:33刘长明修改鼠标进入提示名(检测值修改为评估值)
                    name: "评估值",
                    type: "line",
                    data: [],
                    lineStyle: {
                        normal: {
                        width: 2
                        }
                    },
                    itemStyle: {
                        normal: {
                        color: "#FCC519"
                        }
                    },
                }
            ]
        };
        function refreshData(data){
            //刷新数据
             var yearArr =[];
             var ieValueArr = [];
             for (let index = 0; index < data.data.length; index++) {
                yearArr.push(data.data[index].year)
                ieValueArr.push(data.data[index].ieValue);
             }
             option.xAxis.data = yearArr;
             option.series[0].data=ieValueArr;
             option.series[1].data=ieValueArr;   
             myChart.setOption(option);    
       }
       
        _this.$api.ieInfoList({
            // zbghzId:'51eb716f1072432eb9a6a347db4d6449', 
            zbghzId:_this.$data.zbghzId,
        }, function (res) {
            refreshData(res);   //自定义刷新的时候调用  
        });
    },
    destroy: function () {

    },
};