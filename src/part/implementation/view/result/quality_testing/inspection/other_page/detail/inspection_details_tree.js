////////////////////////////////////////////////
// 成果质检-详情页-成果文件tree模块
// 杨爽
// 2020-10-14 16:16:49
////////////////////////////////////////////////
var _this = this;



function zTreeOnClick(event, treeId, treeNode) {
    // console.log(event);
    // console.log(treeNode);


    // treeNode.click = "return false"
    // console.log(treeNode);
    // console.log(treeNode.id + " " + treeNode.name +" " + treeNode.pathUrl + " " + typeUrl);

}

function zTreeOnCheck(event, treeId, treeNode) {
    // console.log(treeNode.name);//弹出城市名字

}
var TreeView = function (parent, allData) {
    this.parent = parent;
    this.renderData = allData;
    var _this = this;
    this.setting = {
        check: {
            enable: false,
            chkStyle: "checkbox"//显示 checkbox 选择框，默认checkbox可选择值radio
        },
        callback: {
            // onCheck: zTreeOnCheck,
            onClick: function (event, treeId, treeNode) {
                console.log(treeNode);

                var _dialog = implementationDialog({
                    top: '45px',
                    width: '80%',
                    height: '90%',
                    path: '/affixFileView',
                    title: treeNode.name,
                });

                setTimeout(function () {
                    _dialog.content.set(treeNode.id, treeNode.name);
                }, 200);
            }
        },
        data: {
            simpleData: {
                idKey: "id",//节点id名
                pIdKey: "pid",//父节点id名
            }
        }
    };

    this.event = {
        dataRender: function () {
            _this.renderData.list = ""
        },
    };
}
TreeView.prototype.onDataRender = function (event) {
    // this.event.dataRender = event;
};
TreeView.prototype.init = function () {
    var treeCity = {};

    this.parent.$api.getAttachmentTree(this.renderData.cgxxbId, (res) => {
        console.log(res);
        //tree显示
        var _data = {}; // 递归源对象
        var treeData = [];
        for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            _data[element.id] = element;
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

        // console.log(_data);
        // console.log(treeData);

        treeCity = $.fn.zTree.init(this.parent.$el.find("#tree"), this.setting, treeData);
        treeCity.expandAll(true);
    });

    // this.event.dataRender();
}

export default TreeView
