////////////////////////////////////////////////
// 主入口文件，本框架为基于layui样式框架，有关于layui方法参考layui官网
// 吴野
// 2021-04-23 14:28:21
////////////////////////////////////////////////

import iframMain from './frame'; // 加载主体框架
import './style/layout.css';
import './style/navItem.css';
import './initOptions'
import viewRender from '../common/renderView'
import dtrees from '../../public/static/libs/dtree';
import UTIL from '../common/util'
import Store from '../stateModel/state'
// import dialog from '../common/dialogForPage';// 加载loading组件
// window.dialog = dialog; // 将loading组件挂载到window对象里
window.dialogs = icu.loading(); // 将组件里的loading放入window对象下
// type:【log:obj-fds-zs-str/info:obj-fds-zs-str/error:obj-fds-zs-str/warn:obj-fds-zs-str/debug:obj-fds-zs-str】
// title: 输出内容标题
// cosoData: 输出内容
// 案例:$Console('log:obj','卡片信息',boxdata)
window.$Console = UTIL.consoleLog;
window.$store = Store;
setTimeout(() => {
    // layui.extend({
    //     dtree: dtrees
    // })
    window.dtree = layui.dtree;
    window.tree = layui.tree;
    var routerAll = {};
    // 处理所有页面路由方法
    window.initPackEvent = function (key, object) {
        routerAll[key] = object
    };
    // 判断window下是否有routerCache对象
    if (window.routerCache) {
        for (const key in routerCache) {
            if (Object.hasOwnProperty.call(routerCache, key)) {
                const item = routerCache[key];
                initPackEvent(key, item);
            }
        }
    }
    // 处理完路由后释放window下routerCache对象
    window.routerCache = undefined;
    if (!window.routerCache) {
        window.routerAllCache = {};
    }
    window.routerAllCache = routerAll; // 最后的router可用于渲染页面

    // console.log(routerAllCache)
    var path = null;
    try {
        path = location.hash.split("?")[0].split("#")[1];
    } catch (error) {
        console.error(error);
    };
    if (path) {
        // 加载路由并渲染
        var contentItem = viewRender($('#layout-content'), path, {});
        $('#layout-content').css({
            background: '#fff'
        });
        // 更改通用样式中的内边距
        contentItem.$el.css({
            'padding': 0,
        });
        contentItem.$el.addClass('layout-template-view');
    } else {
        window.layout = iframMain;
        layout.main.init();
    }

    window.addEventListener('hashchange', function () {
        var path = location.hash.split("?")[0].split("#")[1];
        $('#layout-content').empty();
        // 加载路由并渲染
        var contentItem = viewRender($('#layout-content'), path, {});
        // 更改通用样式中的内边距
        contentItem.$el.css({
            'padding': 0,
        });
        contentItem.$el.addClass('layout-template-view');
    });
}, 1000);