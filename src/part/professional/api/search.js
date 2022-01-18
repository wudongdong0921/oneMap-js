import request from '../../../common/ajax';
// import session from '../component/session'
var session = icu.session;

var searchAll = function (data, success) {
    request.post({
        url: '/manage/queryGlobalBusinessList',
        data: {
            "flowName": data.flowname,
            "flowType": (data.typename == '其他' ? '' : data.typename),
            "projectNameOrNum": data.projectNameOrNum,
            "prodefs": data.prodefs || "",
            "userId": (data.userId ? session.get('userInfo').id : ''),
            "deptId": (data.deptId ? session.get('userInfo').deptId : ''),
            "status": (data.status ? data.status : ''),
        },
        query: {
            page: data.page,
            limit: data.limit
        },
        devUrl: 'affairService',
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};

var acceptRegistrationFolderList = function (data, success) {
    request.post({
        url: '/manage/acceptRegistrationFolderList',
        data: {
            "flowName": data.flowname,
            "flowType": (data.typename == '其他' ? '' : data.typename),
            "projectNameOrNum": data.projectNameOrNum,
            "prodefs": data.prodefs || "",
            "userId": (data.userId ? session.get('userInfo').id : ''),
            "deptId": (data.deptId ? session.get('userInfo').deptId : ''),
            "status": (data.status ? data.status : ''),
        },
        query: {
            page: data.page,
            limit: data.limit
        },
        devUrl: 'affairService',
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};

export default {
    searchAll: searchAll, // 搜索全部接口
    acceptRegistrationFolderList: acceptRegistrationFolderList, // 受理登记夹
}