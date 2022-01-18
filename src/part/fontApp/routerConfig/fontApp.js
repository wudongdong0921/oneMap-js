export default {
    '/login': {
        title: '登录',
        path: 'login/login',
        api: ['loginApi'],
    },
    '/index': {
        title: '主页',
        path: 'index/index',
        activeId: 'index',
        api: ['indexApi'],
    },
    '/login/forgetPassword': {
        title: '修改密码',
        path: 'login/forgetPassword/password',
        api: ['loginApi'],
    },
    '/loading': {
        title: '弹出框',
        path: 'loading/loading',
        api: [],
    },
}