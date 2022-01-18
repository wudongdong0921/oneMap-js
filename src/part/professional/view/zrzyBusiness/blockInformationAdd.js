// import config from '../../config/config'
// import util from '../../component/util'/
// import session from '../../component/session'

export default  {
    render: function (params, closeEvent) {
        var laydate = layui.laydate,
            form = layui.form;

        var _this = this;

        var dkData = _this.$data.dkData;
        var workid = _this.$data.workid;
        var trackid = _this.$data.trackid;
        var dkxx = null;
        if (dkData.length != 0) {
            dkxx = JSON.parse(dkData)
        }
        form.verify({
            required: [/[\S]+/, '必填项不能为空'],
            number: [/^\d+$|^\d*\.\d+$/, '只能填写数字'],
            date: [/(^$)|^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, '日期格式不正确'],
        });
        laydate.render({
            elem: '#clsj',
            theme: '#1e9fff'
        });
        init();
        function init() {
            //地块用途
            _this.$api.dict({ "type": "DKYT" }, function (data) {
                _this.$el.find("#dkyt").append('<option value="">--请选择--</option>');
                for (var i = 0; i < data.dataList.length; i++) {
                    var item = data.dataList[i];
                    _this.$el.find("#dkyt").append('<option value="' + item.dictValue + '" >' + item.dictLabel + '</option>');
                }
                form.render();//渲染下拉框
            }, function () {

            })
            _this.$api.dict({ "type": "TXLX" }, function (data) {
                _this.$el.find("#txlx").append('<option value="">--请选择--</option>');
                for (var i = 0; i < data.dataList.length; i++) {
                    var item = data.dataList[i];
                    _this.$el.find("#txlx").append('<option value="' + item.dictValue + '" >' + item.dictLabel + '</option>');
                }
                form.render();//渲染下拉框
            }, function () {

            })
            if (dkxx != null && dkxx != "") {
                //编辑地块坐标表回显
                _this.$api.findDkxxbInfo({ dkxxid: dkxx.dkxxid }, function (data) {
                    if (data.code == 200) {
                        _this.$el.find("#dkxxid").val(data.data.dkxxid);
                        _this.$el.find("#tfh").val(data.data.tfh);
                        _this.$el.find("#dkbh").val(data.data.dkbh);
                        _this.$el.find("#dkmc").val(data.data.dkmc);
                        _this.$el.find("#dkyt").find("option[value=" + data.data.dkyt + "]").prop("selected", true);
                        _this.$el.find("#jzds").val(data.data.jzds);
                        _this.$el.find("#dkmj").val(data.data.dkmj);
                        _this.$el.find("#zbx").val(data.data.zbx);
                        _this.$el.find("#txlx").find("option[value=" + data.data.txlx + "]").prop("selected", true);
                        form.render();
                    } else {
                        layer.msg(data.msg);
                    }
                }, function (data) {
                    layer.msg(data.msg);
                })
            }
            form.on('submit(dkxxsave)', function (data) {
                var tfh = _this.$el.find("#tfh").val();
                var dkbh = _this.$el.find("#dkbh").val();
                var dkmc = _this.$el.find("#dkmc").val();
                var dkyt = _this.$el.find("#dkyt").val();
                var jzds = _this.$el.find("#jzds").val();
                var dkmj = _this.$el.find("#dkmj").val();
                var txlx = _this.$el.find("#txlx").val();
                var zbx = _this.$el.find("#zbx").val();
                var dkxxid = _this.$el.find("#dkxxid").val();
                // var zbx = _this.$el.find("#zbx").val();
                if (_this.$el.find("#dkxxid").val() == "") {
                    //地块信息
                    _this.$api.insertDkxxbInfo({
                        dkxxid: "",
                        tfh: tfh,
                        dkbh: dkbh,
                        dkmc: dkmc,
                        dkyt: dkyt,
                        jzds: jzds,
                        dkmj: dkmj,
                        txlx: txlx,
                        zbx: zbx,
                        workid: workid,
                        trackid: trackid
                    }, function (data) {
                        if (data.code == 200) {
                            layer.alert("添加成功", {
                                btn: ['确认'],
                                yes: function (index) {
                                    layer.close(index);
                                },
                                end: function(){
                                    _this.$data.update();
                                    _this.closeEvent('isRefresh');
                                }
                            })
                        } else {
                            layer.msg(data.msg);
                        }
                    }, function (data) {
                        layer.msg(data.msg);
                    })
                } else {
                    //更新地块坐标表
                    _this.$api.updateDkxxbById({
                        dkxxid: dkxxid,
                        tfh: tfh,
                        dkbh: dkbh,
                        dkmc: dkmc,
                        dkyt: dkyt,
                        jzds: jzds,
                        dkmj: dkmj,
                        txlx: txlx,
                        zbx: zbx,
                        workid: workid,
                        trackid: trackid
                    }, function (data) {
                        if (data.code == 200) {
                            layer.alert("修改成功", {
                                btn: ['确认'],
                                yes: function (index) {
                                    layer.close(index);
                                },
                                end: function(){
                                    _this.$data.update();
                                    _this.closeEvent('isRefresh');
                                }
                            })
                        } else {
                            layer.msg(data.msg);
                        }
                    }, function (data) {
                        layer.msg(data.msg);
                    })
                }
                return false;
            })

        }
    },
    destroy: function () {
        $(document).unbind('keyup');

    },
}


