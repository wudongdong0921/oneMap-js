// import table from '../../../../component/table'

export default  {
    render: function (template, params, EVENT) {

        var tableEx = new table({
            height: template.height(),
            where: [
                { text: '项目名称:', type: 'input', placeholder: '请输入', key: 'xmmc' },
                { text: '项目编号:', type: 'input', placeholder: '请输入', key: 'xmbh' },
                { text: '起止时间:', type: 'date ~ date', placeholder: '请输入', key: 'startTime/endTime' },
            ],
            whereButtons: [
                { name: '查询', class: "layui-search", event: 'search' },
                { name: '重置', class: "layui-reset", event: 'reset' },
            ],
            // rightButtion: [
            //     { icon: "cloud-icon-refresh", name: "刷新", event: 'refresh' }
            // ],
            tableButtons: [
                {
                    key: 'detail', name: '查看', icon: 'cloud-icon-table-view', event: function (data) {
                        professionalDialog({
                            top: '30px',
                            width: '85%',
                            height: '95%',
                            path: '/professional/mission/' + data.flowid + '/await',
                            params: data,
                            title: data.flowname,
                            events: {},
                            onClose: function () {
                                tableEx.search(tableEx);
                            },
                        });
                    }
                }
            ],
            cols: [
                { type: 'numbers', title: '序号' },
                { field: 'xmmc', align: 'center', title: '项目名称' },
                { field: 'nodename', align: 'center', title: '当前环节', width: 100 },
                { field: 'xmbh', align: 'center', title: '项目编号', width: 120 },
                { field: 'flowname', align: 'center', title: '业务类型' },
                { field: 'sendtime', align: 'center', title: '接收时间', width: 180 },
                { field: 'limittime', align: 'center', title: '剩余天数', width: 100 },
                { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: true, }
            ],
            getEvent: function (data, setData) {
                params.api.getDraftList({
                    page: data.index,
                    limit: data.limit,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    xmbh: data.xmbh,
                    xmmc: data.xmmc,
                }, function (res) {
                    setData({
                        count: res.count,
                        data: res.data,
                    });
                });
            }
        });

        template.append(tableEx.render());
        EVENT.onActive(function () {
            tableEx.search(tableEx);
        });




        // var table = template.find('#table');
        // var tableEvent = null;

        // var index = 1;
        // var limit = 15;

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
        //     , cols: [[
        //         { type: 'numbers' },
        //         { field: 'title', align: 'center', title: '项目名称' },
        //         { field: 'nodename', align: 'center', title: '当前环节', width: 100 },
        //         { field: 'xmbh', align: 'center', title: '项目编号', width: 120 },
        //         { field: 'flowname', align: 'center', title: '业务类型' },
        //         { field: 'sendtime', align: 'center', title: '接收时间', width: 180 },
        //         { field: 'limittime', align: 'center', title: '剩余天数', width: 100 },
        //         { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: template.find('#draftButtons')[0], }
        //     ]]
        // });

        // //监听行工具事件
        // layui.table.on('tool(draft)', function (obj) {
        //     var layEvent = obj.event;
        //     console.log(layEvent);

        //     if (layEvent === 'detail') {
        //         professionalDialog({
        //             width: '90%',
        //             top: '30px',
        //             height: '80%',
        //             path: '/mission/' + obj.data.flowid + '/await',
        //             params: obj.data,
        //             title: obj.data.flowname,
        //             events: {},
        //             onClose: function () {
        //                 renderdata();
        //             },
        //         });
        //     };
        // });

        // var renderdata = function () {
        //     var DateArray = template.find('#startDate').val().split(' ~ ');
        //     params.api.getDraftList({
        //         page: index,
        //         limit: limit,
        //         startTime: DateArray[0],
        //         endTime: DateArray[1] ? DateArray[1] : '',
        //         xmbh: template.find('#nameId').val(),
        //         xmmc: template.find('#deptId').val(),
        //     }, function (res) {
        //         tableEvent.reload({
        //             data: res.data,
        //             limit: limit
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