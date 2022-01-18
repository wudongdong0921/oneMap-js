// import config from "../../config/config";
// import request from "../../component/ajax";
// import session from "../../component/session";

export default  {
    render: function (template, params, linkTo, request, closeEvent) {
        var _this = this;

        var $ = layui.$,
            element = layui.element,
            upload = layui.upload,
            table = layui.table;
        var workid = '-1';
        var trackid = '-1';
        workid = _this.$query.workid;
        trackid = _this.$query.trankid;
        var dkData = "";
        var jzdData = "";
        var accessToken = _this.$query.accessToken;
        var token = _this.$query.token;
        var readonly = _this.$query.readonly;
        var dkxxidArr = "";
        var isImport = false;
        var isKCDJJSSMS = false;//判断是否拥有   勘测定界技术说明表
        var jzds=false;//地块现有界址点数
        var dialogFlag = true;
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
                    if (element.formName == '界址点成果表') {
                        isEditStatus = (element.formAuthId == "alleditable")
                    };
                    if (element.formName == '土地勘测定界技术说明') {
                        isKCDJJSSMS = true;
                    };
                }
            };
            _this.$api.getProjectInfoByWorkid({ workid: workid, token: token }, function (data) {
                if (data.data.length != 0) {
                    _this.$el.find('#0').show();
                    _this.$el.find('#1').show();
                }
            }, function () {

            })
            if (isEditStatus && readonly != '1') {
                _this.$el.find('#dkImport').show();
                _this.$el.find('#dkDeleteAll').show();
                _this.$el.find('#dkDelete').show();
                _this.$el.find('#dkEidt').show();


                _this.$el.find('#dkAdd').show();
                //_this.$el.find('#chxx').show();
                _this.$el.find('#YDBJGJBZZBXGSMB').show();
                _this.$el.find('#YDBJGJBZZBXGSMB-box').show();

                _this.$el.find('#jzdDeleteAll').show();
                _this.$el.find('#jzdDelete').show();
                _this.$el.find('#jzdEidt').show();
                _this.$el.find('#jzdAdd').show();
            };
            var dkyt=[];
            var txlx=[];
             //地块用途
             _this.$api.dict({ "type": "DKYT" }, function (data) {
                dkyt=data.dataList;
            }, function () {

            })
            _this.$api.dict({ "type": "TXLX" }, function (data) {
                txlx=data.dataList;
            }, function () {

            })
            table.render({
                elem: _this.$el.find("#dk")[0],
                url: config.InterfaceAddress.affairService + "/sjbp/queryDkxxbById",
                where: {
                    workid: workid,
                    trackid: trackid
                },
                method: 'post',
                cols: [
                    [{
                        type: 'numbers',//数据类型  插件自动提供数字排序  使用场景:编号
                        title: '编号',//列名
                        align: 'center'
                    }, {
                        field: 'tfh',
                        title: '图幅号',
                        align: 'center',
                        templet: function (d) {
                            return tfh(d.tfh);
                        }
                    }, {
                        field: 'dkbh',
                        title: '地块编号',
                        align: 'center',
                        templet: function (d) {
                            return dkbh(d.dkbh);
                        }
                    }, {
                        field: 'dkmc',
                        title: '地块名称',
                        align: 'center'
                    }, {
                        field: 'dkyt',
                        title: '地块用途',
                        align: 'center',
                        templet: function (d) {
                            return findName(dkyt,d.dkyt);
                        },
                    },
                    {
                        field: 'jzds',
                        title: '界址点数',
                        width: 120,
                        align: 'center'
                    }, {
                        field: 'dkmj',
                        title: '地块面积（公顷）',
                        align: 'center'
                    }, {
                        field: 'txlx',
                        title: '图形类型',
                        align: 'center',
                        templet: function (d) {
                            return findName(txlx,d.txlx);
                        },
                    }
                    ]
                ],
                height: 298,
                limit: 5,//每页条数  控制的是分页数据  实际上当前值需要统一   demo数据是假数据看不出效果
                page: true,//是否包含分页功能
                limits: [5, 10, 15, 20, 25],//控制每页显示条数的设置
                text: '对不起，加载出现异常！',
                done: function (res, curr, count) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (i == res.data.length - 1) {
                            dkxxidArr = res.data[i].dkxxid;
                        } else {
                            dkxxidArr += res.data[i].dkxxid + ",";
                        }
                    }
                }
            });
            //获取选择的数据
            table.on('row(dk)', function (obj) {
                obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
                _this.$el.find("#dkData").attr("value", JSON.stringify(obj.data));
                dkData = JSON.stringify(obj.data);
                jzdData = "";
                //查询界址点成果表分页
                var dkxxid = obj.data.dkxxid;
                table.render({
                    elem: _this.$el.find("#jzd")[0],
                    url: config.InterfaceAddress.affairService + "/sjbp/queryDkzbbById",
                    method: 'post',
                    where: {
                        dkxxid: dkxxid != "" ? dkxxid : -1
                    },
                    cols: [
                        [{
                            type: 'numbers',//数据类型  插件自动提供数字排序  使用场景:编号
                            fixed: 'left',
                            width: 70,
                            title: '编号',//列名
                            align: 'center'
                        }, {
                            field: 'jzdh',
                            title: '界址点号',
                            width: 270,
                            align: 'center'
                        }, {
                            field: 'zbxStr',
                            title: '横坐标',
                            width: 270,
                            align: 'center'
                        }, {
                            field: 'zbyStr',
                            title: '纵坐标',
                            width: 270,
                            align: 'center'
                        }, {
                            field: 'fsbc',
                            title: '反算边长（米）',
                            width: 270,
                            align: 'center'
                        }, {
                            field: 'dkqh',
                            title: '地块圈号',
                            width: 270,
                            align: 'center'
                        }, {
                            field: 'bz',
                            title: '备注',
                            width: 300,
                            align: 'center'
                        }]
                    ],
                    height: 290,
                    limit: 5,//每页条数  控制的是分页数据  实际上当前值需要统一   demo数据是假数据看不出效果
                    page: true,//是否包含分页功能
                    limits: [5, 10, 15, 20, 25],//控制每页显示条数的设置
                    text: '对不起，加载出现异常！',
                    done: function (data) {
                        element.render('progress')
                        jzds=data.count;
                    }
                });
            });
            //界址点
            table.on('row(jzd)', function (obj) {
                obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
                _this.$el.find("#jzdData").attr("value", JSON.stringify(obj.data));
                jzdData = JSON.stringify(obj.data);
            });

            //获取行数据
            _this.$el.find('.demoTable .layui-btn').on('click', function () {
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });
            //地块导入
            upload.render({
                elem: '#dkImport'
                , url: config.InterfaceAddress.affairService + "/sjbp/importExcelOrTxtDkxxbList"
                , accept: 'file'
                , data: {
                    workid: workid,
                    trackid: trackid,
                    isKCDJJSSMS: isKCDJJSSMS
                }
                , acceptMime: 'application/vnd.ms-excel，application/text/plain'
                , done: function (res) {
                    if(res.code==200){
                        parent.window.postMessage('postMessage$$$' + JSON.stringify(res.data), '*');
                        top.layer.open({
                            title: '信息',
                            content: '导入成功',
                            btn: ['确定'],
                            offset: ['30%', '40%']
                        });
                    }else{
                        top.layer.open({
                            title: '信息',
                            content: res.msg,
                            btn: ['确定'],
                            offset: ['30%', '40%']
                        });
                    }
                    
                    table.reload('dk', {
                        where: {
                            workid: workid,
                            trackid: trackid
                        }
                    });
                }
            });
            _this.$el.find("#0").click(function () {
                _this.$api.isImport({ workid: workid, trackid: trackid, dkxxidArr: dkxxidArr }, function (data) {
                    if (data.code == 200) {
                        isImport = data.data;
                    } else {
                        layer.msg(data.msg);
                    }
                }, function () {

                })
                if (isImport) {
                    isImport = false;
                    location.href = config.InterfaceAddress.affairService + "/sjbp/exportExcelOrTxtDkxxbList?workid=" + workid + "&fileType=0" + "&trackid=" + trackid;
                } else {
                    layer.alert("导出失败,请先上传坐标并暂存再导出");
                }
            });
            _this.$el.find("#1").click(function () {
                _this.$api.isImport({ workid: workid, trackid: trackid, dkxxidArr: dkxxidArr }, function (data) {
                    if (data.code == 200) {
                        isImport = data.data;
                    } else {
                        layer.msg(data.msg);
                    }
                }, function () {

                })
                if (isImport) {
                    isImport = false;
                    location.href = config.InterfaceAddress.affairService + "/sjbp/exportExcelOrTxtDkxxbList?workid=" + workid + "&fileType=1" + "&trackid=" + trackid;
                } else {
                    layer.alert("导出失败,请先上传坐标并暂存再导出");
                }
            });
            //下载用地报件国家标准坐标格式模板
            _this.$el.find("#YDBJGJBZZBXGSMB").click(function () {
                var url = config.InterfaceAddress.affairService + "/templates/用地报件国家标准坐标格式.zip";
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
            //测绘信息
            _this.$el.find('#chxx').click(function () {
                top.professionalDialog({
                    top: '120px',
                    title: '测绘信息',
                    width: '800px',
                    height: '600px',
                    showClose: true,
                    path: '/zrzyBusiness/mappingInformation',
                    params: {
                        workid: workid,
                        trackid: trackid,
                        accessToken: accessToken,
                        isKCDJJSSMS: isKCDJJSSMS
                    },
                    onClose: function () {
                        table.reload('dk', {
                            where: {
                                workid: workid,
                                trackid: trackid
                            }
                        });
                    },
                });
            });

            //地块
            _this.$el.find('#dkAdd').click(function () {
                _this.$el.find("#dkData").attr("value", "");
                if(dialogFlag){
                    dialogFlag = false;
                    top.professionalDialog({
                        top: '195px',
                        title: '添加地块信息',
                        width: '700px',
                        height: '500px',
                        showClose: true,
                        path: '/zrzyBusiness/blockInformationAdd',
                        params: {
                            workid: workid,
                            trackid: trackid,
                            dkData: "",
                            update: function () {
                                dkData=''
                                _this.$el.find("#jzdData").attr("value", "");
                                table.reload('dk', {
                                    where: {
                                        workid: workid,
                                        trackid: trackid
                                    }
                                });
                            }
                        },
                        events: {},
                        onClose: function () {
                          dialogFlag = true;
                        },
                    });
                  }
            });
            _this.$el.find('#dkEidt').click(function () {
                if (_this.$el.find("#dkData").val() != "" && dkData !=='') {
                    if(dialogFlag){
                        dialogFlag = false;
                        top.professionalDialog({
                            top: '195px',
                            title: '编辑地块信息',
                            width: '600px',
                            height: '500px',
                            showClose: true,
                            path: '/zrzyBusiness/blockInformationAdd',
                            params: {
                                workid: workid,
                                trackid: trackid,
                                dkData: dkData,
                                update: function () {
                                    dkData=''
                                    _this.$el.find("#jzdData").attr("value", "");
                                    table.reload('dk', {
                                        where: {
                                            workid: workid,
                                            trackid: trackid
                                        }
                                    });
                                }
                            },
                            onClose: function () {
                                dialogFlag = true;
                            },
                        });
                    }

                } else {
                    layer.alert("请选择一条数据进行编辑", { offset: ['30%', '40%'] });
                }
            });
            _this.$el.find('#dkDelete').click(function () {
                if (_this.$el.find("#dkData").val() != "" && dkData !== '') {
                    layer.confirm("确定要删除么？", { offset: ['30%', '40%'] }, function (index) {
                        var dkxx = JSON.parse(_this.$el.find("#dkData").val());
                        _this.$api.deleteDkxxbById({ dkxxid: dkxx.dkxxid }, function (data) {
                            if (data.code == 200) {
                                //清楚已删除数据
                                _this.$el.find("#dkData").attr("value","");
                                table.reload('dk', {
                                    where: {
                                        workid: workid,
                                        trackid: trackid
                                    }
                                });
                                table.reload('jzd', {
                                    where: {
                                        dkxxid: "-1"
                                    }
                                });
                                layer.alert("删除成功", { offset: ['30%', '40%'] });
                            } else {
                                layer.msg(data.msg);
                            }

                            dkData = '';
                        }, function () {
    
                        })
                    })
                    
                } else {
                    layer.alert("请选择一条数据进行删除");
                }
                

            });
            _this.$el.find('#dkDeleteAll').click(function () {
                if (workid != null && workid != "") {
                    layer.confirm("确定要删除全部么？", { offset: ['30%', '40%'] }, function (index) {
                        _this.$api.deleteAllDkxxbById({
                            workid: workid,
                            trackid: trackid
                        }, function (data) {
                            if (data.code == 200) {
                                table.reload('dk', {
                                    where: {
                                        workid: workid,
                                        trackid: trackid
                                    }
                                });
                                table.reload('jzd', {
                                    where: {
                                        dkxxid: "-1"
                                    }
                                });
                                parent.window.postMessage('deleteImport', '*');
                                layer.alert("删除成功", { offset: ['30%', '40%'] });
                                dkData = '';
                            } else {
                                layer.msg(data.msg);
                            }
                        }, function () {

                        })
                    })
                }
            });
            //界址点
            _this.$el.find('#jzdAdd').click(function () {
                if (dkData != "" && dkData != null) {
                    var dkxx = JSON.parse(dkData);
                    if(jzds<dkxx.jzds){//界址点成果表中的数据数量不能大于对应地块数据的界址点数
                        _this.$el.find("#jzdData").attr("value", "");
                        if(dialogFlag){
                            dialogFlag = false;
                            top.professionalDialog({
                                top: '195px',
                                title: '添加界址点成果',
                                width: '600px',
                                height: '500px',
                                showClose: true,
                                path: '/zrzyBusiness/boundaryPointOutcomeTableAdd',
                                params: {
                                    workid: workid,
                                    trackid: trackid,
                                    jzdData: "",
                                    dkData: dkData,
                                    update: function () {
                                        table.reload('jzd', {
                                            where: {
                                                dkxxid: dkxx.dkxxid
                                            }
                                        });
                                    }
                                },
                                events: {},
                                onClose: function () {
                                    dialogFlag = true;
                                },
                            });
                        }


                    }else{
                        layer.alert("界址点数已达上限", { offset: ['70%', '40%'] });
                    }
                    
                } else {
                    layer.alert("请选择一条地块信息", { offset: ['70%', '40%'] });
                }
            });
            _this.$el.find('#jzdEidt').click(function () {
                if (dkData != "" && dkData != null) {
                    var dkxx = JSON.parse(dkData);
                    if (jzdData != "") {
                        if(dialogFlag){
                            dialogFlag = false;
                            top.professionalDialog({
                                top: '195px',
                                title: '编辑界址点成果',
                                width: '600px',
                                height: '500px',
                                showClose: true,
                                path: '/zrzyBusiness/boundaryPointOutcomeTableAdd',
                                params: {
                                    workid: workid,
                                    trackid: trackid,
                                    jzdData: jzdData,
                                    dkData: dkData,
                                    update: function () {
                                        jzdData = "";
                                        table.reload('jzd', {
                                            where: {
                                                dkxxid: dkxx.dkxxid
                                            }
                                        });
                                    }
                                },
                                events: {},
                                onClose: function () {
                                    dialogFlag = true;
                                },
                            });
                        }

                    } else {
                        layer.alert("请选择一条数据进行编辑", { offset: ['70%', '40%'] });
                    }
                } else {
                    layer.alert("请选择一条地块信息", { offset: ['70%', '40%'] });
                }
            });
            _this.$el.find('#jzdDelete').click(function () {
                if (jzdData != "") {
                    layer.confirm("确定要删除么？", function (index) {
                        var jzdxx = JSON.parse(_this.$el.find("#jzdData").val());
                        var dkxx = JSON.parse(dkData);
                        _this.$api.deleteDkzbbById({ dkzbid: jzdxx.dkzbid }, function (data) {
                            if (data.code == 200) {
                                //清楚已删除数据
                                _this.$el.find("#jzdData").attr("value", "");
                                table.reload('jzd', {
                                    where: {
                                        dkxxid: dkxx.dkxxid
                                    }
                                });
                                layer.alert("删除成功", { offset: ['60%', '40%'] });
                                jzdData = '';
                            } else {
                                layer.msg(data.msg);
                            }
                        }, function () {
    
                        })
                    })
                    
                } else {
                    layer.alert("请选择一条数据进行删除");
                }
                
            });
            _this.$el.find('#jzdDeleteAll').click(function () {
                if (dkData != "" && dkData != null) {
                    layer.confirm("确定要删除全部么？", { offset: ['60%', '40%'] }, function (index) {
                        var dkxx = JSON.parse(dkData);
                        _this.$api.deleteAllDkzbbById({ dkxxid: dkxx.dkxxid }, function (data) {
                            if (data.code == 200) {
                                table.reload('jzd', {
                                    where: {
                                        dkxxid: dkxx.dkxxid
                                    }
                                });
                                layer.alert("删除成功", { offset: ['60%', '40%'] });
                                jzdData = '';
                            } else {
                                layer.msg(data.msg);
                            }
                        }, function () {

                        })
                    })
                } else {
                    layer.alert("请选择一条地块信息", { offset: ['70%', '40%'] });
                }
            });
            function tfh(tfh) {
                if (tfh != "null") {
                    return tfh;
                }
                return "";
            }
            function dkbh(dkbh) {
                if (dkbh != "null") {
                    return dkbh;
                }
                return "";
            }
            function findName(dict,value){
                for (var i = 0; i < dict.length; i++) {
                    var item = dict[i];
                    if(item.dictValue==value){
                        return item.dictLabel;
                    }
                }
                return value||"";
            }

        });


    },
    destroy: function () {

    },
}