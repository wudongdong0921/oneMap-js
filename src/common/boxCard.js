////////////////////////////////////////////////
// 卡片封装
// 吴野
// 2020-12-24 13:33:13
////////////////////////////////////////////////
var BoxCard = function (options) {
    var _this = this;
    this.imgUrl = './static/icon/';
    this.option = $.extend({}, {
        el: "",
        classView: '',
        idView : '',
        headerTitle: '国土开发强度',// 标题名称
        headerTitleImg: 'safety.svg',// 标题图标
        headerTemp: '',// 自定定义卡片头部
        headerRightType : 'img',
        bodychild: [{// 定义卡片内容
            key: '监测值',// 卡片标题
            enKey: [],// 渲染对应值，必须与数据库字段对应上
            iconImg: 'value.png',// 卡片标题图片
            value: 1,// 卡片内容显示列表数量
        }, {
            key: '监测值',
            enKey: [],
            iconImg: 'ruler.png',
            value: 1,
        }],
        bodyUnti: '公顷',
        bodyTemp: '',// 卡片内容自定义
        buttomType: 0,// 卡片底部内容展示类型、序号
        buttomChild: {// 卡片底部的第一种情况，可根据数组进行扩展
            key: '预期性',
            style: {},
            title: "",
            isHaveDiv: 1,// 是否有右侧对应项 0是没有  1是有, {
            //     key: '详情',
            //     title:"",
            //     style: { color: 'blue' },
            //     isHaveDiv: 0
            // }
            isChangeByData : false
        },
        buttomTemp: '',
        data: [],
        statusData: {
            0: {
                img: './static/icon/safety.svg',
                color: '#2b5394'
            },
            1: {
                img: './static/icon/warning.svg',
                color: '#f7a031'
            },
            2: {
                img: './static/icon/danger.svg',
                color: '#db1029'
            },
            3: {
                img: './static/icon/em.png',
                color: '#2b5394'
            },
        },
        defaultSelectIndex : -1,
        onChange: function () { }, // 值改变时的方法
        onError: function () { }, // 错误时的方法
        onClick: function () { }
    }, options)
    this.event = {
        change: this.option.onChange,
        error: this.option.onError,
        onClick: this.option.onClick,
        onClickInfo: function () { }
    };
    this._html = $('<div class="card card-dialog"></div>');


    this._header = $('<div class="card-header"></div>');
    this._body = $('<div class="card-body"></div>');
    this._bottom = $('<div class="card-bottom"></div>');

    if (_this.option.headerRightType == 'img') {
        this._customHeader = $(
            '<div class="card-title">' +
            '    <span class="spans titleName" id="titleName">' + _this.option.headerTitle + '</span>' +
            '    <span class="spans toDoListSum" id="toDoListSum">' +
            '        <img src="' + _this.imgUrl + _this.option.headerTitleImg + '" width="25px" alt="">' +
            '    </span>' +
            '</div>'
        ).appendTo(_this._header);
    } else { 
        this._customHeader = $(
            '<div class="card-title">' +
            '    <span class="spans titleName" id="titleName">' + _this.option.headerTitle + '</span>' +
            '    <span class="spans toDoListSum" id="toDoListSum">' +
            '        <div class="headerRight" width="50px" id="headerRight"></div>' + 
            '    </span>' +
            '</div>'
        ).appendTo(_this._header);
    }
    this._custombody = $('<div></div>')
    if (_this.option.bodychild.length !== 0) {
        for (var i = 0; i < _this.option.bodychild.length; i++) {
            var element = _this.option.bodychild[i];
            $('<div style="height: 50%;"><div class="bot-row-title">' +
                '<img src="' + _this.imgUrl + element.iconImg + '" alt=""><span>' + element.key + '</span>' +
                '</div><div class="bot-row-content' + i + '"></div></div>').clone().appendTo(_this._custombody).appendTo(_this._body);
        }
    }
    var style = buildOptionStyle(_this.option.buttomChild.style);
    this._customBottom = $(
        '<div>' +
        '    <span id="titleText"'+style+'>' + _this.option.buttomChild.key + '</span>' +
        '    <span id="timeView" style="float: right;margin-right: 11px;"></span>' +
        '</div>'
    ).appendTo(_this._bottom)
    this._header.appendTo(_this._html);
    this._body.appendTo(_this._html);
    this._bottom.appendTo(_this._html);
    initStyle()
}

var buildOptionStyle = function (style) { 
    var styleStr = ' style="';
    for (var key in style) { 
        styleStr += (key + ':' + style[key] + ';');
    }
    styleStr += '" ';
    return styleStr;
}

BoxCard.prototype.render = function () {
    return this._html;
}

BoxCard.prototype.init = function () {
    var _this = this;
    this.option.data.forEach(item => {
        var cloneHtml = this._html.clone();
        for (const key in _this.option.bodychild) {
            if (_this.option.bodychild.hasOwnProperty.call(_this.option.bodychild, key)) {
                const itemData = _this.option.bodychild[key];
                for (let i = 0; i < itemData.enKey.length; i++) {
                    const enkeys = itemData.enKey[i];
                    // 2021-05-27 陈薪名 修改bug HNXGTKJ-1597
                    var _span = $('<div class="body_item_row"><span class="span_value" style="color:' + _this.option.statusData[item.status].color + '">' + item[enkeys] + '</span><span class="value_unit" style="color:' + _this.option.statusData[item.status].color + '">' + '%' + '</span></div>').clone()
                    cloneHtml.find('.bot-row-content' + key).append(_span)
                }
            }
        }
        if (_this.option.buttomChild.isHaveDiv == 1) {
            var timeView = $('<span>' + _this.option.buttomChild.title + item.time + '</span>')
            cloneHtml.find('.card-bottom #timeView').append(timeView)
        }
        if (_this.option.buttomChild.key == '详情') {
            var timeView = $('<span>' + _this.option.buttomChild.title + item.time + '</span>')
            cloneHtml.find('.card-bottom #timeView').append(timeView)
        }
        if (item.title && item.title !== '') {
            cloneHtml.find('#titleName').html(item.title);
        }
        cloneHtml.find('.card-header .toDoListSum img')[0].src = _this.option.statusData[item.status].img;
        cloneHtml.unbind().bind('click', function () {
            // TODO wuye选中取消
            _this.option.el.find('.card').removeClass("cardActive");
            $(this).addClass('cardActive')
            _this.option.onClick(item)
        })
        if (_this.option.idView && _this.option.idView != '') {
            _this.option.el.find('#' + _this.option.idView).append(cloneHtml);
        } else { 
            _this.option.el.find('.' + _this.option.classView).append(cloneHtml);
        }
    });
}
BoxCard.prototype.reset = function (data) {
    var _this = this;
    if (_this.option.idView && _this.option.idView != '') {
        _this.option.el.find('#' + _this.option.idView).empty();
    } else { 
        _this.option.el.find('.' + _this.option.classView).empty();
    }
    for (let k = 0; k < data.length; k++) {
        const item = data[k];
        var cloneHtml = this._html.clone();
        for (const key in _this.option.bodychild) {
            if (_this.option.bodychild.hasOwnProperty.call(_this.option.bodychild, key)) {
                const itemData = _this.option.bodychild[key];
                for (let i = 0; i < itemData.enKey.length; i++) {
                    const enkeys = itemData.enKey[i];
                    // 2021-04-12 陈薪名 修改 指标详细信息单位显示问题
                    var fh = '';
                    if (item[enkeys].indexOf("环比") != -1 ) {
                        fh = '%';
                    } else{
                        fh = item.unitCode;
                    }
                    // 2021-05-27 陈薪名 修改bug HNXGTKJ-1597
                    var _span = $('<div class="body_item_row' + key + '"><span class="span_value" style="color:' + _this.option.statusData[item.status].color + '">' + item[enkeys] + '</span><span class="value_unit" style="color:' + _this.option.statusData[item.status].color + '">' + fh + '</span></div>').clone()
                    cloneHtml.find('.bot-row-content' + key).append(_span)
                    var _span_last = $('<div class="body_item_row"><span class="span_value" style="color:#2b5394' + '">' + item[enkeys] + '</span><span class="value_unit" style="color:#2b5394' + '">' + fh + '</span></div>').clone()
                    cloneHtml.find('.bot-row-content1').empty().append(_span_last)
                }
            }
        }
        if (_this.option.buttomChild.isHaveDiv == 1) {
            var timeView = $('<span>' + _this.option.buttomChild.title + item.time + '</span>')
            cloneHtml.find('.card-bottom #timeView').append(timeView)
        }
        if (_this.option.buttomChild.isChangeByData) {
            cloneHtml.find('#titleText').html(item.indexNatureCode);
        }
        cloneHtml.find('#titleText').unbind().bind('click', function () {
            _this.event.onClickInfo(item)
            return false;//阻止点击‘详情’事件冒泡到BoxCardView触发fnRenderMap()
        })
        if (item.title && item.title !== '') {
            //js截取headerTitle长度，解决二次渲染css失效问题
            if(item.title.length > 13){
                item.title = item.title.substring(0,12) + '...';
            }
            cloneHtml.find('#titleName').html(item.title);
        }
        if (_this.option.headerRightType == 'img') {
            cloneHtml.find('.card-header .toDoListSum img')[0].src = _this.option.statusData[item.status].img;
        } else { 
            cloneHtml.find('#headerRight').html(item.weightGrade);
            var colorIndex = 0;
            if (item.weightGrade < 60) {
                colorIndex = 4;
            } else if (item.weightGrade >= 60 && item.weightGrade < 80) {
                colorIndex = 3;
            } else { 
                colorIndex = 2;
            }
            cloneHtml.find('#headerRight')[0].style.background = _this.option.headerBgColorArr[colorIndex].color;
        }
        cloneHtml.unbind().bind('click', function () {
            // TODO wuye选中取消
            _this.option.el.find('.card').removeClass("cardActive");
            $(this).addClass('cardActive')
            _this.option.onClick(item)
        })
        
        if (k == 0 && _this.option.defaultSelectIndex !== -1) {
            cloneHtml.addClass('cardActive')
        }
        if (_this.option.idView && _this.option.idView != '') {
            _this.option.el.find('#' + _this.option.idView).append(cloneHtml);
        } else { 
            _this.option.el.find('.' + _this.option.classView).append(cloneHtml);
        }
    }
}

BoxCard.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

var initStyle = function () {
    var style = document.createElement('style');
    var innerHTML = '';
    for (const key in styles) {
        const styleItem = styles[key];
        if (styles.hasOwnProperty.call(styles, key)) {
            innerHTML += '.' + styleItem.key + '{'
            for (const key in styleItem.main) {
                if (styleItem.main.hasOwnProperty.call(styleItem.main, key)) {
                    const element = styleItem.main[key];
                    innerHTML += key + ':' + element + ';'
                }
            }
            // JSON.stringify(styleItem.main)
            innerHTML += '}\n'
        }
    }
    style.innerHTML = innerHTML;
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
}
var styles = [
    {
        key: 'card',
        main: {
            "height": '259px',
            "box-shadow": "1px 1px 5px 1px rgba(0, 0, 0, .3)",
            "width": "305px",
            "max-height": "260px",
            "margin-right": "28px",
            "margin-top": "20px",
        },
        content: { type: '' }
    },
    {
        key: 'card:hover',
        main: {
            "background-color": '#eeeeee',
        },
        content: { type: '' }
    },
    {
        key: 'card:active',
        main: {
            "background-color": 'rgba(2, 125, 180, 0.101960784313725)',
        },
        content: { type: '' }
    },
    {
        key: 'cardActive',
        main: {
            "background-color": 'rgba(2, 125, 180, 0.101960784313725)',
        },
        content: { type: '' }
    },
    {
        key: 'card-header',
        main: {
            "position": "relative",
            'height': '42px',
            'line-height': '42px',
            'padding': '0 15px',
            'border-bottom': '1px solid #f6f6f6',
            'color': '#333',
            'border-radius': '2px 2px 0 0',
            'font-size': '16px',
        },
        content: { type: '' }
    },
    {
        key: 'card-body',
        main: {
            "height": "153px",
            "overflow": "hidden",
            'position': 'relative',
            'padding': '10px 15px',
            'line-height': '24px',
        },
        content: { type: '' }
    },
    {
        key: 'card-bottom',
        main: {
            "box-sizing": "border-box",
            "width": "100%",
            "border-top": "1px solid #f2f2f2",
            "padding": "10px 15px",
        },
        content: { type: '' }
    },
    {
        key: "card .card-header .card-title",
        main: {
            "padding": "0 10px",
            "height": "100%",
            'display': 'flex',
            'justify-content': 'space-between',
        },
        content: { type: '' }
    },
    {
        key: 'spans',
        main: {
            'font-weight': '700',
            'font-size': '18px',
            'margin-right': '5px',
        }
    },
    {
        key: 'bot-row-title',
        main: {
            'margin-left': '20px',
        }
    },
    {
        key: 'card-body .body_item_row',
        main: {
            'text-align': 'right',
        }
    },
    {
        key: 'card-body .body_item_row .span_value',
        main: {
            'font-size': '22px',
            'font-weight': '700',
            'color': '#2b5394',
            'padding-right': '10px',
        }
    },
    {
        key: 'card-body .body_item_row .value_unit',
        main: {
            'font-size': '14px',
        }
    },
    {
        key: 'card-body .body_item_row0',
        main: {
            'text-align': 'right',
        }
    },
    {
        key: 'card-body .body_item_row0 .span_value',
        main: {
            'font-size': '22px',
            'font-weight': '700',
            'color': '#2b5394',
            'padding-right': '10px',
        }
    },
    {
        key: 'card-body .body_item_row0 .value_unit',
        main: {
            'font-size': '14px',
        }
    },

    {
        key: 'titleName',
        main: {
            "overflow": 'hidden',
            "white-space": "nowrap",
            "text-overflow": "ellipsis"
        }
    },
    {
        key: 'headerRight',
        main: {
            "border-radius": '50% / 50%',
            "height": "26px",
            "line-height": "26px",
            "width": "60px",
            "font-size": "15px",
            "color": "#FFF",
            "background": "greenyellow",
            "text-align": "center",
            "margin-top" : "8px"
        }
    },
]
export default BoxCard;