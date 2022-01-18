////////////////////////////////////////////////
// 指标评估
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import districtLinkage from "../../../../../common/districtLinkage";
import MapBoxGl from '../otherPage/map'
import FoldPanel from '../../../../../common/foldPanel';
import BoxCardView from '../../../../../common/boxCard';
import Echarts from './otherPage/echarts'
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
        this.$store = new $store.ielStore(); // 初始化公共数据存放，包含相关方法。一般用于调用方法；
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

            this.renderIndicator() // 渲染左侧指标数据

            console.log('state%o', this.$states)
        })
    },
    renderIndicator() {
        let _this = this;
        _this.$api.indexList({
            adCode: _this.$states.adCode,
            year: ''
        }, function (res) {
            if (res.code == 0 && res.data.length > 0) {
                // 处理面板所需的数据
                _this.$store.handelPlaneData(res.data);
                _this.renderFoldPanelView(res.data);
                _this.$el.find('.bearer-left').removeClass('bearer-left-class');
                _this.$el.find('.bearer-right').removeClass('bearer-left-class');
                _this.$el.find(".bearer-right").empty();
                _this.$el.find(".bearer-right").append('<div class="pie-chart"></div><div class="polyline"></div>');
                $('#play_line').show();
            } else {
                // 无数据，显示暂无数据

                $('#play_line').hide();
                _this.$el.find('.map').empty();
                _this.$el.find('.map').append('<div style="text-align:center;display:inline-flex;color:#cac3c3;position: relative; top: 50%; left: 50%;">暂无数据</div>');

                _this.$el.find('.bearer-left').empty();
                _this.$el.find('.bearer-right').empty();
                _this.$el.find('.bearer-left').addClass('bearer-left-class')
                    .append('<div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div>');
                _this.$el.find('.bearer-right').addClass('bearer-right-class')
                    .append('<div class="pie-chart"><div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div></div><div class="polyline"><div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div></div>');
            }
        })
    },

    renderFoldPanelView(data, callback) {
        var _this = this;
        // 渲染外层面板
        this.$el.find('.bearer-left').empty();
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
                    _this.$store.setData('zbghId', item.IndicatorData[0].zbghId)
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
                    if (callback) {
                        callback()
                    }
                }
                this.fnInitBoxCardViews('divId' + i, item.IndicatorData, defaultSelectIndex);// 渲染折叠面板内容
                //仅指标评估页面卡片文字颜色固定
                $('.span_value').css('color', '#2b5394')
                $('.value_unit').css('color', '#2b5394')
            }
        }
    },
    changeInit() {
        this.rederTopBarChart(); // 渲染右上侧图表
        this.rederDownBarChart(); // 渲染右下侧图表
        this.initMap()// 渲染基本地图
    },
    rederTopBarChart() {
        var _this = this;
        this.$api.cityProportionChart({
            adCode: _this.$states.adCode,
            zbxxxbId: _this.$states.zbxxxbId,
            year: _this.$states.year
        }, function (res) {
            if (res.code == 0) {
                var echarts = new Echarts();
                if (res.data != null && res.data.length > 0) {
                    var data = res.data[0];
                    if (data != undefined) {
                        echarts.pieChart(_this.$el.find('.pie-chart')[0], data.aboveNinety, data.middle, data.belowSixty);
                    } else {
                        // 无数据情况下
                        _this.$el.find('.pie-chart').empty();
                        _this.$el.find('.pie-chart').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
                        _this.$el.find('.pie-chart').removeAttr('_echarts_instance_');//删除容器中echart属性
                    }
                } else {
                    // 无数据情况下
                    _this.$el.find('.pie-chart').empty();
                    _this.$el.find('.pie-chart').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
                    _this.$el.find('.pie-chart').removeAttr('_echarts_instance_');//echart属性
                }
            }
        })
    },
    rederDownBarChart() {
        var _this = this;
        this.$api.indexScoreTrendChart({
            adCode: _this.$states.adCode,
            zbxxxbId: _this.$states.zbxxxbId,
            zbghId: _this.$states.zbghId
        }, function (res) {
            if (res.code == 0 && res.data.length > 0) {
                var echarts = new Echarts();
                var data = res.data[0];
                if (data != undefined) {
                    echarts.barChart(_this.$el.find('.polyline')[0], res.data);
                } else {
                    // 无数据情况下
                    _this.$el.find('.polyline').empty();
                    _this.$el.find('.polyline').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
                }
            } else {
                // 无数据情况下
                _this.$el.find('.polyline').empty();
                _this.$el.find('.polyline').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
            }
        });
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
    initMap() {
        var _this = this;
        var mapBoxView = new MapBoxGl();
        this.$el.find('.map').empty();
        this.$el.find('.map').append(mapBoxView.render());
        var isNeedZoom = this.$store.isNeedZoom();
        this.$api.getMapGeojson(_this.$states.adCode, isNeedZoom, (res) => {
            mapBoxView.setCenter(res, isNeedZoom, () => {
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
                    popupKey: 'score',
                    type: 'evaluation',
                    areaNameKey: 'xzqhName'
                });
            }
        });
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
            headerRightType: 'txt',
            headerBgColorArr: mapColor,
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
                _this.$store.setData('zbghId', item.zbghId)
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
                zbghId: element.zbghId,
                zbjcId: element.zbjcId,
                weightGrade: element.weightGrade,
                unitCode: element.unitCode == null ? '' : element.unitCode
            });
        });
        boxcardViews.reset(boxData);
        boxcardViews.on('onClickInfo', (data) => {//点击左下角详情事件
            _this.fnGetIndexDetailData(data.zbjcId, data.title, data.unitCode);//获取指标详情走势图
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
    // 重构前

    destroyed: function () { },
};
var mapColor = {//左侧卡片颜色头部，和其他页不同
    0: {
        color: '#2b5394'
    },
    1: {
        color: '#CCC'
    },
    2: {
        color: '#33CC00'//绿色
    },
    3: {
        color: '#f7a031'//橙色
    },
    4: {
        color: '#db1029'//红色
    }
}
var statusObj = {//左侧卡片颜色文字
    0: {
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    1: {
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    2: {
        img: './static/icon/safety.svg',
        color: '#2b5394'
    },
    3: {
        img: './static/icon/warning.svg',
        color: '#f7a031'
    },
    4: {
        img: './static/icon/danger.svg',
        color: '#db1029'
    }
}
