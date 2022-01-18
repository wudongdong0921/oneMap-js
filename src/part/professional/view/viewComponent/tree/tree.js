////////////////////////////////////////////////
// 树形控件
// 戴飞
// 2020-10-14 13:17:2
////////////////////////////////////////////////

/**
 * 引入树形控件在renderView方法里传参数初始化setting配置项无特殊要求可以不传,传入title则显示标题，不传或传空字符串不显示
 * 获取到树形控件后在onReady方法里调用树形控件的treeInit方法配置树形菜单
 * 设置变量接收treeInit返回的实例对象自行调用官方api
 * 在zNodes里面配置viewTemplate字段对应插入所需要的html内容
 * 在外界调用onChange回调函数，传入function作为参数接收event对象
 * 具体使用参考result/examination/wait_to_do/other_page/detail里面的wait_detail.js和wait_detail.html
 * */

export default {
  //数据初始化
  renderData() {
    return {
      ready: null,
      chnage: null,
    };
  },
  //初始化配置项
  onReady: function (e) {
    this.renderData.ready = e;
    this.renderData.ready();
  },
  //执行配置方法，添加外界传入的配置项
  render: function () {
    if (this.$data.title) {
      this.$el.find("#title").html(this.$data.title);
      this.$el.find("#title").addClass("tit-sty");
    }
  },
  //执行ztree初始化，渲染树结构
  treeInit: function (childrenList) {
    var _this = this,
      zTreeObj,
      zNodes = [],
      setting = {
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: 0
          }
        },
        callback: {
          onClick: function () {
            _this.ztreeClick.apply(_this, arguments);
          },
        },
      };
    for (let item in this.$data.setting) {
      setting[item] = this.$data.setting[item];
    }
    this.cloneChildrenIcon(zNodes, childrenList);
    console.log(setting);

    if(this.$data.el){
      let dom = `<div id=${this.$data.el} class="ztree"></div>`;
      this.$el.find('#tree').append(dom);
      zTreeObj = $.fn.zTree.init(this.$el.find(`#${this.$data.el}`), setting, zNodes);
      return zTreeObj;
    }
    zTreeObj = $.fn.zTree.init(this.$el.find("#treeList"), setting, zNodes);
    return zTreeObj;
  },
  //循环json数据渲染树结构
  cloneChildrenIcon: function (zNodes, childrenList) {
    if(!childrenList) return
    if(!childrenList.length) return zNodes.push(childrenList)
    var _data = {};
    var treeData = [];
    for (let i = 0; i < childrenList.length; i++) {
        const element = childrenList[i];
        _data[element.id] = element;
    };
    for (let i = 0; i < childrenList.length; i++) {
        const child = childrenList[i];
        if (_data.hasOwnProperty(child.pid)) {
            const parent = _data[child.pid];
            if (!parent.hasOwnProperty('children')) parent['children'] = [];
            parent['children'].push(child);
        } else {
            treeData.push(child);
        }
    };
    zNodes.push(...treeData)
  },
  //监听节点点击事件
  ztreeClick(e, treeId, treeNode) {
    typeof this.renderData.chnage === 'function' && this.renderData.chnage(treeNode);
  },
  //视图模板参数回调事件
  onChange(event) {
    this.renderData.chnage = event
  },
  destroy: function () {},
};
