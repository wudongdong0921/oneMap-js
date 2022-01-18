////////////////////////////////////////////////
// 空间查询
//SpatialQuery
// 吴东东
// 2021-05-12 11:07:47
////////////////////////////////////////////////
import api from './../../apis/business'
import BlockListy from './BlockList'
const drawList = [
    {
        type: 'point',
        icon: 'icon-check-circle',
        text: '绘点查询'
    },
    {
        type: 'line',
        icon: 'icon-check-circle',
        text: '绘线查询'
    },
    {
        type: 'polygon',
        icon: 'icon-check-circle',
        text: '绘面查询'
    }
]

var Draw = function(obj) {
    this.item = obj.item
    this.html = $('<div class="spatial-draw-item"></div>')
    this.icon = $('<div class="spatial-draw-icon"><svg class="icon" aria-hidden="true"><use xlink:href="#' + obj.item.icon + '"></use></svg><br></div>').appendTo(this.html)
    this.text = $('<div class="spatial-draw-text">'+ obj.item.text +'</div>').appendTo(this.html)
    this.html.click(() => {
        // obj.parent.drawItemActive(this)
        // obj._map.clearSourceIdList()
        // obj._map.clearInteraction()
        // obj._map.layerHighLists = []
        obj._map.handleClearControl()
        if(obj.item.type === 'point') {  
           this.setSpatialQueryList(obj,'circle')
        }else if(obj.item.type === 'line') {
            this.setSpatialQueryList(obj,'drawLine')
        }else if(obj.item.type === 'polygon') {
            this.setSpatialQueryList(obj,'drawPolygon')
        }
    })
}
Draw.prototype.setSpatialQueryList = function(obj,type) {
    obj._map.measureMap.createDrawInit(type,true)
    obj._map.measureMap.getObjBusinessGeojson((objBusinessGeojson) => {
        if(!objBusinessGeojson) {
            return false
        }
        obj._MapTools.getMapPolyList({geometry:JSON.parse(objBusinessGeojson)}, 2)
        const objData = {
            sxcxId: obj.parent.sxcxId,
            searchData:objBusinessGeojson,
            api: "spaceSearchList"
        }
        
        obj.parent.spatialContent.empty()
            obj._BlockListy.refreshBlockData(objData)
            obj.parent.spatialContent.append(obj._BlockListy.html)
        
    })
}
var SpatialQuery = function(obj) {
    this.html = $('<div class="spatial-wrapper"></div>')
    this.spatialDraw = $('<div class="spatial-draw"></div>').appendTo(this.html)
    this.spatialSelect = $('<div class="spatial-select"></div>').appendTo(this.html)
    this.spatialContent = $('<div class="spatial-content"></div>').appendTo(this.html)
    this.children = []
    var _BlockListy = new BlockListy(obj._Map,true,obj._MapTools)
    obj._BlockListy = _BlockListy
    obj.parent = this
    this.setDrawRender(obj)
    //this.setSelectResher()
    
}
SpatialQuery.prototype.drawItemActive = function(eventItem) {
    this.children.forEach((item) =>{
        item.html.removeClass('active')
    })
    eventItem.html.addClass('active')
}
SpatialQuery.prototype.setDrawRender= function(obj){
    drawList.forEach(item =>{
        var _Draw = new Draw({
            item: item,
            _map: obj._Map,
            _BlockListy: obj._BlockListy,
            parent: obj.parent,
            _MapTools: obj._MapTools
        })
        this.children.push(_Draw)
        this.spatialDraw.append(_Draw.html)
    })
}
SpatialQuery.prototype.setSelectResher = function() {
    this.spatialContent.empty()
    this.getBusinessSelect(() => {
        this.select.get((emsg,value)=>{
            this.sxcxId = value
        })
        this.select.onChange((value) => {
            this.sxcxId = value
        })
    })
}
SpatialQuery.prototype.getBusinessSelect = function(callback) {
    api.selectBusiness(res => {
        var list = res.data
        this.spatialSelect.empty()
        this.select = new icu.formElement.select({
            checkAll: false, // 是否显示全选
            getType: 'array',
            // 进行赋值的数组
            data: list,
            default: list[0].value
        });
        this.spatialSelect.append(this.select.html)
        const items = this.select.html.find('.form_select_option')
        for(let i =0;i<items.length;i++) {
            $(items[i]).attr('title',$(items[i]).html())    // HGPTGCH-153
            // $(items[i]).webuiPopover({
            //     style: 'inverse',
            //     trigger: 'hover',
            //     placement: 'bottom-right',
            //     autoHide:1000
            // })
        }
        callback && callback()
    })
}
export default SpatialQuery