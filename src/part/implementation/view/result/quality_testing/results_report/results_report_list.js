////////////////////////////////////////////////
// 自然资源-成果报告
// 杨爽
// 2020-09-17 17:39:56
////////////////////////////////////////////////

var session = icu.session;
import customForm_districtLinkage from '../../../../../../common/customForm_districtLinkage'
export default {
    render: function () {
        console.log(this);
        var areacodeList = session.get('userInfo').areacodeList;
        var _this = this;
        var searchData = {}
        var _table = new icu.table({
            tableOptions: {
                title: "成果报告",
                height: '400px',
                theme: 'InterlacedDiscoloration',
            },
            cols: [
                {
                    type: 'checkBox',
                    width: '40px'
                },
                {
                    key: "index",
                    type: 'index',
                    width: '60px',
                    name: '序号',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'planningResultName',
                    type: 'string',
                    name: '规划成果名称',
                    width: '500px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'administrativeDivision',
                    type: 'string',
                    name: '行政区划',

                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'planningResultCode',
                    type: 'string',
                    name: '规划类型',

                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'qcState',
                    type: 'string',
                    name: '质检结果',
                    width: '150px',
                    titleAlign: 'center',
                    textAlign: 'center',
                }, {
                    key: 'createUser',
                    type: 'string',
                    name: '提交人员',
                    width: '150px',
                    titleAlign: 'center',
                    textAlign: 'center',
                }, {
                    key: 'createTime',
                    type: 'string',
                    name: '提交时间',

                    titleAlign: 'center',
                    textAlign: 'center',
                },
                // {
                //     key: 'reportsAddressId',
                //     type: 'string', 
                //     name: '质检报告',     
                //     titleAlign: 'center',
                //     textAlign: 'center',
                //     format: function (data, value) {
                //         var pdf_value = "<a href='javascript:;'  target='_blank' style='color:#00f' id='adress' >"+data.planningResultName+".pdf</a>"
                //         return pdf_value;

                //     },
                // },
                {
                    key: 'reportsAddressId',
                    type: 'buttons',
                    name: '质检报告',
                    titleAlign: 'center',
                    textAlign: 'center',
                    buttons: [function (unit, row, data, events) {
                        var button_view = $("<a href='javascript:;' style='color:#00f' id='adress' >" + data.planningResultName + ".pdf</a>");
                        button_view.click((e) => {
                            // e.stopPropagation();
                            // e.preventDefault();

                            // console.log(data);
                            // POBrowser.openWindowModeless(config.InterfaceAddress.commonService + '/wintoppublicinterfaceGW/pageoffice/openwork?url=' + data.reportsAddressId ,'width=1824px;height=950px;');
                            var _dialog = implementationDialog({
                                top: '45px',
                                width: '80%',
                                height: '90%',
                                path: '/affixFileView',
                                title: data.planningResultName+'.pdf',
                            });
            
                            setTimeout(function () {
                                _dialog.content.set(null, data.planningResultName+'.pdf',data.reportsAddressId);
                            }, 200);
                        });

                        
                        if(data.reportsAddressId){
                            return button_view;
                        }
                        
                    }],
                },
            ],
            whereOptions: [
                {
                    // key: 'planningResultCode', 
                    // type: 'select', 
                    // labelText: '规划类型:', 

                    // width:'150',
                    // data:  [
                    //     { "label": "- 请选择 -", "value": "请选择" },
                    //     { "label": "总体规划", "value": "总体规划" }, 
                    //     { "label": "专题规划", "value": "专题规划" },
                    // ], 
                    key: 'planningResultCode',
                    type: 'select',
                    labelText: '规划类型:',
                    width: '150',
                    data: [],
                    showKey: 'label',
                    setKey: 'value',
                    getKey: 'value',
                },
                {
                    key: 'adCode',
                    labelText: '行政区划:',
                    getKey: 'dictValue',
                    object: customForm_districtLinkage,
                }

            ],
            whereButtons: [
                {
                    class: 'Test',
                    name: '查询',
                    event: 'search'
                }, {
                    class: 'Test',
                    name: '重置',
                    // event: 'reset',
                    // 2021-04-06 陈薪名 修改 重置功能
                    event: function () {
                        _table.reset();
                        _table.whereObject.adCode.reset();
                    }
                }
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
                //console.log(data);
                searchData = data
                _this.$api.getAchieventList({
                    planningResultCode: data.planningResultCode, // 规划成果类型 (String) 
                    qcState: 2, // 质检状态（0暂存、1质检中、2通过、3未通过、4终止） (String) 
                    reviewState: data.reviewState, // 审查状态（0未审查、1审查中、2审查通过、3审查驳回） (String)
                    adCode: data.adCode!=null?data.adCode:areacodeList[areacodeList.length-1],// 行政区划代码 (String) 
                    createUser: data.createUser, // 创建人 (String) 
                    modular: data.modular, // 是哪个模块进来的cgzj是成果质检cgbg是成果报告sccx是审查查询 (String) 
                    page: data.page,
                    limit: data.limit
                }, function (res) {

                    setData({
                        count: res.count,
                        data: res.data,
                    });

                });

            },
        });
        this.$el.find('#resultsReport').append(_table.html);
        // 获取登录用户区划代码
        
        var districtCodes = [];
        if (areacodeList && areacodeList.length > 0) {
            for (let i = 0; i < areacodeList.length; i++) {
                if (areacodeList[i] !== null) {
                    districtCodes.push(areacodeList[i]);
                }
            }
        }
        // _table.whereObject.adCode.set(districtCodes);
        var ghcglxIdMap = {}
        this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                // 创建规划成果类型value与label映射表
                var i = 0;
                for (; i < res.data.length; i++) {
                    ghcglxIdMap[res.data[i].value] = res.data[i].label;
                }

                // 添加全选项
                // res.data.unshift({'value': '', 'label': '请选择'});

                _table.whereObject.planningResultCode.setData(res.data);
                // _table.whereObject.planningResultCode.set(res.data[1].value);
            }
            _table.init();
        });
        // _table.init();


    },
    destroy: function () {

    },
};