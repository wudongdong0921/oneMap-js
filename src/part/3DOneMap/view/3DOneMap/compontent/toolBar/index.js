
import toolBars from './event'
import menuData from '../../apis/menuJson'
// icon-side-toolbar_share  分享
// icon-denglu 人员
// icon-side-toolbar_storage  保存
// icon-side-toolbar_login  登录
// icon-toolbar-online-edit 编辑
// icon-toolbar-clip 剪切
// icon-toolbar_base-layer 功能
// icon-toolbar-terrain  
// icon-toolbar-measure 测量
// icon-toolbar-analysis  分析

// icon-measure_height 直线测量
// icon-measure_length  横线测量
// icon-measure_area  面积测量

// icon-toolbar_expand 右侧
// icon-toolbar_layer-list  图层
// icon-toolbar-fold 左侧
// icon-toolbar-add_layer 加号 
// icon-toolbar-setting 设置
// icon-side-toolbar_home 主页
// icon-side-toolbar_compass 方向
// icon-measure_clear 清除
// icon-online-edit_contour-line 粗直线
// icon-online-edit_full-line 细直线
// icon-online-edit_dotted-line 虚线
// icon-online-edit_arrow-line 右箭头
// icon-online-edit_pure-color-plane 实心块
// icon-online-edit_gridview-plane 功能2
// icon-online-edit_stripe-plane 斜线块
// icon-online-edit_wake-line 圆形
// icon-online-edit_halo-line 
// icon-spot-light-source 光照1
// icon-point-light-source 光照2
// icon-side-toolbar_cancel-fullscreen 取消全屏
// icon-side-toolbar_fullscreen 全屏
// icon-directional-light-source 全局光
// icon-ICON_huoyan-shangchuan 火焰
// icon-ICON_penquan-shangchuan 喷泉
// icon-ICON_xiayu-shangchuan 雨滴

var toolBarTabItem = function (config, map) {
    this.event = new config(map);
    this.titleBar = $('<div class="tab-item">' + this.event.title + '</div>');
    this.form = new icu.templateForm({
        labelwidth: 120,
    });
    this.form.$setOptions(this.event.formConfig);
    this.content = this.form.$html;
    this.buttons = $('<div class="button-box"></div>');

    for (let i = 0; i < this.event.buttonConifg.length; i++) {
        const element = this.event.buttonConifg[i];
        let button = $('<div class="button-item' + (element.class ? ' ' + element.class : '') + '">' + element.name + '</div>');
        button.click(function () {
            element.event();
        });
        this.buttons.append(button);
    };
    if (this.event.onRender) {
        setTimeout(() => {
            this.event.onRender(this.form);
        }, 10);
    };
};

var toolBar = function (map) {
    var that = this;
    this.map = map;
    this.buttomMepping = {
        clip: {
            title: '裁剪',
            icon: 'icon-toolbar-clip',
            type: 'menu',
            children: [toolBars['Box裁剪'], toolBars['平面裁剪'], toolBars['Cross裁剪'], toolBars['多边形裁剪']],
        },
        terrain: {
            title: '地形分析',
            icon: 'icon-toolbar-online-edit',
            type: 'menu',
            children: [toolBars['坡度坡向'], toolBars['等值线'], toolBars['淹没分析'], toolBars['地形操作']],
        },
        analysis: {
            title: '三维分析',
            icon: 'icon-toolbar-analysis',
            type: 'menu',
            children: [toolBars['通视'], toolBars['可视域'], toolBars['阴影'], toolBars['剖面'], toolBars['天际线']],
        },
        measure: {
            title: '量算',
            icon: 'icon-toolbar-measure',
            type: 'content',
            children: toolBars['量算'],
        },
        toolbar_compass: {
            title: '地形开关',
            icon: 'icon-toolbar-terrain',
            type: 'event',
            event: function (data) {
                if (that.map.childrenData.hasOwnProperty(that.devData.tdDtxxbId)) {
                    const element = that.map.childrenData[that.devData.tdDtxxbId];
                    element.removeToViewer();
                    delete that.map.childrenData[that.devData.tdDtxxbId];
                } else {
                    var obj = {
                        mapId: that.devData.tdDtxxbId,
                        url: that.devData.mapAddress,
                        mapType: 'DEM'
                    }
                    // var obj = {
                    //     mapId: that.devData.tdDtxxbId,
                    //     url: that.devData.mapAddress,
                    //     mapType: 'TDT'
                    // }
                    that.map.change(obj, true)
                }
            },
        },
    };
    this.html = $('<div class="ToolBar"></div>');
    this.subMenuBox = $('<div class="ToolBarSubMenu"><div class="ToolBarSubMenuContent"></div></div>');
    this.subMenu = this.subMenuBox.find('.ToolBarSubMenuContent');
    this.activeMenuEvent = null;
    this.activeSubMenuEvent = null;
    this.toolbarCompassEvent = null;

    for (const key in this.buttomMepping) {
        if (this.buttomMepping.hasOwnProperty(key)) {
            const element = this.buttomMepping[key];
            element.html = $('<div class="vew_iconfont ' + element.icon + ' toolMainMenu"><div class="toolMainTip"><div class="content">' + element.title + '</div></div></div>');
            this.html.append(element);
            if (element.type == 'menu') {
                let content = this.renderChildren(element.children);
                content.hide();
                element.content = content;
                this.subMenu.append(content);
                element.html.click(() => {
                    this.toolbarCompassEvent.clear();
                    this.renderSubMenu(element, content);
                });
            } else if (element.type == 'event') {
                element.html.click(function () {
                    element.event();
                });
            } else if (element.type == 'content') {
                let content = new element.children(this.map);
                content.html.hide();
                element.content = content.html;
                this.subMenu.append(content.html);
                this.toolbarCompassEvent = content;
                element.html.click(() => {
                    this.renderSubMenu(element, content.html);
                });
            };
            this.html.append(element.html);
        }
    };
};

toolBar.prototype.setMapDev = function (data) {
    this.devData = data;
}

toolBar.prototype.render = function (Element) {
    Element.append(this.html);
    Element.append(this.subMenuBox);
};

toolBar.prototype.subMenuShow = function () {
    this.subMenuBox.css({
        right: '20px'
    });
};
toolBar.prototype.subMenuHide = function () {
    this.subMenuBox.css({
        right: '-500px'
    });
};

toolBar.prototype.renderSubMenu = function (data, content) {
    if (this.activeMenuEvent != data) {
        if (this.activeMenuEvent === null) {
            this.subMenuShow();
        } else {
            this.activeMenuEvent.html.removeClass('active');
        };
        if (this.activeMenuEvent) {
            this.activeMenuEvent.content.hide();
        };
        content.show().siblings().hide();;
        if (!content.find('.tab-title .active').length) {
            content.find('.tab-title .tab-item').eq(0).click();
        };
        this.activeMenuEvent = data;
        data.html.addClass('active');
    } else {
        this.subMenuHide();
        setTimeout(() => {
            this.activeMenuEvent.html.removeClass('active');
            this.activeMenuEvent = null;
        }, 300);
    };
};

toolBar.prototype.addChildItem = function (obj, title, content, buttons) {
    var item = new toolBarTabItem(obj, this.map);
    title.append(item.titleBar);
    content.append(item.content);
    buttons.append(item.buttons);
    item.content.hide();
    item.buttons.hide();
    item.titleBar.click(() => {
        if (this.activeSubMenuEvent && this.activeSubMenuEvent.event.clear) {
            this.activeSubMenuEvent.event.clear();
        }
        item.titleBar.addClass('active').siblings().removeClass('active');
        item.content.show().siblings().hide();
        item.buttons.show().siblings().hide();
        this.activeSubMenuEvent = item;
    });
    return item
};

toolBar.prototype.renderChildren = function (children) {
    var Content = $('<div class="tab-body"></div>');
    var title = $('<div class="tab-title"></div>');
    var content = $('<div class="tab-content"></div>');
    var buttons = $('<div class="tab-buttons"></div>');
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        this.addChildItem(element, title, content, buttons);
    };
    Content.append(title).append(content).append(buttons);
    return Content;
};




export default toolBar;