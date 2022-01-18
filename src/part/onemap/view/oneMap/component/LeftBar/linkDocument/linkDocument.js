////////////////////////////////////////////////
// 关联文档
// 吴东东
// 2021-08-18 13:40:06
////////////////////////////////////////////////
import updateMapDocument from './updateMapDocument'
import linkDocumentTable from './linkDocumentTable'
import _api from './../../../apis/mapInfo'
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
var linkDocumentFactory = (function () {
    var obj = {}
    return {
        create: function (type) {
            if (obj[type]) {
                return obj[type]
            }
            return obj[type] = new linkDocumentTable()
        }
    }
})()
var linkDocumentSingle = function(fn) {
    var result = null;
    return function() {
        return result || (result = fn.apply(this,arguments))
    }

}
var linkDocumentInput = linkDocumentSingle(function(obj){
    const { dom } =obj
    var html = $('<div class="link_document_wrapper"><input class="link_document_input"  autocomplete="off" id="linkDocumentInput" placeholder="请输入文档名称"/></div>')

    return html

})
var iframeDom = function(obj){
    var dom = $('<iframe id="docIframe" scrolling="auto" allowtransparency="true" style="display: block;width: 100%;height: ' + 726 + 'px;" frameborder="0" src=""></iframe>')
    if(obj.type === '1') {
        var url = config.InterfaceAddress.renrenService + '/renren-admin/doc.file/view/' + obj.id
        dom[0].src = url
    }else {
        var url = config.InterfaceAddress.implementService + '/doc.file/view/' + obj.id
        dom[0].src = url
    }
    // dom[0].onload = function(){
    //     dom.find('img').css({
    //         width: '100%'
    //     })
    // }
    return dom
}
var mapPdfPrew = function(obj) {
    _api.verify(obj.id,(res) => {
        var dom = iframeDom(obj)
        updateMapDocument({
            id:obj.id,
            type:'pdf',
            dom:dom,
            title: obj.fileRealName,
            width: '1000px',
            height: '800px'
        })
    })
}
var linkDocumentTableDom = linkDocumentSingle(function(obj) {
    const { dom } =obj
    var _linkDocumentTable = new linkDocumentTable()
    var $div = $('<div class="configObjectBox"></div>')
    $div.append(_linkDocumentTable.html)

    return {
        $div:$div,
        _linkDocumentTable: _linkDocumentTable
    }
})
var linkDocumentTableApi = function () {
    var _linkDocumentFactory= linkDocumentFactory.create('documentTable')
    return _linkDocumentFactory
}
var clearInputInfo = function(input) {
    input.find('#linkDocumentInput').val('')
}
var changeInputInfo = function(obj) {
    const {__linkDocumentTableObj,mapId,documentName} = obj
    setTimeout(() => {
        __linkDocumentTableObj._linkDocumentTable.handleMapPdfPrew(mapPdfPrew.bind(this))
        __linkDocumentTableObj._linkDocumentTable.refreshData(obj)
    },200)

}
var linkDocument = (function () {
    return {
        add: function (id,callback) {
            var html = $('<div class=""></div>')
            var input = linkDocumentInput({
                dom: html
            })
            clearInputInfo(input)
            html.append(input)
            var __linkDocumentTableObj = linkDocumentTableDom({
                dom: html
            })
            html.append(__linkDocumentTableObj.$div)
            callback(html)
            changeInputInfo({
                __linkDocumentTableObj:__linkDocumentTableObj,
                documentName: '',
                mapId:id
            })
            var _debounce = debounce(changeInputInfo,1000)
            input.find('#linkDocumentInput').on('input',function(e) {
                _debounce({
                    __linkDocumentTableObj:__linkDocumentTableObj,
                    documentName: e.target.value,
                    mapId:id
                })
            })
        }
    }
})()
export default linkDocument
