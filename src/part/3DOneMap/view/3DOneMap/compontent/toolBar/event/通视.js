var item = function (map) {

    this.map = map;
    this.viewer = map.viewer;

    this.title = "通视";
    this.formConfig = [[{
        type: 'input',
        key: 'aa',
        formlabel: '观察者信息',
        readonly: true,
    }], [{
        type: 'Colorpicker',
        key: 'bb',
        formlabel: '可见区域颜色',
        default: '#00c800',
        col: '5_5',
        onChange: () => {
            this.visibleColor();
        },
    }, {
        type: 'Colorpicker',
        key: 'cc',
        formlabel: '不可视颜色',
        default: '#c80000',
        col: '5_5',
        onChange: () => {
            this.hiddenColor();
        },
    }], [{
        type: 'Colorpicker',
        key: 'dd',
        formlabel: '障碍物高亮颜色',
        default: '#ffba01',
        col: '5_5',
    }]];

    this.buttonConifg = [{
        name: '分析',
        event: () => {
            this.init();
        },
        class: "active"
    },
    //  {
    //     name: '高亮障碍物',
    //     event: () => {
    //         this.highlightBarrierEvent();
    //     },
    //     class: ""
    // }, 
    {
        name: '清除',
        event: () => {
            this.clear();
        },
        class: ''
    }];
};

item.prototype.onRender = function (form) {
    form.bb.html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form.aa.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');
    this.sightline;
    this.sightLineHandler;
    this.pointHandler;
    this.pointPosition;
    this.longitude;
    this.latitude;
    this.height;
    this.targetPoint;
    this.clickFlag = 0;
    this.handler;
    this.form = form;
};

// 初始化点击事件
item.prototype.init = function () {
    var sightline = this.sightline;
    var sightLineHandler = this.sightLineHandler;
    var pointHandler = this.pointHandler;
    var pointPosition = this.pointPosition;
    var longitude = this.longitude;
    var latitude = this.latitude;
    var height = this.height;
    var targetPoint = this.targetPoint;
    var clickFlag = this.clickFlag;
    var handler = this.handler;
    var viewer = this.viewer;
    var scene = this.viewer.scene;
    for (var layer of scene.layers.layerQueue) {
        layer.removeAllObjsColor();
    };
    if (!sightline) {
        sightline = this.sightline = new Cesium.Sightline(scene);
        this.sightline.build();
    };
    clickFlag += 1;
    sightline.removeAllTargetPoint();
    sightline.visibleColor = Cesium.Color.fromCssColorString(this.form.bb.html.spectrum("get").toRgbString());
    sightline.hiddenColor = Cesium.Color.fromCssColorString(this.form.cc.html.spectrum("get").toRgbString());
    viewer.entities.removeAll();
    if (handler && !handler.isDestroyed()) {
        handler.destroy();
    }
    this.handler = handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    this.sightLineHandler = sightLineHandler = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Line);
    sightLineHandler.activeEvt.addEventListener(function (isActive) {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            // $('body').removeClass('drawCur').addClass('drawCur');
        }
        else {
            viewer.enableCursorStyle = true;
            // $('body').removeClass('drawCur');
        }
    });
    sightLineHandler.movingEvt.addEventListener(function (windowPosition) {
        sightLineHandler.polyline && (sightLineHandler.polyline.show = false);
    });
    sightLineHandler.drawEvt.addEventListener((result) => {
        var line = result.object;
        var endPoint = line._positions[line._positions.length - 1];
        var ecartographic = Cesium.Cartographic.fromCartesian(endPoint);
        var elongitude = Cesium.Math.toDegrees(ecartographic.longitude);
        var elatitude = Cesium.Math.toDegrees(ecartographic.latitude);
        var eheight = ecartographic.height;
        this.targetPoint = targetPoint = [elongitude, elatitude, eheight];
        sightline.addTargetPoint({
            position: targetPoint,
            name: "point" + new Date()
        });
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    });
    sightLineHandler.activate();
    this.pointHandler = pointHandler = new Cesium.PointHandler(viewer);
    //鼠标点击第一下，调用drawEvt；再点击，调用handler.setInputAction
    pointHandler.drawEvt.addEventListener((result) => {
        var point = result.object;
        point.show = false;
        this.pointPosition = pointPosition = point;
        var position = point.position;
        var cartographic = Cesium.Cartographic.fromCartesian(position);
        this.longitude = longitude = Cesium.Math.toDegrees(cartographic.longitude);
        this.latitude = latitude = Cesium.Math.toDegrees(cartographic.latitude);
        this.height = height = cartographic.height;
        viewer.entities.add({
            position: position,
            point: {
                pixelSize: 10,
                color: Cesium.Color.WHITE
            }
        });
        var sightObservationPlace = longitude.toFixed(4) + ', ' + latitude.toFixed(4) + ', ' + height.toFixed(2);
        this.form.aa.set(sightObservationPlace);
        sightline.viewPosition = [longitude, latitude, height];
        handler.setInputAction(function (evt) {
            sightLineHandler.polyline && (sightLineHandler.polyline.show = false);
            var pick = viewer.scene.pickPosition(evt.position);
            var ecartographic = Cesium.Cartographic.fromCartesian(pick);
            var elongitude = Cesium.Math.toDegrees(ecartographic.longitude);
            var elatitude = Cesium.Math.toDegrees(ecartographic.latitude);
            var eheight = ecartographic.height;
            sightline.addTargetPoint({
                position: [elongitude, elatitude, eheight],
                name: "point" + new Date()
            });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    });
    pointHandler.activate();
};

// 改变可视线颜色
item.prototype.visibleColor = function () {
    var sightline = this.sightline;
    if (!sightline) {
        return;
    }
    var color = Cesium.Color.fromCssColorString(this.form.bb.html.spectrum("get").toRgbString());
    sightline.visibleColor = color;
};

// 改变不可视线颜色
item.prototype.hiddenColor = function () {
    var sightline = this.sightline;
    if (!sightline) {
        return;
    }
    var color = Cesium.Color.fromCssColorString(this.form.cc.html.spectrum("get").toRgbString());
    sightline.hiddenColor = color;
};

// 高亮
item.prototype.highlightBarrierEvent = function () {
    var sightline = this.sightline;
    var sightLineHandler = this.sightLineHandler;
    var pointHandler = this.pointHandler;
    var handler = this.handler;
    var viewer = this.viewer;
    if (sightline) {
        if (sightLineHandler) {
            sightLineHandler.deactivate();
        }
        if (pointHandler) {
            pointHandler.deactivate();
        }
        handler && (!handler.isDestroyed()) && handler.destroy();
        var sightlineHighlightBarrierColor = Cesium.Color.fromCssColorString(this.form.dd.html.spectrum('get').toRgbString());
        for (var index in sightline.getObjectIds()) {
            var layer = viewer.scene.layers.findByIndex(index - 3); // 底层索引从3开始
            layer.setObjsColor(sightline.getObjectIds()[index], sightlineHighlightBarrierColor);
        }
    };
};
// 清除
item.prototype.clear = function () {
    var sightline = this.sightline;
    var sightLineHandler = this.sightLineHandler;
    var pointHandler = this.pointHandler;
    var handler = this.handler;
    var viewer = this.viewer;
    var scene = this.viewer.scene;
    if (sightline) {
        sightline.destroy();
        this.sightline = sightline = undefined;
    };
    sightline && sightline.removeAllTargetPoint();
    for (var layer of scene.layers.layerQueue) {
        layer.removeAllObjsColor();
    };
    if (sightLineHandler) {
        sightLineHandler.deactivate();
    }
    if (pointHandler) {
        pointHandler.deactivate();
    }
    handler && (!handler.isDestroyed()) && handler.destroy();
    viewer.entities.removeAll();
    this.form.set({
        aa: '',
        bb: '#00c800',
        cc: '#c80000',
        dd: '#ffba01',
    });
};
export default item;