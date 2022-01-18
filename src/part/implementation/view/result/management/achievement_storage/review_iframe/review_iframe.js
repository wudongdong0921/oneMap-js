import horizon from '../../../../../../../common/horizon/horizonCustomForm'
export default {
    render: function () {
        var _this = this;
        // 删除弹出框的关闭按钮，只保留弹出框按钮
        _this.DialogPatent.closeElement.hide();

        console.log(_this.$data.reviewState);

        setTimeout(() => {
            var width = _this.$el.width();
            var height = _this.$el.height() - 5;
            var accessToken = icu.session.get('huizheng-token');
            // var token = session.get('token'); // 可以尝试在详情页面中 通过session 获取 如果获取不到，在此处获取传值
            var userInfo = icu.session.get('userInfo')
            _this.$el.find('.mission-body').append('<iframe name="from" ' +
                'style="padding:0;margin:0;border:none;" ' +
                'height="' + height + 'px" width="' + width + 'px" ' +
                'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
                'workId=' + _this.$data.huizhengWorkid + '&' +
                'trackId=' + _this.$data.huizhengTrackid + '&' +
                // 'token=' + token + '&' + // 可以尝试在详情页面中 通过session 获取 如果获取不到，在此处获取传值
                'accessToken=' + accessToken +
                '&subjection=D_D' + userInfo.deptId +
                '&reviewState=' + _this.$data.reviewState +
                '&icon=' + _this.$data.icon +
                '&readonly=' + _this.$data.readonly +
                '&btn=' + _this.$data.btn +
                '&cgxxbId=' + this.$data.cgxxbId +
                '"></iframe>');

            // 关闭按钮调用事件
            var openTime = new Date().getTime();
            var myFunction = function (event) {
                console.log(event.data);
                if (event.data == 'closeEvent') {
                    window.removeEventListener("message", myFunction);
                    horizon.post();
                    _this.closeEvent();
                    horizon.clearPostData();
                };
                if (event.data == 'logoutEvent') {
                    window.removeEventListener("message", myFunction);
                    _this.closeEvent();
                    layout.go('/login', {});
                };
                //业务数据保存
                if(event.data && typeof event.data == 'string'){
                    if (event.data.indexOf(horizon.prefix + '$$$') != -1) {
                        var res = event.data.replace(horizon.prefix + '$$$', '');
                        res = JSON.parse(res);
                        var dataKey = res['dataKey'];
                        var postUrl = res['postUrl'];
                        if(postUrl && dataKey){
                            horizon.postData.set(dataKey,res);
                        }
                    } else if(event.data.indexOf('HORIZONCUSTOMDATA_CLEAR$$$') != -1){
                        horizon.clearPostData();
                    } else if (event.data.indexOf('OPEN_FILES_FUNCTION') != -1){
                        var newOpenTime = new Date().getTime();
                        if(newOpenTime - openTime >= 1000) {
                            openTime = newOpenTime;
                            var _dialog = implementationDialog({
                                top: '25px',
                                width: '90%',
                                height: '95%',
                                path: '/result/achievement/rramsfile_details',
                                params:{
                                    planningResultId: event.data.replace('OPEN_FILES_FUNCTION$$$', '')
                                },
                                title: '规划成果',
                                events: {},
                                end: function () {
                                    _this.closeEvent();
                                },
                            });

                            _dialog.body.css({
                                'background': 'rgb(239,241,242)'
                            });
                        }

                    }
                }
            };
            window.addEventListener('message', myFunction);
        }, 200);
    },
    destroy: function () {

    },
}