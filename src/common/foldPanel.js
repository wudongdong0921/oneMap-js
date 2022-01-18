////////////////////////////////////////////////
// 折叠面板组件封装
// 吴野
// 2020-12-28 15:47:41
////////////////////////////////////////////////
// {
//     titleName: '底线管控',
//     divId: 'control'
// }, {
//     titleName: '生活品质',
//     divId: 'quality'
// }, {
//     titleName: '结构效率',
//     divId: 'workpiece'
// }
var FoldPanel = function (options) {
    var _this = this;
    this.option = $.extend({}, {
        el: '',
        titleArray: [],
        nolyExtension: true,// 设置是否单一延展
        setContentHtml: function () { },
        defaultShowSubIndex : -1
    }, options);
    this.event = {}
    this._html = $('<div class="foldPanel"></div>');
    this._panelItem = $('<div class="foldPanel-item"></div>');
    this._show = $('<i class="fa fa-angle-down" aria-hidden="true"></i>');
    this._show = $('<i class="fa fa-angle-right" aria-hidden="true"></i>');
}
FoldPanel.prototype.render = function(titleArray,defaultShowSubIndex){
    var _this = this
    _this._panelItem.empty()
    if (titleArray.length !== 0) {
        for (let i = 0; i < titleArray.length; i++) {
            const titleItem = titleArray[i];
            var itemPanel = $('<div class="panel-colla-tiem">' +
                '   <div class="panelTitle">' +
                '       <span id="isUpOrDown" class="isUpOrDown"><i class="fa fa-angle-right iconUpDown" aria-hidden="true"></i></span>' +
                '       <span style="margin-left:10px;">' + titleItem.titleName + '</span>' +
                '   </div>' +
                '   <div class="panelContent" id="' + titleItem.divId + '"></div>' +
                '</div>').clone();
            itemPanel.find('.panelTitle').unbind().bind('click', function () {
                var thisI = $(this).find('.iconUpDown');// 获取当前元素
                var thisAllI = _this._html.find('.iconUpDown');// 获取所有元素
                if (_this.option.nolyExtension) {
                    _this._html.find('.panel-colla-tiem .panelContent').hide()
                    if (thisI[0].classList.contains('fa-angle-right')) {
                        thisI.removeClass('fa-angle-right')
                        thisI.addClass('fa-angle-down')
                        thisAllI.not(thisI).removeClass('fa-angle-down');// 选中除当前元素的所有元素
                        thisAllI.not(thisI).addClass('fa-angle-right'); // 选中除当前元素的所有元素
                        $(this).parent('.panel-colla-tiem').find('.panelContent').show();
                    } else {
                        thisI.removeClass('fa-angle-down')
                        thisI.addClass('fa-angle-right')
                        thisAllI.not(thisI).removeClass('fa-angle-down');
                        thisAllI.not(thisI).addClass('fa-angle-right');
                        $(this).parent('.panel-colla-tiem').find('.panelContent').hide();
                    }
                }else{
                    if (thisI[0].classList.contains('fa-angle-right')) {
                        thisI.removeClass('fa-angle-right')
                        thisI.addClass('fa-angle-down')
                        $(this).parent('.panel-colla-tiem').find('.panelContent').show();
                    } else {
                        thisI.removeClass('fa-angle-down')
                        thisI.addClass('fa-angle-right')
                        $(this).parent('.panel-colla-tiem').find('.panelContent').hide();
                    }
                }
                _this.option.setContentHtml($(this,titleItem))
            })
            if (defaultShowSubIndex == i) {
                var item = itemPanel.find('.fa-angle-right');
                item.removeClass('fa-angle-right')
                item.addClass('fa-angle-down')
                itemPanel.find('.panelContent').show();
            }
            _this._panelItem.append(itemPanel);
            
        }
    }
}
FoldPanel.prototype.init = function () {
    initStyle();
    this._html.append(this._panelItem);
    return this._html;
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
        'foldPanel .foldPanel-item': { main: 'border-top:1px;border-top:solid;' },
        'foldPanel .foldPanel-item:first-child': { main: "border-top: none;" },
        'foldPanel .panelTitle': { main: 'position: relative;border :1px solid #e6e6e6; height: 42px; line-height: 42px; padding: 0 15px 0 10px; color: #333; cursor: pointer; font-size: 14px; overflow: hidden;' },
        'foldPanel .panelContent': {
            main: 'padding-bottom: 10px; line-height: 22px; color: #666;display: none;'
        },
        'foldPanel .showContent': { main: 'display: none block!important;' },
        'foldPanel .hideContent': { main: 'display: none none;' },
    },
    blocks: [{
        key: 'backgroundMark',
        style: {},
        class: ['play-line .paly-img'],
    }]
}
export default FoldPanel;