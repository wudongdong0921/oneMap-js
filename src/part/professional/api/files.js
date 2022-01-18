import request from '../../../common/ajax';
// import util from '../component/util';

var util = icu.util;

var getFileName = function (data, success) {
    request.post({
        url: '/file/getProdefByWorkflowId',
        query: { "workflowId": data },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data.flowname);
            };
        },
    });
}

var getFolders = function (data, success) {
    request.post({
        url: '/file/getEnclosureInfo',
        loading: false,
        query: {
            workid: data.workid,
            trackid: data.trackid,
            workflowId: data.workflowId,
            creator: data.creator,
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });

};

var getFiles = function (data, success) {
    request.post({
        url: '/file/getFileList',
        loading: false,
        query: {
            workid: data.workid,
            trackid: data.trackid,
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });
};

var editFilder = function (data, success) {
    request.post({
        url: '/file/saveFile',
        data: {
            "id": data.id,
            'fileId': data.fileId,
            "fileName": data.fileName,
            "workid": data.workid,
            "trackid": data.trackid,
            "creator": data.creator,
            "pid": data.pid,
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });
};

var deleteFilder = function (data, success) {
    request.post({
        url: '/file/delFile',
        loading: false,
        query: {
            "id": data.id,
            'workid': data.workid,
            'trackid': data.trackid,
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });
};

var deleteFile = function (id, success) {
    request.post({
        url: '/file/delEnclosure',
        loading: false,
        query: {
            "id": id
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });
};

var getFileAndFolderData = function (data, success) {
    getFolders(data, function (res) {
        var filderData = res;
        var folderBoj = {};
        for (let i = 0; i < filderData.length; i++) {
            let element = filderData[i];
            element.iconSkin = 'custom-folder-user';
            element.name = element.fileName;
            element.fileLength = element.enclosureEntityList.length;
            element.type = 'folder'
            element.folderChild = [];
            folderBoj[element.fileId] = element;
        };
        var resArray = [];
        for (let i = 0; i < filderData.length; i++) {
            const element = filderData[i];
            if (folderBoj.hasOwnProperty(element.pid)) {
                let folder = folderBoj[element.pid];
                if (folder.hasOwnProperty('children')) {
                    folder['children'].push(element);
                } else {
                    folder['children'] = [];
                    folder['children'].push(element);
                };
            } else {
                resArray.push(element);
            };
        };
        var fileObject = {};
        for (const key in folderBoj) {
            if (folderBoj.hasOwnProperty(key)) {
                const element = folderBoj[key];
                fileObject[element.id] = element;
            }
        };

        for (const key in folderBoj) {
            if (folderBoj.hasOwnProperty(key)) {
                const element = folderBoj[key];
                if (element.pid && folderBoj.hasOwnProperty(element.pid)) {
                    var parent = folderBoj[element.pid];
                    if (parent.hasOwnProperty('folderChild')) {
                        parent.folderChild.push(element);
                    };
                };
            }
        };

        var getChildFileLingth = function (obj) {
            var fileLength = obj.enclosureEntityList.length || 0;
            if (obj.folderChild.length) {
                for (let i = 0; i < obj.folderChild.length; i++) {
                    const element = obj.folderChild[i];
                    var _length = getChildFileLingth(element);
                    fileLength += _length;
                }
            };
            return fileLength;
        };

        for (var key in fileObject) {
            var _fileItem = fileObject[key];
            var _length = getChildFileLingth(_fileItem);
            _fileItem.fileLength = _length;
        }

        getFiles(data, function (res) {
            var fileData = res;
            for (let i = 0; i < fileData.length; i++) {
                let element = fileData[i];
                var type = util.getSuffixType(element.url);
                element.iconSkin = 'custom-icon-' + type;
                element.eurl = element.url;
                element.type = 'file';
                element.name = element.enclosureName;
                delete element.url;
                delete element.enclosureName;
                if (fileObject.hasOwnProperty(element.fileId)) {
                    let folder = fileObject[element.fileId];
                    if (folder.hasOwnProperty('children')) {
                        folder['children'].push(element);
                    } else {
                        folder['children'] = [];
                        folder['children'].push(element);
                    };
                };
            };
            success(resArray);
        });
    });
};

var reloadFolders = function (data, success) {
    request.post({
        url: '/file/reset',
        query: {
            "workid": data.workid,
            "trackid": data.trackid,
            "workflowId": data.workflowId,
            "creator": data.creator
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });
};


var downFiles = function (data, success) {
    request.post({
        url: '/file/fileDownLoad',
        query: {
            "workid": data.workid,
            "trackid": data.trackid,
            'filename': data.filename
        },
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            };
        },
    });
};

var getButtonType = function (data, success) {
    request.post({
        url: '/wintoppublicinterfaceGW/workflow/openToButton',
        data: {
            accessToken: data.accessToken,
            workId: data.workid,
            trackId: data.trackid,
        },
        devUrl: 'commonService',
        success: function (res) {
            if (res.code == 200) {
                success(res.data);
            };
        },
    });
};

var getProjectInfoByWorkid = function (data, success, error) {
    request.post({
        url: '/manage/getProjectInfoByWorkid',
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

var delFileZip = function () {
    request.post({
        url: '/file/delFileZip',
        async: false,
        devUrl: 'affairService',
    });
};
var savePhoto64 = function (data, success) {
    request.post({
        url: '/file/savePhoto64',
        data: data,
        devUrl: 'affairService',
        success: function (res) {
            if (res.code == 0) {
                success(res.data);
            } else {
                error();
            };
        },
    });
};


export default {
    getFolders: getFolders, // 获取文件夹列表
    getFiles: getFiles, // 获取附件列表
    editFilder: editFilder, // 创建修改文件夹
    deleteFilder: deleteFilder, // 删除文件夹
    deleteFile: deleteFile, // 删除文件
    getFileAndFolderData: getFileAndFolderData, // 获取树结构
    getFileName: getFileName, // 获取流程名称
    reloadFolders: reloadFolders, // 重置附录列表
    downFiles: downFiles, // 打包下载全部文件
    getButtonType: getButtonType, // 获取流程按钮权限状态
    getProjectInfoByWorkid: getProjectInfoByWorkid,//判断有没有暂存
    delFileZip: delFileZip,//删除项目下的zip包
    savePhoto64: savePhoto64,//高拍仪储存本地图片
}