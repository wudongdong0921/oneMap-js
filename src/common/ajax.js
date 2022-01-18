////////////////////////////////////////////////
// ajax 组件
// Kris
// 2021-05-07 11:11:46
////////////////////////////////////////////////
var session = icu.session;

// ajax 的调用参数
var develop = {
    defaultUrl: '',
    urlList: config.InterfaceAddress,
    // 原开发模式开关
    is: true,
    // 原url验证机制
    url: function (urlName) {
        if (urlName && develop.urlList.hasOwnProperty(urlName)) {
            return develop.urlList[urlName];
        } else {
            return develop.defaultUrl;
        };
    },
    // 原单元测试调用开关
    fun: function (callback) {
        if (develop.is) {
            callback();
        };
    }
};

// ajax 实体;
var ajax = function (type, options) {
    // 原url获取和调用方式
    if (options.devUrl) {
        options.url = develop.url(options.devUrl) + options.url;
    } else {
        options.url = develop.url('default') + options.url;
    };

    // 判断loading元素
    var loadingElement = null;
    if (!options.loading && options.loading !== false) {
        loadingElement = new icu.loading($('body'));
    } else if (options.loading === false) {
        loadingElement = null;
    } if (options.loading) {
        loadingElement = options.loading;
    };
    // 开启loading
    if (loadingElement) {
        loadingElement.show();
    };

    // 合并query参数
    if (options.hasOwnProperty('query')) {
        let queryArr = [];
        for (const key in options.query) {
            if (options.query.hasOwnProperty(key)) {
                queryArr.push(key + '=' + options.query[key])
            }
        };
        if (options.url.indexOf('?') !== -1) {
            options.url = options.url + '&' + queryArr.join('&');
        } else {
            options.url = options.url + '?' + queryArr.join('&');
        }
    };

    // var _data = {};
    // if (options.isForm) {
    //     var formdata = new FormData();
    //     for (const key in options.data) {
    //         if (options.data.hasOwnProperty(key)) {
    //             const element = options.data[key];
    //             if (typeof element == 'object') {
    //                 formdata.append(key, JSON.stringify(element));
    //             } else {
    //                 formdata.append(key, element);
    //             };
    //         }
    //     };
    //     _data = formdata
    // } else {
    //     _data = JSON.stringify(options.data)
    // }

    options.contentType = options.contentType || 'json';
    var _data = {};
    if (options.contentType == 'json') {
        _data = JSON.stringify(options.data)
    } else {
        _data = options.data;
    };

  return  $.ajax({
        contentType: (options.contentType == 'json' ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8'),
        url: options.url,
        async: options.async,
        data: _data,
        type: type,
        processData: !options.isForm ? true : false,
        dataType: "json",
        beforeSend: function (request) {
            // header 参数判断
            if (options.token) {
                // 添加token 的键值
                // 待完善（本意交由config进行设置，但由于框架初期对人人权限不了解，并且对项目token的参数概念模糊，故不完善）
                //       完善思路 ：有option参数判断传递哪个token 或者token的key值
                request.setRequestHeader('token', session.get('token'));
                //       人人权限指定header参数，要求返回中文对象
                request.setRequestHeader('Accept-Language', 'zh-CN');
            };
            request.setRequestHeader('token', session.get('token'));
        },
        success: function (result) {
            // 隐藏loading
            if (loadingElement) {
                loadingElement.hide();
            };
            // 判断如果为权限不足时，跳转回登录页面
            if (result.code == '401') {
                // router.getRouter('/login', {}, function (router) {
                //     window.layout.changeRouter(router);
                // });
            } else if (result.code == '500') {
                // 判断error参数是否存在
                if (options.error) {
                    // 如果存在，则交由error方法进行处理
                    options.error(result);
                } else {
                    // 当code 为500 时，弹出错误信息
                    layer.open({
                        title: '警告',
                        content: result.msg || '后台服务连接失败，请检查账户信息或刷新页面重试'
                    });
                }
            } else {
                // 执行成功方法
                options.success(result);
            };
        },
        error: function (error) {
            // 隐藏loading
            if (loadingElement) {
                loadingElement.hide();
            };

            // 判断error参数是否存在
            if (options.error) {
                // 如果存在，则交由error方法进行处理
                options.error(error);
            } else {
                // 否则交由ajax自行判断
                if (error.status == '404') {
                    // 404 警告
                    layer.open({
                        title: '警告',
                        content: '服务器出现异常,请刷新重试'
                    });
                } else if (error.status == '500') {
                    console.log(error)
                    // 500 警告
                    // 待完善，如果为生产环境，则不显示错误信息，显示错误提示文字
                    //         此方法应交由生产交付环境参数进行判断
                    layer.open({
                        title: '警告',
                        content: error.msg ? error.msg : error.responseJSON.msg
                    });
                } else if (error.status == '403') {
                    // 403 警告 
                    // 待完善 由于后台errorMessage对象不完善，没有同意规定，故未作处理
                    if (config.token.useToken) {
                        // refreshToken(function () {
                        //     ajax(options);
                        // });
                    };
                } else {
                    // 其他错误
                    // 待完善 由于后台errorMessage对象不完善，没有同意规定，故未作处理
                    layer.open({
                        title: '警告',
                        content: '出现网络问题,请联系管理员'
                    });
                };
            };
        }
    })
};
export default {
    // 转换get
    get: function (options) {
        return ajax('GET', options);
    },
    // 转换post
    post: function (options) {
        return ajax('POST', options);
    },
    // 转换put
    put: function (options) {
        return ajax('PUT', options);
    },
    // 转换delete
    delete: function (options) {
        return ajax('DELETE', options);
    },
    develop: develop
}