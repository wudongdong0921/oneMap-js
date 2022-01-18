////////////////////////////////////////////////
// 约束突破预警
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import districtLinkage from "../../../../../common/districtLinkage";
import MapBoxGl from '../otherPage/map'
import FoldPanel from '../../../../../common/foldPanel';
import BoxCardView from '../../../../../common/boxCard';
export default {
    render: function () {
        this.components();
    },
    // 初始化公共组件
    components() {
        let _this = this;
        this._linkage = new districtLinkage(this.$el.find(".area-tree"))// 行政区划选择器注册
        this.foldPanelView = new FoldPanel();
        // 全局映射
        this.$store = new $store.cotStore(); // 初始化公共数据存放，包含相关方法。一般用于调用方法；
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
        _this.$api.indexList({
            adCode: _this.$states.adCode,
            indexNatureCode: 'YSX',
            monitorSituation: '3'
        }, function (res) {
            if (res.code == 0 && res.data.length > 0) {
                // 处理面板所需的数据
                _this.$store.handelPlaneData(res.data);
                _this.renderFoldPanelView(res.data, callback);

                _this.$el.find('.bearer-left').removeClass('bearer-left-class');
                _this.$el.find('.bearer-right').removeClass('bearer-left-class');
                _this.$el.find(".bearer-right").empty();
                _this.$el.find(".bearer-right").append('<div class="polyline"></div>');
            } else {
                if (callback) {
                    callback()
                }
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
    renderFoldPanelView(data, callback) {
        var _this = this;
        // 渲染外层面板
        console.log(_this.$states.planTitleList)
        this.foldPanelView.render(_this.$states.planTitleList, _this.$states.defaultShowSubIndex)
        this.$el.find('.bearer-left').empty();
        this.$el.find('.bearer-left').append(this.foldPanelView.init());
        var isFirst = true;
        for (let i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.IndicatorData.length > 0) {
                var defaultSelectIndex = -1;
                if (isFirst) {
                    defaultSelectIndex = 0;
                    _this.$store.setData('zbxxxbId', item.IndicatorData[0].zbxxxbId)
                    _this.$store.setData('echartTitle', (item.IndicatorData[0].indexName.length < 20) ? item.IndicatorData[0].indexName : item.IndicatorData[0].indexName.substring(0, 19) + '...')
                    isFirst = false;
                    console.log('第一次执行选中值')
                    // 更新行政区划-》更新指标-》时间-》更新地图-》更新右侧
                    _this.changeInit()
                }
                this.fnInitBoxCardViews('divId' + i, item.IndicatorData, defaultSelectIndex);// 渲染折叠面板内容
            }
        }
    },
    changeInit() {
        this.rederBarChart(); // 渲染右侧图表
        this.initMap()// 渲染基本地图
    },

    /**
    * 渲染左侧折叠组件里面的指标列表
    * @param {折叠组件的id} idView
    * @param {*} data
    */
    fnInitBoxCardViews(idView, data, defaultSelectIndex) {
        let _this = this;
        var boxcardViews = new BoxCardView({
            el: _this.$el,
            idView: idView,
            headerTitle: '国土开发强度',// 标题名称
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
                title: '更新时间：',
                isHaveDiv: 0,// 是否有右侧对应项 0是没有  1是有
            },
            data: [],
            statusData: _this.$states.statusObj,
            defaultSelectIndex: defaultSelectIndex,
            onClick: function (item) {
                _this.$store.setData('zbxxxbId', item.zbxxxbId)
                _this.$store.setData('echartTitle', item.title)
                _this.changeInit()
                // _this.fnRenderMap();
            }
        });
        var boxData = [];
        data.forEach(element => {
            boxData.push({
                title: element.indexName,
                monitoringValue: element.monitoringValue,
                planTyv: element.planTyv,
                status: element.monitorSituation,
                zblxId: element.zblxId,
                zbxxxbId: element.zbxxxbId,
                zbjcId: element.zbjcId,
                unitCode: element.unitCode == null ? '' : element.unitCode
            });
        });
        boxcardViews.reset(boxData);
        boxcardViews.on('onClickInfo', (data) => {//点击左下角详情事件
            _this.fnGetIndexDetailData(data.zbjcId, data.title, data.unitCode);//获取指标详情走势图
        });
    },
    // 渲染右侧柱状图
    rederBarChart(res) {
        var _this = this;
        _this.$api.statisticalColumnChart({
            adCode: _this.$states.adCode,
            zbxxxbId: _this.$states.zbxxxbId,
            monitorSituation: 3
        }, function (res) {
            if (res.code == 0) {
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
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                            data: yData
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
            }
        });
    },
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
    destroyed: function () { },
};

