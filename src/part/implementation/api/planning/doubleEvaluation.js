import request from '../../../../common/ajax';
var DevUrl = 'implementService'
var getTreeDictionaryInfoData = function(success) {
    request.post({
        url: '/distributed/selectComplianceZtfxList',
        devUrl: 'AnalysisServiceTest',
        success: function (res) {
            if(res.code == 200) {
                success(res);
            }else{
                _$alert('请配置地图');
            }
            
        },
    }); 
}

var getRiskSelectData = function(success) {
    request.post({
        url: '/distributed/selectRiskIdentifyList',
        devUrl: 'AnalysisServiceTest',
        success: function (res) {
            if(res.code == 200) {
                success(res);
            }else{
                _$alert('请配置地图');
            }
            
        },
    }); 
}
var getRiskOederData = function(id,success) {
    request.post({
        url: '/distributed/selectRiskIdentifyById',
        devUrl: 'AnalysisServiceTest',
        data: {
            id: id
        },
        success: function (res) {
            if(res.code == 200) {
                success(res);
            }else{
                _$alert('请配置地图');
            }
            
        },
    });
    
}
var getDownReport = function(obj,success) {
    request.post({
        url: '/csvExportController/exportWordPDF',
        devUrl: 'AnalysisServiceTest',
        query: {
            projectName: obj.projectName,
            xmytId: obj.xmytId,
            unitCode: obj.unitCode,
            rwId: obj.rwId
        },
        success: function (res) {
            if(res.code == 200) {
                success(res);
            }else{
                
            }
            
        },
    })
}
var getDataField = function(data,success) {
    request.post({
        url: '/renren-admin/specificAnalysisV2/getDicSelectList',
        devUrl: 'renrenService',
        query: {
            value: data.type
        },
        success: function (res) {
            if(res.code == 200) {
                success(res);
            }else{
                _$alert('请配置地图');
            }
            
        },
    })
}
export default {
    getTreeDictionaryInfoData: getTreeDictionaryInfoData,//规划分析获取tree                   //获取字典树数据接口（双评价中开发适宜性评价）
    getRiskSelectData: getRiskSelectData,//风险识别-风险类型
    getRiskOederData: getRiskOederData, //风险类型获取信息
    getDownReport: getDownReport, //下载报告
    getDataField: getDataField, //字典
}