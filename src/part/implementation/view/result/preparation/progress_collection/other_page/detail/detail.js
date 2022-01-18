////////////////////////////////////////////////
// 成果审查与管理系统-编制进度管理-进度采集-查看进度采集详情
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
                getKey: 'object',
                readonly: true,
                verify: {
                    text: '请选择',
                    rules: 'notNull'
                },
                onChange: function (value, callback) {
                    // zTree 的参数配置
                    var setting = {
                        check: {
                            enable: true,           // 是否显示radio/checkbox
                            chkStyle: "checkbox",   // 值为checkbox或者radio表示
                            chkboxType: { "Y": "s", "N": "" },
                            chkDisabledInherit: true
                        },
                        data: {
                            key: {
                                name: 'adName',
                            }
                        },
                        callback: {}
                    };
                    // 采集范围，获取数据字典行政区域数据
                    // console.log(icu.session.get("userInfo").areacodeList[0]);
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
                            child.chkDisabled= true
                            if (_data.hasOwnProperty(child.pid)) {
                                if (!_data[child.pid].hasOwnProperty('children')) {
                                    _data[child.pid].children = [];
                                };
                                _data[child.pid].children.push(child);
                            } else {
                                if(_this.$data.checkout){
                                    // child. = true
                                }
                                
                                tableArray.push(child);
                            }
                        };
                        zTreeObj = $.fn.zTree.init($("#tree"), setting, tableArray);
                        zTreeObj.expandNode(zTreeObj.getNodes()[0], true); // 展开第一个根节点  
                        

                        if (callback) {
                            callback();
                        };
                    });
                },
            }],
        ]);
        this.$el.find('.form_row').append(_form.$html);
        // 获取规划成果类型
        this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                _form.ghcglx.setData(res.data);
                _form.set({
                    ghcglx: _this.$data.ghcglxId
                });
                _form.ghcglx.event.change(_this.$data.ghcglxId, function () {
                    // 根据api返回的数据，选中并展开节点
                    _this.$api.selectDistrictCode({
                        jdcjxxbId: _this.$data.jdcjxxbId,
                    }, function (res2) {
                        for (let i = 0; i < res2.data.length; i++) {
                            var dictValue = res2.data[i].replace(/\D/g, ''); // 清洗数据
                            var node = zTreeObj.getNodeByParam("xzqhId", dictValue);
                            if (node !== null) {
                                zTreeObj.setChkDisabled(node, false)
                                zTreeObj.checkNode(node, true);
                                zTreeObj.expandNode(node, true);
                                zTreeObj.setChkDisabled(node, true)
                                
                            }
                            
                        }
                    });
                    // for (let i = 0; i < zTreeObj.getNodes().length; i++) {
                    //         const element = zTreeObj.getNodes()[i];
                    //         zTreeObj.setChkDisabled(element, true);
                    //         //zTreeObj.updateNode(element);
                    //     }
                });
            }
        });
    },
    destroy: function () { }
}