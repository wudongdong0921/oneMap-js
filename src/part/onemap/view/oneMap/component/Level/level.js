////////////////////////////////////////////////
// 
// 吴东东
// 2020-07-15 13:49:25
// 行政区定位的联动
////////////////////////////////////////////////
var Level = function (option) {
    this.event = {
        levelClick: function () { },
        cityClick: function() {}
    }
    this.option = option
}
Level.prototype.render = function (option) {
    var value = option.value ? option.value : ""
    var text = option.text ? option.text : ""
    //this.initSelect(option, value, text)
    this.init(option, value, text)
}
Level.prototype.init = function (option, value, text) {
    var _this = this
    var html = ""
    for (var i = 0; i < option.data.length; i++) {
        var item = option.data[i];
        html += '<span sign="subarea" data-value="' + item.value + '" data-text="' + item.name + '">' + item.name + '</span>'
    }
    option.els.html(html)
    option.els.on('click', 'span', function () {
        var value = $(this).attr('data-value')
        var text = $(this).attr('data-text')
        _this.event.cityClick(text, value)
    })

}
Level.prototype.forLevel = function(option,type,html) {
    for (var i = 0; i < option.data.length; i++) {
        var item = option.data[i];
        if (item.value.length == type && item.value.indexOf(option.value) == 0) {
            html += '<span sign="subarea" data-value="' + item.value + '" data-text="' + item.name + '">' + item.name + '</span>'
        }
    }
    return html
}
Level.prototype.oNlevelClick = function (event) {
    this.event.levelClick = event
}
Level.prototype.oNcityClick = function (event) {
    this.event.cityClick = event
}
export default Level