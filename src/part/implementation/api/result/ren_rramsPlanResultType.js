import request from '../../../../common/ajax';

var getPlanResultType = function (data, success) {
    request.post({
        url: '/renren-admin/rramsPlanResultType/getPlanResultType',
        token: 'renren',
        devUrl: 'renrenService',
        query: {},
        success: function (res) {
            success(res);
            // icu.optionSide.set(res.data,['CGGH']);
        },
    });
};

var getSysDictData = function (data, success) {
    request.post({
        url: '/renren-admin/rramsPlanAr/getList',
        data: {
            'adName': '',
            'ghcglxId': data.ghcglxId,
            'value': data.value
        },
        token: 'renren',
        devUrl: 'renrenService',
        success: function (res) {
            success(res);
        },
})


    // request.get({
    //     url: '/renren-admin/sys/dict/data/page',
    //     token: 'renren',
    //     devUrl: 'renrenService',
    //     query: {
    //         // 'page': data.page ? data.page : '',                       // 当前页码，从1开始
    //         // 'limit': data.limit ? data.limit : '',                    // 每页显示记录数
    //         // 'orderField': data.orderField ? data.orderField : '',     // 排序字段
    //         // 'order': data.order ? data.order : '',                    // 排序方式，可选值(asc、desc)
    //         // 'dictLabel': data.dictLabel ? data.dictLabel : '',        // 字典标签
    //         // 'dictValue': data.dictValue ? data.dictValue : '',        // 字典值
    //         'dictTypeId': data.dictTypeId ? data.dictTypeId : '',
    //     },
    //     success: function (res) {
    //         success(res);
    //     },
    // });
};



var deleteAchievementInfo = function (data, success) {
    request.post({
        url: '/achievementQuality/deleteAchievementInfo',
        query: data,
        devUrl: 'implementService',
        success: function (res) {
            success(res);
        },
    })
}

var getAchievementInfo = function (id, success) {
    request.post({
        url: '/achievementQuality/getAchievementInfo',
        devUrl: 'implementService',
        query: id,
        success: function (res) {
            success(res);
        }
    });
  }

var getReviewListTree = function (id, success) {
request.post({
    url: '/resultsReview/getReviewListTree',
    devUrl: 'implementService',
    query: id,
    success: function (res) {
        success(res);
    }
});
}


export default {
    getPlanResultType: getPlanResultType,        //规划成果类型获取
    getSysDictData: getSysDictData,                //字典数据
    deleteAchievementInfo: deleteAchievementInfo, //删除成果质检
    getAchievementInfo, //查看质检成果信息表详情
    getReviewListTree, //审查要点
}