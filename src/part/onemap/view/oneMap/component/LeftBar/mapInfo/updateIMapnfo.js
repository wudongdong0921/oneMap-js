////////////////////////////////////////////////
// 更新信息
// 吴东东
// 2021-08-18 09:18:08
////////////////////////////////////////////////
import ToolPopup from './../../ToolPopup/popupNew'
var updateMapInfoFactory = (function() {
    var obj = {}
    return {
        create: function(type,fn) {
            if(obj[type]) {
                return obj[type]
            }
            return obj[type] = new fn()
        }
    }
})()
var getPoupDatas = function(id,_infoPopup) {
    
    updateMapInfoManger.setDatas(id,_infoPopup)
    _infoPopup.html.find('.layout-dialog-body').html(_infoPopup.dom)
}
var updateMapInfoManger = (function() {
    var option = {}
    return {
        add: function(obj) {
            const {id,type,dom,title} = obj
            var _infoPopup = updateMapInfoFactory.create(type,ToolPopup)
            //_infoPopup.html.find('.layout-dialog-body').empty()
            _infoPopup.handleShow({
                title: title,
                mask: true,
                icon: false,
                width: '500px',
                left: '50%',
                top: '50%',
                height: '400px',
                content: 'content',
            })
            option[id] = {
                dom: dom
            }
            getPoupDatas(id,_infoPopup)
        },
        setDatas: function(id,tar) {
            var _option = option[id]
            for(let key in _option) {
                tar[key] = _option[key]
            }
        }
    }
})()
var updateMapInfo = function(obj) {
    updateMapInfoManger.add(obj)
}

export default updateMapInfo