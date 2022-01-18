var options = function(_this){

    var customFile = function () {
        var url = config.InterfaceAddress.implementService + '/fileTreeController/file-uploadFolder'
    
        var _this = this;
        var html = '';
        html += '<form id="multipart-form" action="' + url + '" method="POST"  enctype="multipart/form-data">'
        html += '    <label for="uploadFile">'
        html += '       <button class="layui-btn layui-btn-sm layui-btn-ys" style="cursor: pointer" id="btn" type="button"><i class="buttonIcon deal"></i>选择文件夹</button>'
        html += '       <span id="uploadFileName">未选择任何文件</span>'
        html += '       <input type="file" name="file" id="file" webkitdirectory style="width: 1px">'
        html += '    </label>'
        html += '    <input type="text" class="planningResultId" name="planningResultId" value="" style="display:none">'
        html += '    <input type="text" class="account" name="account" value="'+ icu.session.get('userInfo').id +'" style="display:none">'
        html += '    <div id="jdcontainer" class="container" style="margin-top: 5px;"><span class="progress"></span></div><span id="bfb"></span>';
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
                    _this.html.find("#bfb").html("正在上传中...");
                }
                _this.html.find('.progress').css({
                    'width': percentVal
                });
            },
            success: function (data) {//成功
                console.log(data);
                _this.event.success(data);
            },
            error: function (err) {//失败
                _this.event.error(err);
            },
        })
        return this;
    
    }
    
    customFile.prototype.submit = function (callback, error) {
        this.html.submit();
        this.event.success = callback;
        if (error) {
            this.event.error = error;
        };
    };
    
    customFile.prototype.setParams = function (planningResultId) {
        this.html.find('.planningResultId').val(planningResultId);
    };
    
    customFile.prototype.set = function (data) {
    
    };
    
    customFile.prototype.get = function (callback, ignore) {
        
    };

    return [
        [{
            key: 'fileString',
            el: _this.$el.find('#fileString'),
            formlabel: '规划成果名称',
            object: customFile,
            url: config.InterfaceAddress.implementService + '/fileTreeController/file-uploadFolder',
            col: 11,
        }],
        [{
            key: 'projectName',
            type: 'input',
            formlabel: '项目名称',
            col: 12,
            verify: {
                text: '项目名称',
                rules: 'gre$100'
            },
            placeholder: '请输入项目名称',
        }],
        [{
            key: 'adCode',
            type: 'input',
            formlabel: '行政区代码',
            readonly: true,
            col: 6,
            verify: {
                text: '行政区代码',
                rules: 'notNull'
            },
            placeholder: '请输入行政区代码',
        }, {
            key: 'administrativeDivision',
            type: 'input',
            formlabel: '行政区名称',
            readonly: true,
            col: 6,
            verify: {
                text: '行政区名称',
                rules: 'notNull'
            },
            placeholder: '请输入行政区名称',
        }],
        [{
            key: 'specificationType',
            type: 'input',
            formlabel: '规划类型',
            readonly: true,
            col: 6,
            verify: {
                text: '规划类型',
                rules: 'notNull'
            },
            placeholder: '请输入规划类型',
        }, {
            key: 'specificationLevel',
            type: 'input',
            formlabel: '规划层级',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入规划层级',
        }],
        [{
            key: 'resultsVersion',
            type: 'input',
            formlabel: '成果版本',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入成果版本',
        }, {
            key: 'orgSituation',
            type: 'input',
            formlabel: '编制情况',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入编制情况',
        }],
        [{
            key: 'currentBaseYear',
            type: 'input',
            formlabel: '基期年',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入基期年',
        }, {
            key: 'planStartYear',
            type: 'input',
            formlabel: '规划起始年',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入规划起始年',
        }],
        [{
            key: 'nearTargetYear',
            type: 'input',
            formlabel: '近期目标年',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入近期目标年',
        }, {
            key: 'planTargetYear',
            type: 'input',
            formlabel: '规划目标年',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入规划目标年',
        }],
        [{
            key: 'distanceTargetYear',
            type: 'input',
            formlabel: '远景目标年',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入远景目标年',
        }, {
            key: 'specificationRange',
            type: 'input',
            formlabel: '规划范围',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入规划范围',
        }],
        [{
            key: 'specificationArea',
            type: 'input',
            formlabel: '规划面积',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入规划面积',
        }, {
            key: 'planPopulation',
            type: 'input',
            formlabel: '规划人口',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入规划人口',
        }],
        [{
            key: 'wtUnit',
            type: 'input',
            formlabel: '委托单位',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入委托单位',
        }, {
            key: 'organizationUnit',
            type: 'input',
            formlabel: '编制单位',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入编制单位',
        }],
        [{
            key: 'uscCode',
            type: 'input',
            formlabel: '统一社会信用代码',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入统一社会信用代码',
        }, {
            key: 'legalPersonName',
            type: 'input',
            formlabel: '法人代表姓名',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入法人代表姓名',
        }],
        [{
            key: 'legalPersonId',
            type: 'input',
            formlabel: '法人代表身份证号',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入法人代表身份证号',
        }, {
            key: 'projectLeaderName',
            type: 'input',
            formlabel: '项目负责人姓名',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入项目负责人姓名',
        }],
        [{
            key: 'projectLeaderId',
            type: 'input',
            formlabel: '项目负责人身份证号',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入项目负责人身份证号',
        }, {
            key: 'technicalExaminerName',
            type: 'input',
            formlabel: '技术主审人姓名',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入技术主审人姓名',
        }],
        [{
            key: 'technicalExaminerId',
            type: 'input',
            formlabel: '技术主审人身份证号',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入技术主审人身份证号',
        }, {
            key: 'organizationTime',
            type: 'input',
            formlabel: '编制时间',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入编制时间',
        }],
        [{
            key: 'reportUnit',
            type: 'input',
            formlabel: '上报单位',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入上报单位',
        }, {
            key: 'reportTime',
            type: 'input',
            formlabel: '上报时间',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入上报时间',
        }],
        [{
            key: 'contacts',
            type: 'input',
            formlabel: '联系人',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入联系人',
        }, {
            key: 'contactsTel',
            type: 'input',
            formlabel: '联系电话',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入联系电话',
        }],
        [{
            key: 'approvalDocnum',
            type: 'input',
            formlabel: '批准文号',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入批准文号',
        }, {
            key: 'approvalTime',
            type: 'input',
            formlabel: '批准时间',
            readonly: true,
            col: 6,
            verify: {
                text: 'input',
                rules: ''
            },
            placeholder: '请输入批准时间',
        }]
    ];
}

export default function (_this) {
    return new options(_this);
};