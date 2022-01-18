////////////////////////////////////////////////
// 成果审查与管理系统-编制进度管理-进度采集-新增进度采集
////////////////////////////////////////////////
export default {
    render: function () {
        var _this = this;
        var _form = icu.templateForm({
            labelwidth: 110,
        });
        var zTreeObj;
        _form.$setOptions([
            [{
                key: 'ghcglx',
                type: 'select',
                formlabel: '规划成果类型',
                col: 12,
                data: [],
                showKey: 'label',
                setKey: 'value',
                getKey: 'value',
                verify: {
                    text: '请选择',
                    rules: 'notNull'
                },
                onChange: function (value) {
                    // zTree 的参数配置
                    var setting = {
                        check: {
                            enable: true,           // 是否显示radio/checkbox
                            chkStyle: "checkbox",   // 值为checkbox或者radio表示
                            chkboxType: { "Y": "s", "N": "" }
                        },
                        data: {
                            key: {
                                name: 'adName',
                            }
                        },
                        callback: {}
                    };
                    // 采集范围，获取数据字典行政区域数据
                    _this.$api.getSysDictData({
                        ghcglxId: value, // 黑龙江省
                        value: icu.session.get("userInfo").areacodeList
                    }, function (res) {

                        var tableArray = [];
                        var _data = {};
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            _data[element.xzqhId] = element;
                        };
                        for (let d = 0; d < res.data.length; d++) {
                            const child = res.data[d];
                            if (_data.hasOwnProperty(child.pid)) {
                                if (!_data[child.pid].hasOwnProperty('children')) {
                                    _data[child.pid].children = [];
                                };
                                _data[child.pid].children.push(child);
                            } else {
                                tableArray.push(child);
                            }
                        };
                        zTreeObj = $.fn.zTree.init($("#tree"), setting, tableArray);
                        zTreeObj.expandNode(zTreeObj.getNodes()[0], true); // 展开第一个根节点  
                    });
                },
            }],
        ]);
        this.$el.find('.form_row').append(_form.$html);

        this.$el.find('#confirm').click(function () {
            _form.get(function (value) {
                // 行政区编码和行政区名称
                var districtNames = [];
                var districtCodes = [];
                var districts = zTreeObj.getCheckedNodes();
                if (!districts.length) {
                    layer.open({
                        title: '警告',
                        content: '请选择行政区划'
                    });
                    return;
                };

                var time = new Date();
                var createTime = time.getFullYear()
                    + '-' + ((time.getMonth() + 1) < 10 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1))
                    + '-' + (time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate())
                    + ' ' + (time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours())
                    + ':' + (time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes())
                    + ':' + (time.getSeconds() < 10 ? ('0' + time.getSeconds()) : time.getSeconds());

                for (let i = 0; i < districts.length; i++) {
                    districtNames[i] = districts[i].adName ? districts[i].adName : '';
                    districtCodes[i] = districts[i].xzqhId ? districts[i].xzqhId : '';
                };

                var postData = {
                    jdcjxxbId: value.jdcjxxbId || '',
                    jdtbxxbId: value.jdtbxxbId ? value.jdtbxxbId : '',
                    ghcglxId: value.ghcglx || '',
                    createTime: createTime,
                    districtNames: districtNames.toString(),
                    districtCodes: districtCodes.toString(),
                    workProgressCode: value.workProgressCode ? value.workProgressCode : '',
                    progressCase: value.progressCase ? value.progressCase : '',
                    reportingTime: createTime,
                };
                _this.$api.saveRramsScheduleGatherInfo(postData, function (res) {
                    if (res) {
                        _this.closeEvent();
                    }
                });
            });
        });

        this.$el.find('#cancel').click(function () {
            _this.closeEvent();
        });

        // 获取规划成果类型
        this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                _form.ghcglx.setData(res.data);
                // _form.ghcglx.set(res.data[0].value);
            }
        });



    },
    destroy: function () { }
}