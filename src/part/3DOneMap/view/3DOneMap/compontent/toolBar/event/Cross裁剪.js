
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;


    this.title = "Cross裁剪";
    this.formConfig = [[{
        type: 'numberInput',
        key: 'width',
        formlabel: '裁剪宽度（米）',
        max: 100,
        default: '5',
        onChange: (value) => {
            this.width = Number(value);
            this.box.box.dimensions = new Cesium.Cartesian3(this.width, this.height, 0.1);
            this.dim = new Cesium.Cartesian3(this.width, this.height, this.extrudeDistance);
            this.updateClip();
        },
    }], [{
        type: 'numberInput',
        key: 'height',
        formlabel: '裁剪高度（米）',
        default: '5',
        max: 100,
        onChange: (value) => {
            this.height = Number(value);
            this.box.box.dimensions = new Cesium.Cartesian3(this.width, this.height, 0.1);
            this.dim = new Cesium.Cartesian3(this.width, this.height, this.extrudeDistance);
            this.updateClip();
        },
    }], [{
        type: 'numberInput',
        key: 'pitch',
        formlabel: '绕X轴旋转（度）',
        max: 360,
        default: '0',
        onChange: (value) => {
            this.pitch = Number(value);
            this.hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(this.heading), Cesium.Math.toRadians(this.pitch), Cesium.Math.toRadians(this.roll));
            this.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.boxPosition, this.hpr);
            this.box.orientation = this.orientation;
            this.updateClip();
        },
    }], [{
        type: 'numberInput',
        key: 'roll',
        formlabel: '绕Y轴旋转（度）',
        max: 360,
        default: '0',
        onChange: (value) => {
            this.roll = Number(value);
            this.hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(this.heading), Cesium.Math.toRadians(this.pitch), Cesium.Math.toRadians(this.roll));
            this.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.boxPosition, this.hpr);
            this.box.orientation = this.orientation;
            this.updateClip();
        },
    }], [{
        type: 'numberInput',
        key: 'heading',
        formlabel: '绕Z轴旋转（度）',
        max: 360,
        default: '0',
        onChange: (value) => {
            this.heading = Number(value);
            this.hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(this.heading), Cesium.Math.toRadians(this.pitch), Cesium.Math.toRadians(this.roll));
            this.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.boxPosition, this.hpr);
            this.box.orientation = this.orientation;
            this.updateClip();
        },
    }], [{
        type: 'numberInput',
        key: 'extrude',
        formlabel: '拉伸（米）',
        max: 30,
        default: '1',
        onChange: (value) => {
            this.extrudeDistance = Number(value);
            this.updateClip();
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
    this.form = form;
    this.box;
    this.boxPosition;
    this.position;
    this.dim;
    this.width;
    this.height;
    this.heading = 0;
    this.pitch = 0;
    this.pitch = 0;
    this.extrudeDistance = 1.0;
    this.startClip = true;
    this.hasClipped = false;
    this.hasInitialized = false;
    this.screenSpaceEventHandler = null;
    this.layers = [];
}

item.prototype.clear = function () {
    this.hasClipped = false;
    for (var layer of this.layers) {
        layer.clearCustomClipBox();
    }

    this.layers && (this.layers = []);
    this.screenSpaceEventHandler && this.screenSpaceEventHandler.destroy();
    this.screenSpaceEventHandler = undefined;
    this.box && this.viewer.entities.removeById('cross-clip-identify-box');
    this.hasInitialized = false;

};

item.prototype.init = function () {
    this.clear();

    this.box;
    this.boxPosition;
    this.position;
    this.dim;
    this.width = Number(this.form.width.value);
    this.height = Number(this.form.height.value);
    this.heading = Number(this.form.heading.value);
    this.pitch = Number(this.form.pitch.value);
    this.roll = Number(this.form.roll.value);
    this.extrudeDistance = Number(this.form.extrude.value);
    this.startClip = true;
    this.hasClipped = false;
    this.hasInitialized = false;
    this.screenSpaceEventHandler = null;
    this.layers = [];
    this.layers = this.viewer.scene.layers.layerQueue;
    this.dim = new Cesium.Cartesian3(this.width, this.height, this.extrudeDistance);
    this.box = this.viewer.entities.add({ // 标识盒
        id: 'cross-clip-identify-box',
        position: this.boxPosition,
        show: true,
        box: {
            dimensions: new Cesium.Cartesian3(this.width, this.height, 0.1),
            fill: false,
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 5.0
        }
    });

    this.screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.screenSpaceEventHandler.setInputAction((movement) => {
        if (this.startClip) {
            this.boxPosition = this.viewer.scene.pickPosition(movement.endPosition);
            if (!this.boxPosition) {
                return;
            }
            this.box.position = this.boxPosition;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.screenSpaceEventHandler.setInputAction((evt) => {
        if (this.startClip) {
            this.position = this.viewer.scene.pickPosition(evt.position);
            if (!this.position) {
                return;
            }
            this.hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(this.heading), Cesium.Math.toRadians(this.pitch), Cesium.Math.toRadians(this.roll));
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(this.position, this.hpr);
            this.box.orientation = orientation;
            this.dim = new Cesium.Cartesian3(this.width, this.height, this.extrudeDistance);
            this.updateClip();
            this.startClip = false;
            this.hasClipped = true;
            this.box.show = false;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
item.prototype.updateClip = function () {

    // console.log('position', this.position + '\n',
    //     'dimensions', this.dim + '\n',
    //     'heading', this.heading + '\n',
    //     'pitch', this.pitch + '\n',
    //     'roll', this.roll + '\n',
    //     'extrudeDistance', this.extrudeDistance);

    for (var layer of this.layers) {
        layer.setCustomClipCross({
            position: this.position,
            dimensions: this.dim,
            heading: Number(this.heading),
            pitch: Number(this.pitch),
            roll: Number(this.roll),
            extrudeDistance: Number(this.extrudeDistance)
        });
    }


};



export default item;