import dialog from './commont/dialogForPage';
import routeMain from './router'
import api from './api/index'
if(!window.implementationDialog){
    window.implementationDialog = {}
}
window.implementationDialog = dialog;
if (!window.routerCache) {
    window.routerCache = {};
}
window.routerCache.implementation = {
    name: 'implementation',
    route: routeMain.getAllRouter(),
    api:api
}
