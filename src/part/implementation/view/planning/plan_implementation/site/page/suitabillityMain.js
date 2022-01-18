import tabView from '../../../../../../../common/tabLable'; // 引入tab选项卡

var SuitabillityMain = function (options, view) {
    var _this = this;
    this.views = view;
    this.status = 1;
    this.tabConfigIndex = 0;
    this.firstHeight = true;
    this.option = $.extend({}, {
        baseConfigArray: [{
            index: '1',
            title: '分析类型',
            contentId: 'formSelect'
        }, {
            index: '2',
            title: '用地面积',
            contentId: 'areaView'
        }],
        advancedConfig: [{
            index: '1',
            title: '直线距离',
            contentId: 'airLine'
        }, {
            index: '2',
            title: '内含设施',
            contentId: 'include'
        }, {
            index: '3',
            title: '禁止压占现状筛选',
            contentId: 'forbidPressure'
        }],
        tabConfig: {
            itemArray: [{
                lable: '基本配置',
                value: 0,
                id: 'jiben'
            }, {
                lable: '高级筛选',
                value: 1,
                id: 'gaoji'
            }],
            default: 0
        }
    }, options)
    this.map = this.option._Map.map
    this.mapLayers = []
    this.event = {
        resultStatic: function () { }
    };
    this._html = $('<div>' +
        '<div class="suitabillityMain" id="suitabillityMain">' +
        '    <div class="layui-container">' +
        '        <div class="layui-row" style="width: 905px;padding-left: 35px;" id="tabViewLable"> </div>' +
        '        <div id="bodyContent"></div>' +
        '        <div id="bodyContentHeight"></div>' +
        '        <div class="layui-row" style="margin-top: 178px;">' +
        '            <div class="layui-col-md2" id="resultStatic"></div>' +
        '            <div class="layui-col-md1" id="resetBtn"></div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>');
    this.resultStaticBtn = $(' <div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i> 开始分析</div>').appendTo(this._html.find('#resultStatic'));
    this.rsetBtn = $('<div class="layui-btn layui-btn-sm layui-btn-ys"><i class="buttonIcon exchange"></i> 重置</div>').appendTo(this._html.find('#resetBtn'));
    this.rsetBtn.unbind().bind('click', () => {
        // 判断是基本还是高级tab
        if (_this.tabConfigIndex == 0) {
            // 2021-05-10 陈薪名 修改bug HNXGTKJ-1640
            _this.bodyConfig(this.option.baseConfigArray,0);
            _this.baseInit();
            // _this.views.goto('/planning/double_assess/risk')
            // _this.views.goto('/planning/plan_implementation/site');
        } else {
            // 2021-05-10 陈薪名 修改bug HNXGTKJ-1640
            _this.bodyConfig(_this.option.advancedConfig,1);
            _this.heightInit();
        }
    })

    // 初始化body内容
    this.bodyConfig(this.option.baseConfigArray,0);
    this.baseInit();

    // 渲染tab签显示
    this.tabLables = new tabView(this.option.tabConfig)
    this._html.find('#tabViewLable').append(this.tabLables.init())
    // tab标签监听事件
    this.tabLables.on('onClick', function (tabItem) {
        if (tabItem.value == 0) {
            $('#resultStatic').show();
            _this.tabConfigIndex = 0;
            // 2021-05-10 陈薪名 修改bug HNXGTKJ-1619
            $('#bodyContent').show();
            $('#bodyContentHeight').hide();
        } else if (tabItem.value == 1) {
            if (_this.status == 1) {
                top.layer.msg("请进行辅助选址分析！")
                $('#gaoji').removeClass('tab-active');
                $('#jiben').addClass('tab-active');
            } else {
                // tab切换高级时，隐藏，分析按钮
                // 2021-05-10 陈薪名 修改bug HNXGTKJ-1640
                $('#resultStatic').hide();
                _this.tabConfigIndex = 1;
                // 2021-05-10 陈薪名 修改bug HNXGTKJ-1619
                $('#bodyContentHeight').show();
                $('#bodyContent').hide();
                if (_this.firstHeight) {
                    _this.bodyConfig(_this.option.advancedConfig,1);
                    console.log('pppppppppppppppppppppp')
                    _this.heightInit();
                    _this.firstHeight = false;
                }
            }
        }
    })

    this.resultStaticBtn.unbind().bind('click', function () {
        var obj = _this.getBaseData();
        if (obj.selectValue == null) {
            top.layer.msg("请选择分析类型！")
            return false;
        } else if (obj.oneInput == '') {
            top.layer.msg("请输入用地面积！")
            return false;
        } else if (obj.towInput == '') {
            top.layer.msg("请输入用地面积！")
            return false;
        } else if (obj.selectValue == null) {
            top.layer.msg("请选择分析类型！")
            return false;
        }
        _this.event.resultStatic(obj, function (statuss) {
            if (statuss) {
                _this.status = 2;
            } else {
                _this.status = 1;
            }
        })
    })
}

SuitabillityMain.prototype.heightInit = function () {
    var _this = this;
    this.views.$api.getHightConfig({}, (res) => {
        if (res.code !== 200) {
            var handelData = _this.heightDataHandel(res)
            // 渲染选择框
            _this.selectLine = new icu.formElement.select({
                showKey: 'label',
                setKey: 'value',
                getKey: 'value',
                data: handelData.zxjl,
                default: '500',
                onChange: function () {
                    // _this.getHeightData()
                }
            });
            _this._html.find('#airLine').append(_this.selectLine.html);
            // 渲染内含设置
            _this.checkListnhss = new icu.checkList({
                checkAll: false, // 是否显示全选
                getType: 'array',
                showKey: 'label',
                setKey: 'value',
                getKey: 'value',
                // 进行赋值的数组
                data: handelData.nhss,
                //内含设施勾选
                onChange: function () {
                     _this.getHeightData()
                }
            });
            // 默认选中
            // _this.checkListnhss.set(handelData.nhssSelect)
            // 渲染元素
            _this._html.find('#include').append(_this.checkListnhss.html)
            // 渲染禁止压占现状筛选
            _this.checkListyzsx = new icu.checkList({
                checkAll: false, // 是否显示全选
                getType: 'array',
                showKey: 'label',
                setKey: 'value',
                getKey: 'value',
                // 进行赋值的数组
                data: handelData.yzsx,
                //禁止压占现状勾选
                onChange: function () {
                     _this.getHeightData()
                }
            });
            // 默认选中
            // _this.checkListyzsx.set(handelData.yzsxSelect)
            // 渲染元素
            _this._html.find('#forbidPressure').append(_this.checkListyzsx.html)
        }
    });
}

SuitabillityMain.prototype.getHeightData = function () {
    var backData = {}
    var _this = this
    if (this.mapLayers.length !== 0) {
        for (let i = 0; i < this.mapLayers.length; i++) {
            const element = this.mapLayers[i];
            _this.map.map.removeLayer(element);
            _this.map.map.removeSource(element);
        }
        this.mapLayers = []
    }
    _this.selectLine.get((erro, value) => {
        backData['zxjl'] = value
    })
    _this.checkListnhss.get(function (erro, value) {
        backData['nhss'] = value
    });
    _this.checkListyzsx.get(function (erro, value) {
        backData['yzsx'] = value
    });
    backData['']
    this.backDatas = backData
    this.views.analyses.reset(this.views.showDatas, backData, _this)
    _this.renderMap()
}
SuitabillityMain.prototype.renderMap = function (params) {
    // 获取图层数据-渲染
    var _this = this
    var nhss = '';
    var jzyz = "";
    var zxjl = "500"
    if (_this.backDatas) {
        if (_this.backDatas.zxjl && _this.backDatas.zxjl.length !== 0) {
            zxjl = _this.backDatas.zxjl
        }
        if (_this.backDatas.nhss && _this.backDatas.nhss.length !== 0) {
            nhss = _this.backDatas.nhss.join(',')
        }
        if (_this.backDatas.yzsx && _this.backDatas.yzsx.length !== 0) {
            jzyz = _this.backDatas.yzsx.join(',')
        }
    }
    _this.views.$api.advancedFilter({
        "page": 1,
        "limit": 1000000,
        "adcode": _this.views.showDatas.adcode,
        "distance": zxjl,
        "nhss": nhss,
        "jzyz": jzyz,
        "rwId": _this.views.showDatas.rwId
    }, (res) => {
        if (res.code == 200) {
            if (res.data == '该行政区暂无数据！') {
                // 该行政区暂无数据！
            } else {
                for (let j = 0; j < res.data.list.length; j++) {
                    const item = res.data.list[j];
                    _this.addLayer({
                        geoJson: item.smgeometry,
                        id: item.fqmc,
                    });
                    if (j == 2) {
                        _this.fitBounds(res.data.list[0].smgeometry)
                    }
                }
            }
        }
    })
}

SuitabillityMain.prototype.fitBounds = function (data) {
    var _this = this
    const bbox = turf.bbox(JSON.parse(data));
    _this.map.map.fitBounds(bbox, { padding: 50 });
}

SuitabillityMain.prototype.addDataLayer = function (data) {
    var _this = this
    _this.map.addDataLayer(data);
}

SuitabillityMain.prototype.addLayer = function (data) {
    var geoJson = data.geoJson;
    var layerId = "mapView_" + data.id + icu.util.Guid();
    this.mapLayers.push(layerId);
    this.map.map.addSource(layerId, {
        "type": "geojson",
        "data": JSON.parse(geoJson)
    });
    this.map.map.addLayer({
        "id": layerId,
        "type": "fill",
        "source": layerId,
        "paint": {
            "fill-color": "#E7E7E7",
            "fill-outline-color": '#4BBBEE',
        },
    });
    // if (data.length == 1) {
    // };
    // var geoJson = data.geoJson;
    // var center = turf.centerOfMass(geoJson);
    // var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     className: 'popupLayers',
    //     anchor: 'left',
    // }).setLngLat(center.geometry.coordinates).setHTML('<div class="mapPopup_mapMessage"></div>');

    // this.map.on('mouseenter', layerId, (e) => {
    //     this.popupXzbm = data.xzbm;
    //     this.event.getMapLayerMessage(data.xzbm, (res) => {
    //         popup.addTo(this.map);
    //         popup.setHTML(this.renderPopupHtml(res));
    //     })

    // });
    // this.map.on('mouseleave', layerId, () => {
    //     popup.remove();
    //     this.map.setPaintProperty(layerId, 'fill-color', "#E7E7E7");
    // });
}

SuitabillityMain.prototype.heightDataHandel = function (data) {
    var _this = this;
    var obj = {}
    if (data.zxjl.length !== 0) {
        obj['zxjl'] = []
        for (let i = 0; i < data.zxjl.length; i++) {
            const zxjlitem = data.zxjl[i];
            obj['zxjl'].push({ "label": zxjlitem + '米', "value": zxjlitem })
        }
    }
    if (data.nhss.length !== 0) {
        obj['nhss'] = []
        obj['nhssSelect'] = []
        for (let j = 0; j < data.nhss.length; j++) {
            const nhssItem = data.nhss[j];
            obj['nhss'].push({ label: nhssItem.bufferAlName, value: nhssItem.id })
            obj['nhssSelect'].push(nhssItem.id)
        }
    }
    if (data.yzsx.length !== 0) {
        obj['yzsx'] = []
        obj['yzsxSelect'] = []
        for (let j = 0; j < data.yzsx.length; j++) {
            const yzsxitem = data.yzsx[j];
            obj['yzsx'].push({ label: yzsxitem.preemptiveAnalysisName, value: yzsxitem.id })
            obj['yzsxSelect'].push(yzsxitem.id)
        }
    }
    return obj;
}

SuitabillityMain.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};

SuitabillityMain.prototype.render = function () {
    return this._html;
}

// 基本配置初始化
SuitabillityMain.prototype.baseInit = function () {
    // 2021-05-10 陈薪名 修改bug HNXGTKJ-1641
    this._areaView = $(
        '<div id="myAreaView"><div style="display: flex;">' +
        '    <div>' +
        '        <input id="oneInput" spellcheck="false" autocomplete="off" type="number" class="form-control" placeholder="" style="width: 70px;">' +
        '    </div>' +
        '    <div style="margin: 0px 10px;">——</div>' +
        '    <div>' +
        '        <input id="towInput" spellcheck="false" autocomplete="off" type="number" class="form-control" placeholder="" style="width: 70px;">' +
        '    </div>' +
        '</div><div id="areaSelectId" style="width: 100px;margin-top: 20px;"></div></div>'
    ).appendTo(this._html.find('#areaView'))

    this.select = new icu.formElement.select({
        // data: [
        //     { "label": "规划用途分类", "value": "规划用途分类" },
        //     { "label": "06居住用地", "value": "06居住用地" },
        //     { "label": "07公共管理与公共服务设施用地", "value": "07公共管理与公共服务设施用地" },
        //     { "label": "08商服用地", "value": "08商服用地" },
        //     { "label": "09工业用地", "value": "09工业用地" },
        //     { "label": "06-17", "value": "06-17" },
        // ],
        showKey: 'dictLabel', // 根据子对象的数据 对应Key值进行显示
        setKey: 'dictLabel', // 根据子对象的数据 对应Key值进行赋值
        getKey: 'dictValue',  // 根据子对象的数据 队形Key值进行取值
        data: 'OptionSide:GHYTFL',
        default: '规划用途分类'
    });
    this._html.find('#formSelect').append(this.select.html);

    this.selectArea = new icu.formElement.select({
        data: [
            { "label": "亩", "value": "亩" },
            { "label": "公顷", "value": "公顷" },
            { "label": "平方米", "value": "平方米" },
        ],
        default: '亩'
    });
    this._areaView.find('#areaSelectId').append(this.selectArea.html);
}
// 获取基础配置数据
SuitabillityMain.prototype.getBaseData = function () {
    var obj = {
        oneInput: this._html.find('#oneInput').val(),
        towInput: this._html.find('#towInput').val()
    }
    this.select.get((emsg, value) => {
        obj['selectValue'] = value
    });
    this.selectArea.get((emsg, value) => {
        obj['selectAreaValue'] = value
    })
    return obj
}

// body配置生成 type: 0 基本 1高级
SuitabillityMain.prototype.bodyConfig = function (config, type) {
    var _this = this;
    var domId = '';
    if (type == 1) {
        domId = '#bodyContentHeight';
    } else {
        domId = '#bodyContent';
    }
    if (config.length !== 0) {
        this._html.find(domId).empty()
        for (let i = 0; i < config.length; i++) {
            const item = config[i];
            var thisHtml = $('<div class="layui-row" style="margin-top:20px">' +
                '               <div class="layui-col-md3 mainTitle">' +
                '                   <span>' + item.index + '</span>' + item.title +
                '               </div>' +
                '            </div>' +
                '            <div class="layui-row" style="width:190px">' +
                '               <div class="mag-l-20 formSelect" id="' + item.contentId + '"></div>' +
                '            </div>');
            this._html.find(domId).append(thisHtml);
        }
    }
}

export default SuitabillityMain