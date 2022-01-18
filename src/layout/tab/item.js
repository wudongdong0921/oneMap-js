import openRightMenu from './menu'

// 标签主渲染单元
var tabItem = function (router) {

    // 缓存参数
    // 路由参数
    this.router = router.route;

    this.key = router.path;

    this.event = {
        active: function () { },
        close: function () { },
    };

    // tab的元素对象
    this.tab = $('<div class="layout-tab-item"></div>');

    // tab的装饰条
    this.bar = $('<div class="bar"></div>').appendTo(this.tab);

    // tab的名称元素
    this.tab.append('<span>' + router.route.title + '</span>');

    // tab 的关闭按钮
    this.close = $('<i class="fa fa-close" aria-hidden="true"></i>').appendTo(this.tab);

    // tab点击事件
    this.tab.click(() => {
        this.event.active(this);
    });

    this.tab.mousedown((e) => {
        e.stopPropagation();
        if (e.which == 2) {
            this.event.close(this, 'self');
        };
        return false;
    });

    this.tab.bind("contextmenu", (e) => {
        openRightMenu(e, this);
        return false;
    });

    this.close.click((event) => {
        event.stopPropagation();
        this.event.close(this, 'self');
    });
};

tabItem.prototype.on = function (key, event) {
    if (this.event.hasOwnProperty(key)) {
        this.event[key] = event;
    }
};

// 为当前标签添加焦点样式
tabItem.prototype.active = function () {
    this.tab.addClass('active');
};

// 取消当前tab焦点样式
tabItem.prototype.unActive = function () {
    this.tab.removeClass('active');
};



export default tabItem
