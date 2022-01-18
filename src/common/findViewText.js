////////////////////////////////////////////////
// 查看正文js
// 刘帅
// 2020-07-15 16:24:17
////////////////////////////////////////////////
var findViewText = function ( updateBy, pdfUrl, textId) {


    if (updateBy == "1") {
        var url = pdfUrl.split("/")[pdfUrl.split("/").length - 2] + "/" + pdfUrl.split("/")[pdfUrl.split("/").length - 1]
        //签章回显
        dialog({
            top: '30px',
            width: '85%',
            height: '95%',
            path:'/official/common_page/fjView',
            params:{
                url:url
            },
            // content: config.InterfaceAddress.affairServiceNatureHuinan + "/PDF.html?file=" + config.InterfaceAddress.affairServiceNatureHuinan + "/attachment/oa/" + url,
            title: '查看',
            onClose() {
            }
        });
        //是否套红
    } else {
        // console.log(pdfUrl)
        if (!textId && !pdfUrl) {
            top.layer.msg('该收文无正文！')
            return;
        }
        if (pdfUrl != '') {
            var url = pdfUrl.split("/")[pdfUrl.split("/").length - 2] + "/" + pdfUrl.split("/")[pdfUrl.split("/").length - 1]
            // console.log(config.InterfaceAddress.affairServiceNatureHuinan + "/PDF.html?file=" + config.InterfaceAddress.affairServiceNatureHuinan + "/attachments/oa/" + url)
            dialog({
                top: '30px',
                width: '85%',
                height: '95%',
                path:'/official/common_page/fjView',
                params:{
                    url:url
                },
                // content: config.InterfaceAddress.affairServiceNatureHuinan + "/PDF.html?file=" + config.InterfaceAddress.affairServiceNatureHuinan + "/attachment/oa/" + url,
                title: '查看',
                onClose() {
                }
            });
        } else if (textId != '') {
            // console.log(textId)
            POBrowser.openWindowModeless(config.InterfaceAddress.affairService + '/natureResource/redTemplate/taoHongFile?textId=' + textId, 'width=1824px;height=950px;');
        };
    }
    
}

export default {
    findViewText
}