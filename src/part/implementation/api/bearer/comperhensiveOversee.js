// doc_profile
import request from '../../../../common/ajax';
var DevUrl = 'implementService'

var getCardList = function (data, success) {
    request.post({
        url: '/picture/reScoringSis/early008',
        devUrl: DevUrl,
        contentType: 'text',
        data: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
};

var boundaryControlIndicatorsMap = function (data, success) {
    request.post({
        url: '/picture/reScoringSis/early002',
        devUrl: DevUrl,
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var getPlanYear = function (data, success) {
    request.post({
        url: '/picture/reScoringSis/indicatorYear',
        devUrl: DevUrl,
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var getStaticPie = function (data, success) {
    request.post({
        url: '/picture/reScoringSis/early005',
        devUrl: DevUrl,
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}

var getStaticPlan = function (data, success) {
    request.post({
        url: '/picture/reScoringSis/early004',
        devUrl: DevUrl,
        query: data,
        loading:false,
        success: function (res) {
            success(res);
        },
    });
}
var getTreeData = function (data, success) {
    request.post({
        url: '/picture/reScoringSis/early006',
        devUrl: DevUrl,
        query: data,
        success: function (res) {
            success(res);
        },
    });
}
var getTableData =function (data, success) {
    request.post({
        url: '/picture/reScoringSis/early009',
        devUrl: DevUrl,
        query: data,
        success: function (res) {
            success(res);
        },
    });
}
var resourcesEnvironmentMapInfo =function (data, success) {
    request.post({
        url: '/picture/reScoringSis/resourcesEnvironmentMapInfo',
        devUrl: DevUrl,
        query: data,
        success: function (res) {
            success(res);
        },
    });
}

export default {
    getCardList: getCardList, // 综合监管左侧卡片列表数据
    boundaryControlIndicatorsMap:boundaryControlIndicatorsMap,
    getPlanYear:getPlanYear, // 获取地图轮播时间
    getStaticPlan:getStaticPlan, // 获取折线图数据
    getStaticPie:getStaticPie, // 获取饼图数据
    getTreeData:getTreeData,// 获取评价详情树展示
    getTableData: getTableData, // 获取动态表格数据
    resourcesEnvironmentMapInfo : resourcesEnvironmentMapInfo,//获取地图彩色图块
}