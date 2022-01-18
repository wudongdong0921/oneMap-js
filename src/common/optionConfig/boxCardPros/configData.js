
var handelData = function (configOption, data) {
    var AllData = [];
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // 要生成数据格式
            var createObj = {
                header: {
                    type: 'img', // 渲染类型，可根据类型判断标题右侧显示
                    onClick: undefined, // 是否有点击事件
                    title: "", // 头部标题显示
                    status: '', // 预警状态
                    pffaId:''
                },
                body: [],
                bottom: {
                    type: '',
                    bottomTitle: '',
                    titleColor: "blue",// 底部标签样式
                    onClick: undefined, // 是否有点击事件
                    status: '' // 预警状态
                }
            }
            // header处理
            for (const index in configOption.header) {
                if (configOption.header.hasOwnProperty.call(configOption.header, index)) {
                    const headerItem = configOption.header[index];
                    createObj.header[headerItem.type] = item[headerItem.key];
                }
            }
            createObj.header.type = configOption.headerType;
            createObj.onClick = configOption.headerClick;
            createObj.header.pffaId = item.pffaId
            // body处理
            for (let j = 0; j < item.indice.length; j++) {
                const indiceItem = item.indice[j];
                var itemObj = {
                    title: '', // 每一行名称
                    type: '',  // 渲染类型
                    img: undefined, // 是否有标题img图片
                    value: "", // 统计数值
                    bodyUnti: '', // 统计数值单位
                    status: '' // 预警状态
                }
                for (const o in configOption.body) {
                    if (configOption.body.hasOwnProperty.call(configOption.body, o)) {
                        const bodyItem = configOption.body[o];
                        itemObj[bodyItem.type] = indiceItem[bodyItem.key];
                        itemObj.type = configOption.bodyType;
                        itemObj.img = configOption.bodyImg;
                    }
                }
                createObj.body.push(itemObj);
            }

            // bottom处理
            createObj.bottom.type = configOption.bottom.type;
            createObj.bottom.bottomTitle = configOption.bottom.bottomTitle;
            createObj.bottom.titleColor = configOption.bottom.titleColor;
            createObj.bottom.onClick = configOption.bottom.onClick;
            createObj.bottom.status = configOption.bottom.status;
            AllData.push(createObj)
        }
    }
    return AllData
}

export default {
    handelData: handelData
}

// 配置项定义
// var configOption = {
//     headerType:'', // 头部渲染类型
//     bodyType:'', // 主体渲染类型
//     headerClick:'', //头部监听事件
//     bodyImg:'', // 主体标题图片
//     header: [{ key: "ratingName", type: "title" }, { key: 'pffaStatus', type: 'status' }],
//     body: [{key:'indexName',type:'title'},{key:'monitoringValue',type:'value'},{key:'monitorSituation',type:'status'},{key:"unitcode",type:'bodyUnti'}],
//     bottom: {
//         type: '', // 底部渲染类型
//         bottomTitle: '', // 底部标题
//         titleColor: "blue", // 底部标题颜色
//         onClick: undefined, // 底部标题点击事件
//         status: '' // 预警状态
//     }
// }