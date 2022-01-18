
var mainObj = {
    0: {
        title: '',
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    1: {
        title: '',
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    2: {
        title: '可载',
        img: './static/icon/safety.svg',
        color: '#2b5394'
    },
    3: {
        title: '临界超载',
        img: './static/icon/danger.svg',
        color: '#db1029'
    },
    4: {
        title: '超载',
        img: './static/icon/warning.svg',
        color: '#f7a031'
    }
    // 2021-05-26 陈薪名 修改bug HNXGTKJ-1706
    // 3: {
    //     title: '超载',
    //     img: './static/icon/warning.svg',
    //     color: '#f7a031'
    // },
    // 4: {
    //     title: '临界超载',
    //     img: './static/icon/danger.svg',
    //     color: '#db1029'
    // }
}
var statusObj = {
    0: {
        title: '未监测指标',
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    1: {
        title: '未监测指标',
        img: './static/icon/em.png',
        color: '#2b5394'
    },
    2: {
        title: '正常指标',
        img: './static/icon/safety.svg',
        color: '#2b5394'
    },
    3: {
        title: '预警指标',
        img: './static/icon/warning.svg',
        color: '#f7a031'
    },
    4: {
        title: '超标指标',
        img: './static/icon/danger.svg',
        color: '#db1029'
    }
}
var handelData = function(allData){
    var head = {
        header: [],
        bottom: [],
        data: []
    };
    head.header.push({ align: 'center', field: 'area', title: '行政区划', rowspan: 2 })
    for (let i = 0; i < allData[0].indice.length; i++) {
        const element = allData[0].indice[i];
        head.header.push({ align: 'center', title: element.indexName + '评价', colspan: 2 })
        head.bottom.push({ align: 'center', field: 'floorSpace' + i, title: element.indexName })
        head.bottom.push({ align: 'center', field: 'state' + i, title: '预警情况' })
    }
    head.header.push({ align: 'center', field: 'power', title: '承载能力', rowspan: 2 })
    var objArray = []
    for (let j = 0; j < allData.length; j++) {
        var obj = {
            area: '',
            power: '超载'
        }
        const item = allData[j];
        obj.area = item.xzqhId
        obj.power = mainObj[item.zhuangtai].title
        for (let k = 0; k < item.indice.length; k++) {
            const indiceItem = item.indice[k];
            obj['floorSpace' + k] = indiceItem.monitoringValue
            obj['state' + k] = statusObj[indiceItem.monitorSituation].title
        }
        objArray.push(obj)
    }
    head.data = objArray
    return head
}

export default {
    handelData:handelData
}