define(['jquery'], function ($) {
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    var isFirst = '1';

    var flowId = getQueryVariable('flowId');
    if (flowId) {
        isFirst = '0'
    };

    //收件资料
    var workid = $('input[name="workId"]').val();
    var trankid = $('input[name="trackId"]').val();
    var workflowId = $('input[name="flowId"]').val();
    var userId = $('input[name="userId"]').val()
    var iframe = $('iframe[data-type=receivingInformation]');

    var accessToken = getQueryVariable('accessToken');
    var readonly = getQueryVariable('readonly');
    var token = getQueryVariable('token');

    var _url = '/zrzyBusiness/receivingInformation/receivingInformation/' + workid + '/' + trankid + '/' + workflowId + '/' + userId + '/' + isFirst + '/' + accessToken + '/' + readonly + '/' + token;
    var timer = null;

    var showForm = function () {
        if (iframe.length) {
            try {
                var iframe_src
                if(iframe.attr('src')) {
                    iframe_src = iframe.attr('src').split('#');
                }else {
                    iframe_src = iframe.attr('data-src').split('#');
                }
                if(iframe.attr('src').indexOf(_url) != -1){
                    clearInterval(timer);
                } else {
                    if (iframe_src[1] != _url) {
                        iframe.attr('src', iframe_src[0] + '#' + _url);
                        iframe.css({
                            height: $('.tab-content').height() - 20
                        })
                    };
                }

            } catch (error) {
                // console.log(error);
            };
        };
    };
    var timer = setInterval(() => {
        showForm();
    }, 200);
});