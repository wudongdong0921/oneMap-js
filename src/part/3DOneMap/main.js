import routeMain from './router'
import api from './api/index'
if (!window.routerCache) {
    window.routerCache = {};
}
if (!window.routerCache) {
    window.routerCache = {};
}
window.routerCache['3DOneMap'] = {
    name: '3DOneMap',
    route: routeMain.getAllRouter(),
    api:api
}