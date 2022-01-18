////////////////////////////////////////////////
// 业务系统路由配置
// 吴野
// 2021-05-14 19:25:16
////////////////////////////////////////////////
export default {
    '/professional/index': {
        title: '业务首页',
        path: 'index/index',
        api: ['business', 'analyze'],
    },

    '/professional/business/accept': {
        title: '业务受理',
        path: 'business/accept/accept',
        api: ['business'],
    },
    '/professional/business/await': {
        title: '在办业务',
        path: 'business/await/await',
        api: ['business'],
    },
    '/professional/business/already': {
        title: '已办业务',
        path: 'business/already/already',
        api: ['business'],
    },
    '/professional/business/acceptRegistrationFolder': {
        title: '受理登记夹',
        path: 'business/acceptRegistrationFolder/acceptRegistrationFolder',
        api: ['business', 'search'],
    },
    


    '/professional/analyze/all': {
        title: '全局统计分析',
        path: 'analyze/all/all',
        api: ['analyze', 'business'],
    },
    '/professional/analyze/section': {
        title: '部门统计分析',
        path: 'analyze/section/section',
        api: ['analyze', 'business'],
    },
    '/professional/analyze/self': {
        title: '个人统计分析',
        path: 'analyze/self/self',
        api: ['analyze', 'business'],
    },


    '/professional/search/event/:user/:dep/:prodefs/:status': {
        title: '个人业务查询',
        path: 'searchItem/searchItem',
        api: ['analyze', 'business', 'search'],
    },

    '/professional/search/all': {
        title: '全局业务查询',
        path: 'search/all/all',
        api: ['search'],
    },
    '/professional/search/section': {
        title: '部门业务查询',
        path: 'search/section/section',
        api: ['search'],
    },

    '/professional/mission/:flowid/:state': {
        title: '弹出框',
        path: 'mission/mission',
        api: ['business'],
    },

    '/zrzyBusiness/boundaryPointOutcomeTable/:workid/:trankid/:token/:accessToken/:readonly': {
        title: '界址点成果表表单',
        path: 'zrzyBusiness/boundaryPointOutcomeTable',
        api: ['files', 'boundaryPointOutcomeTable'],
    },
    '/zrzyBusiness/blockInformationAdd': {
        title: '地块列表',
        path: 'zrzyBusiness/blockInformationAdd',
        api: ['boundaryPointOutcomeTable'],
    },
    '/zrzyBusiness/mappingInformation': {
        title: '测绘信息',
        path: 'zrzyBusiness/mappingInformation',
        api: ['files', 'boundaryPointOutcomeTable'],
    },
    '/zrzyBusiness/boundaryPointOutcomeTableAdd': {
        title: '界址点成果表',
        path: 'zrzyBusiness/boundaryPointOutcomeTableAdd',
        api: ['boundaryPointOutcomeTable'],
    },
    '/zrzyBusiness/summaryLandClassifiedArea/:workid/:trankid/:accessToken/:readonly': {
        title: '土地面积分类汇总',
        path: 'zrzyBusiness/summaryLandClassifiedArea',
        api: ['files', 'boundaryPointOutcomeTable'],
    },
    '/zrzyBusiness/landClassifiedArea/:workid/:trankid/:accessToken/:readonly': {
        title: '土地面积分类',
        path: 'zrzyBusiness/landClassifiedArea',
        api: ['files', 'boundaryPointOutcomeTable', 'landClassifiedArea'],
    },
    '/zrzyBusiness/receivingInformation/receivingInformation/:workid/:trankid/:workflowId/:userId/:isFirst/:accessToken/:readonly/:token': {
        title: '收件资料',
        path: 'text/text',
        api: ['files'],
    },
    '/zrzyBusiness/oneMapForBusiness/:workid/:trankid/:accessToken/:readonly/:flowId': {
        title: '业务一张图',
        path: 'oneMapForBusiness/oneMapForBusiness',
        api: ['oneMapForBusiness', 'userMenu'],
    }
}