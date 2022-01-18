////////////////////////////////////////////////
// 树的封装
// 吴野
// 2020-12-12 12:43:53
////////////////////////////////////////////////
import Option from '../component/zTreeOption/index'

var ZtreeView = function (parame) {
    this.allOption = Option;
    this.event = {
        onClick: function () { },
        beforeCheck: function () { },
        beforeClick: function () { },
        onCheck: function () { },
    };
};
ZtreeView.prototype.init = function (parame) {
    var _this = this;
    this._option = new Option(parame.optionKey,this.event)
    this._option.callback.onClick;
    this.zTreeObj = $.fn.zTree.init(parame.treeId, this._option, parame.data);
}

ZtreeView.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};

export default ZtreeView;