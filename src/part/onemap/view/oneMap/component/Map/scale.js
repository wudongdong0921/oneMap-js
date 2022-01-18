import scaleData from "./../../apis/scale"
var getScales = function(zoom1) {
    var zoom = Math.round(zoom1)
    var scale = ""
    scale = scaleData[zoom].scales
    for(let i =0;i<scaleData.length;i++) {
        const item = scaleData[i]
        if(item.zoom === zoom) {
            return scale = item.scales
        }
    }
}
export default getScales