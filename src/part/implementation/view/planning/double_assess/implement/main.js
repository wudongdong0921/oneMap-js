////////////////////////////////////////////////
// 规划实施评估页面
// 吴野
// 2020-12-12 12:45:14
////////////////////////////////////////////////
import SelectTree from '../../component/selectTree'
import SelectList from './page/selectItem';
import echartView from './page/echartView';
// import Map from './page/map'
export default {
   render: function () {
      var _this = this;
      _this.selectLists = new SelectList({
         contrastKey: [{ key: 'indexName', value: 'title' }]
      });
      this.selecTreeView = {}
      _this.$el.find('#selectLists').append(_this.selectLists.render())
      this.getTreeData((data) => {
         _this.selecTreeView = new SelectTree({
            zNodes: data,
            parame: { optionKey: 'implement_select_tree_option' },
            onClick: function (event, treeId, treeNode) {
               var treeType = treeNode.type;
               _this.$api.getIndicatorTypeList({
                  zblxId: treeType,
                  pageNum: 1,
                  pageSize: 1000
               }, function (resData) {
                  if (resData.code = '200') {
                     _this.$el.find('#selectLists').append(_this.selectLists.setData(resData.data.list))
                  }
               })
            }
         });
         _this.$el.find('#selectTree').html(_this.selecTreeView.render())
      })

      var echartViews = new echartView(this.$api, this.$el, {
         thisView: this
      });
      _this.$el.find('#mapView').html(echartViews.render());
      _this.selectLists.on('clickItem', (itemData) => {
         var echartViews = new echartView(this.$api, this.$el, {
            thisView: this,
            zbxxxbId: itemData.zbxxxbId,
            indexName:itemData.indexName
         });
         _this.$el.find('#mapView').html(echartViews.render());
         echartViews.on('changeBt', function (itemHmtl) {
         })
      })
   },

   getTreeData: function (cb) {
      var _this = this;
      this.$api.getIndicatorTypeTree({ dictType: 'ZBLX' }, function (res) {
         if (res.code = '200') {
            cb(_this.fnBuildTreeData(res))
         } else {
            return cb([]);
         }
      })
   },

   handelList: function (content, cb) {
      var _this = this;

   },

   fnBuildTreeData(res) {
      var _data = {};
      var treeData = [];
      for (let i = 0; i < res.data.length; i++) {
         const element = res.data[i];
         _data[element.id] = element;
      };
      for (let i = 0; i < res.data.length; i++) {
         const child = res.data[i];
         if (_data.hasOwnProperty(child.pid)) {
            const parent = _data[child.pid];
            if (!parent.hasOwnProperty('children')) parent['children'] = [];
            parent['children'].push(child);
         } else {
            treeData.push(child);
         }
      };
      return treeData;
   },

   destroy: function () {

   }
}
var nodeData = [
   { id: 1, pId: 0, name: "模糊搜索演示 1", t: "id=1", open: true },
   { id: 11, pId: 1, name: "[]\\^$.|?*+():关键字可以是js正则元字符", t: "id=11" },
   { id: 12, pId: 1, name: "{}<>'\"~`!@#%&-;:/,=:关键字可以是其他字符", t: "id=12" },
   { id: 2, pId: 0, name: "模糊搜索演示 2", t: "id=2", open: true },
   { id: 21, pId: 2, name: "大写ABDEFGHINQRT:关键字查找不区分大小写", t: "id=21" },
   { id: 22, pId: 2, name: "小写abdefghinqrt:关键字查找不区分大小写", t: "id=21" },
   { id: 3, pId: 0, name: "模糊搜索演示 3", t: "id=3", open: true },
   { id: 31, pId: 3, name: "空 格:关键字是空格", t: "id=31" }
]