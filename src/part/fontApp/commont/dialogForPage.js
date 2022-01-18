///////////////////////////////////////////
// 弹出框 组件
// kris
//////////////////////////////////////////////

import renderView from '../../../layout/renderView'
import routeMain from '../router'
import api from '../api/index'


// 缓存弹出框层级，保证多级弹出框不互相覆盖
var index = 1000;

var dialog = function (option) {
    var _defaultOption = {

        // 大小默认参数
        width: '85%',
        height: '90%',

        // 位置默认参数
        top: '30px',
        left: null,
        right: null,
        bottom: null,

        path: '', // 加载弹出框的路由路径
        params: {}, // 加载弹出框的路由参数
        onClose: function () { }, // 关闭方法回调事件
        showClose: true, // 是否显示关闭按钮
        title: '', // 弹出框标题
    };
    this.option = $.extend({}, _defaultOption, option);

    // 弹出框框架元素
    this.html = $('<div class="layout-dialog"></div>');
    this.mark = $('<div class="layout-dialog-mark"></div>').appendTo(this.html);
    this.layout = $('<div class="layout-dialog-box"></div>').appendTo(this.html);
    this.title = $('<div class="layout-dialog-title"><span>' + (this.option.title ? this.option.title : ' ') + '</span><div class="layout-dialog-close"><i class="layui-icon" aria-hidden="true"><i class="fa fa-close"></i></i></div></div>').appendTo(this.layout);
    this.closeElement = this.title.find('.layout-dialog-close');
    this.body = $('<div class="layout-dialog-body"></div>').appendTo(this.layout);

    this.resizeButton = $('<div class="layout-dialog-resize"></div>').appendTo(this.layout);

    this.content = null;
    this.renderPosition();
    this.renderView();
};
// 计算弹出框位置
dialog.prototype.renderPosition = function () {
    var _this = this;

    // 页面标签元素
    var pxReg = /^\d+(px)?$/;
    var pointReg = /^\d+(%)?$/;

    // 计算渲染宽度
    if (pxReg.test(this.option.width)) {
        var width = this.option.width;
    } else if (pointReg.test(this.option.width)) {
        var width = parseFloat(this.option.width) / 100 * $(window).width() + 'px';
    };

    // 计算渲染高度
    if (pxReg.test(this.option.height)) {
        var height = this.option.height;
    } else if (pointReg.test(this.option.height)) {
        var height = parseFloat(this.option.height) / 100 * $(window).height() + 'px';
    };

    // 渲染主体高度
    this.layout.css({
        width: (parseInt(width) / $('#layout-content').width() * 100) + '%',
        height: (parseInt(height) / $('#layout-content').height() * 100) + '%',
    });

    // 计算渲染位置
    if (this.option.top || this.option.top === 0) {
        this.layout.css({ 'top': this.option.top });
    } else {
        var top = ($(window).height() - parseInt(height)) / 2 + 'px';
        this.layout.css('top', top);
    };
    if (this.option.left || this.option.left === 0) {
        this.layout.css({ 'left': this.option.left });
    } else {
        var left = ($(window).width() - parseInt(width)) / 2 + 'px';
        this.layout.css('left', left);
    };
    if (this.option.bottom) {
        this.layout.css('bottom', this.option.bottom);
    };
    if (this.option.right) {
        this.layout.css('right', this.option.right);
    };

    // 渲染位置
    this.layout.css({
        top: top,
        left: left,
    });

    setTimeout(function () {
        _this.layout.css({
            'transform': 'scale(1)',
            'opacity': '1'
        });
    }, 10);

    $('body').append(this.html);

    // 当前加载层级
    // 防止遮盖
    this.html.css({
        'z-index': index,
    });

    // 提高页面层级
    index += 20;

    // 点击拖动事件
    this.title.mousedown((e) => {
        // 缓存点击位置
        var clientX = e.clientX;
        var clientY = e.clientY;
        // 缓存宽高
        var width = _this.layout.width();
        var height = _this.layout.height();
        // 缓存位置信息
        var top = parseInt(_this.layout.css('top'));
        var left = parseInt(_this.layout.css('left'));

        // 关闭动画效果，防止动画离手
        _this.layout.css({
            'transition': 'none',
        });

        // 当鼠标移动时触发
        document.onmousemove = (event) => {
            // 计算移动相对位置
            var nowClientX = event.clientX - clientX;
            var nowClientY = event.clientY - clientY;

            // 计算坐标
            var _left = nowClientX + left;
            var _top = nowClientY + top;

            // 计算移动边界
            if (_left < 0) _left = 0;
            if (_left > $(window).width() - width) _left = $(window).width() - width;
            if (_top < 0) _top = 0;
            if (_top > $(window).height() - height) _top = $(window).height() - height;

            // 渲染
            _this.layout.css({
                left: _left,
                top: _top,
            });
        };

        // 当鼠标离开时触发
        document.onmouseup = () => {
            // 重新加载动画事件
            _this.layout.css({
                'transition': 'all 0.2s',
            });
            // 清空移动事件对象
            document.onmousemove = null;
            document.onmouseup = null;
        }
    });


    this.resizeButton.mousedown((e) => {
        // 缓存点击位置
        var clientX = e.clientX;
        var clientY = e.clientY;
        // 缓存宽高
        var width = _this.layout.width();
        var height = _this.layout.height();

        // 关闭动画效果，防止动画离手
        _this.layout.css({
            'transition': 'none',
            'user-select': 'none'
        });

        // 当鼠标移动时触发
        document.onmousemove = (event) => {
            // 计算移动相对位置
            var nowClientX = event.clientX - clientX;
            var nowClientY = event.clientY - clientY;

            // 计算坐标
            var _width = width + nowClientX;
            var _height = height + nowClientY;

            if (_width < 200) _width = 200;
            if (_height < 0) _height = 200;

            // 渲染
            _this.layout.css({
                width: (parseInt(_width) / $('#layout-content').width() * 100) + '%',
                height: (parseInt(_height) / $('#layout-content').height() * 100) + '%',
            });
        };
        // 当鼠标离开时触发
        document.onmouseup = () => {
            // 重新加载动画事件
            _this.layout.css({
                'transition': 'all 0.2s',
                'user-select': 'text'
            });
            // 清空移动事件对象
            document.onmousemove = null;
            document.onmouseup = null;
        };
    });

    // 关闭事件
    this.closeElement.click(function () {
        _this.close(_this.content);
    });
};

dialog.prototype.resize = function () {

};

dialog.prototype.onClose = function (event) {
    this.option.onClose = event;
};

dialog.prototype.renderView = function () {
    var _this = this;
    // this.option.params.DialogPatent = this;
    var route = routeMain.getRouter(this.option.path, this.option.params);
    route['getApi'] = api;
    var contentItem = renderView(route, {
        closeEvent: function () {
            _this.close.apply(_this, arguments);
        },
        DialogPatent : this
    });
    contentItem.render.call(contentItem, this.body);
    contentItem.$el.css({
        'padding': 0,
    });
    this.content = contentItem;
};

// 关闭方法
dialog.prototype.close = function () {
    this.layout.css({
        'transform': 'scale(1.2)',
        'opacity': '0'
    });
    setTimeout(() => {
        this.option.onClose.apply(this, arguments);
        this.content.destroy();
        this.html.remove();
    }, 150);
};

// 每次调用单独生成新的框架对象
export default function (option) {
    // 并将调用对象返回给使用者
    return new dialog(option);
};
