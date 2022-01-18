function formatDate(format, str, calibrat) {
    try {
        str = str.split('.')[0];
    } catch (error) {

    };

    if (str instanceof Date) {
        var date = str;
    } else {
        if (str) {
            var date = new Date(str);
        } else if (str) {
            str = str.replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, '').replace(/时/g, ':').replace(/分/g, ':').replace(/秒/g, '');
            str = str.replace(/\//g, '-');
            str = str.replace(/\./g, '/');
            var date = new Date(str);
        } else {
            var date = new Date();
        };
    };
    if (date == 'Invalid Date') {
        console.error('ExDate :非法事件格式' + str);
        return 'error';
    };

    var formatStr = format || 'yyyy-MM-DD';
    if (format == '中' || format == 'zh') {
        formatStr = 'yyyy年M月D日';
    } else if (format == 'ZH') {
        formatStr = 'yyyy年MM月DD日';
    } else if (format == 'ZH:') {
        formatStr = 'yyyy年MM月DD日 HH时mm分ss秒';
    } else if (format == 'zh:') {
        formatStr = 'yyyy年M月D日 T h时m分s秒';
    } else if (format == '-') {
        formatStr = 'yyyy-MM-DD';
    } else if (format == '/') {
        formatStr = 'yyyy/MM/DD';
    };

    if (formatStr == 'z') {
        date = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
        formatStr = 'Z';
    };
    if (formatStr == 'Z') {
        return date.getTime();
    };
    if (calibrat) {
        var calibratMillisecond = calibrat * 60 * 1000;
        if (!calibratMillisecond) {
            console.error('ExDate : 非法偏差格式' + str);
            return 'error';
        };

        var newTime = data.getTime();
        newTime += calibratMillisecond;
        data = new Date(newTime);

        if (date == 'Invalid Date') {
            console.error('ExDate : 非法事件格式' + str);
            return 'error';
        };
    };
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/d{1,2}|D{1,2}|m{1,2}|yy(?:yy)|YY(?:YY)|([hHMstTZ]){1,2}/g, function ($0) {
        switch ($0) {
            case 'd':
                return date.getDate();
            case 'dd':
                return zeroize(date.getDate());
            case 'D':
                return date.getDate();
            case 'DD':
                return zeroize(date.getDate());
            case 'M':
                return date.getMonth() + 1;
            case 'MM':
                return zeroize(date.getMonth() + 1);
            case 'yy':
                return String(date.getFullYear()).substr(2);
            case 'yyyy':
                return date.getFullYear();
            case 'YY':
                return String(date.getFullYear()).substr(2);
            case 'YYYY':
                return date.getFullYear();
            case 'h':
                return date.getHours() % 12 || 12;
            case 'hh':
                return zeroize(date.getHours() % 12 || 12);
            case 'H':
                return date.getHours();
            case 'HH':
                return zeroize(date.getHours());
            case 'm':
                return date.getMinutes();
            case 'mm':
                return zeroize(date.getMinutes());
            case 's':
                return date.getSeconds();
            case 'ss':
                return zeroize(date.getSeconds());
            case 'tt':
                return date.getHours() < 12 ? ' am ' : ' pm ';
            case 'TT':
                return date.getHours() < 12 ? ' AM ' : ' PM ';
            case 'T':
                return date.getHours() < 12 ? ' 上午 ' : ' 下午 ';
            case 'Z':
                return date.getTime();
            default:
                return $0.substr(1, $0.length - 2);
        }
    })
};

export default formatDate;
