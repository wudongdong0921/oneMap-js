// import table from '../../../../component/table'

export default  {
    render: function (template, params, EVENT) {

        // var tableEx = new table({
        //     height: this.$el.find('.already').height(),
        //     where: [
        //         { text: '项目名称:', type: 'input', placeholder: '请输入', key: 'xmmc' },
        //         { text: '项目编号:', type: 'input', placeholder: '请输入', key: 'xmbh' },
        //         { text: '起止时间:', type: 'date ~ date', placeholder: '请输入', key: 'startTime/endTime' },
        //     ],
        //     whereButtons: [
        //         { name: '查询', class: "layui-search", event: 'search' },
        //         { name: '重置', class: "layui-reset", event: 'reset' },
        //     ],
        //     rightButtion: [
        //         { icon: "cloud-icon-refresh", name: "刷新", event: 'refresh' }
        //     ],
        //     tableButtons: [
        //         {
        //             key: 'detail', name: '查看', icon: 'cloud-icon-table-view', event: function (data) {
        //                 var _data = {
        //                     flowid: data.flowid,
        //                     workid: data.workid,
        //                     trackid: data.trackid,
        //                     nodeid: data.nodeid,
        //                     readonly: true,
        //                 };
        //                 professionalDialog({
        //                     top: '30px',
        //                     width: '85%',
        //                     height: '95%',
        //                     path: '/professional/mission/' + data.flowid + '/await',
        //                     params: _data,
        //                     title: data.flowname,
        //                     events: {},
        //                     onClose: function () {
        //                         /*tableEx.search(tableEx);*/
        //                     },
        //                 });
        //             }
        //         }
        //     ],
        //     cols: [
        //         { type: 'numbers', title: '序号' },
        //         {
        //             field: 'trackstatus', align: 'center', title: '状态', width: 80, templet: function (d) {
        //                 var html = '';
        //                 if(d.trackstatus.indexOf("130")>-1){
        //                     html = '<span class="trackstatus" style="background:#F9AD58">驳<i></i>回</span>';
        //                 }else if(d.trackstatus.indexOf("190")>-1){
        //                     html = '<span class="trackstatus" style="background:#006699">拿<i></i>回</span>';
        //                 }else if(d.trackstatus.indexOf("140")>-1){
        //                     html = '<span class="trackstatus" style="background:#006699">挂<i></i>起</span>';
        //                 }else if(d.trackstatus.indexOf("170")>-1){
        //                     html = '<span class="trackstatus" style="background:#878787">结<i></i>束</span>';
        //                 }else if(d.trackstatus.indexOf("180")>-1){
        //                     html = '<span class="trackstatus" style="background:#878787">终<i></i>止</span>';
        //                 }else if(d.trackstatus.indexOf("190")>-1){
        //                     html = '<span class="trackstatus" style="background:#006699">拿<i></i>回</span>';
        //                 }else{
        //                     html = '<span class="trackstatus" style="background:#22C7C9">正<i></i>常</span>';
        //                 }
        //                 /*switch (d.trackstatus) {
        //                     case "110":
        //                         html = '<span class="trackstatus" style="background:#22C7C9">正<i></i>常</span>';
        //                         break;
        //                     // case "120":
        //                     //     html = '<span class="trackstatus" style="background:#cc6600">会<i></i>签</span>';
        //                     //     break;
        //                     case "130":
        //                         html = '<span class="trackstatus" style="background:#F9AD58">驳<i></i>回</span>';
        //                         break;
        //                     case "140":
        //                         html = '<span class="trackstatus" style="background:#006699">挂<i></i>起</span>';
        //                         break;
        //                     // case "150":
        //                     //     html = '<span class="trackstatus" style="background:#868686">撤<i></i>办</span>';
        //                     //     break;
        //                     // case "160":
        //                     //     html = '<span class="trackstatus" style="background:#f8ac59">子流程</span>';
        //                     //     break;
        //                     case "170":
        //                         html = '<span class="trackstatus" style="background:#878787">结<i></i>束</span>';
        //                         break;
        //                     case "180":
        //                         html = '<span class="trackstatus" style="background:#878787">终<i></i>止</span>';
        //                         break;
        //                     case "190":
        //                         html = '<span class="trackstatus style="background:#006699"">拿<i></i>回</span>';
        //                         break;
        //                     default:
        //                         html = '<span class="trackstatus" style="background:#22C7C9">正<i></i>常</span>';
        //                         break;
        //                 };*/
        //                 return html
        //             }
        //         },
        //         { field: 'xmmc', align: 'center', title: '项目名称' },
        //         { field: 'nodename', align: 'center', title: '当前环节', width: 100 },
        //         { field: 'xmbh', align: 'center', title: '项目编号', width: 120 },
        //         { field: 'flowname', align: 'center', title: '业务类型' },
        //         { field: 'sendtime', align: 'center', title: '接收时间', width: 220 },
        //         { field: 'dotime', align: 'center', title: '转出时间', width: 220 },
        //         { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: true, }
        //     ],
        //     getEvent: (data, setData) => {
        //         this.$api.getDoneList({
        //             page: data.index,
        //             limit: data.limit,
        //             startTime: data.startTime,
        //             endTime: data.endTime,
        //             xmbh: data.xmbh,
        //             xmmc: data.xmmc,
        //         }, function (res) {
        //             setData({
        //                 count: res.count,
        //                 data: res.data,
        //             });
        //         });
        //     }
        // });

        // this.$el.find('.already').append(tableEx.render());
        // EVENT.onActive(function () {
        //     tableEx.search(tableEx);
        // });

        var __table = new icu.table({

            tableOptions: {
                height: this.$el.height() - 160,
            }, // 数据表格部分参数 
            cols: [
                { key: "index", type: 'index', width: '70px', name: '序号',titleAlign: 'center',textAlign: 'center' },
                {
                    key: 'trackstatus', type: 'string', titleAlign: 'center',textAlign: 'center', name: '状态', width: '80px',
                    format: function (data, value, ele, events) {
                        var html = '';
                        switch (data.trackstatus) {
                            case "110":
                                html = '<span class="trackstatus" style="background:#22C7C9">正<i></i>常</span>';
                                break;
                            // case "120":
                            //     html = '<span class="trackstatus" style="background:#cc6600">会<i></i>签</span>';
                            //     break;
                            case "130":
                                html = '<span class="trackstatus" style="background:#F9AD58">驳<i></i>回</span>';
                                break;
                            case "140":
                                html = '<span class="trackstatus" style="background:#006699">挂<i></i>起</span>';
                                break;
                            // case "150":
                            //     html = '<span class="trackstatus" style="background:#868686">撤<i></i>办</span>';
                            //     break;
                            // case "160":
                            //     html = '<span class="trackstatus" style="background:#f8ac59">子流程</span>';
                            //     break;
                            case "170":
                                html = '<span class="trackstatus" style="background:#878787">结<i></i>束</span>';
                                break;
                            case "180":
                                html = '<span class="trackstatus" style="background:#878787">终<i></i>止</span>';
                                break;
                            case "190":
                                html = '<span class="trackstatus" style="background:#006699">拿<i></i>回</span>';
                                break;
                            default:
                                html = '<span class="trackstatus" style="background:#22C7C9">正<i></i>常</span>';
                                break;
                        };
                        return html
                    }
                },
                { key: 'xmmc', type: 'string', titleAlign: 'center',textAlign: 'center', name: '项目名称' },
                { key: 'nodename', type: 'string', titleAlign: 'center',textAlign: 'center', name: '已办环节', width: '110px' },
                { key: 'nowNodename', type: 'string', titleAlign: 'center',textAlign: 'center', name: '当前环节', width: '120px' },
                { key: 'xmbh', type: 'string', titleAlign: 'center',textAlign: 'center', name: '项目编号', width: '190px' },
                { key: 'flowname', type: 'string', titleAlign: 'center',textAlign: 'center', name: '业务类型' },
                { key: 'sendtime', type: 'string', titleAlign: 'center',textAlign: 'center', name: '接收时间', width: '200px' },
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
                                    __table.refresh();
                                },
                            });
                        });
                        return button;
                    }],
                }
            ], // 表格表头数据列,
            whereOptions: [
                { key: 'xmmc', type: 'input', labelText: '项目名称', labelWidth: 70, placeholder: '请输入项目名称' },
                { key: 'xmbh', type: 'input', placeholder: '请输入项目编号', labelWidth: 70, labelText: '项目编号' },
                { key: 'Date', type: 'inputDate', placeholder: '请选择接收时间', labelWidth: 70, labelText: '接收时间', layDataOption: { range: '~', } },
            ], // 接收form表单元素全部参数,
            pagingOptions: {
                hasQuick: true, // 开启快速跳页
                limitPage: true, // 开启筛选分页
                countPage: true, // 开启总页数
                index: 1, // 初始页面序号
                count: 10, // 初始分页数量
            },
            whereButtons: [
                { name: '查询', class: "layui-search testo layui-btn-blue", event: 'search' },
                { name: '重置', class: "layui-reset testo", event: 'reset' },
            ], // 跟在搜索条件右侧的按钮参数,
            // rightButtons: [
            //     { icon: "down", name: "刷新", event: 'refresh' }
            // ], // 右侧按钮参数
            getEvent: (data, setData) => {
                console.log(data);
                var startTime = null;
                var endTime = null;
                if (data.Date && data.Date.split(' ~ ').length == 2) {
                    startTime = data.Date.split(' ~ ')[0];
                    endTime = data.Date.split(' ~ ')[1];
                };
                this.$api.getDoneList({
                    page: data.page,
                    limit: data.limit,
                    startTime: startTime,
                    endTime: endTime,
                    xmbh: data.xmbh,
                    xmmc: data.xmmc,
                }, function (res) {
                    // clearTimes();
                    if (res.status == 500) {
                        icu.alert.error({
                            text: '数据请求出现错误',
                        });
                        console.error(res.info);
                        // setData({
                        //     count: 100,
                        //     data: [],
                        // });
                    } else {
                        setData({
                            count: res.count,
                            data: res.data,
                        });
                    }

                });
            },
        });


        this.$el.find('.already').append(__table.html);
        __table.tableObject.objs.title.setWidth();
        __table.init();

        // var tableEvent = null;

        // var index = 1;
        // var limit = 10;


        // var pageOption = {
        //     elem: template.find('#paging')[0]
        //     , count: 0
        //     , limit: 1
        //     , limits: [15, 30, 50]
        //     , groups: 3
        //     , layout: ['prev', 'page', 'next', 'skip', 'count', 'limit']
        //     , prev: '<i class="fa fa-angle-left" aria-hidden="true"></i>'
        //     , next: '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        //     , jump: function (obj, first) {
        //         index = obj.curr;
        //         limit = obj.limit;
        //         if (!first) {
        //             renderdata();
        //         };
        //     }
        // };
        // layui.laydate.render({
        //     elem: template.find('#startDate')[0]
        //     , range: '~' //或 range: '~' 来自定义分割字符
        // });

        // template.find('#search').click(function () {
        //     index = 1;
        //     limit = 15;
        //     renderdata();
        // });

        // template.find('#reset').click(function () {
        //     template.find('#nameId').val('');
        //     template.find('#deptId').val('');
        //     template.find('#startDate').val('');
        //     index = 1;
        //     limit = 15;
        //     renderdata();
        // });

        // template.find('#refresh').click(function () {
        //     renderdata();
        // });

        // tableEvent = layui.table.render({
        //     elem: table[0]
        //     , height: template.height() - 200
        //     , text: {
        //         none: '暂无相关数据'
        //     }
        //     , limit: 15
        //     , cols: [[
        //         { type: 'numbers' },
        //         { field: 'title', align: 'center', title: '项目名称' },
        //         { field: 'nodename', align: 'center', title: '当前环节', width: 100 },
        //         { field: 'xmbh', align: 'center', title: '项目编号', width: 120 },
        //         { field: 'flowname', align: 'center', title: '业务类型' },
        //         { field: 'sendtime', align: 'center', title: '接收时间', width: 180 },
        //         { field: 'limittime', align: 'center', title: '剩余天数', width: 100 },
        //         { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: template.find('#alreadyButtons')[0], }
        //     ]]
        // });

        // //监听行工具事件
        // layui.table.on('tool(already)', function (obj) {
        //     var layEvent = obj.event;
        //     console.log(layEvent);
        //     if (layEvent === 'detail') {

        //     };
        // });
        // var renderdata = function () {
        //     var DateArray = template.find('#startDate').val().split(' ~ ');
        //     params.api.getDoneList({
        //         page: index,
        //         limit: limit,
        //         startTime: DateArray[0],
        //         endTime: DateArray[1] ? DateArray[1] : '',
        //         xmbh: template.find('#nameId').val(),
        //         xmmc: template.find('#deptId').val(),
        //     }, function (res) {
        //         tableEvent.reload({
        //             data: res.data,
        //             limit: limit,
        //         });
        //         pageOption.count = res.count;
        //         pageOption.limit = limit
        //         layui.laypage.render(pageOption);
        //     })
        // };
        // EVENT.onActive(function () {
        //     renderdata();
        // });
        // renderdata();
    },
    destroy: function () {

    },
}