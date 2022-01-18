
// import config from '../../config/config'
var session = icu.session;
// import layoutEX from '../../frame/layout';
import horizon from '../../../../common/horizon/horizonCustomForm'

var timer = null;


export default  {
    render: function (template, params, closeEvent) {
        var _this = this;
        _this.DialogPatent.closeElement.hide();

        var roleIdList = session.get('userInfo').roleIdList;
        var roleId = "";
        if (roleIdList.length == 0) {
            roleId = roleIdList.get(0);
        } else {
            for (var i = 0; i < roleIdList.length; i++) {
                if (i == roleIdList.length - 1) {
                    roleId += roleIdList[i];
                } else {
                    roleId += roleIdList[i] + ",";
                }
            }
        }
        var $typeName;
        var allData;
        _this.$api.getProdefByRoleId(roleId, function (res) {
            allData = res.data
            for (const i in allData) {
                if (allData[i].flowid == _this.$data.flowid) {
                    $typeName = allData[i].typename;
                }
            }
            // renderList(res.data)
        });
        setTimeout(() => {
            var width = _this.$el.width();
            var height = _this.$el.height() - 5;
            var accessToken = session.get('huizheng-token');
            var token = session.get('token');

            var showsubmit = _this.$data.showsubmit;

            if (_this.$query.state == 'accept') { // 创建流程
                _this.$el.find('.mission-body').append('<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
                    'flowId=' + _this.$data.flowid + '&' +
                    'isembedded=false' + '&' +
                    'token=' + token + '&' +
                    'accessToken=' + accessToken + '&' +
                    'typename=' + $typeName + '&showsubmit=1"></iframe>');


            } else if (_this.$query.state == 'await') { // 在办流程
                _this.$el.find('.mission-body').append('<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
                    'workId=' + _this.$data.workid + '&' +
                    'trackId=' + _this.$data.trackid + '&' +
                    'subjection=D_D' + session.get('userInfo').deptId + '&' +
                    'token=' + token + '&' +
                    'accessToken=' + accessToken + (_this.$data.readonly ? '&readonly=1' : '') + '&' +
                    'typename=' + $typeName + (showsubmit ? '&showsubmit=1' : '') + '"></iframe>');


            } else if (_this.$query.state == 'flowChart') { // 流程图
                var html = '<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/flow.info.html?' +
                    'workId=' + _this.$data.workid + '&nodeId=' + _this.$data.nodeid + '&' +
                    'accessToken=' + accessToken + '&' +
                    'typename=' + $typeName + '"></iframe>'

                _this.$el.find('.mission-body').append(html);
            };

            var myFunction = function (event) {
                if (event.data == 'closeEvent') {
                    window.removeEventListener("message", myFunction);
                    horizon.post();
                    _this.closeEvent();
                    horizon.clearPostData();
                };
                if (event.data == 'logoutEvent') {
                    window.removeEventListener("message", myFunction);
                    _this.closeEvent();
                    this.goto('/login', {});
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
                    }
                }
            };
            window.addEventListener('message', myFunction);
        }, 200);

        // params.api.startWork({
        //     flowId: params.data.flowid,
        //     title: params.data.flowname,
        // }, function (res) {
        //     var width = template.width();
        //     var height = template.height();

        //     var accessToken = session.get('huizheng-token');


        //     // http://192.168.0.224:10045/horizon-workflow-boot/workflow/module/workflow/index.html?flowId=jsxmydysxqj&isembedded=false
        //     // template.append('<iframe style="padding:0;margin:0;border:none;" height="' + height + 'px" width="' + width + 'px" ' +
        //     //     'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
        //     //     'workId=' + res.data.workId + '&trackId=' + res.data.trackId + '&isembedded=false&subjection=D_D' + session.get('userInfo').deptId + '&accessToken=' + accessToken + '"></iframe>');

        //     console.log(res);
        // });


    },
    destroy: function () {

    },
}