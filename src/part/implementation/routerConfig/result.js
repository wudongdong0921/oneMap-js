////////////////////////////////////////////////
// 成果路由
// 吴野
// 2021-05-18 16:49:37
////////////////////////////////////////////////
export default {
    '/result/home': {
        title: '成果分析首页',
        path: 'result/home/home',
        api: ['']
    },
    //--------------编制进度管理------------------
    '/result/preparation/progress_collection': {
        title: '进度采集',
        path: 'result/preparation/progress_collection/progress_collection_list',
        api: ['result.naRe_rramsScheduleGather','result.ren_rramsPlanResultType'],
    },
    '/result/preparation/progress_collection/other_page/add': {
        title: '成果编制进度采集（新增进度采集页面）',
        path: 'result/preparation/progress_collection/other_page/add/add',
        api: ['result.naRe_rramsScheduleGather','result.ren_rramsPlanResultType'],
    },
 
    '/result/preparation/progress_collection/other_page/detail': {
        title: '成果编制进度采集（查看进度采集页面）',
        path: 'result/preparation/progress_collection/other_page/detail/detail',
        api: ['result.naRe_rramsScheduleGather','result.ren_rramsPlanResultType'],
    },
    '/result/preparation/progress_report': {
        title: '进度填报',
        path: 'result/preparation/progress_report/progress_report_list',
        api: ['result.naRe_rramsScheduleGather','result.ren_rramsPlanResultType'],
    },
      '/result/preparation/progress_report/other_page/add': {
        title: '新建编制进度（编制进度管理-进度填报-新建编制进度）',
        path: 'result/preparation/progress_report/other_page/add/add',
        api: ['result.naRe_rramsScheduleReporting','result.ren_rramsPlanResultType'],
    },
    '/result/preparation/progress_report/other_page/detail': {
        title: '查看编制进度（编制进度管理-进度填报-查看编制进度详情）',
        path: 'result/preparation/progress_report/other_page/detail/detail',
        api: ['result.naRe_rramsScheduleReporting','result.ren_rramsPlanResultType'],
    },
    '/result/preparation/schedule_management': {
        title: '进度管理',
        path: 'result/preparation/schedule_management/schedule_management_list',
        api: ['result.naRe_rramsScheduleGather'],
    },
    '/result/preparation/schedule_management/dailog': {
        title: '进度管理弹出框',
        path: 'result/preparation/schedule_management/schedule_management_dailog',
        api: ['result.naRe_rramsScheduleGather'],
    },
    //--------------规划成果质检------------------
    '/result/quality_testing/inspection': {
        title: '成果质检',
        path: 'result/quality_testing/inspection/inspection_list',
        api: ['result.naRe_achievementQuality','result.ren_rramsPlanResultType','winPub_upload'],
    },
    '/result/quality_testing/inspection/other_page/add': {
        title: '新增质检',
        path: 'result/quality_testing/inspection/other_page/add/inspection_add',
        api: ['result.winPub_upload','result.ren_rramsPlanResultType'],
    },
    '/result/quality_testing/inspection/other_page/detail': {
        title: '成果质检-详情页',
        path: 'result/quality_testing/inspection/other_page/detail/inspection_details',
        api: ['result.naRe_achievementQuality'],
    },
    '/result/quality_testing/inspection/other_page/detail_add': {
        title: '成果质检-详情页-新建质检下一步',
        path: 'result/quality_testing/inspection/other_page/detail/inspection_details_add',
        api: ['result.naRe_achievementQuality'],
    },
    '/result/quality_testing/inspection/other_page/detail/rules': {
        title: '成果质检-详情页-质检细则',
        path: 'result/quality_testing/inspection/other_page/detail/detailed_rules',
        api: ['result.naRe_achievementQuality'],
    },
   
    '/result/quality_testing/results_report': {
        title: '成果报告',
        path: 'result/quality_testing/results_report/results_report_list',
        api: ['result.naRe_achievementQuality','result.ren_rramsPlanResultType'],
    },
    //--------------规划成果审查------------------
    '/result/examination/my_review': {
        title: '我提交的审查',
        path: 'result/examination/my_review/my_review_list',
        api: ['result.naRe_review'],
    },
    '/result/examination/my_review/new_review': {
        title: '新建审查',
        path: 'result/examination/my_review/new_review/new_review',
        api: ['result.naRe_review'],
    },
    '/result/examination/wait_to_do': {
        title: '待办审查',
        path: 'result/examination/wait_to_do/wait_to_do_list',
        api: ['result.naRe_review'],
    },
    '/result/examination/finished': {
        title: '已办审查',
        path: 'result/examination/finished/finished_list',
        api: ['result.naRe_review'],
    },
    '/result/examination/review_inquiry': {
        title: '审查查询',
        path: 'result/examination/review_inquiry/review_inquiry_list',
        api: ['result.naRe_review'],
    },
    '/result/examination/review_iframe': {
        title: '成果审查详情',
        path: 'result/examination/review_iframe/review_iframe',
        api: [''],
    },
    '/result/examination/ceshi': {
        title: '测试',
        path: 'result/examination/ceshibox/ceshi',
        api: [''],
    },
    '/result/examination/common_page': {
        title: '流程图',
        path: 'result/examination/common_page/flowChart',
        api: [''],
    },
    '/result/examination/result_detail/:reviewState/:readonly/:btn/:icon/:cgxxbId': {
        title: '详情页',
        path: 'result/examination/result_detail/result_detail',
        api: ['result.naRe_review'],
    },
    '/result/examination/result_dialog': {
        title: '详情页-弹出框',
        path: 'result/examination/result_detail/result_dialog/result_dialog',
        api: ['result.naRe_review'],
    },
    '/result/examination/split': {
        title: '分屏对比',
        path: 'result/examination/result_detail/split/split',
        api: ['result.naRe_review'],
    },
    //--------------规划成果管理------------------
    '/result/management/achievement_storage': {
        title: '成果入库',
        path: 'result/management/achievement_storage/achievement_storage_list',
        api: ['result.naRe_achievementManage','result.ren_rramsPlanResultType'],
    },
    '/result/management/achievement_storage/other_page/detail/confirm': {
        title: '成果入库（确认入库）',
        path: 'result/management/achievement_storage/other_page/detail/confirm_warehousing',
        api: ['result.naRe_achievementManage'],
    },
    // '/result/management/achievement_storage/other_page/detail/storage': {
    //     title: '成果入库(成果质检-详情页)',
    //     path: 'result/management/achievement_storage/other_page/detail/storage_details',
    //     api: [''],
    // },


    '/result/management/achievement_storage/review_iframe': {
        title: '成果详情',
        path: 'result/management/achievement_storage/review_iframe/review_iframe',
        api: [''],
    },
    '/result/management/achievement_storage/common_page': {
        title: '流程图',
        path: 'result/management/achievement_storage/common_page/flowChart',
        api: [''],
    },
    '/result/management/achievement_storage/other_page/detail/storage_detail/:reviewState/:readonly/:btn/:icon/:cgxxbId': {
        title: '详情页',
        path: 'result/management/achievement_storage/other_page/detail/storage_details',
        api: ['result.naRe_review'],
    },
    '/result/management/achievement_storage/other_page/detail/detail_dialog': {
        title: '详情页-弹出框',
        path: 'result/management/achievement_storage/other_page/detail/detail_dialog/detail_dialog',
        api: ['result.naRe_review'],
    },

    '/result/management/achievement_storage/other_page/detail/log': {
        title: '入库日志（日志）',
        path: 'result/management/achievement_storage/other_page/detail/log_storage',
        api: [''],
    },
    '/result/management/overview_achievements': {
        title: '成果总览',
        path: 'result/management/overview_achievements/overview_achievements_index',
        api: ['result.naRe_overViewAchievement'],
    },
    '/result/management/result_tree': {
        title: '成果一棵树',
        path: 'result/management/result_tree/result_tree_index',
        api: ['result.ren_rramsPlanResultType','result.naRe_achievementManage'],
    },
    '/result/management/result_tree/other_page/tree_detail': {
        title: '查看审查详情',
        path: 'result/management/result_tree/other_page/tree_detail/tree_detail',
        api: ['result.ren_rramsPlanResultType','result.naRe_achievementManage'],
    },
    '/result/management/comparison_achievements': {
        title: '规划成果对比',
        path: 'result/management/comparison_achievements/comparison_achievements_index',
        api: ['result.ren_rramsPlanResultType','result.naRe_achievementManage'],
    },


    /** 成果新需求增加 */
    '/result/workflow/index': {
        title: '成果汇交',
        path: 'result/workindex/workflowIndex',
        api: ['result.workflow_index'],
    },
    '/result/rramsAchievementForm/:workid/:trankid/:flowid/:nodeid/:accessToken/:readonly': {
        title: '土地面积分类',
        path: 'result/achievement/rramsAchievementForm',
        api: ['result.rrams_achievement'],
    },
    '/result/achievement/rramsfile_details': {
        title: '规划成果-详情页',
        path: 'result/achievement/rramsfile_details',
        api: ['result.ren_rramsPlanResultType','result.naRe_achievementManage'],
    },
    '/result/mission/:flowid/:state': {
        title: '弹出框',
        path: 'result/mission/mission',
        api: ['result.rrams_achievement'],
    },

}