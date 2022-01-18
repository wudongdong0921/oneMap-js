var assessmentIndexList = function (options) {
    this.option = $.extend({}, {
        itemArray: [{
            label: 'label',
            value: 0,
            percent : 0
        }],
    }, options);
}

assessmentIndexList.prototype.getHtml = function () {
    var _this = this;
    var resultHtml = $('<div></div>');
    if (this.option.itemArray.length !== 0) {
        for (let i = 0; i < _this.option.itemArray.length; i++) {
            const item = _this.option.itemArray[i];
            var itemHtml = '';
            if (i != 0) {
                itemHtml = $('<div class="progress_div" style="margin-top : 20px;"></div>');
            } else { 
                itemHtml = $('<div class="progress_div"></div>');
            }
            var labelHtml = $('<div class="progress_label">' + item.label + '</div>').appendTo(itemHtml);
            var progressHtml = $('<div class="progress_bg"><div class="progress_inner" style="width : ' + item.percent + '%"></div></div>').appendTo(itemHtml);
            var valueHtml = $('<div class="progress_value">' + item.value + '</div>').appendTo(itemHtml);
            resultHtml.append(itemHtml);
        }
    }
    return resultHtml;
}

export default assessmentIndexList;