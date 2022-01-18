////////////////////////////////////////////////
// 查看编制进度弹出框
// 李雪
// 2020-10-26 18:41:27
////////////////////////////////////////////////
export default {
    render: function () {
        console.log(this.$data)
        let html = $(`
            <div class>
                <div class="layui-row layui-col-space10">
                    <div class="layui-col-md7">
                        <h2 class="title1">成果编制进度</h2>
                        <div class="#formdataBox" style="padding: 20px;">                           
                            <div class="layui-row">
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">
                                        <sup>*</sup>规划成果类型:</label>                                       
                                        <div class="layui-input-block" id="ghcglxId"></div>
                                    </div>
                                </div>
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">
                                        <sup>*</sup>行政区名称:</label>
                                        <div class="layui-input-block" id="districtName"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-row">
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">
                                        <sup>*</sup>工作进展:</label>
                                        <div class="layui-input-block" id="workProgressCode"></div>
                                    </div>
                                </div>
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">
                                        <sup>*</sup>行政区代码:</label>
                                        <div class="layui-input-block" id="districtCode"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-row">
                                <div class="layui-col-md12">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">进展情况:</label>
                                        <div class="layui-input-block" id="progressCase"></div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="layui-row">
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label" style="margin-top:5px;">创建人:</label>
                                        <div class="layui-input-block" id="reportingUser"></div>
                                    </div>
                                </div>
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label" style="margin-top:5px;">创建时间:</label>
                                        <div class="layui-input-block" id="reportingTime"></div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div class="layui-col-md5 rightBlock">
                        <div class="layui-row layui-col-space15">
                            <div class="layui-col-md3">
                                <div class="imgbox green" id="gzjz1">
                                    <img src="./static/img/result/u83.svg" />
                                </div>                                
                                制定工作方案
                            </div>
                            <div class="layui-col-md3">
                                <div class="imgbox green" id="gzjz2">
                                    <img src="./static/img/result/u84.svg" />
                                </div>  
                                建立专家咨询机制  
                            </div>
                            <div class="layui-col-md3">
                                <div class="imgbox green" id="gzjz3">
                                    <img src="./static/img/result/u85.svg" />
                                </div>  
                                开展专题研究 
                            </div>
                            <div class="layui-col-md3">
                                <div class="imgbox green" id="gzjz4">
                                    <img src="./static/img/result/u86.svg">
                                </div>  
                                完成初步方案 
                            </div>
                        </div>
                        <div class="layui-row layui-col-space15">
                            <div class="layui-col-md3">
                                <div class="imgbox green" id="gzjz5">
                                    <img src="./static/img/result/u87.svg">
                                </div>  
                                成果汇总
                            </div>
                            <div class="layui-col-md3">
                                <div class="imgbox green" id="gzjz6">
                                    <img src="./static/img/result/u89.svg">
                                </div>  
                                成果报批
                            </div>
                            
                        </div>
                        <div class="tableblock" style=" margin-top: 30px;"></div>
                    </div>
                </div>   
            </div>
        `)

        this.$el.find('#scheduleM_dailog').append(html);
        icu.optionSide.set([
            {label : "成果汇总",value : "CGHZ"},
            {label : "成果报批",value : "CGBP"},
            {label : "制定方案",value : "ZDFA"},
            {label : "建立专家咨询机制",value : "JLZJZXJZ"},
            {label : "展开专题研究",value : "ZKZTYJ"},
            {label : "完成初步方案",value : "WCCBFA"},
        ], 'workProgress');
        var _this = this;
        var changeTopRightPartCircleBgColor = function (index) {
            
            _this.$el.find('#gzjz'+(index+1)).css({'background-color':'#17b4a3',});
        };
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
                key: 'ghcglxId',
                type: 'select',
                el: this.$el.find('#ghcglxId'),
                data: 'OptionSide:PlanResultType',
                readonly: true,
                
            },{
                key: 'districtName',
                type: 'input',
                el: this.$el.find('#districtName'),
                readonly: true,
                
            },{
                key: 'workProgressCode',
                type: 'select',
                el: this.$el.find('#workProgressCode'),
                data: 'OptionSide:workProgress',
                readonly: true,
                
            },{
                key: 'districtCode',
                type: 'input',
                el: this.$el.find('#districtCode'),
                readonly: true,
            },
            {
                key: 'progressCase',
                type: 'textarea',
                el: this.$el.find('#progressCase'),
                readonly: true,
            },{
                key: 'reportingUser',
                type: 'input',
                el: this.$el.find('#reportingUser'),
                readonly: true,
            },{
                key: 'reportingTime',
                type: 'inputDate',
                el: this.$el.find('#reportingTime'),
                readonly: true,
            }
            
        ]);
        

        var _table = new icu.datagrid();
        setTimeout(() => {
            this.$el.find('.tableblock').append(_table.html)
            _table.setCols([
                {
                    width: '150px',
                    type: 'OptionSide:workProgress',
                    key: 'workProgress',
                    name: '工作进展',
                    // textAlign: 'center',
                    // titleAlign: 'center',
                }, {
                    width: '180px',
                    key: 'reportingTime',
                    type: 'string',
                    name: '填报时间',
                    // textAlign: 'center',
                    // titleAlign: 'center',
                },
                {
                    width: '250px',
                    key: 'progressCase',
                    type: 'string',
                    name: '进展情况',
                },
            ]);
            this.$api.getScheduleDetail({
                jdtbxxbId:this.$data.jdtbxxbId
            },res=>{
                console.log(res)
                if(res.data.rramsScheduleReporting){
                    _form.$set(res.data.rramsScheduleReporting)
                }
                for (let m = 0; m < res.data.rramsSrCenterList.length; m++) {
                    changeTopRightPartCircleBgColor(m);
                }
                if(res.data.rramsSrCenterList){
                    _table.set(res.data.rramsSrCenterList)
                }
            })
            // _table.set([
            //     { progressCase: 'xxxxxxxx规划成果',name:'制定工作方案',reportingTime:"2020-09-12 12:30:32" },
            //     { progressCase: 'xxxxxxxx规划成果',name:'建立专家咨询机制',reportingTime:"2020-09-12 12:30:32" },
            //     { progressCase: 'xxxxxxxx规划成果',name:'开展专题研究',reportingTime:"2020-09-12 12:30:32" },
            //     { progressCase: 'xxxxxxxx规划成果',name:'完成初步方案',reportingTime:"2020-09-12 12:30:32" },
            //     { progressCase: 'xxxxxxxx规划成果',name:'成果汇总',reportingTime:"2020-09-12 12:30:32" },
            //     { progressCase: 'xxxxxxxx规划成果',name:'审查报批',reportingTime:"2020-09-12 12:30:32" },
            // ]);
        }, 30)

    },
    destroy: function () { }
}