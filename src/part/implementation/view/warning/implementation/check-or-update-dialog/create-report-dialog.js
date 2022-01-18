import session from '../../../../../../common/session';
export default {
    table: null,
    areaLeavel: 0,
    indexName: '',
    render() {
        this.fnRenderTable();
    },
    fnRenderTable() {
        var _this = this;
        this.table = new icu.table({
            tableOptions: {
                height: this.$el.height() - 300,
            },
            cols: [{
                width: '60px',
                key: 'index',
                type: 'index',
                name: '序号',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'indexName',
                type: 'string',
                name: '指标项名称',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'score',
                type: 'string',
                name: '分值',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'monitoringValue',
                type: 'string',
                name: '时点监测值',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'planTyv',
                type: 'string',
                name: '规划目标年值',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'planRyv',
                type: 'string',
                name: '规划近期年值',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'palnByv',
                type: 'string',
                name: '规划基期年值',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'unitCode',
                type: 'string',
                name: '单位',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'growthRate',
                type: 'string',
                name: '环比增长率',
                textAlign: 'center',
                titleAlign: 'center',
            }, {
                key: 'monitorSituation',
                type: 'string',
                name: '预警状态',
                textAlign: 'center',
                titleAlign: 'center',
            }
            ],
            whereOptions: [
                {
                    key: 'indexName',
                    type: 'input',
                    labelText: '指标名称:',
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
                var indexName = data.indexName == null ? '' : data.indexName;
                _this.indexName = indexName;
                _this.$api.indexEvaluationListPage({
                    adCode: _this.$data.adCode,
                    indexName: indexName,
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
        var dateContent = new Date($.ajax({async:false}).getResponseHeader("Date"));
        _this.$el.find('.title').html(dateContent.getFullYear()+'年'+_this.$data.adCodeName+'指标评估总览')
        this.$el.find('#confirm').click(() => {
            this.fnExportFile(() => {
                this.closeEvent();
            });
        });
        this.$el.find('#cancel').click(() => {
            this.closeEvent();
        });
    },
    fnExportFile(callback) {
        var _this = this;
        _this.$api.assessmentReportExcel({
            indexName : _this.indexName,
            adCode: _this.$data.adCode,
            userName: session.get('userInfo').realName
        }, function (res) {
            if (res.code == 0) {
                callback();
            }
        });
    },
    destroyed() {

    },
}
