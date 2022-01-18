var ButtonBar = function () {
    this.html = $('<div class="OneMap_ButtonBar"></div>');

    this.mapScale = $('<div class="OneMap_ButtonBar_mapScale"></div>').appendTo(this.html);
    this.position = $('<div class="OneMap_ButtonBar_position"></div>').appendTo(this.html);
    // this.timer = $('<span class="OneMap_ButtonBar_timer"></span>').appendTo(this.html);
    // this.timerEvent();
};

ButtonBar.prototype.timerEvent = function () {
    var time = new Date();
    var week = time.getDay();
    var _str = '';
    if (week == 0) {
        _str = "星期日";
    } else if (week == 1) {
        _str = "星期一";
    } else if (week == 2) {
        _str = "星期二";
    } else if (week == 3) {
        _str = "星期三";
    } else if (week == 4) {
        _str = "星期四";
    } else if (week == 5) {
        _str = "星期五";
    } else if (week == 6) {
        _str = "星期六";
    };
    var str = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' &nbsp;&nbsp;' + time.getHours() + ':' + time.getMinutes();
    this.timer.html(str);
    setTimeout(() => {
        if ($('.OneMap_ButtonBar').length) {
            this.timerEvent();
        }
    }, 1000);
};

ButtonBar.prototype.positionEvent = function (position) {
    this.position.html('X : ' + position[0] + '&nbsp;&nbsp; Y : ' + position[1]);
};

ButtonBar.prototype.mapScaleEvent = function (mapScale) {
    this.mapScaleValue = mapScale
    this.mapScale.html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 比例尺 &nbsp;&nbsp; 1 : ' + mapScale);
};




export default ButtonBar;