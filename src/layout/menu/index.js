
import mainMenu from './main';
// import config from '../frameConfig';
// import routerConfig from '../../router/index';
import subMenu from './sub'
var routerConfig = []

const menuClass = config.staticConfig.menuClass;

var menu = function (main, sub) {
    for (const key in routerAllCache) {
        if (routerAllCache.hasOwnProperty.call(routerAllCache, key)) {
            const element = routerAllCache[key];
            if(element.route){
               for (const keys in element.route) {
                   if (element.route.hasOwnProperty.call(element.route, keys)) {
                       const itemRoute = element.route[keys];
                       routerConfig[keys] = itemRoute.route;
                   }
               }
            }
        }
    }
    this.event = {
        showSubMenu: function () { },
        hideSubMenu: function () { },
        active: function () { },
    };

    this.menuItem = [];
    this.maniMenuElement = main;
    this.leftMenuElement = sub;

    this.mainMenu = new mainMenu();
    this.maniMenuElement.append(this.mainMenu.html);

    this.mainMenu.onActive((data) => {
        this.event.active(data.url);
    });

    this.subMenu = new subMenu();

    this.subMenu.on('show', () => {
        this.event.showSubMenu();
    });

    this.subMenu.on('hide', () => {
        this.event.hideSubMenu();
    });
    this.subMenu.on('active', (path) => {
        this.event.active(path);
    });
    this.leftMenuElement.append(this.subMenu.html);
};

menu.prototype.renderMenu = function (menuData) {   

    var menuObj = {};

    // 将自导航树状对象，递归为对象，key值为菜单缓存的ID
    var setRouterId = function (data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            menuObj[element.id] = element;
            // 判断如果存才子对象，则递归。
            if (element.hasOwnProperty('children') && element.children != 0) {
                // 执行递归方法。
                // 为兼容IE，放弃使用参数递归方法
                setRouterId(element.children);
            };
        };
    };

    // 执行递归方法。
    // 为兼容IE，放弃使用参数递归方法
    setRouterId(menuData);

    // 遍历对象，将菜单的父级对象挂载到菜单上
    // 目的是为了提取各层菜单的属性，挂载到路由表中，以实现导航焦点事件与tab进行绑定

    for (const key in menuObj) {
        if (menuObj.hasOwnProperty(key)) {
            const element = menuObj[key];
            // 这里需要判断一下父级是否在缓存的对象中，
            // 因为人人权限返回的对象并不是根对象，
            // 导致导航需要的根级别对象中，也存在父级的ID，但没有父级的对象
            if (menuObj.hasOwnProperty(element.pid)) {
                // 挂载 key 值为parent
                // 待完善 父级对象关系绑定成功了，
                // 但是并未及时删除。
                element.parent = menuObj[element.pid];
            };
        }
    };

    // 递归方法，返回当前的路由表的焦点状态ID，倒叙返回
    var getParentId = function (data, id) {
        // 这里使用的是在上面遍历出来的 parent 属性而没有用pid，
        // 因为人人权限返回的对象并不是根对象，
        // 导致导航需要的根级别对象中，也存在父级的ID，但没有父级的对象
        if (data.hasOwnProperty('parent')) {
            var _id = data.parent.id + '-' + id;
            // 如果有父级，就递归
            return getParentId(data.parent, _id)
        } else {
            // 如果没有，返回ID值
            return id;
        };
    };

    // 格式化显示用菜单对象
    for (const key in menuObj) {
        if (menuObj.hasOwnProperty(key)) {
            let element = menuObj[key];
            // 将主导航的样式 从缓存列表加载到配置表中
            if (menuClass.hasOwnProperty(element.name)) {
                element.class = menuClass[element.name];
            };
            // 合并路由表中的焦点关系
            // 因为主导航中的按钮可能没有连接，但是有焦点关系，所以加以判断
            if (element.url !== null && routerConfig.hasOwnProperty(element.url)) {
                // 递归获得当前路由的焦点关系
                var routerActive = getParentId(element, element.id);

                // 替换原有路由的焦点关系
                routerConfig[element.url].activeId = routerActive;
            };
            // if (element.hasOwnProperty('parent')) {
            //     delete element[parent]
            // }
        }
    };

    this.mainMenu.render(menuData);
    this.subMenu.render(menuData);
};

menu.prototype.setRouter = function (router) {
    var routerActiveArray = router.activeId.split('-');
    this.mainMenu.setActive(routerActiveArray[0]);
    this.subMenu.set(router.activeId);
};

menu.prototype.on = function (key, event) {
    if (this.event.hasOwnProperty(key)) {
        this.event[key] = event;
    };
};

menu.prototype.destroy = function () {
    this.menuItem = null;
    this.maniMenuElement.remove();
    this.leftMenuElement.remove();
};

export default menu;