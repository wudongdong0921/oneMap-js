////////////////////////////////////////////////
// 边界突破预警
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import districtLinkage from "../../../../../common/districtLinkage";
import BoxCardView from '../../../../../common/boxCard';
import MapBoxGl from '../otherPage/map'

export default {
    render: function () {
        this.components();
    },
    // 初始化公共组件
    components() {
        let _this = this;
        this._linkage = new districtLinkage(this.$el.find(".area-tree"))// 行政区划选择器注册
        // 全局映射
        this.$store = new $store.bdStore(); // 初始化公共数据存放，包含相关方法。一般用于调用方法；
        this.$states = this.$store.$state; // 方便调用;一般用于获取属性值；
        // 执行开始业务逻辑
        this.initLogic();
    },
    initLogic() {
        let _this = this;
        this._linkage.setUserData(_this.$store.getUserAcodeList());
        this._linkage.onChange((data) => {
            _this.$el.find('.area-tree').text(data.dictLabel); // 渲染行政区划
            _this.$store.setData('adCode', data.dictValue); // 定义全局行政区划号
            _this.$store.closePlayStatus();// 行政区划改变后需要关闭轮播
            _this.$store.clearIntervalAuto(); //行政区变化时清除定时任务
            _this.$store.handelDep(); // 判断控制市县级别处理。

            this.renderIndicator(function () { }) // 渲染左侧指标数据

            console.log('state%o', this.$states)
        })
    },
    renderIndicator(callback) { // 渲染左侧指标数据
        let _this = this;
        _this.$api.boundaryControlIndicatorsInfo({
            adCode: _this.$states.adCode,
            monitorSituation: '3'
        }, function (res) {
            if (res.code == 0 && res.data.length > 0) {
                // 处理左侧列表所需的数据
                _this.$store.handelPlaneData(res.data)
                _this.renderFoldPanelView(res.data, callback);
                _this.$el.find('.bearer-left').removeClass('bearer-left-class');
                _this.$el.find('.bearer-right').removeClass('bearer-left-class');
                _this.$el.find(".bearer-right").empty();
                _this.$el.find(".bearer-right").append('<div class="polyline"></div>');
            } else {
                // 无数据，显示暂无数据
                _this.$el.find('.map').empty();
                _this.$el.find('.map').append('<div style="text-align:center;display:inline-flex;color:#cac3c3;position: relative; top: 50%; left: 50%;">暂无数据</div>');
                
                _this.$el.find('.bearer-left').empty();
                _this.$el.find(".bearer-right").empty();
                _this.$el.find('.bearer-left').addClass('bearer-left-class')
                    .append('<div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div>');
                _this.$el.find(".bearer-right").addClass('bearer-left-class')
                    .append('<div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div>');
            }
        })
    },
    changeInit() {
        this.rederBarChart(); // 渲染右侧图表
        this.initMap()// 渲染基本地图
    },

    renderFoldPanelView() {
        var _this = this;
        if (this.boxcardViews == null) {//如果指标列表组建没有初始化，就进行初始化
            this.boxcardViews = new BoxCardView({
                el: _this.$el,
                classView: 'bearer-left',
                headerTitle: '',// 标题名称
                bodychild: [{// 定义卡片内容
                    key: '监测值',// 卡片标题
                    enKey: ['monitoringValue'],
                    iconImg: 'value.png',// 卡片标题图片
                    value: 1,// 卡片内容显示列表数量
                }, {
                    key: '规划指标',
                    enKey: ['planTyv'],
                    iconImg: 'ruler.png',
                    value: 1,
                }],
                bodyUnti: '平方千米',
                buttomChild: {// 卡片底部的第一种情况，可根据数组进行扩展
                    key: '详情',
                    style: { color: 'blue', cursor: 'pointer' },
                    title: '',
                    isHaveDiv: 0,// 是否有右侧对应项 0是没有  1是有
                },
                data: [],
                defaultSelectIndex: 0,
                statusData: _this.$states.statusObj,
                onClick: function (item) { //点击一条指标列表数据时，刷新柱状图，且刷新地图
                    _this.$store.setData('echartTitle', item.title)
                    _this.$store.setData('zbxxxbId', item.zbxxxbId)
                    // 刷新柱状图以及地图
                    _this.changeInit()
                }
            });
            this.boxcardViews.on('onClickInfo', (data) => {//点击左下角详情事件
                _this.fnGetIndexDetailData(data.zbjcId, data.title, data.unitCode);//获取指标详情走势图
            });
            this.boxcardViews.reset(this.$states.indexListData);

        } else { //如果指标列表组建已经初始化，就直接刷新数据
            this.boxcardViews.reset(this.$states.indexListData);
        }
        _this.changeInit()
        //this.rederBarChart(); //刷新柱状图
    },
    // 渲染右侧柱状图
    rederBarChart() {
        var _this = this;
        _this.$api.statisticalColumnChart({
            adCode: _this.$states.adCode,
            zbxxxbId: _this.$states.zbxxxbId,
            monitorSituation: 3
        }, function (res) {
            if (res.data.timeTrendChart.length > 0) {
                _this.$el.find(".bearer-right").empty();
                _this.$el.find(".bearer-right").append('<div class="polyline"></div>');
                let echc = echarts.init(_this.$el.find(".polyline")[0]);
                var yData = [];
                var seriesData = [];
                res.data.timeTrendChart.forEach(element => {
                    yData.push(element.xzqhName);
                    seriesData.push((element.monitoringValue - parseInt(element.planTyv)).toFixed(2));
                });
                var option = {
                    title: {
                        text: '监测值与规划值差值统计表',
                        subtext: '单位：' + res.data.unitCode[0],
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: '20%',
                        left: '1%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: yData,
                        // axisLine: {
                        //   onZero : false
                        // }
                    },
                    series: [
                        {
                            name: '差值',
                            type: 'bar',
                            data: seriesData,
                            barWidth: 15
                        }
                    ]
                };
                echc.setOption(option);
            } else {
                _this.$el.find('.bearer-right').empty();
                _this.$el.find('.bearer-right').addClass('bearer-left-class')
                    .append('<div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div>');
            }
        });
    },
    // 初始化地图

    initMap() {
        var _this = this;
        var mapBoxView = new MapBoxGl();
        this.$el.find('.map').empty();
        this.$el.find('.map').append(mapBoxView.render());
        var isNeedZoom = this.$store.isNeedZoom();
        this.$api.getMapGeojson(_this.$states.adCode, isNeedZoom, (res) => {
            mapBoxView.setCenter(res, isNeedZoom,()=>{
                this.getMapGeoJsons(mapBoxView);
            })
        }, mapBoxView.loading);
    },
    getMapGeoJsons(mapBoxView) {
        var _this = this
        var acc = this.$states.adCode + '_full'
        if (this.$store.isNeedZoom() == 2) {
            acc = this.$states.adCode
        }
        this.$api.getMapGeojson(acc, this.$states.dep, (res) => {

            mapBoxView.renderMapView(res);
            this.fnRenderColorMap(mapBoxView, res);
        }, mapBoxView.loading);
        if (_this.$states.autoPlay) {
            _this.$states.nextPlay = true;
        }
    },
    fnRenderColorMap(mapBoxView, mapData) { // 地图上色
        var _this = this;
        var areas = [];
        mapData.forEach(element => {
            areas.push(element);
        });
        this.$api.boundaryControlIndicatorsMap({
            adCode: _this.$states.adCode,
            zbxxxbId: _this.$states.zbxxxbId,
            monitorSituation: 3
        }, function (res) {
            if (res.code == 0) {
                mapBoxView.addColorLayer(_this.$store.fnBuildColorLayerParam(res.data, areas), {
                    isShowPopup: true,
                    type: 'index',
                    areaNameKey: 'xzqhName'
                });
            }
        });
    },

    /**
     * 点击左侧指标列表详情，打开走势图dialog
     * @param {指标检查id} zbjcId
     * @param {指标名称} title
     *  @param {指标单位} dw
     */
    fnGetIndexDetailData(zbjcId, title, dw) {
        this.$api.indexMonitorList({
            zbjcId: zbjcId
        }, function (res) {
            if (res.code == 0) {
                implementationDialog({
                    top: '100px',
                    width: '50%',
                    height: '80%',
                    path: '/warning/home/war-dialog',
                    title: '监测值走势',
                    params: {
                        indexMonitorList: res.data,
                        title: title,
                        dw: dw
                    },
                    events: {}
                });
            }
        });
    },
    // 重构前

    destroyed: function () { },
};