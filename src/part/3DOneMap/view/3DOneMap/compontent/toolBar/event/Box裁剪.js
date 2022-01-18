
var item = function (map) {
    this.map = map;
    this.viewer = map.viewer;


    this.title = "Box裁剪";
    this.formConfig = [[{
        type: 'numberInput',
        key: 'length',
        formlabel: '长度（米）',
        max: 99999999999,
        default: 10,
        min: 0,
        onChange: (value) => {
            this.length = value;
            if (this.hasClipped) {
                this.setClipBox();
            }
        },
    }], [{
        type: 'numberInput',
        key: 'width',
        formlabel: '宽度（米）',
        max: 99999999999,
        default: 10,
        min: 0,
        onChange: (value) => {
            this.width = value;
            if (this.hasClipped) {
                this.setClipBox();
            }
        },
    }], [{
        type: 'numberInput',
        key: 'height',
        formlabel: '高度（米）',
        max: 99999999999,
        default: 10,
        min: 0,
        onChange: (value) => {
            this.height = value;
            if (this.hasClipped) {
                this.setClipBox();
            }
        },
    }], [{
        type: 'numberInput',
        key: 'rotate',
        formlabel: '旋转（度）',
        min: -180,
        default: 0,
        max: 180,
        onChange: (value) => {
            this.rotate = Cesium.Math.toRadians(Number(value));
            if (this.hasClipped) {
                this.setClipBox();
            }
        },
    }], [{
        type: 'select',
        key: 'schema',
        formlabel: '裁剪模式',
        showKey: 'label',
        getKey: 'value',
        setKey: 'value',
        default: 'clip_behind_all_plane_with_line_frame',
        data: [
            { label: '不带线框盒内裁剪', value: 'clip_behind_all_plane_without_line_frame', },
            { label: '不带线框盒外裁剪', value: 'clip_behind_any_plane_without_line_frame', },
            { label: '带线框盒内裁剪', value: 'clip_behind_all_plane_with_line_frame', },
            { label: '带线框盒外裁剪', value: 'clip_behind_any_plane_with_line_frame', },
        ],
        onChange: (value) => {
            this.clipMode = value;
            if (this.hasClipped) {
                this.setClipBox();
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
    this.layers = [];
    this.screenSpaceEventHandler;
    this.width;
    this.height;
    this.length;
    this.clipModeOption;
    this.clipMode;
    this.rotate;
    this.startClip = true;
    this.hasClipped;
}

item.prototype.clear = function () {
    for (var layer of this.layers) {
        layer.clearCustomClipBox();
    }
    this.screenSpaceEventHandler && this.screenSpaceEventHandler.destroy();
    this.screenSpaceEventHandler = undefined;
};



item.prototype.setClipBox = function () {

    this.length = this.form.length.value;
    this.width = this.form.width.value;
    this.height = this.form.height.value;

    var dim = new Cesium.Cartesian3(this.length, this.width, this.height);
    this.hasClipLine = false;
    this.clipModeOption = null;
    switch (this.clipMode) {
        case 'clip_behind_all_plane_with_line_frame':
            this.hasClipLine = true;
            this.clipModeOption = 'clip_behind_all_plane';
            break;
        case 'clip_behind_any_plane_with_line_frame':
            this.hasClipLine = true;
            this.clipModeOption = 'clip_behind_any_plane';
            break;
        case 'clip_behind_all_plane_without_line_frame':
            this.hasClipLine = false;
            this.clipModeOption = 'clip_behind_all_plane';
            break;
        case 'clip_behind_any_plane_without_line_frame':
            this.hasClipLine = false;
            this.clipModeOption = 'clip_behind_any_plane';
            break;
    }
    var boxOptions = {
        dimensions: dim,
        position: this.position,
        clipMode: this.clipModeOption,
        heading: this.rotate
    };

    for (var layer of this.layers) {
        this.hasClipLine ? (layer.clipLineColor = new Cesium.Color(1, 1, 1, 1)) : (layer.clipLineColor = new Cesium.Color(1, 1, 1, 0));
        layer.setCustomClipBox(boxOptions);
    }

}


item.prototype.init = function () {
    this.layers = [];
    this.screenSpaceEventHandler;
    this.width;
    this.height;
    this.length;
    this.clipModeOption;
    this.clipMode;
    this.rotate;
    this.startClip = true;
    this.hasClipped;


    var scene = this.viewer.scene;
    this.layers = scene.layers.layerQueue;
    this.screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    this.screenSpaceEventHandler.setInputAction((evt) => {
        var height = Number(this.form.height.value);
        var width = Number(this.form.width.value);
        var length = Number(this.form.length.value);
        if (height <= 0 || width <= 0 || length <= 0) {
            return;
        }
        this.rotate = Cesium.Math.toRadians(Number(this.form.rotate.value));
        this.clipMode = this.form.schema.value;
        if (this.startClip) {
            this.position = scene.pickPosition(evt.position);
            this.setClipBox();
            this.startClip = false;
            this.hasClipped = true;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};




export default item;