var handel = function(data){
   //console.log(data);
    var number = parseFloat(data.value);
    var option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: { formatter: '{value}%' },
                data: [{
                    name: '',
                    value: (number*100).toFixed(2)
                }],
                axisLine: {
                    show: true,
                    lineStyle: {       // 属性lineStyle控制线条样式  
                        color: [[number, '#c23531'], [1, '#63869e']]
                    }
                },
                splitLine: {
                    show: false
                },
                pointer: {
                    show: false
                },
                splitNumber: {
                    show: false
                },
                radius: "100%"
            }
        ]
    };
    return option
}

export default handel;