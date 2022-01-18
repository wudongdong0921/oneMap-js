////////////////////////////////////////////////
// 规划分析路由配置
// 吴野
// 2020-12-08 16:51:28
////////////////////////////////////////////////
export default {
    // -----首页-----
    '/planning/home': {
        title: '规划分析评价',
        path: 'planning/home/home',
        api: ['']
    },
    // -----双评价-----
    '/planning/double_evaluation/resource_carrying': {
        title: '开发适宜性评价',
        path: 'planning/double_evaluation/resource_carrying/main',
        api: ['planning.map','oneMap.userMenu', 'planning.doubleEvaluation','planning.natureResource']
    },
    '/planning/double_evaluation/bear_weight': {
        title: '资源环境承载能力',
        path: 'planning/double_evaluation/bear_weight/main',
        api: ['planning.map','oneMap.userMenu', 'planning.doubleEvaluation','planning.natureResource']
    },
    // -----双评估-----
    '/planning/double_assess/implement': {
        title: '规划实施评估',
        path: 'planning/double_assess/implement/main',
        api: ['planning.renrenServer','planning.map','planning.natureResource']
    },
    '/planning/double_assess/risk': {
        title: '风险识别',
        path: 'planning/double_assess/risk/main',
        api: ['planning.map','oneMap.userMenu', 'planning.doubleEvaluation','planning.natureResource']
    },
    // -----规划实施-----
    '/planning/plan_implementation/analyse': {
        title: '合规性分析',
        path: 'planning/plan_implementation/analyse/main',
        api: ['planning.map','oneMap.userMenu']
    },
    '/planning/plan_implementation/site': {
        title: '辅助选址',
        path: 'planning/plan_implementation/site/main',
        api: ['planning.map','oneMap.userMenu','planning.natureResource']
    },
    // 开始分析
    '/planning/component/staticAnalyse': {
        title: '开始分析',
        path: 'planning/component/staticAnalyse/startAnalyse',
        api: ['planning.oneMap','planning.natureResource']
    },
}
