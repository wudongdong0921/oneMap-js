////////////////////////////////////////////////
// 图例显示
// 吴野
// 2021-01-22 20:34:55
////////////////////////////////////////////////
import AnalyzeResult from './analyzeResult';
import Result from './analyzeResult'
var Analyse = function (option) {
    this.options = option
    this.html = $('<div class="OneMap_Analyse OneMap_dialog hide showhide"></div>');
    this.title = $('<div class="OneMap_dialog_title">资源环境承载能力</div>').appendTo(this.html);
    this.close = $('<div class="OneMap_dialog_close"><i class="fa fa-times" aria-hidden="true"></i></div>').appendTo(this.title);
    this.body = $('<div class="OneMap_dialog_body"><div id="analyzeResult"></div></div>').appendTo(this.html);
    this.close.click(() => {
        this.hide();
    });
};
var whitchView

Analyse.prototype.renderData = function (data) {
    // this.body.text(data.id);
    whitchView = data;
    var analyzeResultView = new Result(data,this.options.view,this.xzqhCodes,this.syxIds,this.options.__OneMap);
    this.html.find('#analyzeResult').append(analyzeResultView.render())
};

Analyse.prototype.isShow = function (params) {
    if (!this.html.hasClass('hide')) {
        this.html.hide();
        setTimeout(() => {
            this.html.addClass('hide');
        }, 10);
    };
}

Analyse.prototype.show = function (data,xzqhCode,syxId) {
    this.xzqhCodes = xzqhCode
    this.syxIds = syxId
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
    // if (type) {
    //     this.html.css('left', '350px');
    // } else {
    //     this.html.css('left', '50px');
    // };
};

Analyse.prototype.changeRightView = function (type) {
    //type暂时没用
    if (type) {
        if(whitchView.openStatisticalChart == 0 && whitchView.openStatisticsTree == 1){
            $('#analyze_list').css("width",'80%');
        }
        if(whitchView.openStatisticalChart == 1 && whitchView.openStatisticsTree == 0){
            $('#analyze_list').css("width",'65%');
        }
        if(whitchView.openStatisticalChart == 0 && whitchView.openStatisticsTree == 0){
            $('#analyze_list').css("width",'100%');
        }
        
    } else {
        if(whitchView.openStatisticalChart == 0 && whitchView.openStatisticsTree == 1){
            $('#analyze_list').css("width",'80%');
        }
        if(whitchView.openStatisticalChart == 1 && whitchView.openStatisticsTree == 0){
            $('#analyze_list').css("width",'65%');
        }
        if(whitchView.openStatisticalChart == 0 && whitchView.openStatisticsTree == 0){
            $('#analyze_list').css("width",'100%');
        }
    };
};

export default Analyse;
