import districtLinkage from './districtLinkage';

var customForm = function (options) {

    this.getKey = options.getKey || 'object';

    this.html = $('<div class="customForm_districtLinkage form-control" style="line-height:30px;font-size:13px;overflow:hidden;"></div>');
    this.Linkage = new districtLinkage(this.html);
    var userData = icu.session.get("userInfo");
    var type = icu.session.get("typeMap");
    if(type == 'oneMap'){
        
        // 2021-04-01 陈薪名 修改 开发适宜性评价、资源环境承载能力、规划实施评估、风险识别、辅助选址 行政区划要人人后台基本信息的，保持一致
        // this.Linkage.setUserData(userData.mapAreaCodeList);
        this.Linkage.setUserData(userData.areacodeList);
        icu.session.set("typeMap","");
    }else{
        this.Linkage.setUserData(userData.areacodeList);
        
    }
    this.event = {
        change: options.onChange ? options.onChange : function () { },
    };
    this.Linkage.onChange((value) => {
        this.html.text(this.Linkage.getShowValue(','));
        // this.html.text(value.dictLabel);
        this.event.change(value);
    });
};
customForm.prototype.onChange = function (e) {
    this.event.change = e;
};

customForm.prototype.set = function (data) {
    this.Linkage.setUserData(data);
};
customForm.prototype.get = function (callback, ignore) {
    var data = this.Linkage.get();
    if (this.getKey == 'object') {
        callback(null, data);
    } else if (data && data.hasOwnProperty(this.getKey)) {
        callback(null, data[this.getKey]);
    } else {
        callback(null, data);
    };
};
// 2021-04-06 陈薪名 新增加重置方法
customForm.prototype.reset = function ()  {
    this.Linkage.reset(this.html);
}
// 2021-05-07 陈薪名 新增回显方法
customForm.prototype.showValue = function (value) {
    this.Linkage.getShowValueForKey(this.html, value);
}

export default customForm;