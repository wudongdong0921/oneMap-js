var Year = function(year) {
    var item = ''
item += '<li sign="fx" class="analysisTable">';
//item += '   <img src="../../../../../static/img/map/icon14.png">';
item += '   <span class="assi-title"></span>';
item += '</li>'
var times = ''
times += '<div style="position:relative;left:13px;height:100%">'
times += '  <div style="display:none">年份</div>'
times += '  <div style="position:relative;display:none" class="wdd-year"><input value="'+ year +'"></div>'
times += '  <div style="position:relative;z-index:999;" class="wdd-year-box" id="demoYear"></div>'
times += '  <div style="position:absolute;z-index:9;left:0px;bottom:-12px;right:20px;text-align: center;" class="wdd-year-button wdd-file-wrapper">'
times += '      <button class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="yearClose">取消</button>'
times += '      <button class="wdd-btn wdd-btn-primary wdd-btn-sm" style="width:80px; margin-top:-10px;" id="yearSubmit">确认</button>'
times += '  </div>'
times += '</div>'
this.event = {
    yearSubmit: function() {},
    yearClose: function() {}
}
this.yearHtml = $(times)
this.yearHtml.find('#yearSubmit').click(() => {
    this.event.yearSubmit()
})
this.yearHtml.find('#yearClose').click(() => {
    this.event.yearClose()
})
}
Year.prototype.handleSubmit = function(event) {
    this.event.yearSubmit = event
}
Year.prototype.handleClose = function(event) {
    this.event.yearClose = event
}
export default Year