// import config from '../../config/config'
// import util from '../../component/util'
// import session from '../../component/session'

export default  {
    render: function (params, closeEvent) {
        var _this = this;
        var form = layui.form;
        var dkData = _this.$data.dkData;
        var jzdData = _this.$data.jzdData;
        var workid = _this.$data.workid;
        var trackid = _this.$data.trackid;
        var jzdxx = null;
        if (jzdData.length != 0) {
            jzdxx = JSON.parse(jzdData)
        }
        var dkdxx = null;
        if (dkData.length != 0) {
            dkdxx = JSON.parse(dkData)
        }
        form.verify({
            number: [/^\d+$|^\d*\.\d+$/, '只能填写数字']
        });
        init();
        function init() {
            if (jzdxx != null && jzdxx != "") {
                _this.$el.find("#jzdh").val(jzdxx.jzdh);
                _this.$el.find("#zbx").val(jzdxx.zbxStr);
                _this.$el.find("#zby").val(jzdxx.zbyStr);
                _this.$el.find("#fsbc").val(jzdxx.fsbc);
                _this.$el.find("#dkqh").val(jzdxx.dkqh);
                _this.$el.find("#bz").val(jzdxx.bz);
                _this.$el.find("#dkzbid").val(jzdxx.dkzbid);
            }
            _this.$el.find("#dkxxid").val(dkdxx.dkxxid);
            form.on('submit(jzdxxsave)', function (data) {
                var jzdh = _this.$el.find("#jzdh").val();
                var zbx = _this.$el.find("#zbx").val();
                var zby = _this.$el.find("#zby").val();
                var fsbc = _this.$el.find("#fsbc").val();
                var dkqh = _this.$el.find("#dkqh").val();
                var bz = _this.$el.find("#bz").val();
                var dkxxid = _this.$el.find("#dkxxid").val();
                var dkzbid = _this.$el.find("#dkzbid").val();
                var dkmj = _this.$el.find("#dkmj").val();
                if (jzdh == "" && zby == "" && zbx == "" && fsbc == "" && dkqh == "" && bz == "") {
                    layer.alert("输入内容不能同时为空")
                } else {
                    if (_this.$el.find("#dkzbid").val() == "") {
                        _this.$api.insertDkzbbInfo({
                            dkzbid: "",
                            jzdh: jzdh,
                            zbx: zbx,
                            zby: zby,
                            fsbc: fsbc,
                            dkqh: dkqh,
                            bz: bz,
                            dkxxid: dkxxid,
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
                                        _this.closeEvent();
                                    }
                                })
                            } else {
                                layer.msg(data.msg);
                            }
                        }, function (data) {
                            layer.msg(data.msg);
                        })
                    } else {
                        _this.$api.updateDkzbbById({
                            dkzbid: dkzbid,
                            jzdh: jzdh,
                            zbx: zbx,
                            zby: zby,
                            fsbc: fsbc,
                            dkqh: dkqh,
                            dkmj: dkmj,
                            bz: bz,
                        }, function (data) {
                            if (data.code == 200) {
                                layer.alert("修改成功", {
                                    btn: ['确认'],
                                    yes: function (index) {
                                        layer.close(index);
                                    },
                                    end: function(){
                                        _this.$data.update();
                                        _this.closeEvent();
                                    }
                                })
                            } else {
                                layer.msg(data.msg);
                            }
                        }, function (data) {
                            layer.msg(data.msg);
                        })
                    }
                }

                return false;
            })

        }
    },
    destroy: function () {
        $(document).unbind('keyup');

    },
}


