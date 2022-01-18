
import districtLinkage from '../../../../../../common/districtLinkage'


var customForm = function (options) {

    this.getKey = options.getKey || 'object';

    this.html = $('<div class="customForm_districtLinkage form-control" style="line-height:30px;font-size:13px"></div>');
    this.Linkage = new districtLinkage(this.html);
    this.event = {
        change: options.onChange ? options.onChange : function () {},
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
    } else if (data && data.hasOwnProperty(this.getKey) ) {
        callback(null, data[this.getKey]);
    } else {
        callback(null, data);
    };
};

export default customForm;