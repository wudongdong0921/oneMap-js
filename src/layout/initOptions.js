// mian.js 文件中
var session = icu.session;
icu.optionSide.setOptionSideEvent(function (code, callback) {
    // code 为获取字典项的关键字
    // callback 为获取关键字之后的回调事件
    // 注意: 此处的ajax 需要以同步方式与运行
    // $.ajax({
    //     type: 'post',
    //     async: false,
    //     url: config.InterfaceAddress.renrenService + '/renren-admin/specificAnalysisV2/getDicSelectList?value=' + code,
    //     success: function (res) {
    //         callback(res.data);
    //     }
    // })
    var typeHendel = code.split('-');
    if (typeHendel.length == 2) {
        var userId = session.get('userInfo').userId;
        var $url = config.InterfaceAddress.renrenService + '/natureResource/workflow/getfileTyeByUserId?userId=' + userId;
    } else if (typeHendel.length == 3) {
        var $url = config.InterfaceAddress.renrenService + '/natureResource/workflow/getDicWithFileType?type=LANGUAGES_TYPE';
    } else {
        var $url = config.InterfaceAddress.renrenService + '/renren-admin/specificAnalysisV2/getDicSelectList?value=' + code;
    }
    $.ajax({
        type: 'post',
        async: false,
        url: $url,
        beforeSend: function (request) {
            request.setRequestHeader('token', session.get('token'));
        },
        success: function (res) {
            if (typeHendel.length == 2 || typeHendel.length == 3) {
                callback(res)
            } else {
                callback(res.data)
            };
        },
    });
});

icu.optionSide.set([
    { "label": "- 请选择 -", "value": "请选择" },
    { "label": "暂存", "value": "暂存" },
    { "label": "质检中", "value": "质检中" },
    { "label": "通过", "value": "通过" },
    { "label": "未通过", "value": "未通过" },
    { "label": "终止", "value": "终止" },

], 'AchievementStatus');

icu.optionSide.set([
    {"label" : "是","value":"0"},
    {"label" : "否","value":"1"}
],'yorn');
icu.optionSide.set([
    {"label" : "急件","value":"0"},
    {"label" : "紧急","value":"1"}
],'jhcd');
