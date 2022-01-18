var BusinessSider = function() {
    this.html = $('<div class="business_slider_box"></div>');
    this.BusinessSiderLayout = $('<div class="business_slider_layout"></div>').appendTo(this.html);
    this.children = {}
}
BusinessSider.prototype.addBusinessChild = function(item) {
    for(let key in item){
        const router = item[key]
        if(router) {
            this.children[key] = router.html
            this.BusinessSiderLayout.append(router.html)
        }
    }

}
BusinessSider.prototype.show = function(obj) {
    const sider = obj.data
    for(let key in this.children) {
        const router = this.children[key]
        router.css('display','none')
    }
    this.children[sider.router].show()
    this.businessInit(obj)
}
BusinessSider.prototype.businessInit = function(obj) {
    const {data,_Map,_eventSider} = obj
    if(data.router === 'AttributeQuery') {
        _eventSider[data.router].refreshAttribute({
            item: data,
            _Map: _Map
        })
    }else if(data.router === 'SpatialQuery') {
        _eventSider[data.router].setSelectResher({
            item: data,
            _Map: _Map
        })
    }
}
export default BusinessSider