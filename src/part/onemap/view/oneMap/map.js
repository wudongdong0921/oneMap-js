////////////////////////////////////////////////
// 一张图页面
// 穆松鹤
// 2020-09-22 11:43:45
////////////////////////////////////////////////

import OneMap from './component/main'
import api from './apis/map'
import menuData from "./apis/menuJson"
import Extend from '../extend/index'

export default {
    render: function () {
        window.mapView = this; //获取主main渲染元素
        var _self = this
        var getMapList = function () {
            return new Promise((resolve, reject) => {
                _self.$api.getMapAllList((res) => {
                    resolve(res)
                })
            })
        }
        this.$api.getUserMenu({}, (res) => {
            for (const key in config.oneMapMapping) {
                if (config.oneMapMapping.hasOwnProperty(key)) {
                    const element = config.oneMapMapping[key];
                    for (let i = 0; i < res.data.length; i++) {
                        const _item = res.data[i];
                        if (_item.id == element) {
                            _item.router = key;
                        };
                    };
                }
            };
            getMapList().then(result => {
                _self._OneMap = OneMap.init(this.$el.find('#OneMap'), this.$el.find('#OneMapBox'), {
                    useHeader: false, // 是否显示顶部导航
                }, res.data, result.data);

            })
            this.components()

        })
        // OneMap.init(this.$el.find('#OneMap'), this.$el.find('#OneMapBox'), {
        //     useHeader: false, // 是否显示顶部导航
        // }, menuData);
    },
    components: function () {
        this.$api.getCommonData((res) => {
            if(res.data.docList.length > 0) {
                let extendPage = new Extend();
                let ivew = extendPage.render('/file/main',{},res.data.docList);
                this._OneMap.addMainMenu({
                    name: '文档管理',
                    type: 'event',
                    icon: 'oneMapForBusiness',
                    event: {
                        html: $(ivew.render()),
                        event: function () { },
                    }
                });
            }

            if(res.data.openStatis == 1) {
                let extendPage = new Extend();
                let ivew = extendPage.render('/static/main');
                this._OneMap.addMainMenu({
                    name: '数据统计',
                    type: 'event',
                    icon: 'DatumStatistics',
                    event: {
                        html: $(ivew.render()),
                        event: function () { },
                    }
                });
            }
        })

    },
    destroy: function () { },
};
