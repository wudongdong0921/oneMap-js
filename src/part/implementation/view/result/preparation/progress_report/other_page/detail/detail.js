////////////////////////////////////////////////
// 成果审查与管理系统-编制进度管理-进度填报-查看编制进度详情
////////////////////////////////////////////////
export default {
    render: function () {
        var _this = this;
        var progressCaseValue = "";
        var _form = icu.templateForm({});
        _form.$setOptions(
            [
                [
                    {
                        key: 'ghcglx',
                        type: 'select',
                        formlabel: '规划成果类型',
                        col: 5,
                        data: [],
                        showKey: 'label',
                        setKey: 'value',
                        getKey: 'object',
                        verify: {
                            text: '请选择',
                            rules: 'notNull'
                        },
                        readonly: true,
                    },
                    {
                        key: 'districtName',
                        type: 'input',
                        formlabel: '行政区名称',
                        col: 5,
                        data: '哈尔滨市',
                        verify: {
                            text: '请选择',
                            rules: 'notNull'
                        },
                        readonly: true,
                    }
                ],
                [
                    {
                        key: 'gzjz',
                        type: 'select',
                        formlabel: '工作进展',
                        col: 5,
                        data: 'OptionSide:GHJZ',
                        showKey: 'dictLabel',
                        setKey: 'dictValue',
                        getKey: 'object',
                        verify: {
                            text: '请选择',
                            rules: 'notNull'
                        },
                        readonly: true,
                    }, 
                    {
                        key: 'districtCode',
                        type: 'input',
                        formlabel: '行政区代码',
                        col: 5,
                        data: '230100',
                        verify: {
                            text: '请选择行政区代码',
                            rules: 'notNull'
                        },
                        readonly: true,
                    }
                ],
                [
                    {
                        key: 'progressCase',
                        type: 'textarea',
                        formlabel: '进展情况',
                        col: 10,
                        data: '',
                        readonly: true,
                        verify: {
                            text: '进展情况',
                            rules: 'gre$200'
                        },
                    }
                ],
                [
                    {
                        key: 'reportingUser',
                        type: 'input',
                        formlabel: '创建人',
                        col: 5,
                        data: '张三',
                        readonly: true,
                    },
                    {
                        key: 'reportingTime',
                        type: 'input',
                        formlabel: '创建时间',
                        col: 5,
                        data: '2020-09-12 12:30:32',
                        readonly: true,
                    },
                ],
            ]
        );
        this.$el.find('.top_left_content').append(_form.$html);

        // 首先获取规划成果类型，再获取表单数据
        this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                // 添加全选项
                res.data.unshift({'value': '', 'label': '请选择'});
                _form.ghcglx.setData(res.data);
                
                _this.$api.selectRramsScheduleReportingById({
                    jdtbxxbId: _this.$data.jdtbxxbId,
                }, function (res2) {
                    if (res2 && res2.data) {
                        // 设置规划成果类型select选项
                        if (res2.data.ghcglxId) {
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].value === res2.data.ghcglxId) {
                                    _form.ghcglx.set(res.data[i].value);
                                    break;
                                }
                            }
                        }
                        
                        // 重新排序工作进展字典项
                        var ghjz = icu.optionSide.get('GHJZ');
                        if (ghjz && ghjz.length > 0) {
                            ghjz.sort((a, b) => a.sort - b.sort);
                            _form.gzjz.setData(ghjz);
                        }

                        // 设置工作进展select选项
                        if (res2.data.workProgressCode) {
                            var index = 0; // 当前工作进展索引
                            for (let i = 0; i < _form.gzjz.options.data.length; i++) {
                                if (_form.gzjz.options.data[i].dictValue === res2.data.workProgressCode) {
                                    index = i;
                                    break;
                                }
                            }
                            // for (let i = 0; i < _form.gzjz.options.data.length; i++) {
                            //     if (i > index) {
                            //         changeTopRightPartCircleBgColor(i);
                            //     }
                            // }
                            _form.gzjz.set(res2.data.workProgressCode);
                        }

                        _form.set({
                            districtName: res2.data.districtName ? res2.data.districtName : '',
                            districtCode: res2.data.districtCode ? res2.data.districtCode : '',
                            //progressCase: res2.data.progressCase ? res2.data.progressCase : '',
                            reportingUser: res2.data.reportingUser ? res2.data.reportingUser : '',
                            reportingTime: res2.data.reportingTime ? res2.data.reportingTime : '',
                            progressCase:progressCaseValue? progressCaseValue : '',
                        });
                    }
                });
            }
        });

        var changeTopRightPartCircleBgColor = function (index) {
            _this.$el.find('#gzjz'+(index+1)).css({'background-color':'#17b4a3',});
        };

        var _table = new icu.table({
            tableOptions: {
                title: '',
                class: 'FD-UI',
                theme: 'default',
                minWidth: 120,
                height: false,
                titleAlign: 'left',
            },
            cols: [
                {
                    key: "workProgress",
                    type: 'string',
                    name: '工作进展',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: "reportingTime",
                    type: 'string',
                    name: '填报时间',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: "progressCase",
                    type: 'string',
                    name: '进展情况',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
            ],
            whereOptions: [],
            pagingOptions: {
                hasQuick: false,
                limitPage: false,
                countPage: false,
            },
            whereButtons: [],
            rightButtons: [],
            getEvent: function (data, setData) {
                _this.$api.selectRramsSrCentreById({
                    jdtbxxbId: _this.$data.jdtbxxbId,
                }, function (res) {
                    if(res.data.length>0){
                        progressCaseValue = res.data[res.data.length-1].progressCase;
                    }
                    for (let m = 0; m < res.data.length; m++) {
                        changeTopRightPartCircleBgColor(m);
                    }
                    if (res && res.data) {
                        setData({
                            count: res.data.length,
                            data: res.data,
                        });
                    }
                });
            },
        });
        this.$el.find('.top_right_bottom').append(_table.html);
        _table.init();
        this.$el.find('.layout-table-paging').hide();
    },
    destroy: function () { }
}