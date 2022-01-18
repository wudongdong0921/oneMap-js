import routerConfig from './config';
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
// 引入处理静态资源
for (const key in routerConfig) {
    if (routerConfig.hasOwnProperty.call(routerConfig, key)) {
        const item = routerConfig[key];
        item.template = require('./' + item.path + '.html');
        item.event = require('./' + item.path + '.js');
        item.RegExp = getRegExp(key);
        item.key = key;
    }
}
// 检查当前路由哈希值是否存在路由列表中
const checkPath = function (path, data) {
    var hasHash = false;
    var routeItem = null;
    var query = null;
    for (const routerKey in routerConfig) {
        if (routerConfig.hasOwnProperty.call(routerConfig, routerKey)) {
            const itemRouter = routerConfig[routerKey].RegExp.test(path);
            if (itemRouter) {
                query = extractParams(routerConfig[routerKey].RegExp, path, routerKey);
                routeItem = routerConfig[routerKey];
                hasHash = true;
                break;
            }
        }
    }
    if (hasHash) {
        return {
            route: routeItem,
            query: query,
            path: path
        }
    } else {
        return false
    }
}

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

var getRouter = function (path, data) {
    var router = checkPath(path);
    if (router) {
        router.data = data;
        return router;
    } else {
        return false
    };
};
export default getRouter;