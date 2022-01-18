var util = icu.util;
let verify = {};
verify.is = util.is;
var checkBoxItem = function (options) {
    this.options = $.extend({}, {
        showKey: 'name',
        getKey: 'object',
        data: {},
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
var moreSelectOptions = function (options) {
    this.options = $.extend({}, {
        checkAll: false,
        showKey: options.showKey,
        getKey: options.getKey,
        setKey: options.setKey,
        getType: options.getType,
        data: [],
        onChange: function () { },
    }, options);

    var _this = this;
    this.html = $('<div class="form_select_optionBox form_select_searchBox_optionBox"></div>');
    this.searchBox = $('<div class="form_select_searchBox"><i class="fa fa-search" aria-hidden="true"></i><div class="form_select_searchInputBox"></div></div>').appendTo(this.html);
    this.searchInput = $('<input type="text" spellcheck="false" class="form-control" placeholder="请输入关键字"/>').appendTo(this.searchBox.find('.form_select_searchInputBox'));
    this.childBox = $('<div class="form_select_childBox"><div class="form_select_childBox_noData" style="display:none">未找到结果</div></div>').appendTo(this.html);
    this.child = [];
    this.searchInput.on('input', function (e) {
        var searchinputText = $(this).val();
        if (searchinputText) {
            var Allhide = false;
            for (let i = 0; i < _this.child.length; i++) {
                const element = _this.child[i];
                var text = element.html.find('span').text();
                if (text.indexOf($(this).val()) != -1) {
                    Allhide = true;
                    element.html.show();
                } else {
                    element.html.hide();
                };
            };
            if (!Allhide) {
                if ( _this.childBox.find('.form_select_childBox_noData').length == 0) {
                    _this.childBox.append('<div class="form_select_childBox_noData">未找到结果</div>');
                }
            } else {
                _this.childBox.find('.form_select_childBox_noData').remove();
            };
        } else {
            for (let i = 0; i < _this.child.length; i++) {
                const element = _this.child[i];
                element.html.show();
                _this.childBox.find('.form_select_childBox_noData').remove();
            }
        };
    });

    this.html.click(function (e) {
        e.stopPropagation();
    });
};
moreSelectOptions.prototype.setData = function (data) {
    var _this = this;
    this.child = [];
    this.childBox.empty();
    if (data.length == 0) {
        // this.childBox.find('.form_select_childBox_noData').show();
        this.childBox.append('<div class="form_select_childBox_noData">未找到结果</div>');
    } else {
        // this.childBox.find('.form_select_childBox_noData').hide();
        // this.childList.setData(data);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = new checkBoxItem({
                showKey: element[this.options.showKey],
                getKey: 'object',
                data: element,
                onChange: function (value) {
                    _this.options.onChange.call(_this, value, element);
                },
            });
            this.child.push(item);
            this.childBox.append(item.html);
        }
    };
};
var moreSelectValueItem = function (data, name) {
    this.data = data;
    this.html = $('<div class="form_select_searchBox_valueitem">' + name + '<i class="fa fa-close" aria-hidden="true"></i></div>');
    this.html.click(function (e) {
        e.stopPropagation();
    });
    this.event = {
        clearEvent: function () { }
    };
    var _this = this;
    this.html.find('i').click(function (e) {
        e.stopPropagation();
        _this.event.clearEvent(_this);
    });
};
moreSelectValueItem.prototype.onClose = function (event) {
    this.event.clearEvent = event;
};
var moreSelect = function (options) {
    this.options = $.extend({}, {
        className: '',
        // minLength: 0,
        // maxLength: null,
        showKey: 'label',
        setKey: 'value',
        getKey: 'setKey',
        // getType: ',',
        readonly: false,
        errorStyle: 'form-error',
        data: [],
        placeholder: '- 请选择 -',
        onChange: function () { },
        onError: function () { }
    }, options);
    var html = '';
    html += '   <div class="form_select ' + this.options.className + '">';
    html += '       <div class="form_select_nameBox">';
    html += '           <div class="form_select_name">' + this.options.placeholder + '</div>';
    html += '           <span class="fa fa-angle-down"></span>';
    html += '       </div>';
    html += '   </div>';
    this.html = $(html);
    this.nameBox = this.html.find('.form_select_nameBox');
    this.name = this.html.find('.form_select_name');
    this.showOptionBox = false;
    this.event = {
        change: this.options.onChange,
        error: this.options.onError
    };
    this.child = [];
    if (this.options.data.length != 0) {
        this.setData(this.options.data);
    };
    var _this = this;
    this.errorMessage = null;
    this.optionBox = new moreSelectOptions({
        showKey: this.options.showKey,
        getKey: this.options.getKey,
        setKey: this.options.setKey,
        getType: this.options.getType,
        onChange: function (value, data) {
            if (value) {
                _this.addChild(data);
            } else {
                _this.removeCheckItem(data);
            };
        },
    });
    this.html.append(this.optionBox.html);
    this.readonly(this.options.readonly);
};
moreSelect.prototype.addChild = function (data) {
    if (this.child.length == 0) {
        this.name.empty();
    };
    var _this = this;
    var childItem = new moreSelectValueItem(data, data[this.options.showKey]);
    this.child.push(childItem);
    childItem.onClose(function (event) {
        _this.deleteChild(event);
    });
    this.name.append(childItem.html);
};
moreSelect.prototype.removeCheckItem = function (event) {
    for (let i = 0; i < this.child.length; i++) {
        const element = this.child[i];
        if (element.data[this.options.showKey] === event[this.options.showKey]) {
            element.html.remove();
            this.child.splice(i, 1);
            break;
        };
    };
    if (this.child.length == 0) {
        this.name.text(this.options.placeholder);
    };
};
moreSelect.prototype.deleteChild = function (event) {
    for (let i = 0; i < this.child.length; i++) {
        const element = this.child[i];
        if (element === event) {
            element.html.remove();
            this.child.splice(i, 1);
            break;
        };
    };
    for (let i = 0; i < this.optionBox.child.length; i++) {
        const element = this.optionBox.child[i];
        if (element.options.data[this.options.showKey] == event.data[this.options.showKey]) {
            element.set(false);
        };
    };
    if (this.child.length == 0) {
        this.name.text(this.options.placeholder);
    };
};
moreSelect.prototype.setData = function (data) {
    this.optionBox.setData(data);
};
moreSelect.prototype.clearClick = function () {
    this.nameBox.unbind('click');
    this.html.removeClass('active');
    this.optionBox.html.css('display', 'none');
    this.showOptionBox = false;
    $(document).unbind('click', this.documentClick);
    return this;
};
moreSelect.prototype.bindClick = function () {
    var _this = this;
    _this.documentClick = function () {
        _this.html.removeClass('active');
        _this.showOptionBox = false;
        _this.optionBox.html.css('display', 'none');
        $(document).unbind('click', _this.documentClick);
    };

    this.nameBox.unbind('click').bind('click', function (e) {
        if (_this.showOptionBox) {
            _this.documentClick();
        } else {
            _this.html.addClass('active');
            _this.showOptionBox = true;
            _this.optionBox.html.css('display', 'block');

            $(document).click();
            $(document).unbind('click', _this.documentClick).bind('click', _this.documentClick);
        };
        e.stopPropagation();
    });
    return this;
};
moreSelect.prototype.set = function (data) {
    this.name.empty();
    this.child = [];
    var _this = this;
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let d = 0; d < this.optionBox.child.length; d++) {
                const item = this.optionBox.child[d];
                if (item.options.data[this.options.setKey] == element) {
                    item.set(true);
                    var childItem = new moreSelectValueItem(item.options.data, item.options.data[this.options.showKey]);
                    this.child.push(childItem);
                    childItem.onClose(function (event) {
                        _this.deleteChild(event);
                    });
                    this.name.append(childItem.html);
                };
            }
        }
    } else {
        this.name.text(this.options.placeholder);
    };
};
moreSelect.prototype.readonly = function (isReadonly) {
    var _isReadonly = null;
    if (verify.is(isReadonly) == 'function') {
        _isReadonly = isReadonly();
    };
    _isReadonly = !!isReadonly;
    if (_isReadonly) {
        this.html.addClass('readonly');
        this.clearClick();
    } else {
        this.html.removeClass('readonly');
        this.bindClick();
    };
};
moreSelect.prototype.get = function (callback, ignore) {
    var data = [];
    for (let i = 0; i < this.child.length; i++) {
        const element = this.child[i];
        if (this.options.getKey == 'object') {
            data.push(element.data);
        } else if (element.hasOwnProperty(this.options.getKey)) {
            data.push(element.data[this.options.getKey]);
        };
    };
    callback(null, data);
};
export default moreSelect;