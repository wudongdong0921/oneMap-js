////////////////////////////////////////////////
// 更新信息
// 吴东东
// 2021-08-18 09:18:08
////////////////////////////////////////////////
import ToolPopup from './../../ToolPopup/popupNew'
var updateMapDocumentFactory = (function() {
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
var getPoupDatas = function(id,_documentPopup) {
    updateMapDocumentManger.setDatas(id,_documentPopup)
    _documentPopup.html.find('.layout-dialog-body').html(_documentPopup.dom)
}
var updateMapDocumentManger = (function() {
    var option = {}
    return {
        add: function(obj) {
            const {id,type,dom,title,width,height} = obj
            var _documentPopup = updateMapDocumentFactory.create(type,ToolPopup)
            _documentPopup.handleShow({
                title: title,
                mask: true,
                icon: false,
                width: width,
                left: '50%',
                top: '50%',
                height: height,
                content: 'content',
            })
            option[id] = {
                dom: dom
            }
            getPoupDatas(id,_documentPopup)
        },
        setDatas: function(id,tar) {
            var _option = option[id]
            for(let key in _option) {
                tar[key] = _option[key]
            }
        }
    }
})()
var updateMapDocument = function(obj) {
    updateMapDocumentManger.add(obj)
}

export default updateMapDocument