var session = icu.session;

var userInfo = function (el) {
    this.event = {
        logout: function () { },
    };
    this.html = el;
    this.username = $('<span class="username"></span>')

    this.forgetPassword=$('<span class="forgetPassword">修改密码</span>');

    this.userInfo = $('<div style="display: inline-block;line-height: 35px;text-align: center;vertical-align: middle;"></div>').appendTo(this.html);
    this.userInfo.append( this.username);
    this.userInfo.append('<br>' );
    this.userInfo.append( this.forgetPassword);



    this.loginIcon = $('<i class="fa fa-sign-out" aria-hidden="true"></i>').appendTo(this.html);

    this.loginIcon.click(() => {
        // 打开确认框
        layer.confirm('确定退出系统吗?', {
            skin: "con-skin",
            btn: ['确定', '取消']//按钮
        }, (res) => {
            // 关闭确认框
            layer.close(res);
            // 清除用户缓存记录
            session.clear();
            // 跳转到登录页面
            this.event.logout();
        });
    });
    this.forgetPassword.click(() => {
        top.fontAppDialog({
            title: '修改密码',
            top: '20%',
            width: '600px',
            height: '50%',
            showClose: true,
            params : {
                logout : ()=>{
                    this.event.logout()
                }
            },
            path: '/login/forgetPassword',
            onClose: function () {

            },
        });
    });
};

userInfo.prototype.setUserName = function (name) {
    this.username.text(name);
};

userInfo.prototype.on = function (key, event) {
    if (this.event.hasOwnProperty(key)) {
        this.event[key] = event;
    };
};

export default userInfo;