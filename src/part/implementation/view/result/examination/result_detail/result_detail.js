////////////////////////////////////////////////
// 详情页
// 戴飞
// 2020-10-14 13:17:2
////////////////////////////////////////////////
import renderView from "../../../../commont/renderView";

export default {
  render: function () {
    var _this = this;
    var wordFile = {}
    console.log({
      id:this.$query.cgxxbId,
      readonly: this.$query.readonly === 'false'? false : true,//true时为只读
      reviewState: this.$query.reviewState,
      icon: this.$query.icon === 'false'? false : true
    });
    this.$query.reviewState = decodeURI(this.$query.reviewState)
    if(this.$query.btn === 'false') this.$query.btn = false
    else this.$query.btn = true
    this.$query.btn && this.$el.find(".getbtn").css('display','block')
    this.$query.reviewState === '正常' && this.$el.find('#lookReview').css('display','inline-block')
    if(this.$query.btn) this.$el.find('#lookReview').css('display','none')
    //引入视图模板组件
    var viewTemplate = renderView(this.$el.find('.file-view'), "/affixFileView");
    viewTemplate.$el.css({
      width : '100%',
      height : '100%'
    });
    //引入审查要点组件
    var _tree = renderView(this.$el.find(".treeModal"), "/viewComponent/treeModal/treeModal",{
      options: {
        readonly: this.$query.readonly === 'false'? false : true,//true时为只读
        reviewState: this.$query.reviewState,
        icon: this.$query.icon === 'false'? false : true
      }
    });
    //引入树形控件组件
    var wdt = renderView(this.$el.find(".toWaitDetail-left"), "/viewComponent/tree", {
      title: '成果审查'
    });
    this.$api.outputFileTree({
      'cgxxbId': this.$query.cgxxbId
    },res=>{
      //初始化树形控件
      wdt.onReady(() => {
        var treeObj = wdt.treeInit(res.data);
        // console.log(res.data);
        //配置树形控件默认全部展开
        this.treeAction(treeObj);
      });
    })
    this.$api.getPlanResultType("",res => {
      // console.log(res);
      icu.optionSide.set(res.data, 'PlanResultType'); 
      this.$api.getAchievementInfo({
        'cgxxbId': this.$query.cgxxbId
      },res=>{
        console.log(res);
        wordFile.fileName=res.achievement.planningResultName
        // wordFile.reportsAddressId = config.InterfaceAddress.implementService + '/' + res.achievement.reportsAddressId
        // wordFile.iperAddressId = config.InterfaceAddress.implementService + '/' + res.achievement.iperAddressId
        wordFile.reportsAddressId = res.achievement.reportsAddressId
        wordFile.iperAddressId = res.achievement.iperAddressId
        //引入表单模板
        var outcomeForm = renderView(this.$el.find('.input-view'),"/viewComponent/outcomeForm",res.achievement)
      })
      
  })
    
    //监听树形控件节点点击事件，绑定视图模板
    wdt.onChange(value=>{
      console.log('-----------视图模板------------');
      console.log(value.pathUrl);
      if (value.pathUrl) {
        this.$el.find('.input-view').css('display','none')
        viewTemplate.set(value.id, value.name)
      } else {
        viewTemplate.hide();
        this.$el.find('.input-view').css('display','block')
      };
    })
    //配置审查要点组件
    setTimeout(() => {
      this.$api.getReviewListTree({
        'cgxxbId': this.$query.cgxxbId
        //'cgxxbId':id
      },res =>{
        // console.log(res.data)
        _tree.setdata(res.data);//赋值
          _tree.onUpdateStatus(function (data, status) { //点击对号或叉号时的回调（第一个参数为点击的单条数据，第二个参数为此条数据的status）
              // console.log(data, status);
              // status:0 是对号   status:1 是叉
              _this.$api.saveSignState({
                cgId:_this.$query.cgxxbId,
                cgscxmId:data.cgscxmId,
                state: status==0?1:0
              }, function (rs){
                console.log(rs);
              });
          })
          _tree.onShowDevent(function (data, readonly, html) { //点击绿色图标的回调 （第一个参数为点击的单条数据，第二个参数为组件读写状态）
              data.readonly = readonly;
              top.implementationDialog({
                  top: '100px',
                  width: '70%',
                  height: '70%',
                  path: '/result/examination/result_dialog',
                  params: data,
                  title: '系统辅助审查',
                  events: {},
                  onClose: function () {
                    // 2021-04-08 陈薪名 修改 检测后关闭窗口，变更图标
                    html[0].src = html[0].src.replace('u5555.svg','u3050.svg');
                }
              });
          })
      })
    }, 100);
    
    this.$el.find('#lookReview').unbind().bind('click',(e)=>{
      //POBrowser.openWindowModeless(wordFile.iperAddressId, 'width=1824px;height=950px;');
      var _dialog = implementationDialog({
          top: '45px',
          width: '80%',
          height: '90%',
          path: '/affixFileView',
          title: wordFile.fileName+'.pdf',
      });

      setTimeout(function () {
          _dialog.content.set(null, wordFile.fileName+'.pdf',wordFile.iperAddressId);
      }, 200);
    })
    this.$el.find('#inspection').unbind().bind('click',(e)=>{
      var _dialog = implementationDialog({
          top: '45px',
          width: '80%',
          height: '90%',
          path: '/affixFileView',
          title: wordFile.fileName+'.pdf',
      });

      setTimeout(function () {
          _dialog.content.set(null, wordFile.fileName+'.pdf',wordFile.reportsAddressId);
      }, 200);
      //POBrowser.openWindowModeless(wordFile.reportsAddressId, 'width=1824px;height=950px;');
    })
    this.$el.find('#split').unbind().bind('click',(e)=>{
        top.implementationDialog({
            top: '0',
            width: '100%',
            height: '100%',
            path: '/result/examination/split',
            params: {
                cgxxbId: this.$query.cgxxbId
            },
            title: '分屏对比',
            events: {}
        });
    })
    this.$el.find(".getbtn").unbind().bind('click', () => {
        var data = _tree.getList()
        var ajax = {
          cgId: this.$query.cgxxbId,
          list: data
        }
        this.$api.updateResultsRilist(ajax,res1=>{
          console.log(res1);
          this.$api.getAchievementInfo({
            'cgxxbId': this.$query.cgxxbId
          },res=>{
            console.log(res);
            wordFile.fileName=res.achievement.planningResultName
            wordFile.iperAddressId = res.achievement.iperAddressId
            this.$el.find('#lookReview').css('display','inline-block')
          })
        })
        // console.log(data);
    })

  var accessToken = icu.session.get('huizheng-token');
  var workId = icu.session.get('workId');
  var trackId = icu.session.get('trackId');
  // console.log(workId)
  // console.log(trackId)
  // console.log(accessToken)
  _this.$api.getButtonType({
      accessToken: accessToken,
      workid: workId,
      trackid: trackId,
  }, function (buttonType) {
    // console.log(buttonType.flowNode.nodeVars.flag);
      if (buttonType.flowNode !== null) {
        if (buttonType.flowNode.nodeVars !== null) {
          if (buttonType.flowNode.nodeVars.flag !== null) {
            if (buttonType.flowNode.nodeVars.flag) {
              // 显示生成审查报告按钮
              _this.$el.find(".getbtn").show();
            } else {
              // 不显示生成审查报告按钮
              _this.$el.find(".getbtn").hide();
            }
          }
        } else {
          // 不显示生成审查报告按钮
          _this.$el.find(".getbtn").hide();
        }
      }
  });

  // 判断查看审查报告按钮是否显示
  this.$api.getAchievementInfo({
    'cgxxbId': this.$query.cgxxbId
  },res=>{
    if (res.achievement.iperAddressId !== null) {
      wordFile.fileName=res.achievement.planningResultName
      wordFile.iperAddressId = res.achievement.iperAddressId
      _this.$el.find('#lookReview').css('display','inline-block')
    }
    // wordFile.fileName=res.achievement.planningResultName
    // wordFile.iperAddressId = res.achievement.iperAddressId
    // this.$el.find('#lookReview').css('display','inline-block')
  })



  },
  treeAction(treeObj) {
    treeObj.expandAll(true);
  },
  destroy: function () {},
};