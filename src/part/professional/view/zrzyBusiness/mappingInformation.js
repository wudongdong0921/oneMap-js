// import config from "../../config/config";
// import request from "../../component/ajax";
// import session from "../../component/session";

export default  {
    render: function (template, params, Event) {
        var table = layui.table;

        var _this = this;

        // getProjectInfo

        var drawNo = _this.$el.find('#drawNo');
        var projectNo = _this.$el.find('#projectNo');

        var searchButton = _this.$el.find('#searchButton');
        var resetButton = _this.$el.find('#resetButton');

        var workid = _this.$data.workid;
        var trackid = _this.$data.trackid;
        var accessToken = _this.$data.accessToken;
        var isKCDJJSSMS =  _this.$data.isKCDJJSSMS;//判断是否拥有   勘测定界技术说明表



        var _table = table.render({
            elem: _this.$el.find("#ch"),
            cols: [[{
                field: 'caseflowname',
                title: '环节名称',
                align: 'center'
            }, {
                field: 'recdate',
                title: '接收时间',
                align: 'center',

            }, {
                field: 'factenddate',
                title: '结束时间',
                align: 'center',
            }, {
                field: 'idea',
                title: '备注',
                align: 'center'
            }]],
            data: [],
            height: 230,
        });

        var isHaveData = false;

        this.$el.find('#drawNo').on('input', function () {
            isHaveData = false;
        });


        searchButton.click(function () {
            var value = drawNo.val();
            if (!value) {
                layer.open({
                    title: '警告',
                    content: '请输入测绘编号或项目编号'
                });
                return;
            };
            _this.$api.getProjectInfo(drawNo.val(), function (res) {
                for (const key in res[0]) {
                    if (res[0].hasOwnProperty(key)) {
                        const element = res[0][key];
                        var ele = _this.$el.find('#' + key);
                        if (ele.length) {
                            ele.val(element);
                        };
                    }
                }
                _this.$api.getFlowInfo(drawNo.val(), function (res) {
                    isHaveData = true;
                    _table.reload({
                        data: res
                    });
                });
            });
        });

        // 
        _this.$el.find('#uploadFile').click(function () {
            var value = drawNo.val();
            if (!value) {
                layer.open({
                    title: '警告',
                    content: '请输入测绘编号或项目编号'
                });
                return;
            };

            if (!isHaveData) {
                layer.open({
                    title: '警告',
                    content: '请先进行查询后再导入'
                });
                return;
            };

            _this.$api.ImportFileByWord({
                projectNo: value,
                workid: workid,
                trackid: trackid,
                isKCDJJSSMS: isKCDJJSSMS,
            }, function (res) {
                if (res.code == 200) {
                    parent.window.postMessage('postMessage$$$' + JSON.stringify(res.data), '*');
                    top.layer.open({
                        title: '信息',
                        content: "导入成功",
                        btn: ['确定'],
                        offset: ['30%', '40%'],
                        yes: function (index, layero) {
                            top.layer.close(index);
                            _this.closeEvent('isRefresh');
                        }
                    });
                } else {
                    layer.open({
                        title: '提示',
                        content: '导入失败'
                    });
                };
            });
        });

        /* _this.$el.find('#DownLoadFile').click(function () {
             var value = drawNo.val();
             if (!value) {
                 layer.open({
                     title: '警告',
                     content: '请输入测绘编号或项目编号'
                 });
                 return;
             };
             _this.$api.ZipFiles(drawNo.val(), function (res) {
                 var elemIF = document.createElement("iframe");
                 elemIF.src = res;
                 elemIF.style.display = "none";
                 document.body.appendChild(elemIF);
             });
         });*/

        //地块导入
        // layui.upload.render({
        //     elem: '#uploadFile'
        //     , url: config.InterfaceAddress.affairService + "/ZipFiles"
        //     , accept: 'file'
        //     , data: {
        //         projectNo:projectNo,
        //         workid: workid,
        //         trackid: trackid
        //     }
        //     , acceptMime: 'application/vnd.ms-excel，application/text/plain'
        //     , done: function (res) {
        //         if (res.code == '200') {
        //             parent.window.postMessage('postMessage$$$' + JSON.stringify(res.data), '*');
        //             top.layer.open({
        //                 title: '信息',
        //                 content: "导入成功",
        //                 btn: ['确定'],
        //                 offset: ['30%', '40%'],
        //                 yes: function (index, layero) {
        //                     top.layer.close(index);
        //                     Event('isRefresh');
        //                 }
        //             });
        //         };
        //     }
        // });
    },
    destroy: function () {

    },
}