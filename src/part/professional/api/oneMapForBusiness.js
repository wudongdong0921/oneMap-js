import request from '../../../common/ajax'
var session = icu.session;
var DevUrl = 'AnalysisServiceTest'

var upMapBusiness = function (obj,success) {
    var param = {
        account: session.get('userInfo').username,
        workId: obj.workId,
        trackId: obj.trackId,
        flowId: obj.flowId,
        fileGeometrys: obj.geometrys,
        epsgCode:obj.epsgCode
    }
    request.post({
        url: '/geometryUtilController/uploadGraphics',
        devUrl: DevUrl,
        data: param,
        // token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};
var upMapBusinessSearch = function(obj,success) {
    var param = {
        workId: obj.workId,
        flowId: obj.flowId,
    }
    request.post({
        url: '/geometryUtilController/selectGraphicsByWorkId',
        devUrl: DevUrl,
        data: param,
        success: function (res) {
            success(res);
        },
    });
}
var epsgCodePro4490Server = function(obj,success) {
    var param = {
        geos: obj.geos,
        epsgCode: obj.epsgCode
    }
    request.post({
        url: '/geometryUtilController/convertGeo',
        devUrl: DevUrl,
        data: param,
        success: function (res) {
            success(res);
        },
    });
}
var deleteBusinessMap = function(obj,success) {
    request.post({
        url: '/geometryUtilController/deleteGraphicsByWorkIdAndWdId',
        devUrl: DevUrl,
        contentType: 'json',
        query: {
            workId: obj.workId,
            wdIds: obj.wdIds,
            flowId: obj.flowId
        },
        success: function (res) {
            success(res);
        },
    });
}
var openToButton = function (data, success) {
    request.post({
        url: '/workflow/openToButton',
        devUrl: 'openToButtonUrl',
        contentType: 'json',
        data: data,
        success: function (res) {
            success(res);
        },
    });
};
export default {
    upMapBusiness: upMapBusiness, //上图
    upMapBusinessSearch:upMapBusinessSearch,//上图查询,
    deleteBusinessMap: deleteBusinessMap,//上图列表删除
    openToButton: openToButton,
    epsgCodePro4490Server: epsgCodePro4490Server,//转换
    
}