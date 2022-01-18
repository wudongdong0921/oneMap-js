////////////////////////////////////////////////
// 附件资料接口
// 穆松鹤
// 2020-11-09 11:12:59
////////////////////////////////////////////////

import request from '../../../common/ajax';
var loading = new icu.loading($('body'));
var getNormalFile = function (FileId, callback) {
    request.post({
        url: '/fileTreeController/findFileShow/' + FileId,
        devUrl: 'implementService',
        success: function (res) {
            callback(res.data);
        },
        error: function (error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });

};

var getMapFile = function (FileId, callback) {
    request.post({
        url: '/fileTreeController/findmapshow/' + FileId,
        devUrl: 'implementService',
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

var getTableTitle = function (FileId, callback) {
    request.post({
        url: '/fileTreeController/findtableNameShow/' + FileId,
        devUrl: 'implementService',
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

var getTableData = function (id, index, count, callback) {
    request.post({
        url: '/fileTreeController/findtableInfoShow',
        devUrl: 'implementService',
        data: {
            "cgsxId": id,
            "page": index,
            "limit": count
        },
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
    loading.show();
    $.ajax({
        url: url + '.json',
        success: function (res) {
            loading.hide();
            callback(res);
        },
        error: function (error) {
            loading.hide();
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });
};

var getMapVectorstyles = function (url, callback) {
    loading.show();
    $.ajax({
        url: url + '/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true',
        success: function (res) {
            loading.hide();
            callback(res);
        },
        error: function (error) {
            loading.hide();
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });
};

var getTiffImage = function (FileId, callback) {
    request.get({
        url: '/fileTreeController/getTiffImage?tiffId=' + FileId,
        devUrl: 'implementService',
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



export default {
    getNormalFile: getNormalFile, // 获取正常文件类型接口
    getMapFile: getMapFile,// 地图类型文件接口
    getTableTitle: getTableTitle, // 获取 表格下拉菜单列表方法
    getTableData: getTableData, // 获取表格数据接口 
    getMapJson: getMapJson, // 获取地图配置文件
    getMapVectorstyles: getMapVectorstyles, // 获取地图图层文件信息
    getTiffImage:getTiffImage // tif文件查看接口
}
