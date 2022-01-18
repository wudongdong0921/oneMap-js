import util from './util';

let verify = {};

verify.is = util.is;
var rules = util.rules;

var textarea = function (options) {
    if (options === undefined) {
        options = {};
    };
    // 合并参数
    this.options = $.extend({}, {
        verify: {  // 验证规则
            text: '',
            rules: []
        },
        readonly: false, // 是否只读
        placeholder: '', // 提示信息项
        'default': null, // 默认值
        height: 150, //初始高度
        width: '',
        autocomplete: 'off',
        resize: 'none', //是否可拖拽 // vertical 纵向 // horizontal 横向 // both 任意方向 // none 不能
        useTabSpace: true, // 是否使用tab进行缩进
        useTabSpaceWidth: 4, // 缩进的空格数量
        aotoHeight: true, // 自动行高
        errorStyle: 'form-error',
        onChange: function () { }, // 值改变时的方法
        onError: function () { }, // 错误时的方法
    }, options);
    // 事件集合
    this.event = {
        change: this.options.onChange,
        error: this.options.onError
    };
    this.html = $('<textarea spellcheck="false" autocomplete="' + this.options.autocomplete + '" style="height:' + this.options.height + 'px;resize: ' + this.options.resize + ';width:' + this.options.width + 'px" class="form-control"></textarea>');
    // 默认值
    this.value = null;
    var _this = this;
    // 兼容IE 的 placeHolder
    if (!!(this.options.placeholder) && !('placeholder' in document.createElement('input'))) {
        this.html.val(this.html.attr('placeholder', _this.options.placeholder));
        this.html.val(this.html.attr('placeholder')).addClass('ie-placeholder');
        this.html.bind('focus', function () {
            if (_this.html.val() == _this.html.attr('placeholder')) {
                _this.html.val("").removeClass('ie-placeholder');
            }
        }).bind('blur', function () {
            if (_this.html.val().length == 0) {
                _this.html.val(_this.html.attr('placeholder')).addClass('ie-placeholder');
            }
        });
    } else {
        this.html.attr('placeholder', this.options.placeholder);
    };
    // 判断tab按键是切换下一行,还是切换下一个输入框
    if (this.options.useTabSpace) {
        this.html.on('keydown', function (e) {
            if (e.keyCode == 9) {
                e.preventDefault();
                var indent = '';
                for (var i = 0; i < _this.options.useTabSpaceWidth; i++) {
                    indent += ' ';
                };
                var start = this.selectionStart;
                var end = this.selectionEnd;
                var selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, '\n' + indent);
                this.value = this.value.substring(0, start) + selected
                    + this.value.substring(end);
                this.setSelectionRange(start + indent.length, start
                    + selected.length);
            }
        });
    };
    // 绑定change方法(支持拼音输入法)
    this.html.unbind().bind('input propertychange', function () {
        _this.change();
        // 自动增加高度  ** 首先收缩高度,让滚动条出现,然后让元素高度等于滚动条的总高度实现自动增加高度
        if (_this.options.aotoHeight) {
            $(this).height(_this.options.height).height(_this.html[0].scrollHeight);
        };
    });
    // 初始化中,生成元素是否只读
    this.readonly(this.options.readonly);
    // 添加默认值
    this.set(this.options['default']);
    // 储存错误信息
    this.errorMessage = null;
};
textarea.prototype = {
    constructor: this,
    // 绑定事件集合方法
    on: function (str, event) {
        if (this.event.hasOwnProperty(str)) {
            this.event[str] = event;
        };
        return this;
    },
    // 单独绑定 change 方法
    onChange: function (event) {
        this.event.change = event;
        return this;
    },
    showErrorStyle: function () {
        if (!this.options.errorStyle) {
            return this;
        };
        this.html.addClass(this.options.errorStyle);
        return this;
    },
    hideErrorStyle: function () {
        if (!this.options.errorStyle) {
            return this;
        };
        this.html.removeClass(this.options.errorStyle);
        return this;
    },
    // 单独绑定 error 方法
    onError: function (event) {
        this.event.error = event;
        return this;
    },
    // 开关自动高度
    autoHeight: function (bool) {
        this.options.aotoHeight = !!bool;
        if (!this.options.aotoHeight) {
            this.html.height(this.options.height);
        };
    },
    // 当值发生变化时
    change: function () {
        // 改变变量作用域,使调用函数可以使用 this 方法
        this.value = this.html.val();
        this.event.change.apply(this, [this.html.val()]);
        // 执行验证方法
        this.verify();
        return this;
    },
    verify: function () {
        // 执行验证方法
        var text = rules(this.options.verify, this.html.val());
        // 父级模板的显示错误信息及关闭错误信息
        if (text) {
            this.showErrorStyle();
            this.event.error.apply(this, [text, this.html.val()]);
            this.errorMessage = text;
        } else {
            this.hideErrorStyle();
            // 如果错误信息为空,侧清空错误信息
            this.errorMessage = null;
        };
        return this;
    },
    // 操作元素是否只读
    readonly: function (isReadonly) {
        var _isReadonly = null;
        if (verify.is(isReadonly) == 'function') {
            _isReadonly = isReadonly();
        };
        _isReadonly = !!isReadonly;
        if (_isReadonly) {
            this.html.attr('readonly', 'readonly');
            this.html.addClass('readonly');
        } else {
            this.html.attr('readonly', _isReadonly);
            this.html.removeClass('readonly');
        };
        return this;
    },
    // 为输入框赋值
    set: function (data, doChange) {
        if (data === null) {
            return;
        };
        this.value = data;
        this.html.val(data);
        if (doChange) {
            this.change();
        };
        return this;
    },
    // 取值方法
    get: function (callBack, ignore) {
        if (ignore) {
            callBack(this.value);
        } else {
            this.verify();
            if (this.errorMessage) {
                callBack(this.errorMessage);
            } else {
                callBack(false, this.value);
            };
        };
        return this;
    },
};

export default textarea
