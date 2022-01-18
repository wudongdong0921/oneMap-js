var _config = {};
/* start ******************************** */
// 后台 Url 地址
_config.InterfaceAddress = config;
/* end ********************************** */

/* start ******************************** */
// 页面主体框架logo图像
// 待扩展
_config.logoImage = './static/img/logo1.png';
/* end ********************************** */

// 开发模式，配置在config中，开发模式默认返回全部路径。
// 正事开发时，将删除该项目
_config.devModel = config.devModel;

// token 开发模式下token
_config.devToken = '123123123123';

// 默认跳转页面
_config.defaultPage = '/index';

// 菜单缓存
_config.menuData = [];
_config.cache = {};

// 菜单渲染前执行
_config.beforeMenuRender = function (menuData, cacheObject) {
    var children = [];

    // 过滤一张图菜单，并且加载到全局缓存中
    for (let i = 0; i < menuData.length; i++) {
        const element = menuData[i];
        if (element.name == '一张图') {
            children = element.children;
            delete element['children'];
            break;
        }
    } 
    // 加载到缓存中
    cacheObject['oneMapData'] = children;
};

// 获取默认跳转页面

_config.getDefaultPage = function (menuData) {
    // wuye 此处修改后只许本地调试，不可提交git，每次提交需还原默认跳转。
    // return '/warning/major';
    //  return '/planning/plan_implementation/site';
    return '/index' // 默认跳转
    // return '/professional/business/await';
    function getFirstPageforMenu(data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.name == '业务管理') {
                return element;
            }
        }
    };
    var pageArray = getFirstPageforMenu(menuData);
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
    var page = getChildPath(pageArray).url;
    return page;
};

/* start */
// 其他选项
// 页面公用方法及函数可另行自由添加，不作为基本函数调用设置
_config.other = {
    // 主菜单的class关联设置
    // 因为目前后台没有menu的关联设置，所以在此处添加关联设置
    mainMenuClass: config.menuClass,
};



export default _config;