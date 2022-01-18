
var paging = function (options, type) {
    var defaultSetting = {
        data: {},
        ajaxEvent: function (data, callback) { },
        before: function (event) { },
        success: function (result) { },
        hasQuick: false,
    };
    this.options = $.extend({}, defaultSetting, options);
    this.type = type;
    this.parent = $('<div class="paring"></div>');
    this.html = $('<ul class="pagination"></ul>');
    this.parent.append(this.html);
    this.pageCount = null;
};
paging.prototype = {
    constructor: this,
    render: function () {
        this.init();
        return this.parent;
    },
    init: function () {
        var _this = this;
        this.options.before(this);
        if (this.options) {
            this.options.ajaxEvent(this.options.data, function (result) {
                if (!result) {
                    _this.options.success(result);
                } else {
                    _this.pageCount = _this.hasPaging(result.totalRecord, _this.options.data);
                    _this.template();
                    _this.Quick();
                    _this.options.success(result.list);
                };
            });
        } else {
            console.error('paging error : parameters must be an object');
        };
    },
    template: function () {
        var _this = this;
        _this.html.empty();
        var pages = this.pageCount;
        if (!pages) {
            return;
        };
        var option = $.extend(true, {}, _this.options);
        var index = parseInt(option.data.pageInfo.index);
        // 上一页
        var prev = '';
        if (index > 1) {
            prev = $('<li class="page-item" style="cursor:pointer"><span class="page-link">上一页</span></li>');
            prev.unbind().bind('click', function () {
                var newData = $.extend(true, {}, option);
                newData.data.pageInfo.index = parseInt(newData.data.pageInfo.index) - 1;
                _this.options = newData;
                _this.init();
            });
        } else {
            prev = $('<li class="page-item disabled"><span class="page-link">上一页</span></li>');
        };
        _this.html.append(prev);
        // 中间页
        if (_this.type == 'wap') {
            _this.html.addClass('forwap');
            // select
            var html = $('<div class="select">当前第<span class="page-link"><select></select></span>页</div>');
            for (var i = 0; i < pages; i++) {
                html.find('select').append(_this.pageOption(i + 1, index));
            };
            html.find('select').change(function () {
                var newData = $.extend(true, {}, option);
                newData.data.pageInfo.index = $(this).find('option:selected').val();
                _this.options = newData;
                _this.init();
            });
            _this.html.append(html);
        } else {
            if (index != 1 && index >= 4 && pages != 4) {
                var first = $('<li class="page-item" style="cursor:pointer"><span class="page-link">' + 1 + '</span></li>');
                first.click(function () {
                    var newData = $.extend(true, {}, option);
                    newData.data.pageInfo.index = 1;
                    _this.options = newData;
                    _this.init();
                });
                _this.html.append(first);
            };
            if (index - 2 > 2 && index <= pages && pages > 5) {
                _this.html.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
            };
             //wdd
            // var start = index - 2,
            var start = index,
            end = index
                // end = index + 2;
            if ((start > 1 && index < 4) || index == 1) {
                end++;
            };
            if (index > pages - 4 && index >= pages) {
                start--;
            };

            function middleButton(index, middleElement) {
                middleElement.bind('click', function () {
                    var newData = $.extend(true, {}, option);
                    newData.data.pageInfo.index = parseInt(index);
                    _this.options = newData;
                    _this.init();
                });
            };
            for (; start <= end; start++) {
                if (start <= pages && start >= 1) {
                    if (start != index) {
                        var middle = $('<li class="page-item" style="cursor:pointer"><span class="page-link">' + start + '</span></li>');
                        middleButton(start, middle);
                        _this.html.append(middle);
                    } else {
                        _this.html.append('<li class="page-item active"><span class="page-link">' + start + '</span></li>');
                    }
                }
            };
            if (index + 2 < pages - 1 && index >= 0 && pages > 5) {
                _this.html.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
            };
            if (index != pages && index < pages - 2 && pages != 4) {
                var last = $('<li class="page-item" style="cursor:pointer"><span class="page-link">' + pages + '</span></li>');
                last.click(function () {
                    var newData = $.extend(true, {}, option);
                    newData.data.pageInfo.index = parseInt(pages);
                    _this.options = newData;
                    _this.init();
                });
                _this.html.append(last);
            };
        };
        // 下一页
        var next = '';
        if (index < pages) {
            next = $('<li class="page-item" style="cursor: pointer;"><span class="page-link">下一页</span></li>');
            next.click(function () {
                var newData = $.extend(true, {}, option);
                newData.data.pageInfo.index = parseInt(newData.data.pageInfo.index) + 1;
                _this.options = newData;
                _this.init();
            });
        } else {
            next = $('<li class="page-item disabled"><span class="page-link">下一页</span></li>');
        }
        _this.html.append(next);

    },
    Quick: function () {
        var _this = this;
        var pages = this.pageCount;
        if (this.options.hasQuick) {
            if (this.parent.find('.quiteTo').length != 0) {
                this.parent.find('.quiteTo').remove();
            };
            var html = $('<div class="quiteTo" style="color:#777;display:inline-block;margin: 20px 0; vertical-align: top;">&nbsp; 跳转到 ： <input type="text" class="form-control normal" style="display:inline; width:45px;padding:6px;" /> 页&nbsp; <div class="btn btn-primary">GO</div> </div>');
            // html.find(input);
            var button = html.find('.btn');
            var input = html.find('input');
            button.click(function () {
                var ans = DevUI.rules({
                    text: '页码', rules: ['notNull', 'int', function (value) {
                        if (value < 1 || value > pages) {
                            return '超过页码范围'
                        } else {
                            return false;
                        }
                    }]
                }, input.val());
                if (!ans) {
                    var option = $.extend(true, {}, _this.options);
                    option.data.pageInfo.index = parseInt(input.val());
                    _this.options = option;
                    _this.init();
                } else {
                    window._alert.error({
                        text: ans
                    });
                }
            });
            this.parent.append(html);
        };
    },
    hasPaging: function (totalCount) {
        var pages = Math.ceil(parseInt(totalCount) / parseInt(this.options.data.pageInfo.count));
        if (pages <= 1 && this.options.data.pageInfo.index == 1) {
            return false;
        } else {
            return pages;
        };
    },
    pageOption: function (data, index) {
        var html = '';
        html += '<option value="' + data + '" ' + (data == index ? 'selected="selected"' : '') + '>' + data + '</option>';
        return html;
    },
    refresh: function (data) {
        this.options.data = data;
        this.init();
    }
};

export default paging;

