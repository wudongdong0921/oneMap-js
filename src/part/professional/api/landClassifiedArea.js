import request from '../../../common/ajax'
// import config from "../config/config";

var deleteAllTdflmjbById = function (data, success, error) {
    request.post({
        url: "/sjbp/deleteAllTdflmjbById",
        query: data,
        async: false,
        devUrl: 'affairService',
        success: function (res) {
            success(res);
        },
    });

};

export default {
    deleteAllTdflmjbById: deleteAllTdflmjbById
}