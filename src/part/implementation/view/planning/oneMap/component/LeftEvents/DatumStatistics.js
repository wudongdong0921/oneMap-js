

var StatisticIndex = 0;

var StatisticData = [
    { title: '土地用途统计土地用途统计土地用途统计' + ++StatisticIndex },
    { title: '土地用途统计土地用途统计' + ++StatisticIndex },
    { title: '土地用途统计途统计' + ++StatisticIndex },
    { title: '土地用途统计' + ++StatisticIndex },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
    { title: '土地用途统计' },
];

var StatisticItem = function (data, parent) {
    this.parent = parent;
    this.data = data;
    this.html = $('<div class="OneMap_Statistic_Item"></div>');
    this.icon = $('<div class="OneMap_Statistic_Icon"></div>').appendTo(this.html);
    this.title = $('<div class="OneMap_Statistic_Title"></div>').text(data.title).appendTo(this.html);

    if (data.title.length <= 6) {
        this.title.css({
            'line-height': '38px'
        });
    };

    this.html.click(() => {
        this.parent._Analyse.show(data);
    });
};

var DatumStatistics = function (_Map, _MapSymbol, _Analyse) {
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.Content = $('<div class="OneMap_DatumStatistics_content"></div>').appendTo(this.html);
    this.children = [];
};

DatumStatistics.prototype.render = function () {
    return this.html
};

DatumStatistics.prototype.getList = function () {
    this.children = [];
    this.Content.empty();
    for (let i = 0; i < StatisticData.length; i++) {
        const element = StatisticData[i];
        var _item = new StatisticItem(element, this);
        this.Content.append(_item.html);
        this.children.push(_item);
    };

    this.Content.append('<div style="width:100%; clear:both; height:1px">&nbsp;</div>');

};

export default DatumStatistics;