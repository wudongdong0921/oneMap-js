import request from '../../../../common/ajax';

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
var getMapInfo = function (data, success) {
    request.post({
        url: '/overviewOfAchievements/getMap',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode,
            'adCode': data.adCode
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
};


var getMapInfoForView = function (data, success) {
    request.post({
        url: '/overviewOfAchievements/getMap',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode,
            'adCode': data.adCode
        },
        loading: false,
        token: true,
        success: function (res) {
            success(res);
        },
    });
};

var getTarget = function (data, success) {
    request.post({
        url: '/overviewOfAchievements/getTarget',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode,
            'adCode': data.adCode
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getDetailsTable = function (data, success) {

    request.post({
        url: '/overviewOfAchievements/getDetailsTable',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode,
            'adCode': data.adCode,
            'achievementStatus': data.achievementStatus,
            'levelStatus': data.levelStatus,
            "leavel": data.leavel,
            'type': data.type,
            'page': data.page,
            'limit': data.limit
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getClickMap = function (data, success) {
    request.post({
        url: '/overviewOfAchievements/getClickMap',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode,
            'adCode': data.adCode,
            'parameterType': data.parameterType,
            'params': data.params,
            'page': data.page,
            'limit': data.limit
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getRegionSelect = function (data, success) {
    request.post({
        url: '/overviewOfAchievements/getRegionSelect',
        devUrl: 'implementService',
        query: {
            'planningResultCode': data.planningResultCode,
            'adCode': data.adCode,
            'leavel': data.leavel,
            'type': data.type,
            // 'parameterType':data.parameterType,
            // 'params':data.params,
            //'page': data.page,
            //'limit': data.limit
        },
        token: true,
        success: function (res) {
            success(res);
        },
    });
}
var getMapGeojson = function (code, type, success, loading) {
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
    return
    // console.log(obj)
    // var value = obj.value;
    // var type = obj.type;   //(0:模糊查询， 1查询下级)
    // var sql = "";   //不填
    // if (type === '0') {
    //     sql = "XZQDM like '%" + value + "%' or XZQMC like '%" + value + "%'";
    // } else {

    // }
    loading.show();
    // var type = 2;
    // var code = '230204';
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
    //console.log(queryService)
    queryService.getFeaturesBySQL(param, function (res) {
        loading.hide()
        success(res.result.features.features);
    })
    // request.get({
    //     url: '/wintoppublicinterfaceGW/administrativeRegion/getGeojson',
    //     devUrl: 'commonService',
    //     loading: loading,
    //     query: {
    //         xzqh: code,
    //         code: type // 0省 1市 2县
    //     },
    //     token: false,
    //     success: function (res) {
    //         success(res);
    //     },
    // });

};


export default {
    getMapGeojson: getMapGeojson, // 获取地图数据
    getPlanResultType: getPlanResultType,//获取规划成果类型    
    getMapInfo: getMapInfo,//成果总览-地图展示功能
    getMapInfoForView: getMapInfoForView, // 成果总览-地图展示功能 地图展示功能
    getTarget: getTarget,//成果总览-指标展示功能
    getDetailsTable: getDetailsTable,//成果总览-详情表格功能
    getClickMap: getClickMap,//成果总览-地图点击功能
    getRegionSelect: getRegionSelect,//成果总览-省级市级县级选择功能

};
