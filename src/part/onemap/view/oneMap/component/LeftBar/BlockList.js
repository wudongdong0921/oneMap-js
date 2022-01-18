////////////////////////////////////////////////
// 地块列表
// 吴东东
// 2021-05-13 11:30:26
////////////////////////////////////////////////
import api from './../../apis/business'
import paging from './../paging'
var BlockItem = function(obj) {
    this._map = obj._map
    this._MapTools = obj._MapTools
    this.html = $('<div class="block-item-wrapper"></div>')
    this.box = $('<div class="block-item-box"></div>').appendTo(this.html)
    this.blockItems = $('<div class="block-item-name"></div>').appendTo(this.box)
    this.html.click(() => {
        obj.parent.setActive(this)
        this._map.addDataLayer(obj.item.geoJson)
        //obj._MapTools.getMapPolyList({geometry:JSON.parse(obj.item.geoJson)}, 2)
    })
    this.renderTitle(obj.options,obj.item)
}
BlockItem.prototype.renderTitle = function(obj,item) {
    const $ul = $('<ul></ul>')
    for(let key in obj) {
        $ul.append('<li><div class="block-item-left-text"><span class="block-item-left">' + obj[key] +':</span></div><div><p class="block-item-right">' + item[key] + '</p></div></li>')
    }
    this.blockItems.append($ul)
}
BlockItem.prototype.active = function() {
    this.box.addClass('active')
}
BlockItem.prototype.unActive = function() {
    this.box.removeClass('active')
}
var BlockList = function(parent,type,_MapTools) {
    var _this =this
    this.parent = parent
    this._MapTools = _MapTools
    this.html = $('<div class="block-list-wrapper"></div>')
    this.dataList = $('<div class="block-data">共<span>0</span>条数据</div>').appendTo(this.html)
    this.clearBox = $('<div class="block-list-clear"></div>').appendTo(this.html)
    type || (this.clear = $('<button class="wdd-btn business_btn wdd-btn-primary wdd-btn-sm">清空</button>').appendTo(this.clearBox))
    this.contentWrapper = $('<div class="block-content-relative"></div>').appendTo(this.html)
    this.content = $('<div class="block-content-position"></div>').appendTo(this.contentWrapper)
    this.footer = $('<div class="block-footer"></div>').appendTo(this.html)
    this.children = []
    this.event = {
        eventClear: function() {},
        blockSuccess: function() {}
    }
    type || this.clear.click(() => {
        this.event.eventClear()
    })
    this.paging = new paging({
        data: {
            renderReady: true,
            pageInfo: {
                index: '1', // 第几页
                count: '4' // 每页多少条数据
            }
        },
        hasQuick: false, // 开启快速跳转
        ajaxEvent: (data, success) => {
            if (data.renderReady) {
                return;
            };
            api[data.api](data,res => {
                this.event.blockSuccess()
                if(!res.data) {
                    _this.content.empty()
                    _this.dataList.find('span').html(0)
                    _this.content.append('<div class="block-more">查询无结果</div>')
                    success({
                        totalRecord: 0,
                        list: {}
                    });
                    return false
                }
                _this.dataList.find('span').html(res.data.blockList.total)
                success({
                    totalRecord: res.data.blockList.total,
                    list: res
                });
            })
        },
        success: (result) => {
            this.setOptionItem(result);
        }
    });
    this.footer.append(this.paging.render());
}
BlockList.prototype.successEvent = function(event) {
    this.event.blockSuccess = event
}
BlockList.prototype.setActive = function(itemEv) {
    this.children.forEach(item => {
        item.unActive()
    })
    itemEv.active()
}
BlockList.prototype.refreshBlockData = function(data) {
    var _data = {
        sxcxId: data.sxcxId,
        searchData: data.searchData,
        api: data.api,
        pageInfo: {
            index: '1', // 第几页
            count: '6' // 每页多少条数据
        }
    }
    this.paging.refresh(_data);
    data.api === 'spaceSearchList' && this.contentWrapper.css('top','180px')
}
BlockList.prototype.setOptionItem = function(options){
    this.content.empty()
    if (!options.data) {
        return false
    }
    options.data.blockList.list.forEach(item => {
        const _blockItem = new BlockItem({
            options:options.data.arrow,
            item: item,
            _map: this.parent,
            _MapTools: this._MapTools,
            parent:this
        })
        this.children.push(_blockItem)
        this.content.append(_blockItem.html)
    })
    
}
BlockList.prototype.getEventClear = function(event) {
    this.event.eventClear = event
}
export default BlockList