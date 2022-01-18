////////////////////////////////////////////////
// 审查查询
// 曲毅
// 2020-10-14 10:02:11
// 戴飞 2020-10-29
// 杨爽 2021-02-18
////////////////////////////////////////////////
import customForm_districtLinkage from "../../../../../../common/customForm_districtLinkage";

export default {
    render: function () {
        var planningResultCodeSelect,_this = this
        this.$api.getPlanResultType({},res=>{
            planningResultCodeSelect = [].slice.call(res.data)
            var _table = new icu.table({
                tableOptions: {
                    title: "汇交查询",
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
                    }, {
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
                        key: 'inventoryStatus', type: 'string', titleAlign: 'center',textAlign: 'center', name: '入库状态', width: '90px', format: function (d, value, ele, events)  {
                            var html = '';
                            if (d.inventoryStatus == '1') {
                                html = '<span>已入库</span>';
                            } else  {
                                html = '<span>未入库</span>';
                            }
                            return html
                        }
                    },{
                        key: 'submitExamineTime',
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
                                            showsubmit: 0
                                        },
                                        onClose : function (){
                                            _table.refresh()
                                        },
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
                            //             onClose: function(){
                            //                 _table.refresh()
                            //             }
                            //         })
                            //     });
                            //     return chartBtn;
                            // }
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
                    }, {
                        key: 'flowstatus',
                        type: 'select',
                        labelText: '审批状态:',
                        data: "OptionSide:SCZTS",
                        showKey: 'dictLabel',
                        setKey: 'dictValue',
                        getKey: 'dictValue',
                        onChange: function (e) {
                        }
                    },
                    {
                        key: 'inventoryStatus',
                        type: 'select',
                        labelText: '入库状态:',
                        data: 'OptionSide:RKZT',
                        showKey: 'dictLabel',
                        setKey: 'dictValue',
                        getKey: 'object',
                        // default:'showName',
                        showUnSelect: true,// 是否显示置空项
                        UnSelectData: { // 置空项对象值设置
                            showName: ' 全部 ',
                            data: '',
                        },
                    }

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
                    if(data.inventoryStatus!=null) {
                        let status = data.inventoryStatus.dictLabel.trim()
                        if (status=="未入库") {
                            var inventoryStatus = '0'
                        } else if (status=="已入库") {
                            var inventoryStatus= '1'
                        } else if(status=="全部"){
                            var inventoryStatus= ''
                        }else {
                            var inventoryStatus= ''
                        }
                    }
                    _this.$api.getReviewInquiryList({
                        "planningResultCode": data.planningResultCode === null ? '' : data.planningResultCode,
                        "userId": icu.session.get('userInfo').id,
                        "flowstatus": data.flowstatus === null ? '' : data.flowstatus,
                        "page": data.page,
                        "limit": data.limit,
                        "areaCode":data.areaCode === null ? '' : data.areaCode,
                        "inventoryStatus": data.inventoryStatus==null?'':inventoryStatus,
                        "userCode": icu.session.get('userInfo').areacodeList
                    },res=> {
                        // var areaList=icu.optionSide.get('XZQY')
                        // res.data.list.forEach(item => {
                        //     areaList.forEach(element => {
                        //         if(element.dictValue==item.adCode){
                        //             item.adCode=element.dictLabel
                        //         }
                        //     });
                        // });
                        setData({
                            count: res.data.total,
                            data: res.data.list
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
                        cgxxbId: data.cgxxbId
                    },
                    onClose : function (){
                        _table.refresh()
                    },
                })
            });
            this.$el.find('#searchReview').append(_table.html);
            _table.init();
        })
    },
    destroy: function () {

    },
};