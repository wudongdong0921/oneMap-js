////////////////////////////////////////////////
// 资源环境承载能力
// 戴飞
// 2021-11-23 13:10:30
////////////////////////////////////////////////
import districtLinkage from "../../../../../common/districtLinkage";
import BoxCardViews from '../../../../../common/boxCardPros'
import MapBoxGl from '../otherPage/map'
// import PlayLines from "../../../../../common/playLine";
import UTIL from '../../../../../common/util'
import tabViews from "./tab";


export default {
    boxcardViews: null,
    pffaId: '',
    year: new Date($.ajax({ async: false }).getResponseHeader("Date")).getFullYear(),// 当前服务器时间,
    dep: 1,
    title: '',
    adCode: '',
    render: function () {
        let _this = this;
        this.components();
        // this.fnInitBoxCardViews();
        // this.fnRenderAreaView();
    },
    components() {
        let _this = this;
        this._linkage = new districtLinkage(this.$el.find(".area-tree"))// 行政区划选择器注册
        this.boxcardViews = new BoxCardViews({
            view: this.$el.find('.bearer-left'),
            el: this.$el,
            headerType: 'img', // 头部渲染类型
            bodyType: 'rowList', // 主体渲染类型
            headerClick: undefined, //头部监听事件
            bodyImg: '', // 主体标题图片
            header: [{ key: "ratingName", type: "title" }, { key: 'zhuangtai', type: 'status' }],
            body: [{ key: 'indexName', type: 'title' }, { key: 'monitoringValue', type: 'value' },
            { key: 'monitorSituation', type: 'status' }, { key: "unitName", type: 'bodyUnti' }],
            bottom: {
                type: '', // 底部渲染类型
                bottomTitle: '详情', // 底部标题
                titleColor: "blue", // 底部标题颜色
                onClick: function (res) {
                }, // 底部标题点击事件
                status: '' // 预警状态
            }
        })
        this.tabView = new tabViews({
            el: this.$el.find('.pie-tab')
        });
        // 全局映射
        this.$store = new $store.bHStore(); // 初始化公共数据存放，包含相关方法。一般用于调用方法；
        this.$states = this.$store.$state; // 方便调用;一般用于获取属性值；
        // 执行开始业务逻辑
        this.initLogic();
    },
    initLogic() {
        let _this = this;
        this.$store.setData('year', new Date($.ajax({ async: false }).getResponseHeader("Date")).getFullYear()); // 先初始化年份
        this._linkage.setUserData(_this.$store.getUserAcodeList());
        this._linkage.onChange((data) => {
            _this.$el.find('.area-tree').text(data.dictLabel); // 渲染行政区划
            _this.$store.setData('adCode', data.dictValue); // 定义全局行政区划号
            _this.$store.handelDep(); // 判断控制市县级别处理。dep数据处理
            this.initLeftList(function () { }) // 初始化左侧列表
        })
    },
    initLeftList() {
        var _this = this;
        _this.$api.getCardList({
            xzqhId: _this.$states.adCode,
            scoreYear: _this.$states.year,
        }, function (res) {
            if (res && res.data) {
                for (let i = 0; i < res.data.stateList.length; i++) {
                    const item = res.data.stateList[i];
                    item.indice = [];
                    for (let j = 0; j < res.data.displayList.length; j++) {
                        const subItem = res.data.displayList[j];
                        if (item.pffaId == subItem.pffaId) {
                            item.indice.push(subItem);
                        }
                    }
                }
                if (res.data.stateList.length > 0) {
                    _this.$store.setData('titile', res.data.stateList[0].ratingName);// 给动态图表设置标题
                    _this.$el.find('.bearer-left').removeClass('bearer-left-class');
                    _this.renderLeftList(res.data)
                } else if (res.data.stateList == 0) {
                    // 无数据，显示暂无数据
                    _this.$el.find('.map').empty();
                    _this.$el.find('.map').append('<div style="text-align:center;display:inline-flex;color:#cac3c3;position: relative; top: 50%; left: 50%;">暂无数据</div>');
                    _this.$el.find('.bearer-left').empty();
                    _this.$el.find('.pie-chart').empty();
                    _this.$el.find('.polyline').empty();
                    _this.$el.find('.pie-tab').empty();
                    _this.$el.find('.bearer-left').addClass('bearer-left-class')
                        .append('<div style="text-align:center;display:inline-flex;color:#cac3c3;">暂无数据</div>');
                    _this.$el.find('.pie-chart').append('<div style="text-align:center;color:#cac3c3;">点击相关评价进行加载数据</div>');
                    _this.$el.find('.polyline').append('<div style="text-align:center;color:#cac3c3;">点击相关评价进行加载数据</div>');
                }
            }
        })
    },
    renderLeftList(data) {
        var _this = this
        _this.boxcardViews.initAJAXData(data.stateList);
        // 渲染完左侧列表后，开始渲染地图、右侧图表信息。
        this.renderMapAndRight()
        this.boxcardViews.on('bottomClick', function (pffaId) {
            _this.goto('/bearer/detail', { pffaId: pffaId, xzqhId: _this.$store.adCode, year: _this.$store.year });
        })
        this.boxcardViews.on('onClick', function (boxdata) {
            _this.$store.setData('title', boxdata.header.title)
            _this.renderMapAndRight()
        })
    },
    renderMapAndRight() {
        // 主要执行渲染地图以及右侧图表方法
        this.renderMap()// 渲染地图
        this.renderRightTop()// 渲染右上方区域
        this.renderRightBottom();// 渲染右侧下方区域
    },
    renderRightBottom() {
        // 首先要根据当前行政区划控制显示市县级别tab标签
        var pieType = UTIL.levelHandel([this.$states.adCode]);
        this.tabView.init(pieType);
        this.tabView.option.el.hide()
        this.tabView.on('click', (data) => {
            if(this.tabView.newLevel == "1"){
                this.handelTab(0)
                return;
            }
            this.handelTab(data.level)
        })
        this.handelTab(pieType)
    },
    handelTab(pieType) {
        var _this = this;
        this.$api.getStaticPie({
            'xzqhId': this.$states.adCode,
            'scoreYear': this.$states.year,
            'pffaId': this.boxcardViews.getPffid().pffaId,
            'type': (pieType == '市级') ? 0 : pieType
        }, function (res) {
            _this.tabView.option.el.show()
            if (res.data != null && res.data.length !== 0) {
                // _this.tabView.option.el.show()
                _this.renderPie(res)
            } else {
                // 无数据情况下
                // _this.tabView.option.el.show()
                _this.$el.find('.pie-chart').empty();
                _this.$el.find('.pie-chart').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
                // if (pieType == 0 && _this.$states.adCode.charAt(2) == '0' && _this.$states.adCode.charAt(3) == '0') {
                //     // _this.tabView.init(1);
                //     _this.handelTab(1)
                // }
            }
        })
    },
    renderPie(res) {
        var _this = this;
        _this.$el.find(".pie-chart").empty();
        $("#pie-chart")[0].setAttribute('_echarts_instance_', '');
        var option = {
            title: {
                text: _this.$states.title + '比例图',
                left: 'center',
                top: '30px',
                textStyle: {
                    fontWeight: '400',
                    fontSize: 16
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} <br>城市统计：{c}座<br/>占比: {d} %"
            },
            series: [
                {
                    name: _this.$states.title,
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '50%'],
                    data: [
                        {
                            value: res.data.ljcz,
                            name: '临界超载',
                            itemStyle: {
                                normal: {
                                    color: '#f59a23'
                                }
                            }
                        },
                        {
                            value: res.data.kz,
                            name: '可载',
                            itemStyle: {
                                normal: {
                                    color: '#95f204'
                                }
                            }
                        },
                        {
                            value: res.data.cz,
                            name: '超载',
                            itemStyle: {
                                normal: {
                                    color: '#ff0000'
                                }
                            }
                        }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        var echcPie = echarts.init(_this.$el.find(".pie-chart")[0]);
        echcPie.setOption(option, true);
    },
    renderRightTop() {
        var _this = this;
        this.$el.find(".polyline").empty();
        $("#polyline")[0].setAttribute('_echarts_instance_', '');
        this.$api.getStaticPlan({
            'xzqhId': this.$states.adCode,
            'pffaId': this.boxcardViews.getPffid().pffaId,
        }, function (res) {
            if (res.data.length !== 0) {
                _this.$store.handelLineData(res.data);
                var option = {
                    title: {
                        text: _this.$states.title + '变化趋势',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: "{b} <br/>&nbsp;&nbsp;&nbsp;&nbsp;{c} ",
                        backgroundColor: '#898989',
                        borderColor: '#898989',
                        textStyle: {
                            color: '#fff'
                        }
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
                        data: _this.$states.lineData.yearArray,
                        axisLabel: {
                            margin: 18
                        },
                    },
                    yAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['可载', '临界超载', '超载'],
                        axisLabel: {
                            margin: 18
                        },
                    },
                    series: [
                        {
                            name: '状态',
                            type: 'line',
                            data: _this.$states.lineData.valueArray,
                            lineStyle: {
                                color: 'rgb(56, 190, 176)'
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(56, 190, 176)'
                                }
                            }
                        }
                    ]
                };
                var echc = echarts.init(_this.$el.find(".polyline")[0]);
                echc.setOption(option, true);
            } else {
                // 无数据情况下
                _this.$el.find('.polyline').empty();
                _this.$el.find('.polyline').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
            }
        })
    },
    renderMap() {
        let _this = this;
        var mapBoxView = new MapBoxGl();
        this.$el.find('.map').empty();
        this.$el.find('.map').append(mapBoxView.render());
        var isNeedZoom = this.$store.isNeedZoom();
        this.$api.getMapGeojson(_this.$states.adCode, isNeedZoom, (res) => {
            mapBoxView.setCenter(res, isNeedZoom)
            this.fnGetMapGeoJson(mapBoxView);
        }, mapBoxView.loading);
    },
    fnGetMapGeoJson(mapBoxView) {
        var acc = this.$states.adCode + '_full'
        if (this.$store.isNeedZoom() == 2) {
            acc = this.$states.adCode
        }
        this.$api.getMapGeojson(acc, this.dep, (res) => {
            mapBoxView.renderMapView(res);
            this.fnRenderColorMap(mapBoxView, res);
        }, mapBoxView.loading);
    },
    fnRenderColorMap(mapBoxView, mapData) {
        var _this = this;
        var areas = [];
        mapData.forEach(element => {
            areas.push(element);
        });
        this.$api.boundaryControlIndicatorsMap({
            xzqhId: _this.$states.adCode,
            scoreYear: _this.$states.year,
            pffaId: _this.boxcardViews.getPffid().pffaId
        }, function (res) {
            if (res.code == 200) {
                for (let i = 0; i < res.data.stateList.length; i++) {
                    const item = res.data.stateList[i];
                    // 2021-05-26 陈薪名 修改bug HNXGTKJ-1591
                    if (item.zhuangtai == '1') {
                        //刘长明修改HNXGTKJ-1786 未监控、未检测 都改为【未监测】（与监测评估预警页面一致）
                        item.pffaState = '未监测';
                    }
                    item.indice = [];
                    for (let j = 0; j < res.data.displayList.length; j++) {
                        const subItem = res.data.displayList[j];
                        if (item.xzqhId == subItem.xzqhId) {
                            item.indice.push(subItem);
                        }
                    }
                }
                mapBoxView.addColorLayer(_this.$store.fnBuildColorLayerParam(res.data.stateList, areas));
            }
        });
    },
    // 重构
    destroy: function () {
        $('#boxCardProsCssConfig').remove()
    },
};