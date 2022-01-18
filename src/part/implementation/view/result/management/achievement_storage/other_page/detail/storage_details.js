////////////////////////////////////////////////
// 成果入库-详情
// 杨爽
// 2020-11-06 09:42:03
////////////////////////////////////////////////
import renderView from "../../../../../../commont/renderView";

export default {
  render: function () {
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
        //配置树形控件默认全部展开
        this.treeAction(treeObj);
      });
    })
    this.$api.getAchievementInfo({
      'cgxxbId': this.$query.cgxxbId
    },res=>{
      //引入表单模板
      var outcomeForm = renderView(this.$el.find('.input-view'),"/viewComponent/outcomeForm",res.achievement)
    })
    //监听树形控件节点点击时间，绑定视图模板
    wdt.onChange(value=>{
      if (value.pathUrl) {
        this.$el.find('.input-view').css('display','none')
        viewTemplate.set(value.id, value.name)
      } else {
        viewTemplate.hide();
        this.$el.find('.input-view').css('display','block')
      };
    })
    //配置审查要点组件
    this.$api.getReviewListTree({
      'cgxxbId': this.$query.cgxxbId
      //'cgxxbId':id
    },res =>{
      _tree.setdata(res.data);//赋值
        _tree.onUpdateStatus(function (data, status) { //点击对号或叉号时的回调（第一个参数为点击的单条数据，第二个参数为此条数据的status）
            console.log(data, status);
        })
        _tree.onShowDevent(function (data, readonly) { //点击绿色图标的回调 （第一个参数为点击的单条数据，第二个参数为组件读写状态）
            console.log(data, readonly);
            data.readonly = readonly;
            top.implementationDialog({
                top: '100px',
                width: '70%',
                height: '70%',
                path: '/result/examination/result_dialog',
                params: data,
                title: '系统辅助审查',
                events: {}
            });
        })
    })
    this.$el.find(".getbtn").unbind().bind('click', () => {
        var data = _tree.getList()
        this.$api.updateResultsRilist(data,res=>{
          console.log(res);
        })
        console.log(data);
        this.$el.find('#lookReview').css('display','inline-block')
    })
  },
  treeAction(treeObj) {
    treeObj.expandAll(true);
  },
  destroy: function () {},
};