////////////////////////////////////////////////
// 一张图页面
// 穆松鹤
// 2020-09-22 11:43:45
////////////////////////////////////////////////

import OneMap from './component/main'


export default {
    render: function (parame) {
        var $el = parame.view;
        var _api = parame._api;
        OneMap.init($el.find('#OneMap'), {
            useHeader: false, // 是否显示顶部导航
            _api: _api
        });
    },
    destroy: function () { },
};