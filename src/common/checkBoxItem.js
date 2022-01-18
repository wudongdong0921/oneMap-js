
import util from './util';
let verify = {};
verify.is = util.is;


var checkBoxItem = function (options) {
    this.options = $.extend({}, {
        showKey: 'name',
        getKey: 'object',
        data: options.data,
        description: null,
        'default': false,
        onChange: function () { },
        onReady: function () { },
    }, options);
    this.html = $('<div class="layui-unselect layui-form-checkbox" lay-skin="primary" ' + (options.description ? ('title="' + options.description + '"') : '') + '>' +
        '   <span></span>' +
        '   <i class="layui-icon layui-icon-ok"></i>' +
        '</div>');
    this.name = this.html.find('span');

    if (options.data.hasOwnProperty(this.options.showKey)) {
        const element = options.data[this.options.showKey];
        this.name.text(element);
    } else {
        this.name.text(this.options.showKey);
    };

    this.value = this.options.default;
    this.renderCheck();
    this.html.click(() => {
        this.value = !this.value;
        this.renderCheck();
        this.options.onChange.call(this, this.value);
    });
    this.options.onReady.call(this, this);
};

checkBoxItem.prototype.onChange = function (event) {
    this.options.onChange = event;
};
checkBoxItem.prototype.onReady = function (event) {
    this.options.onReady = event;
};


checkBoxItem.prototype.renderCheck = function () {
    if (this.value) {
        this.html.addClass('layui-form-checked');
    } else {
        this.html.removeClass('layui-form-checked');
    }
};
checkBoxItem.render = function () {
    return this.html;
};
checkBoxItem.prototype.setData = function (data) {
    this.options.data = data;
    this.name.text(this.options.data[this.options.showKey]);
};
checkBoxItem.prototype.set = function (type) {
    this.value = type;
    this.renderCheck();
};
checkBoxItem.prototype.get = function (callBack, ignore) {
    if (ignore) {
        return this.value;
    } else {
        if (this.value) {
            if (this.options.getkey == 'object') {
                callBack(false, this.options.data);
            } else {
                callBack(false, this.options.data);
            }
        };
        return this;
    };
};

export default checkBoxItem
