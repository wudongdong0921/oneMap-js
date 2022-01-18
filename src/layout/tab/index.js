import tabItem from './item'
import _config from '../frameConfig'

var tab = function (el) {

    // 创建tab 框架主体 
    ////////
    // 待完善项，抽出tab模块，做单独调用
    ////////
    this.html = el;
    var _this = this;

    // 创建tab 浮动容器
    this.tabLayout = $('<div class="layout-tab-box"></div>').appendTo(this.html);

    // 创建tab 内容容器
    this.tab = $('<div class="layout-tab-content"></div>').appendTo(this.tabLayout);

    // 创建tab 左移动按钮
    this.tabBefore = $('<div class="layout-tab-before"><i class="fa fa-angle-double-left" aria-hidden="true"></i></div>').appendTo(this.html);
    this.tabBefore.bind('click',()=>{
        _this.tabLayout.animate({
            scrollLeft: _this.tabLayout.scrollLeft() + 9999999
        }, 200);;
    })
    // 创建tab 右移动按钮
    this.tabAfter = $('<div class="layout-tab-after"><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>').appendTo(this.html);
    this.tabAfter.bind('click',()=>{
        _this.tabLayout.animate({
            scrollLeft: _this.tabLayout.scrollLeft() - 9999999
        }, 200);;
    })
    // 创建tab 功能按钮
    this.tabRefresh = $('<div class="layout-tab-refresh"><i class="fa fa-refresh" aria-hidden="true"></i><span>刷新</span></div>').appendTo(this.html);

    // 鼠标滚轮控制tab 标签 移动功能
    this.tabLayout.mousewheel((event, delta) => {
        if (delta > 0) {
            // 鼠标上滚轮，向左侧移动
            this.tabLayout.animate({
                scrollLeft: this.tabLayout.scrollLeft() - 400
            }, { speed: 200, easing: 'linear', queue: false });
        } else if (delta < 0) {
            // 鼠标下滚轮，右侧移动
            this.tabLayout.animate({
                scrollLeft: this.tabLayout.scrollLeft() + 400
            }, { speed: 200, easing: 'linear', queue: false });
        }
    });
    this.items = [];
    this.event = {
        active: function () { },
        defaultActive: function () { },
        refresh: function () { },
    };
    this.tabStatus();


    this.tabRefresh.click(()=>{
        this.event.refresh();
    });

    this.activeTabObj = null;
};

tab.prototype.clearTabActive = function () {
    for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i];
        element.unActive();
    };
};

tab.prototype.checkChildren = function (route) {
    var hasTab = false;
    for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i];
        if (element.key == route.path) {
            hasTab = true;
            this.activeChildren(element, true);
            this.tabStatus();
            break;
        };
    };
    if (!hasTab) {
        this.create(route);
    };
};

tab.prototype.activeChildren = function (item, ignore) {
    this.activeTabObj = item;
    this.clearTabActive();
    item.active();
    if (!ignore) {
        this.event.active(item);
    };
};


tab.prototype.destroyChildren = function (item) {
    if (this.items.length == 1 && this.items[0].key == _config.defaultPage) {
        return;
    };
    // 判断当前标签是否是焦点状态
    var isActive = item.tab.hasClass('active');

    // 缓存当前关闭标签所在位置
    var index = null;
    for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i];
        if (element === item) {
            index = i;
            // 关闭标签，执行页面注销事件
            element.tab.remove();
            // 删除标签元素缓存
            this.items.splice(i, 1);
            break;
        };
    };

    if (isActive) {
        // 当前标签为焦点状态时，打开下一个标签
        // 因为标签的缓存列表中，当前标签已经删除，
        // 所以当前缓存的index 值就为下一个标签的缓存下标
        // 判断当前下标存在时，就打开下一个标签
        // 当下一个标签不存在时，就打开上一个标签
        if (this.items[index]) {
            this.activeChildren(this.items[index]);
        } else if (this.items[index - 1]) {
            this.activeChildren(this.items[index - 1]);
        };
    };

    if (this.items.length == 0) {
        this.event.defaultActive();
    };

    this.tabStatus();
};

// tab.prototype.


tab.prototype.create = function (route) {
    var item = new tabItem(route);
    item.on('active', (item) => {
        this.activeChildren(item);
    });
    item.on('close', (item, type) => {
        if (type == 'self') {
            this.destroyChildren(item);
        } else if (type == 'other') {
            for (let i = 0; i < this.items.length; i++) {
                const element = this.items[i];
                if (element != item) {
                    element.tab.remove();
                };
            };
            this.items = [item];
            var isActive = item.tab.hasClass('active');
            if (!isActive) {
                this.activeChildren(item);
            };
        } else if (type == 'left') {
            var canClose = false;
            for (let i = (this.items.length - 1); i > -1; i--) {
                const element = this.items[i];
                if (element === item) {
                    canClose = true;
                    continue;
                };
                if (canClose) {
                    element.tab.remove();
                    this.items.splice(i, 1);
                };
            };
            var isActive = item.tab.hasClass('active');
            if (!isActive) {
                this.activeChildren(item);
            };
        } else if (type == 'right') {
            for (let i = (this.items.length - 1); i > -1; i--) {
                const element = this.items[i];
                if (element === item) {
                    break;
                } else {
                    element.tab.remove();
                    this.items.splice(i, 1);
                };
            };
            var isActive = item.tab.hasClass('active');
            if (!isActive) {
                this.activeChildren(item);
            };
        } else if (type == 'all') {
            for (let i = 0; i < this.items.length; i++) {
                const element = this.items[i];
                element.tab.remove();
            };
            this.items = [];
            this.event.defaultActive();
        }
    });

    this.items.push(item);
    this.tab.append(item.tab);
    this.activeChildren(item, true);

    this.tabStatus();
};

tab.prototype.on = function (key, event) {
    if (this.event.hasOwnProperty(key)) {
        this.event[key] = event;
    }
};

tab.prototype.destroy = function () {
    this.items = null;
    this.html.remove();
};

tab.prototype.tabStatus = function () {
    // 初始化 tab 的长度
    var tabWidth = 0;

    // 计算每一个已经加载到页面中的 tab 的长度
    this.tab.find('.layout-tab-item').each(function () {
        tabWidth += $(this).outerWidth(true)
    });

    // 为tab增加一个右侧的空缺，防止遮挡关闭按钮
    this.tab.width(tabWidth + 80);

    // 如果tab的总长度大于 tab 的框架长度，
    // 则显示左移动按钮，右移动按钮，改变tab的框架宽度，保证按钮正确显示
    if (this.tabLayout.width() > this.tab.width()) {
        this.tabAfter.hide();
        this.tabBefore.hide();
        this.tabLayout.css({
            left: '0px',
            right: '70px'
        });
    } else {
        this.tabAfter.show();
        this.tabBefore.show();
        this.tabLayout.css({
            left: '30px',
            right: '100px'
        });
    }

    // 如果当前的tab 有焦点状态，并且焦点状态的tab距离左侧的位置不是0
    // 则标签向左侧移动
    // 否则标签移动到最后位置
    // 待完善（判断逻辑不合理，执行方法过于笨拙）
    if (this.activeTabObj && this.activeTabObj.tab.offset().left != 0) {
        this.tabLayout.animate({
            scrollLeft: this.tabLayout.scrollLeft() + this.activeTabObj.tab.offset().left - 100
        }, 200);
    } else {
        this.tabLayout.animate({
            scrollLeft: this.tabLayout.scrollLeft() + 9999999
        }, 200);
    };
}



export default tab;