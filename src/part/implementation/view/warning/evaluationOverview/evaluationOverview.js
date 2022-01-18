////////////////////////////////////////////////
// 评估总览
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////

import districtLinkage from "../../../../../common/districtLinkage";
import Echarts from './otherPage/echarts'
import PlayLines from "../../../../../common/playLine";
import MapBoxGl from '../otherPage/map'
import AssessmentIndexList from './otherPage/assessmentIndexList'
import RankingListView from './otherPage/rankingList'
import TabLableView from '../../../../../common/tabLable'

import PlayLinePros from "../../../../../common/playLinePro";
export default {
    adCode: '',
    adName: '',
    year: '',
    echarts : null,
    render: function () {
        this.nextPlay = false; // 是否播放下一个
        this.autoPlay = false; // 是否自动播放
        this.fnRenderAreaView();
    },
    fnRenderAreaView() {
        let _this = this;
        var _linkage = new districtLinkage(this.$el.find(".area-tree"));
        var userData = icu.session.get("userInfo");
        _linkage.setUserData(userData.areacodeList);
        _linkage.onChange((data) => {//区域组件初始化，也会调用此处，可以在这里监听adCode初始化，再做其他流程
            _this.adCode = data.dictValue;
            _this.adName = data.dictLabel;
            _this.$el.find('.area-tree').text(data.dictLabel);
            _this.fnOnAdCodeChange(function(){
                _this.fnRenderMap();
            });
            // 2021-05-08 陈薪名 切换行政区划后，该元素重复子类，在此需要清空下，修改bug HNXGTKJ-1614
            $('#play_line').empty();
        });
    },
    fnOnAdCodeChange() {
        this.fnCalcMapDep(); //计算获取地图数据的第二个参数
        this.fnGetYearLineData(); //获取时间线组件数据
        this.fnAssessmentTrendChart();//渲染左下角柱状图
    },
    /**
   * 计算获取地图数据的第二个参数,渲染地图时需要
   */
    fnCalcMapDep() {
        if (this.adCode.charAt(2) == '0' && this.adCode.charAt(3) == '0') { //adCode，第3,4位为0，则说明是省份，例如：230000，否则为市县
            this.dep = 1;
        } else {
            this.dep = 2;
        }
    },
    /**
     * 获取时间线组件数据，并更新当前年份，以及相应年份列表数据
     */
    fnGetYearLineData() {
        var _this = this;
        this.$api.boundaryControlIndicatorsRotations({
            adCode: this.adCode
        }, function (res) {
            if (res.code == 0) {
                if (res.data.length > 0) {
                    _this.fnRenderYearLineView(res);//渲染时间线组件
                }
            }
            // 2021-05-27 陈薪名 修改bug HNXGTKJ-1738
            _this.renderView()
        });
    },
      
    // 根据年份刷新页面
    renderView: function () {
        var _this = this;
        //this.year = this.playLineView.getTime()
        if (this.playLineView == null) { // 无数据情况下，获取当前时间
            this.year = new Date($.ajax({async:false}).getResponseHeader("Date")).getFullYear();// 当前时间
        } else {
            this.year = this.playLineView.getTime();
        }
        _this.fnGetOverviewData(function(){//根据时间变化，重新获取左侧指标列表数据
            _this.fnRenderMap();
        });
    },
    /**
     * 显示时间线组件
     */
    fnRenderYearLineView(res) {
        var _this = this;
        _this.playLineView = new PlayLinePros({ el: _this.$el.find('#play_line'), auto: false })
        this.playLineView.setRenderData(res.data);
        _this.playLineView.on('playClick', () => {
            _this.autoPlay = false;
            _this.nextPlay = false;
            clearInterval(_this.auto);
            _this.renderView();
        })
        _this.playLineView.on('play', () => {
            _this.autoPlay = true;
            _this.nextPlay = true;
            _this.auto = setInterval(() => {
                if (_this.nextPlay) {
                    _this.nextPlay = false;
                    _this.playLineView.nextPlay()
                    _this.renderView()
                }
            }, 5000);
        })
        _this.playLineView.on('endPlay', () => {
            _this.autoPlay = false;
            _this.nextPlay = false;
            clearInterval(_this.auto);
        })
    },
    /**
     * 根据时间变化，重新获取左上角指标数据
     */
    fnGetOverviewData(cb) {
        var _this = this;
        this.$api.assessmentProportionChart({
            adCode: this.adCode,
            year: this.year,
        }, function (res) {
            if (res.code == 0) {
                _this.fnRenderBallView(res);//渲染球数据
                _this.fnRenderIndexProgress(res.data.assessmentIndex);//渲染球下方的指标列表
                _this.fnRenderSwitchBtns(res.data.assessmentIndex);//渲染右下角雷达图切换按钮组
                if(cb){
                    cb()
                }
            }
        });
    },
    /**
     * 渲染球数据
     * @param {*} res 
     */
    fnRenderBallView(res) {
        var _this = this;
        var weightGrade = res.data.assessmentWaterBottle == null ? 0 : res.data.assessmentWaterBottle.weightGrade;
        _this.$el.find("#overview_num").text(weightGrade);
        _this.$el.find("#overview_aera").text(_this.adName);
        console.log(weightGrade/100);
        
        this.wavesurRecord(weightGrade/100);
    },
    /**
     * 渲染球下方的指标列表
     * @param {} indexList 
     */
    fnRenderIndexProgress(indexList) {
        var list = [];
        indexList.forEach(element => {
            list.push({
                label: element.indexTypes,
                value: element.weightGrade,
                percent: element.weightGrade > 100 ? 100 : element.weightGrade
            })
        });
        var indexList = new AssessmentIndexList({
            itemArray: list
        });
        this.$el.find("#progress_list").empty();
        this.$el.find("#progress_list").append(indexList.getHtml());
    },
    /**
     * 渲染左下角柱状图
     */
    fnAssessmentTrendChart() {
        var _this = this;
        this.$api.assessmentTrendChart({
            adCode: _this.adCode
        }, function (res) {
            if (res.code == 0 && res.data.length > 0 ) {
                var echarts = new Echarts();
                echarts.barChart(_this.$el.find('.layout_bottom')[0], res.data);
            }else {
                // 无数据情况下
                _this.$el.find('.layout_bottom').empty();
                _this.$el.find('.layout_bottom').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
                _this.$el.find('.layout_bottom').removeAttr('_echarts_instance_');
            }
        });
    },
    /**
     * 渲染右下角雷达图切换按钮组
     * @param {*} data 
     */
    fnRenderSwitchBtns(data) {
        var list = [];

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            list.push({
                lable: item.indexTypes,
                value: item.id
            });
        }
        let _this = this
        var tabLableViews = new TabLableView({
            el: '',
            itemArray: list,
            default: 0,
            onClick: function (data) {
                _this.fnGetRadarData(data.value);
            }
        })
        this.$el.find('.switch_btns').empty();
        this.$el.find('.switch_btns').append(tabLableViews.init());
        if (data.length > 0) {
            var id = data[0].id;
            this.fnGetRadarData(id);//当maxZblx参数改变时，渲染雷达图 TODO
        } else { 
            if (this.echarts != null) {
                this.echarts.clear();
            }
        }
    },
    /**
     * 获取右下角雷达图数据
     */
    fnGetRadarData(maxZblx) {
        var _this = this;
        this.$api.assessmentRadarChart({
            adCode: this.adCode,
            year: this.year,
            maxZblx: maxZblx
        }, function (res) {
            if (res.code == 0) {
                _this.fnRenderRadarChart(res.data);
            }
        });
    },
    fnRenderRadarChart(data) {
        // 2021-05-28 陈薪名 修改bug HNXGTKJ-1227 如果数据大于5条只显示最近5年数据
        var myArray = [];
        if (data.length > 5) {
            myArray = data.slice(0,5);
            this.echarts = new Echarts();
            this.echarts.radarChart(this.$el.find(".radar_echart")[0], myArray);
        } else if(data.length > 0){
            myArray = data;
            this.echarts = new Echarts();
            this.echarts.radarChart(this.$el.find(".radar_echart")[0], myArray);
        }else{
            this.$el.find('.switch_btns').empty();
            this.$el.find('.radar_echart').empty();
            this.$el.find('.radar_echart').append('<div style="text-align:center;color:#cac3c3;">暂无数据！</div>');
            this.$el.find('.radar_echart').removeAttr('_echarts_instance_');
        }
        // this.echarts = new Echarts();
        // this.echarts.radarChart(this.$el.find(".radar_echart")[0], myArray);
    },
    /**
   * 渲染基本地图
   */
    fnRenderMap() {
        var _this = this;
        var mapBoxView = new MapBoxGl();
        this.$el.find('.map').empty();
        this.$el.find('.map').append(mapBoxView.render());
        var isNeedZoom = this.fnIsNeedZoom();
        this.$api.getMapGeojson(_this.adCode, isNeedZoom, (res) => {
            mapBoxView.setCenter(res, isNeedZoom,()=>{
                this.fnGetMapGeoJson(mapBoxView);
            })
        }, mapBoxView.loading);
    },
    fnGetMapGeoJson(mapBoxView) {
        var _this = this
        var acc = this.adCode + '_full'
        if(this.fnIsNeedZoom()== 2){
            acc = this.adCode
        }
        this.$api.getMapGeojson(acc, this.dep, (res) => {
            mapBoxView.renderMapView(res);
            this.fnRenderColorMap(mapBoxView, res);
        }, mapBoxView.loading);
        if (_this.autoPlay) {
            _this.nextPlay = true;
        }
    },
    /**
     * 市级默认无法自动缩放到最大，所以需要进行判断是否为市级
     */
    fnIsNeedZoom() {
        if ((this.adCode.charAt(2) == '0' && this.adCode.charAt(3) == '0') &&
            (this.adCode.charAt(4) == '0' && this.adCode.charAt(5) == '0')) { //adCode，第5,6位为0，则说明不是县级，3,4其中一个不为0，则为市级，例如：230100
            return 0;
        }
        if ((this.adCode.charAt(2) != '0' || this.adCode.charAt(3) != '0') &&
            (this.adCode.charAt(4) == '0' && this.adCode.charAt(5) == '0')) { //adCode，第5,6位为0，则说明不是县级，3,4其中一个不为0，则为市级，例如：230100
            return 1;
        }
        return 2;
    },
    /**
     * 根据指标，渲染带颜色的地图
     */
    fnRenderColorMap(mapBoxView, mapData) {
        var _this = this;
        var areas = [];
        mapData.forEach(element => {
            areas.push(element);
        });
        this.$api.assessmentMap({
            adCode: _this.adCode,
            year: _this.year,
        }, function (res) {
            if (res.code == 0) {
                mapBoxView.addColorLayer(_this.fnBuildColorLayerParam(res.data, areas), {
                    isShowPopup: true,
                    type : 'evaluation',
                    popupKey: 'weightGrade',
                    areaNameKey : 'areaName'
                });
                _this.fnRenderRankingList(res.data);//渲染排行榜
            }
        });
    },
    /**
     * 渲染排行榜
     * @param {*} data 
     */
    fnRenderRankingList(data) {
        var list = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            list.push({
                index: i + 1,
                areaName: item.areaName,
                weightGrade: item.weightGrade
            });
        }
        var rankingListViews = new RankingListView({
            data: list,
            forStructure: [{ key: 'index', value: 'index' }, { key: 'areaName', value: 'name' }, { key: 'weightGrade', value: 'number' }]
        })
        this.$el.find('#ranking_list').empty();
        this.$el.find('#ranking_list').append(rankingListViews.init())
    },
    /**
     * 创建渲染颜色地图需要的数据
     * @param {根据指标id获取到的指标地区数据} colorAreas 
     * @param {地图地区数据} areas 
     */
    fnBuildColorLayerParam(colorAreas, areas) {
        for (let i = 0; i < colorAreas.length; i++) {
            var item = colorAreas[i];
            for (let j = 0; j < areas.length; j++) {
                var itemJ = areas[j];
                if (item.xzqhId == itemJ.properties.adcode) {
                    item.geoJson = itemJ.geometry;
                    item.xzbm = itemJ.properties.adcode;
                    item.id = itemJ.properties.adcode;
                    item.color = this.fnCalcColor(item.weightGrade);
                }
            }
        }
        return colorAreas;
    },
    // fnCalcColor(value) {
    //     if (value < 60) {
    //         return '#ff8848';
    //     } else if (value >= 60 && value < 80) {
    //         return '#fcfcd4';
    //     } else {
    //         return '#c2e5e5';
    //     }
    // },
    fnCalcColor(value) {
        if (value < 60) {
            return 'rgba(255,136,72,1)';
        } else if (value >= 60 && value < 80) {
            return 'rgba(252,252,212,1)';
        } else {
            return 'rgba(194,229,229,1)';
        }
    },
    wavesurRecord(percent) {
        //获取画布
        var beisizer = document.getElementById("wave");
        var ContenofBeisizer = beisizer.getContext("2d");
        //设置波浪海域（海浪宽度，高度）
        var beisizerwidth = beisizer.width;
        var beisizerheight = beisizer.height;
        var beisizerlinewidth = 2;
        //曲线
        var sinX = 0;
        var sinY = beisizerheight*(1-percent) - beisizerheight / 15.0;
        //轴长
        var axisLenght = beisizerwidth;
        //弧度宽度
        var waveWidth = 0.024;
        //海浪高度
        var waveHeight = beisizerheight / 15.0;
        var speed = 0.1;
        //数值越大速率越快
        var xofspeed = 0;
        //波浪横向的偏移量
        var rand = beisizerheight;
        //波浪高度
        ContenofBeisizer.lineWidth = beisizerlinewidth;
        // 创建静态的曲线
        var drawSin = function(xofspeed) {
            ContenofBeisizer.save();
            //存放贝塞尔曲线的各个点
            var points = [];
            ContenofBeisizer.beginPath();
            //创建贝塞尔点
            for (var x = sinX; x < sinX + axisLenght; x += 80 / axisLenght) {
                // var y = -Math.sin((sinX + x) * waveWidth);  //测试请解开注释，注释下一行
                var y = -Math.sin((sinX + x) * waveWidth + xofspeed);
                // points.push([x, sinY + y * waveHeight]); //测试请解开注释，注释下一行
                points.push([x, rand + y * waveHeight]);
                ContenofBeisizer.lineTo(x, sinY + y * waveHeight);
                //测试请解开注释，注释下一行
                // ContenofBeisizer.lineTo(x, rand + y * waveHeight);
            }
            ContenofBeisizer.lineTo(axisLenght, beisizerheight);
            ContenofBeisizer.lineTo(sinX, beisizerheight);
            ContenofBeisizer.lineTo(points[0][0], points[0][1]);
            ContenofBeisizer.stroke();
            ContenofBeisizer.restore();
            //贝塞尔曲线样式设置
            ContenofBeisizer.strokeStyle = "#3bc777";
            ContenofBeisizer.fillStyle = "#3bc777";
            ContenofBeisizer.fill();
        };
        var rendY = function() {
            ContenofBeisizer.clearRect(0, 0, beisizerwidth, beisizerheight);
            //控制海浪高度
            var tmp = 0.1;
            rand -= tmp;
            var b = beisizerheight - rand;
            //控制循环涨潮
            if (parseInt(b) == beisizerheight) {
                rand = beisizerheight;
            }
            drawSin(xofspeed);
            xofspeed += speed;
            requestAnimationFrame(rendY);
        };
        // 动态
        drawSin();
        rendY();
    },
    destroyed: function () { },
};