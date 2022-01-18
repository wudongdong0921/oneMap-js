import request from '../../../common/ajax';
import DevLogin from '../../../../public/static/DevModelData/loginApi/index'
var session = icu.session;
var DEVURL = 'renrenService'
var COMMONURL = 'commonService'
var loginForHuizheng = function (data, success, error) {
    request.post({
        url: '/wintoppublicinterfaceGW/workflow/login',
        data: {
            loginName: data.username,
            password: data.password,
        },
        devUrl: COMMONURL,
        success: function (res) {
            if (res.code == 0) {
                session.set('huizheng-token', res.data.accessToken);
                success();
            } else {
                layer.open({
                    title: '警告',
                    content: res.message
                });
                error();
            };
        },
    });
};

var getUserInfo = function (success, error) {
    request.get({
        url: '/renren-admin/sys/user/info',
        token: 'renren',
        dataType: 'xml',
        devUrl: DEVURL,
        success: function (res) {
            session.set('userInfo', res.data);
            // console.log('setUserName');
            // window.layout.setUserName(res.data.realName);
            loginForHuizheng({
                username: res.data.username,
                password: res.data.password,
            }, function () {
                success(res);
            });
        },
        error: function () {
            error();
        }
    });
}

var getMenuList = function (success, error) {
    request.get({
        url: '/renren-admin/sys/menu/navYW',
        token: 'renren',
        dataType: 'xml',
        devUrl: DEVURL,
        success: function (res) {
            try {
                var haveNav = false;
                // var data = res.data[0].children;
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
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
                    session.set('nav', res.data);
                    success(res);
                };
            } catch (errorMessage) {
                error();
            };
        },
    });
};

var login = function (data, success, error) {
    data.password = encode64(data.password);
    request.post({
        url: '/renren-admin/login',
        data: data,
        devUrl: DEVURL,
        success: function (res) {
            if (res.code == 0 && res.data && res.data.token) {
                session.set('token', res.data.token);
                // 获取权限菜单
                getMenuList(function () {
                    // 获取用户信息
                    getUserInfo(function () {
                        success();
                    }, function () {
                        error();
                    });
                }, function () {
                    error();
                });
            } else if (!res.data || !res.data.token) {
                layer.open({
                    title: '警告',
                    content: '用户名或密码不正确'
                });
            } else {
                if (res.msg == '用户名或密码不正确') {
                    error(res.msg);
                } else if (res.msg == '验证码不正确') {
                    error(res.msg);
                } else {
                    layer.open({
                        title: '警告',
                        content: res.msg
                    });
                };
            };
        },
    });
};
// base64加密开始
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
    + "wxyz0123456789+/" + "=";
function encode64(input) {

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}

var updatePassword = function (data, success, error) {
    request.put({
        url: '/renren-admin/sys/user/password',
        data: data,
        token: 'renren',
        devUrl: DEVURL,
        success: function (res) {
            if (res.code == 0) {
                success(res)
            } else {
                if (res.msg == '账号或密码错误') {
                    error(res.msg);
                } else {
                    layer.open({
                        title: '警告',
                        content: res.msg
                    });
                };
            };
        },
    });
}

var getNavInfo = function (data, success) {
    request.get({
        url: '/renren-admin/sys/menu/getNavInfo',
        token: 'renren',
        devUrl: DEVURL,
        success: function (res) {
            success(res);
        },
        error: function () {
            error();
        }
    });
}
export default config.DevModel == 'true' ? DevLogin : {
    login: login, // 登录
    getMenuList: getMenuList, // 获取目录列表
    getUserInfo: getUserInfo, // 获取用户信息
    loginForHuizheng: loginForHuizheng, //慧正工作流登录
    // captcha: captcha,// 获取验证码
    updatePassword: updatePassword,//修改密码
    getNavInfo: getNavInfo, // 主页模块权限获取
}