import request from '../../../../common/ajax';

var getMapBottomLarer = function (success) {
    request.post({
        url: '/renren-admin/PictureBaseMap/selectPictureBaseMapByBms',
        devUrl: 'renrenService',
        token: 'renren',
        success: function (res) {
            if (res.code == 200) {
                success(res);
            } else {
                _$alert('请配置地图');
            }

        },
    });
}
var getMapVectorstyles = function (url, callback) {
    $.ajax({
        url: url + '/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true',
        success: function (res) {
            callback(res);
        },
        error: function (error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });
};
var getMapJson = function (url, callback) {
    $.ajax({
        url: url + '.json',
        success: function (res) {
            callback(res);
        },
        error: function (error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });
};


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
    // 2021-05-10 修改bug HNXGTKJ-1645 需要更改配置文件config.js 
    var contentSet = config.planning.mapSet;
    contentSet.queryParameter.attributeFilter = sql;
    var contentSet = config.planning.mapSet;
    contentSet.queryParameter.attributeFilter = sql;
    var param = new SuperMap.GetFeaturesBySQLParameters(contentSet);
    var queryService = new mapboxgl.supermap.FeatureService(config.planning.AccessDataUrl)

    //console.log(queryService)
    setTimeout(() => {
        queryService.getFeaturesBySQL(param, function (res) {
            loading.hide()
            if(res.result){
                success(res.result.features.features);
            }
        })
    }, 500);
};
export default {
    getMapBottomLarer: getMapBottomLarer,                   //获取地图
    getMapVectorstyles: getMapVectorstyles,                 //获取层级
    getMapJson: getMapJson,                                 //通过isver获取中心点
    getMapGeojson: getMapGeojson, // 获取地图数据
}