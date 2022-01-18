
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


export default {
    getUserMenu: getUserMenu, // 获取用户数据目录列表
}
