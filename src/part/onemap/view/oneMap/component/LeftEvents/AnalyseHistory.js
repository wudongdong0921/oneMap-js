

var AnalyseHistoryIndex = 0;

var AnalyseHistoryData = [
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
    { title: '专题分析' + ++AnalyseHistoryIndex, date: '2020-08-01 08:25', },
];


var AnalyseHistoryItem = function (data, parent) {
    this.parent = parent;
    this.data = data;
    this.html = $('<div class="OneMap_AnalyseHistory_Item"></div>');
    this.icon = $('<div class="OneMap_AnalyseHistory_Icon"></div>').appendTo(this.html);
    this.title = $('<div class="OneMap_AnalyseHistory_Title"></div>').text(data.title).appendTo(this.html);
    this.des = $('<div class="OneMap_AnalyseHistory_Des" title="' + data.date + '"></div>').text(data.date).appendTo(this.html);
    this.html.click(() => {
        this.parent._Analyse.show(data);
    });
};


var AnalyseHistory = function (_Map, _MapSymbol, _Analyse) {
    this._Analyse = _Analyse;
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.Content = $('<div class="OneMap_AnalyseHistory_content"></div>').appendTo(this.html);
    this.children = [];
};

AnalyseHistory.prototype.render = function () {
    return this.html
};
AnalyseHistory.prototype.getList = function () {
    for (let i = 0; i < AnalyseHistoryData.length; i++) {
        const element = AnalyseHistoryData[i];
        var _item = new AnalyseHistoryItem(element, this);
        this.Content.append(_item.html);
        this.children.push(_item);
    };
};
export default AnalyseHistory;