////////////////////////////////////////////////
// 左侧切换框架
// 穆松鹤
// 2020-09-23 16:30:44
////////////////////////////////////////////////

var LeftBar = function () {
    this.html = $('<div class="OneMap_LeftBar"></div>');
    this.children = {};
};


LeftBar.prototype.show = function (event) {
    for (const key in this.children) {
        if (this.children.hasOwnProperty(key)) {
            const element = this.children[key];
            element.css('display', 'none');
        }
    };
    this.html.css('width', '300px');
    this.children[event.icon].show();
};

LeftBar.prototype.hide = function (event) {
    this.html.css('width', '0px');
    // this.children[event.icon].hide();
};

LeftBar.prototype.renderSubBox = function (events) {
    for (const key in events) {
        if (events.hasOwnProperty(key)) {
            const element = events[key];
            if (element.event) {
                this.children[key] = element.event.html;
                this.html.append(element.event.html)
            };
        }
    }
};
export default LeftBar;
