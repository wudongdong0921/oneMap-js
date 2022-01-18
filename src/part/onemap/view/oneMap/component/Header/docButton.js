////////////////////////////////////////////////
// 文档链接按钮
// 穆松鹤
// 2020-09-23 11:37:19
////////////////////////////////////////////////

var docButton = function () {
    this.event = function () { };
    this.html = $('<div class="OneMap_docButton"><img src="./static/img/doc_icon.png" /></div>');
    this.html.click(() => {
        this.event();
    });
};

docButton.prototype.onClick = function (event) {
    this.event = event;
};


export default docButton;