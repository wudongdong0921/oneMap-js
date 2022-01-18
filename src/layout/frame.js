import _config from './frameConfig';
import tab from './tab/index';
import menu from './menu/index';
import renderView from './renderView';
import userinfo from './userinfo';
var session = icu.session;
var util = icu.util;
var frameContent = function () {
    this.renderType = null;
    this.html = $('#layout-content'); // 关联主体框架元素，获取index.html 页面中div框体元素。
    this.html.css('background', '#f0f0f0'); // 为背景添加背景颜色。
}

frameContent.prototype.render = function () {
    this.$el = {}; // 创建元素容器
    this.$el.header = $('<div class="layout-header"></div>').appendTo(this.html); // 创建头部元素
    this.$el.logo = $('<div class="layout-logo"><img src="' + _config.logoImage + '"/></div>').appendTo(this.$el.header); // 创建logo元素
    this.$el.userinfo = $('<div class="layout-userinfo"></div>').appendTo(this.$el.header); // 创建用户信息元素
    this.$el.mainMenuBox = $('<div class="layout-mainMenu"></div>').appendTo(this.$el.header); // 创建主菜单元素

    this.$el.subMenuBox = $('<div class="layout-submenu"></div>').appendTo(this.html);// 创建右侧菜单树元素

    this.$el.tabBox = $('<div class="layout-tab"></div>').appendTo(this.html);// 创建tab 框架主体 

    this.$el.content = $('<div class="layout-content"></div>').appendTo(this.html);// 创建 主体内容容器

    this.tab = new tab(this.$el.tabBox); // 初始化tab签
    this.tab.on('active', (item) => {
        this.setRouter(item.key, {});
    });
    this.tab.on('defaultActive', () => {
        this.setRouter('/index');
    });
    this.tab.on('refresh', () => {
        if (this.content && this.content.destroy) {
            this.content.reload();
        };
    })
    // 初始化userinfo方法
    this.userinfo = new userinfo(this.$el.userinfo);
    this.userinfo.on('logout', () => {
        this.setRouter('/login', {});
    });
    this.userinfo.setUserName(session.get('userInfo').realName);
    // 初始化menu
    this.menu = new menu(this.$el.mainMenuBox, this.$el.subMenuBox);
    this.menu.on('showSubMenu', () => {
        this.showSubMenu();
    });
    this.menu.on('hideSubMenu', () => {
        this.hideSubMenu();
    });
    this.menu.on('active', (path) => {
        this.setRouter(path);
    });
    this.menu.renderMenu(_config.menuData);
    this.content = {};
}
// 显示左侧菜单框架
frameContent.prototype.showSubMenu = function () {
    this.$el.subMenuBox.css({
        left: '0px',
    });

    this.$el.content.css({
        left: '210px',
        top: '117px',
    });
};

// 隐藏左侧菜单框架
frameContent.prototype.hideSubMenu = function () {
    this.$el.subMenuBox.css({
        left: '-200px',
    });
    this.$el.content.css({
        left: '0px',
        top: '117px'
    });
};

frameContent.prototype.clear = function () {
    if (this.content && this.content.destroy) {
        this.content.destroy();
    };
    this.content = {};
    if (this.menu) {
        this.menu.destroy();
    };
    if (this.tab) {
        this.tab.destroy();
    };
    this.renderType = null;
    this.html.empty();
};

frameContent.prototype.renderLogin = function (route, cache) {
    // this.clear();
    var contentItem = renderView(route, {
        goto: (path, data, allPaht) => {
            this.setRouter(path, data, allPaht);
        }
    }, cache)
    this.content = contentItem;
    contentItem.render(this.html);
}

frameContent.prototype.renderContent = function (route, cache) {
    if (this.renderType === null || this.renderType === 'login') {
        this.clear();
        this.render();
        this.renderType = 'content';
    };
    // 当前点击页面已经是焦点页面，则停止渲染；
    if (this.content.$path == route.path) {
        return;
    };
    if (this.content && this.content.destroy) {
        this.content.destroy();
    };
    this.tab.checkChildren(route);
    this.GoToPath(route, cache);
};

frameContent.prototype.GoToPath = function (route, cache) {
    var contentItem = renderView(route, {
        goto: (path, data, allPaht) => {
            this.setRouter(path, data, allPaht);
        }
    }, cache);
    this.content = contentItem;
    contentItem.render(this.$el.content);
    this.menu.setRouter(route.route);
};

frameContent.prototype.setRouter = function (path, data) {
    var _data = data || {};
    var _this = this;
    if (path == '/login' || path == '/index') {
        var route = _this.getRoute(path, _data); // 历史取route方式routerAllCache.fontApp.route[path];
        if (!route) {
            return;
        }
        _this.clear();
        _this.renderLogin(route, routerAllCache.fontApp);
        // console.log(routerAllCache)
    } else {
        var route = _this.getRoute(path, _data);
        if (route) {
            // _this.clear();
            this.renderContent(route);
        } else {
            if(this.content.$path !== '/onemap'){
                layer.open({
                    content: '路由配置错误！'
                });
                _this.clear();
                _this.setRouter('/index');
            }
        }
    }
    this.getRoute()
}

frameContent.prototype.getRoute = function (path, data) {
    var routerConfig = [];
    for (const key in routerAllCache) {
        if (routerAllCache.hasOwnProperty.call(routerAllCache, key)) {
            const element = routerAllCache[key];
            if (element.route) {
                for (const keys in element.route) {
                    if (element.route.hasOwnProperty.call(element.route, keys)) {
                        const itemRoute = element.route[keys];
                        routerConfig[keys] = itemRoute;
                        routerConfig[keys].data = data;
                        routerConfig[keys].getApi = element.api
                    }
                }
            }
        }
    }
    return routerConfig[path];
}

frameContent.prototype.init = function () {
    var token = session.get('token');
    var nav = session.get('nav');
    var huizhengToken = session.get('huizheng-token');
    var userInfo = session.get('userInfo');
    var _this = this;
    if (!token || !nav || !huizhengToken || !userInfo) {
        // todo 渲染登录页
        _this.setRouter('/login')
    } else {
        _config.beforeMenuRender(nav, _config.cache);
        _config.menuData = nav;
        _config.defaultPage = _config.getDefaultPage(nav);
        // _this.setRouter('/index')
        this.setRouter(_config.defaultPage);
    }
}

var _frame = (function () {
    return new frameContent();
})()

export default {
    main: _frame,
    init: function () {
        // if (config.devModel) {
        //     session.set('token', config.devToken);
        //     session.set('nav', require('../config/menu').default);
        //     session.set('userInfo', {
        //         realName: '测试用户',
        //     })
        // };
        _frame.init.call(_frame);
    }
}