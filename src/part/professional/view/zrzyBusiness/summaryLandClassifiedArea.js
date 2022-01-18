// import config from '../../config/config'
// import util from '../../component/util'
// import session from '../../component/session'

export default  {
    render: function (template, params, linkTo) {
        var _this = this;
        var QS = "";
        var workid = '-1';
        var trackid = '-1';
        workid = _this.$query.workid;
        trackid = _this.$query.trankid;
        init();

        function init() {
            _this.$api.dict({ "type": "QS" }, function (result) {
                QS = reault.dataList;
            }, function () {

            })

            _this.$api.queryTdflmjbCollectModelForList({
                workid: workid,
                trackid: trackid
            }, function (data) {
                var ymc = "";
                var flag = false;
                var flag1 = false;
                var nextmc = "";
                for (var i = 0; i < data.data.length; i++) {
                    var item = data.data[i];
                    var mc = item.cun ? item.cun : (item.zhen ? item.zhen : (item.xmc ? item.xmc : ""));
                    if (item.qs) {
                        for (var j = 0; j < QS.length; j++) {
                            if (item.qs == QS[j].value) {
                                item.qs = QS[j].name;
                            }
                        }
                        if (ymc == mc) {
                            ymc = mc;
                            if (i < data.data.length - 1) {
                                nextmc = data.data[i + 1].cun ? data.data[i + 1].cun : (data.data[i + 1].zhen ? data.data[i + 1].zhen : (data.data[i + 1].xmc ? data.data[i + 1].xmc : ""));
                            } else {
                                nextmc = "";
                            }
                            if (mc == nextmc) {
                                flag1 = true;
                                flag = true;
                                _this.$el.find("#tdflhzTable").append("<tr>" +
                                    "            <td colspan='3' rowspan='2'>其中</td>" +
                                    "            <td colspan='2' style='width: 50px;'>" + item.qs + "</td>" +
                                    "            <td>" + item.hj + "</td>" +
                                    "            <td>" + item.nydxj + "</td>" +
                                    "            <td>" + item.st + "</td>" +
                                    "            <td>" + item.sjd + "</td>" +
                                    "            <td>" + item.hd + "</td>" +
                                    "            <td>" + item.gy + "</td>" +
                                    "            <td>" + item.cy + "</td>" +
                                    "            <td>" + item.qtyd + "</td>" +
                                    "            <td>" + item.yld + "</td>" +
                                    "            <td>" + item.gmld + "</td>" +
                                    "            <td>" + item.qtld + "</td>" +
                                    "            <td>" + item.trmcd + "</td>" +
                                    "            <td>" + item.rgmcd + "</td>" +
                                    "            <td>" + item.ncdl + "</td>" +
                                    "            <td>" + item.ktsm + "</td>" +
                                    "            <td>" + item.gq + "</td>" +
                                    "            <td>" + item.ssnyd + "</td>" +
                                    "            <td>" + item.tk + "</td>" +
                                    "            <td>" + item.jsydxj + "</td>" +
                                    "            <td>" + item.pflsyd + "</td>" +
                                    "            <td>" + item.zscyyd + "</td>" +
                                    "            <td>" + item.swjryd + "</td>" +
                                    "            <td>" + item.qtsfyd + "</td>" +
                                    "            <td>" + item.gyyd + "</td>" +
                                    "            <td>" + item.ckyd + "</td>" +
                                    "            <td>" + item.ccyd + "</td>" +
                                    "            <td>" + item.czzzyd + "</td>" +
                                    "            <td>" + item.nczjd + "</td>" +
                                    "            <td>" + item.jgttyd + "</td>" +
                                    "            <td>" + item.xwcbyd + "</td>" +
                                    "            <td>" + item.kjyd + "</td>" +
                                    "            <td>" + item.ywcsyd + "</td>" +
                                    "            <td>" + item.wtylyd + "</td>" +
                                    "            <td>" + item.ggssyd + "</td>" +
                                    "            <td>" + item.gyyld + "</td>" +
                                    "            <td>" + item.fjmsssyd + "</td>" +
                                    "            <td>" + item.jsssyd + "</td>" +
                                    "            <td>" + item.slgyd + "</td>" +
                                    "            <td>" + item.jjcsyd + "</td>" +
                                    "            <td>" + item.zjyd + "</td>" +
                                    "            <td>" + item.bzyd + "</td>" +
                                    "            <td>" + item.tlyd + "</td>" +
                                    "            <td>" + item.glyd + "</td>" +
                                    "            <td>" + item.jxyd + "</td>" +
                                    "            <td>" + item.jcyd + "</td>" +
                                    "            <td>" + item.gkmtyd + "</td>" +
                                    "            <td>" + item.gdysyd + "</td>" +
                                    "            <td>" + item.sksm + "</td>" +
                                    "            <td>" + item.sgjzyd + "</td>" +
                                    "            <td>" + item.kxd + "</td>" +
                                    "            <td>" + item.wlydxj + "</td>" +
                                    "            <td>" + item.qtcd + "</td>" +
                                    "            <td>" + item.hlsm + "</td>" +
                                    "            <td>" + item.hpsm + "</td>" +
                                    "            <td>" + item.yhsm + "</td>" +
                                    "            <td>" + item.nltt + "</td>" +
                                    "            <td>" + item.bcjyjjx + "</td>" +
                                    "            <td>" + item.yjd + "</td>" +
                                    "            <td>" + item.zzd + "</td>" +
                                    "            <td>" + item.sd + "</td>" +
                                    "            <td>" + item.ld + "</td>" +
                                    "            <td></td>" +
                                    "        </tr>")
                            } else {
                                flag = false;
                                if (flag1) {
                                    flag1 = false;
                                    _this.$el.find("#tdflhzTable").append("<tr>" +
                                        "            <td colspan='2'>" + item.qs + "</td>" +
                                        "            <td>" + item.hj + "</td>" +
                                        "            <td>" + item.nydxj + "</td>" +
                                        "            <td>" + item.st + "</td>" +
                                        "            <td>" + item.sjd + "</td>" +
                                        "            <td>" + item.hd + "</td>" +
                                        "            <td>" + item.gy + "</td>" +
                                        "            <td>" + item.cy + "</td>" +
                                        "            <td>" + item.qtyd + "</td>" +
                                        "            <td>" + item.yld + "</td>" +
                                        "            <td>" + item.gmld + "</td>" +
                                        "            <td>" + item.qtld + "</td>" +
                                        "            <td>" + item.trmcd + "</td>" +
                                        "            <td>" + item.rgmcd + "</td>" +
                                        "            <td>" + item.ncdl + "</td>" +
                                        "            <td>" + item.ktsm + "</td>" +
                                        "            <td>" + item.gq + "</td>" +
                                        "            <td>" + item.ssnyd + "</td>" +
                                        "            <td>" + item.tk + "</td>" +
                                        "            <td>" + item.jsydxj + "</td>" +
                                        "            <td>" + item.pflsyd + "</td>" +
                                        "            <td>" + item.zscyyd + "</td>" +
                                        "            <td>" + item.swjryd + "</td>" +
                                        "            <td>" + item.qtsfyd + "</td>" +
                                        "            <td>" + item.gyyd + "</td>" +
                                        "            <td>" + item.ckyd + "</td>" +
                                        "            <td>" + item.ccyd + "</td>" +
                                        "            <td>" + item.czzzyd + "</td>" +
                                        "            <td>" + item.nczjd + "</td>" +
                                        "            <td>" + item.jgttyd + "</td>" +
                                        "            <td>" + item.xwcbyd + "</td>" +
                                        "            <td>" + item.kjyd + "</td>" +
                                        "            <td>" + item.ywcsyd + "</td>" +
                                        "            <td>" + item.wtylyd + "</td>" +
                                        "            <td>" + item.ggssyd + "</td>" +
                                        "            <td>" + item.gyyld + "</td>" +
                                        "            <td>" + item.fjmsssyd + "</td>" +
                                        "            <td>" + item.jsssyd + "</td>" +
                                        "            <td>" + item.slgyd + "</td>" +
                                        "            <td>" + item.jjcsyd + "</td>" +
                                        "            <td>" + item.zjyd + "</td>" +
                                        "            <td>" + item.bzyd + "</td>" +
                                        "            <td>" + item.tlyd + "</td>" +
                                        "            <td>" + item.glyd + "</td>" +
                                        "            <td>" + item.jxyd + "</td>" +
                                        "            <td>" + item.jcyd + "</td>" +
                                        "            <td>" + item.gkmtyd + "</td>" +
                                        "            <td>" + item.gdysyd + "</td>" +
                                        "            <td>" + item.sksm + "</td>" +
                                        "            <td>" + item.sgjzyd + "</td>" +
                                        "            <td>" + item.kxd + "</td>" +
                                        "            <td>" + item.wlydxj + "</td>" +
                                        "            <td>" + item.qtcd + "</td>" +
                                        "            <td>" + item.hlsm + "</td>" +
                                        "            <td>" + item.hpsm + "</td>" +
                                        "            <td>" + item.yhsm + "</td>" +
                                        "            <td>" + item.nltt + "</td>" +
                                        "            <td>" + item.bcjyjjx + "</td>" +
                                        "            <td>" + item.yjd + "</td>" +
                                        "            <td>" + item.zzd + "</td>" +
                                        "            <td>" + item.sd + "</td>" +
                                        "            <td>" + item.ld + "</td>" +
                                        "            <td></td>" +
                                        "        </tr>")
                                } else {
                                    _this.$el.find("#tdflhzTable").append("<tr>" +
                                        "            <td colspan='3'>其中</td>" +
                                        "            <td colspan='2'>" + item.qs + "</td>" +
                                        "            <td>" + item.hj + "</td>" +
                                        "            <td>" + item.nydxj + "</td>" +
                                        "            <td>" + item.st + "</td>" +
                                        "            <td>" + item.sjd + "</td>" +
                                        "            <td>" + item.hd + "</td>" +
                                        "            <td>" + item.gy + "</td>" +
                                        "            <td>" + item.cy + "</td>" +
                                        "            <td>" + item.qtyd + "</td>" +
                                        "            <td>" + item.yld + "</td>" +
                                        "            <td>" + item.gmld + "</td>" +
                                        "            <td>" + item.qtld + "</td>" +
                                        "            <td>" + item.trmcd + "</td>" +
                                        "            <td>" + item.rgmcd + "</td>" +
                                        "            <td>" + item.ncdl + "</td>" +
                                        "            <td>" + item.ktsm + "</td>" +
                                        "            <td>" + item.gq + "</td>" +
                                        "            <td>" + item.ssnyd + "</td>" +
                                        "            <td>" + item.tk + "</td>" +
                                        "            <td>" + item.jsydxj + "</td>" +
                                        "            <td>" + item.pflsyd + "</td>" +
                                        "            <td>" + item.zscyyd + "</td>" +
                                        "            <td>" + item.swjryd + "</td>" +
                                        "            <td>" + item.qtsfyd + "</td>" +
                                        "            <td>" + item.gyyd + "</td>" +
                                        "            <td>" + item.ckyd + "</td>" +
                                        "            <td>" + item.ccyd + "</td>" +
                                        "            <td>" + item.czzzyd + "</td>" +
                                        "            <td>" + item.nczjd + "</td>" +
                                        "            <td>" + item.jgttyd + "</td>" +
                                        "            <td>" + item.xwcbyd + "</td>" +
                                        "            <td>" + item.kjyd + "</td>" +
                                        "            <td>" + item.ywcsyd + "</td>" +
                                        "            <td>" + item.wtylyd + "</td>" +
                                        "            <td>" + item.ggssyd + "</td>" +
                                        "            <td>" + item.gyyld + "</td>" +
                                        "            <td>" + item.fjmsssyd + "</td>" +
                                        "            <td>" + item.jsssyd + "</td>" +
                                        "            <td>" + item.slgyd + "</td>" +
                                        "            <td>" + item.jjcsyd + "</td>" +
                                        "            <td>" + item.zjyd + "</td>" +
                                        "            <td>" + item.bzyd + "</td>" +
                                        "            <td>" + item.tlyd + "</td>" +
                                        "            <td>" + item.glyd + "</td>" +
                                        "            <td>" + item.jxyd + "</td>" +
                                        "            <td>" + item.jcyd + "</td>" +
                                        "            <td>" + item.gkmtyd + "</td>" +
                                        "            <td>" + item.gdysyd + "</td>" +
                                        "            <td>" + item.sksm + "</td>" +
                                        "            <td>" + item.sgjzyd + "</td>" +
                                        "            <td>" + item.kxd + "</td>" +
                                        "            <td>" + item.wlydxj + "</td>" +
                                        "            <td>" + item.qtcd + "</td>" +
                                        "            <td>" + item.hlsm + "</td>" +
                                        "            <td>" + item.hpsm + "</td>" +
                                        "            <td>" + item.yhsm + "</td>" +
                                        "            <td>" + item.nltt + "</td>" +
                                        "            <td>" + item.bcjyjjx + "</td>" +
                                        "            <td>" + item.yjd + "</td>" +
                                        "            <td>" + item.zzd + "</td>" +
                                        "            <td>" + item.sd + "</td>" +
                                        "            <td>" + item.ld + "</td>" +
                                        "            <td></td>" +
                                        "        </tr>")
                                }
                            }
                        } else {
                            ymc = mc;
                            if (i < data.data.length - 1) {
                                nextmc = data.data[i + 1].cun ? data.data[i + 1].cun : (data.data[i + 1].zhen ? data.data[i + 1].zhen : (data.data[i + 1].xmc ? data.data[i + 1].xmc : ""));
                            } else {
                                nextmc = "";
                            }
                            if (mc == nextmc) {
                                flag1 = true;
                                _this.$el.find("#tdflhzTable").append("<tr>" +
                                    "            <td colspan='3' rowspan='2'>" + mc + "</td>" +
                                    "            <td colspan='2'>" + item.qs + "</td>" +
                                    "            <td>" + item.hj + "</td>" +
                                    "            <td>" + item.nydxj + "</td>" +
                                    "            <td>" + item.st + "</td>" +
                                    "            <td>" + item.sjd + "</td>" +
                                    "            <td>" + item.hd + "</td>" +
                                    "            <td>" + item.gy + "</td>" +
                                    "            <td>" + item.cy + "</td>" +
                                    "            <td>" + item.qtyd + "</td>" +
                                    "            <td>" + item.yld + "</td>" +
                                    "            <td>" + item.gmld + "</td>" +
                                    "            <td>" + item.qtld + "</td>" +
                                    "            <td>" + item.trmcd + "</td>" +
                                    "            <td>" + item.rgmcd + "</td>" +
                                    "            <td>" + item.ncdl + "</td>" +
                                    "            <td>" + item.ktsm + "</td>" +
                                    "            <td>" + item.gq + "</td>" +
                                    "            <td>" + item.ssnyd + "</td>" +
                                    "            <td>" + item.tk + "</td>" +
                                    "            <td>" + item.jsydxj + "</td>" +
                                    "            <td>" + item.pflsyd + "</td>" +
                                    "            <td>" + item.zscyyd + "</td>" +
                                    "            <td>" + item.swjryd + "</td>" +
                                    "            <td>" + item.qtsfyd + "</td>" +
                                    "            <td>" + item.gyyd + "</td>" +
                                    "            <td>" + item.ckyd + "</td>" +
                                    "            <td>" + item.ccyd + "</td>" +
                                    "            <td>" + item.czzzyd + "</td>" +
                                    "            <td>" + item.nczjd + "</td>" +
                                    "            <td>" + item.jgttyd + "</td>" +
                                    "            <td>" + item.xwcbyd + "</td>" +
                                    "            <td>" + item.kjyd + "</td>" +
                                    "            <td>" + item.ywcsyd + "</td>" +
                                    "            <td>" + item.wtylyd + "</td>" +
                                    "            <td>" + item.ggssyd + "</td>" +
                                    "            <td>" + item.gyyld + "</td>" +
                                    "            <td>" + item.fjmsssyd + "</td>" +
                                    "            <td>" + item.jsssyd + "</td>" +
                                    "            <td>" + item.slgyd + "</td>" +
                                    "            <td>" + item.jjcsyd + "</td>" +
                                    "            <td>" + item.zjyd + "</td>" +
                                    "            <td>" + item.bzyd + "</td>" +
                                    "            <td>" + item.tlyd + "</td>" +
                                    "            <td>" + item.glyd + "</td>" +
                                    "            <td>" + item.jxyd + "</td>" +
                                    "            <td>" + item.jcyd + "</td>" +
                                    "            <td>" + item.gkmtyd + "</td>" +
                                    "            <td>" + item.gdysyd + "</td>" +
                                    "            <td>" + item.sksm + "</td>" +
                                    "            <td>" + item.sgjzyd + "</td>" +
                                    "            <td>" + item.kxd + "</td>" +
                                    "            <td>" + item.wlydxj + "</td>" +
                                    "            <td>" + item.qtcd + "</td>" +
                                    "            <td>" + item.hlsm + "</td>" +
                                    "            <td>" + item.hpsm + "</td>" +
                                    "            <td>" + item.yhsm + "</td>" +
                                    "            <td>" + item.nltt + "</td>" +
                                    "            <td>" + item.bcjyjjx + "</td>" +
                                    "            <td>" + item.yjd + "</td>" +
                                    "            <td>" + item.zzd + "</td>" +
                                    "            <td>" + item.sd + "</td>" +
                                    "            <td>" + item.ld + "</td>" +
                                    "            <td></td>" +
                                    "        </tr>")
                            } else {
                                _this.$el.find("#tdflhzTable").append("<tr>" +
                                    "            <td colspan='3'>" + mc + "</td>" +
                                    "            <td colspan='2'>" + item.qs + "</td>" +
                                    "            <td>" + item.hj + "</td>" +
                                    "            <td>" + item.nydxj + "</td>" +
                                    "            <td>" + item.st + "</td>" +
                                    "            <td>" + item.sjd + "</td>" +
                                    "            <td>" + item.hd + "</td>" +
                                    "            <td>" + item.gy + "</td>" +
                                    "            <td>" + item.cy + "</td>" +
                                    "            <td>" + item.qtyd + "</td>" +
                                    "            <td>" + item.yld + "</td>" +
                                    "            <td>" + item.gmld + "</td>" +
                                    "            <td>" + item.qtld + "</td>" +
                                    "            <td>" + item.trmcd + "</td>" +
                                    "            <td>" + item.rgmcd + "</td>" +
                                    "            <td>" + item.ncdl + "</td>" +
                                    "            <td>" + item.ktsm + "</td>" +
                                    "            <td>" + item.gq + "</td>" +
                                    "            <td>" + item.ssnyd + "</td>" +
                                    "            <td>" + item.tk + "</td>" +
                                    "            <td>" + item.jsydxj + "</td>" +
                                    "            <td>" + item.pflsyd + "</td>" +
                                    "            <td>" + item.zscyyd + "</td>" +
                                    "            <td>" + item.swjryd + "</td>" +
                                    "            <td>" + item.qtsfyd + "</td>" +
                                    "            <td>" + item.gyyd + "</td>" +
                                    "            <td>" + item.ckyd + "</td>" +
                                    "            <td>" + item.ccyd + "</td>" +
                                    "            <td>" + item.czzzyd + "</td>" +
                                    "            <td>" + item.nczjd + "</td>" +
                                    "            <td>" + item.jgttyd + "</td>" +
                                    "            <td>" + item.xwcbyd + "</td>" +
                                    "            <td>" + item.kjyd + "</td>" +
                                    "            <td>" + item.ywcsyd + "</td>" +
                                    "            <td>" + item.wtylyd + "</td>" +
                                    "            <td>" + item.ggssyd + "</td>" +
                                    "            <td>" + item.gyyld + "</td>" +
                                    "            <td>" + item.fjmsssyd + "</td>" +
                                    "            <td>" + item.jsssyd + "</td>" +
                                    "            <td>" + item.slgyd + "</td>" +
                                    "            <td>" + item.jjcsyd + "</td>" +
                                    "            <td>" + item.zjyd + "</td>" +
                                    "            <td>" + item.bzyd + "</td>" +
                                    "            <td>" + item.tlyd + "</td>" +
                                    "            <td>" + item.glyd + "</td>" +
                                    "            <td>" + item.jxyd + "</td>" +
                                    "            <td>" + item.jcyd + "</td>" +
                                    "            <td>" + item.gkmtyd + "</td>" +
                                    "            <td>" + item.gdysyd + "</td>" +
                                    "            <td>" + item.sksm + "</td>" +
                                    "            <td>" + item.sgjzyd + "</td>" +
                                    "            <td>" + item.kxd + "</td>" +
                                    "            <td>" + item.wlydxj + "</td>" +
                                    "            <td>" + item.qtcd + "</td>" +
                                    "            <td>" + item.hlsm + "</td>" +
                                    "            <td>" + item.hpsm + "</td>" +
                                    "            <td>" + item.yhsm + "</td>" +
                                    "            <td>" + item.nltt + "</td>" +
                                    "            <td>" + item.bcjyjjx + "</td>" +
                                    "            <td>" + item.yjd + "</td>" +
                                    "            <td>" + item.zzd + "</td>" +
                                    "            <td>" + item.sd + "</td>" +
                                    "            <td>" + item.ld + "</td>" +
                                    "            <td></td>" +
                                    "        </tr>")
                            }

                        }
                    } else {
                        ymc = mc;
                        _this.$el.find("#tdflhzTable").append("<tr>" +
                            "            <td colspan='5'>" + mc + "</td>" +
                            "            <td>" + item.hj + "</td>" +
                            "            <td>" + item.nydxj + "</td>" +
                            "            <td>" + item.st + "</td>" +
                            "            <td>" + item.sjd + "</td>" +
                            "            <td>" + item.hd + "</td>" +
                            "            <td>" + item.gy + "</td>" +
                            "            <td>" + item.cy + "</td>" +
                            "            <td>" + item.qtyd + "</td>" +
                            "            <td>" + item.yld + "</td>" +
                            "            <td>" + item.gmld + "</td>" +
                            "            <td>" + item.qtld + "</td>" +
                            "            <td>" + item.trmcd + "</td>" +
                            "            <td>" + item.rgmcd + "</td>" +
                            "            <td>" + item.ncdl + "</td>" +
                            "            <td>" + item.ktsm + "</td>" +
                            "            <td>" + item.gq + "</td>" +
                            "            <td>" + item.ssnyd + "</td>" +
                            "            <td>" + item.tk + "</td>" +
                            "            <td>" + item.jsydxj + "</td>" +
                            "            <td>" + item.pflsyd + "</td>" +
                            "            <td>" + item.zscyyd + "</td>" +
                            "            <td>" + item.swjryd + "</td>" +
                            "            <td>" + item.qtsfyd + "</td>" +
                            "            <td>" + item.gyyd + "</td>" +
                            "            <td>" + item.ckyd + "</td>" +
                            "            <td>" + item.ccyd + "</td>" +
                            "            <td>" + item.czzzyd + "</td>" +
                            "            <td>" + item.nczjd + "</td>" +
                            "            <td>" + item.jgttyd + "</td>" +
                            "            <td>" + item.xwcbyd + "</td>" +
                            "            <td>" + item.kjyd + "</td>" +
                            "            <td>" + item.ywcsyd + "</td>" +
                            "            <td>" + item.wtylyd + "</td>" +
                            "            <td>" + item.ggssyd + "</td>" +
                            "            <td>" + item.gyyld + "</td>" +
                            "            <td>" + item.fjmsssyd + "</td>" +
                            "            <td>" + item.jsssyd + "</td>" +
                            "            <td>" + item.slgyd + "</td>" +
                            "            <td>" + item.jjcsyd + "</td>" +
                            "            <td>" + item.zjyd + "</td>" +
                            "            <td>" + item.bzyd + "</td>" +
                            "            <td>" + item.tlyd + "</td>" +
                            "            <td>" + item.glyd + "</td>" +
                            "            <td>" + item.jxyd + "</td>" +
                            "            <td>" + item.jcyd + "</td>" +
                            "            <td>" + item.gkmtyd + "</td>" +
                            "            <td>" + item.gdysyd + "</td>" +
                            "            <td>" + item.sksm + "</td>" +
                            "            <td>" + item.sgjzyd + "</td>" +
                            "            <td>" + item.kxd + "</td>" +
                            "            <td>" + item.wlydxj + "</td>" +
                            "            <td>" + item.qtcd + "</td>" +
                            "            <td>" + item.hlsm + "</td>" +
                            "            <td>" + item.hpsm + "</td>" +
                            "            <td>" + item.yhsm + "</td>" +
                            "            <td>" + item.nltt + "</td>" +
                            "            <td>" + item.bcjyjjx + "</td>" +
                            "            <td>" + item.yjd + "</td>" +
                            "            <td>" + item.zzd + "</td>" +
                            "            <td>" + item.sd + "</td>" +
                            "            <td>" + item.ld + "</td>" +
                            "            <td></td>" +
                            "        </tr>")
                    }
                }
            }, function (data) {
                layer.msg(data.msg);
            })
        }
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = encodeURI(window.location.search).substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    },
    destroy: function () {
        $(document).unbind('keyup');
    },
}


