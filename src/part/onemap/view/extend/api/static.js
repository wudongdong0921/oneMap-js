import DevLogin from '../../../../../../public/static/DevModelData/loginApi/index'
import request from '../../../../../common/ajax'

// 数据统计列表
var getAllStatis = function(success) {
    request.get({
        url: '/renren-admin/statisConfig/getAll',
        devUrl: 'renrenService',
        token: 'renren',
        async: false,
        success: function(res) {
            success(res);
        }
    })
}

//任航添加字典列表
var getDictList = function (data, success) {
    request.get({
        url: '/renren-admin/public/getDictList',
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

// 统计范围
var getStatisView = function(id, adcode, success) {
    request.get({
        url: '/statis/view?id=' + id + '&adcode=' + adcode,
        devUrl: 'AnalysisServiceTest',
        success: function(res) {
            success(res)
        },
        error: function (res) {
            layer.alert("请检查后台配置", {
                icon: 0,
                title: '警告'
            })
        }
    })
}

// 点击按钮，查询chart
var chartSelect = function(data,success) {
    request.get({
        url: '/statis/chart?id=' + data.id + '&adcode=' + data.adcode + '&type=' + data.type + '&pid=' + data.pid,
        // url: '/statis/chart',
        // data: data,
        devUrl: 'AnalysisServiceTest',
        success: function(res) {
            success(res)
        }
    })
}

// 下载
var download = function(data) {
    var url = config.InterfaceAddress.AnalysisServiceTest + `/statis/download?id=${data.id}&adcode=${data.adcode}`;
    var xhh = new XMLHttpRequest();
    var page_url = url;
    xhh.open('get', page_url);
    xhh.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhh.responseType = 'blob';
    xhh.onreadystatechange = function () {
        if (xhh.readyState === 4 && xhh.status === 200) {
            var filename = xhh.getResponseHeader('content-Disposition').split('filename=')[1];
            var blob = new Blob([xhh.response], {
                type: filename
            });
            var csvUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = csvUrl;
            link.download = filename;
            link.click();
        }
    };
    xhh.send();

}


export default config.DevModel == 'true' ? DevLogin : {
    getAllStatis: getAllStatis,
    getDictList: getDictList,
    getStatisView: getStatisView,
    chartSelect: chartSelect,
    download: download,
}
