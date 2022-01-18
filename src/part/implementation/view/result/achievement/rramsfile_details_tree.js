////////////////////////////////////////////////
// 成果一棵树
// 杨爽
// 2020-10-21 09:19:01
////////////////////////////////////////////////
var _this = this;
var treeIdList = [];
var treeDetailData;


//第一个参数为zTree的DOM容器，第二个为zTree设置详情可见官网api,第三个为zTree的节点数据 
var setting = {
    check: {
        enable: false,
        chkStyle: "checkbox"//显示 checkbox 选择框，默认checkbox可选择值radio
    },
    callback: {
        onCheck: zTreeOnCheck,
        onClick: zTreeOnClick
    },
    data: {
        simpleData: {
            idKey: "cgfjxxbId",//节点id名
            pIdKey: "pid",//父节点id名
        },
        key: {
            name: "accessoryName"
        }
    },


};

function zTreeOnClick(event, treeId, treeNode) {
    treeNode.click = "return false"
    var typeUrl = treeNode.accessoryName.substring(treeNode.accessoryName.lastIndexOf(".") + 1, treeNode.accessoryName.length);
    // return false;
    if (typeUrl == 'doc' || typeUrl == 'docx' || typeUrl == 'xls' || typeUrl == 'xlsx') {
        POBrowser.openWindowModeless(treeNode.filePath, 'width=1824px;height=950px;');
    } else if (typeUrl == 'txt') {
        console.log('txt');
        $("#pdf_point").html('txt');
    } else if (typeUrl == 'pdf') {
        console.log('pdf');
        $("#pdf_point").html('pdf');
    } else if (typeUrl == 'png' || typeUrl == 'jpg' || typeUrl == 'jpeg' || typeUrl == 'bmp' || typeUrl == 'gif') {
        console.log('图片');
        $("#pdf_point").html('图片');
    } else {
        var isSupportDownload = 'download' in document.createElement('a');
        if (isSupportDownload) {
            var $a = $("<a>");
            $a.attr({
                href: treeNode.filePath,
                download: 'filename'
            }).hide().appendTo($("body"))[0].click();
        } else {
            window.open(treeNode.filePath)
        }
    };
    // console.log(treeNode);
    // console.log(treeNode.cgfjxxbId + " " + treeNode.accessoryName +" " + treeNode.filePath + " " + typeUrl);

}


function zTreeOnCheck(event, treeId, treeNode) {


}


var TreeViewNew = function (parent) {
    this.parent = parent;
    var _this = this;

    this.setting = {
        check: {
            enable: false,
            chkStyle: "checkbox"//显示 checkbox 选择框，默认checkbox可选择值radio
        },
        callback: {
            onCheck: function () { },
            onClick: function () { }
        },
        data: {
            simpleData: {
                idKey: "cgfjxxbId",//节点id名
                pIdKey: "pid",//父节点id名
            },
            key: {
                name: "accessoryName"
            }
        }
    };
           

    this.event = {
        dataRender: function () {
            _this.renderData.list = ""
        },
    };
}


function sortTree(tree, prevData) {
    let parent = prevData || {}
    for (let item of tree) {
        if (item.children && item.children.length) {
            sortTree(item.children, tree)
        } else {
            if(parent.sort){
                parent.sort((next, prev) => {
                    if (
                        !(/^[\u4E00-\u9FA5]$/.test(prev.accessoryName ? prev.accessoryName[0] : prev.name[0])) &&
                        !(/^[\u4E00-\u9FA5]$/.test(next.accessoryName ? next.accessoryName[0] : next.name[0]))
                    ) {
                        return Number(next.accessoryName ? next.accessoryName[0] : next.name[0]) - Number(prev.accessoryName ? prev.accessoryName[0] : prev.name[0])
                    }
                })
            }
        }
    }
}

TreeViewNew.prototype.onClick = function (event) {
    // console.log(event, treeId, treeNode);
    this.setting.callback.onClick = event;
};

TreeViewNew.prototype.onDataRender = function (event) {
    // this.event.dataRender = event;
};
TreeViewNew.prototype.init = function (planningResultId) {
    var treeCity = {};
    this.parent.$api.achievementPreviewTree({
        planningResultId: planningResultId
    }, (res) => {
        //tree显示
        var _data = {}; // 递归源对象
        var treeData = [];
        for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            _data[element.cgfjxxbId] = element;
        };
        for (let i = 0; i < res.data.length; i++) {
            const child = res.data[i];
            if (_data.hasOwnProperty(child.pid)) {
                const parent = _data[child.pid];
                if (!parent.hasOwnProperty('children')) parent['children'] = [];
                parent['children'].push(child);
            } else {
                treeData.push(child);
            }
        };
        sortTree(treeData);
        treeDetailData = treeData
        treeCity = $.fn.zTree.init(this.parent.$el.find("#treeRules"), this.setting, treeData);
        //treeCity.expandAll(true);
        var rootNode = treeCity.getNodes()[0];  
        fillter(treeCity);  
    });
}

function fillter(treeObj) {
    //获得树形图对象
    var nodeList = treeObj.getNodes();　　　　　　 //展开第一个根节点
    for (var i = 0; i < nodeList.length; i++) { //设置节点展开第二级节点
        treeObj.expandNode(nodeList[i], true, false, true);
        var nodespan = nodeList[i].children;
        for (var j = 0; j < nodespan.length; j++) { //设置节点展开第三级节点
             treeObj.expandNode(nodespan[j], true, false, true);
        }
    }
}

export default TreeViewNew

