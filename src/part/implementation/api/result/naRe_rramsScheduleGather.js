import request from '../../../../common/ajax';
var session = icu.session;

var getPage = function (data, success) {
    request.post({
        url: '/rramsScheduleGather/getPage',
        devUrl: 'implementService',
        query: {
            'pageNum': data.pageNum, //当前页数
            'pageSize': data.pageSize, //每页数量
            'ghcglxId': data.ghcglxId //规划成果类型编码
        },
        success: function (res) {
            success(res);
        },
    });
};
var reportingGetPage = function (data, success) {
    request.post({
        url: '/rramsScheduleReporting/getPage',
        devUrl: 'implementService',
        query: {
            'pageNum': data.pageNum, //当前页数
            'pageSize': data.pageSize, //每页数量
            'ghcglxId': data.ghcglxId, //规划成果类型编码
            'workProgressCode': data.workProgressCode,//工作进展编码
            'districtCodes': data.districtCodes     //行政区代码数组
        },
        success: function (res) {
            success(res);
        },
    });
};
var selectRramsScheduleGatherById = function (data, success) {
    request.post({
        url: '/rramsScheduleGather/selectRramsScheduleGatherById',
        devUrl: 'implementService',
        query: {
            'jdcjxxbId': data.jdcjxxbId    // 进度采集信息表编码
        },
        success: function (res) {
            success(res);
        },
    });
};
var deleteRramsScheduleGatherByIdsInfo = function (data, success,error) {
    request.post({
        url: '/rramsScheduleGather/deleteRramsScheduleGatherByIdsInfo',
        devUrl: 'implementService',
        query: {
            'jdcjxxbIds': data.jdcjxxbIds,     //进度采集信息表编码
        },
        success: function (res) {
            success(res);
        },
        error: function (res){
            error(res);
        },
    });
};
var saveRramsScheduleGatherInfo = function (data, success) {
    request.post({
        url: '/rramsScheduleGather/saveRramsScheduleGatherInfo',
        devUrl: 'implementService',
        data: {
            RramsScheduleGather: {
                "ghcglxId": data.ghcglxId, // 进度采集信息表编码 (string)
                "createUser": session.get('userInfo').id, // 创建人 (string)
            },
            "districtCodes": data.districtCodes, // 行政区编码 (Array) 必填
            "districtNames": data.districtNames, // 行政区名称 (Array) 必填
        },
        success: function (res) {
            success(res);
        },
    });
};
var getPlanResultType = function (success) {
    request.post({
        url: '/renren-admin/rramsPlanResultType/getPlanResultType',
        devUrl: 'renrenService',
        token: true,
        success: function (res) {
            success(res);
        },
    });
};
var getProgressMap = function (data, success) {
    request.post({
        url: '/preparationSchedule/getProgressMap',
        devUrl: 'implementService',
        query: {
            'ghcglxId': data.ghcglxId,
            'districtCode': data.districtCode,
            'type': data.type,
            'leavel': data.leavel,
            'page': data.page,
            'limit': data.limit
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getChartInfo = function (data, success) {
    request.post({
        url: '/preparationSchedule/getPlanningProgressMap',
        devUrl: 'implementService',
        query: {
            'ghcglxId': data.ghcglxId,
            'districtCode': data.districtCode,
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var selectDistrictCode = function (data, success) {
    request.post({
        url: '/rramsScheduleReporting/selectDistrictCode',
        devUrl: 'implementService',
        query: {
            'jdcjxxbId': data.jdcjxxbId    // 进度采集信息表编码
        },
        success: function (res) {
            success(res);
        },
    });
}
var getMapInfo = function (data, success) {
    request.post({
        url: '/preparationSchedule/getMap',
        devUrl: 'implementService',
        query: {
            'ghcglxId': data.ghcglxId,
            'districtCode': data.districtCode,
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getScheduleDetailTable = function (data, success) {
    request.post({
        url: '/preparationSchedule/getScheduleDetailTable',
        devUrl: 'implementService',
        query: {
            'ghcglxId': data.ghcglxId,
            'districtCode': data.districtCode,
            'page': data.page,
            'limit': data.limit
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getScheduleDetail = function (data, success) {
    request.post({
        url: '/preparationSchedule/getInfo',
        devUrl: 'implementService',
        query: {
            'jdtbxxbId': data.jdtbxxbId
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getMapData = function (code, aaa, success) {
    request.get({
        url: '/renren-admin/areaLocation/getArea',
        token: 'renren',
        devUrl: 'renrenService',
        query: {
            "adcode": code
        },
        success: function (res) {
            if(res.data){
                var result = $.parseJSON(res.data.coordinate)
                console.log('当前地图数据%o', result.features)
                success(result.features);
            }
        },
    });
}
var getMapGeojson = function (code, type, success, loading) {
    loading.show();
    var _length = 0;
    var CodeType = 0;
    code.replace(/[0]+$/g, function (res) {
        _length = res.length;
        return res;
    });
    if (_length >= 4) {
        CodeType = 0;
        code = code.slice(0, 2);
    } else if (_length >= 2 && _length < 4) {
        CodeType = 1;
        code = code.slice(0, 4);
    } else if (_length >= 0 && _length < 2) {
        CodeType = 2;
    };
    var sql = '';
    if (CodeType == 0 && type == 0) {
        sql = 'XZQDM=' + code + '0000';
    } else if (CodeType == 0 && type == 1) {
        sql = "XZQDM like '" + code + "%00' and LENGTH(XZQDM)=6 and XZQDM != '" + code + "0000'";
    } else if (CodeType == 0 && type == 2) {
        sql = "XZQDM like '" + code + "%' and LENGTH(XZQDM)=6 and XZQDM != '" + code + "0000' and not XZQDM like '" + code + "%00'";
    } else if (CodeType == 1 && type == 1) {
        sql = 'XZQDM=' + code + '00';
    } else if (CodeType == 1 && type == 2) {
        sql = "XZQDM like '" + code + "%' and LENGTH(XZQDM)=6 and XZQDM != '" + code + "00'";
    } else if (CodeType == 2 && type == 2) {
        sql = 'XZQDM=' + code;
    };
    var contentSet = config.result.mapSet;
    contentSet.queryParameter.attributeFilter = sql;
    var param = new SuperMap.GetFeaturesBySQLParameters(contentSet);
    var queryService = new mapboxgl.supermap.FeatureService(config.result.AccessDataUrl)
    queryService.getFeaturesBySQL(param, function (res) {
        loading.hide()
        success(res.result.features.features);
    })


};


export default {
    getPage: getPage,                                                         //进度采集-查询功能
    selectRramsScheduleGatherById: selectRramsScheduleGatherById,              // 进度采集-查看功能
    deleteRramsScheduleGatherByIdsInfo: deleteRramsScheduleGatherByIdsInfo,    // 进度采集-删除功能
    saveRramsScheduleGatherInfo: saveRramsScheduleGatherInfo, //进度采集-添加/修改
    reportingGetPage: reportingGetPage,                        //进度填报-查询功能
    getPlanResultType: getPlanResultType,//获取规划成果类型    
    getProgressMap: getProgressMap,//进度占比图下一节点展示功能   
    getChartInfo: getChartInfo,//规划进度占比图展示功能      
    getMapInfo: getMapInfo,//进度地图展示功能
    getScheduleDetailTable: getScheduleDetailTable,//进度详细表格查询功能
    getScheduleDetail: getScheduleDetail,//进度详情查询
    selectDistrictCode: selectDistrictCode,
    getMapGeojson: getMapGeojson,
    getMapData: getMapData
};
