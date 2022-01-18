////////////////////////////////////////////////
// 
// 吴东东
// 2021-08-18 11:13:12
////////////////////////////////////////////////
var mapInfoTable = function () {
    var html = ''
    html += '<table sign="' + '1' + '" class="sxTab"  style="width:100%;table-layout:fixed; margin-top:14px;background:#fff; text-align:center; border:1px solid #ccc;" border="1">'
    html += '   <tr style="text-align:left; height:30px;">';
    // html += '       <td colspan="2" style="padding-left:10px;"></td>';
    html += '   </tr>';
    html += '</table>'
    this.bute = $(html)
}
mapInfoTable.prototype.setInit = function (obj,res) {
    this.bute.empty()
    var props = obj
    var html = ''
    for (let key in res) {
        var name = res[key]
        var value = ""
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
}
export default mapInfoTable