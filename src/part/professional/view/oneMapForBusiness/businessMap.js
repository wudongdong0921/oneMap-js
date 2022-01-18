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
var epsgCodePro4490 = function() {

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
        if ($(this).attr('class').indexOf('active') > -1) {
            $(this).removeClass('active')
            $(this).attr('data-type', false)
            _this.parent.__OneMap.map.mapBusinessTop.getLayer(_this.wdId) && _this.parent.__OneMap.map.mapBusinessTop.setPaintProperty(_this.wdId,'fill-color', 'rgba(0,0,0,0.15)')
            for(let i =0;i<_this.parent.arrActives.length;i++) {
                var item = _this.parent.arrActives[i]
                if(_this.wdId === item.fileName) {
                    _this.parent.arrActives.splice(i,1)
                    i--
                }
            }
        } else {
            $(this).addClass('active')
            _this.parent.__OneMap.map.mapBusinessTop.getLayer(_this.wdId) && _this.parent.__OneMap.map.mapBusinessTop.setPaintProperty(_this.wdId,'fill-color', 'rgba(24,138,226,0.15)')
            $(this).attr('data-type', true)
            var obj = {
                fn: function(that,item,i) {
                    return function() {
                        that.parent.arrActives.splice(i,0,{
                            fileName: item.fileName,
                            features: JSON.stringify(item.features)
                        })
                    }
                }
            }
            arrActivesFn(obj,_this)
        }
        var geoJson = _this.parent.getMapGeojsonResher(_this.parent.arrActives)
        _this.parent.unreshGeojson(geoJson)
    })
}


//一个文件有多个图形处理，需处理才能定位，导出，分析
BusinessMap.prototype.getMapGeojsonResher = function(data) {
    var arr = []
    for(let i =0;i<data.length;i++) {
        let featureList = JSON.parse(data[i].features)
        for(let j =0;j<featureList.length;j++) {
            arr.push(JSON.stringify(featureList[j].geometry))
        }
    }
    return arr
}
BusinessMap.prototype.unreshGeojson = function(geoJson) {
        //新增上图数据分析
         this.__OneMap._AnalyCommon.getMapGeojson({
             data:geoJson,
             type: 4,
             _Analyse:this.__OneMap._Analyse,
             epsgCode: this.epsgCode
         })
         //上图数据 导出矢量
         this.__OneMap._MapTools._Vector.getMapFormData(geoJson)
        this.arrActives.length>0 && this.__OneMap.map.muplyLayerBox(geoJson,'mapBusinessTop',true)
}
BusinessMap.prototype.render = function () {
    return this.htmlBox
}
BusinessMap.prototype.handleOutMapBusiness = function(event) {
    this.event.outMapBusiness = event
}
BusinessMap.prototype.searchBusinessMap = function(workId,flowId,__OneMap,type) {
    this.arrActives= []
    api.upMapBusinessSearch({workId: workId,flowId:flowId},(result) => {
        this.epsgCode = result.epsgCode
        this.createBusinessMap = []
        var obj = {
            geos: result.data,
            epsgCode: result.epsgCode
        }
        this.init(result.data,type,__OneMap,workId,flowId,() => {
            //多面单面
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
        if(item.businessTable.attr('data-type') === 'true') {
            flag = true
        }
    }
    return flag
}
BusinessMap.prototype.init = function (data, type,__OneMap,workId,flowId,callback) {
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
    
    if (this.upMapType) {
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
                            _this.searchBusinessMap(workId,flowId,__OneMap,this.upMapType)
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
            this.unreshGeojson([])
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
                this.searchBusinessMap(workId,flowId,__OneMap,this.upMapType)
            })
            
        })
    }
    callback && callback()

}
export default BusinessMap