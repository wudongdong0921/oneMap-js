// loading 组件
import './loading.css'

!(function ($, undefined) {
    var loadingEX = function (ele, opt) {
        this.$element = ele;
        this.defaultSetting = {
            className: '',
            loadingText: 'LOADING',
            type: 'box',
        };
        this.options = $.extend({}, this.defaultSetting, opt);
        this.stutas = false;
    };

    var svg = '';
    svg += '<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->';
    svg += '<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">';
    svg += '    <defs>';
    svg += '        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">';
    svg += '            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>';
    svg += '            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>';
    svg += '            <stop stop-color="#fff" offset="100%"/>';
    svg += '        </linearGradient>';
    svg += '    </defs>';
    svg += '    <g fill="none" fill-rule="evenodd">';
    svg += '        <g transform="translate(1 1)">';
    svg += '            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">';
    svg += '                <animateTransform';
    svg += '                    attributeName="transform"';
    svg += '                    type="rotate"';
    svg += '                    from="0 18 18"';
    svg += '                    to="360 18 18"';
    svg += '                    dur="0.9s"';
    svg += '                    repeatCount="indefinite" />';
    svg += '            </path>';
    svg += '            <circle fill="#fff" cx="36" cy="18" r="1">';
    svg += '                <animateTransform';
    svg += '                    attributeName="transform"';
    svg += '                    type="rotate"';
    svg += '                    from="0 18 18"';
    svg += '                    to="360 18 18"';
    svg += '                    dur="0.9s"';
    svg += '                    repeatCount="indefinite" />';
    svg += '            </circle>';
    svg += '        </g>';
    svg += '    </g>';
    svg += '</svg>';

    //定义loadingEX的方法
    loadingEX.prototype = {
        render: function () {
            var html = '';
            html += '<div class="loadingEx ' + this.options.SclassName + '">';
            html += '   <div class="loadingBody">';
            html += '       <div class="loadingImg"></div>';
            html += '       <div class="loadingText">' + this.options.loadingText + '</div>';
            html += '   </div>';
            html += '</div>';
            this.html = $(html);
            this.html.find('.loadingImg').append(svg);
        },
        show: function () {
            if (this.$element.find(' > .loadingEx').length != 0) {
                return this.$element.find('> .loadingEx').remove();
            } else {
                this.render();
                if (this.$element.selector == 'body') {
                    this.html.css('position', 'fixed');
                };
                return this.$element.append(this.html);
            };
        }
    };
    //在插件中使用loadingEX对象
    $.fn.loading = function (options) {
        new loadingEX(this, options).show();
        //创建loadingEX的实体
        //调用其方法
        return this;
    };
})(jQuery);