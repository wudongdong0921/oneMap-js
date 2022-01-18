var DirLoadingView = function (option) {
    var _this = this;

    this._html = $('<div>' +
        '<div class="dirLoadingView" id="">' +
        '    <div class="layout-dialog-box"' +
        '        style="width: 75%; height: 84.952%; position: fixed; z-index: 1000; top: 30px; left: 240px; transform: scale(1); opacity: 1;">' +
        '        <div class="layout-dialog-title"></div>' +
        '        <div class="layout-dialog-body">' +
        '            <div class="layout-template-view" style="padding: 0px;">' +
        '                <div class="commonDetail"></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>');
    this._span = $('<span>统计分析</span>');
    this._close = $('<div class="layout-dialog-close"><i class="layui-icon" aria-hidden="true"><i class="fa fa-close"></i></i></div>');
    this._html.find('.layout-dialog-title').append(this._span);
    this._html.find('.layout-dialog-title').append(this._close);

    this._html.find('.layout-dialog-box').css({
        width: option.width ? option.width : '20%',
        height: option.height ? option.height : '30%',
        left: option.left ? option.left : '20%',
        top: option.top ? option.top : '30%'
    })

    this._close.unbind().bind('click', function () {
        _this.hide()
    })

    // 鼠标拖动事件
    var title = this._html.find('.layout-dialog-title');
    var layout = this._html.find('.layout-dialog-box');
    title.mousedown((e) => {
        // 缓存点击位置
        var clientX = e.clientX;
        var clientY = e.clientY;
        // 缓存宽高
        var width = layout.width();
        var height = layout.height();
        // 缓存位置信息
        var top = parseInt(layout.css('top'));
        var left = parseInt(layout.css('left'));

        // 关闭动画效果，防止动画离手
        layout.css({
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
            layout.css({
                left: _left,
                top: _top,
            });
        };

        // 当鼠标离开时触发
        document.onmouseup = () => {
            // 重新加载动画事件
            layout.css({
                'transition': 'all 0.2s',
            });
            // 清空移动事件对象
            document.onmousemove = null;
            document.onmouseup = null;
        }
    });
}

DirLoadingView.prototype.show = function () {
    this._html.find('.dirLoadingView').show();
}

DirLoadingView.prototype.hide = function () {
    this._html.find('.dirLoadingView').hide();
}

DirLoadingView.prototype.reset = function (el) {
    this._html.find('.commonDetail').empty();
    this._html.find('.commonDetail').append(el);
    this.show()
}

DirLoadingView.prototype.render = function () {
    return this._html;
}

export default DirLoadingView;