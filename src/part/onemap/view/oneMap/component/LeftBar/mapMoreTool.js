import mapInfo from './mapInfo/mapInfo'
import updateMapInfo from './mapInfo/updateIMapnfo'
import linkDocument from './linkDocument/linkDocument'
import updateMapDocument from './linkDocument/updateMapDocument'
var mapMoreTool = function(id,el) {
    this.html = $('<div class="map_more_tool"></div>').appendTo(el)
    this.box = $('<div class="map_more_box"></div>').appendTo(this.html)

    this.messages = $('<button class="map_more_button">更新信息</button>').appendTo(this.box);
    this.filePdf = $('<button class="map_more_button">关联文档</button>').appendTo(this.box);
    var title = this.messages[0].innerText
    this.messages.click(() => {
        mapInfo.add(id,(dom) => {
            updateMapInfo({
                id:id,
                type:'info',
                dom:dom,
                title: title
            })
        })

    })
    this.filePdf.click(() => {
        linkDocument.add(id,(dom) => {
            updateMapDocument({
                id:id,
                type:'document',
                dom:dom,
                title: "关联文档信息",
                width: '400px',
                height: '600px'
            })
        })
    })
}
export default mapMoreTool
