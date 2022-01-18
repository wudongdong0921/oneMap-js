var OpacitySlider = function (el, onChange) {
    this.html = el;
    this.name = $('<div class="OneMap_Slider_name">透明度：</div>').appendTo(this.html);
    this.lineBox = $('<div class="OneMap_Slider"></div>').appendTo(this.html);
    this.line = $('<div class="OneMap_Slider_line"></div>').appendTo(this.lineBox);
    this.point = $('<div class="OneMap_Slider_point"></div>').appendTo(this.line);
    this.leftLine = $('<div class="OneMap_Slider_leftLine"></div>').appendTo(this.line);
    this.value = 100;
    this.valueEle = $('<div class="OneMap_Slider_value">' + this.value + '%</div>').appendTo(this.lineBox);
    this.onChange = onChange;

    this.line.click((e) => {
        e.stopPropagation();
        e.preventDefault();
        var value = parseInt(e.offsetX / 120 * 100);
        if (value < 0) {
            value = 0
        } else if (value > 100) {
            value = 100
        };
        if (this.value != value) {
            onChange(value);
            this.setValue(value);
        };
    });
    this.point.click((_event) => {
        _event.stopPropagation();
        _event.preventDefault();
    });
    this.point.mousedown((_event) => {
        _event.stopPropagation();
        _event.preventDefault();
        var X = _event.clientX;
        var __value = this.value;
        document.onmousemove = (event) => {
            var _X = event.clientX;
            var value = __value + parseInt((_X - X) / 120 * 100);
            if (value < 0) {
                value = 0
            } else if (value > 100) {
                value = 100
            };
            if (__value != value) {
                onChange(value);
                this.setValue(value);
            };
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    });
};
OpacitySlider.prototype.setValue = function (value) {
    this.value = value;
    this.leftLine.css('width', value + '%');
    this.point.css('left', value + '%');
    this.valueEle.text(value + '%');
};

export default OpacitySlider;