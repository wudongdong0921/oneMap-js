////////////////////////////////////////////////
// 记住用户
// Kris
// 2021-04-29 14:15:06
////////////////////////////////////////////////
var storage = icu.storage;
var forget = {
    text: '记住用户名',
    checkStatus: false,
    show: function () {
        forget.ele.addClass('layui-form-checked');
        forget.checkStatus = true;
    },
    hide: function () {
        forget.ele.removeClass('layui-form-checked');
        forget.checkStatus = false;
    },
    event: function () {
        var elementHtml = '';
        elementHtml += '<div class="layui-unselect layui-form-checkbox" lay-skin="primary">';
        elementHtml += '<span>' + forget.text + '</span>';
        elementHtml += '<i class="layui-icon layui-icon-ok"></i>';
        elementHtml += '</div>';
        var element = $(elementHtml);
        element.click(function () {
            if (forget.checkStatus) {
                storage.set('forgetUsername', forget.checkStatus);
                forget.hide();
            } else {
                storage.set('forgetUsername', forget.checkStatus);
                forget.show();
            }
        })
        return element;
    },
    set: function (value) {
        if (value) {
            forget.show()
        } else {
            forget.hide()
        }
    }
}
export default forget;