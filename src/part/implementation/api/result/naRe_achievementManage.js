import request from '../../../../common/ajax';
var session = icu.session;

var getAchievementPage = function (data, success) {
    request.post({
        url: '/achievementManage/getAchievementPage',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode, // 规划成果类型 (String) 
            'inventoryStatus': data.inventoryStatus, // （0未入库、1已入库）
            'adCode': data.adCode,// 行政区划代码 (String) 
            'page': data.page,
            'limit': data.limit,
            'userCode': icu.session.get('userInfo').areacodeList
        },
        success: function (res) {
            success(res);
        },
    });
};
var achievementCheck = function (data, success) {
    request.get({
        url: '/achievementManage/achievementCheck',
        devUrl: 'implementService',
        query: {
            'cgxxbId': data.cgxxbId // 成果信息表编号 (String) 
        },
        success: function (res) {
            success(res);
        },
    });
};
var achievementWarehousing = function (data, success) {
    request.post({
        url: '/achievementManage/achievementWarehousing',
        devUrl: 'implementService',
        query: {
            userId:session.get('userInfo').id,//用户id
            cgxxbId:data.cgxxbId,//成果信息表编号
            mode:data.mode//建库方式（0覆盖历史库，1存为新版本）若是未创建直接新建传null；
        },
        success: function (res) {
            success(res);
        },
    });
};
var achievementTree = function (data, success) {
    request.post({
        url: '/achievementManage/achievementTree',
        devUrl: 'implementService',
        query: {
            ghcglxId:data.ghcglxId,
            adCode:data.adCode
        },
        success: function (res) {
            success(res);
        },
    });
};
var achievementPreviewTree = function (data, success) {
    request.post({
        url: '/achievementManage/achievementPreviewTree',
        devUrl: 'implementService',
        query: {
            planningResultId:data.planningResultId
        },
        success: function (res) {
            success(res);
        },
    });
};
var achievementDir = function (data, success) {
    request.get({
        url: '/achievementManage/achievementDir',
        devUrl: 'implementService',
        query: {
            ghcglxId:data.ghcglxId,
            adCode:data.adCode
        },
        success: function (res) {
            success(res);
        },
    });
};
var achievementFile = function (data, success) {
    request.post({
        url: '/achievementManage/achievementFile',
        devUrl: 'implementService',
        query: {
            cgfjxxbId:data.cgfjxxbId,
        },
        success: function (res) {
            success(res);
        },
    });
};



var selectFileTreeByGhcglxIdAndXzqh = function (data, success) {
    request.post({
        url: '/fileTreeController/selectFileTreeByGhcglxIdAndXzqh',
        devUrl: 'implementService',
        query: {
            ghcglxId:data.ghcglxId,
            xzqh:data.xzqh
        },
        success: function (res) {
            success(res);
        },
    });
};

var selectResultNameByGhcglxIdAndXzqh = function (data, success,error) {
    request.post({
        url: '/fileTreeController/selectResultNameByGhcglxIdAndXzqh',
        devUrl: 'implementService',
        query: {
            ghcglxId:data.ghcglxId,
            xzqh:data.xzqh
        },
        success: function (res) {
            success(res);
        },
        error: function (res){
            top.layer.alert(res.msg)
            if(error){
                error(res);
            }
        }
    });
};

var selectFileTreeByCgId = function (data, success) {
    request.post({
        url: '/fileTreeController/selectFileTreeByCgId',
        devUrl: 'implementService',
        query: {
            planningResultId:data.planningResultId
        },
        success: function (res) {
            success(res);
        },
    });
};

var getNormalFile = function (FileId, callback) {
    request.post({
        url: '/fileTreeController/findFileShow/' + FileId,
        devUrl: 'implementService',
        success: function (res) {
            callback(res.data);
        },
        error: function (error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });
};
export default {
    getAchievementPage: getAchievementPage,        //成果入库-审查通过信息查询功能
    achievementCheck:achievementCheck,             //成果入库-成果创建检查
    achievementWarehousing:achievementWarehousing,  //成果入库
    achievementTree:achievementTree,                 //成果一棵树
    achievementDir:achievementDir,                   //成果对比获取目录
    achievementFile:achievementFile,                //成果对比获取文件
    achievementPreviewTree:achievementPreviewTree,
    selectFileTreeByGhcglxIdAndXzqh:selectFileTreeByGhcglxIdAndXzqh,            //成果一棵树(新接口)
    selectResultNameByGhcglxIdAndXzqh:selectResultNameByGhcglxIdAndXzqh,//成果对比获取目录(新接口)
    selectFileTreeByCgId:selectFileTreeByCgId,//成果对比获取文件(新接口)
    getNormalFile:getNormalFile,//文件预览获取文件地址接口

}