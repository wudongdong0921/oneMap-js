////////////////////////////////////////////////
// 进度管理页面
// 吴野
// 2020-10-13 15:00:59
////////////////////////////////////////////////
import tableView from './other_page/table'
import mapView from './other_page/map'
import tabView from './other_page/tab'
import districtLinkage from '../../../../../..//common/districtLinkage' // 三级联动引入<div> <div id="showLisandong">启动</div> </div>

export default {
    renderData: function () {
        return {
            'ghcglxId': '',
            'districtCode': '',
            'type': '',
            'leavel': "2",
            'page': 1,
            'limit': 5,
            tableList: '',
            mapView: ''
        };
    },
    render: function () {
        var html = $(
            `<div>
                <div class="layui-row layui-col-space5">
                    <div class="layui-col-md7">
                        <div class="grid-demo grid-demo-bg1">
                            <div class="layui-row">
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label" style="width:100px">规划成果类型:</label>
                                        <div class="layui-input-block" style="margin-left:120px" id="planningResult"></div>
                                    </div>
                                </div>
                                <div class="layui-col-md6">
                                    <div class="layui-form-item">
                                        <label class="layui-form-label">行政区划:</label>
                                        <div class="layui-input-block" id="area"></div>
                                    </div>
                                </div>                                
                            </div>
                            <div class="mapBox">
                                <ul>
                                    <li><div style="background:#d6cece"></div>制定方案</li>
                                    <li><div style="background:#aaaaaa"></div>建立专家咨询机制</li>
                                    <li><div style="background:#8bb2e7"></div>展开专题研究</li>
                                    <li><div style="background:#5c98e7"></div>完成初步方案</li>
                                    <li><div style="background:#2e7de7"></div>成果汇总</li>
                                    <li><div style="background:#2a5393"></div>成果报批</li>                   
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md5">
                        <div class="grid-demo chartblock" ></div>
                    </div>                  
                </div>
           
                <div class="layui-row layui-col-space5">
                    <div class="layui-col-md12">
                        <div class="grid-demo grid-demo-bg1 tabelbox"></div>
                    </div>                    
                </div>            
            </div>`
        )
        this.$el.find('#scheduleM').append(html)

        this.$api.getPlanResultType(res => {
            var data = [{value:'',label:'- 请选择 -'}],defaultLabel = '- 请选择 -';
            if(res.data && res.data.length > 0){
                this.renderData.ghcglxId = res.data[0].value
                defaultLabel = res.data[0].label;
                data = res.data;
            }
            icu.optionSide.set(res.data, 'PlanResultType');
            var _this = this
            var planningResult = new icu.formElement.select({
                className: '', // 自定义元素样式
                // 目前select只支持非空验证。
                showKey: 'label', // 根据子对象的数据 对应Key值进行显示
                showUnSelect: false,// 是否显示置空项
                // 注 ： 设置置空项后，置空项会默认增加到第一项，下标为 0 ，导致下标取值向后顺延
                setKey: 'label', // 根据子对象的数据 对应Key值进行赋值
                getKey: 'object',  // 根据子对象的数据 队形Key值进行取值
                // 注 getKey 可选值除了 Data的默认值外，还可以使用'object' (获取原对象)， 'setKey'(赋值的字段)
                "default": defaultLabel, // 默认值 可以为下标，或setKey 的对应值
                readonly: false,  // 是否只读

                data: data,
                // 未选择时显示的提示文字
                placeholder: '- 请选择 -',  // 当未选值时,元素显示内容
                onChange: (val) => {
                    console.log(val)
                    _linkage.reset(area.html);
                    _this.renderData.ghcglxId = val.value
                    changeEvent()
                }, // 当值发生改变时,调用方法
                onError: function () { } // 当值发生错误时(不符合验证时),调用方法
            });
            this.$el.find('#planningResult').append(planningResult.html);

            if(this.renderData.ghcglxId){
                initEvent();
            }
        })


        //tab和echart
        var _tabview = new tabView()
        //_tabview.initData('province')
        _tabview.onActiveEvent(data => { //tab点击事件
            if (this.renderData.ghcglxId == '') {
                top.layer.alert("请选择规划成果类型！");
                return
            };
            this.renderData.tableList.onRederData((data) => {
                //重置请求表格参数
                data.page = 1;
                data.pageInfo.index = 1;
            })
            //console.log(data)
            if (data == '县级' && this.renderData.leavel == '3') {
                return
            }
            if (data == '省级') {
                this.renderData.type = 'province'
                var _leavel = 0;

            } else if (data == '市级') {
                this.renderData.type = 'city'
                var _leavel = 1;
            } else {
                this.renderData.type = 'area'
                var _leavel = 2;
            }
            // 

            this.getMapGeojson(this.renderData.districtCode, _leavel, (jsonRes) => {
                // console.log(res);
                this.getinfo({
                    page: 1,
                    limit: 99999,
                }, res => {
                    this.renderData.mapView.renderMapView(jsonRes, res.data.mapInfo);
                });
                this.renderData.tableList.onRederData((data, setTableEvent) => {
                    this.getinfo(data, res => {
                        _tabview.initChart(res.data.scaleChart)
                        console.log(res)
                        setTableEvent({
                            count: res.data.tableList.total,
                            data: res.data.tableList.list,
                        });
                    });
                })

            });
        })

        this.$el.find('.chartblock').append(_tabview.render())

        //超图
        this.renderData.mapView = new mapView()
        this.renderData.mapView.onGetMapLayerMessage((code, callback) => {
            this.getMapInfo(function (res) {
                //console.log(res)
                callback(res);
            });
        });
        this.$el.find('.mapBox').append(this.renderData.mapView.render())
        this.renderData.mapView.init()

        this.renderData.mapView.onClickSelect(data => { //超图点击事件
            console.log(data);
            // console.log(this.renderData.leavel) - 1;
            var _leavel = this.renderData.leavel - 1;
            if (_leavel == 2) {
                return;
            };
            // console.log(_leavel);
            var mapLayersLength = this.renderData.mapView.mapLayers;
            if (mapLayersLength.length == 1) {
                _tabview.childrenlist[1].html.click();
            } else if (mapLayersLength.length > 1) {
                _linkage.set(data.dictValue);
                // changeLinkageEvent(_linkage.codeObject[data.dictValue]);
            };
        })

        //行政区划
        var area = new icu.formElement.input({
            className: "areaInput",
            size: 'normal', // 自定义Class属性
            inputType: 'text', // 可选值 text （文本输入框） password （密码提示框）
            readonly: true,  // 设置是否只读
            placeholder: '请选择行政区划', // 设置未填写输入框时的提示语句

        });
        this.$el.find('#area').append(area.html)
        var linkageEle = this.$el.find('#area');
        var _linkage = new districtLinkage(linkageEle);
        var userData = icu.session.get('userInfo');

        var changeLinkageEvent = (data) => {
            //console.log(data)
            this.renderData.districtCode = data.dictValue
            area.set(_linkage.getShowValue(','));
            if (data.pid == '0') {
                _tabview.initData('province')
                this.renderData.leavel = '1'
            } else {
                if (data.children.length == 0) {
                    this.renderData.leavel = '3'
                    _tabview.initData('area')
                } else {
                    this.renderData.leavel = '2'
                    _tabview.initData('city')
                }
            }
            if (this.renderData.ghcglxId == '') {
                top.layer.alert("请选择规划成果类型！");
                return
            };
            changeEvent()
        }

        var initEvent = () => {
            _linkage.setUserData(userData.areacodeList);
            _linkage.onChange((data) => { //行政区划change事件
                changeLinkageEvent(data);
            });
        }
        var changeEvent = () => {
            this.getChartInfo((option) => {
                _tabview.initChart(option)
            });

            this.getMapInfo((result) => {
                this.getMapGeojson(this.renderData.districtCode, parseInt(this.renderData.leavel) - 1, res => {
                    this.renderData.mapView.renderMapView(res, [result.data]);
                })
            });

            this.renderData.tableList.onRederData((data, setTableEvent) => {
                //重置请求表格参数
                data.page = 1;
                data.pageInfo.index = 1;
                this.getScheduleDetailTable(data, res => {
                    setTableEvent({
                        count: res.data.total,
                        data: res.data.list,
                    });
                })
            })
            if (this.renderData.leavel == '1') {
                _tabview.initData('province')
            } else if (this.renderData.leavel == '3'){
                _tabview.initData('area')
            } else {
                _tabview.initData('city')
            }

        }
        this.$el.find('#area input').unbind().bind('click', () => {
            initEvent()
        })

        //表格
        this.renderData.tableList = new tableView()
        setTimeout(() => {
            this.$el.find('.tabelbox').append(this.renderData.tableList.render())
            this.renderData.tableList.init()
            //this.renderData.tableList.set()
        }, 20);


        setInterval(() => {
            var $div = this.$el.find('div[title="[object Object]"]');
            if($div){
                $div.removeAttr('title');
            }

        }, 200);
    },
    // 获取地图Geojson  getMapData
    getMapGeojson: function (areaCode, type, callback) {
        // getMapData
        if (this.renderData.leavel == '1') {
            if (type == '1') {
                areaCode = areaCode + '_full'
            } else if (type == '2') {
                areaCode = areaCode + '_full_full'
            }
        } else if (this.renderData.leavel == '2') {
            if (type == '2') {
                areaCode = areaCode + '_full'
            }
        }
        this.$api.getMapData(areaCode, type, callback, this.renderData.mapView.loading);
    },
    getinfo: function (data, cb) {
        this.$api.getProgressMap({
            'ghcglxId': this.renderData.ghcglxId,
            'districtCode': this.renderData.districtCode,
            'type': this.renderData.type,
            'leavel': this.renderData.leavel,
            'page': data.page,
            'limit': data.limit
        }, res => {
            var option = []
            if (res.data.scaleChart != null) {

                Object.keys(res.data.scaleChart).forEach(key => {
                    option.push({
                        value: res.data.scaleChart[key],
                        name: key
                    })
                })
                res.data.scaleChart = option

            } else {
                option = [{
                    value: 0,
                    name: '展开专题研究'
                }, {
                    value: 0,
                    name: '完成初步方案'
                }, {
                    value: 0,
                    name: '成果报批'
                }, {
                    value: 0,
                    name: '制定方案'
                }, {
                    value: 0,
                    name: '建立专家咨询机制'
                }, {
                    value: 0,
                    name: '成果汇总'
                }]
                res.data.scaleChart = option
            }
            cb(res)
        })
    },
    getChartInfo: function (cb, code) {
        this.$api.getChartInfo({
            'ghcglxId': this.renderData.ghcglxId,
            'districtCode': code ? code : this.renderData.districtCode,
        }, res => {
            console.log(res);
            if (res.data != null) {
                var option = []
                Object.keys(res.data).forEach(key => {
                    option.push({
                        value: res.data[key],
                        name: key
                    })
                })
                cb(option)
            } else {
                cb([{
                    value: 0,
                    name: '展开专题研究'
                }, {
                    value: 0,
                    name: '完成初步方案'
                }, {
                    value: 0,
                    name: '成果报批'
                }, {
                    value: 0,
                    name: '制定方案'
                }, {
                    value: 0,
                    name: '建立专家咨询机制'
                }, {
                    value: 0,
                    name: '成果汇总'
                }])
            }

        })
    },
    getMapInfo: function (cb, code) {
        this.$api.getMapInfo({
            'ghcglxId': this.renderData.ghcglxId,
            'districtCode': code ? code : this.renderData.districtCode,
        }, res => {
            cb(res)
        })
    },
    getScheduleDetailTable: function (data, cb, code) {
        this.$api.getScheduleDetailTable({
            'ghcglxId': this.renderData.ghcglxId,
            'districtCode': code ? code : this.renderData.districtCode,
            'page': data.page,
            'limit': data.limit
        }, res => {
            cb(res)
        })
    },

    destroy: function () { }
}