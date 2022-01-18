// doc_profile
import request from '../../../../../common/ajax';
var session = icu.session;
var selectBusiness = function (success) {
    request.get({
        url: '/propertySearch/selectBusiness',
        devUrl: 'AnalysisServiceTest',
        success: function (res) {
            success(res);
        },
    });
};
var getSearchField = function (data, success) {
    var obj = {
        sxcxId: data
    }
    request.get({
        url: '/propertySearch/searchField',
        query: obj,
        devUrl: 'AnalysisServiceTest',
        success: function (result) {
            if (result.code == 200) {
                success(result);
            } else {
                _$alert(result);
            };
        },
    });
};
var getPropertySearchPlot = function (data,success) {
    request.post({
        url: '/propertySearch/search',
        devUrl: 'AnalysisServiceTest',
        data: {
            pageSize:data.pageInfo.count,
            pageNum: data.pageInfo.index,
            sxcxId: data.sxcxId,
            searchData: data.searchData,
        },
        success: function (res) {
            success(res);
        },
    });
};
var spaceSearchList = function (data,success) {
    request.post({
        url: '/spaceSearch/search',
        devUrl: 'AnalysisServiceTest',
        data: {
            pageSize:data.pageInfo.count,
            pageNum: data.pageInfo.index,
            ywId: data.sxcxId,
            geoJson: data.searchData,
        },
        success: function (res) {
            success(res);
        },
    });
};
export default {
    selectBusiness: selectBusiness, //查询业务
    getSearchField: getSearchField, //查询字段
    getPropertySearchPlot: getPropertySearchPlot,//查询地块
    spaceSearchList: spaceSearchList,//空间查询
}