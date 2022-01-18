var Double = function() {
    var doublrHtml = ''
    doublrHtml += '<div id="OneMapDouble" style="display:flex;flex-wrap: wrap;">'
    doublrHtml += ' <div class="OneMapDouble-left" style="position:relative;width:50%;height:100%" id="sceneLeftMap"></div>'
    doublrHtml += ' <div calss="OneMapDouble-right" style="position:relative;width:50%;height:100%" id="sceneRightMap"></div>'
    doublrHtml += ' <div class="OneMapDouble-left" style="position:relative;width:50%;height:100%" id="sceneLeftMap1"></div>'
    doublrHtml += ' <div calss="OneMapDouble-right" style="position:relative;width:50%;height:100%" id="sceneRightMap1"></div>'
    doublrHtml += '</div>'
    this.html = $(doublrHtml)
    this.html.hide()
}
export default Double