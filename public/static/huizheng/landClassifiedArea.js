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



    //收件资料
    var workid = $('input[name="workId"]').val();
    var trankid = $('input[name="trackId"]').val();
    var iframe = $('iframe[data-type=landClassifiedArea]');


    var accessToken = getQueryVariable('accessToken');

    var readonly = getQueryVariable('readonly');
    var _url = '/zrzyBusiness/landClassifiedArea/' + workid + '/' + trankid + '/' + accessToken + '/' + readonly;

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