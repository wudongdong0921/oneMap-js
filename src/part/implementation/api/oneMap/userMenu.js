
import request from '../../../../common/ajax';


var getUserMenu = function (data, success) {
    request.post({
        url: '/renren-admin/sys/user/getDataDir',
        devUrl: 'renrenService',
        token: 'renren',
        query: {
            flowId: data.flowId
        },
        success: function (res) {
            success(res);
        },
    });
};
var getMapAllList = function(success) {
    request.get({
        url: '/renren-admin/pictureMapController/getAll',
        devUrl: 'renrenService',
        success: function (res) {
            success(res);
        },
    });
}

export default {
    getUserMenu: getUserMenu, // 获取用户数据目录列表
    getMapAllList:getMapAllList
}
