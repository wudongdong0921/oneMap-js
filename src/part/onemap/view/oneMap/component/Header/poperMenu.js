////////////////////////////////////////////////
// 用户功能菜单按钮
// 穆松鹤
// 2020-09-23 11:17:32
////////////////////////////////////////////////

var poperMenu = function () {
    this.html = $('<div class="OneMap_userinfo_poperMenu"></div>');
    this.poperBox = $('<div class="OneMap_userinfo_poperMenu_box"></div>').appendTo(this.html);
    this.event = {
        permission: {
            name: '个人权限',
            event: function () {
                icu.alert.normal({
                    text: '个人权限'
                });
            },
        },
        password: {
            name: '修改密码',
            event: function () {
                icu.alert.normal({
                    text: '修改密码'
                });
            },
        },
        logout: {
            name: '退出登录',
            event: function () {
                icu.alert.normal({
                    text: '退出登录'
                });
            },
        },
    };
    for (const key in this.event) {
        if (this.event.hasOwnProperty(key)) {
            const element = this.event[key];
            const item = $('<div class="OneMap_userinfo_poperMenu_item">' + element.name + '</div>');
            item.click(() => {
                element.event();
            });
            this.poperBox.append(item);
        }
    };
};

poperMenu.prototype.onPermission = function (event) {
    this.event.permission.event = event;
};

poperMenu.prototype.onPassword = function (event) {
    this.event.password.event = event;
};

poperMenu.prototype.onLogout = function (event) {
    this.event.logout.event = event;
};

export default poperMenu;