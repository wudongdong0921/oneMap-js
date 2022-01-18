////////////////////////////////////////////////
// 选项卡组件封装
// 吴野
// 2021-01-05 16:10:05
////////////////////////////////////////////////
// --------使用方式-------------------
// var tabLableViews = new TabLableView({
//     el: '',
//     itemArray: [{
//         lable: '省级',
//         value: 0
//     }, {
//         lable: '市级',
//         value: 1
//     }, {
//         lable: '县级',
//         value: 2
//     }],
//     default: 0,
//     onClick: function (data) { 
//         console.log(data)
//     }
// })
// this.$el.find('.list-box').append(tabLableViews.init())
var TabLable = function (options) {
    var _this = this;
    this.option = $.extend({}, {
        el: '',
        itemArray: [{
            lable: '省级',
            id:'shengji',
            value: 0
        }, {
            lable: '市级',
            id:'shiji',
            value: 1
        }, {
            lable: '县级',
            id:'xianji',
            value: 2
        }],
        default: 0,
        onClick: function () { }
    }, options)
    this.event = {
        onClick: this.option.onClick?this.option.onClick:function () {}
    }
    this._html = $('<div class="tabLable-view"></div>');
    initStyle()
}

TabLable.prototype.init = function (data) {
    var _this = this;
    if (this.option.itemArray.length !== 0) {
        for (let i = 0; i < _this.option.itemArray.length; i++) {
            const tabItem = _this.option.itemArray[i];
            var tabId = tabItem.id?tabItem.id:""
            var itemHtml = $('<p class="tab-item" id="'+tabId+'"></p').append(tabItem.lable);
            var _tabItemHtml = itemHtml.clone();
            if (i == _this.option.default) {
                _tabItemHtml.addClass('tab-active');
            }
            _tabItemHtml.unbind().bind('click', function () {
                _this._html.find('.tab-item').removeClass('tab-active');
                $(this).addClass('tab-active');
                _this.event.onClick(tabItem);
            })
            _this._html.append(_tabItemHtml);
        }
    }
    return _this._html;
}
TabLable.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};

var initStyle = function () {
    var style = document.createElement('style');
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

var layout = {
    screen: { vidth: 1000, height: 1000 },
    styles: {
        "tabLable-view": { main: 'display: flex; background: #fff; margin-top: 20px; margin-bottom: 30px;' },
        'tabLable-view .tab-item': { main: 'border: 1px solid #f2f2f2; padding: 5px 10px; cursor: pointer;' },
        'tabLable-view .tab-active': { main: 'background: #5294d7; color: #fff;' }
    },
    blocks: [{}]
}

export default TabLable;