
// import config from '../../config/config'
var session = icu.session;
// import layoutEX from '../../frame/layout';




export default {
    render: function (template, params, closeEvent) {
        var _this = this;
     

        var width = _this.$el.width();
        var height = _this.$el.height() - 5;
        var accessToken = session.get('huizheng-token');
        var token = session.get('token');
        // console.log(_this.$data);
        // 流程图
        var html = '<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
                    'workId=' + _this.$data.workid+ '&trackId=' +  _this.$data.trackid+ '&' +
                    'accessToken=' + accessToken + '"></iframe>'
        // console.log(html);
        
        _this.$el.find('.flowChart').append(html);
     
        
        

    },
    destroy: function () {

    },
}