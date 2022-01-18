import request from '../../../../common/ajax';

var indexOverview = function (data, success) {
    request.get({
        url: '/monitorOverview/indexOverview',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}
var indexOverview2 = function (data, success) {
    request.get({
        url: '/monitorOverview/indexOverview2',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var overproof = function (data, success) {
    request.get({
        url: '/monitorOverview/overproof',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var indexDataShow = function (data, success) {
    request.get({
        url: '/monitorOverview/indexDataShow',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var indexMonitorList = function (data, success) {
    request.get({
        url: '/monitorOverview/indexMonitorList',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var boundaryControlIndicatorsInfo = function (data, success) {
    console.log(data)
    request.get({
        url: '/controlBoundary/boundaryControlIndicatorsInfo',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var boundaryControlIndicatorsRotation = function (data, success) {
    console.log(data)
    request.get({
        url: '/controlBoundary/boundaryControlIndicatorsRotation2',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var boundaryControlIndicatorsRotations = function (data, success) {
    console.log(data)
    request.get({
        url: '/controlBoundary/boundaryControlIndicatorsRotation',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var statisticalColumnChart = function (data, success) {
    request.get({
        url: '/controlBoundary/statisticalColumnChart',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var boundaryControlIndicatorsMap = function (data, success) {
    request.get({
        url: '/controlBoundary/boundaryControlIndicatorsMap',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var indexList = function (data, success) {
    request.get({
        url: '/constraintExpectIndex/indexList',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var warningTrendChart = function (data, success) {
    request.get({
        url: '/overviewOfEarly/warningTrendChart',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var warningColumnChart = function (data, success) {
    request.get({
        url: '/overviewOfEarly/warningColumnChart',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var getIndicatorTypeTree = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/getIndicatorTypeTree',
        token: 'renren',
        devUrl: 'renrenService',
        contentType: 'text',
        data: data,
        success: function (res) {
            success(res);
        },
    });
}

var itemsManageGetPage = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/getPage',
        token: 'renren',
        devUrl: 'renrenService',
        contentType: 'text',
        data: data,
        success: function (res) {
            success(res);
        },
    });
}

var assessmentProportionChart = function (data, success) {
    request.get({
        url: '/assessmentOverview/assessmentProportionChart',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var indexScoreTrendChart = function (data, success) {
    request.get({
        url: '/indexEvaluation/indexScoreTrendChart',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var assessmentTrendChart = function (data, success) {
    request.get({
        url: '/assessmentOverview/assessmentTrendChart',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}   

var warningDetailsInfo = function (data, success) {
    request.get({
        url: '/warningDetails/warningDetailsInfo',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var assessmentMap = function (data, success) {
    request.get({
        url: '/assessmentOverview/assessmentMap',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var assessmentRadarChart = function (data, success) {
    request.get({
        url: '/assessmentOverview/assessmentRadarChart',
        devUrl: 'implementService',
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var cityProportionChart = function (data, success) {
    request.get({
        url: '/indexEvaluation/cityProportionChart',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var getXZQYDicSelectList = function (data, success) {
    request.post({
        url: '/renren-admin/specificAnalysisV2/getDicSelectList?value=XZQY',
        devUrl: 'renrenService',
        success: function (res) {
            success(res);
        },
    });
}

//任航添加字典列表
var getDictList = function (data, success) {
    request.get({
        url: '/renren-admin/public/getDictList',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'type': data.type,
            'value': data.value
        },
        success: function (res) {
            success(res);
        },
    });
};

var implementationEvaluationListPage = function (data, success) {
    request.get({
        url: '/implementationEvaluation/implementationEvaluationListPage',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var uploadReportDetailsByPgId = function (data, success) {
    request.get({
        url: '/implementationEvaluation/uploadReportDetailsByPgId',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var addMaaewIeEnclosure = function (data, success) {
    request.post({
        url: '/implementationEvaluation/addMaaewIeEnclosure',
        devUrl: 'implementService',
        data: data,
        success: function (res) {
            success(res);
        },
    });
}

var deleteMaaewIeInfo = function (data, success) {
    request.post({
        url: '/implementationEvaluation/deleteMaaewIeInfo',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var uploadReportDetailsByXzqhId = function (data, success) {
    request.get({
        url: '/implementationEvaluation/uploadReportDetailsByXzqhId',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var indexEvaluationListPage = function (data, success) {
    request.get({
        url: '/implementationEvaluation/indexEvaluationListPage',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var assessmentReportExcel = function (data, success) {
    request.post({
        url: '/implementationEvaluation/assessmentReportExcel',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

var generateAlertReport = function (data, success) {
    request.post({
        url: '/overviewOfEarly/generateAlertReport',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

export default {
    getDictList: getDictList,//获取字典树
    indexOverview: indexOverview, //指标总览
    indexOverview2: indexOverview2, //预警总览下指标总览
    overproof: overproof, //超标指标列表
    indexDataShow: indexDataShow, //指标列表
    indexMonitorList: indexMonitorList,//走势图
    boundaryControlIndicatorsInfo: boundaryControlIndicatorsInfo,//边界管控指标列表
    boundaryControlIndicatorsRotation: boundaryControlIndicatorsRotation, //边界管控年份获取
    boundaryControlIndicatorsRotations:boundaryControlIndicatorsRotations,
    statisticalColumnChart: statisticalColumnChart,//边界管控柱状图
    boundaryControlIndicatorsMap: boundaryControlIndicatorsMap,//边界管控地图
    indexList: indexList,//约束指标
    warningTrendChart: warningTrendChart,//预警总览，指标预警走势时间趋势图
    warningColumnChart: warningColumnChart,//预警总览，指标分类预警情况
    getIndicatorTypeTree: getIndicatorTypeTree,//预警详情，指标树
    itemsManageGetPage: itemsManageGetPage,//预警详情，列表
    assessmentProportionChart: assessmentProportionChart,//评估总览
    assessmentTrendChart: assessmentTrendChart,//评估总览，分数变化趋势
    indexScoreTrendChart : indexScoreTrendChart,//指标评估右下角柱状图
    warningDetailsInfo: warningDetailsInfo,//预警详情
    assessmentMap: assessmentMap,//评估总览，地图
    assessmentRadarChart: assessmentRadarChart,//评估总览，雷达图
    cityProportionChart: cityProportionChart,//指标评估，扇形图
    getXZQYDicSelectList: getXZQYDicSelectList,//实施评估，获取区域
    implementationEvaluationListPage: implementationEvaluationListPage,//实施评估列表
    uploadReportDetailsByPgId: uploadReportDetailsByPgId,//实施评估详情
    addMaaewIeEnclosure: addMaaewIeEnclosure,//实施评估修改详情
    deleteMaaewIeInfo: deleteMaaewIeInfo,//批量删除实施评估
    uploadReportDetailsByXzqhId: uploadReportDetailsByXzqhId,//实施评估上传报告
    indexEvaluationListPage: indexEvaluationListPage,//实施评估获取生成报告列表
    assessmentReportExcel:assessmentReportExcel,//实施评估，生成报告
    generateAlertReport:generateAlertReport, // 生成预警报告
}