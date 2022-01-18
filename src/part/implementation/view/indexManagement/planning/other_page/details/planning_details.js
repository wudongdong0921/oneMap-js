////////////////////////////////////////////////
// 指标管理-指标规划值-详情
// 杨爽
// 2020-11-09 13:50:59
////////////////////////////////////////////////


export default {
    render: function () {
        var _this = this;
        // console.log(_this.$data);
        var _formShow = icu.templateForm({
            labelwidth: 110,
        });
        _formShow.$setOptions([
            [{
                key: 'indexName',
                type: 'input',
                formlabel: '指标名称',
                col: 12,
                readonly: true,
                data: 'OptionSide:Gender',
            }, {
                key: 'zblxId',
                type: 'input',
                readonly: true,
                formlabel: '指标类型',
                col: 12,
            }], [{
                key: 'unitCode',
                type: 'input',
                readonly: true,
                formlabel: '单位',
                col: 12,
            }, {
                key: 'planByv',
                type: 'input',
                readonly: true,
                formlabel: '规划基期年值',
                col: 12,
            }], [{
                key: 'planRyv',
                type: 'input',
                readonly: true,
                formlabel: '规划近期年值',
                col: 12,
            }, {
                key: 'planTyv',
                type: 'input',
                readonly: true,
                formlabel: '规划目标年值',
                col: 12,
            }], [{
                key: 'reseaseIv',
                type: 'input',
                readonly: true,
                formlabel: '上级下达指标值',
                col: 12,
            }], [{
                key: 'yjgzId',
                type: 'input',
                readonly: true,
                formlabel: '预警规则',
                col: 6,
            }, {
                key: 'yjyzId',
                type: 'input',
                readonly: true,
                formlabel: '预警阈值',
                col: 6,
            }], [{
                key: 'pfffId',
                type: 'input',
                readonly: true,
                formlabel: '评分方法',
                col: 12,
            }], [{
                key: 'jsfsId',
                type: 'input',
                readonly: true,
                formlabel: '计算方法',
                col: 12,
            }]
        ]);
        _this.$api.zbghSelectIndexItemsInforByIdFront({
            zbghzId: _this.$data.zbghzId,                         // 指标规划值id
        }, function (res) {
            console.log(res);
           _formShow.set({
            indexName: res.data.indexName,	                    //	指标名称
            zblxId: res.data.zblxId,	                        //  指标类型
            unitCode: res.data.unitCode,                        //	单位
            planByv: res.data.planByv,                          //  规划基期年值
            planRyv: res.data.planRyv,                          //  规划近期年值
            planTyv: res.data.planTyv,                          //  规划目标年值
            reseaseIv: res.data.reseaseIv,                      //  上级下达指标值
            yjgzId: res.data.yjgzId,                            //  预警规则
            yjyzId: res.data.yjyzId,                            //  预警阈值
            pfffId: res.data.pfffId,                            //  评分方法
            jsfsId: res.data.jsfsId,                            //  计算方法
            });
        });
        
        // 渲染表单元素
        _this.$el.find('#inspectionAdd').append(_formShow.$html);
    
    },
    destroy: function () {

    },
};