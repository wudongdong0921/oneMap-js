
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;


    this.title = "地形操作";
    this.formConfig = [[{
        type: 'numberInput',
        key: 'aa',
        formlabel: '地形开挖',
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
    form.aa.html.parent().before('<div class="discript">开挖深度（米）</div>');


    this.form = form;

    this.digPolygon;

};

item.prototype.clear = function () {
    //移除分析的开挖区域
    this.viewer.scene.globe.removeAllExcavationRegion();
    if (this.digPolygon) {
        this.digPolygon.deactivate();
    };

};

item.prototype.init = function () {

    this.digPolygon = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);
    this.digPolygon.activeEvt.addEventListener((isActive) => {
        //开挖激活后改变cursor
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
    this.digPolygon.drawEvt.addEventListener((result) => {
        //计算地形开挖的顶点坐标，经纬度表达
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
        //开挖深度
        var dep = this.form.aa.value;
        this.viewer.scene.globe.removeAllExcavationRegion();
        //开挖参数配置
        this.viewer.scene.globe.addExcavationRegion({
            name: 'excavation',
            position: positions,
            height: dep,
            transparent: false
        });
        //交互绘制线面不显示
        this.digPolygon.polygon.show = false;
        this.digPolygon.polyline.show = false;
        this.digPolygon.deactivate();
    });
    this.digPolygon.activate();


};



export default item;