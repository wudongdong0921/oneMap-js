import request from '../../../../common/ajax';
var DevUrl = 'AnalysisServiceTest'
var createTask = function (data, success) {
    request.post({
        url: '/auxLocation/createTask',
        devUrl: DevUrl,
        contentType: 'json',
        data: data,
        success: function (res) {
            if (res.code == '200') {
                success(res);
            } else {
                console.log('请求数据失败');
            }

        },
    });
}

var auxiliaryAnalysisJava = function () {
    request.post({
        url: '/auxiliaryAnalysisScriptcontroller/auxiliaryAnalysisJava',
        devUrl: DevUrl,
        contentType: 'json',
        success: function () {
        }
    });
}


var executeImplementSupervision = function () {
    request.post({
        url: '/analysisScriptController/executeImplementSupervision',
        devUrl: 'distributedanalysis',
        contentType: 'json',
        success: function () {
        }
    });
}

var getTaskStatus = function (data, success) {
    request.get({
        url: '/auxLocation/getTaskStatus',
        devUrl: DevUrl,
        contentType: 'text',
        data: data,
        loading: false,
        success: function (res) {
            if (res.code == '200') {
                success(res);
            } else {
                console.log('请求数据失败');
            }

        },
    });
}
var forceFinish = function (data, success) {
    request.get({
        url: '/auxLocation/forceFinish',
        devUrl: DevUrl,
        contentType: 'text',
        data: data,
        loading: false,
        success: function (res) {
            if (res.code == '200') {
                success(res);
            } else {
                console.log('请求数据失败');
            }

        },
    });
}
export default {
    createTask: createTask,                   //获取字典树数据接口（双评价中开发适宜性评价）
    getTaskStatus: getTaskStatus,              // 获取上传状态
    forceFinish:forceFinish,                  // 强行终止
    auxiliaryAnalysisJava:auxiliaryAnalysisJava, //执行辅助选址任务
    executeImplementSupervision:executeImplementSupervision, //执行辅助选址任务 分布式分析服务
}