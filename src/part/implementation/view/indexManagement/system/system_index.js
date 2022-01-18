////////////////////////////////////////////////
// 指标管理-指标体系
// 杨爽
// 2020-11-09 09:23:50
////////////////////////////////////////////////

export default {
    render: function () {
        var _this = this;
         //指标体系选中值
         var zbtxValue = "";
        //form
        var _form = icu.templateForm({
            labelwidth: 0,
        });
        _form.$setOptions([
            [{
                key: 'planningResultCode',
                type: 'input',
                placeholder:'请输入关键字',
                formlabel: '',
                col:'10',
                data:'',
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
                    width:'60px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'code',
                    type: 'string',
                    name: '代码',
                    width:'120px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'indexName',
                    type: 'string',
                    name: '指标名称',
                    width:'400px',
                    titleAlign: 'center',
                    textAlign: 'center',
                },
                {
                    key: 'zblxId',
                    type: 'string',
                    name: '指标类型',
                    width:'120px',
                    titleAlign: 'center',
                    textAlign: 'center',
                    // format: function (data, value, ele, events) {
                    //     var label = ghcglxIdMap[value];
                    //     return label ? label : value;
                    // },
                },
                {
                    key: 'unitCode',
                    type: 'string',
                    name: '单位',
                    width:'120px',
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
                    type: 'buttons',
                    name: '操作',
                    titleAlign: 'center',
                    textAlign: 'center',
                    buttons: [function (unit, row, data, events) {
                        var button = $('<div class="layui-btn layui-btn-sm layui-btn-ys" style="margin-right: 10px;">查看</div>');
                        button.click((e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            var _dialog = implementationDialog({
                                top: '15%',
                                width: '65%',
                                height: '75%',
                                path: '/indexManagement/system/other_page/details',
                                params: data,
                                title: '指标项详情',
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
                    key:'indexName',
                    type: 'input',
                    labelText: '指标名称：',
                    placeholder: '请输入指标名称',
                    labelWidth: 112,
                    onChange: function (value) {  
                        
                    },
                   
                },
                {
                    key:'indexNature',
                    type: 'select',
                    labelText: '指标性质：',
                    labelWidth: 112,
                    data: 'OptionSide:ZBXZ',
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
                    getKey: 'dictValue',
                    onChange: function (value) {
                       
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
                if(zbtxValue == ""){
                    _this.$api.zbtxGetPage({
                        zbtxId: zbtxValue,                         // 指标类型编号
                        indexName: data.indexName,                 //指标名
                        indexNatureCode:data.indexNature,                     //指标性质编码
                        pageNum: data.page,                     // 当前页
                        pageSize: data.limit                     // 每页显示记录数
                    }, function (res) {
                        setData({
                            count: 0,
                            data: "",
                        });
        
                    });
                }else{
                    _this.$api.zbtxGetPage({
                        zbtxId: zbtxValue,                         // 指标类型编号
                        indexName: data.indexName,                 //指标名
                        indexNatureCode:data.indexNature,                     //指标性质编码
                        pageNum: data.page,                     // 当前页
                        pageSize: data.limit                     // 每页显示记录数
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
                }
                
             
            },
        });
        _this.$el.find('#progressCollection').append(_table.html);
        _this.$el.find('#selectForm').append(_form.$html);
        _table.init();



        //tree
        var setting={
            check: {
                enable: false,
                chkStyle: "checkbox"//显示 checkbox 选择框，默认checkbox可选择值radio
            },
            callback: {
                onClick: zTreeOnClick
            },
            data: {
                simpleData: {
                    idKey: "id",//节点id名
                    pIdKey: "pid",//父节点id名
                }
            }
        };
        function zTreeOnClick(event, treeId, treeNode){
            // console.log(treeNode);
            zbtxValue = treeNode.type;
            _table.init();
        }
        var treeCity = {};

        _this.$api.zbtxGetIndicatorTypeTree({dictType:'ZBTX'}, (res) => {
            // console.log(res);
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
            treeCity = $.fn.zTree.init(_this.$el.find("#tree"), setting, treeData);
            // 2021-05-27 陈薪名 修改自动展开二级节点
            var treeObj = $.fn.zTree.getZTreeObj( "tree" );
             var  nodes = treeObj.getNodes();
             for  ( var  i = 0; i < nodes.length; i++) {  //设置节点展开
                treeObj.expandNode(nodes[i],  true ,  false ,  true );
             }
            // treeCity.expandAll(true);
        });

         //模糊搜索
        //查找子结点，如果找到，返回true，否则返回false
        function searchChildren(keyword,children){
            if(children == null || children.length == 0){
                return false;
            }
            for(var i = 0;i < children.length;i++){
                var node = children[i];
                if(node.name.indexOf(keyword)!=-1){
                    return true;
                }
                //递归查找子结点
                var result = searchChildren(keyword,node.children);
                if(result){
                    return true;
                }
            }
            return false;
        }
        //查找当前结点和父结点，如果找到，返回ture，否则返回false
        function searchParent(keyword,node){
            if(node == null){
                return false;
            }
            if(node.name.indexOf(keyword)!=-1){
                return true;
            }
            //递归查找父结点
            return searchParent(keyword,node.getParentNode());
        }   
        var hiddenNodes = [];
    },
    destroy: function () {
       
    }
}
