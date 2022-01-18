

var TableView = function (allData) {
    //this.renderData = allData;
    var optionSet = {
        tableOptions: {
            title: '表格数据',
            class: 'FD-UI', // 默认Class标头字段,可自定义进行修改。
            theme: 'default', // 默认皮肤字段,可自定义来修改全局Class样式
            minWidth: 120, // 单元格最小宽度
            height: false, // 设置表格高度。 内容超出表格高度则自动显示滚动条
            titleAlign: 'left', // 整体控制标题栏 浮动设置
        },
        cols: [{
            key: "index",
            type: 'index',
            name: '序号',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: "districtName",
            type: 'string',
            name: '行政区名称',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: "districtCode",
            type: 'string',
            name: '行政区代码',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: "ghcglxId",
            type: 'OptionSide:PlanResultType',
            name: '规划成果类型',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: "workProgressCode",
            type: 'string',
            name: '工作进展',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: "updateTime",
            type: 'string',
            name: '更新时间',
            titleAlign: 'center',
            textAlign: 'center',
        }, {
            key: "overallProgress",
            type: 'string',
            name: '总体进度',
            titleAlign: 'center',
            textAlign: 'center',
            id: '1111111',
            format: function (data, value, ele, events) {
                var scheduleNumber = parseInt(value);
                var html = $('<ul class="schedule"></ul>')
                for (var i = 0; i < 6; i++) {
                    if (i < scheduleNumber) {
                        html.append('<li class="active"></li>')
                    } else {
                        html.append('<li class="unactive"></li>')
                    }
                }
                return html
            }
        }, {
            type: 'buttons',
            name: '操作',
            width: '100px',
            buttons: [function (unit, row, data, events) {
                var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin:-20px 0">\查看\</div>');
                button.click((e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    implementationDialog({
                        top: '100px',
                        width: '75%',
                        height: '75%',
                        path: '/result/preparation/schedule_management/dailog',
                        params: data,
                        title: '查看编制进度',
                        events: {},
                        onClose: function () {

                        },
                    });
                });
                return button;
            }],
            titleAlign: 'center',
            textAlign: 'center',
        }],
        pagingOptions: {
            hasQuick: true,
            limitPage: false,
            countPage: true,
            index:1,
            count:10
        },
        getEvent: function (data, setData) {

        }
    };

    this.options = optionSet;

    this._table = new icu.table(optionSet);
    //this._table.setCols(optionSet.cols);
}
TableView.prototype.onRederData = function (event) {
    this.options.getEvent = event;
    this._table.init();
};

TableView.prototype.render = function () {
    return this._table.html
}
TableView.prototype.init = function () {
    this._table.init();
    this._table.tableObject.objs.title.setWidth();
}
// TableView.prototype.set = function (data) {
//     console.log(data)

//     console.log(this._table);
//     this._table.tableObject.set(data.list)
// }
export default TableView


