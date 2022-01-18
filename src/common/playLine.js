////////////////////////////////////////////////
// 播放组件封装
// 吴野---------注意：无其他引用后将废弃掉
// 2020-12-29 08:54:30
////////////////////////////////////////////////
//   使用示例
//   var playLineView = new PlayLines({
//     el: _this.$el.find('#play_line'),// 页面选择器
//     lineArray: ['2020','2021','2022','2023','2024','2025'],// 线节点数组
//     auto: false,//true为自动播放  false为非自动播放
//     playImg: 'play.svg', // 播放按钮图片
//     standstillImg: 'time-out.svg', // 暂停按钮图片
//     onChange: function (data) { 
//       console.log(data)
//     },// 轮播变化
//   })
//   playLineView.init()
var PlayLine = function (options) {
    var _this = this;
    this.imgUrl = './static/icon/';
    this.option = $.extend({}, {
        el: '',// 页面选择器
        lineArray: [],// 线节点数组
        auto: false,//true为自动播放  false为非自动播放
        playImg: 'play.svg', // 播放按钮图片
        standstillImg: 'time-out.svg', // 暂停按钮图片
        onChange: function () { },// 播放产生变化
        interval : 2000
    }, options)
    this.event = {
        play: _this.option.play,
        standstill: _this.option.standstill
    }
    this._html = $('<div class="play-line"></div>');
    this._play = $('<img src="' + this.imgUrl + this.option.playImg + '" class="paly-img" id="play" alt="">');
    this._standstill = $('<img src="' + this.imgUrl + this.option.standstillImg + '"  width="30px" class="standstill-img" id="standstill" alt="">');
    this._lineBoxBody = $('<div class="line-box-body"><div class="icon-line"></div></div>');
    this._play.unbind().bind('click', function () {
        _this.onPaly(this);
    })
    this._standstill.unbind().bind('click', function () {
        _this.onStop(this);
    })
}
PlayLine.prototype.onStop = function (view) {
    clearInterval(this.auto);
    this._html.find("#standstill").css("display", "none");
    this._html.find("#play").css("display", "inline-block");
}
PlayLine.prototype.onPaly = function (that) {
    var _this = this;
    this.auto; var j;
    that.style.display = 'none';
    if (that.id == 'play') {
        j = 0;
        clearInterval(_this.auto);
        _this._html.find('#standstill').css("display", "inline-block");
        _this.auto = setInterval(function () {
            j += 1;
            if (j === _this.option.lineArray.length) {
                j = 0;
            }
            for (let i = 0; i < _this.option.lineArray.length; i++) {
                _this._html.find(".item-icon")[i].classList.remove("item-icon-active");
            }
            _this._html.find(".item-icon")[j].classList.add("item-icon-active");
            // map({}, _this.$el.find(".map")[0], Math.round(Math.random() * 10000));
            _this.option.onChange(_this.option.lineArray[j])
        }, _this.option.interval);
    } else {
        _this._html.find("#play").css({ "display": "inline-block" });
    }
}
PlayLine.prototype.init = function () {
    this.option.el.empty();
    var _this = this;
    if (this.option.lineArray.length !== 0) {
        for (let i = 0; i < _this.option.lineArray.length; i++) {
            const lineItem = _this.option.lineArray[i];
            var itemLine = $('<div class="item"><div class="item-icon"></div><p>' + lineItem + '</p></div>').clone();
            if (i == 0) {
                itemLine.find('.item-icon').addClass('item-icon-active');
            }
            itemLine.unbind().bind('click',function(){
                _this.onStop(this);
                _this._html.find('.item .item-icon').removeClass("item-icon-active");
                $(this).find('.item-icon').addClass('item-icon-active')
                _this.option.onChange(this.innerText)
            })
            _this._lineBoxBody.append(itemLine)
        }
    }
    this._play.appendTo(this._html);
    this._standstill.appendTo(this._html);
    this._lineBoxBody.appendTo(this._html);
    this.option.el.append(_this._html);
    if(this.option.auto){
        this._play.click();
    }
    initStyle()
}
var initStyle = function () {
    var style = document.createElement('style');
    var innerHTML = '';
    console.log(layout);
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
        'play-line': { main: 'position: absolute;left: 50%; bottom: 10%; width: 30%; height: 50px; transform: translateX(-50%); overflow: hidden;' },
        'play-line .paly-img': { main: 'position: absolute;top: 50%; transform: translateY(-50%);left:10%;cursor: pointer;' },
        'play-line .standstill-img': { main: 'position: absolute;top: 50%; display: none; transform: translateY(-50%);left:10%;cursor: pointer;' },
        'play-line .line-box-body': { main: 'position: absolute; top: 0; right: 0; width: 80%; height: 100%; display: flex; justify-content: space-evenly;' },
        'play-line .line-box-body .icon-line': { main: 'position: absolute; top: 50%; right: 0; width: 100%; height: 1px; background:#f2f2f2;' },
        'play-line .item': { main: 'position: relative; z-index: 9; padding-top: 15px; width: 20%; height: 100%; font-size: 14px; text-align: center;    cursor: pointer;' },
        'play-line .item-icon': { main: 'width: 10px; height: 10px; background: #12adf1; border-radius: 10px; display: inline-block;' },
        'play-line .item-icon-active': { main: 'width: 10px; height: 10px; background: #1b4d93; border-radius: 10px; display: inline-block; border: 3px solid #12adf1;' }
    },
    blocks: [{
        key: 'backgroundMark',
        style: { width: 1920, height: 1080, background: 'radial-gradient(transparent,transparent,transparent,#3c9d987a,#133d3b)', 'image-rendering': '-webkit-optimize-contrast' },
        class: ['play-line .paly-img'],
    }]
}

export default PlayLine;