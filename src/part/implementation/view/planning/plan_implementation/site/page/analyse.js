////////////////////////////////////////////////
// 图例展示
// 吴野
// 2021-01-23 13:03:27
////////////////////////////////////////////////
import Result from './analyzeResult'
var Analyse = function (view) {
    this.views = view
    this.html = $('<div class="OneMap_Analyse OneMap_dialog hide"></div>');
    this.title = $('<div class="OneMap_dialog_title">辅助选址</div>').appendTo(this.html);
    this.close = $('<div class="OneMap_dialog_close"><i class="fa fa-times" aria-hidden="true"></i></div>').appendTo(this.title);
    this.body = $('<div class="OneMap_dialog_body"><div id="analyzeResult"></div></div>').appendTo(this.html);
    this.close.click(() => {
        this.hide();
    });
};

Analyse.prototype.renderData = function (data) {
    this.html.find('#analyzeResult').empty()
    var analyzeResultView = new Result(this.views, data, {}, this._suitabillityMain);
    this.html.find('#analyzeResult').append(analyzeResultView.render())
};

Analyse.prototype.reset = function (data, backData, that) {
    this.html.find('#analyzeResult').empty()
    var _suitabillityMains = that ? that : this._suitabillityMain
    var analyzeResultView = new Result(this.views, data, backData, _suitabillityMains);
    this.html.find('#analyzeResult').append(analyzeResultView.render())
};

Analyse.prototype.show = function (data, suitabillityMain) {
    this._suitabillityMain = suitabillityMain
    if (this.html.hasClass('hide')) {
        this.html.show();
        setTimeout(() => {
            this.html.removeClass('hide');
        }, 10);
    };
    this.renderData(data);
};
Analyse.prototype.hide = function () {
    this.html.addClass('hide');
    setTimeout(() => {
        this.html.hide();
    }, 320);
};
Analyse.prototype.changeLeftView = function (type) {
    if (type) {
        this.html.css('left', '350px');
    } else {
        this.html.css('left', '50px');
    };
};

Analyse.prototype.changeRightView = function (type) {
    if (type) {
        this.html.css('right', '260px');
    } else {
        this.html.css('right', '0px');
    };
};




export default Analyse;
