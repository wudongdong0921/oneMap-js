



var carouselMenu = function () {
    this.html = $('<div class="OneMap_LeftBar_carouselBox"></div>');
    this.progress = $('<div class="OneMap_LeftBar_carousel_progress"></div>').appendTo(this.html);
    this.layout = $('<div class="OneMap_LeftBar_carousel_layout"></div>').appendTo(this.html);
    this.children = [];
};

carouselMenu.prototype.addChildren = function (el) {
    var _data = {
        progressItem: $('<div class="OneMap_LeftBar_carousel_progress_item"></div>'),
        box: $('<div class="OneMap_LeftBar_carousel_item_box"></div>'),
        index: this.children.length,
    };
    _data.box.append(el);
    this.progress.append(_data.progressItem);
    this.layout.append(_data.box);
    this.children.push(_data);
    this.layout.css('width', this.children.length * 300 + 'px');
    _data.progressItem.click(() => {
        this.layout.css({
            left: '-' + _data.index * 300 + 'px',
        });
        this.progress.find('.OneMap_LeftBar_carousel_progress_item').removeClass('active');
        _data.progressItem.addClass('active');
    });
    if (this.children.length == 1) {
        _data.progressItem.addClass('active');
    };


};





export default carouselMenu