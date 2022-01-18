////////////////////////////////////////////////
// 
// 吴东东
// 2020-11-18 13:31:45
////////////////////////////////////////////////
var Msg = function(obj) {
    var msg = '';
    msg += '<div class="layer-msg">';
    msg += '    <div class="layer-msg-box"><span class="layer-msg-title"><span></div>';
    msg += '</div>'
    this.msg = $(msg)
    obj.el.append(this.msg)
    this.msg.hide()
}
Msg.prototype.openMsg = function (msg) {
    this.msg.show()
    this.msg.find('.layer-msg-title').text(msg)
    setTimeout(() => {
        this.msg.hide()
    }, 2000)
}
export default Msg