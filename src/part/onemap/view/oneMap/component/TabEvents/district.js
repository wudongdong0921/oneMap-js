////////////////////////////////////////////////
// 行政区
// 吴东东
// 2020-11-05 11:52:10
////////////////////////////////////////////////
import Select from "./../Select/select"
import Level from "./../Level/level"
import api from './../../apis/map'
var debounce = function(fn,delay) {
    let timer = null
    return function(args) {
        let that = this
        let _args = args
        
        clearTimeout(timer)
        timer = setTimeout(() =>{
            fn.call(that,_args)
        },delay)
    }
}
var _that
var itemlevel = function (res,parent) {
    this.itemHtml = $('<span class="" data-text="' + res.xzqmc + '" data-value="' + res.xzqdm + '" data-type="' + res.xzqmc + '">' + res.xzqmc+ '</span><span class="arrow">></span>')
    this.itemHtml.click(function () {
        var val = $(this).attr('data-type');
        var text = $(this).attr('data-text');
        var value = $(this).attr('data-value')
        var obj = {
            type: '1',
            roleArea:config.InterfaceAddress.roleArea,
            clickArea: res.xzqdm,
        }
        _that.districtPositioningSql(obj)
       // _that.appendItemLevel(text, val, value, data, res)
    })
}
var LevelParent = function (res) {
    this.levelHtml = $('<span sign="subarea" data-text="' + res.xzqmc+ '" data-value="' + res.xzqdm + '" data-type="' + res.xzqmc + '">' + res.xzqmc + '</span>')
    this.levelHtml.click(function () {
        var val = $(this).attr('data-type');
        var text = $(this).attr('data-text');
        var value = $(this).attr('data-value')
        //_that.event.getSelect(data, text, val)
        var obj = {
            type: '1',
            roleArea:config.InterfaceAddress.roleArea,
            clickArea: res.xzqdm,
        }
        _that.districtPositioningSql(obj)
        //_that.appendItemLevel(text, val, value, data, res)
    })
}

var Search = function (res, parent) {
    this.parent = parent
    var _this = this
    this.liHtml = $('<li data-text="' + res.xzqmc + '" data-value="' + res.xzqdm + '" data-type="' + res.xzqmc + '">' + res.xzqmc + '</li>')
    this.data = res.geometry
    this.liHtml.click(function () {
        var val = $(this).attr('data-type');
        var text = $(this).attr('data-text');
        var value = $(this).attr('data-value')
       // _that.event.getSelect(data, text, val)
        var obj = {
            type: '1',
            roleArea:config.InterfaceAddress.roleArea,
            clickArea: value,
        }
        //_that.html.find('.levelClass').append('<span data-text="'+ text+'">'+ text +'</span>')
        _that.districtPositioningSql(obj)
       // _that.appendItemLevel(text, val, value, data, res)
        _that.html.find('.district-selcet').hide()
    })
}

var District = function () {
    var _this = this
    var el = ""
    el += '<div class="district-padd">'
    el += '    <div class="district-wrapper district_input">'
    el += '        <div class="input_box"><input class="inputs" id="inputs" autocomplete="off" placeholder="请输入"/></div>'
    el += '        <div class="district-selcet-box">'
    el += '         <ul class="district-selcet district_ul"></ul>'
    el += '        </div>'
    el += '    </div>'
    el += '    <div class="district-city">'
    el += '         <span class="district_city_icon iconfont icon-location"></span>'
    el += '        <div class="levelClass"></div>'
    el += '        <div class="city-list"></div>'
    el += '         <div class="city-list-title">下级行政区</div>'
    el += '         <div class="city-list-box"></div>'
    el += '        </div>'
    el += '    </div>'
    el += '</div>'
    this.html = $(el)
    this.html.find('.district-selcet').hide()
    this.html.find('#inputs').remove()
    this.html.find('.input_box').append('<input class="inputs"  autocomplete="off" id="inputs" placeholder="请输入"/></div>')
    var getSearchAjax = debounce(_this.getSearchResult,1000)
    this.html.find('#inputs').on('input', function () {
        var value = $(this).val()
        var obj = {
            value: value,
            _this: _this,
            type: '0'
        }
        getSearchAjax(obj)
        return false
    })
    this.html.find('#inputs').on('blur',function() {
        _this.html.find('#inputs').val("")
        setTimeout(() => {
            _that.html.find('.district-selcet').hide()
        },200)
    })
    //this._Level = new Level()
    this.event = {
        getSelect: function () { }
    }
    _that = this
}
District.prototype.clearInputs = function() {
    this.html.find('#inputs').val("")
}
District.prototype.districtPositioningSql = function(obj, callback) {
    var _this = this
    var type = obj.type
    var val = obj.value
    api.getAreaLocation(obj,(res) => {
        _that.event.getSelect(JSON.parse(res.areaLocationGeoJson.geoJson), val)
        _that.appendItemLevel(res.upperLevel)
        
        _this.getDistrictResultSql(res, type, val)
    })
}
District.prototype.getSearchResult = function(data) {
    const {_this} = data
    api.getAreaLocationSearch({
        areaName: data.value
    },(res) => {
        _this.getSearch(res.data)
    })
}
District.prototype.getSearch = function(data) {
    _that.html.find('.district-selcet').empty()
    for(let i =0;i<data.length;i++) {
        const item = data[i]
        var _Search = new Search(item, _that)
        _that.html.find('.district-selcet').append(_Search.liHtml)
        _that.html.find('.district-selcet').show()
    }
}
District.prototype.getLevelParent = function(data) {
    for(let i =0;i<data.length;i++) {
        const item = data[i]
        var _Level = new LevelParent(item)
        _that.html.find('.city-list-box').append(_Level.levelHtml)
    }
    
}
District.prototype.getDistrictResultSql = function(serviceResult, type, value) {
    var data = serviceResult
    _that.administrativeAreaDataArr = []
    _that.html.find('.district-selcet').empty()
    _that.html.find('.city-list-box').empty()
    if (type === '1') {
       _that.getLevelParent(data.lowerLevel)
    }
}
District.prototype.appendItemLevel = function (data) {
    this.html.find('.levelClass').empty()
    var arr = data.sort((a,b) => {
        return a.xzqdm-b.xzqdm
    })
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        var _itemlevel = new itemlevel(item, _that)
        this.html.find('.levelClass').append(_itemlevel.itemHtml)
    }


}
District.prototype.handleGetSelect = function (event) {
    this.event.getSelect = event
}
export default District