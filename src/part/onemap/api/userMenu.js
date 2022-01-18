
import request from '../../../common/ajax';
// import session from '../../component/session';


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

// 获取文档管理、数据目录权限
var getCommonData = function(success) {
    request.get({
        url: '/renren-admin/roleCommon/getCommonData',
        devUrl: 'renrenService',
        token: 'renren',
        success: function (res) {
            success(res);
        },
    })
}

export default {
    getUserMenu: getUserMenu, // 获取用户数据目录列表
    getMapAllList:getMapAllList,//获取所有地图
    getCommonData: getCommonData,   // 获取文档管理、数据目录权限
}
