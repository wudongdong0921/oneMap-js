var item = function (data, parent, activeEvent) {
    var _this = this;
    this.data = data;
    this.activeEvent = activeEvent;
    this.parent = parent;
    // this.html = $(
    //     '<div class="radioItem layui-unselect layui-form-radio" title="' + data.flowname + '">' +
    //     '    <i class="layui-anim layui-icon"></i>' +
    //     '    <div class="name">' + data.flowname + '</div>' +
    //     '</div>');
    this.html = $('<div class="list-childs-item radioItem layui-unselect layui-form-checkbox" lay-skin="primary"  title="' + data.flowname + '">' +
        '    <span>' + data.flowname + '</span>' +
        '    <i class="layui-icon"></i>' +
        '</div>');

    this.status = false;
    this.active();
    this.html.click(function () {
        _this.change();
    });

    this.unActive();

};
item.prototype.active = function () {
    this.status = true;
    this.html.addClass('layui-form-checked');
    this.html.find('.layui-icon').addClass('layui-icon-ok');
    this.activeEvent(this.data, this.status);
    // this.html.find('.layui-anim').text('');
};
item.prototype.unActive = function () {
    this.status = false;
    this.html.removeClass('layui-form-checked');
    this.html.find('.layui-icon').removeClass('layui-icon-ok');
    this.activeEvent(this.data, this.status);
    // this.html.find('.layui-anim').text('');
};
item.prototype.change = function () {
    if (this.status) {
        this.unActive();
    } else {
        this.active();
    };
    this.parent.ClickEvent(this.status);
};


var listParent = function (data, name, renderItemEvent, activeEvent) {
    var _this = this;
    this.data = data;
    this.items = {};
    this.renderItemEvent = renderItemEvent;
    this.activeEvent = activeEvent;
    this.status = true;

    this.html = $('<div class="list-item">' +
        '    <div class="list-title" title="' + name + '">' +
        '        <i class="fa fa-angle-down icons" aria-hidden="true"></i>' +
        '        <div class="list-childs-item layui-unselect layui-form-checkbox layui-form-checked" lay-skin="primary">' +
        '           <i class="layui-icon layui-icon-ok"></i>' +
        '        </div>' +
        '        <span>' + name + '</span>' +
        '    </div>' +
        '    <div class="list-childs"></div>' +
        '</div>');
    this.title = this.html.find('.list-title');
    this.box = this.html.find('.list-childs');


    this.html.find('.list-title .layui-unselect').click(function (e) {
        e.stopPropagation();
        if (_this.status) {
            _this.unActive();           
        } else {
            _this.active();           
        };
    });

    this.title.click(function () {
        if (_this.box.css('display') == 'none') {
            _this.html.find('.icons').removeClass('fa-angle-right').addClass('fa-angle-down')
            _this.box.slideDown();
        } else {
            _this.box.slideUp();
            _this.html.find('.icons').removeClass('fa-angle-down').addClass('fa-angle-right')
        }
    });
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.addItem(element);
    };
    this.unActive();

};
listParent.prototype.ClickEvent = function () {
    var ans = this.checkAllChide();
    if (this.status && !ans) {
        this.status = false;
        this.html.find('.list-title .layui-unselect').removeClass('layui-form-checked');
        this.html.find('.list-title .layui-unselect .layui-icon').removeClass('layui-icon-ok');
    } else if (!this.status && ans) {
        this.status = true;
        this.html.find('.list-title .layui-unselect').addClass('layui-form-checked');
        this.html.find('.list-title .layui-unselect .layui-icon').addClass('layui-icon-ok');
    };
}


listParent.prototype.active = function () {
    this.status = true;
    this.html.find('.list-title .layui-unselect').addClass('layui-form-checked');
    this.html.find('.list-title .layui-unselect .layui-icon').addClass('layui-icon-ok');
    this.allChildShow();
};
listParent.prototype.unActive = function () {
    this.status = false;
    this.html.find('.list-title .layui-unselect').removeClass('layui-form-checked');
    this.html.find('.list-title .layui-unselect .layui-icon').removeClass('layui-icon-ok');
    this.allChildHide();
};

listParent.prototype.allChildShow = function () {
    for (const key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            const element = this.items[key];
            element.active();
        }
    }
};
listParent.prototype.allChildHide = function () {
    for (const key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            const element = this.items[key];
            element.unActive();
        }
    }
};

listParent.prototype.checkAllChide = function () {
    var allCkeck = true;
    for (const key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            const element = this.items[key];
            if (!element.status) {
                allCkeck = false;
                break;
            };
        }
    };
    return allCkeck
};

listParent.prototype.addItem = function (data) {
    var itemObj = new item(data, this, this.activeEvent);
    this.items[data.flowid] = itemObj;
    this.box.append(itemObj.html);
    this.renderItemEvent(itemObj.data);
    // this.event.renderItem(itemObj.data);
};

var listELe = function (option) {
    this.ele = option;
    // this.data = option.data;
    this.items = [];
    this.activeObj = null;
    this.event = {
        active: function () { },
        renderItem: function () { }
    };
};
listELe.prototype.onRenderItem = function (event) {
    this.event.renderItem = event;
};
listELe.prototype.onActive = function (event) {
    this.event.active = event;
};
listELe.prototype.active = function (item) {
    if (item === this.activeObj) {
        item.unActive();
        this.activeObj = null;
        this.event.active(null);
        return;
    };
    if (this.activeObj) {
        this.activeObj.unActive();
    };
    item.active();
    this.event.active(item.data);
    this.activeObj = item;
};

listELe.prototype.setData = function (nameArray, data) {
    this.ele.empty();
    for (let i = 0; i < nameArray.length; i++) {
        const name = nameArray[i];
        var list = new listParent(data[name], name, this.event.renderItem, this.event.active);
        this.ele.append(list.html);
    };
};

export default listELe;