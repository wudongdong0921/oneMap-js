////////////////////////////////////////////////
// 二级子菜单
// 穆松鹤
// 2020-09-23 18:39:11
////////////////////////////////////////////////
var subItem = function (data, parent) {
    this.data = data;
    this.parent = parent;
    this.html = $('<div class="OneMap_LeftBar_Sub_Item"></div>');
    this.icon = $('<div class="OneMap_LeftBar_Sub_Item_icon" style="background:' + data.color + '"><svg class="icon" aria-hidden="true"><use xlink:href="#' + data.icon + '"></use></svg><br></div>');
    this.span = $('<div class="OneMap_LeftBar_Sub_Item_name"></div>');
    if (data.name.length > 5) {
        this.span.css({
            'line-height': '18px',
            'padding': '5px 0 0 0',
        });
        data.name = data.name.split('');
        data.name.splice(4, 0, '<br>');
        data.name = data.name.join('');
        this.span.html(data.name);
    } else {
        this.span.text(data.name);
    };
    this.html.append(this.icon).append(this.span);
    this.html.click(() => {
        this.parent.active(this);
    });
};
subItem.prototype.active = function () {
    this.html.addClass('active');
};
subItem.prototype.unActive = function () {
    this.html.removeClass('active');
};

var subMenu = function () {
    this.html = $('<div class="OneMap_LeftBar_SubBox style="height:75px"></div>');
    this.children = [];
    this.event = function () { };
    this.Height = 90;
    this.html.hover(() => {
        this.html.css('height', this.Height + 'px');
    }, () => {
        this.html.css('height', '90px');
    });
};

subMenu.prototype.onClick = function (event) {
    this.event = event;
};

subMenu.prototype.active = function (item) {
    for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        element.unActive();
    };
    item.active();
    this.event(item.data);
};

subMenu.prototype.setChildren = function (data) {
    this.children = [];
    this.html.empty();
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var item = new subItem(element, this);
        this.children.push(item);
        this.html.append(item.html);
    };
    this.Height = Math.ceil(data.length / 4) * 90;

    setTimeout(() => {
        this.children[0].html.click();
    }, 200);

};

export default subMenu;