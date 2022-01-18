
import Select from '../../../component/select'
import Ztree from '../../../component/zTree'
var Suitabillity = function (_Map, _MapSymbol, views) {
    this.view = views;
    var _this = this;
    // 2021-05-11 陈薪名 修改bug HNXGTKJ-1661
    var _html = '<div>' +
        '    <div style="padding: 20px 20px 0px 1px;" id="selectContent"></div>' +
        '    <ul id="ListContent" class="ztree" style="overflow: auto;height: 700px;"></ul>' +
        '</div>';
    this.html = $(_html);
    icu.session.set('typeMap', 'oneMap')
    this._select = new Select();
    this.TreeView = new Ztree();
    this.event = {
        treeClick: function () { },
        xzqhSelect: function () { }
    }
    this._select.on('rightAdministrativeDivision', function (type, value) {
        console.log(value)
        _Map.map.handlePermisMapFull(value.rightAdministrativeDivision)
        _this.xzqhCode = value.rightAdministrativeDivision
        _this.event.xzqhSelect(_this.xzqhCode);
    })
    this.TreeView.on('onClick', (event, treeId, treeNode) => {
        this.event.treeClick(event, treeId, treeNode, _this.xzqhCode)
    })
    this.html.find('#selectContent').append(this._select._form.$html)
};
Suitabillity.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};
Suitabillity.prototype.render = function () {
    var _this = this;
    this.initializationData({}, function (resData) {
        _this.TreeView.init({
            treeId: _this.html.find('#ListContent'),
            optionKey: 'suitabillity_option',
            data: resData
        })
    })
    return _this.html
};


Suitabillity.prototype.initializationData = function (params, cb) {
    var _this = this;
    this.view.$api.getTreeData({}, function (resData) {
        console.log(resData)
        var jsonDataTree = transData(resData.data, 'id', 'pid', 'children')
        cb(jsonDataTree)
    })
}

function transData(a, idStr, pidStr, chindrenStr) {
    var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}
// 获取数据
var data = [
    {
        name: "父节点1 - 展开", open: true,
        children: [
            {
                name: "父节点11 - 折叠",
                children: [
                    { name: "叶子节点111" },
                    { name: "叶子节点112" },
                    { name: "叶子节点113" },
                    { name: "叶子节点114" }
                ]
            },
            {
                name: "父节点12 - 折叠",
                children: [
                    { name: "叶子节点121" },
                    { name: "叶子节点122" },
                    { name: "叶子节点123" },
                    { name: "叶子节点124" }
                ]
            },
            { name: "父节点13 - 没有子节点", isParent: true }
        ]
    },
    {
        name: "父节点2 - 折叠",
        children: [
            {
                name: "父节点21 - 展开", open: true,
                children: [
                    { name: "叶子节点211" },
                    { name: "叶子节点212" },
                    { name: "叶子节点213" },
                    { name: "叶子节点214" }
                ]
            },
            {
                name: "父节点22 - 折叠",
                children: [
                    { name: "叶子节点221" },
                    { name: "叶子节点222" },
                    { name: "叶子节点223" },
                    { name: "叶子节点224" }
                ]
            },
            {
                name: "父节点23 - 折叠",
                children: [
                    { name: "叶子节点231" },
                    { name: "叶子节点232" },
                    { name: "叶子节点233" },
                    { name: "叶子节点234" }
                ]
            }
        ]
    },
    { name: "父节点3 - 没有子节点", isParent: true }

];
export default Suitabillity;
