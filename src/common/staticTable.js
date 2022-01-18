var staticTable = function (option) {
    this.option = $.extend({}, {
        tier: null
    }, option);
    this.table = $(`<table class="layui-table" id="itable">`);
    this.thead = $(`<thead></thead>`).appendTo(this.table);
    this.thTr = $(`<tr id="theadTr"></tr>`).appendTo(this.thead);
    this.tbody = $(`<tbody id="tbodyRow"></tbody>`).appendTo(this.table);
    this.event = {
        meargeRowCol: function () { }
    }
}
staticTable.prototype.init = function (headerArray, treeData, countMain) {
    this.thTr.empty();
    this.tbody.empty();
    this.renderThTr(headerArray);
    this.renderTbody(treeData, countMain, headerArray)
}
staticTable.prototype.renderThTr = function (headerArray) {
    for (let i = 0; i < headerArray.length; i++) {
        const item = headerArray[i];
        if (i < this.option.tier) {
            this.thTr.append(`<th>${item}</th>`);
        } else {
            this.thTr.append(`<th data-type="${Object.keys(item)}">${Object.values(item)}</th>`);
        }
    }
}
staticTable.prototype.renderTbody = function (treeData, countMain, headerArray) {
    for (let i = 0; i < treeData.length; i++) {
        const item = treeData[i];
        let $tr = $('<tr></tr>');
        for (let j = 0; j < item.length; j++) {
            const element = item[j];
            if (element.label == '合计') {
                if (this.option.tier > 2) {
                    $tr.append(`<td id="${element.id}" colspan="${this.option.tier - 1}">${element.label}</td>`);
                } else {
                    $tr.append(`<td id="${element.id}">${element.label}</td>`)
                }
            } else {
                $tr.append(`<td id="${element.id}">${element.label}</td>`)
            }
            if (item.length < 3 && item.length == 2 && j == 1) {
                if (element.label !== '合计' && this.option.tier !== 2) {
                    $tr.append(`<td id=""></td>`)
                }
            } else if (item.length < 3 && item.length == 1 && j == 0) {
                for (let i = 0; i < this.option.tier - 1; i++) {
                    $tr.append(`<td id=""></td>`)
                }
            }
            if (element.children.length == 0) {
                for (const key in element.childrenItem) {
                    if (element.childrenItem.hasOwnProperty.call(element.childrenItem, key)) {
                        const chItem = element.childrenItem[key];
                        $tr.append(`<td id="${element.id}" data-type="${key}">${chItem}</td>`)
                    }
                }
            }
        }
        this.tbody.append($tr);
    }
    this.total = $(`<tr></tr>`);
    if(headerArray[0] == '一级分类') {
        this.total.append(`<td id="sdfsdsdfsdf" colspan="${this.option.tier}">合计</td>`)
    }
    for (let i = 0; i < headerArray.slice(this.option.tier).length; i++) {
        const element = headerArray.slice(this.option.tier)[i];
        this.total.append(`<td id="${countMain.id}"  data-type="${Object.keys(element)}">${countMain[Object.keys(element)]}</td>`)
    }
    this.tbody.append(this.total)
}

// 根据tree的id，动态合并行合并列
staticTable.prototype.mergeCell = function (table, startRow, endRow, col) {
    var tb = this.table[0];
    if (!tb || !tb.rows || tb.rows.length <= 0) {
        return;
    }
    if (col >= tb.rows[0].cells.length || (startRow >= endRow && endRow != 0)) {
        return;
    }
    if (endRow == 0) {
        endRow = tb.rows.length - 1;
    }
    for (var i = startRow; i < endRow; i++) {
        if(tb.rows[startRow].cells[col]) {
            if (tb.rows[startRow].cells[col].id !== '') {
                if (tb.rows[startRow].cells[col].id == tb.rows[i + 1].cells[col].id) { //如果相等就合并单元格,合并之后跳过下一行
                    tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col]);
                    tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan) + 1;
                } else {
                    this.mergeCell(this.table, i + 1, endRow, col);
                    break;
                }
            } else {
                this.mergeCell(this.table, i + 1, endRow, col);
                break;
            }
        }
    }
}
staticTable.prototype.render = function (el) {
    el.empty();
    el.append(this.table)
    switch (this.option.tier) {
        case 1:

            break;

        case 2:
            this.mergeCell('itable', 0, 0, 0)
            break;
        case 3:
            this.mergeCell('itable', 0, 0, 1)
            this.mergeCell('itable', 0, 0, 0)
            break;
        default:
            break;
    }
    return this.table;
}
export default staticTable;