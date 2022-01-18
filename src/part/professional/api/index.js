const files = require.context('.', false, /\.js$/)
const modules = {}

// 合并/service中的全部js文件
files.keys().forEach(key => {
    if (key === './index.js') return
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// 对调用产生的service api 进行合并处理,旨在只返回一个api调用对象
// 优点 调用方便
// 缺点 调用时产生重名问题则数组中后书写的对象覆盖先书写的对象
export default {
    get: function (serviceArray) {
        var api = {};
        for (let i = 0; i < serviceArray.length; i++) {
            const element = serviceArray[i];
            if (modules.hasOwnProperty(element)) {
                const services = modules[element];
                for (const key in services) {
                    if (services.hasOwnProperty(key)) {
                        const serveItem = services[key];
                        api[key] = serveItem;
                    }
                };
            };
        };
        return api;
    }
}