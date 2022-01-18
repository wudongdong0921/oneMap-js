var select = ''
select += '<div class="select-wrapper">'
select += ' <div class="wdd-select">';
select +=	'   <select name="wdd-select-box" class=".wdd-select-box">';
select +=	'   </select>';
select += ' </div>'
select += '</div>'
var Select = function() {

    this.selectHtml = $(select)
    this.select = this.selectHtml.find('select')
    this.selectHtml.hide()
    this.event = {
        selectChnage: function() {}
    }
    
}
Select.prototype.create = function(ele,sty) {
    let element = document.createElement(ele)
    element.style.cssText = sty
    return $(element)
}
Select.prototype.selectData = function(option) {
    this.selectHtml.show()
    this.render(option)
}
Select.prototype.render = function(option) {
    this.select.empty()
    this.selectHtml.find('select').unbind()
    var options = []
    options = option.options ? option.options : options
    var Option = null
    for(var i =0;i<options.length;i++) {
        Option = this.create('option')
        Option.text(options[i].name)
        Option.val(options[i].value)
       this.select.append(Option)
    }
    this.areaName(options)
    
    $(document).change((e) => {
        var val = this.select.val()
        var text = this.select.find("option:selected").text()
        this.event.selectChnage(text,val)
    })
}
Select.prototype.areaName = function(datta) {
    
}
Select.prototype.onSelectChnage = function(event) {
    
    this.event.selectChnage = event
    var val = this.select.val()
        var text = this.select.find("option:selected").text()
        this.event.selectChnage(text,val)
}
export default Select