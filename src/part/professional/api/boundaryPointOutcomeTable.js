import request from '../../../common/ajax';
// import config from "../config/config";
// import storage from "../component/storage";
var dict = function (data, success, error) {
    request.post({
        url: "/dictmanage/getDictByType",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                var data = res.data;
                success(data);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var selectDictChild = function (data, success, error) {
    request.post({
        url: "/dictmanage/getDictByType",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                var data = res.data;
                success(data);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var queryTdflmjbCollectModelForList = function (data, success, error) {
    request.post({
        url: "/sjbp/queryTdflmjbCollectModelForList",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                var data = res;
                success(data);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var deleteDkxxbById = function (data, success, error) {
    request.post({
        url: "/sjbp/deleteDkxxbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var deleteDkxxbById = function (data, success, error) {
    request.post({
        url: "/sjbp/deleteDkxxbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var deleteAllDkxxbById = function (data, success, error) {
    request.post({
        url: "/sjbp/deleteAllDkxxbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var deleteDkzbbById = function (data, success, error) {
    request.post({
        url: "/sjbp/deleteDkzbbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var deleteAllDkzbbById = function (data, success, error) {
    request.post({
        url: "/sjbp/deleteAllDkzbbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
//地块坐标表回显
var findDkxxbInfo = function (data, success, error) {
    request.post({
        url: "/sjbp/findDkxxbInfo",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var insertDkxxbInfo = function (data, success, error) {
    request.post({
        url: "/sjbp/insertDkxxbInfo",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var updateDkxxbById = function (data, success, error) {
    request.post({
        url: "/sjbp/updateDkxxbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var insertDkzbbInfo = function (data, success, error) {
    request.post({
        url: "/sjbp/insertDkzbbInfo",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });

};
var updateDkzbbById = function (data, success, error) {
    request.post({
        url: "/sjbp/updateDkzbbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });
};

var getProjectInfo = function (data, success) {
    request.get({
        url: '/surve/getProjectInfo',
        query: {
            projectNo: data
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code = '200') {
                success(res.data);
            };
        },
    });
};

var getFlowInfo = function (data, success) {
    request.get({
        url: '/surve/getFlowInfo',
        query: {
            projectNo: data
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code = '200') {
                success(res.data);
            };
        },
    });
};

var ZipFiles = function (data, success) {
    request.get({
        url: '/surve/ZipFiles',
        query: {
            projectNo: data,
            isKCDJJSSMS:data.isKCDJJSSMS
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code = '200') {
                success(res.data);
            };
        },
    });
};

var ImportFileByWord = function (data, success) {
    request.get({
        url: '/surve/ZipFiles',
        query: {
            projectNo: data.projectNo,
            workid: data.workid,
            trackid: data.trackid,
            isKCDJJSSMS:data.isKCDJJSSMS
        },
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        },
    });
};


var isImport = function (data, success, error) {
    request.post({
        url: "/sjbp/isImport",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            try {
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });
};


export default {
    dict: dict, //字典
    queryTdflmjbCollectModelForList: queryTdflmjbCollectModelForList,
    deleteDkxxbById: deleteDkxxbById,//删除地块列表
    deleteAllDkxxbById: deleteAllDkxxbById,//删除全部地块列表
    deleteDkzbbById: deleteDkzbbById,//删除地块坐标
    deleteAllDkzbbById: deleteAllDkzbbById,//删除全部
    findDkxxbInfo: findDkxxbInfo,//地块列表编辑回显
    insertDkxxbInfo: insertDkxxbInfo,//地块列表新增
    updateDkzbbById: updateDkzbbById,//界址点修改
    updateDkxxbById: updateDkxxbById,//地块列表修改
    insertDkzbbInfo: insertDkzbbInfo,//界址点新增
    getProjectInfo: getProjectInfo, // 根据测绘编号获取项目类型
    getFlowInfo: getFlowInfo, // 根据测绘编号获取给所有环节信息
    ZipFiles: ZipFiles, // 根据测绘编号获取文件
    isImport: isImport,//判断是否具有导出条件
    ImportFileByWord: ImportFileByWord,// 根据编号导入文件

}