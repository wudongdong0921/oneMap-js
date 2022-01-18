////////////////////////////////////////////////
// 左侧切换框架
// 穆松鹤
// 2020-09-23 16:30:44
////////////////////////////////////////////////

var LeftBar = function () {
    this.box = $('<div class="OneMap_LeftBar_Box"></div>');
    this.html = $('<div class="OneMap_LeftBar"></div>').appendTo(this.box);
    this.barButtonBox = $('<div class="barButtonBox"></div>').appendTo(this.box)
    this.barSideLeft = $('<div class="bar-side"><i class="layui-icon layui-icon-template-1 sideIcon"></i></div>').appendTo(this.barButtonBox)
    this.barSideClose = $('<div class="bar-close"><i class="layui-icon layui-icon-close-fill sideIcon"></i></div>').appendTo(this.barButtonBox)
    this.children = {};
    this.off = true
    this.barSideLeft.click(() => {
        this.event.handleUnfoldEvent()
        // if (this.off) {
        //     this.hide()
        //     this.shrink()
        //     this.off = false
        // } else {
        //     this.showScene()
        //     this.fold()
        //     this.off = true
        // }

    })
    this.event = {
        closeScene: function () { },
        handleUnfoldEvent: function() {}
    }
    this.barSideClose.click(() => {
        this.event.closeScene()

    })
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
LeftBar.prototype.showScene = function (event) {
    this.html.css('width', '300px');
};
LeftBar.prototype.shrink = function (event) {
    this.barButtonBox.css('left', '0px');
};
LeftBar.prototype.fold = function (event) {
    this.barButtonBox.css('left', '320px');
};

LeftBar.prototype.setSingle = function (events) {
    this.children[events.icon] = events.event.html;
    this.html.append(events.event.html)
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
LeftBar.prototype.renderSubBoxOne = function (element) {
    this.children.MapSource = element.MapSource.event.html;
    this.html.append(element.MapSource.event.html)
}
LeftBar.prototype.handleCloseScene = function (event) {
    this.event.closeScene = event
}
LeftBar.prototype.handleUnfold = function(event) {
    this.event.handleUnfoldEvent = event
}
export default LeftBar;
