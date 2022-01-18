////////////////////////////////////////////////
// 资源环境承载能力路由配置
// 吴野
// 2020-11-23 13:10:30
////////////////////////////////////////////////


export default {
    // -----首页-----
    '/bearer/home': {
        title: '资源环境承载能力监测预警',
        path: 'bearer/home/home',
        api: ['bearer.comperhensiveOversee', 'bearer.map']
    },
    '/bearer/detail': {
        title: '评价详情',
        path: 'bearer/detail/detail',
        api: ['bearer.comperhensiveOversee', 'bearer.map']
    },
}