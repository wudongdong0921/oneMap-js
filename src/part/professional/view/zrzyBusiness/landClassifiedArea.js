// import config from "../../config/config";
// import request from "../../component/ajax";
// import session from "../../component/session";

export default  {
    render: function (template, params, linkTo, request, closeEvent) {

        var _this = this;
        var QS = "";
        var $ = layui.$,
            forms = layui.forms,
            laydate = layui.laydate,
            element = layui.element,
            table = layui.table,
            upload = layui.upload;
        var workid = '-1';
        var trackid = '-1';
        workid = _this.$query.workid;
        trackid = _this.$query.trankid;
        var accessToken = _this.$query.accessToken;
        var readonly = _this.$query.readonly;


        _this.$api.getButtonType({
            accessToken: accessToken,
            workid: workid,
            trackid: trackid,
        }, function (buttonType) {
            var isEditStatus = false;
            if (buttonType.flowForms === null) {
                isEditStatus = true;
            } else {
                for (let i = 0; i < buttonType.flowForms.length; i++) {
                    const element = buttonType.flowForms[i];
                    if (element.formName == '土地分类面积') {
                        isEditStatus = (element.formAuthId == "alleditable")
                        break;
                    };
                }
            };


            if (isEditStatus && readonly != '1') {
                _this.$el.find("#downloadTDFELJMB").show();
                _this.$el.find("#delAreas").show();
                _this.$el.find("#exprotExcel").show();
            };


            initform()
            layer.config({
                skin: 'demo-class'
            })
            upload.render({
                elem: '#exprotExcel'
                , url: config.InterfaceAddress.affairService + "/sjbp/importExcelOrTxtTdflmjbList"
                , accept: 'file'
                , data: {
                    workid: workid,
                    trackid: trackid
                }
                , acceptMime: 'application/vnd.ms-excel，application/text/plain'
                , done: function (res) {
                    layer.open({
                        title: '信息',
                        content: res.msg,
                        btn: ['确定'],
                        yes: function (index, layero) {
                            table.reload('tdflmjb', {
                                where: {
                                    workid: workid,
                                    trackid: trackid
                                }
                            });
                            layer.close(index);
                        },
                        end: function () {
                            table.reload('tdflmjb', {
                                where: {
                                    workid: workid,
                                    trackid: trackid
                                }
                            });
                            layer.closeAll();
                        },
                    });
                }
            });
            _this.$el.find("#downloadTDFELJMB").click(function () {
                var url = config.InterfaceAddress.affairService + "/templates/土地分类面积表模板.xls";
                var isSupportDownload = 'download' in document.createElement('a');
                if (isSupportDownload) {
                    var $a = $("<a>");
                    $a.attr({
                        href: url,
                        download: 'filename'
                    }).hide().appendTo($("body"))[0].click();
                } else {
                    window.open(url)
                };
            })

            //土地分类面积
            table.render({
                elem: _this.$el.find("#tdflmjb")[0],
                url: config.InterfaceAddress.affairService + "/sjbp/queryTdflmjbById"//模拟接口  如果开发中需要后台提供接口  直接将当前路径修改为接口路径   注意后台提供数据一定是json格式  格式必须按照json文件样例传递
                , method: "POST"
                , where: {
                    workid: workid,
                    trackid: trackid
                },
                cols: [//设置表头 和资源
                    [{
                        type: 'numbers',
                        width: "60",
                        title: '编号'
                    }, {
                        field: 'xmc',
                        width: "130",
                        title: '县（区）',
                        align: 'center'
                    }, {
                        field: 'zhen',
                        width: "100",
                        title: '镇',
                        align: 'center'
                    }, {
                        field: 'cun',
                        width: "100",
                        title: '村',
                        align: 'center'
                    }, {
                        field: 'qkmc',
                        width: "130",
                        title: '区块名称',
                        align: 'center'
                    }, {
                        field: 'qs',
                        width: "120",
                        title: '权属',
                        align: 'center',
                        templet: function (d) {
                            return findQs(d.qs);
                        }
                    }, {
                        field: 'yyrks',
                        title: '拟安置农业',
                        width: "160",
                        align: 'center'
                    }, {
                        field: 'ldlrs',
                        title: '拟安置劳动力',
                        width: "190",
                        align: 'center'
                    }, {
                        field: 'rjgd',
                        title: '人均耕地前（亩）',
                        width: "190",
                        align: 'center'
                    }, {
                        field: 'rjgdzh',
                        title: '人均耕地后（亩）',
                        width: "190",
                        align: 'center'
                    }, {
                        field: 'ejdlmc',
                        title: '二级地类',
                        width: "150",
                        align: 'center'
                    }, {
                        field: 'dlmc',
                        title: '三级地类',
                        width: "150",
                        align: 'center'
                    }, {
                        field: 'mj',
                        title: '面积（平方米）',
                        width: "190",
                        align: 'center'
                    }]
                ],
                height: 619,
                page: true,//是否包含分页功能
                text: '对不起，加载出现异常！',
                done: function (res) {
                    res.data;
                    element.render('progress')
                }
            });

            function findQs(qs) {
                for (var i = 0; i < QS.length; i++) {
                    var q = QS[i];
                    if (q.value == qs) {
                        return q.name;
                    }
                }
                return qs
            }
            function initform() {
                //权属---用于table遍历
                _this.$api.dict({ "type": "QS" }, function (result) {
                    QS = reault.dataList;
                }, function () {

                })
            }
            //全部删除土地分类面积
            _this.$el.find("#delAreas").click(function () {
                layer.confirm("确定要删除全部么？", function (index) {
                    _this.$api.deleteAllTdflmjbById({
                        workid: workid,
                        trackid: trackid
                    }, function (data) {
                        if (data.code == 200) {
                            table.reload('tdflmjb', {
                                where: {
                                    workid: workid,
                                    trackid: trackid
                                }
                            });
                            layer.alert("删除成功");
                        } else {
                            layer.msg(data.msg);
                        }
                    }, function () {

                    })
                })
            })



        });

    },
    destroy: function () {

    },
}

