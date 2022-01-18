// doc_profile
import request from '../../../../../common/ajax';
var session = icu.session;
var getMapInfoList = function (data,success) {
    const mapId = data.mapId
    const documentName = data.documentName
    const pageNum = data.pageInfo.index
    request.get({
        url: '/update/document',
        devUrl:'AnalysisServiceTest',
        query:{
            mapId:mapId,
            documentName:documentName,
            pageNum: pageNum
        },
        // data: {
        //     pageSize:data.pageInfo.count,
        //     pageNum: data.pageInfo.index,
        //     sxcxId: data.sxcxId,
        //     searchData: data.searchData,
        // },
        success: function (res) {
            success(res);
        },
    });
};
var getMapMessages = function(data,success) {
    const mapId = data.mapId
    const updateDate = data.updateDate
    request.get({
        url: '/update/info',
        devUrl:'AnalysisServiceTest',
        query: {
            mapId:mapId,
            updateDate:updateDate
        },
        success: function (res) {
            success(res);
        },
    });
}
var getMapSelectDate = function(id,success) {
    request.get({
        url: '/update/date',
        devUrl:'AnalysisServiceTest',
        query: {
            dtxxbId:id
        },
        success: function (res) {
            success(res);
        },
    });
}
var verify = function(fileId,success) {
    request.get({
        url: '/renren-admin/documnet/verify',
        devUrl: 'renrenService',
        token: 'renren',
        query: {
            fileId:fileId
        },
        success: function (res) {
            success(res);
        },
    })
}
export default {
    getMapInfoList: getMapInfoList,
    getMapMessages:getMapMessages,//更新信息
    getMapSelectDate: getMapSelectDate, //日期
    verify: verify //效验
}
