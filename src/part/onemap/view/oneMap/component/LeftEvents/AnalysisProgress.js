////////////////////////////////////////////////
// 分析进度条
// 吴东东
// 2021-04-07 09:56:38
////////////////////////////////////////////////
var Result = function(data) {
    this.result = $('<div class="result_box"></div>');
    this.timer = $('<span class="result_timer" style="padding-right:10px">[' + data.timer+ ']</span>').appendTo(this.result);
    this.text = $('<span class="result_text">' + data.executingStateCN +'</sapn>').appendTo(this.result);
}
var AnalysisProgress = function(_ToolPopup) {
    this.html = $('<div class="analysis_progress"></div>');
    this.content = $('<div class="analysis_content"></div>').appendTo(this.html);
    this.progress = $('<div class="content_top"></div>').appendTo(this.content);
    this.contentLeft = $('<div class="content_left"></div>').appendTo(this.progress);
    this.timing = $('<div class="analysis_timing">00:00</div>').appendTo(this.contentLeft)
    this.text = $('<div class="analysis_text">正在分析，请稍后...</div>').appendTo(this.contentLeft)
    this.contentRight = $('<div class="content_right analysis-file-wrapper"></div>').appendTo(this.progress);
    //this.viewResult = $('<button class="wdd-btn-analysis wdd-btn-primary wdd-btn-sm">查看结果</button>').appendTo(this.contentRight);
    this.close = $('<button class="wdd-btn-analysis wdd-btn-primary wdd-btn-sm">强行终止</button>').appendTo(this.contentRight);
    this.progress = $('<div class="progress_box"></div>').appendTo(this.progress);
    this.progressBar = $('<div class="progress_bar"></div>').appendTo(this.progress);
    this.contentBottom = $('<div class="content-bottom"></div>').appendTo(this.content);
    this.timers = null
    this._ToolPopup = _ToolPopup
    this.event = {
        stopAnalyStatus: function() {}
    }
    this.close.click(() => {
       this.closeProgress()
       this.event.stopAnalyStatus()
    })
}
AnalysisProgress.prototype.handleStopStatus = function(event) {
    this.event.stopAnalyStatus = event
}
AnalysisProgress.prototype.closeProgress = function() {
    this._ToolPopup.html.hide()
    this.contentBottom.empty()
    this.timing.html('00:00')
    this.progressBar.css({'width':'0'});
    clearInterval(this.timers)
    clearInterval(this.timerOut)
}
AnalysisProgress.prototype.setAnalysisResult = function(data,count,len,timer,result) {
    this.timerOut = timer
    var percent = 0
    var percentNum = 100/len
    // for(let i =0;i<data.length;i++) {
    //     var item = data[i]
    //     var _result = new Result(data)
    //     this.contentBottom.append(_result.result)
    // }
    percentNum = percentNum*count + '%'
    this.progressBar.css({'width':percentNum});
    this.contentBottom.append(result)
    // var _result = new Result(data)
    // this.contentBottom.append(_result.result)
    // this.contentBottom[0].scrollTop = this.contentBottom[0].scrollHeight
}
AnalysisProgress.prototype.openTiming = function() {
    var count = 0
    this.timers = setInterval(() => {
        var h =  parseInt(count / 3600) % 60;
        var m = parseInt(count / 60) % 60;
        var s = parseInt(count % 60);
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        count ++
        this.timing.html(h +':'+ m + ':' +s)
    }, 1000);
}
export default AnalysisProgress