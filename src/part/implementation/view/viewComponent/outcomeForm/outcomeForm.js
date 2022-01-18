export default {
    renderData: function () {
        return {
            formdata:{
                packName: '测试',
                resultName:"",
                resultType: '1',
                administrative:'0',
                striadministrativeCodeng:'',
                year: '2020-09-07',
                startYear: '2020-09-07',
                targetYear: '2020-09-07',
                organization:'',
                range:'',
                area:"",
                population:"",
                versions:"",
                reply:"",
                replyTime:""
            }
        }
    },
    render: function (){
        let html=$(
            `
                <div>
                    <h3 style="line-height: 70px;text-align: center;">成果基本信息</h3>
                    <div class="#formdataBox">
                        <div class="layui-row">
                            <div class="layui-col-md12">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup> </sup>规划成果包:</label>
                                    <div class="layui-input-block" id="packName"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>规划成果名称:</label>
                                    <!-- id="apiNumber"  -->
                                    <!-- 为放置表单元素的标签添加唯一标识以便在js中查找  -->
                                    <div class="layui-input-block" id="resultName"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>规划成果类型:</label>
                                    <div class="layui-input-block" id="resultType"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>行政区划:</label>
                                    <div class="layui-input-block" id="administrative"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>行政区代码:</label>
                                    <div class="layui-input-block" id="administrativeCode"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>现状基本年:</label>
                                    <div class="layui-input-block" id="year"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>规划起始年:</label>
                                    <div class="layui-input-block" id="startYear"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">
                                    <sup>*</sup>规划目标年:</label>
                                    <div class="layui-input-block" id="targetYear"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">编制单位:</label>
                                    <div class="layui-input-block" id="organization"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">规划范围:</label>
                                    <div class="layui-input-block" id="range"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">规划面积:</label>
                                    <div class="layui-input-block" id="area"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">规划人口:</label>
                                    <div class="layui-input-block" id="population"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">成果版本:</label>
                                    <div class="layui-input-block" id="versions"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-row">
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">批复单位:</label>
                                    <div class="layui-input-block" id="reply"></div>
                                </div>
                            </div>
                            <div class="layui-col-md6">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">批复时间:</label>
                                    <div class="layui-input-block" id="replyTime"></div>
                                </div>
                            </div>
                        </div>
                    <div>
                </div>
            `
        )
        this.$el.find("#outcomeForm").append(html)
        var _form = icu.form({
            type: 'mergeByOldData',
            onError: function (errorMessage, event, key) {
                console.log(errorMessage, event, key);
            },
            onScrollError: function (errorMessage, event, key) {
                // 此段代码用于定位表单错误信息位置
                // $('#content') 在实际业务逻辑中，需要替换为滚动条所在元素对象
                var scrollTop = $('#formdataBox').scrollTop() + event.html.offset().top - 100;
                $('#formdataBox').animate({ scrollTop: scrollTop }, 300);
                icu.alert.error({
                    text: errorMessage
                });
            },
        });
        
        _form.$setOptions([
            {
                key: 'uploadFilesName',
                type: 'input',
                el: this.$el.find('#packName'),
                readonly: true,
                
            },{
                key: 'planningResultName',
                type: 'input',
                el: this.$el.find('#resultName'),
                readonly: true,
                
            }, {
                key: 'planningResultCode',
                type: 'select',
                showKey: 'label',
                showUnSelect: false,
                setKey: 'value',
                getKey: 'object',
                el: this.$el.find('#resultType'),
                data: 'OptionSide:PlanResultType',
                readonly: true,
                
            },{
                key: 'administrativeDivision',
                type: 'input',
                el: this.$el.find('#administrative'),
                readonly: true,
                
            },{
                key: 'adCode',
                type: 'input',
                el: this.$el.find('#administrativeCode'),
                readonly: true,
            },
            {
                key: 'currentBaseYear',
                type: 'input',
                el: this.$el.find('#year'),
                readonly: true,
            },{
                key: 'planStartYear',
                type: 'input',
                el: this.$el.find('#startYear'),
                readonly: true,
            },{
                key: 'planTargetYear',
                type: 'input',
                el: this.$el.find('#targetYear'),
                readonly: true,
            },{
                key: 'organizationUnit',
                type: 'input',
                el: this.$el.find('#organization'),
                readonly: true,
            },{
                key: 'specificationRange',
                type: 'input',
                el: this.$el.find('#range'),
                readonly: true,
            },{
                key: 'specificationArea',
                type: 'input',
                el: this.$el.find('#area'),
                readonly: true,
            },{
                key: 'planPopulation',
                type: 'input',
                el: this.$el.find('#population'),
                readonly: true,
            },{
                key: 'resultsVersion',
                type: 'input',
                el: this.$el.find('#versions'),
                readonly: true,
            },
            {
                key: 'approvalUnit',
                type: 'input',
                el: this.$el.find('#reply'),
                readonly: true,
            },
            {
                key: 'approvalTime',
                type: 'input',
                el: this.$el.find('#replyTime'),
                readonly: true,
            }
        ]);
        
        
        var data = $.extend({},this.renderData.formdata,this.$data)
        _form.$set(data);
        // 2021-04-07 陈薪名 修改 慧正成果审查 成果审查与管理审批表 字段自动回填
        parent.window.postMessage('postMessage$$$@@@gtkjghspb' + JSON.stringify(data) + '|' +_form.planningResultCode.value.label, '*');
    },

    destroy: function () {}
}