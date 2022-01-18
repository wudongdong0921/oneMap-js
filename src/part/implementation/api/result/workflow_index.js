import request from '../../../../common/ajax';

var getAchievementsByRoleId = function (data, success) {
    request.post({
        url: '/renren-admin/roleWorkflow/getAchievementsByRoleId',
        devUrl: 'renrenService',
        query: { 
            "roleId": data.roleId,
            "flowId": data.flowId
         },
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};

export default {
    getAchievementsByRoleId:getAchievementsByRoleId

}