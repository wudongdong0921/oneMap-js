var htmlOption = function (data) {
    var playImg = data.playImg !== '' ? data.playImg : './static/icon/play.svg';
    var endPlayImg = data.endImg !== '' ? data.endImg : './static/icon/time-out.svg';
    return {
        playBtn: '<img src="' + playImg + '" class="paly-img" id="play" alt="">',
        endPlayBtn: '<img src="' + endPlayImg + '"  width="30px" class="standstill-img" id="standstill" alt="">',
        line: '<div class="line-box-body"><div class="icon-line"></div></div>',
        // 左右小箭头放弃使用
        left: '<i class="left itab"></i>',
        right: '<i class="right itab"></i>'
    };
}
var playLinePro = function (options) {
    var _this = this;
    this.option = $.extend({}, {
        el: "",// 页面渲染选择器
        timeArray: ['2011', '2012', '2013', '2014','2015','2016', '2021'],// 时间点数组
        auto: false,// 是否自动播放
        playImg: "",// 自定义待播放图片
        endImg: "",// 自定义待暂停图片
    }, options);
    this.event = {
        play: function () { },
        endPlay: function () { },
        playClick: function () { }
    }
    this.html = $('<div class="play-line" id="playLine"></div>');
    this.play = $(htmlOption(this.option).playBtn).appendTo(this.html);
    this.endPlay = $(htmlOption(this.option).endPlayBtn).appendTo(this.html);
    this.lineBoxBody = $(htmlOption(this.option).line).appendTo(this.html);
    this.option.el.append(this.html);
    initStyle('playLine');
}
playLinePro.prototype.setRenderData = function(data){
    var _this = this
    this.option.timeArray = data;
    this.data = new Date();
    this.Model(() => {
        //this.selctTime = this.data.getFullYear();// 当前时间
        this.selctTime = new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear();//服务器当前时间
        this.renderTimeArray(this.selctTime);
    });
    this.play.unbind().bind('click', function () {
        _this.onPaly();
        _this.event.play(this);
    })
    this.endPlay.unbind().bind('click', function () {
        _this.onStop()
        _this.event.endPlay(this);
    })
}
// 定义model
playLinePro.prototype.Model = function (cb) {
    this.playIndex = 0;// 定义播放index
    this.selctTime = '';// 定义选中时间
    this.allPlayTime = [];// 播放时间数据
    cb()
}

playLinePro.prototype.renderView = function () {
    var _this = this;
    // 每次先删除节点后渲染新的
    this.html.find('.line-box-body').remove();
    this.lineBoxBody = $(htmlOption(this.option).line).appendTo(this.html);
    // 默认播放数据
    var playDataArray = this.allPlayTime;
    for (let i = 0; i < playDataArray.length; i++) {
        const lineItem = playDataArray[i];
        var itemLine = $('<div class="item"><div class="item-icon"></div><p>' + lineItem + '</p></div>').clone();
        if (lineItem == this.selctTime) {
            itemLine.find('.item-icon').addClass('item-icon-active');
            // 执行渲染函数
        }
        itemLine.unbind().bind('click', function () {
            _this.onStop(this);
            var thisValue = this.innerText;
            _this.setData({ selctTime: this.innerText }, function () {
                _this.html.find('.item .item-icon').removeClass("item-icon-active");
                $(this).find('.item-icon').addClass('item-icon-active');
                _this.renderTimeArray(thisValue)
                _this.event.playClick()
            })
        })
        this.lineBoxBody.append(itemLine)
    }
}

playLinePro.prototype.setData = function (data, cb) {
    for (const key in data) {
        if (data.hasOwnProperty.call(data, key)) {
            const item = data[key];
            this[key] = item;
        }
    }
    cb();
}

playLinePro.prototype.renderTimeArray = function (time) {
    var playArray = []
    var _this = this;
    if (this.option.timeArray.length !== 0) {
        for (let i = 0; i < this.option.timeArray.length; i++) {
            const timeItems = this.option.timeArray[i];
            if (time == timeItems) {
                if (this.option.timeArray[i - 1]) {
                    playArray.push(this.option.timeArray[i - 1])
                }
                playArray.push(timeItems);
                _this.playIndex = i;
                if (this.option.timeArray[i + 1]) {
                    playArray.push(this.option.timeArray[i + 1])
                };
            }
        }
        this.setData({
            allPlayTime: playArray
        }, function () {
            _this.renderView();
        })
    }
}

playLinePro.prototype.nextPlay = function () {
    var _this = this;
    var nextYear = '';
    for (let i = 0; i < this.allPlayTime.length; i++) {
        const item = this.allPlayTime[i];
        if (item == this.selctTime) {
            if (this.allPlayTime[i + 1]) {
                nextYear = this.allPlayTime[i + 1];
                console.log(nextYear)
                this.setData({
                    selctTime: nextYear
                }, () => {
                    _this.renderTimeArray(nextYear);
                })
                return false;
            } else {
                i = 0;
                this.setData({
                    selctTime: this.option.timeArray[0]
                }, () => {
                    _this.renderTimeArray(this.option.timeArray[0]);
                })
                return false;
            }
        }
    }
}

playLinePro.prototype.onStop = function (view) {
    this.html.find("#standstill").css("display", "none");
    this.html.find("#play").css("display", "inline-block");
}

playLinePro.prototype.onPaly = function (that) {
    this.html.find('#standstill').css("display", "inline-block");
    this.html.find("#play").css("display", "none");
}
playLinePro.prototype.getTime = function () {
    return this.selctTime;
}

playLinePro.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}
var initStyle = function (renderId) {
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
    document.getElementById('play_line').appendChild(style);
}

var layout = {
    screen: { width: 1920, height: 1080 },
    styles: {
        'play-line': { main: 'position: absolute;left: 50%; bottom: 10%; width: 275px;; height: 50px; transform: translateX(-50%); overflow: hidden;' },
        'play-line .paly-img': { main: 'position: absolute;top: 50%; transform: translateY(-50%);left:10%;cursor: pointer;' },
        'play-line .standstill-img': { main: 'position: absolute;top: 50%; display: none; transform: translateY(-50%);left:10%;cursor: pointer;' },
        'play-line .line-box-body': { main: 'position: absolute; top: 0; right: 0; width: 74%; height: 100%; display: flex; justify-content: space-evenly;' },
        'play-line .line-box-body .icon-line': { main: 'position: absolute; top: 50%; right: 0; width: 100%; height: 1px; background:#6d6d6d;' },
        'play-line .item': { main: 'position: relative; z-index: 9; padding-top: 15px; width: 20%; height: 100%; font-size: 14px; text-align: center;    cursor: pointer;' },
        'play-line .item-icon': { main: 'width: 10px; height: 10px; background: #12adf1; border-radius: 10px; display: inline-block;' },
        'play-line .item-icon-active': { main: 'width: 10px; height: 10px; background: #1b4d93; border-radius: 10px; display: inline-block; border: 3px solid #12adf1;' },
        'play-line .line-box-body .icon-line .itab': { main: ' border: solid #6d6d6d; border-width: 0 1px 1px 0; display: inline-block; padding: 3px;' },
        'play-line .right': { main: 'position: absolute; right: 2px; top: -3px; transform: rotate(-45deg); -webkit-transform: rotate(-45deg);' },
        'play-line .left': { main: 'position: absolute; top: -3px; transform: rotate(135deg); -webkit-transform: rotate(135deg); }' },
    },
    blocks: [{
        key: 'backgroundMark',
        style: { width: 1920, height: 1080, background: 'radial-gradient(transparent,transparent,transparent,#3c9d987a,#133d3b)', 'image-rendering': '-webkit-optimize-contrast' },
        class: ['play-line .paly-img'],
    }]
}

export default playLinePro