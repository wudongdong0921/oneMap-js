
////////////////////////////////////////////////
// 我提交的审查 渲染页
// 曲毅
// 2020-10-14 09:07:43
// 戴飞 2020-10-29
////////////////////////////////////////////////
// import diyselect from './diyselect'
import customForm_districtLinkage from '../../../../../../common/customForm_districtLinkage'
export default {
    render: function () {
        var planningResultCodeSelect, _this = this
        var areacodeList = icu.session.get('userInfo').areacodeList;
        this.$api.getPlanResultType({}, res => {
            planningResultCodeSelect = [].slice.call(res.data)
            var _table = new icu.table({
                tableOptions: {
                    title: "草稿箱",
                    minWidth: 40,
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
                    },
                    {
                        key: 'actiontime',
                        type: 'string',
                        name: '接收时间',
                        textAlign: 'center',
                        titleAlign: 'center',
                    },  {
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
                                encodeURI(encodeURI(data.reviewState))
                                handleBtn.click((e) => { 

                                    implementationDialog({
                                        title: '成果汇交',
                                        path: '/result/examination/review_iframe',
                                        width: '95%',
                                        params: {
                                            reviewState: data.reviewState,//审查状态
                                            icon: false,//是否显示检测图标
                                            readonly: true,//审查要点是否只读
                                            btn: false, //是否显示生成审查按钮
                                            huizhengWorkid: data.huizhengWorkid,
                                            huizhengTrackid: data.huizhengTrackid,
                                            cgxxbId: data.cgxxbId,
                                            showsubmit: 1,
                                            huizhengFlowid:data.huizhengFlowid
                                        },
                                        onClose: function () {
                                            _table.refresh()
                                        }
                                    })

                                });
                                return handleBtn;
                            },
                            //流程图按钮触发事件
                            function (unit, row, data, events) {
                                var chartBtn = $(`
                                    <button class="layui-btn layui-btn-ys  layui-btn-sm">
                                       删除
                                    </button>
                                `)
                                chartBtn.click((e) => {
                                    icu.alert.delete({
                                        title: '是否删除？',
                                        callback: function (success, error) {
                                            setTimeout(function () {
                                                _this.$api.deleteByid({
                                                    workId:data.huizhengWorkid
                                                }, function (res) {
                                                    success();
                                                    _table.refresh();
                                                });
                                            }, 1500);
                                        }
                                    });
                                });
                                return chartBtn;
                            }
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
                    },
                    {
                        key: 'planningResultCode',
                        type: 'select',
                        labelText: '规划成果类型:',
                        labelWidth:120,
                        data: planningResultCodeSelect,
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
                        string: 'reset',
                        // event: 'reset',
                        // 2021-04-06 陈薪名 修改 重置功能
                        event: function () {
                            _table.reset();
                            _table.whereObject.areaCode.reset();
                        }
                        // icon: 'down'
                    }
                ],
                // rightButtons: [
                //     {
                //         class: 'layui-btn buttonIcon add',
                //         name: '新建审查',
                //         event: function (event) {
                //             implementationDialog({
                //                 path: '/result/examination/my_review/new_review',
                //                 width: '45%',
                //                 height: '50%',
                //                 top: '20%',
                //                 onClose: function () {
                //                     event.whereObject.planningResultCode.set('')
                //                     event.whereObject.flowstatus.set('')
                //                     _table.refresh()
                //                 }
                //             })
                //         },
                //         icon: 'squareAdd'
                //     },
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
                    _this.$api.getAttachmentsByUser({
                        "planningResultCode": data.planningResultCode === null ? '' : data.planningResultCode,
                        "userName": icu.session.get('userInfo').id,
                        "flowstatus": data.flowstatus === null ? '' : data.flowstatus,
                        "page": data.page,
                        "limit": data.limit,
                        "areaCode": data.areaCode === null? areacodeList[areacodeList.length-1] : data.areaCode
                    }, res => {
                        //console.log(res);
                        var areaList=icu.optionSide.get('XZQY')
                        res.data.forEach(item => {
                            areaList.forEach(element => {

                                if(element.dictValue==item.adCode){
                                    item.adCode=element.dictLabel
                                }
                            });
                        });

                        setData({
                            count: res.count,
                            data: res.data
                        });
                    })
                },
            })
            //列表页row双击事件
            _table.on('rowDblclick', function (data, table, row) {
                implementationDialog({
                    title: '成果审查',
                    path: '/result/examination/review_iframe',
                    width: '95%',
                    params: {
                        reviewState: data.reviewState,//审查状态
                        icon: false,//是否显示检测图标
                        readonly: true,//审查要点是否只读
                        btn: false, //是否显示生成审查按钮
                        huizhengWorkid: data.huizhengWorkid,
                        huizhengTrackid: data.huizhengTrackid,
                        cgxxbId: data.cgxxbId,
                        showsubmit: 1,
                        huizhengFlowid:data.huizhengFlowid
                    }
                })
            });
            this.$el.find('#myReview').append(_table.html);
            _table.init();

            var districtCodes = [];
            if (areacodeList && areacodeList.length > 0) {
                for (let i = 0; i < areacodeList.length; i++) {
                    if (areacodeList[i] !== null) {
                        districtCodes.push(areacodeList[i]);
                    }
                }
            }
            // _table.whereObject.areaCode.set(districtCodes);
        })
    },
    destroy: function () {

    },
};