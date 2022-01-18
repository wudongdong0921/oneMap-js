////////////////////////////////////////////////
// 排序组件封装
// 吴野
// 2021-01-05 17:40:02
////////////////////////////////////////////////
var RankingList = function (options) {
    var _this = this;
    this.option = $.extend({}, {
        el: "",
        title: '排行榜',
        data: [{
            aaa: '1',
            bbb: '哈尔市',
            ccc: '93.00'
        }, {
            aaa: '2',
            bbb: '牡丹市',
            ccc: '93.00'
        }],
        forStructure: [{ key: 'aaa', value: 'index' }, { key: 'bbb', value: 'name' }, { key: 'ccc', value: 'number' }]
    }, options)
    this._html = $('<div class="ranking-view"></div>');
    this._header = $('<div class="ranking-view header" style="border:none;box-shadow: none;">' + this.option.title + '</div>');
    this._body = $('<div class="layui-card-body" style="border:none;box-shadow: none;"></div>');
    this._ul = $('<ul class="ranking-list"></ul>')
    this.handelStructure()
    initStyle()
}

RankingList.prototype.init = function () {
    var _this = this;
    this._body.empty();
    this._ul.empty();
    if (this.option.data.length !== 0) {
        for (let i = 0; i < this.option.data.length; i++) {
            const itemData = this.option.data[i];
            var itemHtml = $('<li><p id="indexP">' + itemData.index + '</p ><p>' + itemData.name + '</p><p style="max-width:70px;min-width:70px;">' + itemData.number + '</p></li > ').clone();
            if (itemData.index == 1) {
                itemHtml.find('#indexP').addClass('active');
            } else if (itemData.index == 2 || itemData.index == 3) {
                itemHtml.find('#indexP').addClass('noActive');
            } else { 
                itemHtml.find('#indexP').addClass('normal');
            }

            _this._ul.append(itemHtml);
        }
        _this._body.append(_this._ul);
        _this._html.append(_this._body);
    }
    return this._html
}


RankingList.prototype.handelStructure = function (data) {
    var _this = this;
    var handelArray = [];
    if (_this.option.forStructure.length !== 0) {
        for (let j = 0; j < _this.option.data.length; j++) {

            var dataStructure = {
                index: '',
                name: '',
                number: ''
            }
            const item = _this.option.data[j];
            for (let i = 0; i < _this.option.forStructure.length; i++) {
                const forItem = _this.option.forStructure[i];
                switch (forItem.value) {
                    case "index":
                        dataStructure.index = item[forItem.key]
                        break;
                    case "name":
                        dataStructure.name = item[forItem.key]
                        break;
                    case "number":
                        dataStructure.number = item[forItem.key]
                        break;
                    default:
                        break;
                }
            }
            handelArray.push(dataStructure)
        }
        _this.option.data = handelArray;
    }
}
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
    screen: { width: 1920, height: 1080 },
    styles: {
        'ranking-view': { main: 'border: none; box-shadow: none;border-radius: 2px; background-color: #fff;' },
        'ranking-view .header': {
            main: 'border: none; box-shadow: none;position: relative; height: 42px; line-height: 42px;' +
                'padding: 0 15px; border-bottom: 1px solid #f6f6f6; color: #333; border-radius: 2px 2px 0 0; font-size: 16px;'
        },
        'ranking-view .ranking-list': { main: " width: 100%;" },
        'ranking-view .ranking-list .active': {
            main: ' border-radius: 100%; width: 30px;height: 30px; text-align: center; line-height: 30px;' +
                'background: #ffcc00; color: #fff '
        },
        'ranking-view .ranking-list li': {
            main: 'width: 100%; display: flex; justify-content: space-between; line-height: 37px; font-size: 18px; margin-bottom:10px;'
        },
        'ranking-view .ranking-list .noActive': {
            main: 'border-radius: 100%; width: 30px; height: 30px; text-align: center; line-height: 30px; background: #cccccc;' +
                ' color: #fff;'
        },
        'ranking-view .ranking-list .normal': {
            main: 'width: 30px; height: 30px; text-align: center; line-height: 30px;' +
                ' color: #333;'
        }
    },
    blocks: [{
        key: 'backgroundMark',
        style: {},
        class: ['play-line .paly-img'],
    }]
}
export default RankingList;