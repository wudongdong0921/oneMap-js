
var item = function (map) {

    this.map = map;
    this.viewer = map.viewer;
    this.title = "天际线";
    this.formConfig = [[{
        type: 'input',
        key: 'skyview-observation-position',
        formlabel: '观察者信息',
        readonly: true,
    }], [{
        type: 'Colorpicker',
        key: 'skylineColor',
        formlabel: '天际线颜色',
        default: '#00c800',
        col: '5_5',
        onChange: (value) => {
            this.changeSkyLineColor();
        },
    }, {
        type: 'Colorpicker',
        key: 'skyline-highlight-barrier-color',
        formlabel: '障碍物高亮颜色',
        default: '#c80000',
        col: '5_5',
    }], [{
        type: 'select',
        key: 'skylineMode',
        formlabel: '显示模式',
        showKey: 'label',
        getKey: 'value',
        setKey: 'value',
        col: '5_5',
        default: '0',
        data: [
            { label: '线显示', value: '0', },
            { label: '面显示', value: '1', }
        ],
        onChange: () => {
            this.changeSkylineMode();
        },
    }, {
        type: 'numberInput',
        key: 'skylineRadius',
        formlabel: '分析半径（米）',
        col: '5_5',
        max: 999999999999,
        unit: 10,
        min: 0,
        default: 1000,
    }]];

    this.buttonConifg = [{
        name: '天际线',
        event: () => {
            this.init();
        },
        class: "active"
    }, {
        name: '二维显示',
        event: () => {
            this.showCheart();
        },
        class: ""
    },
    //  {
    //     name: '高亮障碍物',
    //     event: () => {
    //         this.highlightBarrier();
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

item.prototype.changeSkyLineColor = function () {
    if (!this.skyline) {
        return;
    };
    var color = Cesium.Color.fromCssColorString(this.form.skylineColor.value);
    this.skyline.color = color;
}

item.prototype.onRender = function (form) {
    form['skylineMode'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form['skylineColor'].html.parent().parent().parent().after('<div class="layui-col-md1">&nbsp;</div>');
    form['skyview-observation-position'].html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');

    this.form = form;
    this.skyline;
    this.parent;
    this.s3mInstance;
    this.clickFlag = 0;
    this.hasSkyLineAnalysisResult = false;

    this.canvasLayout = $('<div></div>');
    this.canvasLayout.css({
        // display: 'none',
        border: '1px solid #ccc',
        width: 310,
        height: 150,
        background: '#f0f0f0',
    });
    form['skylineRadius'].html.parents('.layui-row').after(this.canvasLayout);


    this.myChart = echarts.init(this.canvasLayout[0]);

    this.canvasLayout.hide();

};

item.prototype.showCheart = function () {
    if (!this.hasSkyLineAnalysisResult) {
        return; // 没有分析结果，无法提取天际线轮廓
    };
    var object = this.skyline.getSkyline2D();
    this.canvasLayout.show();
    var option = {
        backgroundColor: "rgba(73,139,156,0.0)",
        tooltip: {
            trigger: "axis"
        },
        calculable: true,
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: object.x,
                show: false
            }
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 1,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666'
                    }
                }
            }
        ],
        series: [
            {
                name: "",
                type: "line",
                data: object.y
            }
        ],
        grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
    }
    this.myChart.setOption(option);


};


item.prototype.init = function () {
    var scene = this.viewer.scene;
    this.clickFlag += 1;
    // parent = parentContainer;
    if (!this.skyline) {
        this.skyline = new Cesium.Skyline(scene);
    }
    this.removeLastResult(); // 清除上一次分析结果
    var cartographic = scene.camera.positionCartographic;
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var height = cartographic.height;
    // 天际线分析的视口位置设置成当前相机位置
    this.skyline.viewPosition = [longitude, latitude, height];
    this.form.set({
        'skyview-observation-position': longitude.toFixed(4) + ', ' + latitude.toFixed(4) + ', ' + height.toFixed(2)
    });

    // $("#skyview-observation-position").val(longitude.toFixed(4) + ', ' + latitude.toFixed(4) + ', ' + height.toFixed(2));
    //设置俯仰和方向
    this.skyline.pitch = Cesium.Math.toDegrees(scene.camera.pitch);
    this.skyline.direction = Cesium.Math.toDegrees(scene.camera.heading);
    this.skyline.radius = parseFloat(this.form.skylineRadius.value);
    this.skyline.displayStyle = parseInt(this.form.skylineMode.value);
    this.viewer.scene.primitives._primitives = [];
    this.skyline.build();

    this.hasSkyLineAnalysisResult = true; // 表示有了分析结果，可以提取二维天际线和高亮障碍物
    this.skyline.color = Cesium.Color.fromCssColorString(this.form.skylineColor.value);
    // var skylineColor = document.getElementById('skylineColor');
    // skylineColor.oninput = () => {
    //     var color = Cesium.Color.fromCssColorString(skylineColor.value);
    //     this.skyline.color = color;
    // };



    // $('#skylineMode').change(function () {

    // });

    // $('#clearSkyline').click(clear);

};

item.prototype.changeSkylineMode = function () {
    var value = this.form.skylineMode.value;
    if (!this.skyline) {
        return;
    }

    if (value == "0") {
        this.skyline.displayStyle = 0;
        this.viewer.scene.primitives._primitives = [];
    } else if (value == "1") {
        this.skyline.displayStyle = 1;
        this.viewer.scene.primitives._primitives = [];
    };
};

item.prototype.removeLastResult = function () {
    this.canvasLayout.hide();
    this.form.set({
        'skyview-observation-position': '',
    });
    this.viewer.entities.removeAll();
    this.viewer.scene.primitives._primitives = [];
    this.skyline.clear();
    for (var layer of this.viewer.scene.layers.layerQueue) {
        layer.removeAllObjsColor();
    }
    this.hasSkyLineAnalysisResult = false;
};

item.prototype.clear = function () {
    this.removeLastResult();
    this.form.set({
        'skyview-observation-position': '',
        'skylineColor': '#00c800',
        'skyline-highlight-barrier-color': '#c80000',
        'skylineMode': '0',
        'skylineRadius': 1000,
    });
};

item.prototype.highlightBarrier = function () {


    if (this.skyline && this.hasSkyLineAnalysisResult) {
        var skylineHighlightBarrierColor = Cesium.Color.fromCssColorString(this.form['skyline-highlight-barrier-color'].html.spectrum('get').toRgbString());
        for (var index in this.skyline.getObjectIds()) {
            var layer = this.viewer.scene.layers.findByIndex(index - 3); // 底层索引从3开始
            layer.setObjsColor(this.skyline.getObjectIds()[index], skylineHighlightBarrierColor);
        }
    }
};


export default item;