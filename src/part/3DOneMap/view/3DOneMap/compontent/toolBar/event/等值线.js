
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;



    this.title = "等值线";
    this.formConfig = [[{
        type: 'numberInput',
        key: 'aa',
        formlabel: '最大可见高程(米)',
        max: 99999999999,
        default: '9000',
        onChange: (value) => {
            this.ChangeMaxVisibleValue();
        },
    }], [{
        type: 'numberInput',
        key: 'bb',
        formlabel: '最小可见高程',
        max: 99999999999,
        default: '0.0',
        onChange: (value) => {
            this.ChangeMinVisibleValue();
        },
    }], [{
        type: 'numberInput',
        key: 'cc',
        formlabel: '等值距(米)',
        default: 100,
        max: 99999999999,
        onChange: (value) => {
            this.changeLineInterval();
        },
    }], [{
        type: 'Colorpicker',
        key: 'dd',
        formlabel: '线颜色',
        default: '#3ef5d8',
        onChange: (value) => {
            this.changeLineColor();
        },
    }], [{
        type: 'select',
        key: 'ee',
        formlabel: '显示模式',
        showKey: 'label',
        getKey: 'value',
        setKey: 'value',
        default: 'Line',
        data: [
            { label: '等高线填充', value: 'Line', },
            { label: '等高面填充', value: 'Region', },
            { label: '等高线面填充', value: 'Line_Region', },
            { label: '无颜色表', value: 'None', },
        ],
        onChange: (value) => {
            this.ChangeFillOptions();
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
    this.hyp;
    this.fillPolygon;
}

item.prototype.init = function () {
    this.hyp = new Cesium.HypsometricSetting();
    // this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode[this.from.ee.value == 'None'];
    this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.LINE;
    this.hyp._lineColor = Cesium.Color.fromCssColorString(this.form.dd.value);
    this.hyp.LineInterval = parseFloat(this.form.cc.value);
    this.hyp.MaxVisibleValue = parseFloat(this.form.aa.value);
    this.hyp.MinVisibleValue = parseFloat(this.form.bb.value);
    this.hyp.ColorTableMinKey = 2736.88110351563;
    this.hyp.ColorTableMaxKey = 5597.06640625;

    //建立颜色表
    var colorTable = new Cesium.ColorTable();
    colorTable.insert(5597.06640625, new Cesium.Color(0, 0, 255 / 255));
    colorTable.insert(5406.3873860677086, new Cesium.Color(0, 51 / 255, 255 / 255));
    colorTable.insert(5215.7083658854172, new Cesium.Color(0, 102 / 255, 255 / 255));
    colorTable.insert(5025.0293457031257, new Cesium.Color(0, 153 / 255, 255 / 255));
    colorTable.insert(4834.3503255208343, new Cesium.Color(0, 204 / 255, 255 / 255));
    colorTable.insert(4643.6713053385429, new Cesium.Color(0, 255 / 255, 255 / 255));
    colorTable.insert(4452.9922851562524, new Cesium.Color(51 / 255, 255 / 255, 204 / 255));
    colorTable.insert(4262.3132649739609, new Cesium.Color(102 / 255, 255 / 255, 153 / 255));
    colorTable.insert(4071.6342447916695, new Cesium.Color(153 / 255, 255 / 255, 102 / 255));
    colorTable.insert(3880.9552246093781, new Cesium.Color(204 / 255, 255 / 255, 51 / 255));
    colorTable.insert(3690.2762044270867, new Cesium.Color(255 / 255, 255 / 255, 0));
    colorTable.insert(3499.5971842447952, new Cesium.Color(255 / 255, 204 / 255, 0));
    colorTable.insert(3308.9181640625038, new Cesium.Color(255 / 255, 153 / 255, 0));
    colorTable.insert(3118.2391438802129, new Cesium.Color(255 / 255, 102 / 255, 0));
    colorTable.insert(2927.5601236979214, new Cesium.Color(255 / 255, 51 / 255, 0));
    colorTable.insert(2736.88110351563, new Cesium.Color(255 / 255, 0, 0));
    this.hyp.ColorTable = colorTable;
    this.hyp.Opacity = 1;

    //交互绘制
    this.fillPolygon = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0);
    this.fillPolygon.activeEvt.addEventListener((isActive) => {
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
    this.fillPolygon.drawEvt.addEventListener((result) => {
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

        //分析区域为指定区域
        this.hyp.CoverageArea = positions;
        this.ChangeFillOptions();


        this.fillPolygon.polygon.show = false;
        this.fillPolygon.polyline.show = false;
    });
    this.fillPolygon.activate();


};

item.prototype.clear = function () {
    this.viewer.scene.globe.HypsometricSetting = undefined;
    this.hyp && (this.hyp.MaxVisibleValue = -1000);
    this.hyp && (this.hyp.MinVisibleValue = -1000);
    // if (this.fillPolygon) {
    //     this.fillPolygon && this.fillPolygon.clear();
    //     this.fillPolygon.deactivate();
    // };

    // this.form.set({
    //     aa: '9000',
    //     bb: '0.0',
    //     cc: '100',
    //     dd: '#3ef5d8',
    //     ee: 'Line'
    // });

};



item.prototype.ChangeFillOptions = function () {
    if (!this.hyp) {
        return;
    };
    switch (this.form.ee.value) {
        case 'None': this.viewer.scene.globe.HypsometricSetting = undefined; break;
        case 'Line': {
            this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.LINE;
            this.viewer.scene.globe.HypsometricSetting = {
                hypsometricSetting: this.hyp,
                analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
            };
        }
            break;
        case 'Region': {
            this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            this.viewer.scene.globe.HypsometricSetting = {
                hypsometricSetting: this.hyp,
                analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
            };
        }
            break;
        case 'Line_Region': {
            this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE_AND_LINE;
            this.viewer.scene.globe.HypsometricSetting = {
                hypsometricSetting: this.hyp,
                analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
            };
        }
            break;
        default: break;
    };
};

item.prototype.ChangeMaxVisibleValue = function () {
    if (!this.hyp) {
        return;
    };
    this.hyp.MaxVisibleValue = parseFloat(this.form.aa.value);
    this.viewer.scene.globe.HypsometricSetting = {
        hypsometricSetting: this.hyp,
        analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
};


item.prototype.ChangeMinVisibleValue = function () {
    if (!this.hyp) {
        return;
    };
    this.hyp.MinVisibleValue = parseFloat(this.form.bb.value);
    this.viewer.scene.globe.HypsometricSetting = {
        hypsometricSetting: this.hyp,
        analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
};

item.prototype.changeLineInterval = function () {
    if (!this.hyp) {
        return;
    };
    this.hyp.LineInterval = parseFloat(this.form.cc.value);
    this.viewer.scene.globe.HypsometricSetting = {
        hypsometricSetting: this.hyp,
        analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };

}
item.prototype.changeLineColor = function () {
    this.hyp._lineColor = Cesium.Color.fromCssColorString(this.form.dd.value);
    this.viewer.scene.globe.HypsometricSetting = {
        hypsometricSetting: this.hyp,
        analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    };
};





export default item;