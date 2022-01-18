import request from '../../../../common/ajax';

var fileUpload = function (data, success) {
    request.post({
        url: '/wintopachieve/upload/file-upload',
        devUrl: 'commonServiceSF',
        contentType: 'multipart/form-data',
        data: data,
        // query: {
        //     'file': data.file, // 规划成果类型 (String) 
        //     'planningResultName': data.planningResultName, // 审查状态（0未审查、1审查中、2审查完毕、3驳回） (String) 
        //     'planningResultCode': data.planningResultCode,// 行政区划代码 (String) 
        //     'username': data.username,
        // },
        success: function (res) {
            success(res);
        },
    });
};

var getPercent = function (data, success) {
    request.get({
        url: '/wintoppublicinterfaceGW/upload/getPercent',
        devUrl: 'commonService',
        query: {},
        success: function (res) {
            success(res);
        },
    });
};

export default {
    fileUpload: fileUpload,        //成果包上传接口(实时进度)
    getPercent: getPercent,         //成果包上传进度获取接口


}