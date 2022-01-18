////////////////////////////////////////////////
// 预警详情
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import renderView from '../../../commont/renderView'


export default {
  zblxId: '',
  table: null,
  render() {
    this.fnGetTreeData();
    var _this = this;
    this.table = new icu.table({
      tableOptions: {
        height: this.$el.height() - 160,
      },
      cols: [
        {
          width: '60px',
          key: 'index',
          type: 'index',
          name: '序号',
          textAlign: 'center',
          titleAlign: 'center',
        }, {
          key: 'code',
          type: 'string',
          name: '代码',
          textAlign: 'center',
          titleAlign: 'center',
        }, {
          key: 'indexName',
          type: 'string',
          name: '指标名称',
          textAlign: 'center',
          titleAlign: 'center',
        }, {
          key: 'zblxId',
          type: 'string',
          name: '指标类型',
          textAlign: 'center',
          titleAlign: 'center',
        }, {
          key: 'unitCode',
          type: 'string',
          name: '单位',
          textAlign: 'center',
          titleAlign: 'center',
        }, {
          key: 'indexNatureCode',
          type: 'string',
          name: '指标性质',
          textAlign: 'center',
          titleAlign: 'center',
        }, {
          width: '250px',
          key: 'cz',
          type: 'buttons',
          name: '操作',
          textAlign: 'center',
          titleAlign: 'center',
          buttons: [
            //查看按钮触发事件
            function (unit, row, data, events) {
              var handleBtn = $(`
                            <button class="layui-btn layui-btn-ys  layui-btn-sm" style="margin-right:10px">
                                查看
                            </button>
                        `);
              handleBtn.click((e) => {
                implementationDialog({
                  path: '/warning/alertDetails/detail-dialog',
                  width: '80%',
                  height : '80%',
                  title: '城市详情',
                  params: {
                    zbxxxbId : data.zbxxxbId
                  },
                  onClose: function () {
                    _this.table.refresh()
                  }
                })
              });
              return handleBtn;
            }
          ]
        },
      ],
      whereOptions: [
        {
          key: 'indexName',
          type: 'input',
          labelText: '指标名称:',
          onChange: function (e) {

          }
        }, {
          key: 'indexNatureCode',
          type: 'select',
          labelText: '指标性质:',
          showKey: 'dictLabel',
          setKey: 'dictValue',
          getKey: 'dictValue',
          data: "OptionSide:ZBXZ",
          onChange: function (e) {

          }
        }
      ],
      whereButtons: [
        {
          class: 'test',
          name: '查询',
          event: 'search',
        },
        {
          class: 'test',
          name: '重置',
          event: 'reset',
        }
      ],
      getEvent: function (data, setData) {
       
        _this.$api.itemsManageGetPage({
          indexName: data.indexName,
          indexNatureCode: data.indexNatureCode,
          zblxId: _this.zblxId,
          pageNum: data.page,
          pageSize: data.limit
        }, function (res) {
          if (res.code == 200) {
            setData({
              count: res.data.total, // 表格总条数
              data: res.data.list// 表格数据
            });
          }
        });

      },
    })
    //列表页row双击事件
    // _this.table.on('rowDblclick', function (data, table, row) {
    //   implementationDialog({
    //     path: '/warning/alertDetails/dialog',
    //     width: '95%',
    //     params: {

    //     },
    //     onClose: function () {
    //       _this.table.refresh()
    //     }
    //   })
    // });
    this.$el.find('#list').append(_this.table.html);
    _this.table.init();
  },
  /**
   * 获取左侧树数据
   */
  fnGetTreeData() {
    var _this = this;
    _this.$api.getIndicatorTypeTree({
      dictType: 'ZBLX'
    }, function (res) {
      if (res.code == 200) {
        _this.fnInitTree(_this.fnBuildTreeData(res));
      }
    });
  },
  /**
   * 构建左侧树数据
   * @param {*} res 
   */
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
  /**
   * 渲染左侧树组件
   * @param {*} treeData 
   */
  fnInitTree(treeData) {
    var _this = this;
    var wdt = renderView(_this.$el.find("#tree"), "/viewComponent/tree", {
    });
    wdt.onReady(() => {
      var treeObj = wdt.treeInit(treeData);
      treeObj.expandAll(true);
    });
    wdt.onChange(value => {
      if (!value.isParent) {
        _this.zblxId = value.type;
        _this.table.refresh();
      }
    })
  },
  destroyed() {

  },
}