import imagePreview from '../../../../../../common/imagePreview';
//id div 的id，isMultiple 是否多选，chkboxType 多选框类型{"Y": "ps", "N": "s"} 详细请看ztree官网
var setting = {
    view: {
        dblClickExpand: false,
        showLine: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0"
        }
    },
    check: {
        enable: false,
        chkboxType: {"Y": "ps", "N": "s"}
    },
    callback: {
        onClick: onClick,
        onCheck: onCheck,
        beforeClick: beforeClick
    }

};
var _this=this

function initSelectTree(id, isMultiple, chkboxType, zNodes,operationType,readonly,that) {
    if (isMultiple) {
        setting.check.enable = isMultiple;
    }
    if(that){
        _this=that
    }
    if (chkboxType !== undefined && chkboxType != null) {
        setting.check.chkboxType = chkboxType;
    }
    var html = '<div class = "layui-select-title" >' +
        '<input id="' + id + 'Show"' + 'type = "text" placeholder = "- 请选择 -" value = "" class = "layui-input" readonly style="height:30px;">' +
        '<i class= "layui-edge" id="dsj"></i>' +
        // '<div id="' + id + 'Show"' + 'value = "" class = "" readonly></div>' +
        '</div>';
    var a = _this.$el.find("#" + id);

    if(_this.$el.find("#" + id).html().indexOf('- 请选择 -') == -1){
        _this.$el.find("#" + id).parent().find(".tree-content").remove();
        _this.$el.find("#" + id).append(html);
    } else {
        _this.$el.find("#" + id).parent().find(".tree-content").remove();
        $("#" + id).unbind();
        _this.$el.find("#" + id + 'Show').val('');
    }

    _this.$el.find("#" + id).parent().append('<div class="tree-content scrollbar" hidden style="border:1px solid #d2d2d2;height:135px;background-color:#ffffff;z-index:99">' +
        '<input hidden id="' + id + 'Hide" ' +
        'name="' + _this.$el.find(".select-tree").attr("id") + '">' +
        '<input hidden id="' + id + 'HideDevId" ' +
        'name="' + _this.$el.find(".select-tree").attr("id") + '">' +
        '<ul id="' + id + 'Tree" class="ztree scrollbar" style="margin-top:0px;height:125px;overflow-y:auto;"></ul>' +
        '</div>');

    _this.$el.find("#" + id).bind("click", function () {
        if(readonly==1||"readonly"==operationType){
            hideMenu(id);
            return;
        }
        if ($(this).parent().find(".tree-content").css("display") !== "none") {
            hideMenu(id)
        } else {
            $(this).addClass("layui-form-selected");
            var Offset = $(this).offset();
            var width = $(this).width() - 2;
            $(this).parent().find(".tree-content").css({
                left: Offset.left + "px",
                top: Offset.top + $(this).height() + "px"
            }).slideDown("fast");
            $(this).parent().find(".tree-content").css({
                width: width
            });
            _this.$el.find("body").bind("mousedown", onBodyDown);
        }
    });
    $.fn.zTree.init(_this.$el.find("#" + id + "Tree"), setting, zNodes);
}

function beforeClick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    var isMultiple = setting.check.enable;
    if(isMultiple) {
        if (!check)
            layer.msg(treeNode.name + "不能选取", {offset: ['14%', '45%']}, function () {
            });
    } else {
        if(treeNode.pid == 0) {
            layer.msg(treeNode.name + "不能选取", {offset: ['14%', '45%']}, function () {
            });
        } else {
            check = true;
        }
    }
    return check;
}


function onClick(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    var nodes = zTree.getSelectedNodes();
    if (nodes[0].children) {
        layer.msg(treeNode.name + "不能选取,请选取具体文件", {offset: ['14%', '45%']}, function () {
        });
        return;
    }
    //zTree = $.fn.zTree.getZTreeObj(treeId);
    if (zTree.setting.check.enable == true) {
        zTree.checkNode(treeNode, !treeNode.checked, false);
        assignment(treeId, zTree.getCheckedNodes());
    } else {        
        showAffixFileView(treeId, zTree.getSelectedNodes());
        assignment(treeId, zTree.getSelectedNodes());
        hideMenu(treeId);
    }
}

function onCheck(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    assignment(treeId, zTree.getCheckedNodes());
}

function hideMenu(treeId) {
    //console.log(treeId)//leftFormComparisonSelectTree
    if(treeId !== undefined){
        treeId = treeId.replace("Tree","")
        _this.$el.find("#" + treeId).removeClass("layui-form-selected");
        _this.$el.find("#" + treeId).next().fadeOut("fast");
        _this.$el.find("body").unbind("mousedown", onBodyDown);
    }
}

function assignment(treeId, nodes) {
    var isMultiple = setting.check.enable;
    var names = "";
    var ids = "";
    var devId = "";
    var idJoinName = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        if(isMultiple) {
            if (!nodes[i].isParent) {
                names += nodes[i].name + ",";
                ids += nodes[i].code + ",";
                devId += nodes[i].deptId + ",";
                idJoinName += nodes[i].name + ",";
            }
        } else {
            names += nodes[i].name + ",";
            ids += nodes[i].code + ",";
            devId += nodes[i].deptId + ",";
            idJoinName +=  nodes[i].name + ",";
        }
    }
    if (names.length > 0) {
        names = names.substring(0, names.length - 1);
        ids = ids.substring(0, ids.length - 1);;
        devId = devId.substring(0, devId.length - 1);
        idJoinName = idJoinName.substring(0, idJoinName.length - 1);
    }
    treeId = treeId.substring(0, treeId.length - 4);
    //_this.$el.find("#" + treeId + "Show").attr("value", names);
    _this.$el.find("#" + treeId + "Show").attr("value", idJoinName);
    // _this.$el.find("#" + treeId + "Show").text(idJoinName);
    _this.$el.find("#" + treeId + "Show").attr("title", names);
    _this.$el.find("#" + treeId + "Show").val(idJoinName);
    _this.$el.find("#" + treeId + "Hide").val(ids);
    _this.$el.find("#" + treeId + "Hide").attr("value", ids);
    _this.$el.find("#" + treeId + "HideDevId").val(devId);
    _this.$el.find("#" + treeId + "HideDevId").attr("value", devId);
}

function showCheckBoxData(treeId, zNodes, selectedNodes) {
    $.fn.zTree.init($("#" + treeId + "Tree"), setting, zNodes);
    var sNodes = selectedNodes.split(",");
    var zTreeObj = $.fn.zTree.getZTreeObj(treeId + "Tree");
    var zTree = zTreeObj.getCheckedNodes(false);
    for (var i = 0; i < zTree.length; i++) {
        for(var j = 0; j< sNodes.length; j++) {

            if(sNodes[j] === zTree[i].code) {
                //zTreeObj.expandNode(zTree[i], true);
                zTreeObj.checkNode(zTree[i], true);
                //暂时不用获取土地用途的父节点
                var parent = zTree[i].getParentNode();
                if(parent != null) {
                    if(!parent.open)  {
                        zTreeObj.checkNode(parent,true);
                        zTreeObj.expandNode(parent, true, true); //展开选中的
                    }
                }
            }
        }
    }
}

function onBodyDown(event) {
    if ($(event.target).parents(".tree-content").html() == null) {
        hideMenu();
    }
}

function showAffixFileView(treeId, nodesId){
    var id = nodesId[0].cgfjxxbId;
    var fileName = nodesId[0].accessoryName;
    var url1 = nodesId[0].pathVirtual;
    var whitchView = (treeId.indexOf("left")!== -1) ? '.left_view' : '.right_view'
    //console.log(whitchView)
    //return
    var layout = _this.$el.find(whitchView).find('.viewBox');
    var suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLocaleLowerCase();
    if (suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif' || suffix == 'png') {
        var myUrl = '';
        // if (suffix == 'tif') {
        //     _this.$api.getTiffImage(id, (url) => {
        //         myUrl = url.data;
        //     });
        // }
        _this.$api.getNormalFile(id, (url) => {
            layout.show();
            layout.empty();
            layout.css({
                top: '0px'
            });
            if (myUrl !== '') {
                new imagePreview(layout, myUrl);
            } else {
                new imagePreview(layout, url);
            }
        });
    } else if(suffix == 'tif'){
        layout.show();
        layout.empty();
        layout.append('<div class="' + treeId + '_noFileView">暂不支持此类型文件预览</div>');
    } else if (suffix == 'txt') {
        _this.$api.getNormalFile(id, (url) => {
            // console.log(id)
            // console.log(url)
            layout.show();
            layout.empty();
            layout.css({
                top: '0px'
            });
            $.ajax({
                url: url,
                dataType: 'text',
                // type: 'POST',
                success: (res) => {
                    //console.log(res)
                    layout.append('<div class="' + treeId + '_TextViewLayout"><pre><code>' + res + '</code></pre></div>');
                },
                error: function (error) {
                    if (error.status == '404') {
                        // 404 警告
                        layer.open({
                            title: '警告',
                            content: '服务器出现异常,请刷新重试'
                        });
                    }
                }
            });
        });
    } else if (suffix == 'pdf') {
        layout.show();
        layout.empty();
        layout.css({
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px'
        });
        if (id) {
            _this.$api.getNormalFile(id, (url) => {
                layout.append('<iframe scrolling="auto" allowtransparency="true" style="display: block;width: 100%;height: ' + layout.height() + 'px;" frameborder="0" src="' + url + '"></iframe>');
            });
        }else{
            layout.append('<iframe scrolling="auto" allowtransparency="true" style="display: block;width: 100%;height: ' + layout.height() + 'px;" frameborder="0" src="' + url1 + '"></iframe>');
        }

    } else {
        layout.show();
        layout.empty();
        layout.css({
            top: '0px',
        });
        layout.append('<div class="' + treeId + '_noFileView">暂不支持此类型文件预览</div>');
    }
}

export default{
    initSelectTree  ,
    showCheckBoxData
}