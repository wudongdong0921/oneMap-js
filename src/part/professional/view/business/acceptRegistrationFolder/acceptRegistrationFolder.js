// import table from '../../../component/table'
// import select from '../../component/from/select'
export default  {
    render: function (template, params, event) {
        var _this = this;
        
        this.$api.renderGetFlowDefList(function (res) {
            var fromType = _this.$data.from;
            var tableEx = {};
            var tableOption = {
                tableOptions: {
                    height: 400,
                },
                whereOptions: [
                    { type: 'input', placeholder: '请输入项目名称或项目编号', key: 'projectNameOrNum' },
                ],
                whereButtons: [
                    { name: '查询', class: "layui-search testo layui-btn-blue", event: 'search' },
                    {
                        name: '重置',
                        class: "layui-reset testo",
                        event: function(params) {
                            tableEx.reset();
                            tableEx.whereObject.flowname.clearData();
                        }
                    },
                ],
                cols: [
                    { type: 'index', name: '序号' ,width: '70px',titleAlign: 'center',textAlign: 'center'},
                    {
                        key: 'trackstatus', type: 'string', titleAlign: 'center',textAlign: 'center', name: '状态', width: '90px', format: function (d, value, ele, events)  {
                            var html = '';
                           
                            if (d.trackstatus.indexOf("130") > -1) {
                                html = '<span class="trackstatus" style="background:#F9AD58">驳<i></i>回</span>';
                            } else if (d.trackstatus.indexOf("190") > -1) {
                                html = '<span class="trackstatus" style="background:#006699">拿<i></i>回</span>';
                            } else if (d.trackstatus.indexOf("140") > -1) {
                                html = '<span class="trackstatus" style="background:#006699">挂<i></i>起</span>';
                            } else if (d.trackstatus.indexOf("170") > -1) {
                                html = '<span class="trackstatus" style="background:#878787">结<i></i>束</span>';
                            } else if (d.trackstatus.indexOf("180") > -1) {
                                html = '<span class="trackstatus" style="background:#878787">终<i></i>止</span>';
                            } else if (d.trackstatus.indexOf("190") > -1) {
                                html = '<span class="trackstatus" style="background:#006699">拿<i></i>回</span>';
                            } else {
                                html = '<span class="trackstatus" style="background:#22C7C9">正<i></i>常</span>';
                            }
                            return html
                        }
                    },
                    { key: 'xmmc', type: 'string', titleAlign: 'center',textAlign: 'center', name: '项目名称' },
                    { key: 'flowname', type: 'string', titleAlign: 'center',textAlign: 'center', name: '业务类型', width: '250px' },
                    { key: 'nodename', type: 'string', titleAlign: 'center',textAlign: 'center', name: '当前环节', width: '140px' },
                    { key: 'xmbh', type: 'string', titleAlign: 'center',textAlign: 'center', name: '项目编号', width: '150px' },
                    { key: 'workStartTime', type: 'string', titleAlign: 'center',textAlign: 'center', name: '受理时间', width: '180px' },
                    {
                        key: 'buttons', type: 'buttons', name: '操作', titleAlign: 'center',textAlign: 'center', width: '120px', buttons: [function (unit, row, data, events) {
                            var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin-right: 10px;">查看</div>');
                            button.click((e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                var _data = {
                                    flowid: data.flowid,
                                    workid: data.workid,
                                    trackid: data.trackid,
                                    nodeid: data.nodeid,
                                    readonly: true,
                                };
                                professionalDialog({
                                    top: '30px',
                                    width: '85%',
                                    height: '95%',
                                    path: '/professional/mission/' + data.flowid + '/await',
                                    params: _data,
                                    title: data.flowname,
                                    events: {},
                                    onClose: function () {
                                        /*tableEx.search(tableEx);*/
                                    },
                                });
                            });
                            return button;
                        }],
                    }
                ],
                getEvent: function (data, setData) {
                    var typename = (data.typename ? (data.typename == 'other' ? '' : data.typename) : null);
                    _this.$api.acceptRegistrationFolderList({
                        "flowname": data.flowname,
                        "typename": typename,
                        "projectNameOrNum": data.projectNameOrNum,
                        "page": data.page,
                        "limit": data.limit,
                        "prodefs": (_this.$query.prodefs == '0' ? '' : _this.$query.prodefs),
                        "userId": (_this.$query.user == '0' ? false : true),
                        "deptId": (_this.$query.dep == '0' ? false : true),
                        "status": (_this.$query.status == '0' ? '' : _this.$query.status),
                    }, function (res) {
                        console.log(res);                       
                        setData({
                            count: res.count || 0,
                            data: res.data || [],
                        });
                    });
                }
            };
            tableOption.whereOptions.push({
                text: '', type: 'select', placeholder: '请选择流程类别', key: 'typename', data: res,
                onChange: function () {
                    if (this.value) {
                        tableEx.whereObject.flowname.setData(this.valueData.children);
                    } else {
                        tableEx.whereObject.flowname.setData([]);
                    }
                }
            })
            tableOption.whereOptions.push({
                text: '', type: 'select', placeholder: '请选择业务类型',
                showKey: 'label', setKey: 'value', getKey: 'value', key: 'flowname', data: [],
            });
            tableOption.tableOptions.height = _this.$el.find('.already').height() - 150;
            tableEx = new icu.table(tableOption);
            _this.$el.find('.already').append(tableEx.html);
            tableEx.tableObject.objs.title.setWidth();
            tableEx.init();
            if (_this.$query.prodefs == 0) {
                tableEx.whereObject.flowname.setData([]);
            };
            tableEx.whereObject.flowname.name.click(() => {
                if (tableEx.whereObject.flowname.child.length == 0) {
                    layer.open({
                        title: '警告',
                        content: '请先选择流程类别'
                    });
                }
            });

        });
    },
    destroy: function () {

    },
}