var pointIndex = 0;
var pointData = [
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
    { name: 'XXXX项目' + ++pointIndex, },
];

var pointItem = function (data, event) {
    var html = $('<div class="OneMap_Search_Point_Item"><i class="fa fa-file-archive-o" aria-hidden="true"></i><span>' + data.name + '</span></div>');
    html.click(() => {
        event(data);
    });
    return html;
};

var HistoryItem = function (data, event) {
    data = JSON.parse(data);
    var html = $('<div class="OneMap_Search_History_Item"><i class="fa fa-history" aria-hidden="true"></i>' +
        '<span class="OneMap_Search_History_Type">' + data.type.label + '</span>' +
        '<span class="OneMap_Search_History_Name">' + data.text + '</span>' +
        '</div>');
    html.click(() => {
        event(data);
    });
    return html;
};

var customSearch = function () {
    this.html = $('<div class="OneMap_Search_Content_Custom"></div>');
    this.SelectBox = $('<div class="OneMap_Search_Content_Point_input"></div>').appendTo(this.html);
    this.SelectElementBox = $('<div class="OneMap_Search_Content_Point_inputElementBox"></div>').appendTo(this.SelectBox);
    this.SearchButton = $('<div class="OneMap_Search_Content_Point_input_button"><i class="fa fa-search" aria-hidden="true"></i></div>').appendTo(this.SelectBox);
    this.content = $('<div class="OneMap_Search_Content_Point_Content"></div>').appendTo(this.html);
    this.History = $('<div class="OneMap_Search_Content_Point_History"></div>').appendTo(this.content);
    this.searchContent = $('<div class="OneMap_Search_Content_Point_Search_Content"></div>').appendTo(this.content);
    this.inputElementBox = $('<div class="OneMap_Search_Content_Point_inputElementBox_sub"></div>').appendTo(this.SelectBox);
    this.inputElement = $('<input type="text" class="OneMap_Search_Content_Point_inputEle" placeholder="请输入地名地址" />').appendTo(this.inputElementBox);
    this.inputElementBox.append('<i class="fa fa-map-marker" aria-hidden="true"></i>');

    this.ClearButton = $('<i class="fa fa-trash-o" aria-hidden="true"></i>').appendTo(this.inputElementBox);

    this.ClearButton.click(()=>{
        this.clear();
    });

    this.customSearchLoading = icu.loading(this.html);
    this.SearchValue = '';
    this.SearchType = '';
    this.inputElement.on('input', () => {
        this.SearchValue = this.inputElement.val();
    });
    this.SelectElement = new icu.formElement.select({
        errorStyle: 'form-error-none',
        data: [
            { label: '建设XXX', value: 'asd', },
            { label: '建设XXX1', value: 'asd1', },
            { label: '建设XXX2', value: 'asd2', },
            { label: '建设XXX3', value: 'asd3', },
        ],
        getKey: 'object',
        verify: {  // 验证
            text: '搜索类别',
            rules: ['notNull']
        },
        onChange: (value) => {
            this.SearchType = value;
        },
    });
    this.SelectElementBox.append(this.SelectElement.html);
    this.SearchButton.click(() => {
        this.SelectElement.get((errorMessage, value) => {
            if (errorMessage) {
                icu.alert.warning({
                    text: errorMessage,
                });
            } else {
                this.search();
            };
        });
    });
    this.renderHistory();

};

customSearch.prototype.clear = function () {
    this.inputElement.val('');
    this.SelectElement.clear();
    this.searchContent.hide();
    this.History.show();
    this.renderHistory();
};


customSearch.prototype.addHistory = function (data) {
    var OneMap_History = icu.storage.get('OneMap_History_Custom');
    if (!OneMap_History) {
        OneMap_History = [];
    };

    if (!data.text.trim()) {
        return;
    };

    var _String = JSON.stringify(data);
    if (OneMap_History.indexOf(_String) != -1) {
        return;
    };

    OneMap_History.splice(0, 0, _String);

    if (OneMap_History.length > 10) {
        OneMap_History.pop();
    };
    icu.storage.set('OneMap_History_Custom', OneMap_History);
};

customSearch.prototype.renderHistory = function () {
    var OneMap_History = icu.storage.get('OneMap_History_Custom');
    if (!OneMap_History) {
        OneMap_History = [];
    };
    var title = $('<span>历史搜索结果<br><br></span>');
    this.History.empty();
    this.History.append(title);
    for (let i = 0; i < OneMap_History.length; i++) {
        const element = OneMap_History[i];
        var item = HistoryItem(element, (data) => {
            this.SearchValue = data.text;
            this.inputElement.val(data.text);
            this.SelectElement.set(data.type.value);
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
                    icu.storage.set('OneMap_History_Custom', []);
                    success();
                    this.renderHistory();
                }
            });
        });
    };
};

customSearch.prototype.search = function () {
    if (!this.SearchValue) {
        icu.alert.warning({
            text: '请输入任意关键字',
        });
        return;
    };
    this.searchContent.empty();
    this.customSearchLoading.show();
    // this.inputElementClearButton.show();
    this.addHistory({
        text: this.SearchValue,
        type: this.SearchType,
    });
    setTimeout(() => {
        this.searchContent.show();
        this.History.hide();
        this.customSearchLoading.hide();
        for (let i = 0; i < pointData.length; i++) {
            const element = pointData[i];
            var item = pointItem(element, (name) => {
            });
            this.searchContent.append(item);
        };
    }, 1000);
};

export default customSearch;