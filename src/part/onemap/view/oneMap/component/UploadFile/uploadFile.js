////////////////////////////////////////////////
// 上传
// 吴东东
// 2020-11-05 13:49:37
////////////////////////////////////////////////
var UploadFile = function () {
    var uploadLayout = '';
    uploadLayout += '                  <div>';
    uploadLayout += '                    <div class="un-drag-content loadingBox" style="display:none">';
    uploadLayout += '                        <div class="add-file-uploading-text"></div>';
    uploadLayout += '                        <div class="add-file-uploading-uploadProgress">';
    uploadLayout += '                           <div class="add-file-uploading-uploadProgress-line"></div>';
    uploadLayout += '                        </div>';
    uploadLayout += '                    </div>';
    uploadLayout += '                 </div>';
    this.fileHtml = $(uploadLayout);
    this.event = {
        setCoordinate: function () {},
        getFileList: function () {}
    }
}
UploadFile.prototype.uploadFile = function (uploadLayout_ele) {
    var _this = this
    var updateUrl = config.InterfaceAddress.AnalysisServiceTest + '/layer/fileAnalysis'
    var html = '';
    html += '   <form style="display:none;" action="' + updateUrl + '" method="post" enctype="multipart/form-data">';
    html += '       <input type="file" class="fileElement" accept=".geojson,.txt,.dwg,.zip" name="file"/>';
    // html += '       <input type="text" name="dsName" value="' + config.AnalysisOption.dsName + '"/>';
    // html += '       <input type="text"  name="dtName" value="' + config.AnalysisOption.dtName + '"/>';
    // html += '       <input type="text"  name="QHDM" value="' + config.AnalysisOption.qhdm + '"/>';
    html += '       <input type="submit" style="display: none;"/>';
    html += '   </form>';
    var form = $(html);
    this.form = form
    // "dsName": config.AnalysisOption.dsName,
    // "dtName": config.AnalysisOption.dtName,
    // "qhdm": config.AnalysisOption.qhdm,
    var uploadLayout_ele = this.fileHtml
    form.ajaxForm({
        success: (result) => {
            if (result.code == 200) {
                var _data = JSON.parse(result.data);
                var _prjStr = result.data.prjStr
                uploadLayout_ele.find('.loadingBox').loading();
                //this.uploadSuccess(uploadLayout_ele, _data, _prjStr);
                this.event.setCoordinate(_data, this.file)
            } else {
                uploadLayout_ele.find('.loadingBox').loading()
                uploadLayout_ele.find('.uploadBox').show();
                uploadLayout_ele.find('.loadingBox').hide();
                _$alert(result.data)
            }
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            uploadLayout_ele.find('.add-file-uploading-uploadProgress-line').css({
                width: percentVal,
            });
            if (percentVal == '100%') {
                uploadLayout_ele.find('.loadingBox').loading();
            };
        },
        error: function (error, b, c) {
            if (uploadLayout_ele.find('.loadingEx').length) {
                uploadLayout_ele.find('.loadingBox').loading();
            };
            _$alert(error)
        }
    });
    form.find('.fileElement').change(function (e) {
        _this.file = e.target.files
        var name = form.find('.fileElement')[0].files[0].name;
        uploadLayout_ele.find('.add-file-uploading-text').text(name);
        form.submit();
        uploadLayout_ele.find('.uploadBox').hide();
        uploadLayout_ele.find('.loadingBox').show();
    });

    form.find('.fileElement').click();
};
UploadFile.prototype.HandleSetCoordinate = function (event, events) {
    this.event.setCoordinate = event
    this.event.getFileList = events
}
export default UploadFile