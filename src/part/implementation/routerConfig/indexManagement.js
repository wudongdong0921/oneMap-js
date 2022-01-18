export default {
    '/indexManagement/home': {
        title: '指标管理首页',
        path: 'indexManagement/home/home',
        api: ['']
    },
    //-------------- 指标管理 ------------------
    '/indexManagement/indicators': {
        title: '指标项',
        path: 'indexManagement/indicators/indicators_index',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/indicators/other_page/details': {
        title: '指标项-详情',
        path: 'indexManagement/indicators/other_page/details/indicators_details',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/system': {
        title: '指标体系',
        path: 'indexManagement/system/system_index',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/system/other_page/details': {
        title: '指标体系-详情',
        path: 'indexManagement/system/other_page/details/system_details',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/planning': {
        title: '指标规划值',
        path: 'indexManagement/planning/planning_index',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/planning/other_page/details': {
        title: '指标规划值-详情',
        path: 'indexManagement/planning/other_page/details/planning_details',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/detection': {
        title: '指标监测值',
        path: 'indexManagement/detection/detection_index',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/detection/other_page/details': {
        title: '指标监测值-详情',
        path: 'indexManagement/detection/other_page/details/detection_details',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/assessment': {
        title: '指标实施评估值',
        path: 'indexManagement/assessment/assessment_index',
        api: ['result.re_IndexManagement'],
    },
    '/indexManagement/assessment/other_page/details': {
        title: '指标实施评估值',
        path: 'indexManagement/assessment/other_page/details/assessment_details',
        api: ['result.re_IndexManagement'],
    },
   
}