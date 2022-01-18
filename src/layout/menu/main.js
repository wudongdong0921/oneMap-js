// 导航按钮
var mainMenuIten = function (data, parent) {
    // 参数 data，主导航配置参数
    // 待完善，应有配置文件进行加载
    var _this = this;
    this.data = data;

    // 父级对象,方便与主导航进行方法调用
    this.parent = parent;

    // 主导航的菜单html对象
    this.html = $('<div class="menuItem ' + data.class + '"><div class="menu-icon"></div><div class="menu-name">' + data.name + '</div></div>');

    var _this = this;

    // 主导航点击事件
    this.html.click(() => {
        if (_this.data.url !== null && _this.data.url.indexOf('http') != -1) {
            window.open(data.url, '_blank');
        } else {
            // 调用父级菜单的焦点事件
            _this.parent.active(_this);
        };
        // 调用父级菜单的焦点事件
        // this.parent.active(this);
    });
};

// 为当前导航按钮添加焦点状态
mainMenuIten.prototype.active = function () {
    this.html.addClass('active');
};

// 为当前导航按钮删除焦点状态
mainMenuIten.prototype.unActive = function () {
    this.html.removeClass('active');
};


// 主导航对象
var mainMenu = function () {
    // 主导航页面元素
    this.html = $('<div id="MainMenu"></div>');

    // 主导航事件委托对象
    this.event = {
        active: function () { },
    };

    // 主导航存储对象
    this.menuData = {};
    // this.render(mainMenuConfig);
};

// 主导航渲染方法（带参数渲染）
mainMenu.prototype.render = function (menuData) {
    // 参数 menuData 格式化后的导航菜单配置文件参数

    // 清空主导航
    this.html.empty();

    // 释放主导航缓存
    this.menuData = {};

    // 遍历渲染导航按钮
    for (let i = 0; i < menuData.length; i++) {
        const element = menuData[i];
        // 实例化导航按钮
        this.menuData[element.id] = new mainMenuIten(element, this);
        // 渲染导航按钮
        this.html.append(this.menuData[element.id].html);
    };
};

// 导航的焦点状态
mainMenu.prototype.active = function (item, ignore) {
    // item 导航按钮对象
    // ignore 是否跳过点击事件传递

    // 递归传递对象，获得第一个有效的可点击路径
    var getChildPath = function (data) {
        // 如果当前对象有路径值，返回路径值
        // 否则遍历子对象进行数据返回
        if (data.url) {
            return data;
        } else {
            // 判断当前对象有子导航对象，
            if (data.hasOwnProperty('children')) {
                for (let i = 0; i < data.children.length; i++) {
                    const element = data.children[i];
                    // 递归获取导航参数中的路径
                    var _data = getChildPath(element);
                    if (_data) {
                        return _data;
                    };
                }
            };
            return false;
        }
    };
    // 删除导航焦点状态
    // 待完善：（应该改为存储当前导航的焦点对象，防止重复遍历）
    this.clearActive();

    // 为当前导航添加焦点状态
    item.active();

    // 判断，如果没有忽略，证明事件是由按钮触发，则调用委托方法
    // 这是为了防止由页面触发的主导航按钮焦点状态切换导致的死循环
    if (!ignore) {
        var data = getChildPath(item.data);

        // 调用委托事件
        this.event.active(data);
    };
};

// 删除导航的焦点
mainMenu.prototype.clearActive = function () {
    for (const key in this.menuData) {
        if (this.menuData.hasOwnProperty(key)) {
            const element = this.menuData[key];
            element.unActive();
        }
    };
};

// 为导航按钮添加焦点状态
// 这个方法是由导 外部触发的焦点事件，
// 即点击外部的tab标签从而触发主导航焦点切换
mainMenu.prototype.setActive = function (id) {
    // 当前焦点的ID
    if (this.menuData.hasOwnProperty(id)) {
        const element = this.menuData[id];
        // 切换焦点
        this.active(element, true);
        return element.data;
    } else {
        return {};
    }
}

// 事件委托的绑定方法
// 待完善（此类基于事件委托原理进行创建的对象，应有统一对象进行继承调用）
mainMenu.prototype.onActive = function (event) {
    this.event.active = event;
};

export default mainMenu;
