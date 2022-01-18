import common from '../../common/test'
import dialog from './commont/dialogForPage';
import routeMain from './router'
import api from './api/index'
if(!window.fontAppDialog){
    window.fontAppDialog = {}
}
window.fontAppDialog = dialog;
// var route = router('/login', {});
if (!window.routerCache) {
    window.routerCache = {};
}

window.routerCache.fontApp = {
    name: 'fontApp',
    route: routeMain.getAllRouter(),
    api:api
}
