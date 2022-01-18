
var selectCheckFile = function (id) {
    this.event = {
        onClickTree: function () { },
        init:function(){}
    }
    this.treeData = []
    this.$html = "";
    this.$html += '<div class=" selectCheckFile"></div>';
    this.html = $(this.$html);
    this.selectTree = $('<div id="comparisonSelect" class="layui-form-select select-tree" style="width: 100%;"></div>');
    this.html.append(this.selectTree);
}
selectCheckFile.prototype.initdata = function(e){
    this.event.init = e
}
selectCheckFile.prototype.setTreeData = function (list) {
    var treeData = this.toTree(list,0);
    this.event.init(treeData);
}
selectCheckFile.prototype.toTree = function (list,pid) {
    //tree显示
    var _data = {}; // 递归源对象
    var treeData = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        _data[element.cgfjxxbId] = element;
    };
    for (let i = 0; i < list.length; i++) {
        const child = list[i];
        child['name'] = child.accessoryName;
        if (_data.hasOwnProperty(child.pid)) {
            const parent = _data[child.pid];
            if (!parent.hasOwnProperty('children')) parent['children'] = [];
            parent['children'].push(child);
        } else {
            treeData.push(child);
        }
    };
    this.sortTree(treeData);
    return treeData;
};
selectCheckFile.prototype.sortTree = function (tree, prevData) {
    let parent = prevData || {}
    for (let item of tree) {
        if (item.children && item.children.length) {
            this.sortTree(item.children, tree)
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
};
selectCheckFile.prototype.set = function (data) {
};
selectCheckFile.prototype.get = function (callback, ignore) {
    // callback(emsg,value);
};
selectCheckFile.prototype.setEditData = function (treeDatas, selectCheckFile) {
};
selectCheckFile.prototype.handelTreeData = function(item, pId, stree) {
    var _this = this;
    var children = item.user;
    if (pId != null && pId != "") {
        pId = pId;
    } else {
        pId = 0
    }
    var open = false;
    if (stree == 0) {
        open = true;
    }
    if (((children != null && children.length != 0) || stree == 1) && !!children) {
        var node = {
            id: item.dept.deptId,
            code: "" + item.dept.deptId,
            name: item.dept.name,
            value: item.dept.deptId,
            pid: pId,
            open: open,
            nodeType: 'parent'

        };
        _this.treeData.push(node);
        for (var i = 0; i < children.length; i++) {
            if (pId == 0) {
                _this.handelTreeData(children[i], item.dept.deptId, 1);
            } else {
                _this.handelTreeData(children[i], item.dept.deptId, 2);
            }

        }
    } else {
        var node = {
            id: item.userId,
            code: "" + item.userId,
            name: item.name,
            value: item.userId,
            pid: item.deptId,
            open: false,
            nodeType: 'child'
        };
        _this.treeData.push(node);
    }
    return _this.treeData
}
export default selectCheckFile;