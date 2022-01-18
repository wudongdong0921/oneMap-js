import calendar from "./calendar"
// import tableComponent from "../../component/table";


export default  {
    render: function () {
        var table = layui.table;
        var _this = this;
        var toDoListSum = 0;
        var doneListSum = 0;
        var myChart_cm1 = null;

        var tableExToDo = new icu.table({
            tableOptions: {
                height: _this.$el.find('#toDoList').height() - 90,
            }, // 数据表格部分参数 
            pagingOptions: {
                hasQuick: true, // 开启快速跳页
                limitPage: true, // 开启筛选分页
                countPage: true, // 开启总页数
                index: 1, // 初始页面序号
                count: 4,
            },
            cols: [
                { key: 'xmmc', type: 'string', titleAlign: 'center', textAlign: 'center',name: '项目名称', width: '350px' },
                { key: 'nodename', type: 'string', titleAlign: 'center', textAlign: 'center',name: '当前环节', width: '200px' },
                { key: 'xmbh', type: 'string', titleAlign: 'center', name: '项目编号', width: '150px' },
                { key: 'sendtime', type: 'string', titleAlign: 'center', textAlign: 'center',name: '接收时间', width: '200px' },
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
                                showsubmit: true,
                                readonly: false,
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
                                    tableExToDo.refresh();
                                    tableExDone.refresh();
                                    charat.pushData();
                                },
                            });
                        });
                        return button;
                    }],
                }
            ],
            getEvent: function (data, setData) {

                _this.$api.getTodoList({
                    page: data.page,
                    limit: data.limit,
                    startTime: null,
                    endTime: null,
                    xmbh: null,
                    xmmc: null,
                }, function (res) {
                    setData({
                        count: res.count || 0,
                        data: res.data || [],
                    });
                    toDoListSum = res.count || 0;
                    _this.$el.find('#toDoListSum').text("( " + toDoListSum + " ) ");


                    if (data.limit != 4) {
                        tableExToDo.pagingElement.find('.layui-laypage-limits select').prepend('<option value="4">4 条/页</option>')
                    } else {
                        tableExToDo.pagingElement.find('.layui-laypage-limits select').prepend('<option value="4" selected="selected">4 条/页</option>')
                    }

                });
            }
        });



        _this.$el.find('#toDoList').append(tableExToDo.html);
        tableExToDo.init();
        tableExToDo.tableObject.objs.title.setWidth();
        tableExToDo.whereBox.css({
            display: 'none'
        });

        var tableExDone = new icu.table({
            tableOptions: {
                height: _this.$el.find('#toDoList').height() - 90,
            }, // 数据表格部分参数 
            pagingOptions: {
                hasQuick: true, // 开启快速跳页
                limitPage: true, // 开启筛选分页
                countPage: true, // 开启总页数
                index: 1, // 初始页面序号
                count: 4,
            },
            cols: [
                { key: 'xmmc', type: 'string', titleAlign: 'center', textAlign: 'center', name: '项目名称', width: '350px' },
                { key: 'nodename', type: 'string', titleAlign: 'center', textAlign: 'center', name: '已办环节', width: '200px' },
                { key: 'xmbh', type: 'string', titleAlign: 'center', textAlign: 'center', name: '项目编号', width: '150px' },
                { key: 'sendtime', type: 'string', titleAlign: 'center', textAlign: 'center', name: '接收时间', width: '200px' },
                {
                    key: 'buttons', type: 'buttons', name: '操作', titleAlign: 'center', textAlign: 'center', width: '120px', buttons: [function (unit, row, data, events) {
                        var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin-right: 10px;">查看</div>');
                        button.click((e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            var _data = {
                                flowid: data.flowid,
                                workid: data.workid,
                                trackid: data.trackid,
                                nodeid: data.nodeid,
                                readonly: 1,
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
                                    tableExToDo.refresh();
                                    tableExDone.refresh();
                                    charat.pushData();
                                },
                            });
                        });
                        return button;
                    }],
                }
            ],
            getEvent: function (data, setData) {
                _this.$api.getDoneList({
                    page: data.page,
                    limit: data.limit,
                    startTime: null,
                    endTime: null,
                    xmbh: null,
                    xmmc: null,
                }, function (res) {
                    setData({
                        count: res.count || 0,
                        data: res.data || [],
                    });
                    doneListSum = res.count || 0;
                    _this.$el.find('#doneListSum').text("( " + doneListSum + " ) ");

                    if (data.limit != 4) {
                        tableExDone.pagingElement.find('.layui-laypage-limits select').prepend('<option value="4">4 条/页</option>')
                    } else {
                        tableExDone.pagingElement.find('.layui-laypage-limits select').prepend('<option value="4" selected="selected">4 条/页</option>')
                    }
                });
            }
        });
        _this.$el.find('#doneList').append(tableExDone.html);
        tableExDone.init();
        tableExDone.tableObject.objs.title.setWidth();
        tableExDone.whereBox.css({
            display: 'none'
        });

        var charat = {
            pushData:function(){
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'left',
                    },
                    series: [
                        {
                            name: '业务统计',
                            type: 'pie',
                            radius: '70%',
                            center: ['30%', '50%'],
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                _this.$api.getChartData1(function (res) {                
                    var _array = [];
                    var _name = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var element = res.data[i];
                        _array.push({
                            name: element.TYPE,
                            value: element.NUM
                        });
                        _name.push(element.TYPE);
                    }
                    option.series[0].data = _array;
                    option.legend.data = _name;
                    myChart_cm1.setOption(option);
                    myChart_cm1.hideLoading();
                });
            }
        };

        setTimeout(() => {
            if(!myChart_cm1){
                myChart_cm1 = echarts.init(_this.$el.find('#chart_main1')[0], 'infographic');
            }

            myChart_cm1.showLoading({
                text: '正在加载数据'
            });
            charat.pushData();

        }, 400);

        var _calendar = new calendar();
        _this.$el.find('#test-n1').append(_calendar.render());
        var myDate = new Date();
        var tYear = myDate.getFullYear();
        var tMonth = myDate.getMonth();
        _calendar.renderDayslist(tYear, tMonth + 1);
    }
};