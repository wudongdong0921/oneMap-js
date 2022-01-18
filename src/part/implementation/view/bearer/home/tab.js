let tabView = function (options) {
    this.option = $.extend({}, {
        el: '',
        list: [{
            class: 'pie-tab-item',
            lable: '市级',
            level: 0
        }, {
            class: 'pie-tab-item',
            lable: '县级',
            level: 1
        }]
    }, options);
    this.newLevel = "";
    this.event = {
        click: function () { }
    }
}
tabView.prototype.init = function (level) {
    var _this = this;
    this.option.el.empty();
    for (let i = 0; i < this.option.list.length; i++) {
        const item = this.option.list[i];
        this.itemHtml = $(`<p class="${item.class}">${item.lable}</p>`);
        // if(i == 0){
        //     this.itemHtml.addClass('pie-tab-active');
        // }
        this.itemHtml.bind('click', function () {
            $("."+item.class).removeClass('pie-tab-active');
            $(this).addClass('pie-tab-active');
            _this.event.click(item);
        })
        if (this.levelShow(level, this.itemHtml,i, item)) {
            this.option.el.append(this.itemHtml);
        }
    }
}
tabView.prototype.levelShow = function (level, handelHtml,index, data) {
    if (level == 0) {
        if(index == 0){
            handelHtml.addClass('pie-tab-active');
        }
        this.newLevel = '0';
        return true;
    } else if (level == 1) {
        this.newLevel = '1'
        if (data.lable == '市级') {
            return false
        } else {
            handelHtml.addClass('pie-tab-active');
            return true;
        }
    }else if(level == '市级'){
        this.newLevel = '1'
        if (data.lable == '市级') {
            return false
        } else {
            handelHtml.addClass('pie-tab-active');
            return true;
        }
    }
     else {
        this.newLevel = ''
        return false
    }
}
tabView.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    };
}
export default tabView