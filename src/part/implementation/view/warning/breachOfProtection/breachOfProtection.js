////////////////////////////////////////////////
// 违反保护要求预警
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import ech from "../echarts/ech";
import map from "../echarts/map";
import districtLinkage from "../../../../../common/districtLinkage";
import renderView from '../../../commont/renderView'

export default {
  render: function () {
    let _this = this;
    var _linkage = new districtLinkage(this.$el.find(".area-tree"));
    var userData = icu.session.get("userInfo");
    console.log(userData);
    _linkage.setUserData(userData.areacodeList);
    _linkage.onChange((data) => {
      //行政区划change事件
      console.log(data);
      _this.$el.find('.area-tree').text(data.dictLabel);
    });
    // 渲染面板组件
    this.cardView()
    map({}, this.$el.find(".map")[0], 99999);
    ech({}, this.$el.find(".polyline")[0], "bar");


    this.table()

  },
  cardView(){
    let option = [
      {
        title: {
          text: '生态保护红线控制面积',
          icon: {
            src: './static/icon/danger.svg'
          }
        },
        active: true,
        content: [
          {
            title: '疑似违法地块',
            count: '2',
            unit: '个',
            src: './static/icon/caveat.svg',
            style: {
              color: 'red'
            }
          },
          {
            title: '疑似违法面积',
            count: '22.80',
            unit: '平方千米',
            src: './static/icon/caveat.svg',
            style: {
              color: 'red'
            }
          },
        ]
      },
    ]
    renderView(this.$el.find('.breach-left'),'/viewComponent/Card', option)
  },
  table(){
      var _table = new icu.table({
        tableOptions: {
            title: "已办审查",
            minWidth: 40,
            theme: 'evenColor',
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
                name: '数据来源',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'name',
                type: 'string',
                name: '项目所在地',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'submitExamineUser',
                type: 'string',
                name: '疑似违法面积',
                textAlign: 'center',
                titleAlign: 'center',
            }, 
            {
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
                                path: '',
                                width: '95%',
                                params: {
                                  
                                },
                                onClose: function () {
                                    _table.refresh()
                                }
                            })
                        });
                        return handleBtn;
                    },
                ]
            },
        ],
        // whereOptions: [
        //     {
        //         key: 'planningResultCode',
        //         type: 'input',
        //         labelText: '指标名称:',
        //         // data: planningResultCodeSelect,
        //         onChange: function (e) {

        //         }
        //     }, {
        //         key: 'flowstatus',
        //         type: 'select',
        //         labelText: '指标性质:',
        //         showKey: 'dictLabel',
        //         setKey: 'dictValue',
        //         getKey: 'dictValue',
        //         data: "OptionSide:LCZT",
        //         onChange: function (e) {

        //         }
        //     }
        // ],
        // whereButtons: [
        //     {
        //         class: 'test',
        //         name: '查询',
        //         event: 'search',
        //         // icon: 'software'
        //     },
        //     {
        //         class: 'test',
        //         name: '重置',
        //         event: 'reset',
        //         // icon: 'down'
        //     }
        // ],
        // rightButtons: [
        //     {
        //         class: 'Test',
        //         icon: 'software',
        //         name: '筛选',
        //         event: 'screen'
        //     }, {
        //         class: 'Test',
        //         icon: 'interactive',
        //         name: '导出',
        //         event: 'exportCSV'
        //     }, {
        //         class: 'Test',
        //         icon: 'listBook',
        //         name: '打印',
        //         event: 'print'
        //     }
        // ],
        getEvent: function (data, setData) {
              setData({
                count: 10, // 表格总条数
                data: {
                  name: 'zs',
                  code: 200
                }, // 表格数据
              });
        },
    })
    //列表页row双击事件
    _table.on('rowDblclick', function (data, table, row) {
        implementationDialog({
            path: '',
            width: '95%',
            params: {
              
            },
            onClose: function () {
                _table.refresh()
            }
        })
    });
    this.$el.find('.list').append(_table.html);
    _table.init();
  },
  destroyed: function () {},
};
