var Tab = function(option) {
    this.container = option.el || null;
    this.defaultIndex = option.defaultIndex || 0;
    this.tab = this.container.find('.tabId').children(':first')
    this.item = this.tab.children()
    this.contents = this.tab.nextAll().children()
    this.TabLen = this.contents.length
    this.setIndex()
    this.eventClick()
    this.event = {
        changeIndex: function() {}
    }
    
}
Tab.prototype.init = function() {

}
Tab.prototype.changeControl = function(event) {
    this.event.changeIndex = event
    this.event.changeIndex(this.defaultIndex)
}
Tab.prototype.setIndex = function() {
this.item[this.defaultIndex].classList.add('active')
this.contents[this.defaultIndex].classList.add('wdd-show')
}
Tab.prototype.eventClick = function() {
var _this = this
for(var i =0;i<this.item.length;i++) {
    (function(i) {
        _this.item[i].onclick = function(event) {
            _this.event.changeIndex(i)
            for(var j = 0;j<_this.item.length;j++) {
                _this.contents[j].classList.remove('wdd-show')
                _this.item[j].classList.remove('active')
            }
            _this.item[i].classList.add('active')
            _this.contents[i].classList.add('wdd-show')
        }
    }(i))
}

}
export default Tab