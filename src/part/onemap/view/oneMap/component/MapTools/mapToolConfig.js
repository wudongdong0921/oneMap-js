const toolConfig = {
    obj:{
        meauses: [{
                name: '测量线',
                type: 'measur-line'
            },
            {
                name: '测量面',
                type: 'meaur-face'
            }
        ],
        physons: [{
                name: '绘制点',
                type: 'ponit'
            },
            {
                name: '绘制线',
                type: 'line'
            },
            {
                name: '绘制面',
                type: 'face'
            }
        ],
        chose: [{
                name: '单选',
                type: 'radio'
            },
            {
                name: '连选',
                type: 'check'
            }
        ],
        exports: [{
                name: 'TXT坐标',
                type: 'txt'
            },
            {
                name: '矢量文件',
                type: 'vector'
            }
        ],
        areacodeList:[],
        splitScreen: [
            {
                name: '两屏',
                type: 'screenTwo'
            },
            {
                name: '四屏',
                type: 'screenFour'
            }
        ]
    },
    popupObj: {
        upmap: {
            name: '上图',
            type: 'upmap'
        },
        district: {
            name: '行政区定位',
            type: 'district'
        },
        txt: {
            name: 'TxT坐标',
            type: 'txt'
        },
        vector: {
            name: '矢量文件',
            type: 'vector'
        },
        coordinate: {
            name: '坐标转换工具',
            type: 'coordinate'
        }
    }
}
export default toolConfig