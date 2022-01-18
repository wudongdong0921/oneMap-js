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


    var workid = $('input[name="workId"]').val();
    var trankid = $('input[name="trackId"]').val();
    var flowid = $('input[name="flowId"]').val();
    var nodeid = $('input[name="nodeId"]').val();
    var iframe = $('iframe[data-type=rramsAchievement]');
    var reviewState = getQueryVariable('reviewState');
    var btnFlag = "";

    /**页面数据保存交互 START*/
    iframe.attr("id","rramsAchievement_iframe");
    setTimeout(() => {
        var actionReject = $("a[data-operate='reject']");
        if(actionReject){
            actionReject.click(function(){
                document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('workflow_reject$$$', '*');
                document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('rramsAchievementGetParams$$$', '*');
            });
            var showsubmit = getQueryVariable('showsubmit');
            actionReject.hide();
            if (showsubmit == 1) {
                //绑定本地退回按钮
                var loaclReject = $('<a href="javascript:void(0);" id="loaclRejectBtn"><i class="ace-icon "></i> 退回</a>');
                actionReject.after(loaclReject)
                $("#loaclRejectBtn").click(function(){
                    btnFlag = "reject";
                    document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('LOCAL_CHECK_FORM$$$', '*');
                });
            }
        }
        var actionConclude = $("a[data-operate='conclude']");
        if(actionConclude){
            actionConclude.click(function(){
                document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('workflow_conclude$$$', '*');
                document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('rramsAchievementGetParams$$$', '*');
            });
            var showsubmit = getQueryVariable('showsubmit');
            actionConclude.hide();
            if (showsubmit == 1) {
                //绑定本地办结按钮
                
                var loaclConcludeBtn = $('<a href="javascript:void(0);" id="loaclConcludeBtn"><i class="ace-icon "></i> 办结</a>');
                actionConclude.after(loaclConcludeBtn)
                $("#loaclConcludeBtn").click(function(){
                    btnFlag = "submit";
                    document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('LOCAL_CHECK_FORM$$$', '*');
                });
            }
            
        }
        var actionSubmit = $("a[data-operate='submit']");
        if(actionSubmit){
            actionSubmit.click(function(){
                document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('workflow_submit$$$', '*');
                document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('rramsAchievementGetParams$$$', '*');
            });
            var showsubmit = getQueryVariable('showsubmit');
            actionSubmit.hide();
            
            if (showsubmit == 1) {
                //绑定本地提交按钮
                
                var loaclActionBtn = $('<a href="javascript:void(0);" id="loaclActionBtn"><i class="ace-icon "></i> 提交</a>');
                actionSubmit.after(loaclActionBtn)
                $("#loaclActionBtn").click(function(){
                    btnFlag = "submit";
                    document.getElementById('rramsAchievement_iframe').contentWindow.postMessage('LOCAL_CHECK_FORM$$$', '*');
                });
            }
            
        }

        var close = $(".flow-buttons a[data-operate='close']");
        if(close){
            close.click(function(){
                parent.window.postMessage('HORIZONCUSTOMDATA_CLEAR$$$', '*');
            });
        }

        if(reviewState == "3"){
            $('.nav.nav-pills.no-margin').find('li a').each(function () {
                var text = $(this).text().trim();
                if (text == '关闭') { } else {
                    $(this).hide();
                };
            });
        }
    });
    window.addEventListener('message', function (event) {
        if(event.data && typeof event.data == 'string'){
            if(event.data.indexOf('LOCAL_CHECK_FORM_RETURN') != -1 && event.data.indexOf('true') != -1){
                if(btnFlag == "submit"){
                    $("a[data-clazz='com.horizon.wf.action.ActionSubmit']").each(function(index,element){
                        if(index == 0){
                            $(this).click();
                        }
                    });
                } else {
                    $("a[data-clazz='com.horizon.wf.action.ActionReject']").each(function(index,element){
                        if(index == 0){
                            $(this).click();
                        }
                    });
                }
                
            } else if (event.data.indexOf('REJECT_BTN_DIDE') != -1){
                $('.nav.nav-pills.no-margin').find('li a').each(function () {
                    var text = $(this).text().trim();
                    if (text == '关闭') { } else {
                        $(this).hide();
                    };
                });
            } else {
                parent.window.postMessage(event.data, '*');
            }
        }
    });
    /**页面数据保存交互 END*/

    var accessToken = getQueryVariable('accessToken');

    var readonly = getQueryVariable('showsubmit')
    var _url = '/result/rramsAchievementForm/' + workid + '/' + trankid + '/' + flowid + '/' + nodeid + '/' + accessToken + '/' + readonly;
    
    var timer = null;
    var showForm = function () {

        if (iframe.length) {
            try {
                if (iframe.attr('src')) {
                    var iframe_src = iframe.attr('src').split('#');
                } else {
                    var iframe_src = iframe.attr('data-src').split('#');
                };
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