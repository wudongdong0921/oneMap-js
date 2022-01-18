////////////////////////////////////////////////
// tree配置项封装
// 吴野
// 2020-12-10 14:21:25
////////////////////////////////////////////////
const files = require.context('.', false, /\.js$/);
const moduleJs = {};
files.keys().forEach(key => {
    if (key === './index.js') return
    moduleJs[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});
var HandeleCallback = function(optionKey,event){
    var _this = this;
    this.moduleJs = moduleJs;
    this._option = $.extend({}, this.moduleJs[optionKey]); //需要初始化时传一个获取配置项的key
    if (this._option.callback) {
        var allCb = _this._option.callback;
        for (const i in allCb) {
            if (allCb.hasOwnProperty(i)) {
                _this._option.callback[i] = event[i]
            }
        }
    };
    return this._option;
}

export default HandeleCallback