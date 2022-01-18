////////////////////////////////////////////////
// 成果质检-详情页 - 新建质检下一步
// 杨爽
// 2020-10-13 14:35:36
////////////////////////////////////////////////
import TreeView from './inspection_details_tree'
import RulesView from './inspection_details_rules'
import CardView from './inspection_details_card_add'
var session = icu.session;
export default {
    renderData: function () {
        return {}
    },
    render: function () {
        var _this = this;
        this.renderData.interval = null;
          //选中质检项
          var treeSelectedLength = "";
          var qcStateValue = '';
        // console.log(this.$data)
        _this.renderData.cgxxbId = this.$data.cgxxbId
        _this.renderData.$el = _this.$el;
        var _treeList = new TreeView(_this, _this.renderData)
        _treeList.init();

        _treeList.onDataRender(() => {
            // console.log(_this.renderData.formAllData);
        });

        var _rulesList = new RulesView(_this.renderData)
        _rulesList.init();
        var _cardList = new CardView(_this.renderData);
        // console.log(_cardList);

      

        //成果质检-返回质检状态
        _this.$api.returnQcStateByCgid({
            cgxxbId: _this.$data.cgxxbId,
        }, function (res) {
            // 为0或者null或者为4时，显示开始质检按钮，
            // 为1时显示终止质检，
            // 其他为隐藏
            // console.log(res.data);
            if (res.data == 3 || res.data == 0 || res.data == null || res.data == 4) {
                _this.$el.find("#btn_start").show();
            } else if (res.data == 1) {
                _this.$el.find("#btn_start").hide();
                _this.$el.find("#btn_end").show();
            } else {
                _this.$el.find("#btn_start").hide();
                _this.$el.find("#btn_end").hide();
            }
            // console.log(res);
        });

        _this.$api.getAchievementInfo({
            cgxxbId: _this.$data.cgxxbId,
        }, function (res) {
            console.log(res);
            // console.log('质检文件名称:'+ res.achievement.uploadFilesName + '质检时间:' + res.achievement.createTime +'执行质检人员:'+ res.achievement.createUser +'本次质检份数:'+ res.achievement.qcScore+'错误总数:'+ res.achievement.errorSum + '检查编码:' + res.achievement.zjxzflbId);
            // _cardList.init(res);


        })

        _cardList.onC((value) => {
            _this.renderData.text = value;
            // console.log(value)
        })

        this.$el.find("#btn_back").click(function () {
            clearInterval(_this.renderData.interval);
            _this.closeEvent();
        });


        var bindEvent = function (ele, event, i) {
            ele.click(function () {
                event(i)
            })
        };
        getEblTreeAllInit()
        function getEblTreeAllInit() {
            _this.$el.find("#dl_box").html("");
            //成果质检-详情页-质检分类
            _this.$api.getEblTreeAll({ zjxzflbId: "", cgid: _this.$data.cgxxbId }, function (res) {
                treeSelectedLength = res.treeSelected.length;
                // console.log(res);
                //tree显示
                // city.getCheckedNodes(true)
                var treeAllSelectobj = {}

                for (var w = 0; w < res.treeSelected.length; w++) {
                    const item = res.treeSelected[w];
                    if (item.pid == '0') {
                        treeAllSelectobj[item.id] = [];
                    } else if (treeAllSelectobj.hasOwnProperty(item.pid)) {
                        treeAllSelectobj[item.pid].push(item)
                    } else {
                        treeAllSelectobj[item.id] = [];
                    }
                }
                for (var i = 0; i < res.treeAll.length; i++) {
                    if (res.treeAll[i].pid == 0) {
                        var html = $("<dl class=\"testing test_dl\" id=" + res.treeAll[i].id + " >\n" +
                            "                <a href=\"javascript:;\" class=\"detail\"><img src=\"./static/img/result/u568.svg\"></a>\n" +
                            "                <dt><img src=\"./static/img/result/u563.svg\"></dt>\n" +
                            "                <dd>" + res.treeAll[i].name + "</dd>\n" +
                            "                <dd style='display:none;'>" + res.treeAll[i].id + "</dd>\n" +
                            "            </dl>");

                        if (treeAllSelectobj.hasOwnProperty(res.treeAll[i].id) && treeAllSelectobj[res.treeAll[i].id].length !== 0) {
                            html.css("background", "rgb(217,242,240)")
                        }
                        bindEvent(html, function (i) {
                            implementationDialog({
                                top: '120px',
                                width: '40%',
                                height: '50%',
                                path: '/result/quality_testing/inspection/other_page/detail/rules',
                                params: {
                                    zjxzflbId: res.treeAll[i].id,   //父级ID
                                    tableData: _this.$data,
                                    cgid: _this.$data.cgxxbId,
                                    status:qcStateValue 
                                },
                                title: '质检细则',
                                events: {},
                                onClose: function () {
                                    _treeList.init();
                                    _rulesList.init();
                                    getEblTreeAllInit();

                                },
                            });
                        }, i);

                        _this.$el.find("#dl_box").append(html);
                    }
                };
            });
        }
        function getAchievementInfo(cb) {
            _this.$api.getAchievementInfo({
                cgxxbId: _this.$data.cgxxbId,
            }, function(res) {
                if(res.achievement.qcScore) {
                    cb(res)
                }else {
                    getAchievementInfo(cb)
                }
            })
        }
        function setIn() {
           
            _this.$api.getAchievementInfo({
                cgxxbId: _this.$data.cgxxbId,
            }, function (res) {
                qcStateValue = res.achievement.qcState;
                if (res.achievement.qcState == '2' || res.achievement.qcState == '3') {
                    _this.$el.find("#btn_start").hide();
                    _this.$el.find("#btn_end").hide();
                    _this.$el.find("#btn_zc").hide();
                    clearInterval(_this.renderData.interval);
                    _this.$el.find("#classification_shade").hide();
                    _this.$el.find("#left_shade").hide();
                    _this.$api.reportsAddress({
                        cgId: _this.$data.cgxxbId,                // 成果信息表id (String) 
                    }, function (res) {
                       console.log(res);
                       getAchievementInfo(res=> {
                            _cardList.showTextDiv(handelFor(res.recordList,res.achievement).log);
                            _cardList.showResaultDiv(handelFor(res.rramsResultsAttachments,res.achievement).resultCodeNum);
                       })
                    });
                } else if (res.achievement.qcState == '1') {
                    _this.$el.find("#btn_start").hide();
                    _this.$el.find("#btn_end").show();
                    _this.$el.find("#btn_zc").hide();
                    _cardList.changeTextDiv(handelFor(res.recordList,res.achievement).log);
                    _this.$el.find("#classification_shade").show();
                    _this.$el.find("#left_shade").show();
                } else if (res.achievement.qcState == '4') {
                    // icu.alert.warning({
                    //     title: '终止质检',
                    // });
                    clearInterval(_this.renderData.interval);
                    _this.$el.find("#btn_zc").hide();
                    _this.$el.find("#btn_start").hide();
                    _this.$el.find("#btn_end").hide();
                    _cardList.changeTextDiv(handelFor(res.recordList,res.achievement).log);
                    _this.$el.find("#classification_shade").hide();
                    _this.$el.find("#left_shade").hide();
                } else if (res.achievement.qcState == '0') {
                    clearInterval(_this.renderData.interval);
                    _this.$el.find("#btn_zc").show();
                    _this.$el.find("#btn_start").show();
                    _this.$el.find("#btn_end").hide();
                    _this.$el.find("#classification_shade").hide();
                    _this.$el.find("#left_shade").hide();
                }
                if(res.achievement.qcState == '2' || res.achievement.qcState == '4'){
                    _this.$el.find("#testing").unbind("click");
                    _this.$el.find("#reset_test").unbind("click");
                }else{
                    //全部质检
                    _this.$el.find("#testing").click(function(){
                        //全部质检和取消全部质检    
                        _this.$api.isCheckAll({ cgxxbId:_this.$data.cgxxbId, isCheck:1}, function (res) {
                        _rulesList.init();
                        getEblTreeAllInit();
                    })
                    _this.$el.find("#reset_test").show();
                    _this.$el.find("#testing").hide();
                    });
                    //取消质检
                    _this.$el.find("#reset_test").click(function(){
                        //全部质检和取消全部质检    
                        _this.$api.isCheckAll({ cgxxbId:_this.$data.cgxxbId, isCheck:0}, function (res) {
                        _rulesList.init();
                        getEblTreeAllInit();
                    });
                    _this.$el.find("#testing").show();
                    _this.$el.find("#reset_test").hide();
                    });
                }
            })
        }
        var handelFor = function (result,achievement) {
            var num = ''
            var obj = {
                log: '',
                resultCodeNum: ''
            }
            for (var bm = 0; bm < result.length; bm++) {
                if(result[bm].recordType==0){
                    obj.log += '检查编码 ' +
                    result[bm].examinCode + "," +
                    result[bm].recordContent + "。" +
                    '检查通过。<br/> ' ;
                }else{
                    obj.log += '检查编码 ' +
                    result[bm].examinCode + "," +
                    result[bm].recordContent + '。<br/> ' ;
                }
                num += result[bm].examinCode + '(' + result[bm].errorSum + '个)' + '、';

            }
            var jgbs='';
            if(achievement.qcState=='0'){
                jgbs='暂存'
            }else if(achievement.qcState=='1'){
                jgbs='质检中'
            }else if(achievement.qcState=='2'){
                jgbs='通过'
            }else if(achievement.qcState=='3'){
                jgbs='未通过'
            }else if(achievement.qcState=='4'){
                jgbs='终止'
            }
            obj.resultCodeNum = '质检文件名称：' +
                        achievement.uploadFilesName + '<br/>' + '质检时间：' +
                        achievement.createTime + '<br/>' + '执行质检人员：' +
                        achievement.userName+ '<br/>' + '本次质检分数：' +
                        (achievement.qcScore==null?"":achievement.qcScore) + "分" + '<br/>' + '错误总数：' +
                        (achievement.errorSum==null?"":achievement.errorSum) + "个" + '<br/>' + '检查编码：' + num
                        +  '<br/>' + '结果标识：' + jgbs
            return obj
          
        }
        setIn();
        if(this.$data.setIn) {
            _this.$el.find("#nav li").eq(1).addClass('act');
            _this.$el.find("#nav li").eq(0).removeClass('act');  
            _this.renderData.interval = setInterval(setIn, 3000);
        }
        //开始质检
        _this.$el.find("#btn_start").click(function () {
            var userInfo = icu.session.get('userInfo')
            _this.$api.checkTxtContent({cgId: _this.$data.cgxxbId, userId: userInfo.id},res=> {
                if(res.data) {
                    if(treeSelectedLength < 1){
                        icu.alert.warning({
                            text: '您未选择质检项，请选择质检项再进行操作！',
                        }); 
                    }
                    if(treeSelectedLength > 1){
                        _this.$el.find("#nav li").eq(1).addClass('act');
                        _this.$el.find("#nav li").eq(0).removeClass('act');  
                        _this.$api.updateAchievement({
                            cgxxbId: _this.$data.cgxxbId,
                            qcState: 1
                        }, function (res) {
                            if (res.code == 200) {
                                _cardList.$html.find('#log_bm').html(" ");
                                _this.renderData.interval = setInterval(setIn, 3000);
            
                            }
                        });
                        _this.$el.find("#btn_start").attr("disabled","disabled").css({"background":"#eff1f2","color":"#999"});
        
                    }
                }else {
                    icu.alert.warning({
                        text: '质检行政区划不在行政区划边界内',
                    }); 
                }
            })
        });
        //终止质检
        _this.$el.find("#btn_end").click(function () {
            _this.$el.find("#testing").unbind('click'); 
            clearInterval(_this.renderData.interval);
            _this.$api.updateAchievement({
                updateUser: session.get('userInfo').id,
                cgxxbId: _this.$data.cgxxbId,
                qcState: 4
            }, function (res) {
                _this.$el.find('#testing').css("visibility","hidden");
                _this.$el.find('#reset_test').css("visibility","hidden");
                _this.$el.find("#classification_shade").hide();
                _this.$el.find("#left_shade").hide();  
                _this.$el.find("#btn_end").hide();
                icu.alert.warning({
                    title: '终止质检',
                });
            });

        });
        //暂存
        _this.$el.find("#btn_zc").click(function () {
            var userInfo = icu.session.get('userInfo')
            _this.$api.checkTxtContent({cgId: _this.$data.cgxxbId, userId: userInfo.id},res=> {
                if(res.data) {
                    _this.closeEvent();
                    }else{
                        icu.alert.warning({
                            text: '当前成果包不在当前用户行政区划内！无法暂存!',
                        }); 
                        _this.closeEvent();
                    }
            
            })           
            
            // _this.$api.updateAchievement({
            //     updateUser: session.get('userInfo').id,
            //     cgxxbId:  _this.$data.cgxxbId, // 规划成果名称 (String) 
            //     qcState:  0
            // }, function (res) {
            //     icu.alert.success({
            //         title: '暂存成功',
            //         text: '',
            //         // callback 方法如无必要，可以不进行编写
            //     }); 
            // });

        });
    },
    destroy: function () {
        clearInterval(this.renderData.interval);
    }
}
