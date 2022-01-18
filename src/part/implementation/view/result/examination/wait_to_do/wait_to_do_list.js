////////////////////////////////////////////////
// 待办审查
// 曲毅
// 2020-10-14 10:02:11
// 戴飞 2020-10-29
// 杨爽 2021-02-18
////////////////////////////////////////////////

import customForm_districtLinkage from "../../../../../../common/customForm_districtLinkage";

export default {
    render: function () {
        var planningResultCodeSelect, _this = this
        this.$api.getPlanResultType({}, res => {
            planningResultCodeSelect = [].slice.call(res.data)
            console.log(res);
            var _table = new icu.table({
                tableOptions: {
                    title: "待办汇交",
                    minWidth: 40,
                    height: '650px',
                    theme: 'evenColor',
                },
                cols: [
                    {
                        width: '60px',
                        key: 'index',
                        type: 'index',
                        name: '序号',
                        textAlign: 'center',
                        titleAlign: 'center',
                    }, {
                        key: 'projectName',
                        type: 'string',
                        name: '项目名称',
                        textAlign: 'center',
                        titleAlign: 'center',
                    }, {
                        key: 'administrativeDivision',
                        type: 'string',
                        name: '行政区划',
                        textAlign: 'center',
                        titleAlign: 'center',
                    }, {
                        key: 'planningResultCode',
                        type: 'string',
                        name: '规划成果类型',
                        textAlign: 'center',
                        titleAlign: 'center',
                    },{
                        key: 'reviewState',
                        type: 'string',
                        name: '审批状态',
                        textAlign: 'center',
                        titleAlign: 'center',
                        format: function (data, value, ele, events) {
                            switch (value){
                                case "0":
                                    return "未审查"
                                case "1":
                                    return "审查中"
                                case "2":
                                    return "审查通过"
                                default:
                                    return "审查驳回"
                            }
                        },
                    }, {
                        key: 'sendtime',
                        type: 'string',
                        name: '提交时间',
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
                                        办理
                                    </button>
                                `);
                                encodeURI(encodeURI(data.reviewState))
                                handleBtn.click((e) => {

                                    implementationDialog({
                                        title: '成果汇交',
                                        path: '/result/examination/review_iframe',
                                        width: '95%',
                                        params: {
                                            reviewState: data.reviewState,//审查状态
                                            icon: true,//是否显示检测图标
                                            readonly: false,//审查要点是否只读
                                            btn: true, //是否显示生成审查按钮
                                            huizhengWorkid: data.huizhengWorkid,
                                            huizhengTrackid: data.huizhengTrackid,
                                            cgxxbId: data.cgxxbId,
                                            showsubmit: 1,
                                        },
                                        onClose: function () {
                                            _table.refresh()
                                        }
                                    })
                                    $(".layout-dialog-close").hide();
                                });
                                return handleBtn;
                            },
                            //流程图按钮触发事件
                            // function (unit, row, data, events) {
                            //     var chartBtn = $(`
                            //         <button class="layui-btn layui-btn-ys  layui-btn-sm">
                            //             流程图
                            //         </button>
                            //     `)
                            //     chartBtn.click((e) => {
                            //         implementationDialog({
                            //             path: '/result/examination/common_page',
                            //             width: '95%',
                            //             params: data,
                            //             onClose: function () {
                            //                 _table.refresh()
                            //             }
                            //         })
                            //     });
                            //     return chartBtn;
                            // },
                            // function (unit, row, data, events) {
                            //     var handleBtn = $(`
                            //         <button class="layui-btn layui-btn-ys  layui-btn-sm" style="margin-right:10px">
                            //             测试
                            //         </button>
                            //     `);
                            //     encodeURI(encodeURI(data.reviewState))
                            //     handleBtn.click((e) => {
                            //         implementationDialog({
                            //             title: '测试',
                            //             path: '/result/examination/ceshi',
                            //             width: '95%',
                            //             params: {
                            //                 reviewState: data.reviewState,//审查状态
                            //                 icon: true,//是否显示检测图标
                            //                 readonly: false,//审查要点是否只读
                            //                 btn: true, //是否显示生成审查按钮
                            //                 huizhengWorkid: data.huizhengWorkid,
                            //                 huizhengTrackid: data.huizhengTrackid,
                            //                 cgxxbId: data.cgxxbId
                            //             },
                            //             onClose: function () {
                            //                 _table.refresh()
                            //             }
                            //         })
                            //     });
                            //     return handleBtn;
                            // },
                        ]
                    },
                ],
                whereOptions: [
                    {
                        key: 'areaCode',
                        labelText: '行政区划:',
                        getKey: 'dictValue',
                        // object: diyselect,
                        object: customForm_districtLinkage,
                    }, {
                        key: 'planningResultCode',
                        type: 'select',
                        labelText: '规划成果类型:',
                        labelWidth:120,
                        data: planningResultCodeSelect,
                        onChange: function (e) {

                        }
                    }
                    // , {
                    //     key: 'flowstatus',
                    //     type: 'select',
                    //     labelText: '审查状态:',
                    //     showKey: 'dictLabel',
                    //     setKey: 'dictValue',
                    //     getKey: 'dictValue',
                    //     data: "OptionSide:SCZTS",
                    //     onChange: function (e) {

                    //     }
                    // }
                ],
                whereButtons: [
                    {
                        class: 'test',
                        name: '查询',
                        event: 'search',
                        // icon: 'software'
                    },
                    {
                        class: 'Test',
                        name: '重置',
                        event: function () {
                            _table.reset();
                            _table.whereObject.areaCode.reset();
                        },
                    }
                ],
                // rightButtons: [
                //     {
                //         class: 'Test',
                //         icon: 'software',
                //         name: '筛选',
                //         event: 'screen'
                //     }, {
                //         class: 'Test',
                //         icon: 'interactive',
                //         name: '导出',
                //         event: 'exportCSV'
                //     }, {
                //         class: 'Test',
                //         icon: 'listBook',
                //         name: '打印',
                //         event: 'print'
                //     }
                // ],
                getEvent: function (data, setData) {
                    _this.$api.getToDoList({
                        "planningResultCode": data.planningResultCode === null ? '' : data.planningResultCode,
                        "userId": icu.session.get('userInfo').id,
                        //"flowstatus": data.flowstatus === null ? '' : data.flowstatus,
                        "page": data.page,
                        "limit": data.limit,
                        "areaCode":data.areaCode === null ? '' : data.areaCode,
                        'userCode': icu.session.get('userInfo').areacodeList
                    }, res => {
                        setData({
                            count: res.data.total,
                            data: res.data.list,
                        });
                    })
                },
            })
            //列表页row双击事件
            // _table.on('rowDblclick', function (data, table, row) {
            //     implementationDialog({
            //         title: '成果审查',
            //         path: '/result/examination/review_iframe',
            //         width: '95%',
            //         params: {
            //             title: '成果审查',
            //             reviewState: data.reviewState,//审查状态
            //             icon: true,//是否显示检测图标
            //             readonly: false,//审查要点是否只读
            //             btn: true, //是否显示生成审查按钮
            //             huizhengWorkid: data.huizhengWorkid,
            //             huizhengTrackid: data.huizhengTrackid,
            //             cgxxbId: data.cgxxbId
            //         },
            //         onClose: function () {
            //             _table.refresh()
            //         }
            //     })
            // });
            this.$el.find('#toDoReview').append(_table.html);
            _table.init();
        })
    },
    destroy: function () {

    },
};