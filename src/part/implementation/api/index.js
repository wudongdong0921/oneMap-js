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
        // var serviceAry = serviceArray.split('.')
        if(serviceArray[0] !== ''){
            for (let i = 0; i < serviceArray.length; i++) {
                const element = serviceArray[i];
                // if (modules.hasOwnProperty(element)) {
                    // const services = modules[serviceAry[0]][serviceAry[1]];
                    const services = {};
                    try {
                        eval('services = modules.' + element);
                        for (const key in services) {
                            if (services.hasOwnProperty(key)) {
                                const serveItem = services[key];
                                api[key] = serveItem;
                            }
                        };
                    } catch (error) {
                        console.error('API 文件引用出现错误');
                        console.error(error)
                        break;
                    }
                // };
            };
        }
        return api;
    }
}