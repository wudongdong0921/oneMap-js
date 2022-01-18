import uploadCom from '../../../../../../common/uploadFileExOld'
import session from '../../../../../../common/session'
export default {
    uploadFileElement: null,
    textareaDemo: null,
    render() {
        this.fnGetUploadData();
        this.fnRenderInfo();
        this.fnRenderTextArea();
    },
    fnGetUploadData() {
        var _this = this;
        this.$api.uploadReportDetailsByPgId({
            sspgId: _this.$data.data.sspgId
        }, function (res) {
            if (res.code == 0) {
                _this.fnRenderUploadView(res.data);
            }
        });
    },
    fnRenderInfo() {
        var info = this.$data.data;
        this.$el.find("#districtName").text(info.districtName);
        this.$el.find("#districtCode").text(info.districtCode);
        this.$el.find("#assessYear").text(info.assessYear);
        this.$el.find("#assessDate").text(info.assessDate);
        this.$el.find('#confirm').click(() => {
            this.fnComfirm();
        });
        this.$el.find('#cancel').click(() => {
            this.closeEvent();
        });
    },
    fnRenderUploadView(ids) {
        this.uploadFileElement = new uploadCom.uploadFilelayout({
            upload: layui.upload,
        });
        this.uploadFileElement.init(
            config.InterfaceAddress.implementService + '/transaction/uploadFile', {
            userName: session.get('userInfo').username
        }
        );
        this.$el.find('#uploadIdFile').append(this.uploadFileElement.render());
        this.uploadFileElement.renderFileList(config.InterfaceAddress.implementService + '/transaction/getFilesByEnclosureId?enclosureId=' + ids);

    },
    fnRenderTextArea() {
        this.textareaDemo = new icu.formElement.textarea({
            readonly: false,
            placeholder: '',
            height: 100,
            width: '',
            resize: 'none',
            useTabSpace: true,
            useTabSpaceWidth: 4,
            aotoHeight: true,
            errorStyle: 'form-error',
            verify: {  
                text : '备注',
                rules: ['gre$200']
            },
        });
        this.$el.find("#remark").append(this.textareaDemo.html);
        this.textareaDemo.set(this.$data.data.remark);
    },
    fnComfirm() {
        var _this = this;
        var fileData = this.uploadFileElement.getData();
        console.log(JSON.stringify(fileData));
        if (fileData.error) {
            layer.msg('您有文件尚未上传完成');
        } else {
            this.textareaDemo.get(function (errorMessage, value) {
                if (errorMessage) {
                    icu.alert.error({
                        text: errorMessage
                    });
                } else {
                    _this.$data.data.remark = value;
                    var maaewIeInfo = _this.$data.data;
                    maaewIeInfo.reportSource = 'SDSC';
                    maaewIeInfo.assessUser = session.get('userInfo').realName;
                    var params = {
                        maaewIeInfo: maaewIeInfo,
                        enclosureId: fileData.obj
                    }
                    _this.$api.addMaaewIeEnclosure(params, function (res) {
                        if (res.code == 0) {
                            _this.closeEvent();
                        }
                    });
                }
            });
        }
    },
    destroyed() {

    },
}