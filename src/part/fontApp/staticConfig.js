var staticConfig = {
    menuClass: {
        '首页': 'nav_1',
        '公文系统': 'nav_4',
        '业务系统': 'nav_2',
        '一张图': 'nav_7',
        '任务管理系统': 'nav_8',
        '成果审查与管理系统': 'nav_9',
        '指标管理系统': 'nav_3',
        '操作手册': 'nav_8',
    },
    // routerName 配置等同于每一个main文件下window.routerCache.fontApp下的name
    indexConfigPath: {
        left_0: { title: '一张图',routerName:'' }, // 一张图  
        middle_1_top: { title: '业务系统' ,routerName:''}, // 业务系统
        middle_2_top: { title: '成果审查与管理系统',routerName:'' }, //成果与审查
        middle_3_top: { title: '监测评估预警',routerName:'' }, //监测评估
        middle_1_bottom: { title: '公文系统' ,routerName:'official'}, //公文系统
        middle_2_bottom: { title: '资源环境承载能力',routerName:'' }, //资源环境承载能力
        right_1: { title: '指标管理系统' ,routerName:''}, //指标管理
        right_2: { title: '规划分析评价' ,routerName:''}, //分析评价
    },
    login: {
        pageTitle: '辉南县国土空间规划“一张图”实施监督信息管理系统',       // 网页标题
        bg: 'url(./static/img/background.png)', // 登录背景图
        bgTitle: './static/img/login-title-text.png',// 登录标题
        mainIndexBg: {
            BG: 'static/img/index/background.png',                      // 登录后主页背景
            title: 'static/img/index/text-title.png',                   // 登录后主页标题
            subTitle: 'static/img/index/sub_title.png',                 // 登录后主标题下小标题
        },
        mainIndexImageObject: {                                         // 登录后主页模块图
            left_0: 'static/img/index/left_0.png',
            middle_1_top: 'static/img/index/middle_1_top.png',
            middle_2_top: 'static/img/index/middle_2_top.png',
            middle_3_top: 'static/img/index/middle_3_top.png',
            middle_1_bottom: 'static/img/index/middle_1_bottom.png',
            middle_2_bottom: 'static/img/index/middle_2_bottom.png',
            right_1: 'static/img/index/right_1.png',
            right_2: 'static/img/index/right_2.png',
        }
    }
}

export default staticConfig;