////////////////////////////////////////////////
// 拖拽
// 吴东东
// 2020-11-16 11:03:41
////////////////////////////////////////////////
var Drag = function(option) {
    this.option = option
    this.dragMove()
}
Drag.prototype.dragMove = function() {
    this.option.el.mousedown((e) => {
        this.option.moveCurrent = {
            x: e.clientX - parseInt(this.option.el.css('left')), //偏移值
            y: e.clientY - parseInt(this.option.el.css('top')),
            width: this.option.el.width(),
            height: this.option.el.height(),
        }
        document.onmousemove = (event) => {
            var leftX = event.clientX-this.option.moveCurrent.x
            var leftY = event.clientY-this.option.moveCurrent.y
            //左
            if(leftX<0) {
                leftX = 0
            }
            //右
            if (leftX > $(window).width() - this.option.moveCurrent.width) {
                leftX = $(window).width() - this.option.moveCurrent.width
            }
            //上
            if(leftY <0) {
                leftY = 0
            }
            //下
            if (leftY > $(window).height() - this.option.moveCurrent.height) {
                leftY = $(window).height() - this.option.moveCurrent.height
            }
            this.option.el.css({
                left: leftX,
                top: leftY,

            })
        }
        document.onmouseup = (event) => {
            // 清空移动事件对象
            document.onmousemove = null;
            document.onmouseup = null;
        }
    })
}
export default Drag