const session = icu.session;

export default {
    render: function () {
        var laydate = layui.laydate,
            form = layui.form;
        var _this = this;
        var userInfo = session.get('userInfo');
        _this.$el.find("#username").val(userInfo.realName);
        _this.$el.find('#updatePassword').click(function () {
            var passwordOld = _this.$el.find("#passwordOld").val();
            var passwordNew1 = _this.$el.find("#passwordNew1").val();
            var passwordNew2 = _this.$el.find("#passwordNew2").val();
            if(passwordOld==""||passwordNew1==""||passwordNew2==""){
                layer.msg("请确认好是否全部填写，再修改");
            }else{
                if(passwordNew1==passwordNew2){
                    _this.$api.updatePassword({
                        password:passwordOld,
                        confirmPassword:passwordNew1,
                        newPassword:passwordNew2,
                    }, function (data) {
                        if (data.code == 0) {
                            layer.msg("密码修改成功，请重新登录");
                            // 清除用户缓存记录
                            _this.$data.logout();
                            _this.closeEvent();
                        } else {
                            layer.msg(data.msg);
                        }
                    }, function (data) {
                        layer.msg(data.msg);
                    })
                }else{
                    layer.msg("两次填写的新密码不一致");
                }
            }
        });
    }
}


