var Analyse = function () {
    this.html = $('<div class="OneMap_Analyse OneMap_dialog hide"></div>');
    this.title = $('<div class="OneMap_dialog_title">图例</div>').appendTo(this.html);
    this.close = $('<div class="OneMap_dialog_close"><i class="fa fa-times" aria-hidden="true"></i></div>').appendTo(this.title);
    this.body = $('<div class="OneMap_dialog_body"></div>').appendTo(this.html);
    this.close.click(() => {
        this.hide();
    });
};

Analyse.prototype.renderData = function (data) {
    this.body.text(data.id);
};

Analyse.prototype.show = function (data) {
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
