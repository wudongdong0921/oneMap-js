
//二调
import request from '../../../../../common/ajax';
var session = icu.session;

var createMapStatus = function(data,success) {
    console.log(data)
    var userName = session.get('userInfo')
    var param = {
        // "ywfxId":data.ywfxId,        //业务分析ID
        "geojson":data.geojson,
        "account":userName.username,
        "year":data.year,
        taskType: data.type //指定请求目的
    }
    if(data.type === '0') {
        param.ywfxId = data.ywfxId
    } else if(data.type === '3') {
        param.ztfxIds = data.ywfxId
    } else{
        param.ywfxId = data.ywfxId
        param.xzqh = data.xzqh
    }
    return request.post({
        url: '/distributeded/createTaskED',
        devUrl: 'AnalysisServiceTest',
        data:param,
        success: function (res) {
            success(res);
        },
    });
}
var checkTaskStatus = function(data,success) {

     return request.post({
        url: '/distributed/selectTaskStatus1',
        devUrl: 'AnalysisServiceTest',
        data:data,
        loading: false,
        success: function (res) {
            success(res);
        },
    });
}
var getMapBottomLarer = function(success) {
    request.post({
        url: '/renren-admin/PictureBaseMap/selectPictureBaseMapByBms',
        devUrl: 'renrenService',
        token: 'renren',
        success: function (res) {
            if(res.code == 200) {
                success(res);
            }else{
                _$alert('请配置地图');
            }
            
        },
    }); 
}
var getDistributeAnalysis = function(id, year,type,rwid,success) {
    var userName = session.get('userInfo')
    var param = {
        account: userName.username,
        taskType: type
    }
    if(type === '0') {
        param.ywfxId = id
    } else {
        param.rwbmIds = rwid
    }
    return request.post({
        url: '/distributed/distributedAnalysis',
        devUrl: 'AnalysisServiceTest',
        data: param,
        // data: {
        //     "ywfxId": id,
        //     "taskType":"0",
        //     //"year": year,
        //     "account": userName.username
        // },
        success: function (res) {
            success(res);
        },
    }); 
}
var getTreeData = function(data,success) {
    request.post({
        url: '/distributeded/selectTreeInfoED',
        loading: false,
        data: {
            //layername: data.layername, // 图层名称 (String) 必填
            rwbmId: data.rwbmId, // 任务id (String) 必填
            gjpzId: data.gjpzId, // 高级配置id (String) 必填
            dictType: data.dictType, // 字典类型 (String) 必填
            jibie: data.jibie, // 显示级别 (String) 必填
            groupField: data.groupField,  // 分组字段
        },
        devUrl: 'AnalysisServiceTest',
        success: function (result) {
            if (result.code == 200) {
                success(result.data);
            } else {
                _$alert('加载数据失败');
            };
        },
    });
}
var getTreePie = function(data,success) {
    data.dictType = data.dictType ? data.dictType : ''
    request.post({
        url: '/distributeded/selectPieInfoED',
        loading: false,
        data: {
            type:data.type,
            layername: data.layername, // 图层名称 (String) 必填
            rwbmId: data.rwbmId, // 任务id (String) 必填
            gjpzId: data.gjpzId, // 高级配置id (String) 必填
            dictType: data.dictType, // 字典类型 (String) 必填
            pid: data.pid, // pid (Long) 
            groupField: data.groupField,  // 分组字段
            jibie: data.jibie,
        },
        devUrl: 'AnalysisServiceTest',
        success: function (result) {
            if (result.code == 200) {
                success(result.data);
            } else {
                _$alert('加载数据失败');
            };
        },
    });
}
var getTreeTable = function(data,success) {
    request.post({
        url: '/distributeded/selectTableInfoListED',
        loading: false,
        data: {
            jibie: data.jibie,
            layername: data.layername, // 图层名称 (String) 
            rwbmId: data.rwbmId,// 任务id (String) 
            gjpzId: data.gjpzId,// 高级配置id (String) 
            limit: data.pageInfo.count, // 分页条数 (Integer) 必填
            page: data.pageInfo.index, // 分页页数 (Integer) 必填
            id: data.id,  //决定看哪一层级
            filed: data.filed, // 查看字段
            dictType: data.dictType,// 字典编码
            groupField: data.groupField // 分组字段
        },
        devUrl: 'AnalysisServiceTest',
        success: function (result) {
            if (result.code == 200) {
                success(result.data);
            } 
        },
    });
}
var ckeckJson = function (obj, success) {
    request.post({
        url: '/layer/isWithin',
        data: obj,
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
var getTimerMap = function(data,success) {
    var obj = {
        mapId: data
    }
    request.post({
        url: '/distributed/getTimelineByMapId',
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
}
var getIdentifyField = function(data,success) {
    request.post({
        url: '/layer/identifyField',
        devUrl: 'AnalysisServiceTest',
        query: {
            mapId: data.mapId  
        },
        success: function (result) {
            console.log(result)
                success(result);
        },
    });
}
var closeAnalysStatus = function(data,success) {
    return request.post({
        url: '/distributed/closeAnalysis',
        devUrl: 'AnalysisServiceTest',
        data:data,
        loading: false,
        success: function (res) {
            success(res);
        },
    });
}
var executeTaskJava = function(data,success) {
    return request.post({
        url: '/distributeded/executeTaskED',
        devUrl: 'AnalysisServiceTest',
        data:data,
        loading: false,
        success: function (res) {
            success(res);
        },
        error: function(error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    }) 
}
var getInfoTableList = function(data,success) {
    return request.post({
        url: '/distributed/selectTableInfoListXor',
        devUrl: 'AnalysisServiceTest',
        data:{
            rwbmId:data.rwbmId
        },
        loading: false,
        success: function (res) {
            success(res);
        },
        error: function(error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    })
}
// var exportExlsTable = function(data,success) {
//     request.post({
//         url: '/csvExportController/download',
//         data: statusList,
//         devUrl: 'AnalysisServiceTest',
//         responseType: 'blob',
//         success: function (result) {
//             //success(result.data);
//             const blob = res.data;
//             const reader = new FileReader();
//             reader.readAsDataURL(blob);
//             reader.onload = (e) => {
//             const a = document.createElement('a');
//             a.download = `文件名称.zip`;
//             // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
//             a.href = e.target.result;
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             }
//         }
//     });
// }
export default {
    createMapStatus: createMapStatus,//创建任务
    checkTaskStatus: checkTaskStatus,//查询任务状态
    getMapBottomLarer: getMapBottomLarer,//获取地图
    getDistributeAnalysis: getDistributeAnalysis,//获取高级配置（专题）包含表格表头
    getTreeData: getTreeData,//获取专题标签下的tree
    getTreePie: getTreePie,//获取饼图
    getTreeTable: getTreeTable,//获取表格
    ckeckJson:ckeckJson,//上图权限
    getTimerMap:getTimerMap,//时间轴
    getIdentifyField: getIdentifyField,//识别中文对照
    closeAnalysStatus: closeAnalysStatus,//关闭分析
    executeTaskJava: executeTaskJava, //创建任务后执行
    getInfoTableList: getInfoTableList,//获取自定义的新表格
}