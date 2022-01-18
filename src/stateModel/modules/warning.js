let warningStore = function () {
    this.$state = {
        userData: icu.session.get('userInfo'), // 用户信息
        areacodeList: icu.session.get('userInfo').areacodeList, // 行政区划code数据集合
        nextPlay: false, // 向下播放
        autoPlay: false, // 设置自动播放
        intervalAuto: '',// 定时播放器
        dep: 1, // 控制市县级别
        adCode: '', // 全局行政区划号
        planTitleList: [],//面板标题数据集合
        defaultShowSubIndex: -1, //设定默认展开，选中所展示的下拉面板,哪个有数据展开哪个
        zbxxxbId: '',// 设置默认zbxxxbId，可以渲染柱状图，地图
        echartTitle: '',// 设置动态图表标题
        statusObj: {
            0: {
                img: './static/icon/em.png',
                color: '#2b5394'
            },
            1: {
                img: './static/icon/em.png',
                color: '#2b5394'
            },
            2: {
                img: './static/icon/safety.svg',
                color: '#2b5394'
            },
            3: {
                img: './static/icon/warning.svg',
                color: '#f7a031'
            },
            4: {
                img: './static/icon/danger.svg',
                color: '#db1029'
            }
        }, // 设定颜色以及图片配置，用于左侧面板
        mapColor: {
            0: {
                color: '#2b5394'
            },
            1: {
                color: '#CCC'
            },
            2: {
                color: '#c2e5e5'
            },
            3: {
                color: '#fcfcd4'
            },
            4: {
                color: '#ff8848'
            }
        }, // 设定地图颜色值
        year: '', //选中的年份
    }
}
warningStore.prototype.getUserAcodeList = function () {
    return this.$state.areacodeList;
}
warningStore.prototype.setData = function (key, data) {
    this.$state[key] = data; // 向共享数据中放值
}
warningStore.prototype.closePlayStatus = function () {// 关闭轮播状态
    this.$state.nextPlay = false;
    this.$state.autoPlay = false;
}
warningStore.prototype.startPlayStatus = function () {// 关闭轮播状态
    this.$state.nextPlay = true;
    this.$state.autoPlay = true;
}
warningStore.prototype.clearIntervalAuto = function () {//清除定时执行的方法
    clearInterval(this.$state.intervalAuto)
}
warningStore.prototype.handelDep = function () { // 处理市县级别
    // adCode 为选择的行政区划号，动态定义在全局共享数据中心
    // adCode，第3,4位为0，则说明是省份，例如：230000，否则为市县
    if (this.$state.adCode.charAt(2) == '0' && this.$state.adCode.charAt(3) == '0') {
        this.$state.dep = 1;
    } else {
        this.$state.dep = 2;
    }
}
warningStore.prototype.handelPlaneData = function (data) {// 处理外层面板所需的数据
    this.$state.planTitleList = []
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            this.$state.planTitleList.push({
                titleName: item.ZBXZ,
                divId: 'divId' + i
            })
            if (item.IndicatorData.length > 0) {
                // this.$state.defaultShowSubIndex = i
                this.$state.defaultShowSubIndex = 0
            }
        }
    }
}
warningStore.prototype.isNeedZoom = function () {
    if ((this.$state.adCode.charAt(2) == '0' && this.$state.adCode.charAt(3) == '0') &&
        (this.$state.adCode.charAt(4) == '0' && this.$state.adCode.charAt(5) == '0')) { //adCode，第5,6位为0，则说明不是县级，3,4其中一个不为0，则为市级，例如：230100
        return 0;
    }
    if ((this.$state.adCode.charAt(2) != '0' || this.$state.adCode.charAt(3) != '0') &&
        (this.$state.adCode.charAt(4) == '0' && this.$state.adCode.charAt(5) == '0')) { //adCode，第5,6位为0，则说明不是县级，3,4其中一个不为0，则为市级，例如：230100
        return 1;
    }
    return 2;
}
warningStore.prototype.fnBuildColorLayerParam = function (colorAreas, areas) {//创建渲染颜色地图需要的数据
    for (let i = 0; i < colorAreas.length; i++) {
        var item = colorAreas[i];
        for (let j = 0; j < areas.length; j++) {
            var itemJ = areas[j];
            if (item.xzqhId == itemJ.properties.adcode) {
                item.geoJson = itemJ.geometry;
                item.xzbm = itemJ.properties.adcode;
                item.id = itemJ.properties.adcode;
                item.color = this.$state.mapColor[item.monitorSituation].color;
            }
        }
    }
    return colorAreas;
}
export default warningStore;