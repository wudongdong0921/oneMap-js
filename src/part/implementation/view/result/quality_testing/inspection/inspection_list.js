////////////////////////////////////////////////
// 自然资源-成果质检
// 杨爽
// 2020-09-17 17:42:56
////////////////////////////////////////////////
import tableListShow from './other_page/detail/table_list'
var session = icu.session;
export default {
    renderData: function () {
        return {}
    },
    render: function () {
        // console.log(this);
        var _this = this;
        var searchData = {}
        this.renderData.$el = this.$el;
        var tableShow = new tableListShow(this.renderData, this.$api);
        this.renderData.table = tableShow._table;
        var area = session.get('userInfo').areacodeList;
        //var areaList = icu.session.get('userInfo').areacodeList
        //列表
        tableShow.onSetData((data, setData) => {           
            searchData = data
            _this.$api.getAchieventList({
                planningResultCode: data.planningResultCode, // 规划成果类型 (String) 
                qcState: data.qcState, // 质检状态（0暂存、1质检中、2通过、3未通过、4终止） (String) 
                reviewState: data.reviewState, // 审查状态（0未审查、1审查中、2审查通过、3审查驳回） (String)
                // adCode: areaList[areaList.length-1],// 行政区划代码 (String) 
                adCode:data.adCode!=null?data.adCode:area[area.length-1],
                createUser: data.createUser, // 创建人 (String) 
                modular: data.modular, // 是哪个模块进来的cgzj是成果质检cgbg是成果报告sccx是审查查询 (String) 
                page: data.page,
                limit: data.limit
            }, function (res) {
                // console.log(res);
                setData({
                    count: res.count,
                    data: res.data,
                });

            });
        });
        //办理
        tableShow.handelClickTab((unit, row, data, events) => {
            data.setIn = true
            var _dialog = implementationDialog({
                top: '45px',
                width: '70%',
                height: '81%',
                path: '/result/quality_testing/inspection/other_page/detail',
                params: data,
                title: '成果质检',
                events: {},
                onClose: function () {
                    tableShow._table.refresh();
                },
            });
            _dialog.body.css({
                'background': 'rgb(239,241,242)'
            });
        });
        //查看
        tableShow.viewHandelClickTab((unit, row, data, events) => {
            // console.log(row)
            var _dialog = implementationDialog({
                top: '45px',
                width: '70%',
                height: '81%',
                path: '/result/quality_testing/inspection/other_page/detail',
                params: data,
                title: '成果质检',
                events: {},
                onClose: function () {
                    // tableShow._table.refresh();
                    // _this.closeEvent()
                },
            });
            _dialog.body.css({
                'background': 'rgb(239,241,242)'
            });
        });
        //新增质检
        tableShow.handelClickXz((event) => {
            implementationDialog({
                top: '30px',
                width: '70%',
                height: '80%',
                path: '/result/quality_testing/inspection/other_page/add',
                params: {
                    username: session.get('userInfo').username
                },
                title: '新增质检',
                events: {},
                onClose: function () {
                    tableShow._table.refresh();
                },
            });
        });
        //终止
        tableShow.handelEndZz((event)=>{
            //console.log(event)
            var valuesTab = event.getCheckBoxValue();
            if (valuesTab) {
                if (valuesTab.length === 0) {
                    icu.alert.normal({
                        title: '未选择质检项',
                        text: '请选择一个质检项',
                    });
                    return;
                }
                if (valuesTab.length > 0) {
                    var _postArrayEnd = [];
                    for (let m = 0; m < valuesTab.length; m++) {
                        const element = valuesTab[m];
                        _postArrayEnd.push(element['cgxxbId']);
                    };
                    _this.$api.terminationAchievementInfos({
                        _postArrayEnd
                    }, function (res) {
                        event.whereObject.planningResultCode.set('')
                        event.whereObject.qcState.set('')

                        tableShow._table.refresh();
                        icu.alert.success({
                            title: '终止成功',
                        });
                    });
                    
                }
            }
           
        });
        //删除
        tableShow.handelDeleteSc((event)=>{


            var data = event.getCheckBoxValue();
            console.log(data)
            if (data) {
                if (data.length === 0) {
                    icu.alert.normal({
                        title: '未选择质检项',
                        text: '请选择一个质检项',
                    });
                    return;
                }
                if (data.length > 0) {
                    var _postArray = [];
                    var _beforeJy = [];
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        _beforeJy.push(element['cgxxbId']+'@'+element['adCode']);
                        _postArray.push(element['cgxxbId']);
                    };
                    icu.alert.delete({
                        title: '是否删除？',
                        callback: function (success, error) {
                            setTimeout(function () {
                                _this.$api.deleteAchievementInfosCheck({
                                    _beforeJy
                                }, function (res) {
                                    success();
                                    _this.$api.deleteAchievementInfos({
                                        _postArray
                                    }, function (res) {
                                        tableShow._table.refresh();
                                    });
                                }, function (err) {
                                    error('不可删除审查中的数据');
                                    return;
                                });
                            }, 1500);
                        }
                    });
                   
                }
            }

        });

    },
    destroy: function () {

    },
};