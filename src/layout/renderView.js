// import service from '../api/index'
var util = icu.util;
// import dialog from '../common/dialogForPage'

var creatContentObject = function (_objcet, events,cache) {
    var $parent = null;
    var id = util.uuid();

    // 防止组件重复加载，克隆路由对象
    var objcet = util.clone(_objcet);

    var view = function () { };
    view.prototype.$query = objcet.query;
    view.prototype.$data = objcet.data;
    view.prototype.$route = objcet.route;
    // view.prototype.dialog = function (options) {
        // options.parent = this;
        // return dialog(options);
    // }
    // 缓存path
    view.prototype.$path = objcet.path;

    view.prototype.$id = id;
    view.prototype._template = objcet.route.template;
    for (const key in objcet.route.event.default) {
        if (objcet.route.event.default.hasOwnProperty(key)) {
            const element = objcet.route.event.default[key];
            if (key != 'render' || key != 'destroy') {
                if (key == 'renderData') {
                    view.prototype[key] = element();
                } else {
                    view.prototype[key] = element
                };
            };
        }
    };

    for (const key in events) {
        if (events.hasOwnProperty(key)) {
            const element = events[key];
            view.prototype[key] = element
        }
    };

    view.prototype.$render = objcet.route.event.default.render;
    view.prototype.$destroy = objcet.route.event.default.destroy || function () { };
    view.prototype.$api = objcet.getApi.get(objcet.route.api);
    // view.prototype.$api = cache.api.get(objcet.route.api);
    // 扩展对象渲染方法
    view.prototype.render = function (parent) {
        $parent = parent
        // this.$parent = parent;
        view.prototype.$el = $('<div class="layout-template-view">' + this._template + '</div>');
        $parent.append(this.$el);
        setTimeout(() => {
            this.$render.apply(this);
        }, 10);
    };

    // 扩展对象注销方法
    view.prototype.destroy = function () {
        this.$destroy.apply(this);
        this.$el.remove();
    };

    view.prototype.reload = function () {
        this.destroy();
        this.render($parent);
    };

    if (process.env == 'development') {
        console.log('<----------- ' + objcet.route.title + ' ：  src/view/' + objcet.route.path + '.js   ----------->');
        for (let index = 0; index < objcet.route.api.length; index++) {
            const element = objcet.route.api[index];
            if (element) {
                console.log('<----------- 接口文件 ：' + (index + 1) + ' ：  api/' + element.replace('.', '/') + '.js ----------->');
            };
        }
    };

    return new view();
};

export default creatContentObject
