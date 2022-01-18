export default {
    '/file/main':{
        title:'文件管理页面',
        path:'file/main',
        api:['file']
    },
    '/static/main':{
        title:'数据统计页面',
        path:'static/main',
        api:['static']
    },
    // 数据统计的详情弹窗
    '/staticDetail/detail': {
        title: '详情',
        path: 'staticDetail/detail',
        api: ['static']
    },
    // 数据详情的chart弹窗
    '/staticDetail/component/chartDialog': {
        title: '图表弹层',
        path: 'staticDetail/component/chartDialog',
        api: ['static']
    },
}