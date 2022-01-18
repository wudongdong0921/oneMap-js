////////////////////////////////////////////////
// 分屏对比
// 戴飞
////////////////////////////////////////////////
import renderView from "../../../../../commont/renderView";

export default {
  render: function () {
    let left = this.views(this.$el.find("#split-tree-left"),this.$el.find('#view-left'),this.$el.find('#left-switch'),this.$el.find('#file-view-left'),'treeList1')
    let right = this.views(this.$el.find("#split-tree-right"),this.$el.find('#view-right'),this.$el.find('#right-switch'),this.$el.find('#file-view-right'),'treeList2')
  },
  views(tree,view,swit,file,el){
    var flag = false
    var wdt = renderView(tree, "/viewComponent/tree", {
      title: '成果审查',
      el
    });
    var viewTemplate = renderView(file, "/affixFileView");
    viewTemplate.$el.css({
      width : '100%',
      height : '100%'
    });
    this.$api.outputFileTree({
      'cgxxbId': this.$data.cgxxbId
    },res=>{
      //初始化树形控件
      wdt.onReady(() => {
        var treeObj = wdt.treeInit(res.data);
        //配置树形控件默认全部展开
        this.treeAction(treeObj);
      });
    })

    this.$api.getAchievementInfo({
      'cgxxbId': this.$data.cgxxbId
    },res=>{
      //引入表单模板
      var outcomeForm = renderView(view,"/viewComponent/outcomeForm",res.achievement)
    })

    wdt.onChange(value=>{
      if (value.pathUrl) {
        view.css('display','none')
        viewTemplate.set(value.id, value.name)
      } else {
        viewTemplate.hide();
        view.css('display','block')
      };
    })


    swit.click(()=>{
      if(!flag){
        flag = !flag
        tree.css({
          transform: 'translateX(0)'
        })
        swit.css({
          left: '61%'
        })
      }else {
        flag = !flag
        tree.css({
          transform: 'translateX(-100%)'
        })
        swit.css({
          left: '1%'
        })
      }
    })
  },
  treeAction(treeObj) {
    treeObj.expandAll(true);
  },
  destroy: function () {},
};