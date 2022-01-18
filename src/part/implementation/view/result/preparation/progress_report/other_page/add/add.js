////////////////////////////////////////////////
// 成果审查与管理系统-编制进度管理-进度填报-新建编制进度
////////////////////////////////////////////////
import request from "../../../../../../../../common/ajax";

export default {
    render: function () {
        var _this = this;
        var progressCaseValue = "";
        var _form = icu.templateForm({});
        var _progressCaseMap = new Map();
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
                        data: '',
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
                        onChange: function(e) {
                            var progressCaseValue = _progressCaseMap.get(e.dictLabel);
                            _form.set({
                                progressCase: progressCaseValue == undefined? '':progressCaseValue,
                            });
                        }
                    }, 
                    {
                        key: 'districtCode',
                        type: 'input',
                        formlabel: '行政区代码',
                        col: 5,
                        data: '',
                        verify: {
                            text: '请选择',
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
                        data: '',
                        readonly: true,
                    },
                    {
                        key: 'reportingTime',
                        type: 'input',
                        formlabel: '创建时间',
                        col: 5,
                        data: '',
                        readonly: true,
                    },
                ],
            ]
        );
        this.$el.find('.top_left_content').append(_form.$html);

        var dataSize = 0;
        _this.$api.selectRramsSrCentreById({
            jdtbxxbId: _this.$data.jdtbxxbId,
        }, function (res) {
            if(res.data){
                dataSize = res.data.length;
            }
        });

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
                            // 可以选已完成的和当前的工作进展步骤，不可以选择当前之后的工作进展步骤
                            var index = 0; // 当前工作进展索引
                            for (let i = 0; i < _form.gzjz.options.data.length; i++) {
                                if (_form.gzjz.options.data[i].dictValue === res2.data.workProgressCode) {
                                    index = i;
                                    break;
                                }
                            }
                            if(index != 0 || dataSize != 0){
                                index += 1;
                            }
                            for (let i = 0; i < _form.gzjz.options.data.length; i++) {
                                if (i > index || i < index - 1) {
                                    _form.gzjz.child[i].html.addClass('noClick');
                                    _form.gzjz.child[i].html.css({
                                        background: '#eee',
                                    });
                                    // changeTopRightPartCircleBgColor(i);
                                }
                            }
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
            _this.$el.find('#gzjz'+ index ).css({'background-color':'#17b4a3',});
        };

        var _table = new icu.table({
            tableOptions : {
                title: '',
                class: 'FD-UI',
                theme: 'default',
                minWidth: 120,
                height: false,
                titleAlign: 'left',
            },
            cols : [
                {
                    key: "workProgress",
                    type: 'string',
                    name: '工作进展',
                    width:'193px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: "reportingTime",
                    type: 'string',
                    name: '填报时间',
                    width:'194px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: "progressCase",
                    type: 'string',
                    name: '进展情况',
                    width:'195px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
            ],
            whereOptions : [], 
            pagingOptions : {
                hasQuick: false,
                limitPage: false,
                countPage: false,
            },
            whereButtons : [],
            rightButtons : [],
            getEvent: function (data, setData) {
                _this.$api.selectRramsSrCentreById({
                    jdtbxxbId: _this.$data.jdtbxxbId,
                }, function (res) {
                    _progressCaseMap = new Map();
                    if(res.data.length>0){
                        progressCaseValue = res.data[res.data.length-1].progressCase;
                        res.data.forEach(function(value,key){
                            _progressCaseMap.set(value.workProgress,value.progressCase)
                        });
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
        
        this.$el.find('#save').click(function () {
            _form.get(function (value) {
                if (value) {
                    _this.$api.saveRramsScheduleReportingInfo({
                        jdtbxxbId: _this.$data.jdtbxxbId,             // 进度填报信息表编码 (string)
                        workProgressCode: value.gzjz.dictValue,       // 工作进展编码 (string)
                        progressCase: value.progressCase,             // 进展情况 (string)
                        reportingUser: value.reportingUser,           // 填报人 (string)
                    }, function (res) {
                        if (res) {
                            _this.closeEvent();
                        }
                    },function (res){
                        top.layer.alert(res.msg);
                    });
                }
            });
            
        });
    },
    destroy: function () { }
}