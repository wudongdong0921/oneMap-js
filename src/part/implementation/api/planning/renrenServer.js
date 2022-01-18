////////////////////////////////////////////////
// 所有调用人人得接口及业务逻辑处理
// 吴野
// 2021-01-19 10:44:20
////////////////////////////////////////////////
import request from '../../../../common/ajax';

var DevUrl = 'renrenService'; // 人人接口配置项

var getIndicatorTypeTree = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/getIndicatorTypeTree',
        devUrl: DevUrl,
        token: 'renren',
        contentType: 'text',
        data: data,
        success: function (res) {
            if (res.code == 200) {
                success(res);
            } else {
                _$alert('服务器出错！');
            }

        },
    });
}
var getIndicatorTypeList = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/getPage',
        devUrl: DevUrl,
        token: 'renren',
        contentType: 'text',
        data: data,
        success: function (res) {
            if (res.code == 200) {
                success(res);
            } else {
                _$alert('服务器出错！');
            }

        },
    });
}

export default {
    getIndicatorTypeTree: getIndicatorTypeTree,                   // 获取指标类型树（用于：规划实施评估）
    getIndicatorTypeList: getIndicatorTypeList,                   // 根据指标类型获取列表（用于：规划实施评估）
}