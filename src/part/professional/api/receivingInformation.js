import request from '../../../common/ajax'
// import config from "../config/config";

var getFileList = function (data, success, error) {
    request.post({
        url: "/file/getFileList",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            var data = res.data;
            success(data);
        },
    });

};
var saveFile = function (data, success, error) {
    request.post({
        url: "/file/saveFile",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        },
    });

};

var createJnwjByMB = function (data, success, error) {
    request.post({
        url: "/renren-admin/SysEnclosure/querySysEnclosureAll",
        async: false,
        devUrl: 'renrenService',
        success: function (res) {
            var data = res.data;
            success(data);
        },
    });

};

var delFile = function (data, success, error) {
    request.post({
        url: "/file/delFile",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        },
    });

};
var delEnclosure = function (data, success, error) {
    request.post({
        url: "/file/delEnclosure",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        },
    });

};
var fileDownLoad = function (data, success, error) {
    request.post({
        url: "/file/fileDownLoad",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        }
    });

};
var dowmLoadFileById = function (data, success, error) {
    request.post({
        url: "/file/dowmLoadFileById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        },
    });

};

export default {
    getFileList: getFileList,
    saveFile: saveFile,
    createJnwjByMB: createJnwjByMB,
    delFile: delFile,
    delEnclosure: delEnclosure,
    fileDownLoad: fileDownLoad,
    dowmLoadFileById: dowmLoadFileById,
}