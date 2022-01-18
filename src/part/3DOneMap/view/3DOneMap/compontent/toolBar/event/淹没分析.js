
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;


    this.title = "淹没分析";
    this.formConfig = [[{
        type: 'select',
        key: 'ModelType',
        formlabel: '分析模式',
        getKey: 'value',
        setKey: 'value',
        showKey: 'label',
        default: 'terrain',
        data: [
            { label: '模型淹没', value: 'model' },
            { label: '地形淹没', value: 'terrain' }
        ],
    }], [{
        type: 'numberInput',
        key: 'aa',
        max: 99999999999,
        default: 9000,
        formlabel: '最大可见高程(米)',
        onChange: function (value) {
            if (!this.errorMessage) {
            };
        },
    }], [{
        type: 'numberInput',
        key: 'bb',
        max: 99999999999,
        default: 1000,
        formlabel: '最小可见高程(米)',
        onChange: function (value) {
            if (!this.errorMessage) {
            };
        },
    }], [{
        type: 'numberInput',
        key: 'cc',
        formlabel: '透明度',
        max: 1,
        unit: 0.01,
        default: 0.8,
        onChange: function (value) {
            if (!this.errorMessage) {
            };
        },
    }], [{
        type: 'input',
        key: 'dd',
        formlabel: '当前高程(米)',
        default: 0.0,
        readonly: true,
        onChange: function (value) {
            if (!this.errorMessage) {
            };
        },
    }], [{
        type: 'numberInput',
        key: 'ee',
        formlabel: '速度(m/s)',
        max: 99999999999,
        default: 1000,
        onChange: function (value) {
            if (!this.errorMessage) {
            };
        },
    }]];
    // 经度（度）, 纬度（度）, 高程（米）
    this.buttonConifg = [
        {
            name: '分析',
            event: () => {
                this.init();
            },
            class: "active"
        },
        {
            name: '清除',
            event: () => {
                this.clear();
            },
            class: ''
        },
    ];
};
item.prototype.onRender = function (form) {
    // form.aa.html.parent().parent().prepend('<div class="main_title">坡度分析</div>');
    // form.aa.html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });
    // form.bb.html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });

    form.dd.html.parent().parent().prepend('<div class="main_title">播放设置</div>');
    form.dd.html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });
    form.ee.html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });

    // form.bb.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');
    // form.cc.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');

    this.form = form;

    this.hyp;
    this.interval;
    this.floodPolygon;
    this.layers = [];



};
item.prototype.flood = function (positions) {
    var currentHeight = 0;

    var maxValue = parseFloat(this.form.aa.value);
    var minValue = parseFloat(this.form.bb.value);
    var unit = parseFloat(this.form.ee.value);
    var ModelType = this.form.ModelType.value

    this.hyp.MinVisibleValue = minValue;
    currentHeight = minValue;




    var _flood = () => {
        if (currentHeight <= maxValue) {
            this.form.dd.set(currentHeight);
        }
        if (currentHeight > maxValue) {
            clearInterval(this.interval);
            this.floodPolygon.activate();
            return;
        };
        this.hyp.MaxVisibleValue = currentHeight;
        if (ModelType == 'model') {
            for (var layer of this.layers) {
                layer.hypsometricSetting = {
                    hypsometricSetting: this.hyp,
                    analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
                };
            }

        } else if (ModelType == 'terrain') {
            this.hyp.CoverageArea = positions;
            this.viewer.scene.globe.HypsometricSetting = {
                hypsometricSetting: this.hyp,
                analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
            };
        };
        currentHeight += unit / 10;
    };

    this.interval = setInterval(_flood, 100);
    // window.flood = function () {

    // }
};

item.prototype.init = function () {
    this.layers = this.viewer.scene.layers.layerQueue;
    this.hyp = new Cesium.HypsometricSetting();
    this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
    this.hyp._lineColor = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
    this.hyp.MinVisibleValue = 0;
    this.hyp.ColorTableMinKey = 1;
    this.hyp.ColorTableMaxKey = 9000;
    var colorTable = new Cesium.ColorTable();
    colorTable.insert(9000, new Cesium.Color(0, 39 / 255, 148 / 255));
    colorTable.insert(0, new Cesium.Color(149 / 255, 232 / 255, 249 / 255));
    this.hyp.ColorTable = colorTable;
    this.hyp.Opacity = parseFloat(this.form.cc.value);
    this.hyp.LineInterval = 10.0;
    this.floodPolygon = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);


    var ModelType = this.form.ModelType.value

    if (ModelType == 'model') {
        this.flood();
    } else if (ModelType == 'terrain') {
        this.floodPolygon.activeEvt.addEventListener((isActive) => {
            if (isActive == true) {
                this.viewer.enableCursorStyle = false;
                this.viewer._element.style.cursor = '';
            }
            else {
                this.viewer.enableCursorStyle = true;
            }
        });
        this.floodPolygon.drawEvt.addEventListener((result) => {
            if (!result.object.positions) {
                this.floodPolygon.polygon.show = false;
                this.floodPolygon.polyline.show = false;
                this.floodPolygon.deactivate();
                this.floodPolygon.activate();
                return;
            };
            var array = [].concat(result.object.positions);
            var positions = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var cartographic = Cesium.Cartographic.fromCartesian(array[i]);
                var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                var h = cartographic.height;
                if (positions.indexOf(longitude) == -1 && positions.indexOf(latitude) == -1) {
                    positions.push(longitude);
                    positions.push(latitude);
                    positions.push(h);
                }
            }
            this.flood(positions);
            this.floodPolygon.polygon.show = false;
            this.floodPolygon.polyline.show = false;
            this.floodPolygon.deactivate();
        });
        this.floodPolygon.activate();
    };
};
item.prototype.clear = function () {

    if (this.hyp) {
        self.clearInterval(this.interval);
        this.hyp.MaxVisibleValue = 0;
        for (var layer of this.layers) {
            layer.hypsometricSetting = {
                hypsometricSetting: this.hyp,
                analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        };
        this.viewer.scene.globe.HypsometricSetting = {
            hypsometricSetting: this.hyp,
            analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
        };
    }
    if (this.floodPolygon) {
        this.floodPolygon.deactivate();
    };
};



export default item;