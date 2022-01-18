
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;

    this.title = "平面裁剪";
    this.formConfig = [[{
        type: 'input',
        key: 'aa',
        formlabel: '第一点',
        readonly: true,
    }], [{
        type: 'input',
        key: 'bb',
        formlabel: '第二点',
        readonly: true,
    }], [{
        type: 'input',
        key: 'cc',
        formlabel: '第三点',
        readonly: true,
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
    form.aa.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');
    form.bb.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');
    form.cc.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');

    this.form = form;
    this.hasInitialized = false;
    this.screenSpaceEventHandler = null;
    this.planeClipPolygonHandler = null;
    this.layers = [];
    this.positions = [];
}


item.prototype.clear = function () {
    this.form.set({
        aa: '',
        bb: '',
        cc: ''
    });
    for (var layer of this.layers) {
        layer.clearCustomClipBox();
    }
    this.viewer.entities.getById('plane-clip-point1') && this.viewer.entities.removeById('plane-clip-point1');
    this.viewer.entities.getById('plane-clip-point2') && this.viewer.entities.removeById('plane-clip-point2');
    this.viewer.entities.getById('plane-clip-point3') && this.viewer.entities.removeById('plane-clip-point3');

    this.layers = [];
    this.planeClipPolygonHandler && (this.planeClipPolygonHandler = null);
    this.hasInitialized = false;
};

item.prototype.init = function () {
    this.hasInitialized = false;
    this.screenSpaceEventHandler = null;
    this.planeClipPolygonHandler = null;
    this.layers = [];
    this.positions = [];

    // var scene = this.viewer.scene;
    this.layers = this.viewer.scene.layers.layerQueue;

    this.planeClipPolygonHandler = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);
    this.planeClipPolygonHandler.activeEvt.addEventListener((isActive) => { // 绘制过程中控制光标样式
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
    this.planeClipPolygonHandler.drawEvt.addEventListener((result) => { // 绘制结束事件
        // 显示裁剪面
        this.planeClipPolygonHandler.polygon.show = false;
        this.planeClipPolygonHandler.polyline.show = false;
        // 平面裁剪三点坐标信息
        this.positions = result.object ? result.object.positions : result;

        if (!this.positions) { // 当绘制两个点就异常结束时该值为undefined
            // Util.showErrorMsg("请至少绘制三个点用于构造裁剪面");
            return;
        }

        var cartographic1 = Cesium.Cartographic.fromCartesian(this.positions[0]);
        var longitude1 = Cesium.Math.toDegrees(cartographic1.longitude).toFixed(6);
        var latitude1 = Cesium.Math.toDegrees(cartographic1.latitude).toFixed(6);
        var height1 = cartographic1.height.toFixed(2);

        var cartographic2 = Cesium.Cartographic.fromCartesian(this.positions[1]);
        var longitude2 = Cesium.Math.toDegrees(cartographic2.longitude).toFixed(6);
        var latitude2 = Cesium.Math.toDegrees(cartographic2.latitude).toFixed(6);
        var height2 = cartographic2.height.toFixed(2);

        var cartographic3 = Cesium.Cartographic.fromCartesian(this.positions[2]);
        var longitude3 = Cesium.Math.toDegrees(cartographic3.longitude).toFixed(6);
        var latitude3 = Cesium.Math.toDegrees(cartographic3.latitude).toFixed(6);
        var height3 = cartographic3.height.toFixed(2);

        var point1PositionInfo = '' + longitude1 + ', ' + latitude1 + ', ' + height1;
        var point2PositionInfo = '' + longitude2 + ', ' + latitude2 + ', ' + height2;
        var point3PositionInfo = '' + longitude3 + ', ' + latitude3 + ', ' + height3;

        this.form.set({
            aa: point1PositionInfo,
            bb: point2PositionInfo,
            cc: point3PositionInfo
        });
        this.setClipPlane();
        this.positions = [];
    });

    this.planeClipPolygonHandler && this.planeClipPolygonHandler.polygon && (this.planeClipPolygonHandler.polygon.show = true);
    this.planeClipPolygonHandler && this.planeClipPolygonHandler.polyline && (this.planeClipPolygonHandler.polyline.show = true);
    this.planeClipPolygonHandler.activate();
};

item.prototype.setClipPlane = function () {

    for (var layer of this.layers) {
        layer.clipLineColor = new Cesium.Color(1, 1, 1, 0);
        layer.setCustomClipPlane(this.positions[0], this.positions[1], this.positions[2]);
    }

    this.viewer.entities.getById('plane-clip-point1') && this.viewer.entities.removeById('plane-clip-point1');
    this.viewer.entities.getById('plane-clip-point2') && this.viewer.entities.removeById('plane-clip-point2');
    this.viewer.entities.getById('plane-clip-point3') && this.viewer.entities.removeById('plane-clip-point3');

    var areaClipPoint1 = new Cesium.Entity({
        id: 'plane-clip-point1',
        position: this.positions[0],
        point: {
            color: Cesium.Color.RED,
            pixelSize: 15
        }
    });
    this.viewer.entities.add(areaClipPoint1);

    var areaClipPoint2 = new Cesium.Entity({
        id: 'plane-clip-point2',
        position: this.positions[1],
        point: {
            color: Cesium.Color.RED,
            pixelSize: 15
        }
    });
    this.viewer.entities.add(areaClipPoint2);

    var areaClipPoint3 = new Cesium.Entity({
        id: 'plane-clip-point3',
        position: this.positions[2],
        point: {
            color: Cesium.Color.RED,
            pixelSize: 15
        }
    });
    this.viewer.entities.add(areaClipPoint3);

};




export default item;