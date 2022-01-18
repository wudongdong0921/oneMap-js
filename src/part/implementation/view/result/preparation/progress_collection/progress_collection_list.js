////////////////////////////////////////////////
// 自然资源-成果审查与管理系统-编制进度管理-进度采集
////////////////////////////////////////////////
export default {
    render: function () {
        var _this = this;
        var _table = new icu.table({
            tableOptions: {
                title: '进度采集',
                theme: 'evenColor',
                height: '650px',
                minWidth: 40,
            },
            cols: [
                {
                    type: 'checkBox',
                    width: '2%',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: "index",
                    type: 'index',
                    name: '序号',
                    width: '5%',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'ghcglxId',
                    type: 'string',
                    name: '规划成果类型',
                    width: '15%',
                    titleAlign: 'center',
                    textAlign: 'center',
                    format: function (data, value, ele, events) {
                        var label = ghcglxIdMap[value];
                        return label ? label : value;
                    },
                },
                {
                    key: 'createUser',
                    type: 'string',
                    name: '创建人',
                    width: '20%',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'createTime',
                    type: 'string',
                    name: '创建时间',
                    width: '20%',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    type: 'buttons',
                    name: '操作',
                    width: '10%',
                    titleAlign: 'center',
                    textAlign: 'center',
                    buttons: [function (unit, row, data, events) {
                        var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin-right: 10px;">查看</div>');
                        button.click((e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            _this.$api.selectRramsScheduleGatherById({
                                jdcjxxbId: data.jdcjxxbId,
                            }, function (res) {
                                
                                if (res && res.data) {
                                    res.data.checkout=true
                                    implementationDialog({
                                        top: '25%',
                                        width: '40%',
                                        height: '50%',
                                        path: '/result/preparation/progress_collection/other_page/detail',
                                        params: res.data,
                                        title: '成果编制进度采集',
                                        events: {},
                                        onClose: function () {
                                        },
                                    });
                                }
                            });
                        });
                        return button;
                    }],
                },
            ],
            whereOptions: [
                {
                    key: 'ghcglx',
                    type: 'select',
                    labelText: '规划成果类型：',
                    labelWidth: 112,
                    data: [],
                    showKey: 'label',
                    setKey: 'value',
                    getKey: 'object',
                }
            ],
            pagingOptions: {
                hasQuick: true,
                limitPage: true,
                countPage: true,
            },
            whereButtons: [
                {
                    class: 'Test',
                    name: '查询',
                    event: 'search'
                },
                {
                    class: 'Test',
                    name: '重置',
                    event: 'reset'
                },
            ],
            rightButtons: [
                {
                    class: 'Test',
                    name: '新增进度采集',
                    event: function (event) {
                        implementationDialog({
                            top: '25%',
                            width: '40%',
                            height: '50%',
                            path: '/result/preparation/progress_collection/other_page/add',
                            params: {},
                            title: '成果编制进度采集',
                            events: {},
                            onClose: function () {
                                event.whereObject.ghcglx.set('')
                                _table.refresh();
                            },
                        });

                    },
                    icon: 'squareAdd',
                },
                {
                    class: 'Test',
                    name: '删除',
                    event: function (event) {

                        var data = _table.getCheckBoxValue();
                        if (data) {
                            if (data.length === 0) {
                                top.layer.alert("请选择一个进度采集！");
                                return;
                            }
                            if (data.length > 0) {
                                var jdcjxxbIds = [];
                                for (let i = 0; i < data.length; i++) {
                                    jdcjxxbIds[i] = data[i].jdcjxxbId;
                                }
                                top.layer.confirm('是否删除？', function (index) {
                                    _this.$api.deleteRramsScheduleGatherByIdsInfo({
                                        jdcjxxbIds: jdcjxxbIds.toString(),
                                    }, function (res) {
                                        top.layer.alert("删除成功！");
                                        top.layer.close(index)
                                        _table.refresh();
                                    },function (res){
                                        top.layer.alert("数据已删除！");
                                        top.layer.close(index);
                                        _table.refresh();
                                    });
                                })
                            }
                        }
                    },
                    icon: 'squareAdd',
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
            getEvent: function (data, setData) {
                _this.$api.getPage({
                    ghcglxId: data.ghcglx ? (data.ghcglx.value ? data.ghcglx.value : '') : '',
                    pageNum: data.page,
                    pageSize: data.limit,
                }, function (res) {
                    setData({
                        count: res.data.total,
                        data: res.data.list,
                    });
                });
            },
        });
       
        this.$el.find('#progressCollection').append(_table.html);
        _table.init();
        _table.tableObject.objs.title.setWidth();
       
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

        });
    },
    destroy: function () {

    }
}