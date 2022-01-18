////////////////////////////////////////////////
// 属性信息
// 吴东东
// 2020-11-09 19:05:27
////////////////////////////////////////////////
import {
    attributeMap
} from './constTable'
import api from "./../../../apis/map"
var Attribute = function (obj, mapId) {
    this.list = obj
    this.mapId = mapId
    var html = ''
    html += '<table sign="' + obj.SMID + '" class="sxTab"  style="width:100%;table-layout:fixed; background:#fff; text-align:center; border:1px solid #ccc;" border="1">'
    html += '   <tr style="text-align:left; height:30px;">';
    html += '       <td colspan="2" style="padding-left:10px;">要素</td>';
    html += '   </tr>';
    html += '</table>'
    this.bute = $(html)
    this.setInit()
}
Attribute.prototype.setInit = function () {
    var props = this.list
    var arrList = []
    var html = ''
    api.getIdentifyField({
        mapId: this.mapId
    }, (res) => {
        for (let key in res) {
            var name = res[key]
            var value = ""
            if (name === 'SMID') {
                arrList.push({
                    name: value,
                    value: value
                })
            }
            for (let k in props) {
                if (key == k) {
                    value = props[k]
                    break
                }
            }
            if (name) {
                html += '   <tr style="height:30px;">';
                html += '       <td style="word-wrap:break-word;">' + name + '</td>>';
                html += '       <td style="word-wrap:break-word;">' + value + '</td>';
                html += '   </tr>';
            }

        }
        this.bute.append($(html))
    })


    // for(let key in props) {
    //     var value = props[key]
    //     if(key === 'SMID') {
    //         arrList.push({
    //             name: value,
    //             value: value
    //         })
    //     }
    //     for( let k in attributeMap) {
    //         if(key == k) {
    //             key = attributeMap[k]
    //             break
    //         }
    //     }
    //     html += '   <tr style="height:30px;">';
    //     html += '       <td style="word-wrap:break-word;">' + key+ '</td>>';
    //     html += '       <td style="word-wrap:break-word;">' + value + '</td>';
    //     html += '   </tr>';
    // }

}
export default Attribute