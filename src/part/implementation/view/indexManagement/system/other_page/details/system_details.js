////////////////////////////////////////////////
// 指标管理-指标体系-详情
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
                key: 'code',
                type: 'input',
                readonly: true,
                formlabel: '代码',
                col: 12,
            }, {
                key: 'unitCode',
                type: 'input',
                readonly: true,
                formlabel: '单位',
                col: 12,
            }], [{
                key: 'indexNatureCode',
                type: 'input',
                readonly: true,
                formlabel: '指标性质',
                col: 12,
            }, {
                key: 'appliedRangeCode',
                type: 'input',
                readonly: true,
                formlabel: '应用范围',
                col: 12,
            }], [{
                key: 'detectionPeriodCode',
                type: 'input',
                readonly: true,
                formlabel: '监测周期',
                col: 12,
            }], [{
                key: 'warnRulesCode',
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
            }, {
                key: 'jsffId',
                type: 'input',
                readonly: true,
                formlabel: '计算方法',
                col: 12,
            }]
        ]);
        _this.$api.selectIndexItemsInforByIdFront({
            zbxxxbId: _this.$data.zbxxxbId,                         // 指标信息表id
        }, function (res) {
           _formShow.set({
            indexName: res.data.indexName,	                    //	指标名称
            zblxId: res.data.zblxId,	                        //  指标类型
            code:  res.data.code,      	                        //	代码
            unitCode: res.data.unitCode,                        //	单位
            indexNatureCode: res.data.indexNatureCode,	        //	指标性质
            appliedRangeCode:res.data.appliedRangeCode,	        //	应用范围
            detectionPeriodCode: res.data.detectionPeriodCode,  //	监测周期
            warnRulesCode:res.data.warnRulesCode,	            //	预警规则
            yjyzId:res.data.yjyzId,	                            //	预警阈值
            pfffId: res.data.pfffId,                            //	评分方法
            jsffId: res.data.jsffId,	                        //	计算方法
          
            });
        });
        
        // 渲染表单元素
        _this.$el.find('#inspectionAdd').append(_formShow.$html);
    
    },
    destroy: function () {

    },
};