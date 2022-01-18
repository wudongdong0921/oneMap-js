////////////////////////////////////////////////
// 弹出
// 吴东东
// 2020-11-12 14:07:47
////////////////////////////////////////////////
import Drag from "../drag"
var ToolPopup = function(key) {
    this.events = {
        onClose: function () { },
        submitBtn: function() {}
    }
    var defaultOut = ""
    defaultOut += '<div class="layout-popup">';
    defaultOut += '     <div class="layout-dialog-wrapper">'
    defaultOut += '         <div class="layout-dialog-mark"></div>'
    defaultOut += '         <div class="layout-dialog-box">'
    defaultOut += '             <div class="layout-dialog-title">'
    defaultOut += '                 <span class="layout-title"></span>';
    defaultOut += '                 <div class="layout-dialog-close">';
    defaultOut += '                     <i class="layui-icon" aria-hidden="true"><i class="fa fa-close"></i></i>';
    defaultOut += '                 </div>'
    defaultOut += '             </div>'
    defaultOut += '             <div class="layout-dialog-body"></div>';
    defaultOut += '             <div class="layout-dialog-foot"></div>';
    defaultOut += '         </div>'
    defaultOut += '     </div>'
    defaultOut += '</div>'
    this.html = $(defaultOut)
    this.html.hide()
    this.type = key
    this.off= true
    this.on = true
    this.obj = null
    this.active = ""
    var msg = '';
    msg += '<div class="layer-msg">';
    msg += '    <div class="layer-msg-box"><span class="layer-msg-title"><span></div>';
    msg += '</div>'
    this.html.find('.layout-dialog-close').click(() => {
        this.off= true
        this.html.hide()
        this.active && this.active.removeClass('active')
    })
    var drag = new Drag({
        el: this.html.find('.layout-dialog-box')
    })
    this.html.appendTo($('body'))
}
ToolPopup.prototype.closePoup = function() {
    this.option.onClose.apply(this, arguments);
}
ToolPopup.prototype.handleShow = function (option) {
    this.option = $.extend({}, option);
    this.html.find('.layout-title').text(option.title)
    var left = ($(window).width() - parseInt(option.width))/2
    var top = ($(window).height() - parseInt(option.height))/2
    this.html.find('.layout-dialog-box').css({
        'top': top,
        'left': left,
        'bottom': option.bottom,
        'right': option.right,
        'width': option.width,
        'height': option.height,
        //'transform': option.transform
        // 'margin-left':-parseInt(option.width)/2 + 'px',
        // 'margin-top': -parseInt(option.height)/2 + 'px',

    })
    //option.mask || this.html.find('.layout-dialog-close').remove()
    option.mask || this.html.find('.layout-dialog-mark').remove()
    option.icon && this.html.find('.layout-dialog-close').remove()
    this.html.show()

}
export default ToolPopup