// import config from "../../../../config/config";
// import request from "../../../component/ajax";
var _storage = icu.session;
// import viewFile from "../../../../component/viewFile";


export default  {
    render: function (template, params, closeEvent) {
        var _this = this;
        var $ = layui.$,
            laydate = layui.laydate,
            upload = layui.upload,
            util = layui.util,
            laytpl = layui.laytpl,
            form = layui.form;
        var workid = '-1';
        var trackid = '-1';
        workid = _this.$query.workid;
        trackid = _this.$query.trankid;
        var workflowId = _this.$query.workflowId;
        var creator = _this.$query.userId;
        var wjId = "";
        var fjId = "";
        var fjName = "";
        var treeData = [];
        var fjData = [];
        var imageData = [];
        initForm();

        function initForm() {
            treeData = [];
            _this.$api.getFileList({
                workid: workid,
                trackid: trackid,
                workflowId: workflowId,
                creator: creator
            }, function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (!data[i].enclosureEntityList) {
                            data[i].enclosureEntityList = [];
                        };
                        for (var j = 0; j < data[i].enclosureEntityList.length; j++) {
                            var fjType = data[i].enclosureEntityList[j].enclosureName.substring(data[i].enclosureEntityList[j].enclosureName.lastIndexOf("."));//附件后缀
                            if (fjType.toLowerCase() == '.png' || fjType.toLowerCase() == '.jpg' || fjType.toLowerCase() == '.pdf') {
                                imageData.push(data[i].enclosureEntityList[j].url);
                            }
                            fjData.push(data[i].enclosureEntityList[j].url);
                        }

                    }
                    _this.$el.find("#fileName").val(data[0].fileName);
                    _this.$el.find("#id").val(data[0].id);
                    formatZtreeData(data, 0, treeData);
                    initZtree();
                    rootFuncation(data.id);
                } else {
                    _this.$el.find("#fileName").val("");
                }
                _this.$el.find("#delWj").hide();
                fjButtonHide();//控制附件的button  隐藏
                wjButtonHide();//控制文件的button  隐藏
            }, function () {

            })
        }

        function formatZtreeData(data, deplt, child) {
            var _depth = deplt || 0;
            for (let i = 0; i < data.length; i++) {
                var item = data[i];
                if (_depth == 0) {
                    var _data = {
                        id: item.id,
                        name: item.fileName,
                        open: true,
                        nodeType: 'wj',
                        children: []
                    };
                    if (item.enclosureEntityList && item.enclosureEntityList.length > 0) {
                        formatZtreeData(item.enclosureEntityList, deplt + 1, _data.children);
                    }

                } else {
                    var _data = {
                        id: item.id,
                        name: item.enclosureName,
                        open: true,
                        nodeType: 'fj',
                        fjUrl: item.url,
                    };
                    if (item.enclosureEntityList && item.enclosureEntityList.length > 0) {
                        formatZtreeData(item.enclosureEntityList, deplt + 1, _data.children);
                    }
                }
                child.push(_data);
            }

        };

        var setting_a;

        function initZtree() {
            setting_a = {
                data: {
                    simpleData: {
                        enable: true
                    }
                }, callback: {
                    onClick: zTreeOnClick,
                    onExpand: zTreeOnExpand
                }
            };
            $.fn.zTree.init($("#treeDemo"), setting_a, treeData);
        }

        function rootFuncation(treeNodeId) {
            _this.$el.find("#img").hide();
        }

        function zTreeOnClick(even, treeId, treeNode) {
            if (treeNode.nodeType == 'fj') {
                fjButtonShow();
                wjButtonHide();
                fjId = treeNode.id;
                _this.$el.find("#ajmb").hide();
                _this.$el.find("#ajTable").hide();
                fjName = treeNode.name;
                _this.$el.find("#treeDemo_1_span").attr("style", "")
                //_this.$el.find("#boxContent").empty();
                var fjTypeCS = "";//传输附件类型
                var fjType = treeNode.name.substring(treeNode.name.lastIndexOf("."));//附件后缀
                if (fjType.toLowerCase() == '.pdf' || fjType.toLowerCase() == '.png' || fjType.toLowerCase() == '.jpg') {
                    fjTypeCS = "image";
                } else if (fjType.toLowerCase() == '.txt' || fjType.toLowerCase() == '.doc' || fjType.toLowerCase() == '.docx' || fjType.toLowerCase() == '.xls' || fjType.toLowerCase() == '.xlsx') {
                    fjTypeCS = "file";
                }
                viewFile({
                    type: fjTypeCS,
                    fileList: imageData,
                    activeFile: treeNode.fjUrl
                })
            } else {
                wjButtonShow();
                fjButtonHide();
                _this.$el.find("#treeDemo_1_a").attr("style", "");
                wjId = treeNode.id;
                _this.$el.find("#ajmb").hide();
                _this.$el.find("#ajTable").show();
                _this.$el.find("#fileName").val(treeNode.name);
                _this.$el.find("#id").val(treeNode.id);
                rootFuncation(treeNode.id);
            }
        }

        function zTreeOnExpand() {

        }

        _this.$el.find('#createJnwj').click(function () {
            _this.$el.find("#ajmb").hide();
            _this.$el.find("#ajTable").show();
            _this.$el.find("#fileName").val("");
            _this.$el.find("#id").val("");
            //保存  文件
            _this.$el.find('#saveWj').click(function () {
                if (_this.$el.find("#fileName").val() == "") {
                    layer.alert("请填写文件名称再进行保存！")
                } else {
                    _this.$api.saveFile({
                        "fileName": _this.$el.find("#fileName").val(),
                        "workid": workid,
                        "trackid": trackid,
                        "creator": creator
                    }, function (data) {
                        if (data.code == 0) {
                            initForm();
                        } else {
                            layer.msg(data.msg);
                        }
                    }, function () {

                    })
                }
            });
        });
        //根据模板创建文件
        _this.$el.find('#createJnwjByMB').click(function () {
            _this.$el.find("#ajTable").hide();
            _this.$el.find("#ajmb").show();
            _this.$api.createJnwjByMB({}, function (data) {
                _this.$el.find("#mbTree").empty();
                for (var i = 0; i < data.length; i++) {
                    var jnwjmb = data[i];
                    _this.$el.find("#mbTree").append("<li><input type='checkbox' name='wjmb' value='" + jnwjmb.enclosureName + "'><span style='font-size: 16px'>" + jnwjmb.enclosureName + "</span></li>")
                }
            }, function () {

            })

        });
        _this.$el.find('#addWj').click(function () {
            var wjmb = $("input:checkbox[name='wjmb']:checked").map(function (index, elem) {
                _this.$api.saveFile({
                    "fileName": $(elem).val(),
                    "workid": workid,
                    "trackid": trackid,
                    "creator": creator
                }, function (data) {

                }, function () {

                })
                initForm();
            });
        });

        _this.$el.find('#delWj').click(function (data) {
            layer.confirm("确定要删除该文件么？", { offset: ['35%', '40%'], skin: 'con-skin' }, function (index) {
                _this.$api.delFile({
                    "id": wjId
                }, function (data) {
                    initForm();
                    layer.close(index);
                }, function () {

                })
            })
        });

        var uploadInst = upload.render({
            elem: '#uploadAttachment'
            , size: 1024 * 200
            , url: config.InterfaceAddress.affairService + '/file/uploadFile'
            , data: {
                fileId: wjId,
                creator: creator
            }
            , before: function () {
                uploadInst.config.data.fileId = wjId;
            }
            , field: 'multipartFiles'
            , accept: 'file'
            , multiple: true
            , auto: true
            , done: function (res) {
                if (res.code == 0) {
                    layer.msg("保存到数据库成功");
                } else {
                    layer.msg("保存到数据库失败");
                }
            }
            , allDone: function (res, index, upload) {
                initForm();
            }
        });

        _this.$el.find('#delAttachment').click(function (data) {
            layer.confirm("确定要删除该附件么？", { offset: ['35%', '40%'], skin: 'con-skin' }, function (index) {
                _this.$api.delEnclosure({
                    "id": fjId
                }, function (data) {
                    initForm();
                    layer.close(index);
                }, function () {

                })
            })
        });

        _this.$el.find("#batchDownload").click(function () {
            layer.confirm('是否批量下载全部附件？', {
                btn: ['确定', '取消'],
            }, function (index) {
                $("#rMenu").css({ "visibility": "hidden" });
                _this.$api.fileDownLoad({
                    "workid": workid,
                    "trackid": trackid
                }, function (data) {
                    viewFile({
                        type: "file",
                        fileList: fjData,
                        activeFile: data.data
                    })
                }, function () {

                })
                layer.close(index);
            })
        });

        /*_this.$el.find("#download").click(function () {
            layer.confirm('是否下载该附件？', {
                btn: ['确定', '取消'],
            }, function (index) {
                _this.$api.dowmLoadFileById({
                    "id": fjId
                }, function (data) {
                    var fjType = fjName.substring(fjName.lastIndexOf("."));
                    if (fjType.toLowerCase() == '.pdf' ||fjType.toLowerCase() == '.png' || fjType.toLowerCase() == '.jpg') {
                        fjType = "image";
                    } else if ( fjType.toLowerCase() == '.txt' || fjType.toLowerCase() == '.doc' || fjType.toLowerCase() == '.docx' || fjType.toLowerCase() == '.xls' || fjType.toLowerCase() == '.xlsx') {
                        fjType = "file";
                    }
                    viewFile({
                        type:fjType,
                        fileList : data.data,
                        activeFile : data.data
                    })
                }, function () {

                })
                layer.close(index);
            })
        });*/

        function fjButtonShow() {
            _this.$el.find("#delAttachment").show();
            /*_this.$el.find("#download").show();*/
        }

        function fjButtonHide() {//点附件
            _this.$el.find("#delAttachment").hide();
            /*_this.$el.find("#download").hide();*/
        }

        function wjButtonShow() {//点文件
            _this.$el.find("#uploadAttachment").show();
            _this.$el.find("#delWj").show();
        }

        function wjButtonHide() {
            _this.$el.find("#uploadAttachment").hide();
            _this.$el.find("#delWj").hide();
        }

    },

    destroy: function () {

    },
}