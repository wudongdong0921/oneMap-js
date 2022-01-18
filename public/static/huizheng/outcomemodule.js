// /result/examination/result_detail
define(['jquery'], function ($) {
	var showsubmit = getQueryVariable('showsubmit');
	if (showsubmit != 1) {
		$('.nav.nav-pills.no-margin').find('li a').each(function () {
			var text = $(this).text().trim();
			if (text == '拿回' || text == '关闭') { } else {
				$(this).hide();
			};
		});
    };
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    };

    var iframe = $('iframe[data-type=outcomemodule]');
    // 必填参数
    var workid = $('input[name="workId"]').val();
    var trankid = $('input[name="trackId"]').val();
    var workflowId = $('input[name="flowId"]').val();

    // 慧正需要 accessToken
    var accessToken = getQueryVariable('accessToken');

    var reviewState = getQueryVariable('reviewState');
    var readonly = getQueryVariable('readonly');
    var btn = getQueryVariable('btn');
    var icon = getQueryVariable('icon');
    var cgxxbId = getQueryVariable('cgxxbId')
    // 自定义添加参数
    var flowId = getQueryVariable('flowId');
    // renren token 可以尝试直接在 session 中获取，不用调用此处接口
    // var token = getQueryVariable('token');

    // 需要自己添加参数传值
    var _url = `/result/examination/result_detail/${reviewState}/${readonly}/${btn}/${icon}/${cgxxbId}`;
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
                console.log(error);
            };
        };
    };
    var timer = setInterval(() => {
        showForm();
    }, 200);
});