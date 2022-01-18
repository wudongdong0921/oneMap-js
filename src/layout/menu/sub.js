
///////////////////////////////////////////
// 左侧导航加载方案
// 创建人 DevSpeed
//////////////////////////////////////////////

// 导航按钮
var subELement = function (options, depth) {
    // 参数 options 导航参数
    //      depth 当前导航嵌套的级别

    this.activeEvent = function () { };

    var _this = this;

    // 当前导航嵌套级别如果为0，则为第一级导航，与主导航同步
    this.depth = depth || 0;

    // 缓存存储对象
    this.options = options;

    // 缓存是否含有子对象
    this.hasChild = false;

    // 主体html  并添加嵌套级别的class，方便css进行编写
    this.html = $('<div class="submenu-content depth-' + this.depth + '"></div>');

    // 当前导航按钮的文字标签
    this.title = $('<div class="submenu-title"><span></span></div>').appendTo(this.html);

    // 当前导航按钮的展开和收起标签
    this.subMenuBox = $('<div style="display:none" class="submenu-list"></div>').appendTo(this.html);

    // 子集菜单的缓存对象
    this.items = {};
    // 展开子集按钮
    this.show = $('<div class="submenu-button" style="display:none"><i class="fa fa-angle-down" aria-hidden="true"></i></div>').appendTo(this.title);
    // 收起子集按钮
    this.hide = $('<div class="submenu-button" style="display:none"><i class="fa fa-angle-up" aria-hidden="true"></i></div>').appendTo(this.title);

    // 是否展示切换按钮
    this.showStatus = false;

    // 展开按钮的点击事件
    this.show.click(function (event) {
        event.stopPropagation();
        _this.showSubMenuBox();
    });

    // 收起按钮的点击事件
    this.hide.click(function (event) {
        event.stopPropagation();
        _this.hideSubMenuBox();
    });

    // 为当前的导航文字添加一个与嵌套级别关联的做边距
    // 实际上可以通过css控制,但需要在css中特别书写,
    // 故在此进行设置
    this.title.find('span').css({
        'padding-left': (depth * 10 + 5) + 'px'
    });

    // 判断是否存在子集导航菜单
    if (options.hasOwnProperty('children') && options.children.length != 0) {
        this.hasChild = true;
        // 对子导航进行渲染
        for (let i = 0; i < options.children.length; i++) {
            const element = options.children[i];

            // 实例化子导航对象 本质上属于递归方法
            this.items[element.id] = new subELement(element, this.depth + 1);
            this.items[element.id].onActiveEvent(function (path) {
                _this.activeEvent(path);
            });

            // 渲染子导航
            this.subMenuBox.append(this.items[element.id].html);
        };
        this.show.show();
    };


    if (options.url) {
        // 如果此导航存在路径,则点击事件为切换页面
        this.title.click(function () {

            _this.activeEvent(options.url);
        });
    } else if (this.hasChild) {
        // 如果此导航不存在路径,则点击事件为切展开/收起子导航方法
        this.title.click(function () {
            if (_this.showStatus) {
                // 收起子菜单
                _this.hideSubMenuBox();
            } else {
                // 展开子菜单
                _this.showSubMenuBox();
            }
        });
    };

    // 添加导航文字
    this.title.find('span').text(options.name);
};

subELement.prototype.onActiveEvent = function (event) {
    this.activeEvent = event;
};

// 展开子导航方法
subELement.prototype.showSubMenuBox = function () {
    this.showStatus = true;
    this.show.hide();
    this.hide.show();
    this.subMenuBox.show();

};

// 收起子导航方法
subELement.prototype.hideSubMenuBox = function () {
    this.showStatus = false;
    this.show.show();
    this.hide.hide();
    this.subMenuBox.hide();
};

// 删除焦点样式,并遍历删除子导航的焦点样式
subELement.prototype.unActive = function () {
    for (const key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            const element = this.items[key];
            element.unActive();
        }
    };
    // active 样式需要在css中进行编写
    this.title.removeClass('active');
};

// 添加焦点样式
subELement.prototype.active = function (activeArray) {
    // 参数 activeArray 当前焦点对象数组

    // 首先删除其他导航的焦点样式
    this.unActive();

    // 添加焦点样式
    this.title.addClass('active');

    // 如果有子集，
    if (this.hasChild) {
        this.show.click();
    };

    // 从焦点数组对象中取第一个值，并向下传递
    // 待完善（未考虑到当前焦点状态未深入到最末端子集的状态）
    var id = activeArray.shift();

    // 判断当前子集有对应焦点的子集时，告诉子集去响应焦点事件
    if (this.items.hasOwnProperty(id)) {
        this.items[id].active(activeArray);
    };
};


// 左侧导航
var submenu = function () {
    this.event = {
        show: function () { },
        hide: function () { },
        active: function () { },
    };

    // 导航的html对象
    this.html = $('<div id="subMenu"></div>');

    // 子菜单缓存
    this.item = {};
};

submenu.prototype.on = function (key, event) {
    if (this.event.hasOwnProperty(key)) {
        this.event[key] = event;
    }
};

// 渲染方法
submenu.prototype.render = function (config) {
    // 清空导航主体
    this.html.empty();
    // 清空子菜单缓存
    this.item = {};

    // 遍历渲染子菜单
    for (let i = 0; i < config.length; i++) {
        const element = config[i];
        // 实例化子菜单
        this.item[element.id] = new subELement(element);
        this.item[element.id].onActiveEvent((path) => {
            this.event.active(path)
        })

        // 渲染子菜单
        this.html.append(this.item[element.id].html);
    };
};

// 焦点状态赋值方法
submenu.prototype.set = function (routerid) {
    var activeArray = routerid.split('-');

    // 将路由带入的焦点ID 处理为交单数组，以方便进行向下传递
    // 先将所有菜单进行隐藏处理
    for (const key in this.item) {
        if (this.item.hasOwnProperty(key)) {
            const element = this.item[key];
            element.html.css('display', 'none');
        }
    };
    var id = activeArray.shift();

    if (this.item.hasOwnProperty(id)) {
        // 对导航进行展示
        this.item[id].html.css('display', 'block');
        // 同子菜单焦点状态的赋值方法
        this.item[id].active(activeArray);
    };


    if (this.item.hasOwnProperty(id) && !this.item[id].hasChild) {
        this.event.hide();
    } else {
        this.event.show();
    };

};


export default submenu;