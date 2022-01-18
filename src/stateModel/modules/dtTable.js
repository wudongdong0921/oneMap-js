////////////////////////////////////////////////
// 动态表格数据
// 吴野
// 2021-08-31 09:56:46
////////////////////////////////////////////////
let dtTables = function () {
    this.$state = {
        data: {},
        headerArray: [],
        text: [],
        historyItem: [],
        groupObj: {},
        mainTreeData: {},
        countMain: {}
    }
}
dtTables.prototype.setData = function (key, value) {
    this.$state[key] = value;
}
dtTables.prototype.handelHeaderData = function () {
    this.$state.headerArray = [];
    switch (this.$state.data.tier) {
        case 1:
            this.$state.text = ['一']
            break;
        case 2:
            this.$state.text = ['二', '一']
            break;
        case 3:
            this.$state.text = ['三', '二', '一']
            break;
        default:
            break;
    }
    this.$state.headerArray = this.$state.data.columns;
    for (let i = 0; i < this.$state.data.tier; i++) {
        this.$state.headerArray.unshift(this.$state.text[i] + '级分类')
    }
}
dtTables.prototype.handelTreeToArray = function (node, data = [], row = []) {
    if (node.children.length == 0) {
        data.push(row);
    } else {
        node.children.map((item, index) => {
            const obj = {
                label: item.dictLabel,
                id: item.id,
                pId: item.pid,
                children: item.children,
                childrenItem: {}
            };
            let indexsArray = this.$state.headerArray.slice(this.$state.data.tier)
            for (let i = 0; i < indexsArray.length; i++) {
                const element = indexsArray[i];
                obj.childrenItem[Object.keys(element)] = item[Object.keys(element)]
            }
            if (item.pid == '0') {
                obj['item'] = item;
            }
            this.handelTreeToArray(item, data, [...row, obj]);
        });
    }
    return data;
}

// 将树结构数据处理，统计二级根节点以下所有的节点数量，以及统计对象值处理
dtTables.prototype.groupTree = function () {
    this.$state.groupObj = {};
    for (let i = 0; i < this.$state.data.treeBean.children.length; i++) {
        const mainChildren = this.$state.data.treeBean.children[i];
        if (mainChildren.children.length !== 0) {
            this.$state.groupObj[mainChildren.id] = {}
            this.$state.groupObj[mainChildren.id]['countItem'] = mainChildren;
            this.$state.groupObj[mainChildren.id]['childItem'] = this.handelChildren(mainChildren.children, [])
            this.$state.groupObj[mainChildren.id]['itemLength'] = this.handelChildren(mainChildren.children, []).length;
        } else {
            this.$state.groupObj[mainChildren.id] = {}
            this.$state.groupObj[mainChildren.id]['countItem'] = mainChildren;
            this.$state.groupObj[mainChildren.id]['childItem'] = [mainChildren]
            this.$state.groupObj[mainChildren.id]['itemLength'] = [mainChildren].length;
        }
    }
    return this.$state.groupObj
}
dtTables.prototype.handelChildren = function (children, treeay = []) {
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        if (element.children.length !== 0) {
            this.handelChildren(element.children, treeay)
        } else {
            treeay.push(element)
        }
    }
    return treeay
}
// 处理合计数据，将合集数据处理到树的节点中
dtTables.prototype.mainTreeDataHandel = function () {
    this.$state.mainTreeData = {};
    for (let i = 0; i < this.$state.data.treeBean.children.length; i++) {
        const element = this.$state.data.treeBean.children[i];
        const treeGroupItem = this.$state.groupObj[element.id].countItem;
        let obj = $.extend({}, {}, treeGroupItem);
        obj.dictLabel = '合计';
        obj.pid = element.id;
        obj.id = 'ssssssssssssssssss' + i;
        obj.children = [];
        if (element.children.length !== 0) {
            element.children.push(obj)
        }
    }
    this.$state.mainTreeData = this.$state.data.treeBean;
}
dtTables.prototype.handelCountMain = function () {
    this.$state.countMain = {};
    const treeData = icu.util.clone(this.$state.data.treeBean);
    treeData.children = [];
    treeData.dictLabel = "合计"
    this.$state.countMain = treeData;
}
export default dtTables;