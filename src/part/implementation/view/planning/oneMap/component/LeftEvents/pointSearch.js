var pointIndex = 0;
var pointData = [
    { name: '测试地点测试地点测试地点测试地点测试地点测试地点测试地点测试地点测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
    { name: '测试地点' + ++pointIndex, },
];

var pointItem = function (data, event) {
    var html = $('<div class="OneMap_Search_Point_Item"><i class="fa fa-map-marker" aria-hidden="true"></i><span>' + data.name + '</span></div>');
    html.click(() => {
        event(data);
    });
    return html;
};

var HistoryItem = function (name, event) {
    var html = $('<div class="OneMap_Search_History_Item"><i class="fa fa-history" aria-hidden="true"></i><span>' + name + '</span></div>');
    html.click(() => {
        event(name);
    });
    return html;
};

var pointSearch = function () {
    this.html = $('<div class="OneMap_Search_Content_Point"></div>');
    this.inputBox = $('<div class="OneMap_Search_Content_Point_input"></div>').appendTo(this.html);
    this.inputElementBox = $('<div class="OneMap_Search_Content_Point_inputElementBox"></div>').appendTo(this.inputBox);
    this.inputElement = $('<input type="text" class="OneMap_Search_Content_Point_inputEle" placeholder="请输入地名地址" />').appendTo(this.inputElementBox);
    this.inputElementClearButton = $('<div class="OneMap_Search_Content_Point_inputEle_clear"><i class="fa fa-close" aria-hidden="true"></i></div>').appendTo(this.inputElementBox);
    this.inputElementClearButton.hide();
    this.inputButton = $('<div class="OneMap_Search_Content_Point_input_button"><i class="fa fa-search" aria-hidden="true"></i></div>').appendTo(this.inputBox);
    this.content = $('<div class="OneMap_Search_Content_Point_Content"></div>').appendTo(this.html);
    this.History = $('<div class="OneMap_Search_Content_Point_History"></div>').appendTo(this.content);
    this.searchContent = $('<div class="OneMap_Search_Content_Point_Search_Content"></div>').appendTo(this.content);
    this.searchContent.hide();

    this.SearchValue = '';
    this.pointSearchLoading = icu.loading(this.html);
    this.inputElement.on('input', () => {
        this.SearchValue = this.inputElement.val();
        if (this.SearchValue) {
            this.inputElementClearButton.show();
        } else {
            this.inputElementClearButton.hide();
        };
    });
    this.inputElementClearButton.click(() => {
        this.SearchValue = '';
        this.inputElement.val('');
        this.inputElementClearButton.hide();
        this.searchContent.hide();
        this.History.show();
        this.renderHistory();
    });
    this.renderHistory();
    this.inputButton.click(() => {
        this.search();
    });
};

pointSearch.prototype.addHistory = function (data) {
    var OneMap_History = icu.storage.get('OneMap_History_Point');
    if (!OneMap_History) {
        OneMap_History = [];
    };
    if (!data.trim()) {
        return;
    };
    if (OneMap_History.indexOf(data) != -1) {
        return;
    };
    OneMap_History.splice(0, 0, data);
    if (OneMap_History.length > 10) {
        OneMap_History.pop();
    };
    icu.storage.set('OneMap_History_Point', OneMap_History);
};

pointSearch.prototype.renderHistory = function () {
    var OneMap_History = icu.storage.get('OneMap_History_Point');
    if (!OneMap_History) {
        OneMap_History = [];
    };
    var title = $('<span>历史搜索结果<br><br></span>');
    this.History.empty();
    this.History.append(title);
    for (let i = 0; i < OneMap_History.length; i++) {
        const element = OneMap_History[i];
        var item = HistoryItem(element, (name) => {
            this.SearchValue = name;
            this.inputElement.val(name);
            this.search();
        });
        this.History.append(item);
    };
    if (OneMap_History.length) {
        var clearButton = $('<div class="OneMap_LeftBar_clearButton"><i class="fa fa-trash-o" aria-hidden="true"></i></div>').appendTo(this.History);
        clearButton.click(() => {
            icu.alert.delete({
                text: '是否删除历史搜索记录？',
                callback: (success) => {
                    icu.storage.set('OneMap_History_Point', []);
                    success();
                    this.renderHistory();
                }
            });
        });
    };
};

pointSearch.prototype.search = function () {
    if (!this.SearchValue) {
        icu.alert.warning({
            text: '请输入任意关键字',
        });
        return;
    };
    this.searchContent.empty();
    this.pointSearchLoading.show();
    this.inputElementClearButton.show();
    this.addHistory(this.SearchValue);
    setTimeout(() => {
        this.searchContent.show();
        this.History.hide();
        this.pointSearchLoading.hide();
        for (let i = 0; i < pointData.length; i++) {
            const element = pointData[i];
            var item = pointItem(element, (name) => {
            });
            this.searchContent.append(item);
        };
    }, 1000);
};

export default pointSearch;