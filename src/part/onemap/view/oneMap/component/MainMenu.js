////////////////////////////////////////////////
// 一张图--主菜单
// 穆松鹤
// 2020-09-22 17:10:00
////////////////////////////////////////////////


var MainMenuItem = function (options, parent) {
    this.html = $('<div class="OneMap_MainMenu_item" title="' + options.name + '"><i class="' + options.icon + '"></i></div>');
    this.parent = parent;
    this.options = options;
    this.html.click(() => {
        this.parent.active(this);
    });

};

MainMenuItem.prototype.unActive = function () {
    this.html.removeClass('active');
};

MainMenuItem.prototype.active = function () {
    this.html.addClass('active');
};
var MainMenu = function () {
    this.html = $('<div class="OneMap_MainMenu"></div>');
    this.MineItems = [];

    this.event = {
        active: function () { },
        afterSet: function () { },
    };
    this.ActiveObj = null;
};
MainMenu.prototype.active = function (item) {
    if (item.options.type == 'link') {
        this.event.active(item.options);
    } else {
        if (this.ActiveObj) {
            this.ActiveObj.unActive();
        };
        if (this.ActiveObj === item) {
            this.ActiveObj = null;
            item.unActive();
        } else {
            this.ActiveObj = item;
            item.active();
        };
        this.event.active(this.ActiveObj ? this.ActiveObj.options : null);
    };
};
MainMenu.prototype.setSingle = function (event) {
    let Item = new MainMenuItem(event, this);
    this.MineItems.push(Item);
    this.html.append(Item.html);
};


MainMenu.prototype.setMapping = function (mapKeyMapping) {
    for (const key in mapKeyMapping) {
        if (mapKeyMapping.hasOwnProperty(key)) {
            const element = mapKeyMapping[key];
            let Item = new MainMenuItem(element, this);
            this.MineItems.push(Item);
            this.html.append(Item.html);
        }
    };
    this.event.afterSet(mapKeyMapping);
};

MainMenu.prototype.onAfterSet = function (event) {
    this.event.afterSet = event;
};


MainMenu.prototype.onActive = function (event) {
    this.event.active = event;
};



MainMenu.prototype.setMenuPermission = function () {

};

MainMenu.prototype.render = function () {
    return this.html;
};




export default MainMenu;