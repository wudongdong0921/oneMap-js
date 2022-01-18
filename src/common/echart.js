var EchartView = function (parame) {
    let echc = echarts.init(parame.el);
    echc.setOption(parame.option);
}
export default EchartView;