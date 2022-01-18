////////////////////////////////////////////////
// 成果入库
// 杨爽
// 2020-11-05 14:53:23
////////////////////////////////////////////////
import customForm_districtLinkage from '../../../../../../common/customForm_districtLinkage'
var session = icu.session;

export default {
    render: function () {
        var areacodeList = icu.session.get('userInfo').areacodeList;
        var _this = this;
        var _table = new icu.table({
            tableOptions: {
                title: "成果入库",
                minWidth: 40,
                height: '650px',
                theme: 'evenColor',
            },
            cols: [
                {
                    type: 'radio',
                    width: '40px',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: "index",
                    type: 'index',
                    width: '60px',
                    name: '序号',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'projectName',
                    type: 'string',
                    name: '项目名称',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'administrativeDivision',
                    type: 'string',
                    name: '行政区划',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'planningResultCode',
                    type: 'string',
                    name: '规划成果类型',
                    textAlign: 'center',
                    titleAlign: 'center',
                    format: function (data, value, ele, events) {
                        var label = ghcglxIdMap[value];
                        return label ? label : value;
                    },
                }, {
                    key: 'endtime',
                    type: 'string',
                    name: '审查通过时间',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'inventoryStatus',
                    type: 'string',
                    name: '入库状态',
                    textAlign: 'center',
                    titleAlign: 'center',
                    format: function (data, value, ele, events) {
                        if (data.inventoryStatus == 1) {
                            return '已入库';
                        } else {
                            return '未入库';
                        }
                    },
                }, {
                    width: '350px',
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
                            encodeURI(encodeURI(data.reviewState))
                            handleBtn.click((e) => {
                                implementationDialog({
                                    path: '/result/management/achievement_storage/review_iframe',
                                    width: '95%',
                                    params: {
                                        reviewState: data.reviewState,//审查状态
                                        icon: true,//是否显示检测图标
                                        readonly: false,//审查要点是否只读
                                        btn: true, //是否显示生成审查按钮
                                        huizhengWorkid: data.workid,
                                        huizhengTrackid: data.trackid,
                                        cgxxbId: data.cgxxbId
                                    },
                                    onClose: function () {
                                        _table.refresh()
                                    }
                                })
                            });
                            return handleBtn;
                        }/*,
                        //流程图按钮触发事件
                        function (unit, row, data, events) {
                            var chartBtn = $(`
                                <button class="layui-btn layui-btn-ys  layui-btn-sm">
                                    流程图
                                </button>
                            `)
                            chartBtn.click((e) => {
                                implementationDialog({
                                    path: '/result/management/achievement_storage/common_page',
                                    width: '95%',
                                    params: data,
                                    onClose: function () {
                                        _table.refresh()
                                    }
                                })
                            });
                            return chartBtn;
                        }*/
                        // function (unit, row, data, events) {
                        //     var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys"">日志</div>');
                        //     button.click((e) => {
                        //         e.stopPropagation();
                        //         e.preventDefault();
                        //         implementationDialog({
                        //             top: '5%',
                        //             width: '60%',
                        //             height: '80%',
                        //             path: '/result/management/achievement_storage/other_page/detail/log',
                        //             params: {},
                        //             title: '入库日志',
                        //             events: {},
                        //             onClose: function () {
                        //             },
                        //         });
                        //     });
                        //     return button;
                        // },
                    ]
                },
            ],
            rightButtons: [
                {
                    class: 'layui-btn buttonIcon add',
                    name: '成果入库',
                    event: function () {
                        var data = _table.getRadioValue();
                        if (data == null) {
                            top.layer.alert('未选择规划成果');
                            return;
                        }

                        if (data && data.cgxxbId) {
                            console.log(data.inventoryStatus);
                            if (data.inventoryStatus == 1) {
                                // 2021-04-13 陈薪名 修改原有注释部分，只弹出提示框
                                layer.alert("已入库的成果包不可以重复操作");
                            } else {
                                _this.$api.achievementCheck({
                                    cgxxbId: data.cgxxbId
                                }, function (res) {
                                    if (res.data === '已创建') {
                                        layer.confirm('数据库内已存在'
                                            + (data.administrativeDivision ? ('‘' + data.administrativeDivision + '’') : '')
                                            + '成果库信息，是否继续[入库]？', {
                                            skin: "con-skin",
                                            btn: ['确定', '取消']
                                        }, (res) => {
                                            layer.close(res);
                                            //_table.refresh();
                                            implementationDialog({
                                                top: '300px',
                                                width: '24%',
                                                height: '30%',
                                                path: '/result/management/achievement_storage/other_page/detail/confirm',
                                                params: { cgxxbId: data.cgxxbId },
                                                title: '确认入库',
                                                events: {},
                                                onClose: function () {
                                                    _table.refresh()
                                                },
                                            });
                                        });
                                    } else if (res.data === '未创建') {
                                        layer.confirm('确定要进行[入库]操作？', {
                                            skin: "con-skin",
                                            btn: ['确定', '取消']
                                        }, (res) => {
                                            layer.close(res);
                                            //_table.refresh()
                                            _this.$api.achievementWarehousing({
                                                cgxxbId: data.cgxxbId,
                                                mode: ''
                                            }, function (res) {
                                                _table.refresh()
                                            });
                                        });
                                    }
                                });
                            }
                        }
                    },
                    icon: 'squareAdd'
                },
                {
                    class: 'Test',
                    icon: 'software',
                    name: '筛选',
                    event: 'screen'
                }, {
                    class: 'Test',
                    icon: 'interactive',
                    name: '导出',
                    event: 'exportCSV'
                }, {
                    class: 'Test',
                    icon: 'listBook',
                    name: '打印',
                    event: 'print'
                }
            ],
            whereOptions: [
                {
                    key: 'xzqh',
                    labelText: '行政区划:',
                    getKey: 'dictValue',
                    object: customForm_districtLinkage,
                }, {
                    key: 'ghcglx',
                    type: 'select',
                    labelText: '规划成果类型：',
                    labelWidth: 112,
                    data: [],
                    showKey: 'label',
                    setKey: 'value',
                    getKey: 'object',
                }, {
                    key: 'inventoryStatus',
                    type: 'select',
                    labelText: '入库状态:',
                    data: 'OptionSide:RKZT',
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
                    getKey: 'object',
                    default: 'WRK',
                    showUnSelect: true,// 是否显示置空项 
                    UnSelectData: { // 置空项对象值设置
                        showName: ' 全部 ',
                        data: null,
                    },
                }
            ],
            whereButtons: [
                {
                    class: 'Test',
                    name: '查询',
                    event: 'search',
                },
                {
                    class: 'Test',
                    name: '重置',
                    // 2021-04-06 陈薪名 修改 重置功能
                    event: function () {
                        _table.reset();
                        _table.whereObject.inventoryStatus.set('WRK')
                        _table.whereObject.xzqh.reset();
                    },
                }
            ],
            getEvent: function (data, setData) {
                _this.$api.getAchievementPage({
                    planningResultCode: data.ghcglx ? (data.ghcglx.value ? data.ghcglx.value : '') : '',
                    inventoryStatus: data.inventoryStatus ? (data.inventoryStatus.dictValue === 'YRK' ? 1 : (data.inventoryStatus.dictValue === 'WRK' ? 0 : '')) : 0,
                    // adCode: data.xzqh === null? areacodeList[areacodeList.length-1] : data.xzqh ,
                    adCode: data.xzqh === null ? '' : data.xzqh,
                    page: data.page,
                    limit: data.limit
                }, function (res) {
                    setData({
                        count: res.data.total,
                        data: res.data.list,
                    });
                });
            },
        })
        this.$el.find('#achievementStorage').append(_table.html);

        _table.on('rowClick', function (data, table, row) {
            row.radioSelect();
        });

        var ghcglxIdMap = {}; // 规划成果类型value与label映射表
        // 获取规划成果类型
        this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                for (let i = 0; i < res.data.length; i++) {
                    ghcglxIdMap[res.data[i].value] = res.data[i].label;
                }

                // 添加全选项
                res.data.unshift({ 'value': '', 'label': '请选择' });
                _table.whereObject.ghcglx.setData(res.data);
                // _table.whereObject.ghcglx.set(res.data[1].value);
            }
            _table.init();
        });

        // 获取登录用户区划代码
        var areacodeList = session.get('userInfo').areacodeList;
        var districtCodes = [];
        if (areacodeList && areacodeList.length > 0) {
            for (let i = 0; i < areacodeList.length; i++) {
                if (areacodeList[i] !== null) {
                    districtCodes.push(areacodeList[i]);
                }
            }
        }
        // _table.whereObject.xzqh.set(districtCodes);
    },
    destroy: function () {
    },
};