import request from '../../../../common/ajax';
var DevUrl = 'implementService'
var getTreeData = function(data,success) {
    request.get({
        url: '/devSuitability/classifyTree',
        devUrl: DevUrl,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}
var getDirlogData = function (data,success) {
    request.get({
        url: '/devSuitability/deployData',
        devUrl: DevUrl,
        contentType: 'text',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
        error:function (res) {
            success('500')
        }
    }); 
}

var getTableData = function (data,success) {
    request.get({
        url: '/devSuitability/dataTable',
        devUrl: DevUrl,
        contentType: 'text',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}

var getTreeDatas = function(data,success) {
    request.get({
        url: '/resourcesCarrying/carryingTree',
        devUrl: DevUrl,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}
var getDirlogDatas = function (data,success) {
    request.get({
        url: '/resourcesCarrying/deployData',
        devUrl: DevUrl,
        contentType: 'text',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
        error:function (res) {
            success('500')
        }
    }); 
}

var getTableDatas = function (data,success) {
    request.get({
        url: '/resourcesCarrying/dataTable',
        devUrl: DevUrl,
        contentType: 'text',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}
var getHightConfig = function (data,success) {
    request.get({
        url: '/auxLocation/filtrateData',
        devUrl: DevUrl,
        contentType: 'text',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}


var advancedFilter = function (data,success) {
    request.post({
        url: '/auxLocation/advancedFilter',
        devUrl: DevUrl,
        contentType: 'json',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}
var warningInfo = function (data,success) {
    request.get({
        url: '/warningDetails/warningInfo',
        devUrl: DevUrl,
        contentType: 'text',
        data:data,
        success: function (res) {
            if(res.code == '200') {
                success(res);
            }else{
                console.log('请求数据失败');
            }
            
        },
    }); 
}
export default {
    getTreeData: getTreeData,                   //获取字典树数据接口（双评价中开发适宜性评价）
    getDirlogData:getDirlogData,                //获取统计图弹窗内容接口（双评价中开发适宜性评价）
    getTableData:getTableData,                  //获取表格数据（双评价中开发适宜性评价）
    
    getTreeDatas: getTreeDatas,                   //获取字典树数据接口（资源环境承载能力）
    getDirlogDatas:getDirlogDatas,                //获取统计图弹窗内容接口（资源环境承载能力）
    getTableDatas:getTableDatas,                  //获取表格数据（资源环境承载能力）
    getHightConfig:getHightConfig,                // 获取高级配置信息（辅助选址所用）
    advancedFilter:advancedFilter,                 // 获取任务状态
    warningInfo:warningInfo,                      // 规划实施评估列表获取
}