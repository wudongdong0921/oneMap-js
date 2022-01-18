////////////////////////////////////////////////
// 业务系统一张图
// 穆松鹤
// 2020-12-11 09:39:03
////////////////////////////////////////////////
import OneMap from '../../../onemap/view/oneMap/component/main';
import BusinessMap from './businessMap'
import './businessStyle.css'
export default  {
    render: function () {
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
            var __OneMap = OneMap.init(this.$el.find('#OneMap'), this.$el.find('#OneMapBox'), {
                useHeader: false, // 是否显示顶部导航
            }, res.data);

            this.workId = this.$query.workid //"HZ918083744dfe7301744f06081603d0"//this.$query.workid
            this.trackId = this.$query.trankid
            this.accessToken = this.$query.accessToken
            this.flowId = this.$query.flowId


            var type = this.workId ? true : false
            var _BusinessMap = new BusinessMap()
            //__OneMap._MapTools.abovePermissions(type)
            //初始查询上图列表并且绘制
            // _BusinessMap.searchBusinessMap(this.workId, __OneMap)
            // //上图
            // __OneMap._MapTools.handleToolUpMap((data, id, callback) => {
            //     this.$api.upMapBusiness({
            //         geometrys: data,
            //         trackId: "",
            //         workId: this.workId
            //     }, (res) => {
            //         if (res.code === 200) {
            //             this.$api.upMapBusinessSearch({
            //                 workId: this.workId
            //             }, (res) => {
            //                 callback && callback()
            //                 _BusinessMap.init(res.data, type, __OneMap, this.workId,() => {
            //                     _BusinessMap.searchBusinessMap(this.workId,__OneMap)
            //                 })
            //             })
            //         }
            //     })

            //     // __OneMap.map.handleToolUpMapControl()
            // })
            var _html = _BusinessMap.render()
            __OneMap.addMainMenu({
                name: '业务上图',
                type: 'event',
                icon: 'oneMapForBusiness',
                event: {
                    html: _html,
                    event: function () {},
                }
            });
            for (let i = 0; i < __OneMap.MineMenu.MineItems.length; i++) {
                var item = __OneMap.MineMenu.MineItems[i]
                if (item.options.icon === "oneMapForBusiness") {
                    __OneMap.MineMenu.MineItems[i].html.click();
                }
            }
            this.$api.openToButton({
                accessToken: this.accessToken,
                workId: this.workId,
                trackId: this.trackId,
            }, (res) => {
                var type
                if (!res.data.flowForms) {
                    type = false
                } else {
                    for (let i = 0; i < res.data.flowForms.length; i++) {
                        var item = res.data.flowForms[i]
                        if (item.formName === '业务系统一张图') {
                            type = item.formAuthId === 'alleditable' ? true : false
                        }
                    }
                    //type = false
                }
                __OneMap._MapTools.abovePermissions(type)
                // __OneMap._MapTools.handleLayerClear(() => {
                //     _BusinessMap.clearBusinessItem()
                //     __OneMap.map.handleClearControl()
                // })
                //初始查询上图列表并且绘制
                _BusinessMap.searchBusinessMap(this.workId, this.flowId, __OneMap)
                //上图
                __OneMap._MapTools.handleToolUpMap((data, id, callback) => {
                    __OneMap.map.deleteBusinessAll()
                    this.$api.upMapBusiness({
                        geometrys: data,
                        trackId: "",
                        workId: this.workId,
                        flowId: this.flowId
                    }, (res) => {
                        if (res.code === 200) {
                            _BusinessMap.searchBusinessMap(this.workId, this.flowId, __OneMap)
                            console.log(callback)
                            callback(true)
                        }
                    })

                    // __OneMap.map.handleToolUpMapControl()
                })

            })

        })
    },
    destroy: function () {},
};