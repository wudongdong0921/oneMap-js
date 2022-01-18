import TabLableView from '../../../../../../common/tabLable'
var session = icu.session;

export default {
    table: null,
    areaLeavel : 0,
    render() {
        this.fnRenderSwitchBtns();
        this.fnRenderTable();
    },
    fnRenderSwitchBtns() {
        let _this = this
        // 2021-05-07 陈薪名 修改bug 根据当前用户行政区划级别，展现不同效果 HNXGTKJ-1628
        // let areacode = session.get('userInfo').areacodeList[0];
        let areacodeListFromSession = session.get('userInfo').areacodeList;
        areacodeListFromSession = areacodeListFromSession.sort(function(a,b){
            return a - b;
        })
        let areacode = areacodeListFromSession[0];
        let itemArray = [];
        // 省级
        if (areacode.substr(areacode.length-4) == '0000') {
            itemArray = [{
                lable: '全部',
                value: 0
            }, {
                lable: '省级',
                value: 1
            }, {
                lable: '市级',
                value: 2
            }, {
                lable: '县级',
                value: 3
            }];
        } else if (areacode.substr(areacode.length-2) == '00') {
            // 市级
            itemArray = [{
                lable: '全部',
                value: 0
            }, {
                lable: '市级',
                value: 2
            }, {
                lable: '县级',
                value: 3
            }];
        } else {
            // 区县级
            itemArray = [{
                lable: '全部',
                value: 0
            },{
                lable: '县级',
                value: 3
            }];
        }
        var tabLableViews = new TabLableView({
            el: '',
            itemArray: itemArray,
            default: 0,
            onClick: function (data) {
                _this.areaLeavel = data.value;
                _this.table.refresh()
            }
        })
        this.$el.find('.switch_btns').append(tabLableViews.init())
    },
    fnRenderTable() {
        var _this = this;
        this.table = new icu.table({
            tableOptions: {
                height: this.$el.height() - 300,
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
                    key: 'areaName',
                    type: 'string',
                    name: '行政区划',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'adCode',
                    type: 'string',
                    name: '行政区划代码',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'planTyv',
                    type: 'string',
                    name: '规划目标值',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'monitoringValue',
                    type: 'string',
                    name: '监测值',
                    textAlign: 'center',
                    titleAlign: 'center',
                }, {
                    key: 'difference',
                    type: 'string',
                    name: '差值',
                    textAlign: 'center',
                    titleAlign: 'center',
                },{
                    key: 'unitCode',
                    type: 'string',
                    name: '单位',
                    textAlign: 'center',
                    titleAlign: 'center',
                },{
                    key: 'monitorSituation',
                    type: 'string',
                    name: '预警状态',
                    textAlign: 'center',
                    titleAlign: 'center',
                }
            ],
            whereButtons: [
                {
                    class: 'test',
                    name: '导出excel',
                    event: function () { 
                        _this.fnExportFile();
                    },
                    icon : 'add',
                }
            ],
            getEvent: function (data, setData) {
                _this.$api.warningDetailsInfo({
                    adcode: icu.session.get("userInfo").areacodeList,
                    zbxxxbId: _this.$data.zbxxxbId,
                    areaLeavel: _this.areaLeavel,
                    limit: data.limit,
                    page: data.page
                }, function (res) {
                    if (res.code == 200) {
                        setData({
                            count: res.count, // 表格总条数
                            data: res.data// 表格数据
                        });
                    }
                });
            },
        })
        this.$el.find('#list').append(_this.table.html);
        _this.table.init();
    },
    fnExportFile() {
        var _this = this;
        var url = config.InterfaceAddress.implementService + '/warningDetails/doExportToBeSupervisedTaskList?zbxxxbId=' + _this.$data.zbxxxbId + '&areaLeavel=' + _this.areaLeavel + '&adcode=' + icu.session.get("userInfo").areacodeList;
        var name = '预警详情' + new Date($.ajax({async:false}).getResponseHeader("Date")).getTime();
        var xhh = new XMLHttpRequest();
        var page_url = url;
        xhh.open("get", page_url);
        xhh.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhh.responseType = 'blob';
        xhh.onreadystatechange = function () {
            if (xhh.readyState === 4 && xhh.status === 200) {
                var filename = name + ".xlsx";
                var blob = new Blob([xhh.response], {
                    type: name + '/xlsx'
                });
                var csvUrl = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = csvUrl;
                link.download = filename;
                link.click();
            }
        };
        xhh.send()
    },
    destroyed() {

    },
}