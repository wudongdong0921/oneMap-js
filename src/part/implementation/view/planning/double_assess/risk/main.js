////////////////////////////////////////////////
// 风险识别
// 吴野
// 2020-12-11 15:27:14
////////////////////////////////////////////////
// import OneMap from '../../oneMap/map'

import $OneMap from '../../../../../onemap/view/oneMap/component/main';
import Suitabillity from './page/suitabillity'
import DirLoadingView from './page/dirLoading'
import DirLog from '../../component/dirLogView'
import Analyse from './page/analyse'
export default {
    renderData: function () {
        return {}
    },
    render: function () {
        var _this = this;
        var getMapList = function() {
            return new Promise((resolve,reject) => {
                _this.$api.getMapAllList((res) => {
                    console.log(res)
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
                var __OneMap = $OneMap.init(this.$el.find('#OneMap'), this.$el.find('#OneMapBox'), {
                    useHeader: false, // 是否显示顶部导航
                }, res.data,result.data);
                var analyses = new Analyse()
                __OneMap.elBox.append(analyses.html)
                var suitabillity = new Suitabillity(__OneMap, {} ,analyses,_this)
                var __html = suitabillity.render()
                __OneMap.addMainMenu({
                    name: '业务上图',
                    type: 'event',
                    icon: 'oneMapForBusiness',
                    event: {
                        html: $(__html),
                        event: function () { },
                    }
                });
                suitabillity.on('treeClick', function () {
                    var dirLoadView = new DirLoadingView()
                    var dirLog = new DirLog({ width: '35%', height: '40%', left: '60%', top: '15%' });
                    _this.$el.find('#dirLogView').append(dirLog.render())
                    dirLog.reset(dirLoadView.render())
                    dirLoadView.on('staticOn',function(){
                        analyses.show()
                        analyses.changeLeftView(true)
                    })
                })
                for (var i = 0; i < __OneMap.MineMenu.MineItems.length; i++) {
                    var item = __OneMap.MineMenu.MineItems[i];
                    if (item.options.name == "业务分析") {
                        item.html.hide();
                    }
                    if (item.options.name == "业务上图") {
                        $(item.html).click();
                    }
                    if (item.options.name == "业务查询") {
                        item.html.hide();
                    }
                }
            })
            
        })
    },
    destory: function () { }
}