import util from '../../../../common/util';
import Router from './moduls/router';
import api from "./api/index";
var renderView = function (path, data) {
}

renderView.prototype.render = function (path, events, data) {
    var id = util.uuid();
    var $parent = null;
    this.routerCache = Router(path, {});
    // 为了防止组件重复加载
    var object = util.clone(this.routerCache);
    var view = function () { };
    view.prototype.$query = object.query;
    view.prototype.$data = object.data;

    view.prototype.$data.subMenuData = data;
    
    view.prototype.$route = object.route;
    view.prototype.$path = object.path;
    view.prototype.$id = id;
    // 路由页面
    view.prototype._template = object.route.template;
    // 路由方法
    let routeEvent = object.route.event.default;
    for (const key in routeEvent) {
        if (routeEvent.hasOwnProperty.call(routeEvent, key)) {
            const routeItem = routeEvent[key];
            if (key != 'render' || key != 'destroy') {
                if (key == 'renderData') {
                    view.prototype[key] = routeItem();
                } else {
                    view.prototype[key] = routeItem
                };
            };
        }
    }
    // 处理传递过来的动态执行方法，并绑定到view中
    if(events) {
        for (const key in events) {
            if (events.hasOwnProperty(key)) {
                const element = events[key];
                view.prototype[key] = element
            }
        };
    }

    // 将方法绑定view身上
    view.prototype.$render = object.route.event.default.render;
    view.prototype.$destroy = object.route.event.default.destroy || function () { };
    view.prototype.$api = api.get(object.route.api);//包含api

    view.prototype.render = function (parent) {
        $parent = parent ? parent : $(this._template);
        view.prototype.$el = $('<div class="OneMap_LeftBar_box"></div>');
        $parent.appendTo(this.$el);
        setTimeout(() => {
            this.$render.apply(this);
        }, 10);
        return this.$el
    }
    // 扩展对象注销方法
    view.prototype.destroy = function () {
        this.$destroy.apply(this);
        this.$el.remove();
    };
    view.prototype.reload = function () {
        this.destroy();
        this.render($parent);
    };
    return new view();
}
export default renderView;