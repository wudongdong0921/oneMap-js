var TreeSlider = function() {
    this.html = $('<div class="tree_slider_box"></div>');
    this.treeSliderLayout = $('<div class="tree_slider_layout"></div>').appendTo(this.html);
    this.children = []
}
TreeSlider.prototype.addTreeChild = function(item,data) {
    this.treeSliderLayout.append(item.html)
    var obj = {
        tree: item
    }
    obj[data.id] = item
    this.children.push(obj)
    this.treeSliderLayout.css('width',this.children.length*300 + 'px')

}
export default TreeSlider