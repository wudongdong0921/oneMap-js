////////////////////////////////////////////////
// 业务查询
// 吴东东
// 2021-05-12 10:00:07
////////////////////////////////////////////////
import subMenu from '../LeftBar/subMenu'
import BusinessSider from '../LeftBar/BusinessSider'
import SpatialQuery from '../LeftBar/SpatialQuery'
import AttributeQuery from '../LeftBar/AttributeQuery'
var BusinessQueries = function (_Map, _MapSymbol, _Analyse,type,_MapTools) {
    this._Map = _Map
    this._MapTools = _MapTools
    this._Analyse = _Analyse;
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    this.subMenu = new subMenu();
    this.BusinessSider = new BusinessSider()
    this.html.append(this.subMenu.html);
    this.Content = $('<div class="OneMap_BusinessQueries_content"></div>').appendTo(this.html);
    this.children = [];
};

BusinessQueries.prototype.render = function () {
    return this.html
};
BusinessQueries.prototype.setSiders = function(data,callback) {
    var siderObj = {
        SpatialQuery: SpatialQuery,
        AttributeQuery: AttributeQuery
    }
    var eventSider = {
        SpatialQuery: null,
        AttributeQuery: null
    }
    data.forEach(item =>{
        eventSider[item.router] = siderObj.hasOwnProperty(item.router) ? new siderObj[item.router]({
            item: item,
            _Map: this._Map,
            _MapTools: this._MapTools
        }) : ''
    })
    this.BusinessSider.addBusinessChild(eventSider)
    this.Content.append(this.BusinessSider.html)
    callback && callback()
    return eventSider
}
BusinessQueries.prototype.addChild = function (menuData,_AnalyCommon) {
    var _self = this
    menuData = [{
        color: '#68CDC0', name: '属性查询', icon: 'icon-search',router: 'AttributeQuery',id: icu.util.uuid()
    }, {
        color: '#85BDE3', name: '空间查询', icon: 'icon-monitor',router: 'SpatialQuery',id: icu.util.uuid()
    }]
    this.subMenu.setChildren(menuData);
    var _eventSider = this.setSiders(menuData,function() {
        _self.subMenu.onClick((data) => {
            _self.BusinessSider.show({
                data:data,
                _Map:_self._Map,
                _eventSider:_eventSider
            })
            _self._Map.handleClearControl()
            
        });
    })
    
};
BusinessQueries.prototype.getMapGeojson = function () {
    
}

export default BusinessQueries;