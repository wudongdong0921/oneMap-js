 import formatDate from './formatDate'
 
 // 日历控件
 var calendar = function (parent) {
    var _this = this;
    var html = '';
    html += '<div class="form_calendar">';
    html += '    <div class="form_calendar_conteoller">';
    html += '        <div class="form_calendar_select" title="选择年月">';
    html += '           <div class="form_calendar_selectName"></div>';
    html += '           <div class="form_calendar_selectIcon"></div>';
    html += '        </div>';
    html += '        <div class="form_calendar_buttons">';
    html += '           <div class="form_calendar_pre form_calendar_button fa fa-caret-left" title="上个月"></div>';
    html += '           <div class="form_calendar_today form_calendar_button fa fa-circle" title="今天"></div>';
    html += '           <div class="form_calendar_next form_calendar_button fa fa-caret-right" title="下个月"></div>';
    html += '        </div>';
    html += '    </div>';
    html += '    <div class="form_calendar_yearlist"></div>';
    html += '    <div class="form_calendar_dayslist">';
    html += '       <div class="form_calendar_daysTitle">';
    html += '           <div class="form_calendar_weeks">日</div>';
    html += '           <div class="form_calendar_weeks">一</div>';
    html += '           <div class="form_calendar_weeks">二</div>';
    html += '           <div class="form_calendar_weeks">三</div>';
    html += '           <div class="form_calendar_weeks">四</div>';
    html += '           <div class="form_calendar_weeks">五</div>';
    html += '           <div class="form_calendar_weeks">六</div>';
    html += '       </div>';
    html += '       <div class="form_calendar_daysBody">';
    html += '       </div>';
    html += '    </div>';
    html += '</div>';
    this.html = $(html);
    this.year_month = this.html.find('.form_calendar_selectName');
    this.nameBox = this.html.find('.form_calendar_select');
    this.html.click(function (e) {
        e.stopPropagation();
    });
    this.days = this.html.find('.form_calendar_daysBody');
    this.yearList = this.html.find('.form_calendar_yearlist');
    this.daysList = this.html.find('.form_calendar_dayslist');
    var today = new Date();
    this.today = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };
    this.active = {
        year: null,
        month: null,
        day: null,
    };
    this.showDate = {
        year: null,
        month: null
    };
    // this.parent = parent;
    // console.log(this.parent);
    this.pre = this.html.find('.form_calendar_pre');
    this.gotoToday = this.html.find('.form_calendar_today');
    this.next = this.html.find('.form_calendar_next');
    for (var i = 1980; i < this.today.year + 10; i++) {
        var yearItem = $('<div class="form_calendar_yearItem">' + i + '年</div>');
        (function (i, yearItem) {
            yearItem.click(function () {
                _this.yearList.find('.form_calendar_monthList').remove();
                $(this).after(_this.monthTemplate(i));
            });
        })(i, yearItem);
        _this.yearList.append(yearItem);
    };
    this.nameBox.click(function () {
        if (_this.yearList.css('display') == 'block') {
            _this.yearList.css('display', 'none');
            _this.daysList.css('display', 'block');
        } else {
            _this.yearList.css('display', 'block');
            _this.daysList.css('display', 'none');
        };

    });
    this.pre.click(function () {
        _this.yearList.css('display', 'none');
        _this.daysList.css('display', 'block');
        var year = _this.showDate.year,
            month = _this.showDate.month;
        month -= 1;
        if (month == 0) {
            month = 12;
            year -= 1;
            if (year <= 2016) {
                return;
            }
        };
        _this.renderDayslist(year, month,null);
    });
    this.gotoToday.click(function () {
        _this.yearList.css('display', 'none');
        _this.daysList.css('display', 'block');
        _this.renderDayslist(_this.today.year, _this.today.month,null);
    });
    this.next.click(function () {
        _this.yearList.css('display', 'none');
        _this.daysList.css('display', 'block');
        var year = _this.showDate.year,
            month = _this.showDate.month;
        month += 1;
        if (month == 13) {
            month = 1;
            year += 1;
            if (year >= 2056) {
                return;
            }
        };
        _this.renderDayslist(year, month, null);
    });

};
calendar.prototype = {
    constructor: this,
    render: function () {
        return this.html;
    },
    // 根据年月渲染当月日历
    renderDayslist: function (year, month, canclickbefore) {
        if (year == 'error' || month == 'error') {
            year = this.today.year;
            month = this.today.month;
        } else {
            year = parseInt(year);
            month = parseInt(month);
        };
        this.showDate.year = year;
        this.showDate.month = month;
        this.year_month.text(year + '年' + month + '月');
        var _this = this;
        this.days.empty();
        var isLeap = function (year) {
            return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
        };
        month = month - 1;
        var firstday = new Date(year, month, 1),
            dayOfWeek = firstday.getDay(),
            days_per_month = new Array(31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
            str_nums = Math.ceil((dayOfWeek + days_per_month[month]) / 7);
        for (var i = 0; i < str_nums; i += 1) {
            for (var k = 0; k < 7; k++) {
                var idx = 7 * i + k;
                var date = idx - dayOfWeek + 1;
                (date <= 0 || date > days_per_month[month]) ? date = '' : date = idx - dayOfWeek + 1;
                // var day = $('<div class="form_calendar_day">' + date + '</div>');
                var day = $('<div class="form_calendar_day"></div>');
                var dayContent = $('<div class="form_calender_day_content">' + date + '</div>')
                var today = formatDate("z");

                if (date == '') {
                    dayContent.addClass('empty');
                };
                if (year == this.today.year && (month + 1) == this.today.month && date == this.today.day) {
                    dayContent.addClass('today');
                };
                if (year == this.active.year && (month + 1) == this.active.month && date == this.active.day) {
                    dayContent.addClass('active');
                };
                if (today > formatDate("z", (year + '/' + (month + 1) + '/' + date)) && canclickbefore == false) {
                    dayContent.addClass('unactive');
                }

                dayContent.click(function () {
                    // if (canclickbefore == true) {
                    //     _this.activeEvent(year, month + 1, parseInt($(this).text()));
                    // } else {
                    //     var activeday = formatDate("z", (year + '/' + (month + 1) + '/' + parseInt($(this).text())))
                    //     if (activeday >= today) {
                    //         _this.activeEvent(year, month + 1, parseInt($(this).text()));
                    //     }
                    // }

                });

                this.days.append(day);
                day.append(dayContent);
            }
        };
    },
    // 选中当天
    activeEvent: function (year, month, day) {
        var value = year + '/' + month + '/' + day;
        this.active = {
            year: year,
            month: month,
            day: day,
        };
        // if (this.parent.layout) {
        //     this.parent.layout.hideError();
        // };
        $(document).click();
        // this.parent.set(value, true);
        // this.renderDayslist(year, month);
    },
    // 直接选中月份
    monthTemplate: function (year) {
        var _this = this;
        var html = '';
        html += '<div class="form_calendar_monthList"></div>';
        html = $(html);
        var bindClick = function (i, event) {
            event.click(function () {
                _this.yearList.css('display', 'none');
                _this.daysList.css('display', 'block');
                _this.renderDayslist(year, i, true);
            });
        };
        for (var i = 1; i <= 12; i++) {
            var month = $('<div class="form_calendar_monthItem"></div>');
            bindClick(i, month);
            html.append(month.text(i + '月'));
        };
        html.append('<div style="clear:both"></div>');
        return html;
    }
};


export default calendar