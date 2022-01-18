import request from '../../../../common/ajax';
var getNormalFile = function (FileId, callback) {
    request.post({
        url: '/fileTreeController/findFileShow/' + FileId,
        devUrl: 'implementService',
        success: function (res) {
            callback(res.data);
        },
        error: function (error) {
            layer.open({
                title: '警告',
                content: error.responseText
            });
        }
    });

};

export default {
    getNormalFile: getNormalFile
}