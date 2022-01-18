
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;

    this.title = "坡度坡向";
    this.formConfig = [[{
        type: 'select',
        key: 'select',
        formlabel: '分析区域',
        showKey: 'label',
        getKey: 'value',
        setKey: 'value',
        default: 'ARM_REGION',
        data: [
            { label: '指定多边形区域', value: 'ARM_REGION', },
            { label: '全部区域参与分析', value: 'ARM_ALL', },
            { label: '全部区域不参与分析', value: 'ARM_NONE', },
        ],
        onChange: (value) => {
            if (!this.slope) {
                return
            };
            this.wide = Cesium.HypsometricSettingEnum.AnalysisRegionMode[value];
            this.viewer.scene.globe.SlopeSetting = {
                slopeSetting: this.slope,
                analysisMode: this.wide
            };
        },
    }], [{
        type: 'numberInput',
        key: 'wideminR',
        max: 90,
        unit: 0.1,
        default: 0,
        formlabel: '最小坡度',
        onChange: (value) => {
            if (!this.slope || !this.wide) {
                return
            };

            this.slope.MinVisibleValue = value;
            this.viewer.scene.globe.SlopeSetting = {
                slopeSetting: this.slope,
                analysisMode: this.wide
            };

        },
    }], [{
        type: 'numberInput',
        key: 'widemaxR',
        formlabel: '最大坡度',
        max: 90,
        unit: 0.1,
        default: 70,
        onChange: (value) => {
            if (!this.slope || !this.wide) {
                return
            };
            this.slope.MaxVisibleValue = value;
            this.viewer.scene.globe.SlopeSetting = {
                slopeSetting: this.slope,
                analysisMode: this.wide
            };
        },
    }], [{
        type: 'select',
        key: 'cc',
        formlabel: '填充',
        showKey: 'label',
        getKey: 'value',
        setKey: 'value',
        default: 'FACE',
        data: [
            { label: '显示填充颜色', value: 'FACE', },
            { label: '显示坡向箭头', value: 'ARROW', },
            { label: '显示颜色和坡向箭头', value: 'FACE_AND_ARROW', },
        ],
        onChange: (value) => {
            if (!this.slope || !this.wide) {
                return
            };
            this.slope.DisplayMode = Cesium.SlopeSettingEnum.DisplayMode[value];
            this.viewer.scene.globe.SlopeSetting = {
                slopeSetting: this.slope,
                analysisMode: this.wide
            };
        },
    }], [{
        type: 'numberInput',
        key: 'dd',
        formlabel: '透明度',
        max: 1,
        unit: 0.01,
        default: 1,
        onChange: (value) => {
            if (!this.slope || !this.wide) {
                return
            };
            this.slope.Opacity = value;
            this.viewer.scene.globe.SlopeSetting = {
                slopeSetting: this.slope,
                analysisMode: this.wide
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
                this.clear()
            },
            class: ''
        },
    ];
};
item.prototype.onRender = function (form) {
    form['wideminR'].html.parent().parent().prepend('<div class="main_title">坡度分析</div>');
    form['wideminR'].html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });
    form['widemaxR'].html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });

    form.cc.html.parent().parent().prepend('<div class="main_title">显示模式</div>');
    form.cc.html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });
    form.dd.html.parent().parent().find('.layui-form-label').css({ 'padding': '0 0 0 12px' });
    // form.bb.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');
    // form.cc.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');

    this.form = form;
    this.SlopePolygon;
    this.wide;
    this.slope;
};

item.prototype.init = function () {
    var slope = this.slope = new Cesium.SlopeSetting();
    slope.DisplayMode = Cesium.SlopeSettingEnum.DisplayMode[this.form.cc.value];
    slope.MaxVisibleValue = this.form.widemaxR.value;
    slope.MinVisibleValue = this.form.wideminR.value;
    var colorTable = new Cesium.ColorTable();
    colorTable.insert(0, new Cesium.Color(255 / 255, 0 / 255, 0 / 255));
    colorTable.insert(20, new Cesium.Color(221 / 255, 224 / 255, 7 / 255));
    colorTable.insert(30, new Cesium.Color(20 / 255, 187 / 255, 18 / 255));
    colorTable.insert(50, new Cesium.Color(0, 161 / 255, 1));
    colorTable.insert(80, new Cesium.Color(9 / 255, 9 / 255, 255 / 255));
    this.wide = Cesium.HypsometricSettingEnum.AnalysisRegionMode[this.form.select.value];
    slope.ColorTable = colorTable;
    slope.Opacity = this.form.dd.value;
    //交互区域
    this.SlopePolygon = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);
    this.SlopePolygon.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
            this.viewer.enableCursorStyle = false;
            this.viewer._element.style.cursor = '';
            // $('body').removeClass('drawCur').addClass('drawCur');
        }
        else {
            this.viewer.enableCursorStyle = true;
            // $('body').removeClass('drawCur');
        }
    });
    this.SlopePolygon.drawEvt.addEventListener((result) => {
        if (!result.object.positions) {
            this.SlopePolygon.polygon.show = false;
            this.SlopePolygon.polyline.show = false;
            this.SlopePolygon.deactivate();
            this.SlopePolygon.activate();
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
        //坡度坡向分析参数设置
        slope.CoverageArea = positions;
        this.viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: this.wide
        };
        this.SlopePolygon.polygon.show = false;
        this.SlopePolygon.polyline.show = false;
        this.SlopePolygon.deactivate();
    });
    this.SlopePolygon.activate();
};

item.prototype.clear = function () {
    //清理坡度坡向分析结果
    this.viewer.scene.globe.SlopeSetting = {
        analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_NONE
    };
    if (this.SlopePolygon) {
        this.SlopePolygon.polygon.show = false;
        this.SlopePolygon.polyline.show = false;
    };
};

export default item;