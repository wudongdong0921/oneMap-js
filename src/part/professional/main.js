import dialog from './commont/dialogForPage';
import routeMain from './router'
import api from './api/index'
if(!window.professionalDialog){
    window.professionalDialog = {}
}
window.professionalDialog = dialog;
if (!window.routerCache) {
    window.routerCache = {};
}
window.routerCache.professional = {
    name: 'professional',
    route: routeMain.getAllRouter(),
    api:api
}
