////////////////////////////////////////////////
// 登录主文件
// Kris
// 2021-04-29 14:15:30
////////////////////////////////////////////////
// import staticConfig from '../../staticConfig';
import forget from './forget';
var util = icu.util;
var session = icu.session;
var storage = icu.storage;
export default {
    render: function () {
        console.log(this)
        var _this = this;
        // 设置背景图
        this.$el.find('.login').css({
            'background-image': config.staticConfig.login.bg
        });
        // 设置浏览器标题
        document.getElementsByTagName('title')[0].innerText = config.staticConfig.login.pageTitle;
        // 设置登录页面标题
        this.$el.find('.login-title-text img').attr('src', config.staticConfig.login.bgTitle);
        // 删除缓存中登录信息
        session.remove('menuList');
        session.remove('userInfo');
        session.remove('huizheng-token');
        session.remove('token');
        var uuid = null;
        uuid = util.uuid();
        // 记住用户名密码组件方法
        forget.ele = forget.event();
        this.$el.find('.forget').append(forget.ele);
        forget.set(!storage.get('forgetUsername'));
        if (!storage.get('forgetUsername') && storage.get('loginName')) {
            this.$el.find('#username').val(storage.get('loginName'));
        }
        // 登录方法
        this.$el.find('#login').click(function () {
            login();
        });
        $(document).bind('keyup',function(event){
            if (event.keyCode == "13") {
                login();
            }
        })
        var login = function () {
            // 获取username用户名
            var username = _this.$el.find('#username').val();
            if (!username) {
                layer.tips('用户名不能为空', _this.$el.find('#username'), {
                    tips: [3, '#ff5722'],
                    time: 1000
                });
                _this.$el.find('#username').focus();
                return false;
            };
            var password = _this.$el.find('#password').val();
            if (!password) {
                layer.tips('密码不能为空', _this.$el.find('#password'), {
                    tips: [3, '#FF5722'],
                    time: 1000
                });
                _this.$el.find('#password').focus();
                return false;
            };
            var isForget = !forget.checkStatus;
            _this.$api.login({
                username: username,
                password: password,
                captcha: '100',
                uuid: uuid
            }, function (res) {
                if (!isForget) {
                    storage.set('loginName', username);
                    layout.init();
                };
                // session.set('token', 'false');
                // session.set('nav', 'false');
                // session.set('huizheng-token', 'false');
                // session.set('userInfo', 'false');
                layout.init();
            },function(errorMessages){
                if (errorMessage == '账号或密码错误') {
                    layer.tips('账号或密码错误', _this.$el.find('#username'), {
                        tips: [3, '#FF5722']
                    });
                    _this.$el.find('#username').focus();
                } else {
                    layer.open({
                        title: '警告',
                        content: '登录失败，请检查账户信息'
                    });
                };
            });
        };
    },
    destroy: function () {
        $(document).unbind('keyup');
    },
}


