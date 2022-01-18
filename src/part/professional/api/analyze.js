import request from '../../../common/ajax';
var session = icu.session;


var getAnalyze = function (data, success) {
    request.post({
        url: '/manage/businessStatistics',
        devUrl: 'affairService',
        token: 'renren',
        data: data,
        success: function (res) {
            success(res);
        },
    });
}



var getALL = function (success) {
    getAnalyze({
        "prodefs": "",
        "userId": "",
        "deptId": ""
    }, success);
};


var getByDeptId = function (success) {
    getAnalyze({
        "prodefs": "",
        "userId": "",
        "deptId": session.get('userInfo').deptId
    }, success);
};


var getByUserId = function (success) {
    getAnalyze({
        "prodefs": "",
        "userId": session.get('userInfo').id,
        "deptId": "",
    }, success);
};
var getChartData = function (success) {
    request.post({
        url: '/manage/getCountForProdefNum',
        devUrl: 'affairService',
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};

var getChartData1 = function (success) {
    request.post({
        url: '/manage/getCountForProdefNumByUserId',
        devUrl: 'affairService',
        token: 'renren',
        data: {
            "userId": session.get('userInfo').id
        },
        success: function (res) {
            success(res);
        },
    });
};


export default {
    getALL: getALL, // 获取全部数据
    getByDeptId: getByDeptId, // 获取部门数据
    getByUserId: getByUserId, // 获取用户数据
    getChartData: getChartData, // 获取首页饼图数据
    getChartData1: getChartData1,
}