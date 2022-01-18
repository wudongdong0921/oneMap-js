import viewRender from '../../../layout/renderView';
import router from '../router';
import api from '../api/index'

export default function (template, path, routerOption) {
    var route = router.getRouter(path, routerOption);
    route['getApi'] = api;
    var contentItem = viewRender(route, {});
    contentItem.render.call(contentItem, template);
    contentItem.$el.removeClass('layout-template-view');
    return contentItem;
};