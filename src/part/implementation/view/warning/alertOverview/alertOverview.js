////////////////////////////////////////////////
// 预警总览
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import districtLinkage from "../../../../../common/districtLinkage";
import Echarts from './otherPage/echarts'
import MinCards from '../common/minCardIndex'

export default {
    adCode: '',
    adCodeName: '',
    render() {
        this.fnInitAreaView();
    },
    fnInitAreaView() {
        let _this = this;
        var areaView = new districtLinkage(this.$el.find(".area-list"));
        var userData = icu.session.get("userInfo");
        areaView.setUserData(userData.areacodeList);
        areaView.onChange((data) => {
            this.adCodeName = data.dictLabel;
            this.adCode = data.dictValue;
            this.$el.find('.area-list').text(data.dictLabel);
            this.fnInitIndexOverview();
            this.fnWarningTrendChart();
            this.fnWarningColumnChart();
        });
        // 2021-04-13 陈薪名 新增生成预警报告
        $('#scyjbg').click(function(){
            _this.$api.generateAlertReport({
                adCode: _this.adCode,
                adCodeName: _this.adCodeName,
            }, function (res) {
                window.location.href = res.data
                // var _dialog = implementationDialog({
                //     top: '45px',
                //     width: '80%',
                //     height: '90%',
                //     path: '/affixFileView',
                //     title: '预警报告.pdf',
                // });
                // setTimeout(function () {
                //     _dialog.content.set(null, '预警报告.pdf',res.data);
                // }, 200);
            });
        });
    },
    /**
     * 初始化指标总览
     */
    fnInitIndexOverview() {
        let _this = this;
        var minCards = new MinCards({ title: '指标总览' });
        this.$api.indexOverview2({
            adCode: _this.adCode,
        }, function (res) {
            if (res.code == 0) {
                if(res.data){
                    _this.fnInitIndexOverviewData(res.data);
                }else{
                    _this.fnInitIndexOverviewData({
                        allIndex:'0',
                        zc:'0',
                        yj:'0',
                        cb:'0'
                    });
                }
                _this.$el.find('.war-left-top').empty();
                _this.$el.find('.war-left-top').append(minCards.render(indexOverviewData));
            }
        });
    },
    fnInitIndexOverviewData(data) {
        indexOverviewData[0].parameterValue = data.allIndex;
        indexOverviewData[1].parameterValue = data.zc;
        indexOverviewData[2].parameterValue = data.yj;
        indexOverviewData[3].parameterValue = data.cb;
        this.fnPieChart(data);
    },
    fnPieChart(data) {
        var echarts = new Echarts();
        echarts.pieChart(this.$el.find(".war-left-pie")[0], data.yj, data.zc, data.cb);
    },
    fnWarningTrendChart() {
        var resLength = 0;
        var _this = this;
        if (_this.setintervalWarning) {
            clearInterval(_this.setintervalWarning);
        }
        _this.setintervalWarning = '';
        this.$api.warningTrendChart({
            adCode: _this.adCode,
        }, function (res) {
            if (res.code == 0) {
                _this.res = res.data;
                var echarts = new Echarts();
                // 2021-05-28 陈薪名 修改bug HNXGTKJ-1724 
                // 如果结果集大于7条数据，获取第7条数据；反则取最大长度的数据
                var resLength = res.data.length;
                var array = [];
                if (res.data.length >= 7) {
                    for (var i=6;i>0; i-- ) {
                        array.push(res.data[i]);
                    }
                } else if(res.data.length > 0 && res.data.length < 7){
                    for (var i=res.data.length-1;i>=0; i-- ) {
                        array.push(res.data[i]);
                    }
                }
                echarts.barAndLineChart(_this.$el.find('.war-right-top')[0],array,(echc,option)=>{
                    //50秒后，重新获取新数据，目前测试用可以，正式环境时间可换成5分钟
                    _this.setintervalWarning = setInterval(()=>{ 
                        _this.$api.warningTrendChart({
                            adCode: _this.adCode,
                        }, function (resSecond) {
                            // 模拟新数据--------------
                            // var newArray = [];
                            // newArray.push({yjzb: "29", yczb: "31", cbzb: "30", dataOfScore: "2021-05-30"})
                            // newArray.push({yjzb: "29", yczb: "29", cbzb: "29", dataOfScore: "2021-05-29"})
                            // newArray.push({yjzb: "28", yczb: "32", cbzb: "28", dataOfScore: "2021-05-28"})
                            // resSecond.data.forEach(element => {
                            //     newArray.push(element);
                            // });
                            // resSecond.data = newArray;
                            // 模拟新数据--------------
                            // 如果结果集有发生变化，
                            if (resLength !== resSecond.data.length) {
                                if (resSecond.data.length > 7) {
                                    setinterval(resSecond.data.length - resLength,resSecond);
                                } else {
                                    setintervalAdd(resSecond.data.length - resLength,resSecond);
                                }
                            }
                            resLength = resSecond.data.length;
                        });
                    },50000)
                    
                    // 数据大于7条时，消除最后数据，添加最新数据
                    function setinterval(maxLength,resSecond){
                        // 2秒循环，加载数据渐入效果.
                        var i = maxLength - 1;
                        var interval = setInterval(()=>{
                            if (i == -1) {
                                clearInterval(interval);
                                return;
                            }
                            var data0 = option.series[0].data;
                            var data1 = option.series[1].data;
                            var data2 = option.series[2].data;
    
                            data0.shift();
                            data0.push(resSecond.data[i].cbzb);
                            data1.shift();
                            data1.push(resSecond.data[i].yjzb);
                            data2.shift();
                            data2.push(resSecond.data[i].yczb);
    
                            option.xAxis[0].data.shift();
                            option.xAxis[0].data.push(resSecond.data[i].dataOfScore);
    
                            echc.setOption(option);
                            i = i - 1;
                        },2000)
                    }
                    // 数据小于7条时，只添加数据渲染
                    function setintervalAdd(maxLength,resSecond){
                        // 2秒循环，加载数据渐入效果.
                        var i = maxLength - 1;
                        var interval = setInterval(()=>{
                            if (i == -1) {
                                clearInterval(interval);
                                return;
                            }
                            var data0 = option.series[0].data;
                            var data1 = option.series[1].data;
                            var data2 = option.series[2].data;
    
                            data0.push(resSecond.data[i].cbzb);
                            data1.push(resSecond.data[i].yjzb);
                            data2.push(resSecond.data[i].yczb);
    
                            option.xAxis[0].data.push(resSecond.data[i].dataOfScore);
    
                            echc.setOption(option);
                            i = i - 1;
                        },2000)
                    }
                });
            }
        });

    },
    fnWarningColumnChart() {
        var _this = this;
        this.$api.warningColumnChart({
            adCode: _this.adCode,
        }, function (res) {
            if (res.code == 0) {
                var echarts = new Echarts();
                echarts.barChart(_this.$el.find('.war-right-bottom')[0], res.data);
            }
        });
    },
    destroyed() {

    },
}

var indexOverviewData = [{
    title: '监测指标',
    parameterValue: '0',
    unit: '项',
    state: '0', // 0未检测 1正常指标 2预警指标 3超标指标  
}, {
    title: '正常指标',
    parameterValue: '0',
    unit: '项',
    state: '1', // 0未检测 1正常指标 2预警指标 3超标指标  
}, {
    title: '预警指标',
    parameterValue: '0',
    unit: '项',
    state: '2', // 0未检测 1正常指标 2预警指标 3超标指标  
}, {
    title: '超标指标',
    parameterValue: '0',
    unit: '项',
    state: '3', // 0未检测 1正常指标 2预警指标 3超标指标  
}]