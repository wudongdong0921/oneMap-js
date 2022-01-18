import uploadCom from '../../../../../../common/uploadFileExOld'
import session from '../../../../../../common/session'

export default {
    uploadFileElement : null,
    render() {
        var _this = this;
        this.$api.uploadReportDetailsByPgId({
            sspgId: _this.$data.sspgId
        }, function (res) {
            if (res.code == 0) {
                _this.fnRenderUploadView(res.data);
            }
        });
        this.fnRenderInfo();
        this.fnRenderTextArea();
    },
    fnRenderInfo() {
        var info = this.$data.data;
        this.$el.find("#districtName").text(info.districtName);
        this.$el.find("#districtCode").text(info.districtCode);
        this.$el.find("#assessYear").text(info.assessYear);
        this.$el.find("#assessDate").text(info.assessDate);
        //this.$el.find("#remark").text(info.remark == null ? '' : info.remark);
    },
    fnRenderTextArea() {
        this.textareaDemo = new icu.formElement.textarea({
            readonly: true,
            placeholder: '',
            height: 100,
            width: '',
            resize: 'none',
            useTabSpace: true,
            useTabSpaceWidth: 4,
            aotoHeight: true,
            errorStyle: 'form-error',
        });
        this.$el.find("#remark").append(this.textareaDemo.html);
        this.textareaDemo.set(this.$data.data.remark);
    },
    fnRenderUploadView(ids) {
        // 实例化文件上传组件
        this.uploadFileElement = new uploadCom.uploadFilelayout({
            upload: layui.upload,
        });
        this.$el.find('#uploadIdFile').append(this.uploadFileElement.render());
        // 初始化打包下载
        this.uploadFileElement.renderDownloadData(config.InterfaceAddress.implementService + '/transaction/fileDownLoad');
        // 获取打包下载数据
        //uploadFileElement.SelectFileData();
        this.uploadFileElement.renderFileList(config.InterfaceAddress.implementService + '/transaction/getFilesByEnclosureId?enclosureId=' + ids);
    },
    destroyed() {

    },
}