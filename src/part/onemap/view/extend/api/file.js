import DevLogin from '../../../../../../public/static/DevModelData/loginApi/index'
import request from '../../../../../common/ajax'

// 文件目录树
var fileTree = function(data, success) {
    request.get({
        url: '/renren-admin/documnet/fileTree/' + data,
        devUrl: 'renrenService',
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
}

export default config.DevModel == 'true' ? DevLogin : {
    fileTree: fileTree, // 文件目录树
}