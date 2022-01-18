var session = icu.session;
// import staticConfig from '../../staticConfig'
export default {
    render: function () {
        var _this = this;
        this.$api.getNavInfo({}, function (res) {
            var menuArrayObj = {}
            for (let j = 0; j < res.data.length; j++) {
                const itemA = res.data[j];
                menuArrayObj[itemA.fieldValue] = itemA;
            }

            var allMenuArray = [];
            for (let j = 0; j < icu.session.get('nav').length; j++) {
                const element = icu.session.get('nav')[j];
                allMenuArray[element.name] = element;
            }

            if (res.data.length !== 0) {
                var menuInfo = res.data;
                var bg = config.staticConfig.login.mainIndexBg;
                var nav = session.get('nav');
                for (const key in bg) {
                    if (bg.hasOwnProperty(key)) {
                        const element = bg[key];
                        _this.$el.find('#' + key).css({
                            'background-image': 'url(' + element + ')'
                        })
                    }
                };
                var imageObject = config.staticConfig.login.mainIndexImageObject;
                for (const key in imageObject) {
                    if (imageObject.hasOwnProperty(key)) {
                        const element = imageObject[key];
                        _this.$el.find('#' + key + ' > .img').css({
                            'background-image': 'url(' + element + ')',
                            'background-size': 'contain'
                        })
                    }
                };
                var bandView = (key, path) => {
                    _this.$el.find('#' + key).click(() => {
                        _this.urlArray = [];
                        console.log(path)
                        if (allMenuArray[path.title]) {
                            if (path.title == '一张图') {
                                _this.gotoPage(menuArrayObj[path.title].flag, allMenuArray[path.title].url, path)
                            } if (path.title == '公文系统') {
                                _this.gotoPage(menuArrayObj[path.title].flag, allMenuArray[path.title].url, path)
                            } else {
                                _this.diguiFor(allMenuArray[path.title].children)
                                _this.gotoPage(menuArrayObj[path.title].flag, _this.urlArray[0], path)
                            }
                        } else {
                            layer.open({
                                title: '警告',
                                content: '暂未开通权限，请联系管理员'
                            });
                        }
                    });
                };
                for (const key in config.staticConfig.indexConfigPath) {
                    if (config.staticConfig.indexConfigPath.hasOwnProperty(key)) {
                        const element = config.staticConfig.indexConfigPath[key];
                        bandView(key, element);

                    }
                }
            }
        })
    },
    diguiFor: function (data) {
        var _this = this;
        var thisUrl = ''
        for (let j = 0; j < data.length; j++) {
            const menuItem = data[j];
            if (menuItem.children.length !== 0) {
                _this.diguiFor(menuItem.children)
            } else {
                if (menuItem.url) {
                    thisUrl = menuItem.url
                    _this.urlArray.push(thisUrl)
                }
            }
        }
    },
    gotoPage: function (status, path, allPath) {
        var _this = this;
        if (status == 'true') {
            _this.goto(path);
        } else {
            layer.open({
                title: '警告',
                content: '暂未开通权限，请联系管理员'
            });
        }
    },
    destroy: function () {

    }
}