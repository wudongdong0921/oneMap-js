
var timer = function () {
    this.html = $('<div class="OneMap_Header_timer"></div>');
    setTimeout(() => {
        if ($('.OneMap_Header_timer').length) {
            this.getTime();
        };
    }, 1000);
    this.getTime();
};

timer.prototype.getTime = function () {
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
    var str = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + _str;
    this.html.text(str);
};



export default timer;
