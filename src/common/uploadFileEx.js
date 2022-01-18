
var uploadFileItem = function (options) {
    this.id = options.id;
    this.url = options.url;
    this.parent = options.parent;
    this.index = options.index;
    this.file = options.file;
    this.obj = options.obj;
    this.disable = options.disable;

    // this.lookButton = $('<button class="layui-btn layui-btn-xs test-upload-demo-reload" type="button">查看</button>');
    this.deleteButton = $('<button class="layui-btn layui-btn-ys test-upload-demo-delete" >删除</button>');
    this.uploadButton = $('<button class="layui-btn layui-btn-ys test-upload-demo-delete" type="button" style="margin-left:10px">重传</button>');
    var _this = this;
    this.deleteButton.click(function () {
        _this.deleteAjax();
    });
    // this.lookButton.css({
    //     display: 'none',
    // });

    this.uploadButton.css({
        display: 'none',
    });
    if (this.id) {
        status = '上传成功'
    } else {
        status = '等待上传'
    };
// <div style="max-width: 300px;width: 300px!important;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"></div>
    this.html = $(`
    <tr class="upload">
        <td class="header-checkbox" style="display: none">
            <div class="layui-unselect layui-form-checkbox" lay-skin="primary" style="margin: 0px; padding-left: 18px;">
                <i class="layui-icon layui-icon-ok"></i>
            </div>
        </td>
        <td><span class="FileName">${this.file.name}</span></td>
        <td class="FileStatus" style="width:100px;min-width:100px !important;max-width:100px !important">${status}</td>
        <td style="display:none" class="buttonLayout"></td>
    </tr>
    `);
    this.FileStatus = this.html.find('.FileStatus');
    this.buttonLayout = this.html.find('.buttonLayout');

    this.buttonLayout.append(this.deleteButton);
    this.buttonLayout.append(this.uploadButton);
    this.headerCheckbox = this.html.find('.header-checkbox');

    this.select = false;
    this.checkBox = this.html.find('.layui-form-checkbox');

    // layui-form-checked

    this.checkBox.click(function () {
        if (_this.disable) {
            return;
        };
        var value = !_this.select;
        // console.log(value);
        _this.setCheckBoxValue(value);
        _this.parent.checkAllSelectStatus();
    });
    if (this.disable) {
        this.checkBox.addClass('layui-disabled');
    };
    if (this.parent.canUploadFile) {
        this.changeStatus('canUploadFile');
    };
    if (this.parent.canDownLoadFile) {
        this.changeStatus('canDownLoadFile');
    };

    if (this.id) {
        this.lookUpFile();
    };



};
uploadFileItem.prototype.render = function () {
    return this.html;
};

uploadFileItem.prototype.lookUpFile = function () {
    var _this = this;
    this.html.find('.FileName').css({
        cursor: 'pointer',
        color: '#1E9FFF',
        'text-decoration': 'underline'
    });
    this.html.find('.FileName').click(function () {

        var $a = $("<a>");
        $a.attr({
            href: config.InterfaceAddress.implementService + '/common/dowmLoadFileById?enclosureId='+_this.id
        }).hide().appendTo($("body"))[0].click();
    });
};

uploadFileItem.prototype.setId = function (id) {
    this.disable = false;
    this.checkBox.removeClass('layui-disabled');
    this.id = id;
    this.lookUpFile();
    this.uploadButton.css('display', 'none');
    this.FileStatus.text('上传成功');
};
uploadFileItem.prototype.reloadFile = function () {
    // console.log('待测试');
    // this.parent.reloadFle(this.index, this.file);
};
uploadFileItem.prototype.onError = function (upload) {
    var _this = this;
    this.uploadButton.css('display', 'inline-block');
    this.FileStatus.html('<span style="color: #FF5722;">上传失败</span>');
    this.uploadButton.click(function () {
        _this.obj.upload(_this.index, _this.file);
    });
};
uploadFileItem.prototype.deleteItem = function () {
    this.html.remove();
    if (this.id) {
        this.parent.removeItem(this.id);
    } else {
        this.parent.removeItem(this.index);
    };
};
uploadFileItem.prototype.deleteAjax = function () {
    var _this = this;
    if (this.id) {
        var field = {
            infoId: this.id
        };
        top.layer.confirm('确认删除吗？', function (index) {
            $.ajax({
                async: true,    //表示请求是否异步处理
                type: "post",    //请求类型
                url: config.InterfaceAddress.implementService + '/transaction/delFile',
                contentType: "application/json",
                dataType: "json",//返回的数据类型
                data: JSON.stringify(field),
                success: function (res) {
                    if (res.code == 200) {
                        _this.deleteItem();
                        top.layer.msg("删除成功！")
                    }
                },
                error: function (res) {
                    top.layer.msg("服务器出现错误！")
                }
            });
        })
    } else {
        _this.deleteItem();
    };
};
uploadFileItem.prototype.setCheckBoxValue = function (value) {
    if (value) {
        this.select = true;
        this.checkBox.addClass('layui-form-checked');
    } else {
        this.select = false;
        this.checkBox.removeClass('layui-form-checked');
    };
};
uploadFileItem.prototype.changeStatus = function (str) {
    if (str == 'canUploadFile') {
        this.buttonLayout.show();
    };
    if (str == 'canDownLoadFile') {
        this.headerCheckbox.show();
    };
};


var uploadFilelayout = function (options) {


    // $('body').append("<script src=" + gwglUrlPrefix + "/jquery.min.js><\/script>");
    // $('body').append("<script src=\"" + setter.InterfaceAddress.AnalysisServiceTest + "/pageoffice.js\" id=\"po_js_main\"><\/script>");
    // document.write("<script src=" + gwglUrlPrefix + "/pageoffice.js id='po_js_main'><\/script>");

    var _this = this;
    this.upload = options.upload;
    this.form = options.form;
    this.chileFileList = {};
    this.downloadUrl = '';
    this.uploadEvent = null;
    this.html = $(`
        <div style="width: 100%;">
            <div class="layui-form-item xiugai" id="uploadDiv" style="margin-bottom: 10px">
                <div class="layui-btn-right" style="float: left;margin-left: 110px">
                    <button class="layui-btn layui-btn-ys layui-btn-sm upload-file-element" style="display: none">
                        <i class="buttonIcon link"></i>选择文件
                    </button>
                    <input class="layui-upload-file" type="file" accept="" name="multipartFiles" multiple="">
                    <button class="layui-btn layui-btn-ys layui-btn-sm line-style downLoad-file-element" type="button" id="downLoad" style="display: none">
                        <i class="buttonIcon deal"></i>打包下载
                    </button>
                    <button class="layui-btn layui-btn-ys layui-btn-sm test-upload-testListAction" style="display: none"><i class="buttonIcon deal"></i>开始上传</button>
                </div>
            </div>
            <div class="xiugai" >
                <div class="layui-upload-list fileLIstLayout" id="fileList" style="margin-left: 110px">
                    <table class="layui-table">
                        <thead>
                        <tr>
                            <th class="header-checkbox" style="display: none" width="15">
                                <div class="layui-unselect layui-form-checkbox" lay-skin="primary" style="margin: 0px; padding-left: 18px;">
                                    <i class="layui-icon layui-icon-ok"></i>
                                </div>
                            </th>
                            <th>文件名</th>
                            <th>状态</th>
                            <th class="header-event-box" style="display: none">操作</th>
                        </tr></thead>
                        <tbody class="uploadFileListTableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
        `);
    this.chooseFileButton = this.html.find('.upload-file-element');




    this.downLoadFileButton = this.html.find('.downLoad-file-element');
    this.downLoadFileButton.click(() => {
        _this.SelectFileData(true);
    });

    this.selectAll = false;
    this.selectAllCheckBox = this.html.find('.layui-form-checkbox');
    this.selectAllCheckBox.click(function () {
        var value = !_this.selectAll;
        _this.changeAllSelectStatus(value);
        _this.changeAllChildSelect(value);
    });


    this.headerCheckbox = this.html.find('.header-checkbox');
    this.headerEventBox = this.html.find('.header-event-box');

    this.listLayout = this.html.find('.fileLIstLayout');
    this.tableBody = this.html.find('.uploadFileListTableBody');

    this.uploadFileButton = this.html.find('.test-upload-testListAction');

    this.canUploadFile = false;
    this.canDownLoadFile = false;
};

uploadFilelayout.prototype.render = function () {
    return this.html;
};
uploadFilelayout.prototype.removeItem = function (id) {
    if (this.chileFileList.hasOwnProperty(id)) {
        delete this.chileFileList[id];
    };
    this.checkDeleteStatus();

};
uploadFilelayout.prototype.checkDeleteStatus = function () {
    var _length = 0;
    for (const key in this.chileFileList) {
        if (this.chileFileList.hasOwnProperty(key)) {
            const element = this.chileFileList[key];
            if (element.FileStatus.text() != "上传成功") {
                _length++
            }
        }
    };
    if (!_length) {
        this.uploadFileButton.hide();
    };
};
uploadFilelayout.prototype.renderFileList = function (url) {
    var _this = this;
    $.ajax({
        async: false,    //表示请求是否异步处理
        type: "post",    //请求类型
        url: url,
        contentType: "application/json",
        dataType: "json",//返回的数据类型
        data: {},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                _this.chileFileList[item.enclosureId] = new uploadFileItem({
                    id: item.enclosureId,
                    parent: _this,
                    file: {
                        name: item.enclosureName
                    },
                    url: item.enclosureUrl,
                });
                _this.tableBody.append(_this.chileFileList[item.enclosureId].render());
            };

            // _this.form.render('checkbox');
            _this.html.find('.layui-unselect.layui-form-checkbox').css({
                margin: 0
            });
            _this.html.find('.layui-form-checkbox[lay-skin=primary]').css({
                'padding-left': '18px'
            });
        },
        error: function (res) {
            // console.log(res)
            top.layer.msg("错误！")
        }
    });
};
uploadFilelayout.prototype.checkAllSelectStatus = function () {
    var isAllSelect = true;
    for (const key in this.chileFileList) {
        if (this.chileFileList.hasOwnProperty(key)) {
            const element = this.chileFileList[key];
            if (!element.disable) {
                if (!element.select) {
                    isAllSelect = false;
                    break;
                };
            };
        }
    };
    if (isAllSelect && !this.selectAll) {
        this.changeAllSelectStatus(true);
    } else if (!isAllSelect && this.selectAll) {
        this.changeAllSelectStatus(false);
    };
};
uploadFilelayout.prototype.changeAllSelectStatus = function (value) {
    if (value) {
        this.selectAll = true;
        this.selectAllCheckBox.addClass('layui-form-checked');
    } else {
        this.selectAll = false;
        this.selectAllCheckBox.removeClass('layui-form-checked');
    };
};
uploadFilelayout.prototype.changeAllChildSelect = function (value) {
    for (const key in this.chileFileList) {
        if (this.chileFileList.hasOwnProperty(key)) {
            const element = this.chileFileList[key];
            if (!element.disable) {
                element.setCheckBoxValue(value);
            };
        }
    };
};
uploadFilelayout.prototype.changeAllChildStatus = function (str) {
    for (const key in this.chileFileList) {
        if (this.chileFileList.hasOwnProperty(key)) {
            const element = this.chileFileList[key];
            element.changeStatus(str);
        }
    };
};
uploadFilelayout.prototype.init = function (initUrl, postData) {
    var _this = this;
    this.tableBody.empty();
    this.chileFileList = {};

    this.chooseFileButton.show();
    this.headerEventBox.show();
    this.canUploadFile = true;

    this.changeAllChildStatus('canUploadFile');

    this.uploadEvent = this.upload.render({
        elem: this.chooseFileButton
        , url: initUrl
        , accept: 'file'
        , field: "multipartFiles"
        , multiple: true
        , auto: false
        , data: postData
        , bindAction: this.uploadFileButton
        , choose: function (obj) {
            obj.pushFile();
            //读取本地文件
            obj.preview(function (index, file, result) {
                _this.chileFileList[index] = new uploadFileItem({
                    index: index,
                    file: file,
                    parent: _this,
                    obj: obj,
                    disable: true,
                });
                _this.tableBody.append(_this.chileFileList[index].render());
                _this.uploadFileButton.show();
                _this.uploadEvent.config.elem.next()[0].value = '';
            });
        }
        , allDone: function (obj) {
            _this.checkDeleteStatus();
        }
        , done: function (res, index, upload) {
            if (res.code == 200) { //上传成功
                if (_this.chileFileList.hasOwnProperty(index)) {
                    _this.chileFileList[index].setId(res.enclosureList[0]);
                    _this.chileFileList[res.enclosureList[0]] = _this.chileFileList[index];
                    delete _this.chileFileList[index];
                };
            } else {
                _this.chileFileList[index].onError();
            };
        },
    });
};
uploadFilelayout.prototype.getData = function () {
    var _array = [];
    var isNotAllRight = false;
    
    for (const key in this.chileFileList) {
        if (this.chileFileList.hasOwnProperty(key)) {
            const element = this.chileFileList[key];
            if (element.id) {
                _array.push(element.id);
            } else {
                isNotAllRight = true;
            }
        }
    };

    if (isNotAllRight) {
        return {
            error: isNotAllRight,
            message: '有文件尚未上传完成',
            obj: _array.join(','),
        }
    } else {
        return {
            error: null,
            message: '',
            obj: _array.join(','),
        }
    };
};

uploadFilelayout.prototype.renderDownloadData = function (url) {
    this.downloadUrl = url;
    this.downLoadFileButton.show();
    this.headerCheckbox.show();
    this.canDownLoadFile = true;
    this.changeAllChildStatus('canDownLoadFile');
};

uploadFilelayout.prototype.SelectFileData = function (doDown) {
    var fileArray = [];
    for (const key in this.chileFileList) {
        if (this.chileFileList.hasOwnProperty(key)) {
            const element = this.chileFileList[key];
            if (element.select) {
                fileArray.push(element.id);
            };
        }
    };
    if (this.downloadUrl && doDown) {
        if (fileArray.length == 0) {
            top.layer.msg('请勾选需要下载的文件')
        } else {
            $.ajax({
                type: "POST",
                url: this.downloadUrl,
                data: JSON.stringify({ "idList": fileArray }),
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (data) {
                    // console.log(data)
                    if (data.code == "200") {
                        var isSupportDownload = 'download' in document.createElement('a');
                        if (isSupportDownload) {
                            var $a = $("<a>");
                            $a.attr({
                                href: data.url,
                                download: 'filename'
                            }).hide().appendTo($("body"))[0].click();
                        } else {
                            window.open(data.url)
                        }
                    }
                },
                error: function () {
                    top.layer.msg("打包下载失败！！！");
                }
            });
        }
    } else {
        return fileArray;
    };
}

export default {
    uploadFilelayout,

}




