import request from '../../../../common/ajax';
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
    if (loading) {
        loading.show();
    }
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
    } else {
        sql = 'XZQDM=' + code;
    };
    var contentSet = config.bearer.mapSet;
    contentSet.queryParameter.attributeFilter = sql;
    var param = new SuperMap.GetFeaturesBySQLParameters(contentSet);
    var queryService = new mapboxgl.supermap.FeatureService(config.bearer.AccessDataUrl)
    //console.log(queryService)

    setTimeout(() => {
        queryService.getFeaturesBySQL(param, function (res) {
            if (loading) {
                loading.hide();
            }
            if(res.result){
                success(res.result.features.features);
            }
        })
    }, 500);
};
export default {
    getMapGeojson: getMapGeojson, // 获取地图数据
}