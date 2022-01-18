
var MainMenuItem = function (options, parent) {
    this.html = $('<div class="view_3DOneMap_MainMenu_item" title="' + options.name + '"><i class="' + options.icon + '"></i></div>');
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
MainMenuItem.prototype.setEventObject = function () {

};



var mainBar = function (view) {
    this.view = view;
    this.html = $('<div class="view_3DOneMap_MainBar"></div>');
    this.content = $('<div class="view_3DOneMap_MainBar_content" style="width:0px"></div>');
    this.children = {};
    this.view.append(this.html);
    this.view.append(this.content);
    this.activeObject = null;
};

mainBar.prototype.setMenu = function (menuConfig, content, key) {
    if (this.children.hasOwnProperty(key)) {
        this.children.content.remove();
        this.children.button.html.remove();
    };
    var options = {
        content: content,
        button: new MainMenuItem(menuConfig, this),
    };
    this.children[key] = options;
    this.html.append(options.button.html);
    this.content.append(options.content);
    options.content.hide();
};

mainBar.prototype.active = function (event) {
    var active = null;
    for (const key in this.children) {
        if (this.children.hasOwnProperty(key)) {
            const element = this.children[key];
            if (element.button == event) {
                active = element;
            };
        };
    };

    if (active != this.activeObject && this.activeObject !== null) {
        this.activeObject.content.hide();
        this.activeObject.button.unActive();
        this.activeObject = active;
        this.activeObject.content.show();
        this.activeObject.button.active();
        this.content.css({
            width: 300,
        });

    } else if (this.activeObject === null) {
        this.activeObject = active;
        this.activeObject.content.show();
        this.activeObject.button.active();
        this.content.css({
            width: 300,
        });

    } else {
        this.activeObject.content.hide();
        this.activeObject.button.unActive();
        this.activeObject = null;
        this.content.css({
            width: 0,
        });

    };
};



export default mainBar;
