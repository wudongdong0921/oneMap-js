var linkageItem = function (data, parent) {
    this.parent = parent;
    this.data = data;
    this.html = $('<div class="form_radio_Item"></div>');
    this.label = $('<label class="form_radio_choose"><i class="fa fa-circle-o"></i></label>').appendTo(this.html);
    this.name = $('<div class="form_radio_name">' + this.data.dictLabel + '</div>').appendTo(this.html);
    this.icon = $('<i class="fa fa-angle-right"></i>').appendTo(this.html);
    this.value = false;
    this.event = {
        select: function () { },
        click: function () { }
    };
    if (!this.data.children.length) {
        this.icon.hide();
    };

    this.label.click(() => {
        if (!this.value) {
            this.event.select(this);
            this.select();
        };
    });
    // 2021-05-27 陈薪名 修改bug HNXGTKJ-1534
    this.icon.click(() => {
        if (this.data.children.length) {
            this.event.click(this);
            this.choose();
        };
    });
    this.name.click(() => {
        if (this.data.children.length) {
            this.event.click(this);
            this.choose();
        };
    })
};
linkageItem.prototype.onSelect = function (e) {
    this.event.select = e;
};
linkageItem.prototype.onClick = function (e) {
    this.event.click = e;
};
linkageItem.prototype.select = function () {
    this.value = true;
    this.html.addClass('select');
    this.label.find('i').removeClass('fa-circle-o').addClass('fa-dot-circle-o');
};
linkageItem.prototype.unSelect = function () {
    this.value = false;
    this.html.removeClass('select');
    this.label.find('i').removeClass('fa-dot-circle-o').addClass('fa-circle-o');
};
linkageItem.prototype.choose = function () {
    this.html.addClass('choose');
};
linkageItem.prototype.unChoose = function () {
    this.html.removeClass('choose');
};
linkageItem.prototype.active = function () {
    this.html.addClass('active');
};
linkageItem.prototype.unActive = function () {
    this.html.removeClass('active');
};

var linkageItemLayout = function (parent) {

    this.parent = parent;
    this.html = $('<div class="linkageItem_layout"></div>');
    this.children = [];
    this.event = {
        select: function () { },
        click: function () { }
    }
};
linkageItemLayout.prototype.onSelect = function (e) {
    this.event.select = e;
};
linkageItemLayout.prototype.onClick = function (e) {
    this.event.click = e;
};
linkageItemLayout.prototype.setChildren = function (data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var _item = new linkageItem(element, this);
        _item.onSelect((event) => {
            this.event.select(event);
        });
        _item.onClick((event) => {
            this.event.click(event);
        });
        this.children.push(_item);
        this.html.append(_item.html);
        if (this.parent.activeObject && this.parent.activeObject.data.id == element.id) {
            this.parent.activeObject = _item;
            _item.select();
        };
        if (this.parent.activeArray.length && this.parent.activeArray[0] && this.parent.activeArray[0].id == element.id) {
            _item.active();
        } else {
            _item.unActive();
        };
        if (this.parent.activeArray.length && this.parent.activeArray[1] && this.parent.activeArray[1].id == element.id) {
            _item.active();
        } else {
            _item.unActive();
        };

    }
};



var linkage = function (ele, options) {
    this.html = ele;
    // this.html.css({
    //     'font-size': '13px',
    // })
    var _this = this;
    options = (options ? options : {});
    this.options = $.extend({}, {
        showKey: 'label', // 根据子对象的数据Key值进行显示
        setKey: 'value', // 根据子对象的数据Key值进行赋值
        getKey: 'setKey', // 根据子对象的数据Key值进行取值   
    }, options);
    this.event = {
        change: function () { },
    };
    this.activeObject = null;
    this.chooseObject = null;
    this.showStatus = false;
    this.html.click(function (e) {
        if (!_this.showStatus) {
            _this.showBox(e);
        };
    });
    this.html.hover(
        function(){_this.html.attr("title",_this.getShowValue())},
        function(){//console.log(_this.getShowValue())
        }
    )
    this.children = [];
    this.activeHtml = $('<div class="linkage_layout" style="width:212px; height:212px;z-index: 999;"></div>');
    this.activeHtml.hide();

    setTimeout(() => {
        this.html.after(this.activeHtml);
    }, 20);


    this.valueObject = {};
    this.codeObject = {};
    this.firstArray = [];
    this.activeArray = [];
    this.setData(icu.optionSide.get('XZQY'));
    this.userPermissionArrayCache = [];
};
linkage.prototype.showBox = function (e) {
    this.showStatus = true;
    var _this = this;
    this.activeHtml.show();
    var documentClick = function () {
        _this.showStatus = false;
        _this.activeHtml.hide();
        $(document).unbind('click', documentClick);
    };
    setTimeout(() => {
        $(document).unbind('click', documentClick).bind('click', documentClick);
    }, 10);

};
linkage.prototype.activeChildrenItem = function (data, index) {
    var activeData = null;
    var parentData = this.valueObject[data.pid];
    for (let i = 0; i < this.children[index].children.length; i++) {
        const element = this.children[index].children[i];
        if (element.data.id == parentData.id) {
            activeData = parentData;
            element.active();
        } else {
            element.unActive();
        }
    };
    return activeData
};
linkage.prototype.setActive = function (data, index) {
    this.activeArray = [];
    if (index == 0) {
        return;
    } else if (index == 1) {
        for (let i = 0; i < this.children[1].children.length; i++) {
            const element = this.children[1].children[i];
            element.unActive();
        };
        var activeData = this.activeChildrenItem(data, 0);
        this.activeArray.push(activeData);

    } else if (index == 2) {
        var activeData = this.activeChildrenItem(this.valueObject[data.pid], 0);
        this.activeArray.push(activeData);
        var activeDataChild = this.activeChildrenItem(data, 1);
        this.activeArray.push(activeDataChild);
    };
};
linkage.prototype.addChildrenBox = function (data) {
    this.activeHtml.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    var _length = this.children.length;
    var items = new linkageItemLayout(this);
    items.onSelect((event) => {
        if (this.activeObject) {
            this.activeObject.unSelect();
        };
        this.activeObject = event;
        this.event.change(event.data);
        this.setActive(event.data, _length);
    });
    items.onClick((event) => {
        if (this.chooseObject) {
            this.chooseObject.unChoose();
        };
        this.chooseObject = event;
        var deleteIndex = null;
        for (let i = 0; i < this.children.length; i++) {
            const element = this.children[i];
            if (element === items) {
                deleteIndex = i;
            } else if (deleteIndex != null) {
                element.html.remove();
            };
        };
        this.children.splice(deleteIndex + 1, this.children.length - 1);
        this.addChildrenBox(event.data.children);
    });
    items.setChildren(data);
    this.children.push(items);
    this.activeHtml.append(items.html);
    var width = this.children.length * 212;
    this.activeHtml.css({
        width: width + 'px'
    });
    if (document.body.offsetWidth < this.html.offset().left + width) {
        this.activeHtml.css({
            top: this.html.offset().top + this.html.outerHeight(true) + 'px',
            left: 'auto',
            right: '10px'
        });
    } else {
        this.activeHtml.css({
            top: '',
            left: '',
            right: 'auto'
        });
    };

    if (!this.activeObject) {
        items.children[0].label.click();
        // this.event.change(items.children[0].data);
    };
};

linkage.prototype.onChange = function (event) {
    this.event.change = event
};

linkage.prototype.setData = function (data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.valueObject[element.id] = element;
        this.codeObject[element.dictValue] = element;
    };
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (this.valueObject[element.pid]) {
            var parent = this.valueObject[element.pid];
            if (!parent.hasOwnProperty('children')) {
                parent.children = [];
            };
            parent.children.push(element);
            element.parent = parent;
        }
    };
};

linkage.prototype.set = function (code) {
    var _first = this.children[0].children;
    var isCheck = false;
    for (let i = 0; i < _first.length; i++) {
        const element = _first[i];
        if (element.data.dictValue == code) {
            element.label.click();
            isCheck = true;
        };
    };
    if (!isCheck) {
        var _parentCode = this.codeObject[code].parent ? this.codeObject[code].parent.dictValue : null;
        var firstCheck = false;
        if (_parentCode) {
            for (let i = 0; i < _first.length; i++) {
                const element = _first[i];
                if (element.data.dictValue == _parentCode) {
                    element.name.click();
                    firstCheck = true;
                };
            };
            if (firstCheck) {
                for (let d = 0; d < this.children[1].children.length; d++) {
                    const element = this.children[1].children[d];
                    if (element.data.dictValue == code) {
                        element.label.click();
                        isCheck = true;
                    };
                };
            } else {
                var __ParentCode = this.codeObject[_parentCode].parent ? this.codeObject[_parentCode].parent.dictValue : null;
                var _firstCheck = false;
                var _secendCheck = false;
                for (let i = 0; i < _first.length; i++) {
                    const element = _first[i];
                    if (element.data.dictValue == __ParentCode) {
                        element.name.click();
                        _firstCheck = true;
                    };
                };
                if (_firstCheck) {
                    for (let d = 0; d < this.children[1].children.length; d++) {
                        const element = this.children[1].children[d];
                        if (element.data.dictValue == _parentCode) {
                            element.name.click();
                            _secendCheck = true;
                        };
                    };
                    if (_secendCheck) {
                        for (let d = 0; d < this.children[2].children.length; d++) {
                            const element = this.children[2].children[d];
                            if (element.data.dictValue == code) {
                                element.label.click();
                                isCheck = true;
                            };
                        };
                    };
                };
            };
        } else {
            console.error('赋值失败 => 行政区划 : ' + code);
        };
    };
};


linkage.prototype.getShowValue = function (string) {
    var _data = [];
    if (this.activeObject) {
        _data.push(this.activeObject.data.dictLabel);
        if (this.activeObject.data.hasOwnProperty('parent')) {
            var parent = this.activeObject.data.parent
            _data.push(parent.dictLabel);

            if (parent.hasOwnProperty('parent')) {
                var _parent = parent.parent;
                _data.push(_parent.dictLabel);
            }
        };
    };
    return _data.reverse().join(string || '-');
};
linkage.prototype.get = function () {
    if (this.activeObject) {
        return this.activeObject.data
    } else {
        return null
    }
};
linkage.prototype.setUserData = function (premissionArray) {
    // 判断是否是省级节点
    var isHaveRootPremission = null;
    var PremissionPidArray = [];
    for (let i = 0; i < premissionArray.length; i++) {
        const element = premissionArray[i];
        if (element) {
            if (this.codeObject[element].pid == 0) {
                // 这个是升级根目录节点
                isHaveRootPremission = element;
            };
            PremissionPidArray.push(this.codeObject[element].dictValue);
        }
    };
    var truePremissionArray = [];
    if (isHaveRootPremission) {
        truePremissionArray.push(isHaveRootPremission);
    } else {
        for (let i = 0; i < premissionArray.length; i++) {
            const element = premissionArray[i];
            if (element) {
                var parent = this.valueObject[this.codeObject[element].pid];
                var parentsDictValue = parent.dictValue;
                if (PremissionPidArray.indexOf(parentsDictValue) == -1) {
                    truePremissionArray.push(element);
                };
            };
        };
    };
    for (let i = 0; i < truePremissionArray.length; i++) {
        const element = truePremissionArray[i];
        this.firstArray.push(this.codeObject[element]);
    };
    this.userPermissionArrayCache = premissionArray;

    if (!this.children.length) {
        setTimeout(() => {
            this.addChildrenBox(this.firstArray);
        }, 30);

    };
};
// 2021-04-06 陈薪名 新增加 linkage重置方法
linkage.prototype.reset = function (ele) {
    this.html = ele;
    var _this = this;
    this.activeObject = null;
    this.chooseObject = null;
    this.showStatus = false;
    this.html.click(function (e) {
        if (!_this.showStatus) {
            _this.showBox(e);
        };
    });
    this.children = [];
    this.activeHtml = $('<div class="linkage_layout" style="width:212px; height:212px;z-index: 999;"></div>');
    this.activeHtml.hide();
    setTimeout(() => {
        this.html.after(this.activeHtml);
    }, 20);
    this.valueObject = {};
    this.codeObject = {};
    this.firstArray = [];
    this.activeArray = [];
    this.setData(icu.optionSide.get('XZQY'));
    this.userPermissionArrayCache = [];

    var userData = icu.session.get("userInfo");
    _this.setUserData(userData.areacodeList);
}
// 2021-05-08 陈薪名 新增方法；根据传值回显下拉框对应选择的名称
linkage.prototype.getShowValueForKey = function (ele, areacodeList) {
    this.html = ele;
    var _this = this;
    this.activeObject = null;
    this.chooseObject = null;
    this.showStatus = false;
    this.html.click(function (e) {
        if (!_this.showStatus) {
            _this.showBox(e);
        };
    });
    this.children = [];
    this.activeHtml = $('<div class="linkage_layout" style="width:212px; height:212px;z-index: 999;"></div>');
    this.activeHtml.hide();
    setTimeout(() => {
        this.html.after(this.activeHtml);
    }, 20);
    this.valueObject = {};
    this.codeObject = {};
    this.firstArray = [];
    this.activeArray = [];
    this.setData(icu.optionSide.get('XZQY'));
    this.userPermissionArrayCache = [];

    _this.setUserData(areacodeList);
};

export default linkage