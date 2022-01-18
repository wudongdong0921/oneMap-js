import subMenu from "../../../oneMap/component/LeftBar/subMenu";

var fileManage = function (el) {
    this.html = el;
    this.event = {
        subMenuClick: function () { }
    }
}

fileManage.prototype.setTree = function (treeData) {
    this.treeSliderLayout.empty();
    this.inputTree = $('<input class="layui-input" id="searchInput" value="" placeholder="输入文档名称">').appendTo(this.treeSliderLayout)
    this.fileTree = $('<ul id="fileTree"></ul>').appendTo(this.treeSliderLayout);
    let height = window.innerHeight * 0.65;

    var Dtree = dtree.render({
        elem: "#fileTree",
        data: treeData,
        height: height,
        accordion: true,    // 手风琴，但是刚打开页面时只显示根节点
        response: {
            parentId: "pid",
            title: "dicName"
        },
        line: true,
        icon: '11',
        // leafIconArray: { "11": "dtree-icon-dian" },
        skin: 'zdy',
    })

    this.inputTree.unbind().bind("input propertychange", function(){
        var value = $("#searchInput").val();
        Dtree.fuzzySearch(value); // 内置方法查找节点
    });
    
    dtree.on("node('fileTree')", function (obj) {
        var tem = findNode(treeData, obj.param.nodeId);
        var url = null;
        let fileType = tem.dicName.substring(tem.dicName.indexOf("."));
        
        // tem.sgin用于判断是否为文件, tem.type判断文件所在地址, type判断是图片还是pdf：pdf用iframe层显示，图片用页面层显示
        if (tem.sgin == "1") {
            let type = 2;
            if (tem.type == "1") {
                // 人人文件
                url = config.InterfaceAddress.renrenService + '/renren-admin/doc.file/view/' + obj.param.nodeId
            } else {
                // 规划成果
                url = config.InterfaceAddress.implementService + '/doc.file/view/' + obj.param.nodeId
            }

            if(fileType === '.pdf' || fileType === '.PDF'){
                type = 2;
            }else if(fileType === '.jpg' || fileType === '.png' || fileType === '.JPG' || fileType === '.PNG')  {
                type = 1;
                url = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-evenly;"><img src="${url}" style="max-height: 100%; max-width: 100%; "></img></div>`;
            } else {
                top.layer.msg("不支持查看当前格式",{icon: 5})
                return
            }
            

            top.layer.open({
                type: type,
                title: [obj.param.context, 'background-color: #1958A6;line-height: 40px; padding-left: 10px; color: #fff; font-size: 16px;'],
                area: ['90vw', '90vh'],
                shade: 0.8,
                closeBtn: 0,
                shadeClose: true,
                content: url,
                closeBtn: 1,
                shadeClose: true,
            })

        }
    })

    // 递归查找树形组件中选中的值
    let node = null;
    var findNode = function (data, id) {
        for (var j = 0; j < data.length; j++) {
            if (data[j].id == id) {
                node = data[j];
                break;
            } else {
                if (data[j].children.length > 0) {
                    findNode(data[j].children, id);
                }
            }
        }
        return node
    }
    
}

fileManage.prototype.addChild = function (subData) {
    var that = this;
    var SubMenu = new subMenu();

    for (let item of subData) {
        item.color = item.dicColor;
        item.icon = item.dicIcon;
        item.name = item.dicName;
    }
    SubMenu.setChildren(subData);

    SubMenu.onClick((data) => {
        that.event.subMenuClick(data)
    })

    var subBox = $('<div class="OneMap_LeftBar_subBox"></div>');
    var treeBox = $('<div class="tree_slider_box"></div>');
    this.treeSliderLayout = $('<div class="tree_slider_layout" style="overflow-y: auto; overflow-x:hidden;"></div>').appendTo(treeBox);
    subBox.append(treeBox);
    subBox.append(SubMenu.html);
    this.html.append(subBox);
}

fileManage.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    }
}

export default fileManage;
