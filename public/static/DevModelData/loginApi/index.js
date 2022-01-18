import LoginInfo from './loginInfo';
var session = icu.session;

var login = function (data, success, error) {
    session.set('token', LoginInfo['/renren-admin/login'].data.token);
    getMenuList(function () {
        getUserInfo(function () {
            success()
        }, function () {
            error()
        })
    }, function () {
        error();
    })
    success(LoginInfo['/renren-admin/login'])
};

var getMenuList = function (success, error) {
    var haveNav = false;
    var menuData = LoginInfo['/renren-admin/sys/menu/navYW'];
    for (let i = 0; i < menuData.data.length; i++) {
        const element = menuData.data[i];
        if (element.name == '自然资源') {
            for (let d = 0; d < element.children.length; d++) {
                const __element = element.children[d];
                if (__element.name == '系统前台') {
                    haveNav = true;
                    session.set('nav', __element.children);
                    success(__element.children);
                }
            }
        } else if (element.name == '系统前台') {
            haveNav = true;
            session.set('nav', element.children);
            success(element.children);
        };
    };

    if (!haveNav) {
        session.set('nav', menuData.data);
        success(menuData);
    };
};
var getUserInfo = function (success, error) {
    var userInfo = LoginInfo['/renren-admin/sys/user/info'];
    session.set('userInfo', userInfo.data);
    loginForHuizheng({},function(res){
        success(res)
    });
    success(userInfo);
};
var loginForHuizheng = function (data, success, error) {
    var huizhengInfo = LoginInfo['/wintoppublicinterfaceGW/workflow/login'];
    session.set('huizheng-token', huizhengInfo.data.accessToken);
    success(huizhengInfo);
};
var getNavInfo = function(data, success, error){
    var menuData = LoginInfo['/renren-admin/sys/menu/getNavInfo'];
    success(menuData)
}
export default {
    login: login,// 登录
    getMenuList: getMenuList, // 获取目录列表
    getUserInfo: getUserInfo, // 获取用户信息
    loginForHuizheng: loginForHuizheng, //慧正工作流登录
    getNavInfo:getNavInfo
}