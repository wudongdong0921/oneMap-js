import request from '../../../../common/ajax';
var session = icu.session;

var getAchieventList = function (data, success) {
    request.post({
        url: '/achievementQuality/getAchieventList',
        devUrl: 'implementService',
        data: {
            'planningResultCode': data.planningResultCode, // 规划成果类型 (String) 
            'qcState': data.qcState, // 质检状态（0暂存、1质检中、2通过、3未通过、4终止） (String) 
            'reviewState': data.reviewState, // 审查状态（0未审查、1审查中、2审查完毕、3驳回） (String) 
            'adCode': data.adCode,// 行政区划代码 (String) 
            'createUser': data.createUser, // 创建人 (String) 
            'modular': data.modular, // 是哪个模块进来的cgzj是成果质检cgbg是成果报告sccx是审查查询 (String) 
            'page': data.page,
            'limit': data.limit
        },
        success: function (res) {
            success(res);
        },
    });
};

var deleteAchievementInfosCheck = function (data, success, err) {
    request.post({
        url: '/achievementQuality/deleteAchievementInfosCheck',
        devUrl: 'implementService',
        data: data._beforeJy,
        success: function (res) {
            success(res);
        },
        error: function (error) {
            err(error);
        }
    });
};

var deleteAchievementInfos = function (data, success) {
    request.post({
        url: '/achievementQuality/deleteAchievementInfos',
        devUrl: 'implementService',
        data: data._postArray,
        success: function (res) {
            success(res);
        },
    });
};

var fileUpload = function (data, success) {
    request.post({
        url: '/wintopachieve/upload/file-upload',
        devUrl: 'commonServiceSF',
        data: {
            'file': data.file,                             //	成果包文件
            'planningResultName': data.planningResultName, // 规划成果名称 (String) 
            'planningResultCode': data.planningResultCode, // 规划成果类型 (String) 
            'username':session.get('userInfo').id                      // 创建人 (String) 
        },
        success: function (res) {
            success(res);
        },
    });
};


var getEblTreeAll = function (data, success) {
    request.post({
        url: '/achievementQuality/getEblTreeAll',
        devUrl: 'implementService',
        query: { zjxzflbId: data.zjxzflbId, cgid: data.cgid },
        success: function (res) {
            success(res);
        },
    });
};

var getAttachmentTree = function (id, success) {
    request.post({
        url: '/achievementQuality/getAttachmentTree',
        devUrl: 'implementService',
        query: {
            'cgxxbId': id
        },
        success: function (res) {
            success(res);
        },
    });
};
var insertQcListsAndQcProjects = function (data, success) {
    request.post({
        url: '/achievementQuality/insertQcListsAndQcProjects',
        devUrl: 'implementService',
        data: data,
        success: function (res) {
            success(res);
        },
    });
};

var getAchievementInfo = function (id, success) {
    request.post({
        url: '/achievementQuality/getAchievementInfo',
        devUrl: 'implementService',
        contentType: 'text',
        query: {
            'cgxxbId': id.cgxxbId
        },
        success: function (res) {
            success(res);
        },
    });
};

var terminationAchievementInfos = function (data, success) {
    request.post({
        url: '/achievementQuality/terminationAchievementInfos?userId='+ session.get('userInfo').id,
        devUrl: 'implementService',
        data: data._postArrayEnd,
        success: function (res) {
            success(res);
        },
        error: function(err){
            // icu.alert.error({
            //     title: err.responseJSON.msg
            // })
            top.layer.msg(err.responseJSON.msg)
        }
    });
};
var updateAchievement = function (data, success) {
    request.post({
        url: '/achievementQuality/updateAchievement',
        devUrl: 'implementService',
        data: {
            updateUser: session.get('userInfo').id,
            cgxxbId: data.cgxxbId, // 规划成果名称 (String) 
            qcState: data.qcState
        },
        success: function (res) {
            success(res);
        },
    });
};

var returnQcStateByCgid = function (data, success) {
    request.post({
        url: '/achievementQuality/returnQcStateByCgid',
        devUrl: 'implementService',
        query: {
            cgxxbId: data.cgxxbId, // 规划成果名称 (String) 
        },
        success: function (res) {
            success(res);
        },
    });
};

var isCheckAll = function (data, success) {
    request.post({
        url: '/achievementQuality/isCheckAll',
        devUrl: 'implementService',
        query: {
            cgxxbId: data.cgxxbId,               // 规划成果名称 (String) 
            isCheck:data.isCheck,                // 全部质检或者取消全部质检（0，1）
            userId:session.get('userInfo').id    // 登陆人id
        },
        success: function (res) {
            success(res);
        },
    });
};

var reportsAddress = function (data, success) {
    request.post({
        url: '/resultsReview/reportsAddress',
        devUrl: 'implementService',
        query: {
            cgId: data.cgId,                    // 成果id (String) 
        },
        success: function (res) {
            success(res);
        },
    });
};

var checkTxtContent = function (data, success) {
    request.get({
        url: '/achievementQuality/checkTxtContent',
        devUrl: 'implementService',
        query: {
            cgId: data.cgId,                    // 成果id (String) 
            userId: data.userId
        },
        success: function (res) {
            success(res);
        },
    });
};

export default {
    getAchieventList: getAchieventList,                         // 成果质检，成果报告，审查查询分页
    deleteAchievementInfosCheck: deleteAchievementInfosCheck,  // 成果质检批量删除前的校验（校验是否有正在审核的成果）
    deleteAchievementInfos: deleteAchievementInfos,             // 成果质检批量删除
    getEblTreeAll: getEblTreeAll,                               // 细则项目成果树展示功能
    getAttachmentTree: getAttachmentTree,                       // 成果文件tree展示
    fileUpload: fileUpload,                                     // 成果包上传接口(实时进度)
    insertQcListsAndQcProjects: insertQcListsAndQcProjects,     // 成果质检-保存质检分类
    getAchievementInfo: getAchievementInfo,                     // 成果质检-信息详情
    terminationAchievementInfos: terminationAchievementInfos,   // 成果质检-终止
    updateAchievement: updateAchievement,                       // 成果质检-暂存
    returnQcStateByCgid: returnQcStateByCgid,                   // 成果质检-返回质检状态
    isCheckAll:isCheckAll,                                      // 全部质检和取消全部质检
    reportsAddress:reportsAddress,                              // 成果报告-pdf
    checkTxtContent, // 成果质检开始质检检测txt文件和当前用户行政区是否匹配
}