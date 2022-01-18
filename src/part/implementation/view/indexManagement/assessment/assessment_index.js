////////////////////////////////////////////////
// 指标管理 - 指标实施评估值
// 杨爽
// 2020-11-09 09:26:22
////////////////////////////////////////////////
import Util from '../../../../../common/util'
export default {
    render: function () {
        var _this = this;
        //tree选中值
        var selectDictLabel = "";
        //指标类型选中值
        var zblxValue = "";
        // //form
        var _form = icu.templateForm({
            labelwidth: 0,
        });
        _form.$setOptions([
            [{
                key: 'planningResultCode',
                type: 'input',
                placeholder: '请输入关键字',
                formlabel: '',
                col: '10',
                data: '',
                onChange: function (value) {
                    // zblxValue = value;
                    // 2021-05-27 陈薪名 修改bug HNXGTKJ-1703
                    var ztreeObj = $.fn.zTree.getZTreeObj("tree");
                    // 当查询框没有数据时，默认展开所有二级接单
                    if (value == '') {
                        ztreeObj.showNodes(hiddenNodes);// shouNodes 后会展开所有的节点，所有要关闭所有节点
                        ztreeObj.expandAll(false);
                        var  nodes = ztreeObj.getNodes();
                        for  ( var  i = 0; i < nodes.length; i++) {
                            ztreeObj.expandNode(nodes[i],  true ,  false ,  true );
                        }
                    } else {
                        ztreeObj.showNodes(hiddenNodes);
                        function filterFunc(node){
                            if(searchParent(value,node) || searchChildren(value,node.children)){
                                return false;
                            }
                            ztreeObj.expandNode(node.getParentNode(),true,true);
                            return true;
                        };
                        hiddenNodes=ztreeObj.getNodesByFilter(filterFunc);
                        ztreeObj.hideNodes(hiddenNodes);
                    }
                }
            }]
        ]);
        //table
        var _table = new icu.table({
            tableOptions: {
                title: '指标管理',
                height: '650px',
                theme: 'evenColor',
                minWidth: 40,
            },
            cols: [
                {
                    key: "index",
                    type: 'index',
                    name: '序号',
                    width: '60px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'code',
                    type: 'string',
                    name: '代码',
                    width: '120px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'indexName',
                    type: 'string',
                    name: '指标名称',
                    width: '400px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'zblxId',
                    type: 'string',
                    name: '指标类型',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'indexNatureCode',
                    type: 'string',
                    name: '指标性质',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'year',
                    type: 'string',
                    name: '年份',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'ieValue',
                    type: 'string',
                    name: '实施评估值',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'unitCode',
                    type: 'string',
                    name: '单位',
                    width: '120px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    type: 'buttons',
                    name: '操作',
                    titleAlign: 'center',
                    textAlign: 'center',
                    buttons: [function (unit, row, data, events) {
                        var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin-right: 10px;">查看</div>');
                        button.click((e) => {
                            data['xzqhId'] = selectDictLabel;
                            e.stopPropagation();
                            e.preventDefault();
                            var _dialog = implementationDialog({
                                top: '15%',
                                width: '50%',
                                height: '62%',
                                path: '/indexManagement/assessment/other_page/details',
                                params: data,
                                title: '指标实施评估历史值',
                                events: {},
                                onClose: function () {
                                    _table.refresh();
                                },
                            });
                            _dialog.body.css({
                                'background': 'rgb(255,255,255)'
                            });


                        });
                        return button;
                    }],
                },
            ],
            whereOptions: [
                {
                    key: 'indexName',
                    type: 'input',
                    labelText: '指标名称：',
                    placeholder: '请输入指标名称',
                    labelWidth: 102,
                    onChange: function (value) {
                       
                    },

                },
                {
                    key: 'indexNature',
                    type: 'select',
                    labelText: '指标性质：',
                    labelWidth: 102,
                    data: 'OptionSide:ZBXZ',
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
                    getKey: 'dictValue',
                    onChange: function (value) {

                    },
                },
                // 2021-03-31 陈薪名 修改去掉了触发事件，只有单击查询按钮才执行
                {
                    key: 'year',
                    type: 'inputDate',
                    labelText: '年份：',
                    labelWidth: 82,
                    default: new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear(), // 默认值
                    placeholder: '请输入年份',
                    layDataOption: {
                        type: 'year',
                        onChange: function (value) {

                        },
                        // done: function (value, date, endDate) {
                        //     _table.whereObject.year.html[0].value = value
                        //     _table.refresh()
                        // },
                    },
                },
            ],
            whereButtons: [
                {
                    class: 'Test',
                    name: '查询',
                    event: 'search'
                },
                {
                    class: 'Test',
                    name: '重置',
                    event: 'reset'
                },
            ],
            rightButtons: [
                {
                    class: 'Test',
                    icon: 'software',
                    name: '筛选',
                    event: 'screen'
                }, {
                    class: 'Test',
                    icon: 'interactive',
                    name: '导出',
                    event: 'exportCSV'
                }, {
                    class: 'Test',
                    icon: 'listBook',
                    name: '打印',
                    event: 'print'
                }
            ],
            getEvent: function (data, setData) {
                _this.$api.getPage({
                    adcode: selectDictLabel,                 // 区域编码
                    // zblx:zblxValue,                     //2021-5-26 刘长明修改HLJSSJDXT-395 搜索行政区域后，点击该区域，右侧指标不显示 注释掉原有参数值  修改为赋值空字符串
                    zblx: '',                         // 指标类型      
                    indexName: data.indexName,               //指标名
                    indexNature: data.indexNature,                   //指标性质编码
                    year: data.year ? data.year : _table.whereObject.year.html[0].value,
                    page: data.page,                         // 当前页码，从1开始
                    limit: data.limit                        // 每页显示记录数
                }, function (res) {
                    //刘长明修改 列表内容为空时，打印预览显示null  HNXGTKJ-1700
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].code = res.data.list[i].code == null ? '':res.data.list[i].code
                        res.data.list[i].indexName = res.data.list[i].indexName == null ? '':res.data.list[i].indexName
                        res.data.list[i].indexNatureCode = res.data.list[i].indexNatureCode == null ? '':res.data.list[i].indexNatureCode
                        res.data.list[i].monitoringValue = res.data.list[i].monitoringValue == null ? '':res.data.list[i].monitoringValue
                        res.data.list[i].unitCode = res.data.list[i].unitCode == null ? '':res.data.list[i].unitCode
                        res.data.list[i].zblxId = res.data.list[i].zblxId == null ? '':res.data.list[i].zblxId
                        res.data.list[i].zbxxxbId = res.data.list[i].zbxxxbId == null ? '':res.data.list[i].zbxxxbId
                    } 
                    setData({
                        count: res.data.total,
                        data: res.data.list,
                    });

                });

            },
        });

        _this.$el.find('#progressCollection').append(_table.html);
        _this.$el.find('#selectForm').append(_form.$html);
        _table.init();


        //左侧tree
        // zTree 的参数配置
        var setting = {
            check: {
                enable: false,           // 是否显示radio/checkbox
                chkStyle: "radio",   // 值为checkbox或者radio表示
            },
            data: {
                key: {
                    name: 'dictLabel',
                }
            },
            callback: {
                onClick: zTreeOnClick,
            }
        };
        function zTreeOnClick(event, treeId, treeNode) {
            selectDictLabel = treeNode.dictValue;
            _table.init();
        }
        var zTreeObj;
        // 获取数据字典行政区域数据
        //任航修改行政区划
        this.$api.getDictTree({
            type: 'XZQY',
            value: icu.session.get("userInfo").areacodeList
        }, function (res) {
            if (res && res.data) {
                zTreeObj = $.fn.zTree.init($("#tree"), setting, Util.handelTreeRemoveChildren(res.data));
                // zTreeObj.expandNode(zTreeObj.getNodes()[0], true); // 展开第一个根节点
                // zTreeObj.expandAll(true); // 2021-05-08 陈薪名 修改bug HNXGTKJ-1275
                // 2021-05-27 陈薪名 修改自动展开二级节点
                var treeObj = $.fn.zTree.getZTreeObj( "tree" );
                var  nodes = treeObj.getNodes();
                for  ( var  i = 0; i < nodes.length; i++) {  //设置节点展开
                    treeObj.expandNode(nodes[i],  true ,  false ,  true );
                }
            }
        });

        //获取所有父节点
        var getParsByTreeNode = function (treeNode, parsArr) {
            var parsArr = parsArr || [];
            var parNode = treeNode.getParentNode();
            if (parNode) {
                parsArr.push(parNode);
                getParsByTreeNode(parNode, parsArr);
            }
            return parsArr;
        }

        //模糊搜索
        //查找子结点，如果找到，返回true，否则返回false
        function searchChildren(keyword, children) {
            if (children == null || children.length == 0) {
                return false;
            }
            for (var i = 0; i < children.length; i++) {
                var node = children[i];
                if (node.dictLabel.indexOf(keyword) != -1) {
                    return true;
                }
                //递归查找子结点
                var result = searchChildren(keyword, node.children);
                if (result) {
                    return true;
                }
            }
            return false;
        }
        //查找当前结点和父结点，如果找到，返回ture，否则返回false
        function searchParent(keyword, node) {
            if (node == null) {
                return false;
            }
            if (node.dictLabel.indexOf(keyword) != -1) {
                return true;
            }
            //递归查找父结点
            return searchParent(keyword, node.getParentNode());
        }
        var hiddenNodes = [];
    },
    destroy: function () {

    }
}
