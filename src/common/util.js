// 正则库
var regulars = {
    year: {
        regExp: /^(19|20)\d{2}$/,
        message: "只能为年份(四位,1900-2099)"
    },
    number: {
        regExp: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
        message: "只能为数字"
    },
    bankNum: {
        regExp: /^\d{16}|\d{19}$/,
        message: "格式错误"
    },
    telephone: {
        regExp: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/,
        message: "格式错误"
    },
    int: {
        regExp: /^[0-9]*$/,
        message: "只能为正整数"
    },
    phone: {
        regExp: /^[1][0-9]{10}$/,
        message: "格式错误"
    },
    allChinese: {
        regExp: /^([\u4E00-\u9FA5]+，?)+$/,
        message: "只能为中文"
    },
    haveChinese: {
        regExp: "[\\u4E00-\\u9FFF]+",
        message: "中不能含有汉字"
    },
    idCard15: {
        regExp: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
        message: "格式错误"
    },
    idCard18: {
        regExp: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/,
        message: "格式错误"
    },
    url: {
        regExp: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
        message: "格式错误"
    },
    email: {
        regExp: /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
        message: "格式错误"
    },
    Special: {
        regExp: ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")", ":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//", "administrators", "administrator", "管理员", "系统管理员", "admin", "select", "delete", "update", "insert", "create", "drop", "alter", "trancate"],
        message: "不能包含特殊字符"
    },
    null: {
        regExp: "^[ ]+$",
        message: "不能为空"
    },
};

// 判断对象是否完全一致
const isEqual = function (a, b) {
    if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
    };
    if (a == null || b == null) {
        return a === b;
    };
    var A = Object.prototype.toString.call(a);
    var B = Object.prototype.toString.call(b);
    if (A !== B) {
        return false;
    };
    switch (A) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a) {
                return +b !== +b;
            };
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    };
    if (A == '[object Object]') {
        if (JSON.stringify(a) != JSON.stringify(b)) {
            return false;
        };
        return true;
    };
    if (A == '[object Array]') {
        if (a.toString() == b.toString()) {
            return true;
        }
        return false;
    };
};

// 判断是否在数组中，（脱离jquery）
const inArray = function (str, _array) {
    let isInArray = -1;
    for (let i = 0; i < _array.length; i++) {
        const element = _array[i];
        if (isEqual(element, str)) {
            isInArray = i;
            break;
        };
    };
    return isInArray;
};

// 获取对象key值列表
const getKeyArray = function (obj) {
    var _array = [];
    eachObject(obj, function (item, key) {
        _array.push(key);
    });
    return _array;
};

// 将数组以 key 对应属性 为键值 转换为对象，key值默认为ID;
const converArrayToObj = function (_array, key) {
    var obj = {};
    key = key || 'id';

    var canConver = true;
    for (let i = 0; i < _array.length; i++) {
        const element = _array[i];
        if (element.hasOwnProperty(key)) {
            obj[element[key].toString()] = element;
        } else {
            canConver = false;
        }
    };
    if (canConver) {
        return obj;
    } else {
        console.error('对象转换错误 ：未找到对应Key值');
        return obj;
    };
};

// 历遍对象，并执行方法
const eachObject = function (obj, callback) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            var value = callback(element, key);
            if (value === false) {
                break;
            };
        }
    };
};

function test(type, str) {
    var re = new RegExp(regulars[type].regExp);
    return !re.test(str) ? true : false;
};

// 验证用方法集合
var verifyObj = {
    year: {
        event: value => {
            return test('year', value)
        },
        message: regulars.year.message,
    },
    number: {
        event: value => {
            return test('number', value)
        },
        message: regulars.number.message
    },
    bankNum: {
        event: value => {
            return test('bankNum', value)
        },
        message: regulars.bankNum.message
    },
    telephone: {
        event: value => {
            return test('telephone', value)
        },
        message: regulars.telephone.message
    },
    int: {
        event: value => {
            return test('int', value)
        },
        message: regulars.int.message
    },
    phone: {
        event: value => {
            return test('phone', value)
        },
        message: regulars.phone.message
    },
    url: {
        event: value => {
            return test('url', value)
        },
        message: regulars.url.message
    },
    email: {
        event: value => {
            return test('email', value)
        },
        message: regulars.email.message
    },
    allChinese: {
        event: value => {
            return test('allChinese', value)
        },
        message: regulars.allChinese.message
    },
    haveChinese: {
        event: function (str) {
            var re = new RegExp(regulars.haveChinese.regExp);
            return re.test(str) ? true : false;
        },
        message: regulars.haveChinese.message
    },
    notNull: {
        event: function (str) {
            if (str == "" || str == undefined || str == null || str == NaN) return !false;
            var re = new RegExp(regulars.null.regExp);
            return re.test(str);
        },
        message: regulars.null.message
    },
    isSpecial: {
        event: function (str) {
            str = str.toLowerCase();
            for (var i = 0; i < regulars.Special.regExp.length; i++) {
                if (str.indexOf(regulars.Special.regExp[i]) >= 0) {
                    return false;
                }
            }
            return true;
        },
        message: regulars.Special.message
    },
    isIdCard: {
        event: function (str) {
            var re1 = new RegExp(regulars.idCard15.regExp);
            var re2 = new RegExp(regulars.idCard18.regExp);
            return re1.test(str) || re2.test(str) ? true : false;
        },
        message: regulars.idCard18.message
    }
};

// 判断变量是否为某一值
const is = function (obj, type) {
    if (type) {
        var result = null;
        var objectString = Object.prototype.toString.call(obj);
        switch (type) {
            case "string":
                result = objectString == "[object String]";
                break;
            case "function":
                result = objectString == "[object Function]";
                break;
            case "array":
                result = objectString == "[object Array]";
                break;
            case "number":
                result = objectString == "[object Number]" && obj === obj;
                break;
            case "date":
                result = objectString == "[object Date]";
                break;
            case "object":
                result = objectString == "[object Object]";
                break;
            case "bool":
                result = objectString == "[object Boolean]";
                break;
            case "regExp":
                result = objectString == "[object RegExp]";
                break;
            case "null":
                result = objectString == "[object Null]";
                break;
            case "undefined":
                result = objectString == "[object Undefined]";
                break;
            case "NaN":
                result = (obj !== obj);
                break;
        };
        return result;
    } else {
        var mold = null;
        var objectString = Object.prototype.toString.call(obj);
        switch (objectString) {
            case "[object String]":
                mold = "string";
                break;
            case "[object Function]":
                mold = "function";
                break;
            case "[object Array]":
                mold = "array";
                break;
            case "[object Number]":
                if (obj !== obj) {
                    mold = "NaN";
                } else {
                    mold = "number"
                };
                break;
            case "[object Date]":
                mold = "date";
                break;
            case "[object Object]":
                mold = "object";
                break;
            case "[object Boolean]":
                mold = "bool";
                break;
            case "[object RegExp]":
                mold = "regExp";
                break;
            case "[object Null]":
                mold = "null";
                break;
            case "[object Undefined]":
                mold = "undefined";
                break;
        };
        return mold;
    };
};

const customLength = function (type, str) {
    var name = type.split('$');
    var length = str.toString().length;
    var nums = parseInt(name[1]);
    if (name[0] == 'les') {
        return !(length > nums) ? '不能小于' + nums + '位' : false;
    } else if (name[0] == 'gre') {
        var nums = parseInt(name[1]);
        return !(length <= nums) ? '不能大于' + nums + '位' : false;
    } else {
        console.error('error => 未找到验证规则:' + type);
    };
};

// 正则验证方法
const jude = function (value, type) {
    var keyArray = getKeyArray(verifyObj);
    if (type.indexOf('$') != -1) {
        return customLength(type, value);
    } else if (inArray(type, keyArray) != -1) {
        var answer = verifyObj[type].event(value);
        return answer ? verifyObj[type].message : false;
    } else {
        console.error('error => 未找到验证规则:' + type);
    };
};

const verifyRule = function (singleRule, value, text) {
    // 返回对象类型
    var ruleType = is(singleRule);
    if (ruleType == 'string') {
        // 当为String类型时,去默认验证方法中寻找
        var result = jude(value, singleRule);
        if (result) {
            return text + result;
        } else {
            return false;
        };
    } else if (ruleType == 'function') {
        // 当为方法类型时,执行方法,并返回验证 (方法通过,返回false,否则返回错误语句);
        var result = singleRule(value);
        if (result) {
            return result;
        } else {
            return false;
        };
    } else if (ruleType == 'object' && singleRule.regExp && is(singleRule.regExp, 'regExp')) {
        // 当对象方法为正则表达式时,直接使用正则表达式进行判断
        var errorText = singleRule.errorText;
        var regular = singleRule.regExp;
        var re = new RegExp(regular);
        if (re.test(value)) {
            return false;
        } else {
            return errorText;
        };
    } else {
        // 其他类型直接跳过,控制台输出错误信息
        console.error('rule模块 : 未识别的判断类型');
        return false;
    };
};

const rules = function (rulesObj, value) {
    var text = rulesObj.text;
    var rulesArray = rulesObj.rules;
    if (!rulesArray) {
        return false;
    };
    // 判断是否为数组
    if (is(rulesArray, 'array')) {
        // 跳过非空验证
        // if ($.inArray("notNull", rulesArray) == -1 && (value == '' || value === null)) {
        //     return false;
        // };
        // 进行循环验证
        var _text = false;
        for (var i = 0; i < rulesArray.length; i++) {
            var element = rulesArray[i];
            var result = verifyRule(element, value, text);
            if (result) {
                _text = result;
                break;
            };
        };
        if (_text) {
            return _text;
        } else {
            return false;
        };
    } else if (is(rulesArray, 'string')) {
        // 进行单条验证
        var result = verifyRule(rulesArray, value, text);
        if (result) {
            return result;
        } else {
            return false;
        };
    } else if (is(rulesArray, 'function')) {
        // 进行单条验证
        var result = verifyRule(rulesArray, value, text);
        if (result) {
            return result;
        } else {
            return false;
        };
    }
};

var clone = function (obj) {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    var newObj = new obj.constructor(); //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) { //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? clone(val) : val;
        }
    }
    return newObj;
}

// 添加验证方法
const setJudeRule = function (obj, key) {
    if (verifyObj.hasOwnProperty(key)) {
        console.error('key值重复，不可添加');
        return;
    };
    if (obj.hasOwnProperty('event') && obj.hasOwnProperty('message')) {
        verifyObj[key] = obj;
    } else {
        console.error('添加的验证方法不符合规范');
        return;
    }
};

var getMaxFloor = function (treeData, key) {
    let floor = 0
    let v = this
    let max = 0

    function each(data, floor) {
        data.forEach(e => {
            e.floor = floor
            if (floor > max) {
                max = floor
            }
            if (e.hasOwnProperty(key)) {
                const element = e[key];
                if (element.length > 0) {
                    each(element, floor + 1)
                }
            };
        })
    }
    each(treeData, 1)
    return max
};

var Guid = function () {
    var guid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += '-';
    }
    return guid;
};

var uuid = function () {
    var uuid = '';
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        uuid += n;
    }
    return uuid;
};

var fileType = {
    'image': ['webp', 'baidubmp', 'pcx', 'tif', 'gif', 'jpeg', 'tga', 'exif', 'fpx', 'svg', 'pcd', 'dxf', 'ufo', 'png', 'hdri', 'wmf', 'flic', 'emf', 'ico'],
    'psd': ['psd'],
    'cad': ['cdr', 'ai', 'eps', 'raw'],
    'text': ['txt'],
    'html': ['htm', 'html'],
    'mirror': ['iso', 'bin', 'img', 'tao', 'dao', 'cif', 'fcd'],
    'video': ['avi', 'mpeg', 'mpg', 'flv', 'dat', 'ra', 'rm', 'rmvb', 'mov', 'qt', 'asf', 'wmv', 'mkv'],
    'mp3': ['mp3', 'wma', 'mpg', 'wav', 'mv'],
    'zip': ['rar', 'zip', '7z', 'tar', 'xz', 'gz'],
    'xsl': ['xls', 'xlsx'],
    'ppt': ['ppt', 'pptx'],
    'doc': ['doc', 'docx'],
    'pdf': ['pdf'],
    'config': ['conf', 'config', 'ini'],
};

var fileTypeMapping = {};

for (const key in fileType) {
    if (fileType.hasOwnProperty(key)) {
        for (let i = 0; i < fileType[key].length; i++) {
            const element = fileType[key][i];
            fileTypeMapping[element] = key
        };
    }
}

var getSuffixType = function (url) {
    var suffix = url.substring(url.lastIndexOf(".") + 1, url.length);
    if (fileTypeMapping.hasOwnProperty(suffix)) {
        const element = fileTypeMapping[suffix];
        return element;
    } else {
        return 'file'
    }
};
//
var uuid1 = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
//导出
var exportFile = function (url, name, data) {
    var xhh = new XMLHttpRequest();
    var page_url = url;
    xhh.open("post", page_url);
    //xhh.setRequestHeader("Authorization", window.localStorage.getItem("token"));
    xhh.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhh.responseType = 'blob';
    xhh.onreadystatechange = function () {
        if (xhh.readyState === 4 && xhh.status === 200) {
            var filename = name + ".xls";
            var blob = new Blob([xhh.response], {
                type: name + '/xls'
            });
            var csvUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = csvUrl;
            link.download = filename;
            link.click();

        }
    };
    xhh.send(JSON.stringify(data))
}
//时间转换
var getNowFormatDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 1 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
    return currentdate;
}
//时间转换
var getNowFormatDate2 = function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return uuid().replace(/-/g, "");
    }
    // return null;
}

function handelTreeRemoveChildren(data) {
    for (let i = 0; i < data.length; i++) {
        const parent = data[i];
        if (parent.children.length == 0) {
            delete parent.children
        }
        if (parent.children) {
            handelTreeRemoveChildren(parent.children)
        }
    }
    return data
}

// 处理树结构数据
var ReturnHandelTreeData = function (data) {
    this.treeData = [];
    var _treeData = this.handelTreeData(data[0], 0, 0);
    var _data = {}; // 递归源对象
    this.treeDataArray = [];
    for (let i = 0; i < _treeData.length; i++) {
        const element = _treeData[i];
        _data[element.id] = element;
    };
    for (let i = 0; i < _treeData.length; i++) {
        const child = _treeData[i];
        if (_data.hasOwnProperty(child.pid)) {
            const parent = _data[child.pid];
            if (!parent.hasOwnProperty('children')) parent['children'] = [];
            parent['children'].push(child);
        } else {
            this.treeDataArray.push(child);
        }
    };
}

ReturnHandelTreeData.prototype.handelTreeData = function (item, pId, stree) {
    var _this = this;
    var children = item.user;
    if (pId != null && pId != "") {
        pId = pId;
    } else {
        pId = 0
    }
    var open = false;
    if (stree == 0) {
        open = true;
    }
    if (((children != null && children.length != 0) || stree == 1) && !!children) {
        var node = {
            id: item.dept.deptId,
            code: "" + item.dept.deptId,
            name: item.dept.name,
            value: item.dept.deptId,
            pid: pId,
            open: open,
            nodeType: 'parent'

        };
        _this.treeData.push(node);
        for (var i = 0; i < children.length; i++) {
            if (pId == 0) {
                _this.handelTreeData(children[i], item.dept.deptId, 1);
            } else {
                _this.handelTreeData(children[i], item.dept.deptId, 2);
            }

        }
    } else {
        var node = {
            id: item.userId,
            code: "" + item.userId,
            name: item.name,
            value: item.userId,
            pid: item.deptId,
            open: false,
            nodeType: 'child'
        };
        _this.treeData.push(node);
    }
    return _this.treeData
}

// 生成组件style
var initStyle = function (styId, layout) {
    var style = document.createElement('style');
    style.id = styId;
    var innerHTML = '';
    for (const key in layout.styles) {
        if (layout.styles.hasOwnProperty.call(layout.styles, key)) {
            const element = layout.styles[key];
            innerHTML += '.' + key + ' {' + element.main + '}\n';
            if (element.hover) {
                innerHTML += '.' + key + ':hover {' + element.hover + '}\n';
            };
            if (element.after) {
                innerHTML += '.' + key + '::after {' + element.after + '}\n';
            };
            if (element.before) {
                innerHTML += '.' + key + '::before {' + element.before + '}\n';
            };
        }
    };
    style.innerHTML = innerHTML;
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
}

var levelHandel = function (data) {
    var maxCode = '';
    if (data.length !== 0) {
        if (data.length == 1) {
            maxCode = data[0]
        } else {
            for (let i = 0; i < data.length; i++) {
                var maxCode = maxCode < data[i + 1] ? data[i + 1] : maxCode
            }
        }
        return returnCodeType(maxCode)
    }
}

var returnCodeType = function (code) {
    var _length = 0;
    var CodeType = 0;
    code.replace(/[0]+$/g, function (res) {
        _length = res.length;
        return res;
    });
    if (_length >= 4) {
        CodeType = 0;
        code = code.slice(0, 2);
    } else if (_length >= 2 && _length < 4) {
        CodeType = '市级';
        code = code.slice(0, 4);
    } else if (_length >= 0 && _length < 2) {
        CodeType = 2;
    };
    return CodeType
}

// 省市县 当级判断 0 是全部
var levelHandels = function (data) {
    var maxCode = '';
    if (data.length !== 0) {
        if (data.length == 1) {
            maxCode = data[0]
        } else {
            for (let i = 0; i < data.length; i++) {
                var maxCode = maxCode < data[i + 1] ? data[i + 1] : maxCode
            }
        }
        return returnCodeTypes(maxCode)
    }
}

var returnCodeTypes = function (code) {
    var _length = 0;
    var CodeType = 0;
    code.replace(/[0]+$/g, function (res) {
        _length = res.length;
        return res;
    });
    if (_length >= 4) {
        CodeType = 1;
        code = code.slice(0, 2);
    } else if (_length >= 2 && _length < 4) {
        CodeType = 2;
        code = code.slice(0, 4);
    } else if (_length >= 0 && _length < 2) {
        CodeType = 3;
    };
    return CodeType.toString()
}
// type:【log:obj-fds-zs-str/info:obj-fds-zs-str/error:obj-fds-zs-str/warn:obj-fds-zs-str/debug:obj-fds-zs-str】
// title: 输出内容标题
// cosoData: 输出内容
var consoleLog = function (type, title, cosoData) {
    if (type) {
        var typeTitle = type.split(':')[0];
        var cosoType = type.split(':')[1];
        console.log('---------------------------测试输出，用完记得删除---------------------------')
        if (cosoType == 'obj') {
            console[typeTitle](title + ': %o', cosoData);
        } else if (cosoType == 'fds') {
            console[typeTitle](title + ': %f', cosoData);
        } else if (cosoType == 'zs') {
            console[typeTitle](title + ': %d', cosoData);
        } else if (cosoType == 'str') {
            console[typeTitle](title + ': %s', cosoData);
        }
        console.log('---------------------------------------------------------------------------')
    }
}
export default {
    rules,
    uuid,
    Guid,
    inArray,
    getKeyArray,
    eachObject,
    is,
    jude,
    isEqual,
    setJudeRule,
    converArrayToObj,
    clone,
    getMaxFloor,
    getSuffixType, // 获取文件后缀名
    getNowFormatDate, //获取当前时分秒

    getNowFormatDate2, //获取年月日
    uuid1,
    exportFile,
    getQueryString,
    ReturnHandelTreeData: ReturnHandelTreeData,
    handelTreeRemoveChildren: handelTreeRemoveChildren,                 //递归遍历树结构，去掉空children。
    initStyle: initStyle,//生成组件样式
    levelHandel: levelHandel,
    levelHandels: levelHandels,
    consoleLog: consoleLog
}