
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;

    this.title = "多边形裁剪";
    this.formConfig = [[{
        type: 'select',
        key: 'aa',
        formlabel: '裁剪模式',
        showKey: 'label',
        getKey: 'value',
        setKey: 'value',
        default: 'polygon-clip-outside',
        data: [
            { label: '裁剪外部', value: 'polygon-clip-outside', },
            { label: '裁剪内部', value: 'polygon-clip-inside', },
        ],
        onChange: (value) => {

            this.clipMode = value === 'polygon-clip-inside' ? Cesium.ModifyRegionMode.CLIP_INSIDE : Cesium.ModifyRegionMode.CLIP_OUTSIDE;
            for (var layer of this.layers) {
                layer.setModifyRegions(this.regions, this.clipMode);
            }
        },
    }]];

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

    this.form = form;


    this.form = form;
    this.hasInitialized = false;
    this.polygonClipHandler = null;
    this.layers = [];
    this.regions = [];
    this.clipMode = Cesium.ModifyRegionMode.CLIP_OUTSIDE;

}

item.prototype.clear = function () {

    this.polygonClipHandler && this.polygonClipHandler.clear();
    this.regions = [];
    for (var layer of this.layers) {
        layer.clearModifyRegions();
    }

};

item.prototype.init = function () {
    this.hasInitialized = false;
    this.polygonClipHandler = null;
    this.layers = [];
    this.regions = [];
    this.clipMode = Cesium.ModifyRegionMode.CLIP_OUTSIDE;


    this.layers = this.viewer.scene.layers.layerQueue;
    this.polygonClipHandler = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);
    this.polygonClipHandler.activeEvt.addEventListener((isActive) => { // 绘制过程中控制光标样式
        if (isActive == true) {
            this.viewer.enableCursorStyle = false;
            this.viewer._element.style.cursor = '';
            // $('body').removeClass('drawCur').addClass('drawCur');
        } else {
            this.viewer.enableCursorStyle = true;
            // $('body').removeClass('drawCur');
        }
    });
    this.polygonClipHandler.drawEvt.addEventListener((result) => {
        this.polygonClipHandler.polygon.show = false;
        this.polygonClipHandler.polyline.show = false;
        var positions = [];
        this.clipMode = this.form.aa.value === 'polygon-clip-inside' ? Cesium.ModifyRegionMode.CLIP_INSIDE : Cesium.ModifyRegionMode.CLIP_OUTSIDE;
        for (var pt of result.object.positions) {
            var cartographic = Cesium.Cartographic.fromCartesian(pt);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            positions.push(longitude, latitude, height);
        }
        this.regions = [];
        this.regions.push(positions);
        for (var layer of this.layers) {
            layer.setModifyRegions(this.regions, this.clipMode);
        }
    });
    // $('#polygon-clip-mode').on('propertychange input', () => {

    // });
    this.hasInitialized = true;
    this.polygonClipHandler.activate();

};




export default item;