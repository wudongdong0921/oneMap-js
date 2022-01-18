////////////////////////////////////////////////
// 监测评估预警
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////

import RowTop from '../common/row_war_top'
import MinCards from '../common/minCardIndex'
import WarRightLists from './page/warRightList'
import BoxCardView from '../../../../../common/boxCard';
export default {
    indexName: '',//指标名称
    zbxId: '',//指标类型：（约束指标:YSX，预期指标:YQX）
    jczt: '',//监测状态（正常指标:2,预警指标:3,超标指标:4,未监测指标:1）
    rowTopView: null,
    minCards: null,
    boxcardViews: null,
    warRightList: null,
    render() {
        this.fnInitAreaAndSearch();
        setTimeout(() => {
            this.fnInitIndexOverview();
            this.fnInitCbIndex();
            this.fnInitBoxCardViews();
        }, 500);
    },
    /**
     * 初始化区域选择和搜索框
     */
    fnInitAreaAndSearch() {
        var _this = this;
        _this.firstLoad = true;
        this.rowTopView = new RowTop();
        this.$el.find('#card').prepend(this.rowTopView.render({
            htmlStr: '<div><span style="margin-right: 10px;">指标名称:</span>' +
                '<input type="text" class="layui-input" id="selectInput" autocomplete="off">' +
                '<button type="button" class="layui-btn layui-btn-normal" style="margin-top: -4px;background: #5294d7;margin-right: 10px;" id="selectBtn">查询</button>' +
                '<button type="button" class="layui-btn" style="margin-top: -4px;background: #eff1f2;color: #252525;" id="resetBtn">重置</button><div>',             // 自定义外层必须得有div包裹html
            buttonEvent: ['selectBtn', 'resetBtn']
        }))
        this.rowTopView.on('selectBtn', (data) => {
            // 2021-06-02 陈薪名 修改bug HLJSSJDXT-389
            if(_this.jczt == 1){
                if (data !== '') {
                    this.indexName = data;
                    var param = {
                        adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue,
                        indexName: this.indexName,
                        wjczb: 1,
                    };
                    this.fnIndexDataShow(param);
                    this.fnInitIndexOverview();
                    this.fnInitCbIndex();
                } else {
                    top.layer.msg('请填写查询条件！')
                }
            }else{
                if (data !== '') {
                    this.indexName = data;
                    this.fnIndexDataShow();
                    this.fnInitIndexOverview();
                    this.fnInitCbIndex();
                } else {
                    top.layer.msg('请填写查询条件！')
                }
            }
        });
        this.rowTopView.on('resetBtn', (data) => {
            this.indexName = '';
            if(_this.jczt == 1){
                var param = {
                    adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue,
                    wjczb: 1
                    // indexName: this.indexName,
                    // zbxId: '',
                    // jczt: ''
                };
            }
            this.fnIndexDataShow(param);
        });
        // 2021-04-13 陈薪名 修改 行政区划切换后自动查询数据
        this.rowTopView.onChange('onChangeSel', (data)=>{
            if (!_this.firstLoad) {
                //$('#selectBtn').click();
                this.$el.find('.war-top').click();
                this.fnIndexDataShow();
                this.fnInitIndexOverview();
                this.fnInitCbIndex();
            } else {
                _this.firstLoad = false;
            }
        })
    },
    /**
     * 初始化指标总览
     */
    fnInitIndexOverview() {
        let _this = this;
        this.minCards = new MinCards({ title: '指标总览' });
        setTimeout(() => {
            this.$api.indexOverview({
                adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue
            }, function (res) {
                if (res.code == 0) {
                    _this.fnInitIndexOverviewData(res.data);
                    _this.$el.find('.war-center-left').empty();
                    _this.$el.find('.war-center-left').append(_this.minCards.render(indexOverviewData));
                    _this.minCards.mincards.on('onCardClick', (data) => {
                        _this.fnOnClickCard(data);
                    })
                }
            });
        }, 100);// 2021-06-02 陈薪名 修改bug HLJSSJDXT-439
    },
    fnRefreshIndexOverview() {
        this.$api.indexOverview({
            adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue
        }, function (res) {
            if (res.code == 0) {
                _this.fnInitIndexOverviewData(res.data);
                _this.$el.find('.war-center-left').empty();
                _this.$el.find('.war-center-left').append(_this.minCards.render(indexOverviewData));
                _this.minCards.mincards.on('onCardClick', (data) => {
                    _this.fnOnClickCard(data);
                })
            }
        });
    },
    /**
     * 初始化超标指标列表
     */
    fnInitCbIndex() {
        var _this = this;
        this.warRightList = new WarRightLists({ title: '超标指标' })
        setTimeout(() => {
            this.$api.overproof({
                adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue
            }, function (res) {
                if (res.code == 0) {
                    var warRightListData = [];
                    if (res.data.length > 0) {
                        res.data.forEach(element => {
                            warRightListData.push({
                                name: element.indexName,
                                lockIndex: '查看',
                                zbjcId: element.zbjcId,
                                unitCode: element.unitCode == null ? '' : element.unitCode
                            });
                        });
                        _this.$el.find('.war-center-right').empty();
                        _this.$el.find('.war-center-right').append(_this.warRightList.render(warRightListData));
                        _this.warRightList.on('onCardClick', (id, title,dw) => {
                            _this.fnIndexMonitorList(id, title,dw);
                        }) 
                    } else {
                        // 2021-05-07 陈薪名 修改bug 无数据时，显示暂无数据
                        _this.$el.find('.war-center-right').empty();
                        _this.$el.find('.war-center-right').append('<div class="layui-card"><div class="layui-card-header">超标指标</div><div class="layui-card-body">暂无数据！</div></div>');
                    }
                }
            });
        }, 150);
    },
    /**
     * 初始化指标列表
     */
    fnInitBoxCardViews() {
        let _this = this;
        this.boxcardViews = new BoxCardView({
            el: _this.$el,
            classView: 'war-bottom',
            headerTitle: '国土开发强度',// 标题名称
            bodychild: [{// 定义卡片内容
                key: '监测值',// 卡片标题
                enKey: ['monitoringValue', 'link'],
                iconImg: 'value.png',// 卡片标题图片
                value: 2,// 卡片内容显示列表数量
            }, {
                key: '规划指标',
                enKey: ['planTyv'],
                iconImg: 'ruler.png',
                value: 1,
            }],
            bodyUnti: '公顷',
            buttomChild: {// 卡片底部的第一种情况，可根据数组进行扩展
                key: '预期性',
                sytle: {},
                title: '更新时间：',
                isHaveDiv: 1,// 是否有右侧对应项 0是没有  1是有
                isChangeByData: true
            },
            data: [],
            statusData: statusObj,
            defaultSelectIndex: -1,
            onClick: function (item) {
                _this.fnIndexMonitorList(item.zbjcId, item.title, item.unitCode);
            }
        });
        setTimeout(() => {
            this.fnIndexDataShow();
        }, 500);
    },
    fnInitIndexOverviewData(data) {
        indexOverviewData[0].parameterValue = data.allIndex;
        indexOverviewData[1].parameterValue = data.ysx;
        indexOverviewData[2].parameterValue = data.yqx;
        indexOverviewData[3].parameterValue = data.zc;
        indexOverviewData[4].parameterValue = data.yj;
        indexOverviewData[5].parameterValue = data.cb;
        indexOverviewData[6].parameterValue = data.wjc;
    },
    fnOnClickCard(data) {
        this.zbxId = '';
        this.jczt = '';
        this.rowTopView.reset();
        switch (data) {
            case 1:
                this.zbxId = 'YSX';
                break;
            case 2:
                this.zbxId = 'YQX';
                break;
            case 3:
                this.jczt = 2;
                break;
            case 4:
                this.jczt = 3;
                break;
            case 5:
                this.jczt = 4;
                break;
            case 6:
                this.jczt = 1;
                break;
        }
        this.indexName = '';
        this.fnIndexDataShow();
    },
    /**
     * 初始化指标列表数据
     */
    fnIndexDataShow(param) {
        var _this = this;
        if(param){
            _this.$api.indexDataShow(param, function (res) {
                if (res.code == 0) {
                    _this.fnSetBoxData(res);
                }
            });
        }else{
            var param = {
                adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue,
                indexName: _this.indexName,
                zbxId: _this.zbxId,
                jczt: _this.jczt
            };
            if (_this.jczt == 1) {
                param = {
                    wjczb: 1,
                    adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue,
                }
            }
            _this.$api.indexDataShow(param, function (res) {
                if (res.code == 0) {
                    _this.fnSetBoxData(res);
                }
            });
        }
    },
    //重置按钮方法
    fnResetButtonShow() {
        var _this = this;
        var param = {
            adCode: _this.rowTopView.addressThreeLinkView.getSelectData().dictValue,
            indexName: _this.indexName,
            zbxId: _this.zbxId,
            jczt: _this.jczt
        };
        _this.$api.indexDataShow(param, function (res) {
            if (res.code == 0) {
                _this.fnSetBoxData(res);
            }
        });
    },
    fnSetBoxData(res) {
        var boxData = [];
        res.data.forEach(element => {
            boxData.push({
                title: element.indexName,
                monitoringValue: element.monitoringValue,
                link: '<span style="color: black;font-weight: 100;font-size: 16px;">环比</span>' + (element.link > 0 ? ('+' + element.link) : element.link),
                planTyv: element.planTyv,
                time: element.dataOfScore == null ? '无' : element.dataOfScore.split(' ')[0],
                status: element.monitorSituation == null ? '0' : element.monitorSituation,
                zbjcId: element.zbjcId,
                indexNatureCode: element.indexNatureCode,
                unitCode: element.unitCode == null ? '' : element.unitCode
            });
        });
        if (boxData.length > 0) {
            this.boxcardViews.reset(boxData);
        } else {
            $('#card').find('.war-bottom').empty();
            $('#card').find('.war-bottom').append('<div><div class="layui-card-body">暂无数据！</div></div>');
        }
        
    },
    /**
     * 打开走势图
     * @param {指标检查id} zbjcId
     * @param {指标名称} title
     * @param {指标单位} dw
     */
    fnIndexMonitorList(zbjcId, title, dw) {
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
    destroyed() {

    },
}
var statusObj = {
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
var indexOverviewData = [{
    title: '全部指标',
    parameterValue: '0',
    unit: '项',
    state: '0', // 0未检测 1正常指标 2预警指标 3超标指标
}, {
    title: '约束指标',
    parameterValue: '0',
    unit: '项',
    state: '1', // 0未检测 1正常指标 2预警指标 3超标指标
}, {
    title: '预期指标',
    parameterValue: '0',
    unit: '项',
    state: '1', // 0未检测 1正常指标 2预警指标 3超标指标
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
}, {
    title: '未监测指标',
    parameterValue: '0',
    unit: '项',
    state: '0', // 0未检测 1正常指标 2预警指标 3超标指标
}]
