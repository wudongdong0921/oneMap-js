import districtLinkage from "./zdSelectLevel";
var AddressThreeLink = function () {
    var _this = this;
    this.event = {
        onChangeSel:function(){}
    };
    this._html = $('<div class="area"></div>');
    this._address = $('<img src="./static/icon/area.svg" width="20px" alt="">').appendTo(_this._html);
    this._areaList = $('<div class="area-list"></div>').appendTo(_this._html);
    var userData = icu.session.get("userInfo");
    setTimeout(() => {
        this._linkage = new districtLinkage(this._html.find('.area-list'));
        this._linkage.setUserData(userData.areacodeList);
        this._linkage.onChange((data) => {
            //行政区划change事件
            _this.selectData = data;
            _this._areaList.text(data.dictLabel);
            this.event.onChangeSel(data);
        });
    }, 300);
}

AddressThreeLink.prototype.getSelectData = function () {
    return this.selectData;
}

AddressThreeLink.prototype.render = function () {
    return this._html;
}
AddressThreeLink.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}
export default AddressThreeLink;