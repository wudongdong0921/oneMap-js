////////////////////////////////////////////////
// 业务地图
// 吴东东
// 2020-12-21 16:28:59
////////////////////////////////////////////////
import api from "../../api/oneMapForBusiness"
var BusinessMap = function (type) {
    var _this = this
    this.count = 0
    this.newList = []
    this.moreGeomertry = []
    this.arrActives= []
    // this.createBusinessMap = []
    this.obj = {
        xmId: '项目编号',
        xmName: '项目名称',
        samrea: '地块面积'
    }
    this.event = {
        outMapBusiness: function() {}
    }
    this.htmlBox = $('<div class="business_map_box" style="overflow-y: auto;height:100%"></div>')
    this.htmlItem = $('<div class="business_map_wrapper"></div>').appendTo(this.htmlBox);
    this.msg = $('<div style="text-align: center;padding:16px 0">暂无地块信息<br>请先进行上图</div>').appendTo(this.htmlItem)
    // this.htmlItem.on('click', 'table', function (e) {
        
    // })


}
var arrActivesFn = function(obj,that) {
    for(let i =0;i<that.parent.createBusinessMap.length;i++) {
        var item = that.parent.createBusinessMap[i]
        if(that.wdId === item.fileName) {
            var callback = obj.fn(that,item,i)
            callback()
        }
    }
}
var BusinessMapItem = function (data, obj,parent) {
    var _this = this
    this.parent = parent
    this.wdId = data.wdId
    
    this.businessTable = $('<table style="width:100%" cellspacing="0" cellpadding="0" border="0" class="business_map_box" data-type="false"></table>');
    this.business = $('<tbody class="business_body"></tbody>').appendTo(this.businessTable)
    for (let key in obj) {
        this.businessMap = $('<tr class="business_map"></tr>');
        this.businessMapLeft = $('<td class="business_map_left">' + obj[key] + '</td>').appendTo(this.businessMap);
        this.businessMapRight = $('<td class="business_map_right">' + data[key] + '</td>').appendTo(this.businessMap)
        this.business.append(this.businessMap)
    }
    this.businessTable.click(function(e) {
        _this.arrActives= []
        if ($(this).attr('class').indexOf('active') > -1) {
            $(this).removeClass('active')
            $(this).attr('data-type', false)
            _this.parent.__OneMap.map.mapBusinessTop.getLayer(_this.wdId) && _this.parent.__OneMap.map.mapBusinessTop.setPaintProperty(_this.wdId,'fill-color', 'rgba(0,0,0,0.15)')
            // for(let i =0;i<_this.parent.createBusinessMap.length;i++) {
            //     var item = _this.parent.createBusinessMap[i]
            //     if(_this.wdId === item.fileName) {
            //         _this.parent.arrActives.splice(i,1)
            //     }
            // }
            var obj = {
                fn: function(that,item,i) {
                    return function() {
                        that.parent.arrActives.splice(i,1)
                        i--
                    } 
                }
            }
            arrActivesFn(obj,_this)
        } else {
            $(this).addClass('active')
            _this.parent.__OneMap.map.mapBusinessTop.getLayer(_this.wdId) && _this.parent.__OneMap.map.mapBusinessTop.setPaintProperty(_this.wdId,'fill-color', 'rgba(24,138,226,0.15)')
            $(this).attr('data-type', true)
            var obj = {
                fn: function(that,item) {
                    return function() {
                        that.parent.arrActives.push(JSON.stringify(item.features[0].geometry))
                    }
                }
            }
            arrActivesFn(obj,_this)
            // for(let i =0;i<_this.parent.createBusinessMap.length;i++) {
            //     var item = _this.parent.createBusinessMap[i]
            //     if(_this.wdId === item.fileName) {
            //         _this.parent.arrActives.push(JSON.stringify(item.features[0].geometry))
            //     }
            // }
            // for(let i =0;i<_this.parent.createBusinessMap.length;i++) {
            //     var item = _this.parent.createBusinessMap[i]
            //     if(_this.wdId === item.fileName) {
            //         var obj = {features: item.features,type: "FeatureCollection"}
            //         console.log(obj)
            //         var boundingBox = turf.bbox(obj);
            //         _this.parent.__OneMap.map.mapBusinessTop.fitBounds(boundingBox, { padding: 200 });
            //     }
            // }
        }
        _this.parent.__OneMap.map.muplyLayerBox(_this.parent.arrActives,'mapBusinessTop')
    })
}
BusinessMap.prototype.render = function () {
    return this.htmlBox
}
BusinessMap.prototype.handleOutMapBusiness = function(event) {
    this.event.outMapBusiness = event
}
BusinessMap.prototype.searchBusinessMap = function(workId,flowId,__OneMap,type) {
    api.upMapBusinessSearch({workId: workId,flowId:flowId},(result) => {
        
        this.createBusinessMap = []
        this.init(result.data,type,__OneMap,workId,flowId,() => {
            for (let i = 0; i < result.data.length; i++) {
                var arrBusiness= []
                var listItem = result.data[i]
                //__OneMap.map.mapBusinessTop.getLayer(listItem.fileName) && __OneMap.map.mapBusinessTop.removeLayer(listItem.fileName)
                    var item = result.data[i].geometrys
                    for (let h = 0; h < item.length; h++) {
                        var list = JSON.parse(item[h])
                        var listArr = []
                        if (list.type === "MultiPolygon") {
                            for (let k = 0; k < list.coordinates.length; k++) {
                                listArr = listArr.concat(list.coordinates[k])
                            }
                            this.moreGeomertry.push({
                                type: 'Feature',
                                geometry: {
                                    coordinates: [listArr],
                                    type: 'MultiPolygon'
                                }
                            })
                            arrBusiness.push({
                                type: 'Feature',
                                geometry: {
                                    coordinates: [listArr],
                                    type: 'MultiPolygon'
                                }
                            })
                        } else {
                            this.moreGeomertry.push({
                                type: 'Feature',
                                geometry: JSON.parse(item[h])
                            })
                            arrBusiness.push({
                                type: 'Feature',
                                geometry: JSON.parse(item[h])
                            })
                        }
                    }
                    
                this.createBusinessMap.push({
                    type: 'FeatureCollection',
                    features: arrBusiness,
                    fileName:  result.data[i].wdId
                })

            }
            if(result.data.length>0) {
                for(let i =0;i<this.createBusinessMap.length;i++) {
                    var businessItem = this.createBusinessMap[i]
                    __OneMap.map.createBusinessMapLayerTop({
                        obj: {features: businessItem.features,type: "FeatureCollection"},
                        fileName: businessItem.fileName
                    })
                }
                setTimeout(() => {
                    this.list.forEach(item => {
                        item.businessTable.click()
                    })
                    //this.list[0] && this.list[0].businessTable.click()
                },500)
            }
            
        })
    })
}
BusinessMap.prototype.clearBusinessItem = function() {
    this.list.forEach(item => {
        item.businessTable.removeClass('active')
        item.businessTable.attr('data-type', false)
    })
}
BusinessMap.prototype.getBusinessAttr = function() {
    var flag = false
    for(let i =0;i<this.list.length;i++) {
        var item = this.list[i]
        console.log(item.businessTable.attr('data-type') === 'true')
        if(item.businessTable.attr('data-type') === 'true') {
            flag = true
        }
    }
    return flag
}
BusinessMap.prototype.init = function (data, type,__OneMap,workId,flowId,callback) {
    console.log(type)
    var _this = this
    this.htmlItem.empty()
    this.__OneMap = __OneMap
    this.workId = workId
    this.flowId = flowId
    this.list = []
    
    for (let i = 0; i < data.length; i++) {
        var item = data[i]
        var _BusinessMap = new BusinessMapItem(item, this.obj,this)
        this.list.push(_BusinessMap)
        this.htmlItem.append(_BusinessMap.businessTable)
    }
    
    if (type) {
        this.businessButton = $('<div class="business_button"></div>').appendTo(this.htmlItem)
        this.deleteItem = $('<button class="wdd-btn wdd-btn-primary wdd-btn-sm">删除</button>').appendTo(this.businessButton)
        this.clearAll = $('<button class="wdd-btn wdd-btn-primary wdd-btn-sm">清空</button>').appendTo(this.businessButton)
        this.wdIds = []
        this.wdIdsAll = []
        this.deleteItem.click(() => {
            if(_this.getBusinessAttr()){
            layer.open({
                type: 1
                ,title: false
                ,area: ['240px', '180px']
                ,shade: 0.8
                ,closeBtn: false
                ,content: '<div style="padding: 38px;line-height: 22px;">是否确认删除地块文件信息</div>'
                ,btn: ['确定', '取消']
                ,btn1: function(){
                    for (var i = 0; i < _this.list.length; i++) {
                        var item = _this.list[i]
                        if (item.businessTable.attr('data-type') === 'true') {
                            item.businessTable.remove()
                            _this.wdIds.push(_this.list[i].wdId)
                            // _this.__OneMap.map.mapBusinessTop.getLayer(_this.list[i].wdId) && _this.__OneMap.map.mapBusinessTop.removeLayer(_this.list[i].wdId)
                            _this.__OneMap.map.deleteBusinessAll()
                            _this.__OneMap.map.deleteBusinessAllTop()
                            _this.list.splice(i, 1)
                            i--
                        }
                    }
                    if(_this.wdIds.length>0){
                        api.deleteBusinessMap({
                            workId: _this.workId,
                            flowId: _this.flowId,
                            wdIds: _this.wdIds
                        },(res) => {
                            _this.searchBusinessMap(workId,flowId,__OneMap)
                        })
                    }else {
                        layer.msg('请选择地块文件信息')
                    }
                    layer.closeAll();
                  }
                ,btn2: function(){
                layer.closeAll(); 
                }
                
              });
            }
            else {
                layer.msg('请选择地块文件信息')
            }
            
            
        })
        
        if (!this.list.length > 0) {
            this.msg = $('<div style="text-align: center;padding:16px 0">暂无地块信息<br>请先进行上图</div>').appendTo(this.htmlItem)
            this.businessButton.hide()
        } else {
            this.msg.remove()
            this.businessButton.show()
        }
        this.clearAll.click(() => {
            for (let i = 0; i < this.list.length; i++) {
                var item = this.list[i]
                this.wdIdsAll.push(this.list[i].wdId)
                item.businessTable.remove()
                //this.__OneMap.map.mapBusinessTop.getLayer(this.list[i].wdId) && this.__OneMap.map.mapBusinessTop.removeLayer(this.list[i].wdId)
                this.__OneMap.map.deleteBusinessAll()
                this.__OneMap.map.deleteBusinessAllTop()
                
                
            }
            api.deleteBusinessMap({
                workId: this.workId,
                wdIds: this.wdIdsAll,
                flowId: this.flowId
            },(res) => {
                this.list = []
                this.searchBusinessMap(workId,flowId,__OneMap)
            })
            
        })
    }
    callback && callback()

}
export default BusinessMap