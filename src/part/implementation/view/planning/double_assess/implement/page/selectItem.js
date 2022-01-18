var SelectItem = function (params) {
    var _this = this;
    this._allOption = $.extend({}, params);
    this.event = {
        clickItem: function () { }
    }
    this._html = $('<div class="selectMore">' +
        '    <div class="selectInptu" id="selectInptu"></div>' +
        '    <div id="selectList" class="selectList"></div>' +
        '</div>');
    this._electInput = $('<input type="text" id="searchTree" name="title" required lay-verify="required" placeholder="请输入关键字" autocomplete="off" class="layui-input">')
    this._html.find('#selectInptu').append(this._electInput);
    // this.itemHmtl = $('<div class="divItem" ></div>');
    this._electInput.on('input', function (value) {
        var _value = $(this).val();
        _this.reset(_value)
    })
}

SelectItem.prototype.reset = function (value) {
    var _this = this;
    var arr = [];
    if (_this.AllData.length !== 0) {
        if (value == "") {
            arr = _this.AllData
        } else {
            for (let j = 0; j < _this.AllData.length; j++) {
                const element = _this.AllData[j];
                //如果字符串中不包含目标字符会返回-1
                if (element.title.indexOf(value) !== -1) {
                    arr.push(element);
                }
            }
        }
    }
    _this._html.find('#selectList').empty()
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        var itemHmtl = $('<div class="divItem" >' + element.title + '</div>');
        _this._html.find('#selectList').append(itemHmtl);
        itemHmtl.bind('click', function (el) {
            $('.divItem').removeClass('active');
            $(this).addClass('active');
            _this.event.clickItem(element);
        });
    }
    return _this._html
}

SelectItem.prototype.setData = function (data) {
    var _this = this;
    this._electInput.val('')
    _this._html.find('#selectList').empty()
    var cbData = _this.handelListData(data, this._allOption.contrastKey)
    for (let i = 0; i < cbData.length; i++) {
        const element = cbData[i];
        var itemHmtl = $('<div class="divItem" >' + element.title + '</div>');
        _this._html.find('#selectList').append(itemHmtl);
        itemHmtl.bind('click', function (el) {
            $('.divItem').removeClass('active');
            $(this).addClass('active');
            _this.event.clickItem(element);
        });
    } 
    return _this._html
}

SelectItem.prototype.render = function (params) {
    var _this = this;
    return this._html;
}
SelectItem.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};

SelectItem.prototype.handelListData = function (data, optionKey, cb) {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        for (let j = 0; j < optionKey.length; j++) {
            const element = optionKey[j];
            item[element.value] = item[element.key];
        }
    }
    this.AllData = data;
    return data
}
export default SelectItem;