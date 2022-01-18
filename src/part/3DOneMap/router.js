////////////////////////////////////////////////
// 路由资源信息初始化及验证方法
// 框架核心模块
// 吴野
// 2021-04-23 16:19:19
////////////////////////////////////////////////
import routerConfig from './routerConfig/index';

// 返回判定用正则表达式
// 核心代码，判断路由是否符合规范
const getRegExp = function (route) {
    route = route.replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, '\\$&')
        .replace(/\((.*?)\)/g, '(?:$1)?')
        .replace(/(\(\?)?:\w+/g, function (match, optional) {
            return optional ? match : '([^/?]+)'
        }).replace(/\*\w+/, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
};


// 引入路由静态资源信息
for (const key in routerConfig) {
    if (routerConfig.hasOwnProperty(key)) {
        var routeItem = routerConfig[key];
        routeItem.template = require('./view/' + routeItem.path + '.html');
        routeItem.event = require('./view/' + routeItem.path + '.js');
        routeItem.RegExp = getRegExp(key);
        routeItem.key = key;
    };
}

// 获取query参数
const extractParams = function (route, fragment, routeKey) {
    let fragments = [];
    let result = {};
    let params = route.exec(fragment).slice(1);
    routeKey.replace(/(\(\?)?:\w+/g, function (match, optional) {
        fragments.push(match);
        return match;
    });
    for (let d = 0; d < fragments.length; d++) {
        fragments[d] = fragments[d].replace(':', '');
        result[fragments[d]] = params[d];
    };
    return result;
};

// 检查当前哈希值是否在路由表中
const checkPath = function (path, data) {
    // path 当前的路由
    var hasHash = false;
    // 返回的参数
    var routeItem = null;
    var query = null;

    // 遍历检查路由是否合法
    for (const routeKey in routerConfig) {
        if (routerConfig.hasOwnProperty(routeKey)) {
            // 检查信息
            const answer = routerConfig[routeKey].RegExp.test(path);
            // 合法返回路由信息
            if (answer) {
                // 获取url中的参数信息
                query = extractParams(routerConfig[routeKey].RegExp, path, routeKey);
                // 路由表中缓存的数据对象
                routeItem = routerConfig[routeKey];
                // 执行中断
                hasHash = true;
                break;
            };
        }
    };

    // 待完善 判断机制可以简化，判断逻辑可以抽出
    // 如果存在合法路由，返回路由信息
    // 否则返回 false
    if (hasHash) {
        return {
            route: routeItem,
            query: query,
            path: path
        }
    } else {
        return false
    }
};

// 获取路由信息，合并路由参数，添加了自定义传参 
// 获取所有路由配置页面方法和页面放到对象中返回
var getRouter = function (path, data) {
    var router = checkPath(path);
    if (router) {
        router.data = data;
        return router;
    } else {
        return false
    };
};

var getAllRouter = function (data) {
    var _data = data || {};
    var routerObj = {};
    for (const key in routerConfig) {
        if (routerConfig.hasOwnProperty.call(routerConfig, key)) {
            const item = routerConfig[key];
            routerObj[key] = getRouter(key, _data);
        }
    }
    return routerObj;
}

export default {
    getAllRouter:getAllRouter,
    getRouter:getRouter
}