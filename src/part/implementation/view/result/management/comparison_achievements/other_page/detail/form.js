////////////////////////////////////////////////
// 规划成果对比-form
// 杨爽
// 2020-10-14 14:58:43
////////////////////////////////////////////////
import districtLinkage from '../../../../../../../../common/districtLinkage' // 三级联动引入<div> <div id="showLisandong">启动</div> </div> 

// 渲染表单元素
var FormView = function (allData, option, mainId, divId) {
    var _this = this;
    this.renderData = allData;
    this.$divId = divId;
    // 定义事件委托
    this.event = {
        getDistrictLinkageData: function () { },
        onChangePlanningResultCode: function () { }
    }
    this._form = icu.templateForm({
        labelwidth: 110,
    });
    this._form.$setOptions(option);
    // 初始化form表单
    this.renderData.$el.find('#' + mainId).append(this._form.$html);
    // 初始化三级联动菜单
    _this.linkageEle = _this.renderData.$el.find('#' + _this.$divId);
    _this._linkage = new districtLinkage(_this.linkageEle);
    _this._linkage.onChange(function (data) {
        _this.event.getDistrictLinkageData(data);
    });
}
// 初始化三级联动数据
FormView.prototype.setDistrictLinkageDataHandel = function (data) {
    this._linkage.setUserData(data);
}

FormView.prototype.getDistrictLinkageDataHandel = function (event) {
    this.event.getDistrictLinkageData = event;
}

FormView.prototype.setFormData = function (data) {
    this._form.planningResultCode.setData(data);
}
FormView.prototype.setFormDataMc = function (data) {
    this._form.mc.setData(data);
}

export default FormView