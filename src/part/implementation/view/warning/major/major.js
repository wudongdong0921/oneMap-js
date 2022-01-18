////////////////////////////////////////////////
// 重大项目监测
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////

import map from './map'
import districtLinkage from "../../../../../common/districtLinkage";
import TabLableView from '../../../../../common/tabLable'
import RankingListView from './other_page/rankingList'

export default {
    render() {
        let _this = this;
        var rankingListViews = new RankingListView()
        this.$el.find('#zujian').append(rankingListViews.init())

        var tabLableViews = new TabLableView({
            el: '',
            itemArray: [{
                lable: '省级',
                value: 0
            }, {
                lable: '市级',
                value: 1
            }, {
                lable: '县级',
                value: 2
            }],
            default: 0,
            onClick: function (data) { 
                console.log(data)
            }
        })
        this.$el.find('.list-box').append(tabLableViews.init())


        var value = 0.2;
        var data = [value, value, value];
        var option = {
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#431ab8'
            }, {
                offset: 1,
                color: '#471bba'
            }]),
            title: {
                text: (value * 100).toFixed(0) + '{a|%}',
                textStyle: {
                    fontSize: 50,
                    fontFamily: 'Microsoft Yahei',
                    fontWeight: 'normal',
                    color: '#bcb8fb',
                    rich: {
                        a: {
                            fontSize: 28,
                        }
                    }
                },
                x: 'center',
                y: '35%'
            },
            graphic: [{
                type: 'group',
                left: 'center',
                top: '60%',
                children: [{
                    type: 'text',
                    z: 100,
                    left: '10',
                    top: 'middle',
                    style: {
                        fill: '#aab2fa',
                        text: '流量统计',
                        font: '20px Microsoft YaHei'
                    }
                }]
            }],
            series: [{
                type: 'liquidFill',
                radius: '80%',
                center: ['50%', '50%'],
                //  shape: 'roundRect',
                data: data,
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 1,
                        y: 0,
                        x2: 0.5,
                        y2: 1,
                        colorStops: [{
                            offset: 1,
                            color: 'rgba(68, 145, 253, 0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(68, 145, 253, .25)'
                        }, {
                            offset: 0,
                            color: 'rgba(68, 145, 253, 1)'
                        }],
                        globalCoord: false
                    },
                },
                outline: {
                    borderDistance: 0,
                    itemStyle: {
                        borderWidth: 20,
                        borderColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(69, 73, 240, 0)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(69, 73, 240, .25)'
                            }, {
                                offset: 1,
                                color: 'rgba(69, 73, 240, 1)'
                            }],
                            globalCoord: false
                        },
                        shadowBlur: 10,
                        shadowColor: '#000',
                    }
                },
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 1,
                        color: 'rgba(58, 71, 212, 0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(31, 222, 225, .2)'
                    }, {
                        offset: 0,
                        color: 'rgba(31, 222, 225, 1)'
                    }],
                    globalCoord: false
                },
                label: {
                    normal: {
                        formatter: '',
                    }
                }
            },]
        };


        var myChart = echarts.init(this.$el.find('#eachartId')[0]);

        myChart.setOption(option);








        var _linkage = new districtLinkage(this.$el.find(".area-tree"));
        var userData = icu.session.get("userInfo");
        console.log(userData);
        _linkage.setUserData(userData.areacodeList);
        _linkage.onChange((data) => {
            //行政区划change事件
            console.log(data);
            _this.$el.find('.area-tree').text(data.dictLabel);
        });

        var _table = new icu.table({
            tableOptions: {
                title: "已办审查",
                minWidth: 40,
                theme: 'evenColor',
            },
            cols: [
                {
                    width: '60px',
                    key: 'index',
                    type: 'index',
                    name: '序号',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'code',
                    type: 'string',
                    name: '行政区划',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'name',
                    type: 'string',
                    name: '行政区划代码',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'submitExamineUser',
                    type: 'string',
                    name: '报告名称',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'submitExamineTime',
                    type: 'string',
                    name: '报告来源',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'reviewState',
                    type: 'string',
                    name: '评估人员',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'reviewState',
                    type: 'string',
                    name: '评估年份',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'reviewState',
                    type: 'string',
                    name: '评估日期',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    width: '250px',
                    key: 'cz',
                    type: 'buttons',
                    name: '操作',
                    textAlign: 'center',
                    titleAlign: 'center',
                    buttons: [
                        //查看按钮触发事件
                        function (unit, row, data, events) {
                            var handleBtn = $(`
                            <button class="layui-btn layui-btn-ys  layui-btn-sm" style="margin-right:10px">
                                查看
                            </button>
                        `);
                            handleBtn.click((e) => {
                                implementationDialog({
                                    path: '',
                                    width: '95%',
                                    params: {

                                    },
                                    onClose: function () {
                                        _table.refresh()
                                    }
                                })
                            });
                            return handleBtn;
                        }
                    ]
                },
            ],
            whereOptions: [
                {
                    key: 'planningResultCode',
                    type: 'input',
                    labelText: '项目名称:',
                    // data: planningResultCodeSelect,
                    onChange: function (e) {

                    }
                }, {
                    key: 'flowstatus',
                    type: 'select',
                    labelText: '项目级别:',
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
                    getKey: 'dictValue',
                    data: "OptionSide:LCZT",
                    onChange: function (e) {

                    }
                }
            ],
            whereButtons: [
                {
                    class: 'test',
                    name: '查询',
                    event: 'search',
                    // icon: 'software'
                },
                {
                    class: 'test',
                    name: '重置',
                    event: 'reset',
                    // icon: 'down'
                }
            ],
            // rightButtons: [
            //     {
            //         class: 'Test',
            //         icon: 'software',
            //         name: '筛选',
            //         event: 'screen'
            //     }, {
            //         class: 'Test',
            //         icon: 'interactive',
            //         name: '导出',
            //         event: 'exportCSV'
            //     }, {
            //         class: 'Test',
            //         icon: 'listBook',
            //         name: '打印',
            //         event: 'print'
            //     }
            // ],
            getEvent: function (data, setData) {
                setData({
                    count: 10, // 表格总条数
                    data: {
                        name: 'zs',
                        code: 200
                    }, // 表格数据
                });
            },
        })
        //列表页row双击事件
        _table.on('rowDblclick', function (data, table, row) {
            implementationDialog({
                path: '',
                width: '95%',
                params: {

                },
                onClose: function () {
                    _table.refresh()
                }
            })
        });
        this.$el.find('#list').append(_table.html);
        _table.init();
        map({ title: 'zs' }, this.$el.find("#map")[0], 99999);

        _this.$el.find(".pie-tab-item").click(function () {
            _this.$el.find(".pie-tab-item").removeClass("pie-tab-active");
            this.classList.add("pie-tab-active");
        });
    },
    destroyed() {

    },
}