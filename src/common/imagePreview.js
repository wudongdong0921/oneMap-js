
var imagePreview = function (template, url) {
    var tw = template.width();
    var th = template.height();
    this.imageData = {
        width: 0,
        height: 0,
        zoom: 1,
        moveX: 0,
        moveY: 0,
        top: 0,
        left: 0,
        title: '',
        data: '',
    };
    this.html = $('<div></div>');
    this.html.css({
        'position': 'relative',
        'width': '100%',
        'height': '100%',
        'overflow': 'hidden',
        userSelect: 'none',
    });

    this.imageBox = null;

    this.message = $('<div>已经缩放到最大程度</div>');

    this.message.css({
        position: 'absolute',
        height: '40px',
        padding: '5px',
        width: '190px',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -100px',
        zIndex: '5',
        background: 'rgba(0,0,0,0.4)',
        color: '#fff',
        lineHeight: '40px',
        textAlign: 'center',
        borderRadius: '30px',
        'opacity': '0',
        pointerEvents: 'none',
    });


    this.tool = $('<div><i class="fa fa-image" title="显示原始尺寸"></i><i class="fa fa-tv" title="适应屏幕缩放"></i></div>');
    this.tool.css({
        position: 'absolute',
        height: '40px',
        padding: '5px',
        width: '100px',
        left: '50%',
        bottom: '40px',
        margin: '0 0 0 -55px',
        zIndex: '5',
        background: 'rgba(0,0,0,0.4)',
        color: '#fff',
        lineHeight: '40px',
        textAlign: 'center',
        borderRadius: '30px',
    });

    this.tool.find('i').css({
        display: 'inline-block',
        width: '40px',
        height: '40px',
        verticalAlign: 'top',
        lineHeight: '40px',
        'cursor': 'pointer',
    });

    this.tool.find('.fa-tv').click(() => {
        if (this.imageBox) {
            this.BigControl();
        };
    });

    this.tool.find('.fa-image').click(() => {
        this.Control(1);

    });

    this.html.append(this.tool);
    this.html.append(this.message);

    var img = $('<img src="' + url + '?_t=' + new Date().getTime() + '" />');
    img.css({
        position: 'absolute',
        bottom: '1000%',
    });
    img.on('load', () => {
        this.imageData.width = img.width();
        this.imageData.height = img.height();
        var _image = $('<img src="' + url + '" />');
        this.imageBox = _image;
        this.imageBox.css({
            'box-shadow': '0 0 15px rgba(0,0,0,0.2)'
        });
        this.html.append(_image);
        img.remove();
        this.BigControl();
    });


    this.html.append(img);
    template.append(this.html);

    this.html.mousedown((e) => {
        e.preventDefault();
        // 缓存点击位置
        var clientX = e.clientX;
        var clientY = e.clientY;

        // 缓存位置信息
        var top = parseInt(this.imageBox.css('top'));
        var left = parseInt(this.imageBox.css('left'));

        // 当鼠标移动时触发
        document.onmousemove = (event) => {
            // 计算移动相对位置
            var nowClientX = event.clientX - clientX;
            var nowClientY = event.clientY - clientY;

            // 计算坐标
            var _left = nowClientX + left;
            var _top = nowClientY + top;

            this.imageData.left = _left;
            this.imageData.top = _top;
            // 渲染
            this.imageBox.css({
                left: _left,
                top: _top,
            });
        };

        // 当鼠标离开时触发
        document.onmouseup = () => {
            // 清空移动事件对象
            document.onmousemove = null;
            document.onmouseup = null;
        }

    });
    this.zoomEvent();
};

// imagePreview.prototype.real

imagePreview.prototype.BigControl = function () {
    var zoom = 1;
    this.imageData.moveX = 0;
    this.imageData.moveY = 0;
    var tw = this.html.width();
    var th = this.html.height();
    if (tw < this.imageData.width || th < this.imageData.height) {
        var xzoom = tw / this.imageData.width - 0.05;
        var yzoom = th / this.imageData.height - 0.05;
        if (xzoom > yzoom) {
            zoom = yzoom;
        } else {
            zoom = xzoom;
        }
    };
    this.Control(zoom);
    // this.move();

};
imagePreview.prototype.Control = function (zoom, event) {
    var tw = this.html.width();
    var th = this.html.height();
    if (event) {
        var offsetTop = event.offsetY - this.imageData.top;
        var offsetLeft = event.offsetX - this.imageData.left;
        var oldheight = this.imageBox.height();
        var newHeight = this.imageData.height * zoom;
        var oldwidth = this.imageBox.width();
        var newWidth = this.imageData.width * zoom;
        if (offsetTop <= 0 || offsetTop >= oldheight) {
            offsetTop = oldheight / 2;
        };
        if (offsetLeft <= 0 || offsetLeft >= oldwidth) {
            offsetLeft = oldwidth / 2;
        };
        this.imageData.top += (offsetTop - (offsetTop / oldheight * newHeight));
        this.imageData.left += (offsetLeft - (offsetLeft / oldwidth * newWidth));
    } else {
        this.imageData.top = (th - this.imageData.height * zoom) / 2;
        this.imageData.left = (tw - this.imageData.width * zoom) / 2;
    };
    this.imageData.zoom = zoom;
    this.imageBox.css({
        'position': 'absolute',
        width: this.imageData.width * zoom,
        height: this.imageData.height * zoom,
        top: this.imageData.top,
        left: this.imageData.left
    });
};

imagePreview.prototype.showMessage = function (text) {
    this.message.css('opacity', '1').text(text);
    if (this.timer) {
        clearTimeout(this.timer);
    };
    this.timer = setTimeout(() => {
        this.message.css('opacity', '0');
    }, 1000);
};


imagePreview.prototype.zoomEvent = function () {
    this.html.on('mousewheel', (event) => {
        if (event.deltaY > 0) {
            var __zoom = this.imageData.zoom * 0.1;
            var zoom = this.imageData.zoom + __zoom;
            if (zoom > 5) {
                this.showMessage('已经缩放到最大程度');
            } else {
                this.Control(zoom, event);
            };
        } else {
            var __zoom = this.imageData.zoom * 0.1;
            var zoom = this.imageData.zoom - __zoom;
            if (zoom < 0.2) {
                this.showMessage('已经缩放到最小程度');
            } else {
                this.Control(zoom, event);
            };
        };
    });
};
export default imagePreview
