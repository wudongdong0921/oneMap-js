import StaticTable from "../../../../../../common/staticTable";

var staticDetail = function (el, data) {
    this.html = el;
    this.data = data;
    this.event = {
        download: function () { },
        chartSelect: function () { },
    }
    this.view()
}

staticDetail.prototype.view = function() {
    var that = this;
    this.html.empty();
    console.log(this.data.table)
    var tableData = this.data.table.state.data;
    // 按钮
    var statisTableDiv = $('<div class="statisTable_buttonBox" ></div>').appendTo(this.html);
    var downloadButton = $('<button type="button" class="layui-btn">下载</button>').appendTo(statisTableDiv);
    var choose = $('<button type="button" class="layui-btn" id="choose">筛选</button>').appendTo(statisTableDiv);
    // 动态按钮
    if(this.data.statisData.openChart == 1) {
        for (const item of tableData.tags) {
            let type = Object.keys(item);
            let value = Object.values(item);
            let chartButton = $(`<button type="button" class="layui-btn">${value}统计图 </button>`).appendTo(statisTableDiv);

            const data = {
                type: type[0],
                pid: 0,
                value: value[0],
            }

            chartButton.unbind().bind('click', function() {
                that.event.chartSelect(data);
            })
        }
    }
    // 范围
    var statisRange = $('<div class="statisTable_statisRange"></div>').appendTo(this.html);
    var statisRangeSpan = $(`<span title="${this.data.range}">统计范围：${this.data.range} </span>`).appendTo(statisRange);


    // 下载文件
    downloadButton.unbind().bind('click', function () {
        that.event.download();
    })
    // 点击筛选
    var chooseDiv = $('<div class="chooseDiv"></div>').appendTo(this.html)
    var chooseUl = $('<ul id="chooseUl"></ul>').appendTo(chooseDiv);
    for (let index = this.data.table.tier; index < tableData.columns.length; index++) {
        const item = tableData.columns[index];
        let key = Object.keys(item);
        let value = Object.values(item);
        let li = $(`<li></li>`).appendTo(chooseUl)
        let checkbox;
        if (key[0] == "count" || key[0] == "countPercent") {
            checkbox = $(`<input type="checkbox" name="choose" value="${key[0]}" checked disabled>${value[0]}</input>`).appendTo(li)
        } else {
            checkbox = $(`<input type="checkbox" name="choose" value="${key[0]}" checked>${value[0]}</input>`).appendTo(li)
        }

        checkbox.unbind().bind('click', function () {
            const value = checkbox[0].defaultValue;
            if (!checkbox[0].checked) {
                for (let i = 0; i < $("[data-type='" + value + "']").length; i++) {
                    const element = $("[data-type='" + value + "']")[i];
                    $(element).hide()
                }
            } else {
                for (let i = 0; i < $("[data-type='" + value + "']").length; i++) {
                    const element = $("[data-type='" + value + "']")[i];
                    $(element).show()
                }
            }
        })
    }

    choose.unbind().bind('click', function () {
        chooseDiv.slideToggle('normal');
    })

    // 动态表格
    const state = this.data.table.state;
    var statisTable = $('<div id="statisTable"></div>').appendTo(this.html);
    var treeData = this.data.table.store.handelTreeToArray(state.mainTreeData)
    this._staticTable = new StaticTable({
        tier: state.data.tier,
        store: that.data.table.store,
        state: state
    });
    this._staticTable.init(state.headerArray, treeData, state.countMain);
    this._staticTable.render(statisTable)
}

staticDetail.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    }
}

export default staticDetail;
