import request from '../../../../common/ajax';

var getMonitorPage = function (data, success) {
    request.get({
        url: '/renren-admin/monitorManage/getMonitorPage',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'page': data.page ? data.page : '',                           // 当前页码，从1开始
            'limit': data.limit ? data.limit : '',                        // 每页显示记录数
            'adcode': data.adcode? data.adcode : '',                     // 区域编码
            'zblx': data.zblx ? data.zblx : '',                           // 指标类型
            'indexName': data.indexName ? data.indexName : '',            //指标名
            'indexNature': data.indexNature ? data.indexNature : '',      //指标性质编码
        },
        success: function (res) {
            success(res);
            // icu.optionSide.set(res.data,['CGGH']);
        },
    });
};
var getPage = function (data, success) {
    request.get({
        url: '/renren-admin/ieInfoManage/getPage',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'page': data.page ? data.page : '',                           // 当前页码，从1开始
            'limit': data.limit ? data.limit : '',                        // 每页显示记录数
            'adcode': data.adcode? data.adcode : '',                     // 区域编码
            'zblx': data.zblx ? data.zblx : '',                           // 指标类型
            'indexName': data.indexName ? data.indexName : '',            //指标名
            'indexNature': data.indexNature ? data.indexNature : '',      //指标性质编码
            'year': data.year ? data.year : '',                           //年份
        },
        success: function (res) {
            success(res);
        },
    });
};

var indexScoreList = function (data, success) {
    request.get({
        url: '/renren-admin/monitorManage/indexScoreList',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'xzqhId': data.xzqhId ? data.xzqhId : '',                           // 行政区划编码
            'zbxId': data.zbxId ? data.zbxId : '',                          // 	指标项编号 
        },
        success: function (res) {
            success(res);
        },
    });
};

var ieInfoList = function (data, success) {
    request.get({
        url: '/renren-admin/ieInfoManage/ieInfoList',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'zbghzId': data.zbghzId ? data.zbghzId : '',                           // 指标规划编号
            
        },
        success: function (res) {
            success(res);
        },
    });
};
var getIndicatorTypeTree = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/getIndicatorTypeTree',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'dictType': data.dictType ? data.dictType : '',                           // 指标项tree
            
        },
        success: function (res) {
            success(res);
        },
    });
};
var zbxGetPage = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/getPage',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'pageNum': data.pageNum ? data.pageNum : '',  
            'pageSize': data.pageSize ? data.pageSize : '',  
            'indexName': data.indexName ? data.indexName : '',  
            'indexNatureCode': data.indexNatureCode ? data.indexNatureCode : '',  
            'zblxId': data.zblxId ? data.zblxId : '',                   
        },
        success: function (res) {
            success(res);
        },
    });
};
var selectIndexItemsInforByIdFront = function (data, success) {
    request.post({
        url: '/renren-admin/itemsManage/selectIndexItemsInforByIdFront',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'zbxxxbId': data.zbxxxbId ? data.zbxxxbId : '',          //	指标信息表id         
        },
        success: function (res) {
            success(res);
        },
    });
};
var zbghSelectIndexItemsInforByIdFront = function (data, success) {
    request.post({
        url: '/renren-admin/planInfoManage/selectIndexPlanInfoByIdFront',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'zbghzId': data.zbghzId ? data.zbghzId : '',          // 指标规划值id       
        },
        success: function (res) {
            success(res);
        },
    });
};

var zbtxGetIndicatorTypeTree = function (data, success) {
    request.post({
        url: '/renren-admin/systemManage/getIndicatorTypeTree',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'dictType': data.dictType ? data.dictType : '',                           // 指标体系tree
            
        },
        success: function (res) {
            success(res);
        },
    });
};
var zbtxGetPage = function (data, success) {
    request.post({
        url: '/renren-admin/systemManage/getPage',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'pageNum': data.pageNum ? data.pageNum : '',  
            'pageSize': data.pageSize ? data.pageSize : '',  
            'indexName': data.indexName ? data.indexName : '',  
            'indexNatureCode': data.indexNatureCode ? data.indexNatureCode : '',  
            'zbtxId': data.zbtxId ? data.zbtxId : '',                   
        },
        success: function (res) {
            success(res);
        },
    });
};

var zbghGetPage = function (data, success) {
    request.post({
        url: '/renren-admin/planInfoManage/getPage',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'pageNum': data.pageNum ? data.pageNum : '',  
            'pageSize': data.pageSize ? data.pageSize : '',  
            'indexName': data.indexName ? data.indexName : '',  
            'indexNatureCode': data.indexNatureCode ? data.indexNatureCode : '',  
            'xzqhId': data.xzqhId ? data.xzqhId : '',                   
        },
        success: function (res) {
            success(res);
        },
    });
};
var getSysDictData = function (data, success) {
    request.get({
        url: '/renren-admin/sys/dict/data/page',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'dictTypeId': data.dictTypeId ? data.dictTypeId : '',
        },
        success: function (res) {
            success(res);
        },
    });
};
//任航添加字典树
var getDictTree = function (data, success) {
    request.get({
        url: '/renren-admin/public/getDictTree',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            'type': data.type,
            'value': data.value
        },
        success: function (res) {
            success(res);
        },
    });
};

export default {
    getDictTree: getDictTree,                                                   //获取字典树
    getMonitorPage: getMonitorPage,                                             //获取指标监测列表
    getSysDictData:getSysDictData,                                              //行政区划字典
    getPage:getPage,                                                            //获取指标实施评估指标项列表
    indexScoreList:indexScoreList,                                              //评分记录列表查询
    ieInfoList:ieInfoList,                                                      //获取指标实施评估信息列表组成时间轴
    getIndicatorTypeTree:getIndicatorTypeTree,                                  //指标项Tree
    zbxGetPage:zbxGetPage,                                                      //指标项表格查询功能
    zbtxGetIndicatorTypeTree:zbtxGetIndicatorTypeTree,                          //指标体系Tree
    zbtxGetPage:zbtxGetPage,                                                    //指标体系表格查询功能
    zbghGetPage:zbghGetPage,                                                    //指标规划值表格查询功能
    selectIndexItemsInforByIdFront:selectIndexItemsInforByIdFront,              //查看指标项详情（前台）
    zbghSelectIndexItemsInforByIdFront:zbghSelectIndexItemsInforByIdFront,      //指标规划值详情（前台）

}