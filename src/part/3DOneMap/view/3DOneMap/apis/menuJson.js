
import TreeData from './treeData'
import request from '../../../../../common/ajax';

var DevUrl = 'server3DApiUrl'

var treeMenu = [{
    name: '数据目录',
    type: 'event',
    router: 'MapSource',
    children: [{
        children: [{
            color: '#68CDC0', name: '现状数据据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#85BDE3', name: '规划数据据据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
            children: [],
        }]
    }, {
        children: [{
            color: '#68CDC0', name: '现状数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#85BDE3', name: '规划数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#68CDC0', name: '现状数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#85BDE3', name: '规划数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
            children: TreeData,
        }, {
            color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
            children: TreeData,
        }]
    }],
}];
var getJson = function (data, cb) {
    request.post({
        url: '/renren-admin/sys/user/getTdDataDir',
        devUrl: DevUrl,
        contentType: 'text',
        data: data,
        success: function (res) {
            cb(res.data)
        },
    });
}

var getDevData = function (data, cb) {
    request.get({
        url: '/renren-admin/pictureTdMapController/getEnableMap',
        devUrl: DevUrl,
        contentType: 'text',
        data: data,
        success: function (res) {
            cb(res.data)
        },
    });
}



export default {
    getJson: getJson,
    getDevData: getDevData
};