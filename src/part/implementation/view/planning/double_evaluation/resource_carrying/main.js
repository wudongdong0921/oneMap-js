////////////////////////////////////////////////
// 开发适宜性评价
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
        this.treeNodeSelect = '';
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
                var analyses = new Analyse({ view: _this,__OneMap:__OneMap })
                __OneMap.elBox.append(analyses.html)
                var suitabillity = new Suitabillity(__OneMap, {}, _this)
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
                var _obj;
                suitabillity.on('treeClick', function (event, treeId, treeNode, xzqhCode) {
                    _this.$el.find('#dirLogView').empty()
                    analyses.isShow()
                    _this.treeNodeSelect = treeNode;
                    if (treeNode.dictValue == null || treeNode.dictValue == '') {
                        var dirLoadView = new DirLoadingView({
                            view: _this,
                            Amap: __OneMap,
                            obj: {
                                adcode: xzqhCode,
                                // adcode: '',
                                syxId: treeNode.id
                            },
                            _obj
                        })
                        _obj = dirLoadView
                        dirLoadView.on('error', function (text) {
                            if (text == '200') {
                                var dirLog = new DirLog({ width: '35%', height: '40%', left: '60%', top: '15%' });
                                _this.$el.find('#dirLogView').append(dirLog.render())
                                dirLog.reset(dirLoadView.render())
                            } else if (text == '500') {
                                top.layer.msg('表或视图不存在，请检查配置！')
                            }
                        })
                        dirLoadView.on('staticOn', function (staticDatas) {
                            _this.$el.find('#analyzeResult').empty()
                            analyses.show(staticDatas, xzqhCode, treeNode.id)
                            analyses.changeLeftView(true)
                        })
                    }
                });
                // 2021-05-13 陈薪名 修改bug HNXGTKJ-1658
                suitabillity.on('xzqhSelect', function (xzqhCode) {
                    if (_this.treeNodeSelect == '') {
                        return;
                    }
                    _this.$el.find('#dirLogView').empty()
                    analyses.isShow()
                    if (_this.treeNodeSelect.dictValue == null || _this.treeNodeSelect.dictValue == '') {
                        var dirLoadView = new DirLoadingView({
                            view: _this,
                            Amap: __OneMap,
                            obj: {
                                adcode: xzqhCode,
                                // adcode: '',
                                syxId: _this.treeNodeSelect.id
                            }
                        })
                        dirLoadView.on('error', function (text) {
                            if (text == '200') {
                                var dirLog = new DirLog({ width: '35%', height: '40%', left: '60%', top: '15%' });
                                _this.$el.find('#dirLogView').append(dirLog.render())
                                dirLog.reset(dirLoadView.render())
                            } else if (text == '500') {
                                top.layer.msg('表或视图不存在，请检查配置！')
                            }
                        })
                        dirLoadView.on('staticOn', function (staticDatas) {
                            _this.$el.find('#analyzeResult').empty()
                            analyses.show(staticDatas,xzqhCode,_this.treeNodeSelect.id)
                            analyses.changeLeftView(true)
                        })
                    }
                });
                // 2021-05-12 陈薪名 修改bug HNXGTKJ-1654
                //监听事件
                var _MapSymbol = __OneMap.elBox[0].childNodes[5];
                var mapSymbolChange = true;
                var mapSymbolChangeIndex = 0;
                _MapSymbol.addEventListener('transitionstart', function (e) {
                    mapSymbolChangeIndex = mapSymbolChangeIndex + 1;
                    if (mapSymbolChangeIndex %2 ==0) {
                        if (mapSymbolChange) {
                            // analyses.changeRightView(true);
                            mapSymbolChange = false;
                        } else {
                            // analyses.changeRightView(false);
                            mapSymbolChange = true;
                        }
                    }
                    e.stopPropagation();
                });
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