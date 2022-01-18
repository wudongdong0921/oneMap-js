import request from '../../../../common/ajax';

var getInfoByWorkid = function (data, success) {
    request.post({
        url: '/achievementManage/queryRramsAchievementByWorkId',
        token: 'renren',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
};

var dowloadFileZip = function (data, success) {
    request.post({
        url: '/fileTreeController/getResultZipUrlByCgfjxxbId',
        token: 'renren',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        },
    });
};

var getTreeTopLevel = function (data, success) {
    request.post({
        url: '/fileTreeController/getTreeTopLevel',
        token: 'renren',
        devUrl: 'implementService',
        query: data,
        async: false,
        success: function (res) {
            success(res);
        },
    });
};

var getProdefByRoleId = function (data, success) {
    request.post({
        url: '/renren-admin/roleWorkflow/getProdefByRoleId',
        devUrl: 'renrenService',
        query: { "roleId": data },
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};

export default {
    getInfoByWorkid: getInfoByWorkid,
    dowloadFileZip: dowloadFileZip,
    getTreeTopLevel: getTreeTopLevel,
    getProdefByRoleId: getProdefByRoleId,
}