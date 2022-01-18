////////////////////////////////////////////////
// 规划成果管理-成果总览
// 杨爽
// 2020-10-13 11:28:14
////////////////////////////////////////////////
import mapViews from './other_page/map'
import chartTabShow from './other_page/chart_tab'
import getOption from './other_page/option' // 获取图表option方法
import tableListShow from './other_page/table_list';
import chartTabShow2 from './other_page/chart_tab2'
import districtLinkage from '../../../../../../common/districtLinkage' // 三级联动引入<div> <div id="showLisandong">启动</div> </div>

export default {
    rederData: function () {
        return {
            planningResultCode: '',
            adCode: "",
            districtCode: '',
            leavel: '',
            tableList: "",
            type: "",
            parameterType: "",
            params: "",
            'page': 1,
            'limit': 5,
            mapview: ""
        };
    },
    render: function () {
        var planningResult = new icu.formElement.select({
            className: '',
            showKey: 'label',
            showUnSelect: false,
            setKey: 'label',
            getKey: 'object',
            readonly: false,
            data: [],
            // 未选择时显示的提示文字
            placeholder: '- 请选择 -',  // 当未选值时,元素显示内容
            onChange: (val) => {
                //console.log(val)
                _linkage.reset(area.html);
                _this.rederData.planningResultCode = val.value
                changeEvent()
            }, // 当值发生改变时,调用方法
            onError: function () { }
        });
        this.$el.find('#planningResult').append(planningResult.html)

        this.$api.getPlanResultType(res => {
            this.rederData.planningResultCode = res.data[0].value
            icu.optionSide.set(res.data, 'PlanResultType');
            planningResult.setData(res.data);
            planningResult.set(res.data[0].label);
            initEvent()
        })
        //超图
        this.rederData.mapview = new mapViews();
        this.rederData.mapview.onGetMapLayerMessage((code, callback) => {
            this.getMapInfoForView(code, function (res) {
                callback(res);
            });
        });
        this.$el.find('.mapBox').append(this.rederData.mapview.render());
        this.rederData.mapview.init() //超图

        //表格
        this.rederData.tableList = new tableListShow()

        // 选择及图表展示
        var chartTabShows = new chartTabShow();
        var chartTabShows2 = new chartTabShow2();

        chartTabShows.initData('province')//初始值
        this.rederData.leavel = '1'
        var _this = this
        chartTabShows.onActiveEvent(data => {
            if (!_this.rederData.adCode) {
                icu.alert.error({
                    title: '提示',
                    text: '请选择行政区划',
                });
                return
            }
            if (data == '省级') {
                _this.rederData.type = 'province'
                _this.rederData.tableList.setleavel(() => {
                    return [{ "label": "本级", "value": "thisLeavel" }, { "label": "下级", "value": "lowerLeavel" }]
                })
                var _leavel = 0;

            } else if (data == '市级') {
                _this.rederData.type = 'city'
                _this.rederData.tableList.setleavel(() => {
                    return [{ "label": "本级", "value": "thisLeavel" }, { "label": "下级", "value": "lowerLeavel" }]
                })
                var _leavel = 1;
            } else {
                _this.rederData.type = 'area'
                _this.rederData.tableList.setleavel(() => {
                    return [{ "label": "本级", "value": "thisLeavel" }]
                })
                var _leavel = 2;
            };

            this.getMapGeojson(this.rederData.adCode, _leavel, (jsonRes) => {
                // this.rederData.mapview.renderMapView(res);
                this.getRegionSelect(data, res => {
                    if (res.data) {
                        var option = [{
                            value: res.data['whj'] == null ? 0 : res.data['whj'],
                            name: "未汇交"
                        }, {
                            value: res.data['yhj'] == null ? 0 : res.data['yhj'],
                            name: "已汇交"
                        }]
                        chartTabShows.initChart(option);
                        var status = res.data.listReviewState;
                        var option2 = [{
                            value: status == null ? 0 : (status['审查通过'] == null ? 0 : status['审查通过']),
                            name: '审查通过'
                        }, {
                            value: status == null ? 0 : (status['审查驳回'] == null ? 0 : status['审查驳回']),
                            name: '审查驳回'
                        },{
                            value: status == null ? 0 : (status['审查中'] == null ? 0 : status['审查中']),
                            name: '审查中'
                        }]
                        var status2 = res.data.listInventoryStatus;
                        var option3 = [{
                            value: status2 == null ? 0 : (status2['已入库'] == null ? 0 : status2['已入库']),
                            name: '已入库'
                        }, {
                            value: status2 == null ? 0 : (status2['未入库'] == null ? 0 : status2['未入库']),
                            name: '未入库'
                        }]
                        chartTabShows2.initChart(option2, option3);
                    }
                    this.rederData.mapview.renderMapView(jsonRes, res.data);
                })
            });
        })
        this.$el.find('#chartTabContentInfo').append(chartTabShows.render());
        this.$el.find('#tableList').append(chartTabShows2.render());
        var area = new icu.formElement.input({
            className: "areaInput",
            size: 'normal', // 自定义Class属性
            inputType: 'text', // 可选值 text （文本输入框） password （密码提示框）
            readonly: true,  // 设置是否只读
            placeholder: '请选择行政区划', // 设置未填写输入框时的提示语句
        });
        this.$el.find('#area').append(area.html)
        var linkageEle = this.$el.find('#area');
        var _linkage = new districtLinkage(linkageEle);
        var userData = icu.session.get('userInfo')
        var initEvent = () => {
            _linkage.setUserData(userData.areacodeList);
            _linkage.onChange((data) => {
                //console.log(data)
                this.rederData.adCode = data.dictValue
                area.set(_linkage.getShowValue(','));
                if (data.pid == '0') {
                    chartTabShows.initData('province')
                    this.rederData.type = "province"
                    this.rederData.leavel = '1'
                } else {
                    if (data.children.length == 0) {
                        this.rederData.type = "area"
                        this.rederData.leavel = '3'
                        chartTabShows.initData('area')
                    } else {
                        this.rederData.type = "city"
                        this.rederData.leavel = '2'
                        chartTabShows.initData('city')
                    };
                };
                if (this.rederData.planningResultCode == '') {
                    icu.alert.error({
                        title: '提示',
                        text: '请选择规划成果类型',
                    });
                    return
                }
                changeEvent()
            });
        };

        var changeEvent = () => {
            var typeShowValue = parseInt(this.rederData.leavel) - 1;
            if (typeShowValue == '0') {
                chartTabShows.initData('province')
            } else if (typeShowValue == '1') {
                chartTabShows.initData('city')
            } else if (typeShowValue == '2') {
                chartTabShows.initData('area')
            }
            this.getMapGeojson(this.rederData.adCode, parseInt(this.rederData.leavel) - 1, (jsonRes) => {
                this.getTarget(res => {
                    var option = [{
                        value: res.data['whj'] == null ? 0 : res.data['whj'],
                        name: '未汇交'
                    }, {
                        value: res.data['yhj'] == null ? 0 : res.data['yhj'],
                        name: '已汇交'
                    }]
                    chartTabShows.initChart(option);
                    var status = res.data.OnlyAdCodeCount;
                    var option2 = [{
                        value: status == null ? 0 : (status['审查通过'] == null ? 0 : status['审查通过']),
                        name: '审查通过'
                    }, {
                        value: status == null ? 0 : (status['审查驳回'] == null ? 0 : status['审查驳回']),
                        name: '审查驳回'
                    },{
                        value: status == null ? 0 : (status['审查中'] == null ? 0 : status['审查中']),
                        name: '审查中'
                    }]
                    var option3 = [{
                        value: status == null ? 0 : (status['已入库'] == null ? 0 : status['已入库']),
                        name: '已入库'
                    }, {
                        value: status == null ? 0 : (status['未入库'] == null ? 0 : status['未入库']),
                        name: '未入库'
                    }]
                    chartTabShows2.initChart(option2, option3);
                    this.rederData.mapview.renderMapView(jsonRes, res.data);
                })
            });
        }
    },

    // 获取地图Geojson
    getMapGeojson: function (areaCode, type, callback) {
        if (this.rederData.leavel == '1') {
            if (type == '1') {
                areaCode = areaCode + '_full'
            } else if (type == '2') {
                areaCode = areaCode + '_full_full'
            }
        } else if (this.rederData.leavel == '2') {
            if (type == '2') {
                areaCode = areaCode + '_full'
            }
        }
        this.$api.getMapGeojson(areaCode, type, callback, this.rederData.mapview.loading);
    },
    getRegionSelect: function (data, callback) {
        this.$api.getRegionSelect({
            'planningResultCode': this.rederData.planningResultCode,
            'adCode': this.rederData.adCode,
            'leavel': this.rederData.leavel,
            'type': this.rederData.type,
            // 'parameterType':this.rederData.parameterType,
            // 'params':this.rederData.params,
            //'page': data.page,
            //'limit': data.limit
        }, res => {
            callback(res)
        })
    },
    getMapInfoForView: function (code, callback) {
        this.$api.getMapInfoForView({
            'planningResultCode': this.rederData.planningResultCode,
            'adCode': code
        }, res => {
            callback(res)
        })
    },
    // getMapInfo: function (code, callback) {
    //     this.$api.getMapInfo({
    //         'planningResultCode': this.rederData.planningResultCode,
    //         'adCode': code
    //     }, res => {
    //         callback(res)
    //     })
    // },
    getTarget: function (callback) {
        this.$api.getTarget({
            'planningResultCode': this.rederData.planningResultCode,
            'adCode': this.rederData.adCode,
        }, res => {
            callback(res)
        })
    },

    // getClickMap: function (data, callback) {
    //     this.$api.getClickMap({
    //         'planningResultCode': this.rederData.planningResultCode,
    //         'adCode': this.rederData.adCode,
    //         'parameterType': data.parameterType,
    //         'params': data.leavel,
    //         'page': data.page,
    //         'limit': data.limit
    //     }, res => {
    //         callback(res)
    //     })
    // },

    destroy: function () { }
}