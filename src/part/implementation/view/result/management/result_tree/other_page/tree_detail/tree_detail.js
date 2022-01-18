////////////////////////////////////////////////
// 审查详情页
// 戴飞
// 2020-10-14 13:17:2
////////////////////////////////////////////////
import renderView from "../../.../../../../../../commont/renderView";

export default {
  render: function () {
    var wordFile = {}
    //引入视图模板组件
    var viewTemplate = renderView(this.$el.find('.file-view'), "/affixFileView");
    viewTemplate.$el.css({
      width : '100%',
      height : '100%'
    });
    //引入审查要点组件
    var _tree = renderView(this.$el.find(".treeModal"), "/viewComponent/treeModal/treeModal",{
      options: {
        readonly: true,//true时为只读
        icon: false
      }
    });
    //引入树形控件组件
    var wdt = renderView(this.$el.find(".toWaitDetail-left"), "/viewComponent/tree", {
      title: '成果审查',
      setting: {
        data:{
          simpleData: {
            enable: true
          },
          key: {
            name: "accessoryName"
          }
        }
      }
    });
    //初始化树形控件
    wdt.onReady(() => {
      var treeObj = wdt.treeInit(this.$data.list);
      //配置树形控件默认全部展开
      this.treeAction(treeObj);
    });

    this.$api.getPlanResultType("",res => {
      // console.log(res);
      icu.optionSide.set(res.data, 'PlanResultType'); 
      this.$api.getAchievementInfo({
        'cgxxbId': this.$data.cgid
      },res=>{
        console.log(res);
        wordFile.fileName=res.achievement.planningResultName
        // wordFile.reportsAddressId = config.InterfaceAddress.implementService + res.achievement.reportsAddressId
        // wordFile.iperAddressId = config.InterfaceAddress.implementService  + res.achievement.iperAddressId
        wordFile.reportsAddressId = res.achievement.reportsAddressId
        wordFile.iperAddressId = res.achievement.iperAddressId
        //引入表单模板
        var outcomeForm = renderView(this.$el.find('.input-view'),"/viewComponent/outcomeForm",res.achievement)
      })
      
  })

    this.$api.getAchievementInfo({
      'cgxxbId': this.$data.cgid
    },res=>{
      console.log(res);
      //引入表单模板
      var outcomeForm = renderView(this.$el.find('.input-view'),"/viewComponent/outcomeForm",res.achievement)
    })
    //监听树形控件节点点击事件，绑定视图模板
    wdt.onChange(value=>{
      if (value.filePath) {
        this.$el.find('.input-view').css('display','none')
        viewTemplate.set(value.cgfjxxbId, value.accessoryName)
      } else {
        viewTemplate.hide();
        this.$el.find('.input-view').css('display','block')
      };
    })
    //配置审查要点组件
    setTimeout(() => {
      this.$api.getReviewListTree({
        'cgxxbId': this.$data.cgid
      },res =>{
        _tree.setdata(res.data);//赋值
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
                cgxxbId: this.$data.cgid
            },
            title: '分屏对比',
            events: {}
        });
    })

    // 判断查看审查报告按钮是否显示
    this.$api.getAchievementInfo({
      'cgxxbId': this.$data.cgid
    },res=>{
      if (res.achievement.iperAddressId !== null) {
        wordFile.fileName=res.achievement.planningResultName
        wordFile.iperAddressId = res.achievement.iperAddressId
        this.$el.find('#lookReview').css('display','inline-block')
      }
    })

  },
  treeAction(treeObj) {
    treeObj.expandAll(true);
  },
  destroy: function () {},
};