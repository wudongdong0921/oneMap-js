////////////////////////////////////////////////
// 图例
// 吴东东
// 2021-04-08 11:05:09
////////////////////////////////////////////////
import api from "./../apis/map"
// var SymboData = [
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
//     { name: '图例1', color: '#f60' },
// ];


var MapSymbol = function () {
    this.html = $('<div class="OneMap_MapSymbol OneMap_dialog hide"></div>');
    this.title = $('<div class="OneMap_dialog_title">图例</div>').appendTo(this.html);
    this.close = $('<div class="OneMap_dialog_close"><i class="fa fa-times" aria-hidden="true"></i></div>').appendTo(this.title);
    this.body = $('<div class="OneMap_dialog_body"></div>').appendTo(this.html);
    this.content = $('<div class="OneMap_MapSymbol_content"></div>').appendTo(this.body);
    this.SymbolTitle = $('<div class="OneMap_MapSymbol_SymbolTitle"></div>').appendTo(this.content);
    this.SymbolContent = $('<div class="OneMap_MapSymbol_SymbolContent"></div>').appendTo(this.content);
    this.close.click(() => {
        this.hide();
    });
    this.loading = icu.loading(this.content);
    this.data = null;

    this.event = {
        changeView: function () { },
    };

    this.activeEvent = null;

};

MapSymbol.prototype.renderData = function (data,SymboData,sybolType) {
    // if (this.data === null || data.id != this.data.id) {
    //     this.data = data;
    //     this.SymbolTitle.text('');
        
    //     this.loading.show();
    //     console.log(sybolType)
    //     setTimeout(() => {
    //         this.loading.hide();
    //         this.SymbolTitle.text(data.name);
    //         for (let i = 0; i < SymboData.length; i++) {
    //             const element = SymboData[i];
    //             var style = JSON.stringify(element.style)
    //             // const scrUrl = 'http://192.168.0.38:8090/iserver/services/map-TDLY/rest/maps/%E9%BE%99%E6%B2%99%E5%8C%BA%E7%8E%B0%E7%8A%B6%E5%9B%BE/symbol.jpg?resourceType=SYMBOLFILL&style=' + encodeURI(style)
    //             const scrUrl = this.data.mapAddress + '/symbol.jpg?resourceType='+ sybolType +'&style=' + encodeURI(style)
    //             this.SymbolContent.append('<div class="OneMap_SymbolItem" title="' + element.caption + '"><span class="OneMap_SymbolImage"><img style="-webkit-user-select: none;margin: auto;width:100%" src="'+ scrUrl +'" /></span><span class="OneMap_SymbolText">' + element.caption + '</span></div>');
    //         };
    //     }, 1000);
    // };
    this.data = data;
        this.SymbolTitle.text('');
        
        this.loading.show();
        console.log(sybolType)
        setTimeout(() => {
            this.loading.hide();
            this.SymbolTitle.text(data.name);
            for (let i = 0; i < SymboData.length; i++) {
                const element = SymboData[i];
                var style = JSON.stringify(element.style)
                // const scrUrl = 'http://192.168.0.38:8090/iserver/services/map-TDLY/rest/maps/%E9%BE%99%E6%B2%99%E5%8C%BA%E7%8E%B0%E7%8A%B6%E5%9B%BE/symbol.jpg?resourceType=SYMBOLFILL&style=' + encodeURI(style)
                const scrUrl = this.data.mapAddress + '/symbol.jpg?resourceType='+ sybolType +'&style=' + encodeURI(style)
                this.SymbolContent.append('<div class="OneMap_SymbolItem" title="' + element.caption + '"><span class="OneMap_SymbolImage"><img style="-webkit-user-select: none;margin: auto;width:100%" src="'+ scrUrl +'" /></span><span class="OneMap_SymbolText">' + element.caption + '</span></div>');
            };
        }, 1000);
};
////////////////////////////////////////////////
// 1.没有配置地址 2.没有配置layers 3.有图例和没有图例同时存在
// 吴东东
// 2021-04-08 08:59:05
////////////////////////////////////////////////
MapSymbol.prototype.show = function (data,event,treeAllList) {
    var obj = {
        eventObj: event,
        data: data,
        treeAllList: treeAllList
    }
    if(!data.legendAddress) {
        this.SymbolContent.empty()
        this.SymbolTitle.text('')
        this.optionError(obj)
        this.data = data
        this.SymbolContent.append('<div style="text-align: center;">请检查图例配置</div>')
        return false
    }
    var url = data.legendAddress + '/layers'
    //var url = 'http://192.168.0.38:8090/iserver/services/map-TDLY/rest/maps/%E9%BE%99%E6%B2%99%E5%8C%BA%E7%8E%B0%E7%8A%B6%E5%9B%BE/layers'
    api.getMapSymbol(url,(res) => {
        console.log(res)
        this.SymbolContent.empty();
        var count = 0
        for(let i =0;i<res[0].subLayers.layers.length;i++) {
            var item = res[0].subLayers.layers[i]
            var type = item.datasetInfo.type
            var sybolType
            if(type === 'POINT') {
                sybolType = 'SYMBOLMARKER'
            } else if(type === 'REGION') {
                sybolType = 'SYMBOLFILL'
            } else {
                sybolType = 'SYMBOLLINE'
            }
            var layerSymbol = item.theme ? item.theme.items : []
            if(layerSymbol && layerSymbol.length > 0) {
                count ++
                this.renderData(data,layerSymbol,sybolType);
                
                // if (this.html.hasClass('hide')) {
                //     this.html.show();
                //     setTimeout(() => {
                //         this.html.removeClass('hide');
                //     }, 10);
                // };
                // this.renderData(data,layerSymbol,sybolType);
                // this.event.changeView(true);
                // this.activeEvent = event.parent.children
                // this.activeEventItem = event
                // this.handleMapSymbolClass(event)
            } 
            // else {
            //     this.SymbolContent.empty();
            //     this.SymbolContent.append('<div style="text-align: center;">请检查图例配置</div>')
            // }
        }
        if(!count) {
            this.SymbolTitle.text('')
            this.data = data
            this.SymbolContent.append('<div style="text-align: center;">请检查图例配置</div>')
        }
        this.optionError(obj)
        // var layerSymbol = res[0].subLayers.layers[0].theme ? res[0].subLayers.layers[0].theme.items : []
        // if(layerSymbol.length > 0) {
        //     if (this.html.hasClass('hide')) {
        //         this.html.show();
        //         setTimeout(() => {
        //             this.html.removeClass('hide');
        //         }, 10);
        //     };
        //     this.renderData(data,layerSymbol);
        //     this.event.changeView(true);
        //     this.activeEvent = event.parent.children
        //     this.activeEventItem = event
        //     this.handleMapSymbolClass(event)
        // } else {
        //     layer.open({
        //         title: '警告',
        //         content: '请正确配置图例'
        //     });
        // }
        
    })
    
};
MapSymbol.prototype.optionError = function(obj) {
    if (this.html.hasClass('hide')) {
        this.html.show();
        setTimeout(() => {
            this.html.removeClass('hide');
        }, 10);
    };
    this.event.changeView(true);
    //this.activeEvent = obj.eventObj.parent.children
    this.activeEventItem = obj.eventObj
    //新增：针对不同目录下的图例操作
    for(let key in obj.treeAllList) {
        this.activeEvent = obj.treeAllList[key].children
        this.handleMapSymbolClass(obj.eventObj)
    }
    //this.handleMapSymbolClass(obj.eventObj)
}
MapSymbol.prototype.handleMapSymbolClass = function(event) {
    for(let i =0;i<this.activeEvent.length;i++) {
        var item = this.activeEvent[i].children
        if(this.activeEvent[i].type === 'map') {
            this.activeEvent[i].MapSymbol && this.activeEvent[i].MapSymbol.removeClass('map_symbol')
            this.activeEvent[i].MapSymbolFlag = true
        }
        if(item) {
            for(let l = 0;l<item.length;l++){
                var itemChild = item[l]
                itemChild.MapSymbol && itemChild.MapSymbol.removeClass('map_symbol')
                itemChild.MapSymbolFlag = true
            }
        }
        
        
    }
    event.MapSymbolFlag = false
    event.MapSymbol.addClass('map_symbol')
}
MapSymbol.prototype.hide = function (symbol) {
    this.html.addClass('hide');
    setTimeout(() => {
        this.html.hide();
    }, 320);
    this.event.changeView(false);
    // symbol.MapSymbol.removeClass('map_symbol')
    // symbol.MapSymbolFlag = true
    this.activeEventItem.MapSymbol.removeClass('map_symbol')
    this.activeEventItem.MapSymbolFlag = true
    
};
MapSymbol.prototype.checkHide = function (data) {
    if (this.data && data.id == this.data.id) {
        this.hide();
    };
};
MapSymbol.prototype.onChangeView = function (e) {
    this.event.changeView = e;
};


export default MapSymbol;