import imagePreview from '../../../../common/imagePreview';//'../../../component/imagePreview'
// import _config from '../../../layout/layoutConfig';
import renderView from '../../../professional/commont/renderView'


export default  {
    render: function () {
        // var workid = 'HZ918090729dffba0172a37934e105be';
        // var trackid = 'HZ918090729dffba0172a37934e105bf';
        // var workflowId = 'jsxmydysxqj';
        // var creator = '27474';
        var _this = this;

        var loading = icu.loading();

        var workid = _this.$query.workid;
        var trackid = _this.$query.trankid;
        var workflowId = _this.$query.workflowId;
        var creator = _this.$query.userId;
        var isFirst = _this.$query.isFirst;
        var accessToken = _this.$query.accessToken;
        var readonly = _this.$query.readonly;
        var token = _this.$query.token;

        var onGPViewClick = function (e) { }

 
        _this.$api.getProjectInfoByWorkid({ workid: workid, token: token }, function (data) {

            _this.$api.getFileName(workflowId, function (flowName) {
                _this.$el.find('#folwName').text(flowName);
            });
            /*_this.$api.getButtonType({
                accessToken: accessToken,
                workid: workid,
                trackid: trackid,
            }, function (buttonType) {*/
                var isEditStatus = true;
                /*if (buttonType.flowForms === null) {
                    isEditStatus = true;
                } else {
                    for (let i = 0; i < buttonType.flowForms.length; i++) {
                        const element = buttonType.flowForms[i];
                        if (element.formName == '收件资料') {
                            isEditStatus = (element.formAuthId == "alleditable")
                            break;
                        };
                    }
                };*/

                if (isEditStatus && readonly != 1) {
                    _this.$el.find('#deleteFile').show();
                    _this.$el.find('#reload').show();
                    _this.$el.find('#addRootFolder').show();
                } else {
                    _this.$el.find('#deleteFile').hide();
                    _this.$el.find('#reload').hide();
                    _this.$el.find('#addRootFolder').hide();
                };

                var zTreeObj = null;
                var zTreeOption = {
                    data: {
                        simpleData: {
                            enable: true
                        },
                        key: {
                            url: '111'
                        },
                    },
                    check: {
                        enable: true,
                        chkboxType: { "Y": "s", "N": "s" },
                    },
                    view: {
                        dblClickExpand: false,
                        addDiyDom: function (treeId, treeNode) {
                            _this.treeNode = treeNode
                            var aObj = $("#" + treeNode.tId + "_a");
                            var nameEle = $('#' + treeNode.tId + '_span');
                            if (!isEditStatus) {
                                return;
                            };
                            if (treeNode.type != 'file') {
                                nameEle.append(' ( ' + treeNode.fileLength + ' )');
                                if (treeNode.level < 2) {
                                    var plus = $('<span class="edit-icon" title="添加文件夹"><i class="fa fa-plus" aria-hidden="true"></i></span>');
                                    plus.click(function () {
                                        var node = zTreeObj.addNodes(treeNode, 0, {
                                            name: '新建文件夹',
                                            type: 'folder',
                                            pid: treeNode.fileId,
                                            iconSkin: 'custom-folder-user',
                                        }, false);
                                        setTimeout(() => {
                                            zTreeObj.editName(node[0]);
                                        }, 10);
                                        setTimeout(() => {
                                            //document.getElementById(node[0].tId + '_input').setAttribute('maxlength','100');
                                            $('#' + node[0].tId + '_input').focus().select();
                                            $('#' + node[0].tId + '_input').selectionStart = 0;
                                            $('#' + node[0].tId + '_input').selectionEnd = $('#' + node[0].tId + '_input').val().length;
                                        }, 20);
                                    });
                                    if (readonly != 1) {
                                        aObj.append(plus);
                                    }
                                };
                                var pencil = $('<span class="edit-icon" title="编辑名称"><i class="fa fa-pencil" aria-hidden="true"></i></i></span>');
                                pencil.click(function () {
                                    zTreeObj.editName(treeNode);
                                    setTimeout(() => {
                                        //document.getElementById(treeNode.tId + '_input').setAttribute('maxlength','100');
                                        $('#' + treeNode.tId + '_input').focus().select();
                                        $('#' + treeNode.tId + '_input').selectionStart = 0;
                                        $('#' + treeNode.tId + '_input').selectionEnd = $('#' + treeNode.tId + '_input').val().length;
                                    }, 20);
                                });
                                if (readonly != 1) {
                                    aObj.append(pencil);
                                }
                                var trash = $('<span class="edit-icon" title="删除文件夹"><i class="fa fa-trash" aria-hidden="true"></i></span>')
                                if (readonly != 1) {
                                    aObj.append(trash);
                                }
                                trash.click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation()
                                    top.layer.confirm('确认是否删除？（删除文件夹时，文件夹下文件会一同删除）', {
                                        skin: "con-skin",
                                        btn: ['确定', '取消']//按钮
                                    }, function (res) {
                                        // 关闭确认框
                                        top.layer.close(res);
                                        _this.$api.deleteFilder({
                                            id: treeNode.id,
                                            'workid': workid,
                                            'trackid': trackid,
                                        }, function () {
                                            renderTree();
                                        });
                                    });
                                });

                                var uploadFile = $('<span class="edit-icon" title="上传文件"><i class="fa fa-upload" aria-hidden="true"></i></span>');
                                if (readonly != 1) {
                                    aObj.append(uploadFile);
                                }
                                var updataButton = $('<div class="upload" style="display:none"></div>');
                                //var fileArray = [];
                                //console.log(layui.upload)
                                layui.upload.render({
                                    elem: uploadFile[0]
                                    , url: config.InterfaceAddress.affairService + '/file/uploadFile'
                                    , field: "multipartFiles"
                                    , accept: 'file'
                                    , bindAction: updataButton[0]
                                    , multiple: true
                                    , auto: false
									                  , size: (300 * 1024)
                                    , choose: function (obj) {
                                        //fileArray = [];
                                        //将每次选择的文件追加到文件队列
                                        // var files = obj.pushFile();
                                        var allFileReady = true;

                                        //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                                        obj.preview(function (index, file, result) {
                                            if (file.size == 0) {
                                                top.layer.open({
                                                    title: '警告',
                                                    content: '上传文件列表中，包含空文件, 已经停止上传'
                                                });
                                                allFileReady = false;
                                            };
                                        });
                                        setTimeout(function () {
                                            if (allFileReady) {
                                                updataButton.click();
                                            };
                                        }, 150);
                                    }
                                    , before: function (obj) {
                                        //console.log(obj);
                                        loading.show();
                                    }
                                    , data: {
                                        fileId: treeNode.id,
                                        creator: creator,
                                    }
                                    , allDone: function (obj) {
                                        // console.log(treeNode);
                                        loading.hide();
                                        renderTree();
                                    }
                                });
                            } else {
                                var _delete = $('<span class="edit-icon" title="删除"><i class="fa fa-trash" aria-hidden="true"></i></span>');
                                if (readonly != 1) {
                                    aObj.append(_delete);
                                }
                                _delete.click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation()
                                    top.layer.confirm(('确认是否删除？（删除文件夹时，文件夹下文件会一同删除）'), {
                                        skin: "con-skin",
                                        btn: ['确定', '取消']//按钮
                                    }, function (res) {
                                        // 关闭确认框
                                        top.layer.close(res);
                                        _this.$api.deleteFile(treeNode.id, function () {
                                            renderTree();
                                        });
                                    });
                                });
                                //var _downloadFile = $('<a href="'+affairService+'/file/dowmLoadFileById?id='+treeNode.id+'"><span class="edit-icon" title="下载附件"><i class="fa fa-download" aria-hidden="true"></i></span></a>')
                                var _downloadFile = $('<a href="' + config.InterfaceAddress.affairService + '/file/dowmLoadFileById?id=' + treeNode.id + "&workid=" + workid + '"><span class="edit-icon" title="下载附件"><i class="fa fa-download" aria-hidden="true"></i></span></a>')
                                _downloadFile.click(e => {
                                    e.stopPropagation()
                                })
                                aObj.append(_downloadFile);
                            };
                        },
                    },
                    callback: {
                        onClick: function (event, treeId, treeNode, clickFlag) {
                            _this.$el.find('#viewBox').empty();
                            var url = treeNode.eurl;
                            var url1 = config.InterfaceAddress.affairService + '/file/dowmLoadFileById?id=' + treeNode.id + "&workid=" + workid;//自然资源后台下载
                            if (treeNode.type == 'folder') {
                                console.log(treeNode)
                                _this.treeNode = treeNode
                                return false;
                            } else {
                                var type = url.substring(url.lastIndexOf(".") + 1, url.length).toLocaleLowerCase();
                                if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif') {
                                    _this.$el.find('#viewBox').css('display', 'block')
                                    _this.$el.find('.gpyviewbox').css('display', 'none');
                                    new imagePreview(_this.$el.find('#viewBox'), url);
                                    // _this.$el.find('#viewBox').html('<div class="viewImage"><img src="' + url + '" /></div>');
                                } else if (type == 'doc' || type == 'docx' || type == 'xls' || type == 'xlsx' || type == 'ppt' || type == 'pptx') {
                                    downloadFles(url1);
                                    // POBrowser.openWindowModeless(apiPath.renrenService + '/renren-admin/pageoffice/openwork?url=' + url, 'width=1824px;height=950px;');
                                } else if (type == 'txt' || type == 'js' || type == 'css' || type == 'html') {
                                    _this.$el.find('#viewBox').css('display', 'block')
                                    _this.$el.find('.gpyviewbox').css('display', 'none');
                                    _this.$el.find('#viewBox').html('<div class="viewImage"><iframe class="iframeView" src="' + url + '"></iframe></div>');

                                    // $.ajax({
                                    //     url: url,
                                    //     beforeSend: function (request) {
                                    //         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=gb2312');
                                    //     },
                                    //     success: function (res) {
                                    //         _this.$el.find('#viewBox').html('<pre>' + res + '</pre>');
                                    //     }
                                    // });
                                } else if (type == 'pdf') {
                                    top.layer.open({
                                        type: 2,
                                        title: '查看附件',
                                        shadeClose: true,
                                        shade: 0.2,
                                        area: ['95%', '95%'],
                                        content: url+"#toolbar=0&statusbar=0"
                                    });
                                } else {
                                    downloadFles(url1);
                                    // var elemIF = document.createElement("iframe");
                                    // elemIF.src = url;
                                    // elemIF.style.display = "none";
                                    // document.body.appendChild(elemIF);
                                };
                            }
                        },
                        onDblClick: function (event) {
                            event.stopPropagation();
                        },
                        onRename: function (event, treeId, treeNode, isCancel) {
                            _this.$api.editFilder({
                                'id': treeNode.id || null,
                                'workid': workid,
                                'trackid': trackid,
                                'workflowId': workflowId,
                                'fileName': treeNode.name,
                                'pid': treeNode.pid || '0',
                                'creator': creator,
                                'fileId': treeNode.fileId || null,
                            }, function (res) {
                                renderTree();
                            });
                        },
                    },
                };
                var renderTree = function (data) {
                    _this.$el.find('#viewBox').empty();
                    _this.$api.getFileAndFolderData({
                        'workid': workid,
                        'trackid': trackid,
                        'workflowId': workflowId,
                        'creator': creator,
                    }, function (res) {

                         console.log(res);

                        if (zTreeObj) {
                            zTreeObj.destroy();
                        };
                        
                        zTreeObj = $.fn.zTree.init(_this.$el.find('#tree'), zTreeOption, res);
                        zTreeObj.expandAll(true);
                    });
                };

                _this.$el.find('.closeBox').css('display', 'none')
                _this.$el.find('.closeBox').unbind().bind('click', function(){
                    _this.$el.find('.closeBox').css('display', 'none')
                })
                _this.$el.find('#addRootFolder').click(function () {
                    var node = zTreeObj.addNodes(null, 0, {
                        name: '新建文件夹',
                        type: 'folder',
                        iconSkin: 'custom-folder-user',
                    }, false);
                    setTimeout(() => {
                        zTreeObj.editName(node[0]);
                    }, 10);
                    setTimeout(() => {
                        //document.getElementById(node[0].tId + '_input').setAttribute('maxlength','100');
                        $('#' + node[0].tId + '_input').focus().select();
                        $('#' + node[0].tId + '_input').selectionStart = 0;
                        $('#' + node[0].tId + '_input').selectionEnd = $('#' + node[0].tId + '_input').val().length;
                    }, 20);
                });
                _this.$el.find('#reload').click(function () {
                    top.layer.confirm('是否重置整个目录结构?', {
                        skin: "con-skin",
                        btn: ['确定', '取消']//按钮
                    }, function (res) {
                        // 关闭确认框
                        top.layer.close(res);
                        _this.$api.reloadFolders({
                            'creator': creator,
                            'workid': workid,
                            'trackid': trackid,
                            'workflowId': workflowId
                        }, function () {
                            renderTree();
                        });
                    });
                });

                var downloadFles = function (url) {
                    var elemIF = document.createElement("iframe");
                    elemIF.src = url;
                    elemIF.style.display = "none";
                    document.body.appendChild(elemIF);
                };

                _this.$el.find('#download').click(function (e) {

                    e.stopPropagation()
                    _this.$api.downFiles({
                        'workid': workid,
                        'trackid': trackid,
                        'filename': _this.$el.find('#folwName').text()
                    }, function (url) {
                        try {
                            var data = JSON.parse(url);
                            if (data.code == '200' || data.code == '0') {
                                downloadFles(data.data);
                            } else {
                                top.layer.open({
                                    title: '警告',
                                    content: data.msg
                                });
                            }
                        } catch (error) {
                            var isSupportDownload = 'download' in document.createElement('a');
                            if (isSupportDownload) {
                                var $a = $("<a></a>");
                                $a.attr({
                                    href: url,
                                    download: 'filename'
                                }).hide().appendTo($("body"))[0].click();
                            } else {
                                window.open(url);
                            };
                        };
                    }
                    );
                    //_this.$api.delFileZip();
                });
                _this.$el.find('#deleteFile').click(function () {
                    var nodes = zTreeObj.getCheckedNodes();
                    if (nodes.length == 0) {
                        top.layer.open({
                            title: '警告',
                            content: '请选择文件或文件夹进行删除'
                        });
                        return;
                    };
                    top.layer.confirm('确认是否删除？（删除文件夹时，文件夹下文件会一同删除）', {
                        skin: "con-skin",
                        btn: ['确定', '取消']//按钮
                    }, function (res) {
                        loading.show();
                        var deleteFileSuccess = false;
                        var deleteFolderSuccess = false;

                        // 关闭确认框
                        top.layer.close(res);
                        var fileList = [];
                        var folderList = [];
                        for (let i = 0; i < nodes.length; i++) {
                            const element = nodes[i];
                            if (element.type == 'file') {
                                fileList.push(element.id);
                            } else {
                                folderList.push(element.id);
                            }
                        };
                        var fileIdString = '';
                        if (fileList.length != 0) {
                            fileIdString = fileList.join(',');
                            _this.$api.deleteFile(fileIdString, function () {
                                deleteFileSuccess = true;
                                if (deleteFileSuccess && deleteFolderSuccess) {
                                    loading.hide();
                                };
                                renderTree();
                            });
                        } else {
                            deleteFileSuccess = true;
                        };
                        var folderIdString = '';
                        if (folderList.length != 0) {
                            folderIdString = folderList.join(',');
                            _this.$api.deleteFilder({
                                id: folderIdString,
                                'workid': workid,
                                'trackid': trackid,
                            }, function () {
                                deleteFolderSuccess = true;
                                if (deleteFileSuccess && deleteFolderSuccess) {
                                    loading.hide();
                                };
                                renderTree();
                            });
                        } else {
                            deleteFolderSuccess = true;
                        };
                    });
                });
                if (isFirst == '0') {
                    _this.$api.reloadFolders({
                        'creator': creator,
                        'workid': workid,
                        'workflowId': workflowId,
                        'trackid': trackid,
                    }, function () {
                        renderTree();
                    });
                } else {
                    renderTree();
                };
            // });

        }, function () { });
    },
    destroy: function () {

    },
}