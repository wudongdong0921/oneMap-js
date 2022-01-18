import TreeData from './treeData'

var AnalyseIndex = 0;

var menuData = [
    {
        name: '数据目录', type: 'event', router: 'MapSource',
        children: [{
            children: [{
                color: '#68CDC0', name: '现状数据据', icon: 'icon-check-circle',
                children: [TreeData[0], TreeData[1], TreeData[2]],
            }, {
                color: '#85BDE3', name: '规划数据据据', icon: 'icon-check-circle',
                children: [TreeData[3], TreeData[4], TreeData[5]],
            }, {
                color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
                children: [TreeData[0], TreeData[4], TreeData[5]],
            }, {
                color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#68CDC0', name: '现状数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#85BDE3', name: '规划数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
                children: TreeData,
            }]
        }, {
            children: [{
                color: '#68CDC0', name: '现状数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#85BDE3', name: '规划数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#68CDC0', name: '现状数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#85BDE3', name: '规划数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
                children: TreeData,
            }, {
                color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
                children: TreeData,
            }]
        }],
    },
    {
        name: '专题分析', type: 'event', router: 'TopicAnalyse', children: [{
            color: '#68CDC0', name: '现状数据据', icon: 'icon-check-circle',
            children: [
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
                { title: '专题分析' + ++AnalyseIndex, id: icu.util.uuid(), des: '一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字一大堆测试用文字' },
            ],
        }, {
            color: '#85BDE3', name: '规划数据据据', icon: 'icon-check-circle',
            children: [],
        }, {
            color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
            children: [],
        }, {
            color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
            children: [],
        }, {
            color: '#68CDC0', name: '现状数据', icon: 'icon-check-circle',
            children: [],
        }, {
            color: '#85BDE3', name: '规划数据', icon: 'icon-check-circle',
            children: [],
        }, {
            color: '#EC9674', name: '管理数据', icon: 'icon-check-circle',
            children: [],
        }, {
            color: '#B683EB', name: '经济数据', icon: 'icon-check-circle',
            children: [],
        }],
    },
    { name: '分析历史', type: 'event', router: 'AnalyseHistory' },
    { name: '数据统计', type: 'event', router: 'DatumStatistics' },
    { name: '数据展示', type: 'link', router: 'DatumShow', },
    { name: '地图查询', type: 'event', router: 'MapSearch', }
];



export default menuData;