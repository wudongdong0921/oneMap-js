var WarRightList = function (params) {
    var _this = this;
    this.event = {
        onCardClick:function () {}
    };
    this._html = $('<div class="layui-card"></div>');
    this._header = $('<div class="layui-card-header"></div>').appendTo(this._html);
    this._body = $('<div class="layui-card-body"></div>')
    this._header.html(params.title);
}

WarRightList.prototype.render = function (data) {
    var _this = this;
    this._item = $('<div class="body-row"></div>');
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            this._item.empty();
            var _name = $('<p class="index-name">' + item.name + '</p>').appendTo(_this._item);
            var _lockIndex = $('<p class="look-index">' + item.lockIndex + '</p>').appendTo(_this._item);

            var $item = _this._item.clone()
            $item.attr('data-parameterValue',item.name)
            $item.unbind().bind('click', function (el) {
                // TODO wuye选中取消
                // _this._body.find('.body-row').removeClass("active");
                // $(this).addClass('active')
                _this.event.onCardClick(item.zbjcId,item.name,item.unitCode);
            });
            _this._body.append($item)
        }
    }
    this._body.appendTo(this._html);
    return this._html;
}

WarRightList.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

export default WarRightList;
