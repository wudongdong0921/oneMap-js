var SymboData = [
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
    { name: '图例1', color: '#f60' },
];


var MapSymbol = function () {
    this.html = $('<div class="OneMap_MapSymbol OneMap_dialog hide"></div>');
    this.title = $('<div class="OneMap_dialog_title">图例</div>').appendTo(this.html);
    this.close = $('<div class="OneMap_dialog_close"><i class="fa fa-times" aria-hidden="true"></i></div>').appendTo(this.title);
    this.body = $('<div class="OneMap_dialog_body"></div>').appendTo(this.html);
    this.content = $('<div class="OneMap_MapSymbol_content"></div>').appendTo(this.body);
    this.SymbolTitle = $('<div class="OneMap_MapSymbol_SymbolTitle"></div>').appendTo(this.content);
    this.SymbolContent = $('<div class="OneMap_MapSymbol_SymbolContent"></div>').appendTo(this.content);
    this.close.click(() => {
        this.hide();
    });
    this.loading = icu.loading(this.content);
    this.data = null;

    this.event = {
        changeView: function () { },
    };

};

MapSymbol.prototype.renderData = function (data) {
    if (this.data === null || data.id != this.data.id) {
        this.data = data;
        this.SymbolTitle.text('');
        this.SymbolContent.empty();
        this.loading.show();
        setTimeout(() => {
            this.loading.hide();
            this.SymbolTitle.text(data.name);
            for (let i = 0; i < SymboData.length; i++) {
                const element = SymboData[i];
                this.SymbolContent.append('<div class="OneMap_SymbolItem" title="' + element.name + '"><span class="OneMap_SymbolImage" style="background:' + element.color + '"></span><span class="OneMap_SymbolText">' + element.name + '</span></div>');
            };
        }, 1000);
    };
};

MapSymbol.prototype.show = function (data) {
    if (this.html.hasClass('hide')) {
        this.html.show();
        setTimeout(() => {
            this.html.removeClass('hide');
        }, 10);
    };
    this.renderData(data);
    this.event.changeView(true);
};
MapSymbol.prototype.hide = function () {
    this.html.addClass('hide');
    setTimeout(() => {
        this.html.hide();
    }, 320);
    this.event.changeView(false);
};
MapSymbol.prototype.checkHide = function (data) {
    if (this.data && data.id == this.data.id) {
        this.hide();
    };
};
MapSymbol.prototype.onChangeView = function (e) {
    this.event.changeView = e;
};


export default MapSymbol;