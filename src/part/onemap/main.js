import routeMain from './router'
import api from './api/index'
import dialog from './view/extend/commont/dialogForPage';
if(!window.onemapDialog){
    window.onemapDialog = {}
}
window.onemapDialog = dialog;
if (!window.routerCache) {
    window.routerCache = {};
}
if (!window.routerCache) {
    window.routerCache = {};
}
window.routerCache.onemap = {
    name: 'onemap',
    route: routeMain.getAllRouter(),
    api:api
}