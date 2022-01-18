import UTIL from './util'
import CssConfig from './optionConfig/boxCardPros/css';
import ConfigUtil from './optionConfig/boxCardPros/configData';
var statusObj = {
    0: {
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    1: {
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    2: {
        img: './static/icon/safety.svg',
        color: '#2b5394'
    },
    3: {
        img: './static/icon/warning.svg',
        color: '#f7a031'
    },
    4: {
        img: './static/icon/danger.svg',
        color: '#db1029'
    }
    //后端4是超载danger
}
var BoxCardPros = function (setOption) {
    var _this = this;
    this.allOption = setOption;
    this.event = {
        headerClick: function () { },
        bottomClick: function () { },
        bodyClick: function () { },
        onClick: function () { }
    };
    UTIL.initStyle('boxCardProsCssConfig', CssConfig)
};
BoxCardPros.prototype.SetHeaderData = function (setOption) {
    // BoxCardPros.prototype
    this.headerOption = $.extend({}, {
        type: 'img', // 渲染类型，可根据类型判断标题右侧显示
        onClick: undefined, // 是否有点击事件
        title: "", // 头部标题显示
        status: '' // 预警状态
    }, setOption);
    var _headerHtml = $(`<div class="card-header">
                            <div class="card-title">
                                <span class="spans" id="titleName"></span>
                                <span class="spans toDoListSum" id="toDoListSum"></span>
                            </div>
                        </div>`);
    if(this.headerOption.title.length > 13){
        this.headerOption.title = this.headerOption.title.substring(0,12) + '...';
    }
    _headerHtml.find('#titleName').text(this.headerOption.title);
    if (this.headerOption.type == 'img') {
        _headerHtml.find('#toDoListSum').append('<img src="' + statusObj[this.headerOption.status ? this.headerOption.status : '2'].img + '" width="25px" alt="">')
    }
    this._header.append(_headerHtml);
    if (this.headerOption.onClick) {
        this._header.click(() => {
            this.event.headerClick(this.headerOption);
        });
    }
};
BoxCardPros.prototype.SetBootomData = function (setOption) {
    this.bottomOption = $.extend({}, {
        type: '',
        bottomTitle: '',
        titleColor: "blue",// 底部标签样式
        onClick: undefined, // 是否有点击事件
        status: '' // 预警状态
    }, setOption)
    var _bottomHtml = $(`<div>
                        <span id="titleText"></span>
                        <span id="timeView" style="float: right;margin-right: 11px;"></span>
                    </div>`);
    _bottomHtml.find('#titleText').text(this.bottomOption.bottomTitle);
    _bottomHtml.find('#titleText').css({
        color: 'blue',
        cursor: 'pointer' // 2021-05-26 陈薪名 修改bug HNXGTKJ-1702
    })
    if (this.bottomOption.type == 'time') {
        // TODO wuye 自定义添加相应页面
    }

    this._bottom.append(_bottomHtml);
    if (this.bottomOption.onClick) {
        this._bottom.click(() => {
            this.event.bottomClick();
        });
    }

}

BoxCardPros.prototype.SetBodyData = function (setOption) {
    this.bodyOption = $.extend({}, {
        type: setOption[0].type,
        onClick: undefined,
        data: setOption
    })
    var _bodyHtml = $(`<div style="height: 50%;"></div>`);
    if (this.bodyOption.type == 'rowList') {
        for (let i = 0; i < this.bodyOption.data.length; i++) {
            const itemData = this.bodyOption.data[i];
            // 2021-05-26 陈薪名 修改bug HNXGTKJ-1687 新增 style="max-width: 100px;"
            var rowHtml = $(`<div class="bot-row-title">
                                <div id="leftContent" class="leftContent"></div>
                                <div id="rightContent" class="bot-row-content body_item_row" style="max-width: 150px;"></div>
                            </div>`);
            if (itemData.img) {
                rowHtml.find('#leftContent').html('<img src="' + itemData.img + '" alt=""><span>' + itemData.title + '</span>')
            } else {
                rowHtml.find('#leftContent').html('<span>' + itemData.title + '</span>')
            }
            rowHtml.find('#rightContent').append('<span class="span_value" style="color:' +
                statusObj[itemData.status ? itemData.status : '2'].color + '">' + itemData.value + '</span><span class="value_unit_01" style="font-size:5px;color:' +
                statusObj[itemData.status ? itemData.status : '2'].color + '">' + (itemData.bodyUnti ? itemData.bodyUnti : '') + '</span>')
            _bodyHtml.append(rowHtml);
        }
    }
    this._body.append(_bodyHtml);
    if (this.bodyOption.onClick) {
        this._body.click(() => {
            this.event.bodyClick();
        });
    }
};
// 数据处理渲染
BoxCardPros.prototype.initAJAXData = function (data) {
    var AllData = ConfigUtil.handelData(this.allOption, data)
    var _this = this;
    _this.allOption.view.empty()
    for (let i = 0; i < AllData.length; i++) {
        const element = AllData[i];
        _this._html = $('<div class="card"></div>')
        _this._header = $('<div class="card-header"></div>').appendTo(_this._html);
        _this._body = $('<div class="card-body"></div>').appendTo(_this._html);
        _this._bottom = $('<div class="card-bottom"</div>').appendTo(_this._html);
        _this.SetHeaderData(element.header);
        _this.SetBodyData(element.body);
        _this.SetBootomData(element.bottom);
        _this._bottom.unbind().bind('click', function () {
            _this.event.bottomClick(data[i].pffaId)
        })
        _this._html.unbind().bind('click', function () {
            // TODO wuye选中取消
            _this.setPffid(element.header)
            _this.allOption.view.find('.card').removeClass("cardActive");
            $(this).addClass('cardActive')
            _this.event.onClick(element)
        })
        if (i == 0) {
            // _this._html.click()
            _this._html.addClass('cardActive')
            _this.setPffid(element.header)
        }
        _this.allOption.view.append(_this._html)
    }
}
BoxCardPros.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}

BoxCardPros.prototype.setPffid = function (data) {
    this.selectData = data
}

BoxCardPros.prototype.getPffid = function () {
    return this.selectData
}


export default BoxCardPros;