import AddressThreeLinks from './address_three_link'
var RowWarTop = function () {
    var _this = this;
    this.comData = {}
    this.eventOnChangeSel = {
        onChangeSel:function(){}
    };
    this.event = new Object;
    this._html = $('<div class="war-top"></div>');
    this.addressThreeLinkView = new AddressThreeLinks();
    this._html.append(this.addressThreeLinkView.render());
    this._searchView = $('<div class="search"></div>').appendTo(this._html);
    this.addressThreeLinkView.on('onChangeSel',(data)=>{
        _this.selectAddData = data
        _this.eventOnChangeSel.onChangeSel(data);
    })
}
// 普通的自定义渲染渲染
RowWarTop.prototype.render = function (renderData) {
    var _this = this;
    if (typeof renderData == 'string') {
        _this._searchView.append($(renderData));
    } else if (typeof renderData == 'object') {
        _this.comData = $.extend({}, renderData);
        // obj = {
        //     htmlStr:'',             // 自定义html
        //     buttonEvent:['','',''], // 传入按钮的id
        // }
        _this.customHtml = $(_this.comData.htmlStr).appendTo(_this._html.find('.search'));
        if (_this.comData.buttonEvent.length !== 0) {
            for (let i = 0; i < _this.comData.buttonEvent.length; i++) {
                const element = _this.comData.buttonEvent[i];
                if(!_this.event.hasOwnProperty(element)){
                    _this.event[element] = function () {};
                    _this.customHtml.find('#' + element).unbind().bind('click', function (params) {
                        var value = _this.customHtml.find('#selectInput').val().replace(/\ +/g, "").replace(/[\r\n]/g, "");//去掉input里的空格和回车
                        if (element == 'resetBtn') {
                            _this.customHtml.find('#selectInput').val('');
                        }
                        _this.event[element](value);
                    })
                }
            }
        }
    }
    return this._html;
}
// 组件式渲染
RowWarTop.prototype.renderCustom = function (params) {
    var _this = this;
    this.customCommon = new params();
    this._html.append(this.customCommon.render())
    return this._html;
}

RowWarTop.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

RowWarTop.prototype.reset = function () {
    this.customHtml.find('#selectInput').val('');
}

RowWarTop.prototype.onChange = function (str, func) {
    if (this.eventOnChangeSel.hasOwnProperty(str)) {
        this.eventOnChangeSel[str] = func;
    };
}
export default RowWarTop;