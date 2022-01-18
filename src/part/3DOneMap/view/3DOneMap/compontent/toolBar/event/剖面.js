
/*
* 剖面分析对象
* 画线截取剖面
* 起点信息和终点信息
* 分析结果小窗口显示
*
* */


var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;

    this.title = "剖面";
    this.formConfig = [[{
        type: 'input',
        key: 'aa',
        formlabel: '起点信息',
        readonly: true,
    }], [{
        type: 'input',
        key: 'bb',
        formlabel: '终点信息',
        readonly: true,
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

item.prototype.clear = function () {
    this.form.set({
        aa: '',
        bb: '',
    });
    if (this.handlerLine) {
        this.handlerLine.clear();
    }
    // if (parent.profileForm) {
    //     parent.profileForm.$el.hide();
    //     $("#pro").width(0);
    //     $("#pro").height(0);
    // }
    this.canvasLayout.hide();

    if (this.crossProfile) {
        this.crossProfile.destroy();
        this.crossProfile = undefined;
    };
};


item.prototype.onRender = function (form) {
    form.aa.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');
    form.bb.html.parent().before('<div class="discript">经度（度）, 纬度（度）, 高程（米）</div>');

    this.canvas = $('<canvas id="pro"></canvas>');
    this.canvas.css({
        width: 310,
        height: 150
    });
    this.canvasLayout = $('<div></div>').append(this.canvas);
    this.canvasLayout.css({
        display: 'none',
        border: '1px solid #ccc',
        width: 310,
        height: 150,
        background: '#f0f0f0',
    });
    form.bb.html.parents('.layui-row').after(this.canvasLayout);


    this.form = form;
    this.handlerLine;
    this.positions = [];
    this.crossProfile;
};

item.prototype.init = function () {
    var scene = this.viewer.scene;
    if (!this.crossProfile) {
        this.crossProfile = new Cesium.Profile(scene);
    }
    if (this.handlerLine) {
        this.handlerLine.clear();
    }
    this.handlerLine = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Line);
    this.handlerLine.activeEvt.addEventListener((isActive) => {
        if (isActive == true) {
            this.viewer.enableCursorStyle = false;
            this.viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        } else {
            this.viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    this.handlerLine.movingEvt.addEventListener((windowPosition) => {
    });
    this.handlerLine.drawEvt.addEventListener((result) => {
        var linePosition = result.object ? result.object.positions : result;
        var startPoint = linePosition[0];
        var endPoint = linePosition[linePosition.length - 1];

        //起止点相关信息
        var scartographic = Cesium.Cartographic.fromCartesian(startPoint);
        var slongitude = Cesium.Math.toDegrees(scartographic.longitude);
        var slatitude = Cesium.Math.toDegrees(scartographic.latitude);
        var sheight = scartographic.height;
        
        var ecartographic = Cesium.Cartographic.fromCartesian(endPoint);
        var elongitude = Cesium.Math.toDegrees(ecartographic.longitude);
        var elatitude = Cesium.Math.toDegrees(ecartographic.latitude);
        var eheight = ecartographic.height;

        var profileStartPosition = slongitude.toFixed(4) + ', ' + slatitude.toFixed(4) + ', ' + sheight.toFixed(2);
        var profileEndPosition = elongitude.toFixed(4) + ', ' + elatitude.toFixed(4) + ', ' + eheight.toFixed(2);

        this.form.set({
            aa: profileStartPosition,
            bb: profileEndPosition,
        });

        // 剖面分析的起止点
        this.crossProfile.startPoint = [slongitude, slatitude, sheight];
        this.crossProfile.endPoint = [elongitude, elatitude, eheight];
        this.crossProfile.extendHeight = 40;
        // 剖面数据
        this.crossProfile.getBuffer((buffer) => {
            var canvas = this.canvas[0];
            canvas.width = this.crossProfile._textureWidth;
            canvas.height = this.crossProfile._textureHeight;
            var ctx = canvas.getContext("2d");
            var imgData = ctx.createImageData(this.crossProfile._textureWidth, this.crossProfile._textureHeight);
            imgData.data.set(buffer);
            //在canvas上绘制图片
            ctx.putImageData(imgData, 0, 0);
            this.canvasLayout.show();
        });
        this.crossProfile.build();
        this.positions = [];
    });
    this.handlerLine.activate();


};



export default item;