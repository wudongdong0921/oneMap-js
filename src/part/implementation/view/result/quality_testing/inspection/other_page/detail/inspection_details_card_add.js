////////////////////////////////////////////////
// 成果质检详情页-质检结果、质检日志-选项卡 - 新增质检-下一步里的选项卡
// 杨爽
// 2020-10-14 16:35:45
////////////////////////////////////////////////

//质检结果、质检日志-选项卡
var CardView = function (allData) {
    var _this = this;
    _this.renderData = allData
    var Chtml = $('<nav id="nav"><ul id="clickTab"></ul></nav>');
    this.lisTabResutl = $('<li class="act">质检结果</li>')
    this.lisTabText = $('<li>质检日志</li>')

    Chtml.find('#clickTab').append(this.lisTabResutl);
    Chtml.find('#clickTab').append(this.lisTabText)

    var html = '';
    html += '<div id="container">';
    html += '     <section class="tab" id="showResultContent">';
    html += '        <div id="time"></div>';
    html += '        <div id="people"></div>';
    html += '        <div id="num"></div>';
    html += '        <div id="error"></div>';
    html += '        <div id="bm"></div>';
    html += '    </section>';
    html += '     <section class="tab" id="showContent">';
    html += '        <div id="finish"></div>';
    html += '        <div id="end"></div>';
    html += '    </section>';
    html += '</div>';

    _this.$html = $(html);
    this.$renderDiv = $(`<div id="log_bm"></div>`);
    _this.$html.find('#showContent').append(this.$renderDiv);

    this.$renderResultDiv = $(`<div id="mc"></div>`);
    _this.$html.find('#showResultContent').append(this.$renderResultDiv);
    // 质检结果点击事件
    this.lisTabResutl.unbind().bind('click', function () {
        _this.lisTabResutl.addClass('act')
        _this.lisTabText.removeClass('act')
        _this.$html.find('#showResultContent').show();
        _this.$html.find('#showContent').hide();

    })
    // 质检日志点击事件
    this.lisTabText.unbind().bind('click', function () {
        _this.lisTabResutl.removeClass('act')
        _this.lisTabText.addClass('act')
        _this.$html.find('#showContent').show();
        _this.$html.find('#showResultContent').hide();
    })
    _this.event = {
        onChange: function () { }
    }
    _this.$html.unbind().bind('click', function () {
        _this.event.onChange("11111")
    })

    Chtml.append(_this.$html);
    _this.renderData.$el.find('#resultContentShow').append(Chtml);
}

CardView.prototype.changeTextDiv = function (data) {
    this.$html.find('#showContent').show()
    this.$html.find('#showResultContent').hide();
    this.$renderDiv.html(data);
}
CardView.prototype.showTextDiv = function (data) {
    this.$html.find('#showContent').hide()
    this.$renderDiv.html(data);
}

CardView.prototype.showResaultDiv = function (data) {
    this.lisTabResutl.addClass('act')
    this.lisTabText.removeClass('act')
    this.$html.find('#showResultContent').show();
    this.$html.find('#showContent').hide();
    this.$renderResultDiv.html(data);
}
CardView.prototype.onC = function (func) {
    this.event.onChange = func;
}

export default CardView