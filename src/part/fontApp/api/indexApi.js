import request from '../../../common/ajax';
var DevUrl = 'renrenService';
import DevLogin from '../../../../public/static/DevModelData/loginApi/index';
var getNavInfo = function (data,success) {
    request.get({
        url: '/renren-admin/sys/menu/getNavInfo',
        token: 'renren',
        devUrl: DevUrl,
        success: function (res) {
            success(res);
        },
        error: function () {
            error();
        }
    });
}
export default config.DevModel == 'true' ? DevLogin : {
    getNavInfo:getNavInfo, // 主页模块权限获取
}