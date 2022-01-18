// var tableOption = ;
var TableList = function () {
    var _this = this;
    //this.renderData = allData;
    this.event = {
        setTableData: function () { },
        parameterTypeChange: function () { },
        onchangeLeavel: function () { },
        setleavel: function () { }
    }
    //console.log(icu.optionSide.get('ZJZT'))
    var optiondata = icu.optionSide.get('ZJZT')
    var optiondata1 = icu.optionSide.get('RKZT')
    var optiondata2 = icu.optionSide.get('SCZTS')
    var dataZJZT = optiondata.map(({ dictLabel, dictValue }) => {
        return { label: dictLabel, value: dictValue }
    })
    var dataRKZT = optiondata1.map(({ dictLabel, dictValue }) => {
        return { label: dictLabel, value: dictValue }
    })
    var dataSCZT = optiondata2.map(({ dictLabel, dictValue }) => {
        return { label: dictLabel, value: dictValue }
    })
    var _data=[...dataZJZT,...dataRKZT,...dataSCZT]
    //console.log(_data)
    var optionSet = {
        tableOptions: {
            theme: 'default',
            minWidth: "120px",
            height: false
        },
        cols: [
            {
                key: "index",
                type: 'index',
                name: '序号',
                width: '90px',
                titleAlign: 'center',
                textAlign: 'center',
            },
            {
                key: "adminstativeDivision",
                type: 'string',
                name: '行政区',
                width: '180px',
                titleAlign: 'center',
                textAlign: 'center',
            }, {
                key: "adCode",
                type: 'string',
                name: '区划代码',
                width: '180px',
                titleAlign: 'center',
                textAlign: 'center',
            }, {
                key: "zhuangtai",
                type: 'string',
                width: '180px',
                name: '状态',
                titleAlign: 'center',
                textAlign: 'center',
            }, {
                key: "shuliang",
                type: 'string',
                name: '数量',
                width: '180px',
                titleAlign: 'center',
                textAlign: 'center',
            }
        ],
        whereOptions: [
            {   // select 类型
                key: 'parameterType', // 传入给搜索条件的参数
                type: 'select', // 输入类型
                showUnSelect: true,// 是否显示置空项 
                data: _data,
                UnSelectData: { // 置空项对象值设置
                    showName: ' 全部 ',
                    data: '',
                },
                "default": '',
                onChange: function (e) {
                    _this._table.search()
                    _this.event.parameterTypeChange(e);
                },
            },
            {   // select 类型
                key: 'leavel', // 传入给搜索条件的参数
                type: 'select', // 输入类型
                data: [{ "label": "本级", "value": "thisLeavel" },
                { "label": "下级", "value": "lowerLeavel" }],

                // 参见select 说明
                // 此对象另可接收 form 表单元素全部参数
                "default": "thisLeavel",
                onChange: function (e) {
                    _this._table.search()
                    _this.event.onchangeLeavel(e)
                },
            }
        ], // 数组类型,接收form表单元素,但已经简化,舍弃过多参数

        pagingOptions: {
            hasQuick: true,
            limitPage: false,
            countPage: true,
            index:1,
            count:5
        },
        whereButtons: [],
        rightButtons: [],
        getEvent: function (data, setData) {

        },
        indexKey: 'page',
        countKey: 'limit',
        dataKey: 'data',
        totalKey: 'count'
    }
    this.options = optionSet;
    this._table = new icu.table(optionSet);
    // this.renderData.$el.find('#tableList').append(this._table.html);
}
TableList.prototype.onchangeParameterType = function (event) {
    this.event.parameterTypeChange = event

}
TableList.prototype.onchangeLeavel = function (event) {
    this.event.onchangeLeavel = event
}
TableList.prototype.render = function () {
    return this._table.html
}
TableList.prototype.setleavel = function (event) {
    this._table.whereObject.parameterType.set('')
    
    if(event){
        this.event.setleavel = event
        //this._table.whereObject.leavel.clear()
        setTimeout(() => {
            this._table.whereObject.leavel.setData(this.event.setleavel())
        }, 20);
    }
    
}

TableList.prototype.onRenderData = function (event) {
    this.options.getEvent = event;
    this._table.init();
};

export default TableList;