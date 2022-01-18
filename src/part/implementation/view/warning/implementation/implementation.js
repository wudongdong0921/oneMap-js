////////////////////////////////////////////////
// 实施评估
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////

import renderView from '../../../commont/renderView'


export default {
    _table: null,
    adCode: '',
    adCodeName: '',
    /**
     * 获取行政区域
     */
    //任航修改行政区划
    fnGetXZQYList() {
        var _this = this;
        this.$api.getDictList({
            type: 'XZQY',
            value: icu.session.get("userInfo").areacodeList
        }, function (res) {
            if (res && res.data) {
                var treeData = _this.jsonTree(res.data, {});
                if (treeData && treeData.length > 0) {
                    _this.adCode = treeData[0].dictValue;
                    _this.adCodeName = treeData[0].dictLabel;
                    _this._table.refresh();
                }
                var wdt = renderView(_this.$el.find("#tree"), "/viewComponent/tree", {
                });
                wdt.onReady(() => {
                    var treeObj = wdt.treeInit(treeData);
                });
                wdt.onChange(value => {
                    _this.adCode = value.dictValue;
                    _this.adCodeName = value.dictLabel;
                    _this._table.refresh();
                })
            }
        });
    },
    render() {
        var _this = this;
        this._table = new icu.table({
            tableOptions: {
                title: "已办审查",
                minWidth: 40,
                theme: 'evenColor',
                height: this.$el.height() - 160,
            },
            cols: [
                {
                    type: 'checkBox',
                    width: '40px'
                },
                {
                    width: '60px',
                    key: 'index',
                    type: 'index',
                    name: '序号',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'districtName',
                    type: 'string',
                    name: '行政区划',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'districtCode',
                    type: 'string',
                    name: '行政区划代码',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'reportName',
                    type: 'string',
                    name: '报告名称',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'reportSource1',
                    type: 'string',
                    name: '报告来源',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'assessUser',
                    type: 'string',
                    name: '评估人员',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'assessYear',
                    type: 'string',
                    name: '评估年份',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'assessDate',
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
                                    path: '/warning/implementation/check-dialog',
                                    top: '120px',
                                    width: '60%',
                                    height: '60%',
                                    title: '查看报告',
                                    params: {
                                        sspgId: data.sspgId,
                                        data: data
                                    },
                                    onClose: function () {
                                        _this._table.refresh()
                                    }
                                })
                            });
                            return handleBtn;
                        },
                        function (unit, row, data, events) {
                            if (data.reportSource != 'SDSC') {
                                return '';
                            }
                            var handleBtn = $(`
                            <button class="layui-btn layui-btn-ys  layui-btn-sm" style="margin-right:10px">
                                编辑
                            </button>
                        `);
                            handleBtn.click((e) => {
                                implementationDialog({
                                    path: '/warning/implementation/update-dialog',
                                    top: '120px',
                                    width: '60%',
                                    height: '60%',
                                    title: '上传报告',
                                    params: {
                                        data: data
                                    },
                                    onClose: function () {
                                        _this._table.refresh()
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
                    key: 'reportName',
                    type: 'input',
                    labelText: '报告名称:',
                    onChange: function (e) {

                    }
                }, {
                    key: 'reportSource',
                    type: 'select',
                    labelText: '报告来源:',
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
                    getKey: 'dictValue',
                    data: "OptionSide:BGLY",
                    onChange: function (e) {

                    }
                }
            ],
            whereButtons: [
                {
                    class: 'test',
                    name: '查询',
                    event: 'search',
                },
                {
                    class: 'test',
                    name: '重置',
                    event: 'reset',
                }
            ],
            rightButtons: [
                {
                    class: 'Test',
                    icon: 'squareAdd',
                    name: '生成报告',
                    event: function () {
                        implementationDialog({
                            path: '/warning/implementation/create-dialog',
                            top: '120px',
                            width: '80%',
                            height: '750px',
                            title: '报告生成',
                            params: {
                                adCode: _this.adCode,
                                adCodeName: _this.adCodeName
                            },
                            onClose: function () {
                                _this._table.refresh()
                            }
                        })
                    },
                }, {
                    class: 'Test',
                    icon: 'squareAdd',
                    name: '上传报告',
                    event: function () {
                        _this.$api.uploadReportDetailsByXzqhId({
                            xzqhId: _this.adCode
                        }, function (res) {
                            if (res.code == 0) {
                                implementationDialog({
                                    path: '/warning/implementation/update-dialog',
                                    top: '120px',
                                    width: '60%',
                                    height: '60%',
                                    title: '上传报告',
                                    params: {
                                        data: res.data
                                    },
                                    onClose: function () {
                                        _this._table.refresh()
                                    }
                                })
                            }
                        });
                    },
                }, {
                    class: 'Test',
                    icon: 'delete',
                    name: '删除',
                    event: function () {
                        var data = _this._table.getCheckBoxValue();
                        if (data.length > 0) {
                            top.layer.confirm('确认删除吗？', function (index) {
                                var ids = Array.from(data, item => item.sspgId);
                                _this.$api.deleteMaaewIeInfo({
                                    sspgIds: ids,
                                }, function (res) {
                                    // success();
                                    top.layer.alert("删除成功！");
                                    top.layer.close(index)
                                    if (res.code == 0) {
                                        _this._table.refresh()
                                    }
                                });
                            })
                        } else {
                            top.layer.alert("请先选择要删除的数据");
                        }
                    }
                }
            ],
            getEvent: function (data, setData) {
                if (_this.adCode != '') {
                    _this.$api.implementationEvaluationListPage({
                        adCode: _this.adCode,
                        limit: data.limit,
                        page: data.page,
                        reportSource: data.reportSource == null ? '' : data.reportSource,
                        reportName: data.reportName == null ? '' : data.reportName,
                    }, function (res) {
                        if (res.code == 200) {
                            setData({
                                count: res.count, // 表格总条数
                                data: res.data// 表格数据
                            });
                        }
                    });
                } else {
                    setData({
                        count: 0, // 表格总条数
                        data: []// 表格数据
                    });
                }
            },
        })
        this.$el.find('#list').append(this._table.html);
        this._table.init();
        this.fnGetXZQYList();
    },
    jsonTree(data, config) {
        data.forEach(element => {
            element.name = element.dictLabel;
            delete element.children;
        });
        var id = config.id || 'id',
            pid = config.pid || 'pid',
            children = config.children || 'children';
        var idMap = [],
            jsonTree = [];
        data.forEach(function (v) {
            idMap[v[id]] = v;
        });
        data.forEach(function (v) {
            var parent = idMap[v[pid]];
            if (parent) {
                !parent[children] && (parent[children] = []);
                parent[children].push(v);
            } else {
                jsonTree.push(v);
            }
        });
        return jsonTree;
    },
    destroyed() {

    },
}
