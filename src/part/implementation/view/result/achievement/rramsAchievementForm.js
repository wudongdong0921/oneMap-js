import uploadCom from '../../../../../common/uploadFileEx'
import horizon from '../../../../../common/horizon/horizonCustomForm'
import formOptions from './formOptions/rramsAchievementFormOptions'
import cityFormOptions from './formOptions/rramsAchievementCityFormOptions'

export default  {
    render: function (template, params, linkTo, request, closeEvent) {

        var _this = this;
        var workid = '-1';
        var trackid = '-1';
        workid = _this.$query.workid;
        trackid = _this.$query.trankid;
        var flowid = _this.$query.flowid;
        var readonly = _this.$query.readonly;
        var nodeid = _this.$query.nodeid;
        _this.$el.find('#huizhengWorkid').val(workid);
        _this.$el.find('#huizhengFlowid').val(flowid);

        console.log(_this.$el.find('#nodeName').val());

        var isUpload = false;

        var reviewState = 0;
        var beanReviewState = 0;

        var _form = null;
        var fileMap = new Map();
        
        // 实例化文件上传组件
        var uploadFileElement = new uploadCom.uploadFilelayout({
            upload: layui.upload,
        });

        uploadFileElement.init(
            config.InterfaceAddress.implementService + '/transaction/uploadFileWeb', {
                userName: icu.session.get('userInfo').username
            }
        );

        _this.$el.find('#uploadIdFile').append(uploadFileElement.render());



        _form = icu.templateForm({
            labelwidth: 110
        })
        var options = null;
        if(flowid.indexOf("sbjcghj") != -1){
            options = new formOptions(_this); //省级表单
        } else if(flowid.indexOf("sjcghj") != -1){
            options = new cityFormOptions(_this); //市级表单
        } else {
            options = new formOptions(_this); //省级表单
        }
        _form.$setOptions(options);
        
        _this.$el.find('#formContent').append(_form.$html);
        //默认成果附件ID获取一个新的UUID，下面初始化页面表单数据时覆盖这个
        _this.$el.find('#planningResultId').val(uuid());

        var getFJlist = function (id) {
            // 渲染获取文件列表
            uploadFileElement.renderFileList(config.InterfaceAddress.implementService + '/fileupload/selectFileList?enclosureId=' + id);
        };

        // 渲染第一行处上传按钮
        var upbutton = $('<button class="layui-btn layui-btn-sm layui-btn-ys" style="margin-top:10px; margin-right: 10px;" id="upBtn" type="button"><i class="buttonIcon deal"></i>上传</button>');
        upbutton.click(() => {
            if(fileMap.size > 0){
                var myFormData = new FormData();
                myFormData.append("planningResultId", _this.$el.find('#planningResultId').val());
                myFormData.append("account", _this.$el.find('#account').val());
                fileMap.forEach(function(value,key){
                    myFormData.append(key, value);
                });
                $.ajax({
                    url: config.InterfaceAddress.implementService + '/fileTreeController/file-uploadFolder',
                    data : myFormData,
                    method: 'post',
                    contentType:false,
                    processData:false,
                    xhr: function xhr() {
                        //获取原生的xhr对象
                        var xhr = $.ajaxSettings.xhr();
                        if (xhr.upload) {
                            //添加 progress 事件监听
                            xhr.upload.addEventListener('progress', function (e) {
                                //e.loaded 已上传文件字节数
                                //e.total 文件总字节数
                                var percentComplete = parseInt(e.loaded / e.total * 100)
                                var percentVal = percentComplete + '%';

                                _this.$el.find('#btn').unbind('click');
                                if(percentComplete<100){
                                    _this.$el.find("#bfb").html(percentVal);
                                    $("input[id='fileId']").prop('disabled',true)
                                    $("#upBtn").attr("disabled",true).css({"background":"#eff1f2","color":"#999"});
                                }else{
                                    _this.$el.find("#bfb").html("正在上传中...");
                                }
                                _this.$el.find('.progress').css({
                                    'width': percentVal
                                });
                            }, false);
                        }
                        return xhr;
                    },
                    success: function (res) {
                        $("input[id='fileId']").prop('disabled',false);
                        $("#upBtn").prop("disabled",false).css({"background":"#eff1f2","color":"#666"});
                        fileMap = new Map();
                        //数据回显
                        if(res.code == 200){
                            _this.$el.find("#bfb").html("上传成功");
                            isUpload = true;
                            $("form[id='formContent']").find("input[type='text']").each(function(){

                                if($(this).css('display') != 'none'){
                                    console.log($(this).attr('name'))
                                    $(this).val("");
                                }
                            });

                            if(JSON.stringify(res.data) != "{}"){
                                _form.set(res.data);
                            }

                            _this.$el.find('#planningResultCode').val(res.data.planningResultCode);
                        } else {
                            _this.$el.find("#bfb").html("上传失败");
                            top.layer.alert(res.msg);
                        }

                        _this.$el.find('#btn').on('click',function (){
                            _this.$el.find('#file').click();
                        });
                    },
                    error: function () {
                        fileMap = new Map();
                        $("form[id='formContent']").find("input[type='text']").each(function(){

                            if($(this).css('display') != 'none'){
                                console.log($(this).attr('name'))
                                $(this).val("");
                            }
                        });
                        $("#upBtn").prop("disabled",false).css({"background":"#eff1f2","color":"#666"});
                        console.log(res);
                        _this.$el.find('#btn').on('click',function (){
                            _this.$el.find('#file').click();
                        });
                    }
                });  
            }else{
                top.layer.alert('请选择上传文件！')
            }
            
        });
        $("input[id='fileId']").change(function(event){
            console.log("fileId change");
            $("#upBtn").prop("disabled",false).css({"background":"#eff1f2","color":"#666"});
        });
        // 渲染第一行处下载按钮
        var dowbutton = $('<button class="layui-btn layui-btn-sm layui-btn-ys" style="margin-top:10px; margin-right: 10px;" type="button"><i class="buttonIcon download"></i>下载</button>');
        dowbutton.click(() => {
            if(isUpload){
                
                _this.$api.getTreeTopLevel({
                    planningResultId: _this.$el.find('#planningResultId').val()
                },function(res){
                    if(res.code == 200){
                        _this.$api.dowloadFileZip({
                            planningResultId: res.data.cgfjxxbId
                        },function(res){
                            if(res.code == 200){
                                window.open(res.data);
                            }
                        });
                    } else {
                        top.layer.alert(res.msg);
                    }
                });


                
            } else {
                top.layer.alert('暂无规划成果！')
            }
        });
        // 渲染第一行处规划成果按钮
        var fileshowbutton = $('<button class="layui-btn layui-btn-sm layui-btn-ys" style="margin-top:10px; margin-right: 0px;width: 100px;" type="button"><i class="buttonIcon squareAdd"></i>规划成果</button>');
        fileshowbutton.click((e) => {
            e.stopPropagation();   //表示阻止向父元素冒泡
            e.preventDefault();     //阻止 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交或者a标签）。
            if(isUpload){
                parent.window.postMessage('OPEN_FILES_FUNCTION$$$'+ _this.$el.find('#planningResultId').val(), '*');
            } else {
                top.layer.alert('暂无规划成果！')
            }
        });
        
        var buttonLayout = $('<div class="layui-col-md1" style="text-align:right;width: 27%;"></div>').append(upbutton).append(dowbutton).append(fileshowbutton);

        _this.$el.find('.layui-col-md11').after(buttonLayout);

        $('body').delegate( '#file', 'change', function(e){
            var files = e.target.files;
            fileMap = new Map();
            //初始化进度样式
            _this.$el.find('.progress').css({'width': 0});
            _this.$el.find("#bfb").html("");
            if(files){
                var filePath = files[0].webkitRelativePath;
                var fileName = filePath.substring(0,filePath.indexOf( '/' ));
                $("#uploadFileName").html(fileName);
                _this.$el.find('#planningResultName').val(fileName);
                for(var i=0; i<files.length; i++){
                    //获取文件
                    var file = files[i];
                    fileMap.set(file.name, file);
                }
            }
            
        })
        
        /** 子页面数据交互 START */
        window.addEventListener('message', function (event) {
            console.log(event.data);
            if(event.data && typeof event.data == 'string'){
                if (event.data.indexOf('rramsAchievementGetParams$$$') != -1) {
                    //表单数据(自己的表单数据)
                    var formData = {};
                    _form.get(function (value) {
                        formData = value;
                    });
                    //放入附件ID、页面文本域
                    formData['accessoryId'] = uploadFileElement.getData().obj;
                    formData['cgxxbId'] = _this.$el.find('#cgxxbId').val();
                    formData['planningResultName'] = _this.$el.find('#planningResultName').val();
                    formData['huizhengWorkid'] = _this.$el.find('#huizhengWorkid').val();
                    formData['huizhengFlowid'] = _this.$el.find('#huizhengFlowid').val();
                    formData['planningResultId'] = _this.$el.find('#planningResultId').val();
                    formData['submitReview'] = _this.$el.find('#submitReview').val();
                    formData['reviewState'] = reviewState;
                    formData['inventoryStatus'] = _this.$el.find('#inventoryStatus').val();
                    formData['examineOpinion'] = _this.$el.find('#examineOpinion').val();
                    formData['planningResultCode'] = _this.$el.find('#planningResultCode').val();
                    
                    //请求地址(通用)
                    formData['postUrl'] = config.InterfaceAddress.implementService+"/achievementManage/saveRramsAchievent";
                    formData['dataKey'] = "rramsAchievement";
                    parent.window.postMessage(horizon.prefix + '$$$'+ JSON.stringify(formData), '*');
                } else if(event.data.indexOf('workflow_') != -1){
                    console.log(event.data);
                    if(event.data.indexOf('_reject') != -1){
                        reviewState = 3;
                    } else if (event.data.indexOf('_submit') != -1){
                        reviewState = 1;
                    } else if (event.data.indexOf('_conclude') != -1){
                        reviewState = 2
                    }
                } else if(event.data.indexOf('LOCAL_CHECK_FORM') != -1){
                    parent.window.postMessage('LOCAL_CHECK_FORM_RETURN$$$'+ checkForm(), '*');
                }
            }
            
        });
        /** 子页面数据交互 END */

        function uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
              s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "";
           
            var uuid = s.join("");
            return uuid;
        }

        //加载页面数据
        this.$api.getInfoByWorkid({
            workid: workid
        },function(res){
            if(res.code == 200){
                if(res.data){
                    _form.set(res.data);

                    $("#upBtn").hide();
                    $("#btn").hide();
                    $("#jdcontainer").hide();

                    if(res.data.accessoryId){
                        getFJlist(res.data.accessoryId);
                    }
                    
                    beanReviewState = res.data.reviewState;
                    _this.$el.find('#planningResultName').val(res.data.planningResultName);
                    _this.$el.find('#planningResultId').val(res.data.planningResultId);
                    _this.$el.find('#cgxxbId').val(res.data.cgxxbId);
                    _this.$el.find('#inventoryStatus').val(res.data.inventoryStatus);
                    _this.$el.find('#submitReview').val(res.data.submitReview);
                    _this.$el.find('#examineOpinion').val(res.data.examineOpinion);
                    _this.$el.find('#planningResultCode').val(res.data.planningResultCode);
                    var html = '<input spellcheck="false" autocomplete="off" type="text" class="form-control readonly" value="'+ res.data.planningResultName +'" readonly="readonly">';
                    $("#uploadFileName").html(html)
                    isUpload = true;

                    if(res.data.reviewState == "3"){
                        //退回后所有按钮隐藏
                        
                        parent.window.postMessage('REJECT_BTN_DIDE$$$', '*');
                    }
                }
                
            }
        });

        function checkForm(){
            var returnFlag = false;
            _form.get(function (value) {
                var submitReviewVal = _this.$el.find('#submitReview').val();
                if(submitReviewVal == ""){
                    _this.$el.find('#submitReview').css("border-color","red");
                    if(_this.$el.find('#submitReviewErrorMsg').length == 0){
                        _this.$el.find('#submitReview').after('<div id="submitReviewErrorMsg" class="FUI-form-errorMessage" style="color:red;">请填写成果汇交说明</div>');
                    }
                    _this.$el.find('#submitReview').on('change',function (){
                        if($(this).val() != ""){
                            _this.$el.find('#submitReviewErrorMsg').remove();
                            _this.$el.find('#submitReview').css("border-color","");
                        }
                    });
                    layer.msg('请填写成果汇交说明！',{icon:5,shift:6});
                    return;
                }
                if(nodeid == "Node2"){
                    var examineOpinion = _this.$el.find('#examineOpinion').val();
                    if(examineOpinion == ""){
                        _this.$el.find('#examineOpinion').css("border-color","red");
                        if(_this.$el.find('#examineOpinionErrorMsg').length == 0){
                            _this.$el.find('#examineOpinion').after('<div id="examineOpinionErrorMsg" class="FUI-form-errorMessage" style="color:red;">请填写审核意见</div>');
                        }
                        _this.$el.find('#examineOpinion').on('change',function (){
                            if($(this).val() != ""){
                                _this.$el.find('#examineOpinionErrorMsg').remove();
                                _this.$el.find('#examineOpinion').css("border-color","");
                            }
                        });
                        layer.msg('请填写审核意见！',{icon:5,shift:6});
                        return;
                    }
                }
                if(!isUpload){
                    top.layer.alert('请上传成果文件！');
                    return;
                }
                returnFlag = true;
            });
            return returnFlag;
        }

        if(nodeid.indexOf('Node') != -1){
            if(nodeid == "Node1"){
                $('#submitReview').attr("readonly",false);
            } else if(nodeid == "Node2") {
                $('#examineOpinion').attr("readonly",false);
            }
            if(nodeid != "Node1"){
                $("#upBtn").hide();
                $("#btn").hide();
                var html = '<input spellcheck="false" autocomplete="off" type="text" class="form-control readonly" placeholder="'+ $("#uploadFileName").html() +'" readonly="readonly">';
                $("#uploadFileName").html(html)
                $('input[type="text"]').attr("readonly",true);
            }
            
        }

        if(readonly == "0"){
            $('#examineOpinion').attr("readonly",true);
            $('#submitReview').attr("readonly",true);
            $('input[type="text"]').attr("readonly",true);
        }


        _this.$el.find('#btn').on('click',function (){
            _this.$el.find('#file').click();
        });

        uploadFileElement.renderDownloadData(config.InterfaceAddress.implementService + '/transaction/fileDownLoad');

        if(readonly != '1'){
            $('.upload-file-element').hide();
            setInterval(function (){
                $('.buttonLayout').hide();
            }, 100);
            $("th:contains(操作)").hide();
        }

    },
    destroy: function () {

    },
}

