////////////////////////////////////////////////
// 评价详情
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////

import renderView from '../../../commont/renderView'
import CustomTableHeader from '../../../../../common/customTable'
import customForm from '../../../../../common/customForm_districtLinkage'

export default {
    pffaId: '',
    xzqhId: '',
    year: '',
    render() {
        var _this = this;
        this.pffaId = this.$data.pffaId;
        this.xzqhId = this.$data.xzqhId;
        this.year = this.$data.year;
        this.title = '';

        layui.use('table', function () {
            var myDate = new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear()
            var _form = icu.form({
                type: 'mergeByOldData',
            });
            var leftFrom = icu.form({
                type: 'mergeByOldData',
            })
            var XZHTML = $(``);
            _this.$el.find('#tree').append(XZHTML)
            // 左侧头部行政区划选择
            leftFrom.$setOptions([
                {
                    key: 'planningResultCode', // 表单Key值
                    object: customForm,
                    getKey: 'dictValue',
                    el: _this.$el.find('#planningResultCode'), // 表单元素输出位置
                    onChange: function (value) {
                        // 2021-05-07 陈薪名 修改bug HNXGTKJ-1267
                        // 单击详情跳转过来的数据
                        if (_this.xzqhId !== undefined && _this.zbghId !== {}) {
                            _this.xzqhId = value.dictValue;
                            _this.year = new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear()
                            _this.fnGetTreeData();
                        } else {
                            // 菜单进来的数据
                            var maxCode = ''
                            for (let i = 0; i < icu.session.get("userInfo").areacodeList.length; i++) {
                                maxCode = maxCode < icu.session.get("userInfo").areacodeList[i + 1] ? icu.session.get("userInfo").areacodeList[i + 1] : maxCode
                            }
                            _this.newxzqhId = maxCode;
                            _this.xzqhId = value.dictValue;
                            _this.year = new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear()
                            _this.fnGetTreeData();
                            _this.customTableRender({
                                'xzqhId': _this.xzqhId,
                                'oxzqhId': _this.xzqhId,
                                'scoreYear': _this.year,
                                'pffaId': _this.pffaId
                            })
                        }
                    },
                }
            ]);

            // _this.$el.find('#tree').append(leftFrom.$html);
            // 添加表单元素方法
            _form.$setOptions([
                {
                    key: 'flowstatus', // 表单Key值
                    type: 'inputDate', // 表单类型 下拉菜单
                    el: _this.$el.find('#flowstatus'), // 表单元素输出位置
                    layDataOption: {
                        type: 'year',
                        theme: '#1d468a'
                    },
                    data: 'OptionSide:LCZT', // 下拉菜单获取字典项
                    showKey: 'dictLabel',
                    setKey: 'dictValue',
                    getKey: 'dictValue',
                    default: myDate
                },
            ]);

            // _this.$el.find('#form').append(_form.$html);
            // 2021-05-07 陈薪名 修改bug HNXGTKJ-1267
            // 单击详情跳转过来的数据
            if (_this.xzqhId !== undefined) {
                $('#flowstatus').find('input').val(_this.year);
                leftFrom.planningResultCode.showValue([_this.xzqhId]);
                _this.fnGetTreeData();
                _this.customTableRender({
                    'xzqhId': _this.xzqhId,
                    'oxzqhId': _this.xzqhId,
                    'scoreYear': _this.year,
                    'pffaId': _this.pffaId ? _this.pffaId : ''
                })
            }

            // 取值方法
            _this.$el.find('#search').click(() => {
                _form.$get(function (value) {
                    leftFrom.$get(function(value1){
                        _this.xzqhId = value1.planningResultCode
                        if (value.flowstatus) {
                            _this.year = value.flowstatus
                        } else {
                            // 2021-05-07 陈薪名 修改bug HNXGTKJ-1374
                            _this.year = _this.$data.year == undefined ? myDate.getFullYear() : _this.$data.year;
                        }
                        _this.customTableRender({
                            'xzqhId': _this.xzqhId,
                            'oxzqhId': _this.xzqhId,
                            'scoreYear': _this.year,
                            'pffaId': _this.pffaId ? _this.pffaId : '',
                        })
                        if(!_this.pffaId){
                            top.layer.alert('请选择指标！')
                        }
                    })
                });
            });
            // 赋值方法
            _this.$el.find('#reset').click(() => {
                _this.goto('/bearer/home', {})
                _this.goto('/bearer/detail')
                // return
                // var ucode = icu.session.get("userInfo").areacodeList
                // _form.$set({
                //     planningResultCode: ucode,
                //     flowstatus: myDate.getFullYear()
                // });

                // _this.customTableRender({
                //     'xzqhId': _this.xzqhId,
                //     'oxzqhId': _this.xzqhId,
                //     'scoreYear': _this.year,
                //     'pffaId': _this.pffaId ? _this.pffaId : '',
                // })
            });
        });
    },

    fnGetTreeData() {
        var _this = this;
        _this.$api.getTreeData({
            xzqhId: _this.xzqhId
        }, function (res) {
            _this.$el.find("#tree").empty();
            var wdt = renderView(_this.$el.find("#tree"), "/viewComponent/tree", {
            });
            wdt.onReady(() => {
                //配置树形控件默认全部展开
                var newTreeData = []
                for (let i = 0; i < res.data.data.dataList.length; i++) {
                    const item = res.data.data.dataList[i];
                    var arayObj = {
                        children: []
                    };
                    arayObj['name'] = item.dictLabel;
                    arayObj['dictTypeId'] = item.dictTypeId;
                    arayObj['dictValue'] = item.dictValue;
                    arayObj['parentId'] = item.pid;
                    arayObj['id'] = item.id;
                    for (let j = 0; j < item.reScoringSisList.length; j++) {
                        const element = item.reScoringSisList[j];
                        element['parentId'] = item.id;
                        element['name'] = element.ratingName;
                        arayObj.children.push(element);
                    }
                    newTreeData.push(arayObj)
                }
                var treeObj = wdt.treeInit(newTreeData);
                _this.treeAction(treeObj);
            });
            wdt.onChange(value => {

                _this.pffaId = value.pffaId
                _this.title = value.name;
                _this.customTableRender({
                    'xzqhId': _this.xzqhId,
                    'oxzqhId': _this.xzqhId,
                    'scoreYear': _this.year,
                    'pffaId': _this.pffaId,
                }, _this.title)
            })
        })
    },

    customTableRender: function (concent, title) {
        if (this.pffaId == undefined) {
            return;
        }
        var _this = this;
        this.$api.getCardList(concent, function (res) {
            if (res.data.length !== 0) {
                if (res.data.stateList && res.data.stateList.length > 0) {
                    if (title == undefined) {
                        title = res.data.stateList[0].ratingName;
                    }
                    var stateList = res.data.stateList[0];
                    stateList.indice = res.data.displayList;
                    _this.customTable = new CustomTableHeader({
                        view: _this.$el,
                        elem: '#table',
                        title: title,
                        toolbar: '<div>' + title + '</div>',
                        defaultToolbar: ['exports'],
                        table: layui.table
                    })
                    _this.customTable.init(res.data.stateList);
                } else {
                    // 2021-05-07 陈薪名 修改bug HNXGTKJ-1441 无数据情况下，模拟任意表头，标识上无数据
                    if (title == undefined) {
                        title = _this.title;
                    }
                    var myStateList = []; // 模拟表头 
                    myStateList.push({
                        indice: [{
                            indexName: "每万元GDP地耗",
                            monitorSituation: "3",
                            monitoringValue: "",
                            pffaId: "623d6f3a535546c89e23dda79ad5cf2a",
                            pffaState: null,
                            ratingName: "公路与铁路网密度方案",
                            unitName: "平方米",
                            xzqhId: null,
                            year: null,
                            zbghId: null,
                            zbxId: "zbxxxb_ad62424f560041478e01e6917cfd49c5"
                        },],
                        pffaId: "623d6f3a535546c89e23dda79ad5cf2a",
                        pffaState: "",
                        ratingName: "公路与铁路网密度方案",
                        xzqhId: "",
                        zhuangtai: "3"
                    });
                    _this.customTable = new CustomTableHeader({
                        view: _this.$el,
                        elem: '#table',
                        title: title,
                        toolbar: '<div>' + title + '</div>',
                        defaultToolbar: ['exports'],
                        table: layui.table
                    })
                    _this.customTable.init(myStateList);
                    $("[lay-id='table'] tbody tr[data-index='0']").empty();
                    $("[lay-id='table']").append('<div style="text-align: center;"><font style="text-align:center;color:#cac3c3;">暂无数据</font></div>')
                }
            } else {
                // 2021-05-07 陈薪名 修改bug HNXGTKJ-1441 无数据情况下，模拟任意表头，标识上无数据
                if (title == undefined) {
                    title = _this.title;
                }
                var myStateList = []; // 模拟表头 
                myStateList.push({
                    indice: [{
                        indexName: "每万元GDP地耗",
                        monitorSituation: "3",
                        monitoringValue: "",
                        pffaId: "623d6f3a535546c89e23dda79ad5cf2a",
                        pffaState: null,
                        ratingName: "公路与铁路网密度方案",
                        unitName: "平方米",
                        xzqhId: null,
                        year: null,
                        zbghId: null,
                        zbxId: "zbxxxb_ad62424f560041478e01e6917cfd49c5"
                    },],
                    pffaId: "623d6f3a535546c89e23dda79ad5cf2a",
                    pffaState: "",
                    ratingName: "公路与铁路网密度方案",
                    xzqhId: "",
                    zhuangtai: "3"
                });
                _this.customTable = new CustomTableHeader({
                    view: _this.$el,
                    elem: '#table',
                    title: title,
                    toolbar: '<div>' + title + '</div>',
                    defaultToolbar: ['exports'],
                    table: layui.table
                })
                _this.customTable.init(myStateList);
                $("[lay-id='table'] tbody tr[data-index='0']").empty();
                $("[lay-id='table']").append('<div style="text-align: center;"><font style="text-align:center;color:#cac3c3;">暂无数据</font></div>')
            }
        })
    },
    treeAction(treeObj) {
        treeObj.expandAll(true);
    },
    destroyed() {

    },
}