////////////////////////////////////////////////
// 自然资源-成果审查与管理系统-编制进度管理-进度填报
////////////////////////////////////////////////

var session = icu.session;
export default {
    render: function () {
        var _this = this;
        var _table = new icu.table({
            tableOptions: {
                title: '进度填报',
                theme: 'evenColor',
                height:'650px',
                minWidth: 40,
            },
            cols: [
                {
                    key: "index",
                    type: 'index',
                    name: '序号',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'ghcglxId',
                    type: 'string',
                    name: '规划成果类型',
                    titleAlign: 'center',
                    textAlign: 'center',
                    format: function (data, value, ele, events) {
                        var label = ghcglxIdMap[value];
                        return label ? label : value;
                    },
                },
                {
                    key: 'districtName',
                    type: 'string',
                    name: '行政区名称',
                    titleAlign: 'center',
                    textAlign: 'center'
                },
                {
                    key: 'workProgressCode',
                    type: 'string',
                    name: '工作进展',
                    titleAlign: 'center',
                    textAlign: 'center',
                    format: function (data, value, ele, events) {
                        var label = ghjzIdMap[value];
                        return label ? label : value;
                    },
                },
                {
                    key: 'reportingUser',
                    type: 'string',
                    name: '创建人',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'reportingTime',
                    type: 'string',
                    name: '创建时间',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'updateTime',
                    type: 'string',
                    name: '更新时间',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'operate',
                    type: 'buttons',
                    name: '操作',
                    titleAlign: 'center',
                    textAlign: 'center',
                    buttons: [
                        function (unit, row, data, events) {
                            var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin-right: 10px;">填报</div>');
                            button.click((e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                implementationDialog({
                                    top: '5%',
                                    width: '80%',
                                    height: '87%',
                                    path: '/result/preparation/progress_report/other_page/add',
                                    params: data,
                                    title: '填报编制进度',
                                    events: {},
                                    onClose: function () {
                                        _table.refresh();
                                    },
                                });
                            });
                            return button;
                        }, function (unit, row, data, events) {
                            var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys">查看</div>');
                            button.click((e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                implementationDialog({
                                    top: '5%',
                                    width: '80%',
                                    height: '87%',
                                    path: '/result/preparation/progress_report/other_page/detail',
                                    params: data,
                                    title: '查看编制进度',
                                    events: {},
                                    onClose: function () {
                                    },
                                });
                            });
                            return button;
                        }
                    ],
                },
            ],
            whereOptions: [
                {
                    key:'ghcglx',
                    type: 'select',
                    labelText: '规划成果类型：',
                    labelWidth: 112,
                    data: [],
                    showKey: 'label',
                    setKey: 'value',
                    getKey: 'object',
                },
                {
                    key:'gzjz',
                    type: 'select',
                    labelText: '工作进展：',
                    labelWidth: 100,
                    data: 'OptionSide:GHJZ',
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
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
                _this.$api.reportingGetPage({
                    pageNum: data.page,
                    pageSize: data.limit,
                    ghcglxId: data.ghcglx ? (data.ghcglx.value ? data.ghcglx.value : '') : '',
                    workProgressCode: data.gzjz ? (data.gzjz.dictValue ? data.gzjz.dictValue : '') : '',
                    districtCodes:session.get('userInfo').areacodeList.toString()           //行政区代码数组
                }, function (res) {
                    console.log(res);
                    //刘长明修改 列表内容为空时，打印预览显示null  HNXGTKJ-1408
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].dictLabel = res.data.list[i].dictLabel == null ? '':res.data.list[i].dictLabel
                        res.data.list[i].dictValue = res.data.list[i].dictValue == null ? '':res.data.list[i].dictValue
                        res.data.list[i].districtCode = res.data.list[i].districtCode == null ? '':res.data.list[i].districtCode
                        res.data.list[i].districtName = res.data.list[i].districtName == null ? '':res.data.list[i].districtName
                        res.data.list[i].ghcglxId = res.data.list[i].ghcglxId == null ? '':res.data.list[i].ghcglxId
                        res.data.list[i].jdcjId = res.data.list[i].jdcjId == null ? '':res.data.list[i].jdcjId
                        res.data.list[i].jdtbxxbId = res.data.list[i].jdtbxxbId == null ? '':res.data.list[i].jdtbxxbId
                        res.data.list[i].planResultName = res.data.list[i].planResultName == null ? '':res.data.list[i].planResultName
                        res.data.list[i].progressCase = res.data.list[i].progressCase == null ? '':res.data.list[i].progressCase
                        res.data.list[i].reportingTime = res.data.list[i].reportingTime == null ? '':res.data.list[i].reportingTime
                        res.data.list[i].reportingUser = res.data.list[i].reportingUser == null ? '':res.data.list[i].reportingUser
                        res.data.list[i].updateTime = res.data.list[i].updateTime == null ? '':res.data.list[i].updateTime
                        res.data.list[i].updateUser = res.data.list[i].updateUser == null ? '':res.data.list[i].updateUser
                        res.data.list[i].workProgressCode = res.data.list[i].workProgressCode == null ? '':res.data.list[i].workProgressCode
                    } 
                    setData({
                        count: res.data.total,
                        data: res.data.list,
                    });
                });
            },          
        });
        this.$el.find('#progressReport').append(_table.html);
        
        var ghcglxIdMap = {}; // 规划成果类型value与label映射表
        var ghjzIdMap = {}; // 工作进展类型value与label映射表

        // 获取规划成果类型
        this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                for (let i = 0; i < res.data.length; i++) {
                    ghcglxIdMap[res.data[i].value] =  res.data[i].label;
                }

                // 添加全选项
                res.data.unshift({'value': '', 'label': '请选择'});
                _table.whereObject.ghcglx.setData(res.data);
                // _table.whereObject.ghcglx.set(res.data[1].value);
            }

            // 重新排序工作进展字典项
            var ghjz = icu.optionSide.get('GHJZ');
            if (ghjz && ghjz.length > 0) {
                ghjz.sort((a, b) => a.sort - b.sort);
                _table.whereObject.gzjz.setData(ghjz);

                for (let i = 0; i < ghjz.length; i++) {
                    ghjzIdMap[ghjz[i].dictValue] = ghjz[i].dictLabel;
                }
            }
            
            _table.init();
        });
    },
    destroy: function () {

    }
}