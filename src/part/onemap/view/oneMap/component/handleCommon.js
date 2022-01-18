//导出
var exportTXTFile = function(el,type,geometry,needArr) {
    var single
    var param
    var number
    console.log(el,type,geometry,needArr)
    if (type == '1') {
        geometry = [];
    }
    if (type == '3') {
        for (var i = 0; i < needArr.length; i++) {
            single = {
                type: 'Region',
                //parts: [],
                points:  needArr[i]
            }
            geometry.push(single);
            number = el.find("input[name='generate']:checked").val()
        }
    } else {
        single = {
            type: 'Region',
            //parts: [],
            points: needArr
        }
        geometry.push(single);
        number = el.find("input[name='exportNumber']:checked").val()
    }
    console.log()
    var param = {
        geometry :geometry,
        dsName:null,
        dtName:null,
        qhdm:'230200',
        returnMode:'TXTFORMAT',
        number:number
    };
    return param
}
export default {
    exportTXTFile: exportTXTFile,
}