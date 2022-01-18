
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;


    this.title = "可视域";
    this.formConfig = [[{
        type: 'input',
        key: 'aa',
        formlabel: '观察者信息',
        readonly: true,
    }], [{
        type: 'numberInput',
        key: '附加高度',
        formlabel: '附加高度(米)',
        col: '5_5',
        max: 999999999999,
        unit: 1,
        min: 1,
        default: 1.8,
        onChange: (value) => {
            this.changeHeightView(value);
        },
    }, {
        type: 'numberInput',
        key: '可视距离',
        formlabel: '可视距离(米)',
        col: '5_5',
        max: 999999999999,
        unit: 0.1,
        min: 1,
        default: 1.0,
        onChange: (value) => {
            if (!this.viewshed3D) {
                return
            };
            var _value = value;
            if (Number(_value) < 0.1) {
                _value = 0.1;
                this.form['可视距离'].set("0.1");
            }
            this.viewshed3D.distance = Number(_value);
        },
    }], [{
        type: 'numberInput',
        key: '方向角',
        formlabel: '方向角(度)',
        col: '5_5',
        max: 360,
        unit: 1,
        min: 0,
        default: 0.0,
        onChange: (value) => {
            if (!this.viewshed3D) {
                return
            };
            var _value = value;
            if (!_value) {
                this.form['方向角'].set('0');
            }
            this.viewshed3D.direction = parseFloat(_value);
        },
    }, {
        type: 'numberInput',
        key: '俯仰角',
        formlabel: '俯仰角(度)',
        col: '5_5',
        max: 360,
        unit: 1,
        min: 0,
        default: 0.0,
        onChange: (value) => {
            if (!this.viewshed3D) {
                return
            };
            var _value = value;
            if (!_value) {
                this.form['俯仰角'].set('0');
            }
            this.viewshed3D.pitch = parseFloat(_value);
        },
    }], [{
        type: 'numberInput',
        key: '水平视角',
        formlabel: '水平视角(度)',
        col: '5_5',
        max: 360,
        unit: 1,
        min: 0,
        default: 90,
        onChange: (value) => {
            if (!this.viewshed3D) {
                return
            };
            var _value = value;
            if (Number(_value) < 1) {
                _value = 1;
                this.form['水平视角'].set("1");
            }
            this.viewshed3D.horizontalFov = parseFloat(_value);
        },
    }, {
        type: 'numberInput',
        key: '垂直视角',
        formlabel: '垂直视角(度)',
        col: '5_5',
        max: 360,
        unit: 1,
        min: 0,
        default: 60,
        onChange: (value) => {
            if (!this.viewshed3D) {
                return
            };
            var _value = value;
            if (Number(_value) < 1) {
                _value = 1;
                this.form['垂直视角'].set("1");
            }
            this.viewshed3D.verticalFov = parseFloat(_value);

        },
    }], [{
        type: 'Colorpicker',
        key: '可见区域颜色',
        formlabel: '可见区域颜色',
        default: '#00c800',
        col: '5_5',
        onChange: (value) => {
            if (!this.viewshed3D) {
                return
            };
            var color = Cesium.Color.fromCssColorString(this.form['可见区域颜色'].html.spectrum("get").toRgbString());
            this.viewshed3D.visibleAreaColor = color;
        },
    }, {
        type: 'Colorpicker',
        key: '不可视颜色',
        formlabel: '不可视颜色',
        default: '#c80000',
        col: '5_5',
        onChange: () => {
            if (!this.viewshed3D) {
                return
            };
            var color = Cesium.Color.fromCssColorString(this.form['不可视颜色'].html.spectrum("get").toRgbString());
            this.viewshed3D.hiddenAreaColor = color;
        },
    }]];

    this.buttonConifg = [{
        name: '分析',
        event: () => {
            this.init();
        },
        class: "active"
    }, {
        name: '清除',
        event: () => {
            this.clear();
        },
        class: ''
    }];

};

item.prototype.onRender = function (form) {
    form['可见区域颜色'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form['附加高度'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form['方向角'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form['水平视角'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form.aa.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');

    this.viewshed3D;
    this.point;
    this.vsPointHandler;
    this.clickFlag = 0;
    this.clickCount = 0;
    this.originViewshedObservationPlace = null;
    this.form = form;
};
item.prototype.changeHeightView = function (value) {
    if (!this.originViewshedObservationPlace || !this.viewshed3D) {
        return;
    }
    var longitude = this.originViewshedObservationPlace.longitude;
    var latitude = this.originViewshedObservationPlace.latitude;
    if (value === "") {
        // 避免删除导致崩溃
        value = "0.0";
    }
    var height = this.originViewshedObservationPlace.height + parseFloat(value);
    var cartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
    this.point.position = cartesian;
    this.viewshed3D.viewPosition = [longitude, latitude, height];
};


item.prototype.init = function () {
    var scene = this.viewer.scene;
    this.clickFlag += 1;
    this.clickCount = 0;
    if (!this.viewshed3D) {
        this.viewshed3D = new Cesium.ViewShed3D(scene);
    }
    this.vsPointHandler && this.vsPointHandler.clear();
    this.viewshed3D.distance = 0.1;
    this.viewshed3D.visibleAreaColor = Cesium.Color.fromCssColorString(this.form['可见区域颜色'].html.spectrum("get").toRgbString());
    this.viewshed3D.hiddenAreaColor = Cesium.Color.fromCssColorString(this.form['不可视颜色'].html.spectrum("get").toRgbString());
    var viewPosition;
    scene.viewFlag = true;
    this.vsPointHandler = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Point, Cesium.ClampMode.Space);
    this.vsHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    this.vsHandler.setInputAction((e) => {
        // 若此标记为false，则激活对可视域分析对象的操作
        if (!scene.viewFlag) {
            // 获取鼠标屏幕坐标,并将其转化成笛卡尔坐标
            var position = e.endPosition;
            var last = scene.pickPosition(position);
            // 计算该点与视口位置点坐标的距离
            var distance = Cesium.Cartesian3.distance(viewPosition, last);
            if (distance > 0) {
                var cartographic = Cesium.Cartographic.fromCartesian(last);
                var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                var height = cartographic.height;
                this.viewshed3D.setDistDirByPoint([longitude, latitude, height]);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this.vsHandler.setInputAction((e) => {
        if (!scene.viewFlag) {
            scene.viewFlag = true;
            this.form.set({
                '可视距离': this.viewshed3D.distance.toFixed(2),
                '方向角': this.viewshed3D.direction.toFixed(2),
                '俯仰角': this.viewshed3D.pitch.toFixed(2),
                '水平视角': this.viewshed3D.horizontalFov.toFixed(2),
                '垂直视角': this.viewshed3D.verticalFov.toFixed(2),
            });
        }
        this.vsHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    this.vsPointHandler.drawEvt.addEventListener((result) => {
        this.point = result.object;
        var position = this.point.position;
        viewPosition = position;
        var cartographic = Cesium.Cartographic.fromCartesian(position);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var height = cartographic.height;
        this.originViewshedObservationPlace = { longitude, latitude, height };
        var pointPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height + parseFloat(this.form['附加高度'].value));
        this.point.position = pointPosition;
        var viewshedObservationPlace = longitude.toFixed(4) + ', ' + latitude.toFixed(4) + ', ' + height.toFixed(2);
        this.form.aa.set(viewshedObservationPlace);
        if (scene.viewFlag) {
            this.viewshed3D.viewPosition = [longitude, latitude, height + parseFloat(this.form['附加高度'].value)];
            this.viewshed3D.build();
            scene.viewFlag = false;
        }
    });

    this.vsPointHandler.activate();
};


item.prototype.clear = function () {
    var scene = this.viewer.scene;
    scene.viewFlag = true;
    if (this.vsPointHandler) {
        this.vsPointHandler && this.vsPointHandler.clear();
        this.vsPointHandler.deactivate();
    };
    if (this.viewshed3D) {
        this.viewshed3D.destroy();
        this.viewshed3D = undefined;
    };
    this.form.set({
        aa: '',
        '附加高度': '1.8',
        '可视距离': '1.0',
        '方向角': '0.0',
        '俯仰角': '0.0',
        '水平视角': '90',
        '垂直视角': '60',
        '可见区域颜色': '#00c800',
        '不可视颜色': '#c80000',
    });
};









export default item;