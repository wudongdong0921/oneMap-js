function ech(option,el,type){
    if(type === 'line'){
        option = {
            title: {
                text: '水资源评价变化趋势',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: "{a} <br/>{b} : {c} "
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2020年', '2021年', '2022年','2023年','2024年','2025年'],
                axisLabel:{
                    margin: 18
                },
            },
            yAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['可载','临界超载','超载'],
                axisLabel:{
                    margin: 18
                },
            },
            series: [
                {
                    name: '状态',
                    type: 'line',
                    data: ['临界超载', '可载','临界超载', '临界超载', '超载', '超载'],
                    lineStyle:{
                        color:'rgb(56, 190, 176)'
                    },
                    itemStyle : {
                        normal : {
                            color:'rgb(56, 190, 176)'
                        }
                    }
                }
            ]
        };
    }else if(type === 'pie'){
         option = {
            title: {
                text: option.title,
                left: option.left,
                right: option.right,
                top: option.top,
                bottom: option.bottom,
                textStyle: {
                    fontWeight: '400',
                    fontSize: 16
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} %"
            },
            series: option.series
          };
          console.log('-------------------------------------')
          console.log(option)
    }else if(type === 'bar'){
        option = {
            title: {
                text: '2020年 生态保护红线控制面积监测情况',
                subtext: '单位：平方千米',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年'],
                top: '10%'
            },
            grid: {
                top: '20%',
                left: '1%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['XX市', 'XX市', 'XX市', 'XX市', 'XX市', 'XX市']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230],
                    barWidth: 15
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807],
                    barWidth: 15
                }
            ]
        };
    }else if(type === 'a'){
        option = {
            title: {
                text: '基础雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '销售（sales）', max: 6500},
                    { name: '管理（Administration）', max: 16000},
                    { name: '信息技术（Information Techology）', max: 30000},
                    { name: '客服（Customer Support）', max: 38000},
                    { name: '研发（Development）', max: 52000},
                    { name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '预算分配（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '实际开销（Actual Spending）'
                    }
                ]
            }]
        };

    }
  let echc = echarts.init(el);
  echc.setOption(option);
}

export default ech