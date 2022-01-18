


// 菜单按钮html
var html = '<div id="tabMenu">' +
    '<div class="tab-menu-item" data-type="self">关闭</div>' +
    '<div class="tab-menu-item" data-type="right">关闭右侧标签</div>' +
    '<div class="tab-menu-item" data-type="left">关闭左侧标签</div>' +
    '<div class="tab-menu-item" data-type="other">关闭其他标签</div>' +
    '<div class="tab-menu-item" data-type="all">关闭全部标签</div>' +
    '</div>';
html = $(html);
// 创建之后隐藏 
html.hide();
// 渲染html
$('body').append(html);

// 当点击菜单中某一项时，调用对应绑定方法，并传递当前菜单的关闭类型事件 
html.find('.tab-menu-item').click(function () {
    var type = $(this).attr('data-type');
    if (activeTab) {
        // 调用事件
        activeTab.event.close(activeTab, type);
        activeTab = null;
    };
    // 清除父级的监听事件
    clear();
});

var activeTab = null;
// 清除父级的监听事件
var clear = function () {
    html.hide();
    document.removeEventListener('click', clear);
};

// 触发焦点事件，
var setActive = function (event, activeObj) {
    // 缓存焦点事件
    activeTab = activeObj;
    // 获取当前点击位置的坐标
    html[0].style.top = event.clientY + 'px';
    // 当坐标右侧空间不足以放下菜单，则菜单显示在左侧
    if (document.body.clientWidth - 155 < event.clientX) {
        html[0].style.right = (document.body.clientWidth - event.clientX) + 'px';
        html[0].style.left = 'auto';
    } else {
        html[0].style.right = 'auto';
        html[0].style.left = event.clientX + 'px';
    };

    // 显示 菜单
    html.show();

    // 添加监听事件，点击时，关闭标签，并清除监听事件
    document.addEventListener('click', clear);
};

// 返回触发方法
export default setActive