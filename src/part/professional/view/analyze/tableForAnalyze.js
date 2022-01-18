var tableItem = function (data, parent) {
    var _this = this;
    this.data = data;
    this.parent = parent;
    this.html = $('<tr>' +
        '   <th>' + data.flowname + '</th>' +
        '   <th class="all" data-type="total"></th>' +
        '   <th class="allwithoutlogout" data-type="exceptLogout"></th>' +
        '   <th class="await2" data-type="doing"></th>' +
        '   <th class="finish" data-type="done"></th>' +
        '   <th class="logout" data-type="logout"></th>' +
        '</tr>');

    this.html.find('th').click(function () {
        var type = $(this).attr("data-type");
        var text = $(this).text()
        if (type && text) {
            _this.parent.event.click(_this.data, type);
        };
    });

};
tableItem.prototype.setData = function (data) {
    this.html.find('.all').text(data.TOTAL);
    this.html.find('.allwithoutlogout').text(data.EXCEPTLOGOUT);
    this.html.find('.await2').text(data.DOING);
    this.html.find('.finish').text(data.DONE);
    this.html.find('.logout').text(data.LOGOUT);
};
tableItem.prototype.show = function () {
    this.html.show();
};
tableItem.prototype.hide = function () {
    this.html.hide();
};

var tableForEazy = function (data) {
    this.items = {};
    // this.data = data;
    this.html = $('<table border="1">' +
        '    <thead>' +
        '        <tr>' +
        '           <th>业务类型</th>' +
        '           <th width="80">总计</th>' +
        '           <th width="140">总计（除已注销）</th>' +
        '           <th width="100">正在办理</th>' +
        '           <th width="100">已经办结</th>' +
        '           <th width="100">已经注销</th>' +
        '        </tr>' +
        '    </thead>' +
        '    <tbody></tbody>' +
        '</table>');
    this.body = this.html.find('tbody');
    this.activeObj = null;
    this.event = {
        click: function () { }
    };
};
tableForEazy.prototype.onClick = function (event) {
    this.event.click = event;
};

tableForEazy.prototype.addItem = function (data) {
    this.items[data.flowid] = new tableItem(data, this);
    this.body.append(this.items[data.flowid].html);
};
tableForEazy.prototype.setData = function (data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (this.items.hasOwnProperty(element.FLOWID)) {
            const _element = this.items[element.FLOWID];
            _element.setData(element);
        }
    };
};

tableForEazy.prototype.change = function (item, status) {
    if (this.items.hasOwnProperty(item.flowid)) {
        const element = this.items[item.flowid];
        if (status) {
            element.show();
        } else {
            element.hide();
        };
    };

};

export default tableForEazy;