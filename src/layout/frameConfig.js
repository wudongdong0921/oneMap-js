var _config = {};
_config.InterfaceAddress = config;
_config.logoImage = './static/img/logo1.png';
_config.devModel = config.devModel; // 测试模式
_config.devToken = '121212'; // 测试模式下的token
_config.defaultPage = '/index'; // 默认跳转的页面路由
// 菜单缓存
_config.menuData = [];
_config.cache = {};
_config.beforeMenuRender = function (menuData, cacheObject) {
    var children = {};
    for (let i = 0; i < menuData.length; i++) {
        const item = menuData[i];
        // 过滤一张图菜单，并且将其他菜单加载到全局缓存中
        if (item.name == '一张图') {
            children = item.children;
            delete item['children'];
            break;
        }
    }
    cacheObject['oneMapData'] = children; // 加载到缓存中
}

// 默认跳转的页面
_config.getDefaultPage = function (menuData) {
    return '/index'
}
_config.other = {
    mainMenuClass:{
        '首页': 'nav_1',
        '公文系统': 'nav_4',
        '业务系统': 'nav_2',
        '一张图': 'nav_7',
        '任务管理系统': 'nav_8',
        '成果审查与管理系统': 'nav_9',
        '指标管理系统': 'nav_3',
        '操作手册': 'nav_8',
    },
}

export default _config;