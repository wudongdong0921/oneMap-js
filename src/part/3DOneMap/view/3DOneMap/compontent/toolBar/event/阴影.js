var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;

    this.title = "阴影";
    this.formConfig = [[{
        type: 'inputDate',
        key: 'aa',
        formlabel: '日期选择',
        default: new Date(),
        verify: {  // rules 对象 参照多规则验证集合文档 中的说明进行设置
            text: '日期选择',
            rules: 'notNull'
        },
    }], [{
        type: 'select',
        key: 'startDate',
        formlabel: '开始时间',
        col: '5_5',
        setKey: 'value',
        getKey: 'value',
        showKey: 'label',
        default: '10',
        data: [
            { label: '0:00', value: '0' },
            { label: '2:00', value: '2' },
            { label: '4:00', value: '4' },
            { label: '6:00', value: '6' },
            { label: '8:00', value: '8' },
            { label: '10:00', value: '10' },
            { label: '12:00', value: '12' },
            { label: '14:00', value: '14' },
            { label: '16:00', value: '16' },
            { label: '18:00', value: '18' },
            { label: '20:00', value: '20' },
            { label: '22:00', value: '22' }
        ],
    }, {
        type: 'select',
        key: 'endDate',
        formlabel: '结束时间',
        col: '5_5',
        setKey: 'value',
        getKey: 'value',
        showKey: 'label',
        default: '14',
        data: [
            { label: '0:00', value: '0' },
            { label: '2:00', value: '2' },
            { label: '4:00', value: '4' },
            { label: '6:00', value: '6' },
            { label: '8:00', value: '8' },
            { label: '10:00', value: '10' },
            { label: '12:00', value: '12' },
            { label: '14:00', value: '14' },
            { label: '16:00', value: '16' },
            { label: '18:00', value: '18' },
            { label: '20:00', value: '20' },
            { label: '22:00', value: '22' }
        ],
        onChange: (value) => {
            if (!this.shadowQuery) {
                return
            };
            this.setCurrentTime();
        },
    }], [{
        type: 'numberInput',
        key: 'bottomHeight',
        formlabel: '底部高程(米)',
        col: '5_5',
        max: 999999999999,
        unit: 10,
        min: 0,
        default: 25,
        onChange: (value) => {
            if (!this.shadowQuery) {
                return
            };

            if (value === "") {
                value = '0.0'
            }
            var bh = Number(value);
            var eh = Number(this.form.extrudeHeight.value);
            this.shadowQuery.qureyRegion({
                position: this.points,
                bottom: bh,
                extend: eh
            });
        }
    }, {
        type: 'numberInput',
        key: 'extrudeHeight',
        formlabel: '拉伸高度(米)',
        col: '5_5',
        max: 999999999999,
        unit: 10,
        min: 0,
        default: 20,
        onChange: (value) => {
            if (!this.shadowQuery) {
                return
            };
            if (value === "") {
                value = '0.0'
            }
            var bh = Number(this.form.bottomHeight.value);
            var eh = Number(value);
            this.shadowQuery.qureyRegion({
                position: this.points,
                bottom: bh,
                extend: eh
            });
        }
    }]];


    this.buttonConifg = [{
        name: '阴影',
        event: () => {
            this.init();
        },
        class: "active"
    }, {
        name: '日期效果',
        event: () => {
            this.sunlight();
        },
        class: ''
    }, {
        name: '清除',
        event: () => {
            this.remove();
        },
        class: ''
    }];
};
item.prototype.onRender = function (form) {
    form['bottomHeight'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form['startDate'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    this.form = form;
    form['aa'].html.attr('readonly', 'readonly');
    this.shadowQuery;
    this.handlerPolygon;
    this.positions;
    this.points = [];




}

item.prototype.init = function () {
    if (this.viewer.shadows == false) {
        this.viewer.shadows = true;//开启场景阴影
    }
    var scene = this.viewer.scene;
    var layers = scene.layers.layerQueue;

    for (var i = 0; i < layers.length; i++) {
        layers[i].shadowType = 2;
        layers[i].refresh();
    }
    //创建阴影查询对象
    if (!this.shadowQuery) {
        this.shadowQuery = new Cesium.ShadowQueryPoints(scene);
        this.shadowQuery.build();
    }

    this.setCurrentTime();
    this.handlerPolygon = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);
    this.handlerPolygon.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
            this.viewer.enableCursorStyle = false;
            this.viewer._element.style.cursor = '';
            // $('body').removeClass('drawCur').addClass('drawCur');
        } else {
            this.viewer.enableCursorStyle = true;
            // $('body').removeClass('drawCur');
        }
    });
    this.points = [];

    this.handlerPolygon.drawEvt.addEventListener((result) => {
        this.points.length = 0;
        var polygon = result.object;
        if (!polygon) {
            return;
        }
        polygon.show = false;
        this.handlerPolygon.polyline.show = false;
        this.positions = [].concat(polygon.positions);
        this.positions = Cesium.arrayRemoveDuplicates(this.positions, Cesium.Cartesian3.equalsEpsilon);
        //遍历多边形，取出所有点
        for (var i = 0, len = this.positions.length; i < len; i++) {
            //转化为经纬度，并加入至临时数组
            var cartographic = Cesium.Cartographic.fromCartesian(polygon.positions[i]);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            this.points.push(longitude);
            this.points.push(latitude);
        }
        //设置分析对象的开始结束时间
        var dateValue = this.form['aa'].html.val();
        var startTime = new Date(dateValue);
        startTime.setHours(Number(this.form['startDate'].value));
        this.shadowQuery.startTime = Cesium.JulianDate.fromDate(startTime);

        var endTime = new Date(dateValue);
        endTime.setHours(Number(this.form['endDate'].value));
        this.shadowQuery.endTime = Cesium.JulianDate.fromDate(endTime);

        //设置当前时间
        this.setCurrentTime();

        this.shadowQuery.spacing = 10;
        this.shadowQuery.timeInterval = 60;

        //设置分析区域、底部高程和拉伸高度
        var bh = Number(this.form.bottomHeight.value);
        var eh = Number(this.form.extrudeHeight.value);
        this.shadowQuery.qureyRegion({
            position: this.points,
            bottom: bh,
            extend: eh
        });
        this.shadowQuery.build();
    });
    this.handlerPolygon.deactivate();
    this.handlerPolygon.activate();
};
item.prototype.remove = function () {
    if (this.handlerPolygon) {
        this.handlerPolygon.deactivate();
    };
    this.viewer.entities.removeAll();
    var layers = this.viewer.scene.layers.layerQueue;
    for (var i = 0; i < layers.length; i++) {
        layers[i].shadowType = 0;
    }
    if (this.shadowQuery) {
        this.shadowQuery.qureyRegion({
            position: [0, 0],
            bottom: 0,
            extend: 0
        });
        this.shadowQuery = undefined;
    };
};

item.prototype.animation = function () {
    var dateVal = this.form['aa'].html.val();
    var startTime = new Date(dateVal);
    var shour = Number(this.form['startDate'].value);
    var ehour = Number(this.form['endDate'].value);
    var layers = this.viewer.scene.layers.layerQueue;
    for (var i = 0; i < layers.length; i++) {
        layers[i].shadowType = 0;
    }
    if (shour > ehour) {
        return;
    }
    var nTimer = 0.0;
    var nIntervId = setInterval(() => {
        if (shour < ehour) {
            startTime.setHours(shour);
            startTime.setMinutes(nTimer);
            this.viewer.clock.currentTime = Cesium.JulianDate.fromDate(startTime);
            nTimer += 10.0;
            if (nTimer > 60.0) {
                shour += 1.0;
                nTimer = 0.0;
            }
        } else {
            clearInterval(nIntervId);
        }
    }, 20);
};

item.prototype.sunlight = function () {
    if (this.viewer.shadows == false) {
        this.viewer.shadows = true;//开启场景阴影

        var scene = this.viewer.scene;
        var layers = scene.layers.layerQueue;

        for (var i = 0; i < layers.length; i++) {
            layers[i].shadowType = 2;
            layers[i].refresh();
        }
        if (!this.shadowQuery) {
            this.shadowQuery = new Cesium.ShadowQueryPoints(scene);
            this.shadowQuery.build();
        };
        setTimeout(() => {
            this.animation();
        }, 1500);
    } else {
        this.animation();
    };
    // this.setCurrentTime();
    // this.remove();








};

item.prototype.clear = function () {
    this.remove();
    if (!this.handlerPolygon) {
        return;
    } else {
        this.handlerPolygon.deactivate();
    }
    var layers = this.viewer.scene.layers.layerQueue;
    for (var i = 0; i < layers.length; i++) {
        layers[i].shadowType = 0;
    }
    if (this.shadowQuery) {
        this.shadowQuery.qureyRegion({
            position: [0, 0],
            bottom: 0,
            extend: 0
        });
        this.shadowQuery.destroy();
        this.shadowQuery = undefined;
    };
};
item.prototype.setCurrentTime = function () {
    var endTime = new Date(this.form['aa'].html.val());
    endTime.setHours(Number(this.form['endDate'].value));
    this.viewer.clock.currentTime = Cesium.JulianDate.fromDate(endTime);
    this.viewer.clock.multiplier = 1;
    this.viewer.clock.shouldAnimate = true;
};


export default item;