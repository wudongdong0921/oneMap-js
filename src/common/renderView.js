////////////////////////////////////////////////
// 全局调用跳转方法
// 吴野
// 2021-05-19 21:16:41
////////////////////////////////////////////////
import viewRender from '../layout/renderView';

export default function (template, path, routerOption) {
    var route = getRoute(path, routerOption);
    // route['getApi'] = api;
    var contentItem = viewRender(route, {});
    contentItem.render.call(contentItem, template);
    contentItem.$el.removeClass('layout-template-view');
    return contentItem;
};

var getRoute = function (path, data) {
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
    var routers = checkPath(path,{},routerConfig)
    if (routers) {
        routers.data = data;
        return routers;
    } else {
        return false
    };
}

const checkPath = function (path, data,routerConfig) {
    // path 当前的路由
    var hasHash = false;
    // 返回的参数
    var routeItem = null;
    var query = null;

    // 遍历检查路由是否合法
    for (const routeKey in routerConfig) {
        if (routerConfig.hasOwnProperty(routeKey)) {
            // 检查信息
            const answer = routerConfig[routeKey].route.RegExp.test(path);
            // 合法返回路由信息
            if (answer) {
                // 获取url中的参数信息
                query = extractParams(routerConfig[routeKey].route.RegExp, path, routeKey);
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
        routeItem['query'] = query;
        routeItem['data'] = data;
        return routeItem
    } else {
        return false
    }
};

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