import MinCard from './card/minCard'
var MinCardIndex = function (params) {
    var _this = this;
    this.allParams = $.extend({}, params);
    this.event = {}
    this.warStatus = {
        '0': 'gray',
        '1': '#2b5394',
        '2': '#f6a031',
        '3': '#e22629'
    }
    this._html = $('<div class="layui-card"></div>');
    this._title = $('<div class="layui-card-header">指标总览</div>').appendTo(this._html);
    this._body = $('<div class="layui-card-body"></div>');
}

MinCardIndex.prototype.render = function (data) {
    this.mincards = new MinCard();
    this._body.append(this.mincards.render(data, this._body, this.warStatus));
    this._body.appendTo(this._html);
    return this._html;
}

MinCardIndex.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

export default MinCardIndex;