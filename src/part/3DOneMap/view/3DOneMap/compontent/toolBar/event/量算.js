var item = function (map) {
    this.map = map;
    this.height = 0;
    this.isoline;
    this.isolineMode = 'singleIsoline';
    this.layers = [];

    this.html = $('<div class="measure"></div>');
    var icon1 = $('<div class="vew_iconfont icon-measure_length"></div>');
    var icon2 = $('<div class="vew_iconfont icon-measure_area"></div>');
    var icon3 = $('<div class="vew_iconfont icon-measure_height"></div>');
    var icon4 = $('<div class="vew_iconfont icon-measure_clear"></div>');
    var buttons = $('<div class="buttons"></div>');
    buttons.append(icon1).append(icon2).append(icon3).append(icon4);
    var content = $('<div class="measure-body"></div>');
    this.html.append(buttons);
    this.html.append(content);
    this.radio1 = new icu.formElement.radio({
        default: 'singleIsoline',
        getKey: 'value',
        data: [
            { label: '单等高线', value: 'singleIsoline' },
            { label: '多等高线', value: 'multiIsoline' },
        ],
        onChange: (value) => {
            this.changeIsoLine(value)
        }
    });
    content.append(this.radio1.html);
    var inputBox = $('<div class="layui-row" style="padding:15px 0 0 0"><div class="layui-col-md3 measure-layout" style="margin:0 0 0 10px"> 等高距(米)：</div><div class="layui-col-md4 inputLayout"></div></div>');
    this.input = new icu.formElement.numberInput({
        default: 50,
        min: 1,
        max: 999999999,
    });
    inputBox.find('.inputLayout').append(this.input.html);
    content.append(inputBox);
    this.init();

    icon1.click(() => {
        this.handlerDisEvent();
    });

    icon2.click(() => {
        this.handlerAreaEvent();
    });

    icon3.click(() => {
        this.handlerHeightEvent();
    });
    icon4.click(() => {
        this.clear();
    });
};
item.prototype.changeIsoLine = function (value) {
    this.isolineMode = value;
};
// 初始化
item.prototype.init = function () {
    var viewer = this.map.viewer;
    this.handlerDis = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Distance, 0);
    this.handlerArea = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Area, 0);
    this.handlerHeight = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.DVH);
};
// 距离
item.prototype.handlerDisEvent = function () {
    this.clear();

    var viewer = this.map.viewer;
    this.handlerDis.measureEvt.addEventListener((result) => {
        var distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : result.distance + 'm';
        this.handlerDis.disLabel.text = '距离 ：' + distance;
    });
    this.handlerDis.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
        } else {
            viewer.enableCursorStyle = true;
        }
    });
    this.handlerDis.activate();
};
// 面积
item.prototype.handlerAreaEvent = function () {
    this.clear();
    
    var viewer = this.map.viewer;
    this.handlerArea.measureEvt.addEventListener((result) => {
        var mj = Number(result.area);
        var area = mj > 1000000 ? (mj / 1000000).toFixed(2) + 'km²' : mj.toFixed(2) + '㎡';
        this.handlerArea.areaLabel.text = '面积 :' + area;
    });
    this.handlerArea.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
        }
        else {
            viewer.enableCursorStyle = true;
        }
    });
    this.handlerArea.activate();
};
// 高度
item.prototype.handlerHeightEvent = function () {
    this.clear();
    
    var viewer = this.map.viewer;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((evt) => {
        var pick = viewer.scene.pickPosition(evt.position);
        var ecartographic = Cesium.Cartographic.fromCartesian(pick);
        this.height = ecartographic.height;
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.handlerHeight.measureEvt.addEventListener((result) => {
        var distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : result.distance + 'm';
        var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + 'km' : result.verticalHeight + 'm';
        var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + 'km' : result.horizontalDistance + 'm';
        this.createIsoline(result.verticalHeight);
        this.handlerHeight.disLabel.text = '空间距离 :' + distance;
        this.handlerHeight.vLabel.text = '垂直高度 :' + vHeight;
        this.handlerHeight.hLabel.text = '水平距离 :' + hDistance;
    });
    this.handlerHeight.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        }
        else {
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    this.handlerHeight.activate();



};

item.prototype.createIsoline = function (verticalHeight) {
    var viewer = this.map.viewer;
    var isoline = this.isoline;
    var layers = this.layers;
    if (!isoline) {
        isoline = new Cesium.HypsometricSetting();
    }
    isoline.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.LINE;
    isoline._lineColor = Cesium.Color.YELLOW;
    var interval = parseFloat(this.input.value);
    isoline.LineInterval = interval;
    if (this.isolineMode == 'singleIsoline') {
        isoline.MinVisibleValue = this.height + parseFloat(verticalHeight);
        isoline.MaxVisibleValue = this.height + parseFloat(verticalHeight) + interval;
    } else {
        isoline.MinVisibleValue = this.height;
        isoline.MaxVisibleValue = this.height + parseFloat(verticalHeight);
    }
    var colorTable = new Cesium.ColorTable();
    isoline.ColorTable = colorTable;
    isoline.Opacity = 0.4;
    viewer.scene.globe.HypsometricSetting = {
        hypsometricSetting: isoline,
        analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
    };
    for (var i = 0; i < layers.length; i++) {
        layers[i].hypsometricSetting = {
            hypsometricSetting: isoline,
            analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
        };
    }
};
// 清除方法
item.prototype.clear = function () {
    var viewer = this.map.viewer;
    var isoline = this.isoline;
    var layers = this.layers;
    this.handlerDis && this.handlerDis.clear();
    this.handlerArea && this.handlerArea.clear();
    this.handlerHeight && this.handlerHeight.clear();
    viewer.scene.globe.HypsometricSetting = undefined;
    if (isoline) {
        for (var i = 0; i < layers.length; i++) {
            layers[i].hypsometricSetting = undefined;
        }
    };
};






export default item;