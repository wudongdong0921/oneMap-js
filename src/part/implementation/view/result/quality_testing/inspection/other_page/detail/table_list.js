
var session = icu.session;
import customForm_districtLinkage from '../../../../../../../../common/customForm_districtLinkage'
var TableListInit = function (allData, apis) {
    this.apis = apis
    var _this = this;
    this.renderData = allData;
    this.event = {
        onSetDataInit: function () { },
        handelClick: function () { },
        viewHandelClick: function(){ },
        handelClickAdd: function () { },
        handelEnd:function(){ },
        handelDelete:function(){ }
    }
    this._table = new icu.table({
        tableOptions: {
            title: "成果质检",
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
                width: '400px',
                titleAlign: 'center',
                textAlign: 'center',
            },
            {
                key: 'administrativeDivision',
                type: 'string',
                name: '行政区划',
                width: '200px',
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
                name: '质检状态',
                titleAlign: 'center',
                textAlign: 'center',
            }, {
                key: 'createUser',
                type: 'string',
                name: '提交人员',
                titleAlign: 'center',
                textAlign: 'center',
            }, {
                key: 'createTime',
                type: 'string',
                name: '提交时间',
                titleAlign: 'center',
                textAlign: 'center',
            },
            {
                type: 'buttons',
                name: '操作',
                width: '100px',
                buttons: [function (unit, row, data, events) {
                    // console.log(data.qcState);
                    if(data.qcState == "终止" || data.qcState == "质检通过" || data.qcState == "质检未通过"){
                        var button_view = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin:-20px 0">\查看\</div>');
                        button_view.click((e) => {
                            // console.log(data);
                            e.stopPropagation();
                            e.preventDefault();
                            _this.event.viewHandelClick(unit, row, data, events);
                        });
                        return button_view;
                    }else{
                        var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin:-20px 0">\办理\</div>');
                        button.click((e) => {
                            // console.log(data);
                            e.stopPropagation();
                            e.preventDefault();
                            _this.event.handelClick(unit, row, data, events);
                        });
    
                        return button;
                    }
                   
                }],
                titleAlign: 'center',
                textAlign: 'center',
            },
        ],
        whereOptions: [
           {
                key: 'planningResultCode',
                type: 'select',
                labelText: '规划类型:',
                width: '150',
                data: [],
                showKey: 'label',
                setKey: 'value',
                getKey: 'value',
            }, {
                key: 'qcState',
                type: 'select',
                labelText: '质检状态:',
                showKey: 'dictLabel',
                setKey: 'dictValue',
                getKey: 'dictValue',
                width: '150',
                data: 'OptionSide:ZJZT',
            },{
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
                    _this._table.reset();
                    _this._table.whereObject.adCode.reset();
                }
            }, {
                class: 'Test',
                name: '新增质检',
                icon: 'squareAdd',
                event: function (event) {
                    _this.event.handelClickAdd(event);
                },
            }
        ],
        rightButtons: [
            {
                class: 'Test',
                icon: 'prohibit',
                name: '终止',
                event: function (event) {
                    _this.event.handelEnd(event);
                       
                },
            },
            {
                class: 'Test',
                icon: 'delete',
                name: '删除',
                event: function (event) {
                    _this.event.handelDelete(event);
                    

                },
            }, {
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
            _this.event.onSetDataInit(data, setData);
        },
    });

    this.renderData.$el.find('#achievementQualityInspection').append(this._table.html);
    // 获取登录用户区划代码
    var areacodeList = session.get('userInfo').areacodeList;
    var districtCodes = [];
    if (areacodeList && areacodeList.length > 0) {
        for (let i = 0; i < areacodeList.length; i++) {
            if (areacodeList[i] !== null) {
                districtCodes.push(areacodeList[i]);
            }
        }
    }
    // _this._table.whereObject.adCode.set(districtCodes);
}
//列表
TableListInit.prototype.onSetData = function (event) {
    this.event.onSetDataInit = event;

    // planningResultCode
    var _this = this;
    // console.log( _this._table);
    this.apis.getPlanResultType({}, function (res) {
        // console.log(res);
        _this._table.whereObject.planningResultCode.setData(res.data);
    });


    // console.log(this._table);

    this._table.init();
}
//办理
TableListInit.prototype.handelClickTab = function (event) {
    this.event.handelClick = event;
}
//查看
TableListInit.prototype.viewHandelClickTab = function (event) {
    this.event.viewHandelClick = event;
}
//新增质检
TableListInit.prototype.handelClickXz = function (event) {
    this.event.handelClickAdd = event;
}
//终止
TableListInit.prototype.handelEndZz = function(event){
    this.event.handelEnd = event;
}
//删除
TableListInit.prototype.handelDeleteSc = function(event){
    this.event.handelDelete = event;
}


export default TableListInit;