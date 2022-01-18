import request from '../../../../common/ajax';
var session = icu.session;

var getPage = function (data, success) {
    // 获取登录用户区划代码
    var areacodeList = session.get('userInfo').areacodeList;
    var districtCodes = [];
    if (areacodeList && areacodeList.length > 0) {
        for (let i = 0; i < areacodeList.length; i++) {
            if (areacodeList[i] !== null) {
                districtCodes.push(areacodeList[i]);
            }
        }
    }

    request.post({
        url: '/rramsScheduleReporting/getPage',
        devUrl: 'implementService',
        query: {
            'pageNum': data.pageNum,   // 当前页数 (Integer)
            'pageSize': data.pageSize, // 每页数量 (Integer)
            'ghcglxId': data.ghcglxId,  // 规划成果类型编码 (string)
            'workProgressCode': data.workProgressCode, // 工作进展编码 (string)
            'districtCodes': districtCodes, // 行政区代码 (Array)
        },
        success: function (res) {
            success(res);
        },
    });
};

var selectRramsScheduleReportingById = function (data, success) {
    request.post({
        url: '/rramsScheduleReporting/selectRramsScheduleReportingById',
        devUrl: 'implementService',
        query: {
            'jdtbxxbId': data.jdtbxxbId,    // 进度填报信息表编码 (string)
        },
        success: function (res) {
            success(res);
        },
    });
};

var selectRramsSrCentreById = function (data, success) {
    request.post({
        url: '/rramsScheduleReporting/selectRramsSrCentreById',
        devUrl: 'implementService',
        query: {
            'jdtbxxbId': data.jdtbxxbId,     // 进度填报信息表编码 (string)
        },
        success: function (res) {
            success(res);
        },
    });
};

var saveRramsScheduleReportingInfo = function (data, success,error) {
    request.post({
        url: '/rramsScheduleReporting/saveRramsScheduleReportingInfo',
        devUrl: 'implementService',
        data: {
            "jdtbxxbId": data.jdtbxxbId,                    // 进度填报信息表编码 (string)
            "workProgressCode": data.workProgressCode,      // 工作进展编码 (string)
            "progressCase": data.progressCase,              // 进展情况 (string)
            "reportingUser": session.get('userInfo').id,            // 填报人 (string)
            "updateUser":session.get('userInfo').id,                  //修改人
        },
        token: true,
        success: function (res) {
            success(res);
        },
        error:function(res){
            // icu.alert.error({
            //     title: res.responseJSON.msg
            // });
            // top.layer.msg(err.responseJSON.msg)
            error(res);
        }
    });
};

export default {
    getPage: getPage,                                                         // 进度填报-查询功能
    selectRramsScheduleReportingById: selectRramsScheduleReportingById,       // 进度填报-详情查看
    selectRramsSrCentreById: selectRramsSrCentreById,                         // 进度填报-工作进展查询
    saveRramsScheduleReportingInfo: saveRramsScheduleReportingInfo,           // 进度填报-添加/修改
}