////////////////////////////////////////////////
// 指标管理-指标监测值-详情
// 杨爽
// 2020-11-09 13:50:59
////////////////////////////////////////////////


export default {
    render: function () {
        var _this = this;
        console.log(_this.$data);
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                // 2021-03-31 陈薪名 修改 标题显示
                // text:'万人发明专利拥有量',
                // subtext:'单位：万人/件',
                text: _this.$data.indexName,
                //刘长明修改 监测值走势，单位为空时，不显示null 
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
            //刘长明修改
            // toolbox: {
            //     // 2021-03-31 陈薪名 修改 工具栏位置微调
            //     x: '520',
            //     y: '25',
            //     feature: {
            //         // dataZoom: {
            //         //     yAxisIndex: 'none'
            //         // },
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                data:[]
            },
            yAxis: {},
            series: [{
                    name: '监测值',
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
                    name: "监测值",
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
             var monitoringValueArr = [];
             for (let index = data.scoreList.length-1; index >= 0 ; index--) {
                yearArr.push(data.scoreList[index].dataOfScore)
                monitoringValueArr.push(data.scoreList[index].monitoringValue)
             }
             option.xAxis.data = yearArr;
             option.series[0].data=monitoringValueArr;
             option.series[1].data=monitoringValueArr;   
             myChart.setOption(option);    
       }
        _this.$api.indexScoreList({
            // xzqhId:'230000',
            // zbxId:'974d0090d221c0e34cf341dfe2410336', 
            xzqhId:_this.$data.xzqhId,
            zbxId:_this.$data.zbxxxbId,      
        }, function (res) {
            // 2021-05-26 陈薪名 修改bug HNXGTKJ-1578 
            var scoreList = [];
            var dataOfScore = '';
            if (res.scoreList.length > 0) {
                for (let i =0;i<res.scoreList.length; i++){
                    if (dataOfScore !== res.scoreList[i].dataOfScore) {
                        scoreList.push(res.scoreList[i])
                    }
                    dataOfScore = res.scoreList[i].dataOfScore;
                }
            }
            res.scoreList = scoreList;
            refreshData(res);   //自定义刷新的时候调用  
        });
    },
    destroy: function () {

    },
};