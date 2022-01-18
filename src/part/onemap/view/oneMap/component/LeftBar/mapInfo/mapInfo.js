
var tableobj = {
    dataName: '数据名称',
    dataSource: '数据来源',
    updateTime: '更新时间',
    updateUser: '更新人员',
    updates: '更新内容'
}

import _api from './../../../apis/mapInfo'
import mapInfoTable from './mapInfoTable'
var mapTableFactory = (function () {
    var obj = {}
    return {
        create: function (type) {
            if (obj[type]) {
                return obj[type]
            }
            return obj[type] = new mapInfoTable()
        }
    }
})()
var mapInfoSelect = function (id) {
    return new Promise((resolve, reject) => {
        _api.getMapSelectDate(id,res => {
            console.log(res)
            var result = res.data
            if( result.length == 0){
                layer.alert("当前地图暂无更新信息。");
            }else {
                var _select = new icu.formElement.select({
                    data: result,
                    default: result[0].value,
                })

                resolve({
                    value:result[0].value,
                    _select: _select,
                })
            }
        })
    })
}
var mapInfoTableApi = function (data) {
    return new Promise((resolve, reject) => {
        _api.getMapMessages(data,res => {
            resolve({
                data: res
            })
        })
    })
}
var chnageSelectValue = function(obj) {
    const {value,_mapTableFactory,mapId} = obj
    mapInfoTableApi({
        mapId:mapId,
        updateDate:value
    }).then(res => {
        console.log(res)
        res && _mapTableFactory.setInit(res.data.data,tableobj)
    })
}
var mapInfo = (function () {
    //动态创建导致事件挂载失败,重新生成
    //var html = $('<div></div>')
    return {
        add: function (id,callback) {
            var html = $('<div class="map-info-wrapper"></div>')
            mapInfoSelect(id).then(res => {
                console.log(res)
                html.append(res._select.html)
                var _mapTableFactory = mapTableFactory.create('table')
                html.append(_mapTableFactory.bute)
                callback(html)
                chnageSelectValue({
                    mapId: id,
                    value: res.value,
                    _mapTableFactory:_mapTableFactory
                })
                res._select.onChange((value)=> {
                    chnageSelectValue({
                        value: value,
                        mapId: id,
                        _mapTableFactory:_mapTableFactory
                    })
                })


            })
        }
    }
})()
export default mapInfo
