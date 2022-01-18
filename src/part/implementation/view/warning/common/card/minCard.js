var ItemCard = function (params) {
    var _this = this;
    this.event = {
        onCardClick: function () { }
    };
    this._html = $('<div class="piece"></div>');
    this._span = $('<span style="font-size: 26px;font-weight: 700;margin-right: 5px;"></span>');
    this._subTitle = $('<sub></sub>');
    this._p = $('<p style="margin-top: 20px;"></p>');
}

ItemCard.prototype.render = function (data, body, warStatus) {
    var _this = this;
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // _this._html.empty();
            _this._span.css({
                color: warStatus[item.state]
            })
            _this._span.html(item.parameterValue).appendTo(_this._html);
            _this._subTitle.html(item.unit).appendTo(_this._html);
            _this._p.html(item.title).appendTo(_this._html);
            var innHtml = _this._html.clone();
            innHtml.attr('data-parameterValue',item.parameterValue)
            innHtml.unbind().bind('click', function (el) {
                _this.event.onCardClick(i)
            });
            body.append(innHtml);
        }
    }
    return body;
}

ItemCard.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

export default ItemCard;