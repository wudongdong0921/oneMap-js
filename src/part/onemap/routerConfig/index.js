////////////////////////////////////////////////
// 模块化router加载组件
// 吴野
// 2021-04-23 16:14:13
////////////////////////////////////////////////
const files = require.context('.', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    if (key === './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});
var router = {};
for (const key in modules) {
    if (modules.hasOwnProperty(key)) {
        const element = modules[key];
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const item = element[key];
                router[key] = item;
            }
        }
    }
};
export default router;