var config = {
    gpService: true, //是否开启分布式分析服务
    DevModel:'false',
    InterfaceAddress: {
        server3DApiUrl: 'http://192.168.0.35:10003',
        // 服务器正式地址
        renrenService: "http://192.168.0.35:10003", // 人人后台地址
        affairService: "http://192.168.0.35:10004/business", // 自然资源数据后台业务系统
        implementService: "http://192.168.0.111:44406/supervise",//应用于实施监督：监测评估预警
        //officialService: "http://192.168.0.35:10004/natureResource", // official公文系统后台服务
        huizhengService: "http://192.168.0.35:10006", // 慧正工作流IP地址
        commonService: "http://192.168.0.35:10005", // 公共平台后台地址
        commonServiceSF: "http://192.168.0.35:10007", // 实施监督成果指标项目-伺服
        AnalysisServiceTest: "http://192.168.0.35:10008/onemap",//一张图后台地址
        openToButtonUrl: "http://192.168.0.35:10005/wintoppublicinterfaceGW",
        iserverService: 'http://192.168.0.38:8090/iserver/services', // iserver地图服务调用地址
        //坐标转换服务地址
        coordinateTransformationServer: "http://192.168.0.38:8090/iserver/services/data-XZQ/rest/data/coordtransfer.json",
        // 字典项调用接口
        roleArea: '230000',
        dictService: true,
        //38-iserver-全国行政区
        dataSourceSql: "QGXZQDW@QGXZQDW",
        datasetNames: "QGXZQDW:QGXZQDW",
        //行政区定位
        dataSourceSqlDis: "XZQDW@workdata",
        datasetNamesDis: "workdata:XZQDW",
        // 一张图地图服务配置
        DistrictDataUrl: 'http://192.168.0.38:8090/iserver/services/data-dw/rest/data', //行政区定位数据服务
        NationalDataUrlCenter: 'http://192.168.0.38:8090/iserver/services/data-QGXZQDW/rest/data',//通过底图行政区范围获取中心点
        distributedanalysis: 'http://192.168.0.35:10010/distributedanalysis' // 分布式分析服务
    },

    oneMapMapping: {
        MapSource: '408b280231364ce98807478147eb3beb', // 数据目录 ID
        TopicAnalyse: '0fb095cca29c4740ba2e3ad898f46eaf', // 专题分析ID
        AnalyseHistory: null,
        DatumStatistics: null,
        MapSearch: null,
        BusinessQueries:'75ec6e9e7498498a9cb9691dc688266e'
    },
    // 成果地图等其他相关数据配置（不可删除合并代码需注意）
    result:{
        mapSet:{
            queryParameter: {
                name: "XZQDW@全国行政区划",
                attributeFilter: ''
            },
            fromIndex: '0', // 开始查询位置
            toIndex: '9999', // 结束查询位置
            datasetNames: ["全国行政区划:XZQDW"]
        },
        AccessDataUrl:'http://192.168.0.38:8090/iserver/services/data-XZQDW/rest/data'
    },
    // 资源环境承载能力地图等其他相关数据配置（不可删除合并代码需注意）
    bearer:{
        mapSet:{
            queryParameter: {
                name: "XZQDW@全国行政区划",
                attributeFilter: ''
            },
            fromIndex: '0', // 开始查询位置
            toIndex: '9999', // 结束查询位置
            datasetNames: ["全国行政区划:XZQDW"]
        },
        AccessDataUrl:'http://192.168.0.38:8090/iserver/services/data-XZQDW/rest/data'
    },
    // 监测评估预警地图等其他相关配置项（不可删除合并代码时需注意）
    warning:{
        mapSet:{
            queryParameter: {
                name: "XZQDW@全国行政区划",
                attributeFilter: ''
            },
            fromIndex: '0', // 开始查询位置
            toIndex: '9999', // 结束查询位置
            datasetNames: ["全国行政区划:XZQDW"]
        },
        AccessDataUrl:'http://192.168.0.38:8090/iserver/services/data-XZQDW/rest/data'
    },
    // 规划分析地图等其他相关配置项（不可删除合并代码时需注意）
    planning:{
        mapSet:{
            queryParameter: {
                name: "XZQDW@全国行政区划",
                attributeFilter: ''
            },
            fromIndex: '0', // 开始查询位置
            toIndex: '9999', // 结束查询位置
            datasetNames: ["全国行政区划:XZQDW"]
        },
        AccessDataUrl:'http://192.168.0.38:8090/iserver/services/data-XZQDW/rest/data'
    },
    staticConfig: {
        menuClass: {
            '首页': 'nav_1',
            '公文系统': 'nav_4',
            '一书三证核发': 'nav_2',
            '一张图': 'nav_7',
            '任务管理系统': 'nav_8',
            '成果审查与管理': 'nav_9',
            '指标管理': 'nav_3',
            '操作手册': 'nav_8',
            '监测评估预警': 'nav_4',
            '资源环境承载能力': 'nav_10',
            '规划分析评价': 'nav_6',
        },
        // routerName 配置等同于每一个main文件下window.routerCache.fontApp下的name
        indexConfigPath: {
            left_0: { title: '一张图' }, // 一张图
            middle_1_top: { title: '成果审查与管理' }, // 成果管理
            middle_2_top: { title: '成果审查与管理' }, //成果审查
            middle_3_top: { title: '监测评估预警' }, //监测评估预警
            middle_1_bottom: { title: '规划分析评价' }, //分析评价
            middle_2_bottom: { title: '资源环境承载能力' }, //资源环境承载能力
            right_1: { title: '指标管理' }, //指标管理
            right_2: { title: '一书三证核发' }, //一书三证核发
        },
        login: {
            pageTitle: '黑龙江省国土空间规划“一张图”实施监督信息管理系统',       // 网页标题
            bg: 'url(./static/img/background.png)', // 登录背景图
            bgTitle: './static/img/login-title-text.png',// 登录标题
            mainIndexBg: {
                BG: 'static/img/index/background.png',                      // 登录后主页背景
                title: 'static/img/index/text-title.png',                   // 登录后主页标题
                subTitle: 'static/img/index/sub_title.png',                 // 登录后主标题下小标题
            },
            mainIndexImageObject: {                                         // 登录后主页模块图
                left_0: 'static/img/index/left_0.png',
                middle_1_top: 'static/img/index/成果管理.png',
                middle_2_top: 'static/img/index/middle_2_top.png',
                middle_3_top: 'static/img/index/middle_3_top.png',
                middle_1_bottom: 'static/img/index/公文替换.png',
                middle_2_bottom: 'static/img/index/middle_2_bottom.png',
                right_1: 'static/img/index/right_1.png',
                right_2: 'static/img/index/right_3.png',
            }
        },

        statisConfig: {
            barIcon: 'static/icon/bar-chart.png',
        }
    }
}
