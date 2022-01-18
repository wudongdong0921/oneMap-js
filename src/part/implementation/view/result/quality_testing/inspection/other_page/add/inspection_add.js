
////////////////////////////////////////////////
// 新增质检API
// 杨爽
// 2020-10-16 19:49:35
////////////////////////////////////////////////

var session = icu.session;
export default {
    render: function () {
        var _this = this;
        var self = this
        var searchData = {};
        var process = "";
        var nextFlag = false;
        var getPlanResultTypeList;
        console.log(_this.$data);
        var _form = icu.templateForm({
            labelwidth: 110,
        });
        var _formShow = icu.templateForm({
            labelwidth: 110,
        });
        this.$api.getPlanResultType({}, function (res) {
            getPlanResultTypeList = res.data
        });
        var customFile = function (options) {
            var url = options.url || (config.InterfaceAddress.commonServiceSF + '/wintopachieve/upload/file-upload')

            var _this = this;
            var html = '';
            html += '<form action="' + url + '" method="POST"  enctype="multipart/form-data">'
            html += '    <input type="file" name="file" id="fileId" accept=".zip"/>'
            html += '    <input type="text" class="planningResultName" name="planningResultName" value="" style="display:none">'
            html += '    <input type="text" class="planningResultCode" name="planningResultCode" value="" style="display:none">'
            html += '    <input type="text" class="username" name="username" value="" style="display:none">'
            html += '    <br/>'
            // html += '    <input type="submit" class="uploadingButton" value="提交" style="display:none"/>'
            html += '    <br /><div class="container"><span class="progress"></span></div><span id="bfb"></span>';
            html += '</form>';
            this.html = $(html);
            this.event = {
                success: function () { },
                error: function () { },
            }
            this.html.ajaxForm({
                uploadProgress: function (event, position, total, percentComplete) {//上传的过程
                    var percentVal = percentComplete + '%';
                    process = percentComplete;
                    if(percentComplete<100){
                        _this.html.find("#bfb").html(percentVal);
                        $("input[id='fileId']").prop('disabled',true)
                        $("#upBtn").attr("disabled",true).css({"background":"#eff1f2","color":"#999"});
                    }else{
                        _this.html.find("#bfb").html("正在压缩中...");
                    }
                    
                    // 
                    // _this.html.find("#bfb").html(percentVal);
                    // console.log(percentVal);
                    _this.html.find('.progress').css({
                        'width': percentVal
                    });
                },
                success: function (data) {//成功
                    console.log(data);
                    for(let item of getPlanResultTypeList){
                        if(item.label.indexOf(data.data.resultsType) !== -1) {
                            _form.planningResultCode.set(data.data.resultsType);
                            nextFlag = true
                        }
                    }
                    if(!nextFlag){
                        self.$api.deleteAchievementInfo({
                            cgxxbId: data.data.cgid
                        },res=>{
                            console.log(res);
                        })
                    }
                    _this.event.success(data);
                },
                error: function (err) {//失败
                    // alert("表单提交异常！" + err.msg);
                    _this.event.error(err);
                },
            })

        };
        customFile.prototype.submit = function (callback, error) {
            this.html.submit();
            this.event.success = callback;
            if (error) {
                this.event.error = error;
            };
        };

        customFile.prototype.setParams = function (value, username) {
            this.html.find('.planningResultName').val(value.planningResultName);
            this.html.find('.planningResultCode').val(value.planningResultCode);
            this.html.find('.username').val(session.get('userInfo').id);
        };

        customFile.prototype.set = function (data) {

        };
        
        customFile.prototype.get = function (callback, ignore) {
            // callback(value);
        };
        _form.$setOptions([
            [{
                key: 'fileString',
                el: this.$el.find('#fileString'),
                formlabel: '规划成果名称',
                object: customFile,
                url: config.InterfaceAddress.commonServiceSF + '/wintopachieve/upload/file-upload',
                col: 11,
            }],
            [{
                key: 'planningResultName',
                type: 'input',
                formlabel: '规划成果名称',
                col: 6,
                verify: {
                    text: '规划成果名称',
                    rules: ['notNull','gre$100']
                },
            }, {
                // key: 'planningResultCode',
                // type: 'select',
                // formlabel: '规划成果类型',
                // col: 6,
                // data: 'OptionSide:Gender',
                // verify: {
                //     text: '下拉菜单',
                //     rules: 'notNull'
                // },

                key: 'planningResultCode',
                type: 'input',
                formlabel: '规划成果类型',
                width: '150',
                data: [],
                col: 6,
                readonly: true
                // showKey: 'label',
                // setKey: 'value',
                // getKey: 'value'
            }]
        ]);
        _formShow.$setOptions([
            [{
                key: 'administrativeDivision',
                type: 'input',
                formlabel: '行政区划',
                col: 6,
                readonly: true,
                data: 'OptionSide:Gender',
            }, {
                key: 'adCode',
                type: 'input',
                readonly: true,
                formlabel: '行政区代码',
                col: 6,
            }], [{
                key: 'currentBaseYear',
                type: 'input',
                readonly: true,
                formlabel: '现状基准年',
                col: 6,
                required: true,
            }, {
                key: 'planStartYear',
                type: 'input',
                readonly: true,
                formlabel: '规划起始年',
                col: 6,
                required: true,
            }], [{
                key: 'planTargetYear',
                type: 'input',
                readonly: true,
                formlabel: '规划目标年',
                col: 6,
                required: true,
            }, {
                key: 'organizationUnit',
                type: 'input',
                readonly: true,
                formlabel: '编制单位',
                col: 6,
            }], [{
                key: 'specificationRange',
                type: 'input',
                readonly: true,
                formlabel: '规划范围',
                col: 6,
            }, {
                key: 'specificationArea',
                type: 'input',
                readonly: true,
                formlabel: '规划面积',
                col: 6,
            }], [{
                key: 'planPopulation',
                type: 'input',
                readonly: true,
                formlabel: '规划人口',
                col: 6,
            }, {
                key: 'resultsVersion',
                type: 'input',
                readonly: true,
                formlabel: '成果版本',
                col: 6,
            }], [{
                key: 'approvalUnit',
                type: 'input',
                readonly: true,
                formlabel: '批复单位',
                col: 6,
            }, {
                key: 'approvalTime',
                type: 'input',
                readonly: true,
                formlabel: '批复时间',
                col: 6,
            }]
        ]);

        // 渲染表单元素
        this.$el.find('#inspectionAdd').append(_form.$html);
        this.$el.find('#inspectionAddBottom').append(_formShow.$html);
        this.$el.find('#next').hide();
        // 渲染第一行处上传按钮
        var button = $('<button class="layui-btn layui-btn-sm layui-btn-ys" style="margin-top:32px; margin-right:20px;" id="upBtn">上传</button>');
        //成果id
        var cgidNew = "";
       //规划成果类型
       var resultCode = "";
       //规划成果名称
       var resultName = "";
        button.click(() => {
            //表单取值
            // return;
            if($("input[id='fileId']").val()!=""){
                _form.get(function (value) {
                    resultCode =value.planningResultCode;
                    resultName =value.planningResultName;
                    _form.fileString.setParams(value, _this.$data.username);
                    _form.$changeReadonlyForAll(true);
                    _form.fileString.submit(function (message) {
                        $("input[id='fileId']").prop('disabled',false)
                        _this.$el.find("#bfb").html("上传成功");
                        if(_this.$el.find("#bfb").html()=="上传成功"){
                            $("input[id='fileId']").change(function(event){
                                $("#upBtn").prop("disabled",false).css({"background":"#eff1f2","color":"#666"});
                            });
                        }
                        // console.log( message.data.cgid);
                        cgidNew = message.data.cgid;
                        _formShow.set({
                            specificationTime: message.data.specificationTime,	//	规划期限_T
                            approvalTime: message.data.approvalTime,	            //	批复时间_T
                            organizationUnit: message.data.organizationUnit,  	//	编制单位_T
                            planPopulation: message.data.planPopulation,          //	规划人口_T
                            planTargetYear: message.data.planTargetYear,	        //	规划目标年_T
                            currentBaseYear: message.data.currentBaseYear,	    //	现状基准年_T
                            administrativeDivision: message.data.administrativeDivision,  //	行政区名称_T
                            cgid: message.data.cgid,	                        //	成果id
                            planStartYear: message.data.planStartYear,	     //	规划起始年_T
                            adCode: message.data.adCode,                     //	行政区代码_T
                            resultsType: message.data.resultsType,	        //	成果类型_T
                            resultsVersion: message.data.resultsVersion,  	//	成果版本_T
                            wtUnit: message.data.wtUnit,	                     //	委托单位_T
                            specificationArea: message.data.specificationArea,	//	规划面积_T
                            specificationRange: message.data.specificationRange,	//	规划范围_T
                            approvalUnit: message.data.approvalUnit	         //	批复部门_T
                        });
                        _this.$el.find('#next').show();
                    });
                });     
            }else{
                icu.alert.warning({
                    title: '请选择上传文件！',
                    text: '',
                });
            }
           
            if(resultCode!="" && resultName!="" && $("input[id='fileId']").val()!=""){
                this.$el.find("#upBtn").attr("disabled","disabled").css({"background":"#eff1f2","color":"#999"});
                this.$el.find("#fileId").attr("disabled","disabled");
            }
            
        });
      
        // console.log('传值'+cgidNew);
        var buttonLayout = $('<div class="layui-col-md1" style="text-align:right"></div>').append(button);
        _this.$el.find('.layui-col-md11').after(buttonLayout)
        // _form.string.html.parents('.layui-col-md11').after(buttonLayout);
        
        // 下一步按钮绑定事件
        this.$el.find('.next').click(function () {
            
            if(!nextFlag) {
                return icu.alert.warning({title: '规划成果类型不匹配，无法进行下一步'});
            }

            _this.closeEvent();
            if(cgidNew != ""){
                var _dialog = implementationDialog({
                    top: '45px',
                    width: '70%',
                    height: '81%',
                    path: '/result/quality_testing/inspection/other_page/detail_add',
                    params:{
                        cgxxbId:cgidNew
                    },
                    title: '成果质检',
                    events: {},
                    onClose: function () {
                        _this.closeEvent();
                    },
                });
    
                _dialog.body.css({
                    'background': 'rgb(239,241,242)'
                });
            }
            
        })
    },
    destroy: function () {

    },
};