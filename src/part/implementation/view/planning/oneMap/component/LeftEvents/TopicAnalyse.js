////////////////////////////////////////////////
// 分析列表
// 穆松鹤
// 2020-09-28 09:19:45
////////////////////////////////////////////////
import subMenu from '../LeftBar/subMenu'

var TopicAnalyseItem = function (data, parent) {
    this.parent = parent;
    this.data = data;
    this.html = $('<div class="OneMap_TopicAnalyse_Item"></div>');
    this.icon = $('<div class="OneMap_TopicAnalyse_Icon"></div>').appendTo(this.html);
    this.title = $('<div class="OneMap_TopicAnalyse_Title"></div>').text(data.title).appendTo(this.html);
    this.des = $('<div class="OneMap_TopicAnalyse_Des" title="' + data.des + '"></div>').text(data.des).appendTo(this.html);
    this.html.click(() => {
        this.parent._Analyse.show(data);
    });
};

var TopicAnalyse = function (_Map, _MapSymbol, _Analyse) {
    this._Analyse = _Analyse;
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.subMenu = new subMenu();
    this.html.append(this.subMenu.html);
    this.Content = $('<div class="OneMap_TopicAnalyse_content"></div>').appendTo(this.html);
    this.children = [];
};

TopicAnalyse.prototype.render = function () {
    return this.html
};

TopicAnalyse.prototype.addChild = function (menuData) {
    this.subMenu.setChildren(menuData);
    this.subMenu.onClick((data) => {
        this.children = [];
        this.Content.empty();
        for (let i = 0; i < data.children.length; i++) {
            const element = data.children[i];
            var _item = new TopicAnalyseItem(element, this);
            this.Content.append(_item.html);
            this.children.push(_item);
        };
    });
};




export default TopicAnalyse;