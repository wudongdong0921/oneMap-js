////////////////////////////////////////////////
// 预期指标
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import districtLinkage from "../../../../../common/districtLinkage";
import MapBoxGl from '../otherPage/map'
import FoldPanel from '../../../../../common/foldPanel';
import BoxCardView from '../../../../../common/boxCard';
import PlayLinePros from "../../../../../common/playLinePro";
export default {
    render: function () {
        this.components();
    },
    // 初始化公共组件
    components() {
        let _this = this;
        this._linkage = new districtLinkage(this.$el.find(".area-tree"))// 行政区划选择器注册
        this.foldPanelView = new FoldPanel();
        this._playLineView = new PlayLinePros({ el: _this.$el.find('#play_line'), auto: false })
        // 全局映射
        this.$store = new $store.exddStore(); // 初始化公共数据存放，包含相关方法。一般用于调用方法；
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
    renderIndicator() { // 渲染左侧指标数据
        let _this = this;
        _this.$api.indexList({
            adCode: _this.$states.adCode,
            indexNatureCode: 'YQX',
            year: ''
        }, function (res) {
            if (res.code == 0 && res.data.length > 0) {
                // 处理面板所需的数据
                _this.$store.handelPlaneData(res.data);
                _this.renderFoldPanelView(res.data);

                // _this.$el.find('.bearer-left').removeClass('bearer-left-class');
                // _this.$el.find('.bearer-right').removeClass('bearer-left-class');
                // _this.$el.find(".bearer-right").empty();
                // _this.$el.find(".bearer-right").append('<div class="polyline"></div>');
                $('#play_line').show();
            } else {
                // 无数据，显示暂无数据
                $('#play_line').hide();
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
    renderFoldPanelView(data) {
        var _this = this;
        // 渲染外层面板
        this.$el.find('.bearer-left').empty();
        this.$el.find('.bearer-left').removeClass('bearer-left-class')
        this.foldPanelView.render(_this.$states.planTitleList, _this.$states.defaultShowSubIndex)
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
                    // 获取年份
                    _this.getYear((res) => {
                        _this.$store.setData('year', new Date($.ajax({ async: false }).getResponseHeader("Date")).getFullYear())
                        // 刷新联动
                        _this.changeInit()
                    })
                }
                this.fnInitBoxCardViews('divId' + i, item.IndicatorData, defaultSelectIndex);// 渲染折叠面板内容
            }
        }
    },
    changeInit() {
        this.rederBarChart(); // 渲染右侧图表
        this.initMap()// 渲染基本地图
    },
    // 获取年份
    getYear(cb) {
        var _this = this;
        _this.$store.clearIntervalAuto(); // 每一次切换年份时需要清空定时
        this.$api.boundaryControlIndicatorsRotation({
            adCode: this.$states.adCode,
            zbxxxbId: this.$states.zbxxxbId
        }, function (res) {
            // 初始化时间轮播组件
            _this.initYearPlay(res.data)
            cb(res)
        })
    },
    initYearPlay(data) {
        var _this = this;
        this._playLineView.setRenderData(data);
        _this._playLineView.on('playClick', () => {
            _this.$store.closePlayStatus()
            _this.$store.clearIntervalAuto();
            _this.changeInit();
        })
        _this._playLineView.on('play', () => {
            _this.$store.startPlayStatus()
            _this.$store.setData('intervalAuto', setInterval(() => {
                if (_this.$states.nextPlay) {
                    _this.$store.setData('nextPlay', false)
                    _this._playLineView.nextPlay()
                    _this.changeInit()
                }
            }, 5000))
        })
        _this._playLineView.on('endPlay', () => {
            _this.$store.closePlayStatus()
            _this.$store.clearIntervalAuto();
        })
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
                _this.getYear(function (res) {
                    _this.$store.setData('year', _this._playLineView.getTime())
                    _this.changeInit()
                })
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
            year: _this.$states.year,
        }, function (res) {
            if (res.code == 0) {
                _this.$el.find(".bearer-right").empty();
                _this.$el.find(".bearer-right").append('<div class="polyline"></div>');
                let echc = echarts.init(_this.$el.find(".polyline")[0]);
                var yData = [];
                var seriesData1 = [];
                var seriesData2 = [];
                res.data.timeTrendChart.forEach(element => {
                    yData.push(element.xzqhName);
                    seriesData1.push(element.monitoringValue);
                    seriesData2.push(element.planTyv);
                });
                var option = {
                    title: {
                        text: _this.$states.year + '年 ' + _this.$states.echartTitle + '监测情况',
                        subtext: '单位：' + (res.data.unitCode[0] == null ? '' : res.data.unitCode[0]),
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['监测值', '规划值'],
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
                        data: yData
                    },
                    series: [
                        {
                            name: '监测值',
                            type: 'bar',
                            data: seriesData1,
                            barWidth: 15
                        },
                        {
                            name: '规划值',
                            type: 'bar',
                            data: seriesData2,
                            barWidth: 15
                        }
                    ]
                };
                echc.setOption(option);
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
            year: _this.$states.year,
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

