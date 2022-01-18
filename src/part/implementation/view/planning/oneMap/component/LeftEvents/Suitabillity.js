
import Select from '../../../component/select'
import Ztree from '../../../component/zTree'
var Suitabillity = function (_Map, _MapSymbol, _Analyse) {
    var _html = '<div>' +
        '    <div style="padding: 20px 20px 0px 1px;" id="selectContent"></div>' +
        '    <div id="ListContent" class="ztree"></div>' +
        '</div>';
    this.html = $(_html);
    this._select = new Select();
    this.TreeView = new Ztree()
    this.TreeView.on('onClick', () => {
    })
    this.html.find('#selectContent').append(this._select._form.$html)
};

Suitabillity.prototype.render = function () {
    this.TreeView.init({
        treeId: this.html.find('#ListContent'),
        optionKey: 'suitabillity_option',
        data: data
    })
    return this.html
};
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
