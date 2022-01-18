////////////////////////////////////////////////
// 成果质检-成果质检详情页-质检细则
// 杨爽
// 2020-10-13 16:36:32
////////////////////////////////////////////////
var session = icu.session;
export default {
    render: function () {
        var _this = this;
        // console.log(this.$data);
        var setting = {
            check: {
                enable: true,
                chkStyle: "checkbox"//显示 checkbox 选择框，默认checkbox可选择值radio
            },
            callback: {
                onCheck: zTreeOnCheck,
                onAsyncSuccess: ztreeOnAsyncSuccess,
            },
            data: {
                simpleData: {
                    idKey: "id",//节点id名
                    pIdKey: "pid",//父节点id名
                }
            }
        };

        var city = {};
        this.$api.getEblTreeAll({ zjxzflbId: _this.$data.zjxzflbId, cgid: _this.$data.cgid }, function (res) {
            // res.data.push(_this.$data.parentData);
            // console.log(res)
            // if(res.treeAll.treeSelected == null ){
            //     treeData = res.treeAll
            //     city = $.fn.zTree.init($("#treeRules"), setting, treeData);
            // }else{
            //     treeData = res.treeSelected
            //     city = $.fn.zTree.init($("#treeRules"), setting, treeData);
            // }
            var _data = {}; // 递归源对象
            var treeData = [];
            for (let i = 0; i < res.treeAll.length; i++) {
                const element = res.treeAll[i];
                _data[element.id] = element;
            };
            for (let i = 0; i < res.treeAll.length; i++) {
                const child = res.treeAll[i];
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


            city = $.fn.zTree.init($("#treeRules"), setting, treeData);
            city.expandAll(true);


            // var node = treeObj.getNodeByParam("id", 1, null);

            for (let i = 0; i < res.treeSelected.length; i++) {
                const element = res.treeSelected[i];
                if (element.id != _this.$data.zjxzflbId) {
                    var node = city.getNodeByParam("id", element.id, null);
                    city.checkNode(node, true, true);
                };
            }

            if (_this.$data.status ==2 || _this.$data.status == 4) { 
                //只读
                var nodes= city.getNodes();                         // 可以获取所有的父节点
                var allTreeNode = city.transformToArray(nodes);     // 获取树所有节点
                for (var i=0, l=allTreeNode.length; i < l; i++) {  
                    city.setChkDisabled(allTreeNode[i], true);
                }     
            }
        });
        //暂存状态时显示确定按钮
        if(_this.$data.status !== '暂存'&&_this.$data.status != '0'){
            this.$el.find('#sure').hide()
        }
        function zTreeOnCheck(event, treeId, treeNode) {
            // console.log(treeNode.name);//弹出城市名字
            // let nodeName = treeNode.name;
            // let checkedNode = treeNode.checked;
            // if(checkedNode){//选中
            //     $(".result").append(nodeName + ",");
            // }else{//取消
            //     var resultHTML = $(".result").html(); 
            //     $(".result").html(resultHTML.replace(nodeName+",",""));
            // }
        }
        function ztreeOnAsyncSuccess(event, treeId, treeNode) {
            var url = "unitAction!xzqhTree.action?parentId=";
            if (treeNode == undefined) {
                url += "1";
            }
            else {
                url += treeNode.id;
            }

        };
        $("#back").click(function () {
            _this.closeEvent();
        });
        _this.$el.find("#sure").click(function (data, setData) {
            var nodes = city.getCheckedNodes(true);
            // console.log(nodes);
            var _array = [];
            // zjxzflbId

            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                if (element.id != _this.$data.zjxzflbId) {
                    _array.push({
                        "zjxzxmbId": element.id
                    });
                };
            };
            // console.log(_array);
            // console.log(_this.$data.zjxzflbId);
            var postData = [{
                'createUser':session.get('userInfo').id,
                "cgId": _this.$data.tableData.cgxxbId,
                "zjxzflbId": _this.$data.zjxzflbId,
                "rramsQcEblProjectList": _array
            }];

            if(!_array.length){
               return icu.alert.warning({
                    text: '数据不能为空',
                });
            }

            _this.$api.insertQcListsAndQcProjects(postData, function (res) {
                icu.alert.success({
                    title: '保存成功',
                    text: '',
                    // callback 方法如无必要，可以不进行编写
                    callback : function () {
                        _this.closeEvent();
                    }
                }); 
               
               
            });
        });

    },
    destroy: function () {

    }

}

