////////////////////////////////////////////////
// 查询树配置项，应用于规划实施评估
// 吴野
// 2020-12-12 12:44:12
////////////////////////////////////////////////
var implementSelectTreeOption = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
        nameIsHTML: true, //为了可以使用fontawesome
        showIcon: false
    },
    check: {
        enable: false//checkbox
    },
    view: {
        nameIsHTML: true, //允许name支持html				
        selectedMulti: false
    },
    edit: {
        enable: false,
        editNameSelectAll: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: function () { },
    }
}
export default implementSelectTreeOption