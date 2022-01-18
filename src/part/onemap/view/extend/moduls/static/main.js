import statisConfig from './static'

export default {
    render(){
        var that = this;

        var StatisConfig = null;
        this.$api.getAllStatis(function(res) {
            StatisConfig = new statisConfig(that.$el, res.data);
        })

        // 表格全局数据处理
        this.$store = new $store.dtTable(); // 初始化公共数据存放，包含相关方法。一般用于调用方法；
        this.$states = this.$store.$state; // 方便调用;一般用于获取属性值；


        StatisConfig.on('staticCilik', function(data) {
            that.$data.statisData = data;
            var values = icu.session.get("userInfo").mapAreaCodeList;
            that.$api.getDictList({
                type: 'XZQY',
                value: values
            }, function (res) {
                StatisConfig.statisRange(res.data,values)
            });

        })

        StatisConfig.on('statisTable', function(adcode, range) {
            that.$api.getStatisView(that.$data.statisData.id, adcode, (res)=> {
                // 处理表头
                if(res.code == 200) {
                    that.$store.setData('data', res.data);
                    that.$store.handelHeaderData();
                    that.$store.groupTree();
                    that.$store.mainTreeDataHandel()
                    that.$store.handelCountMain();

                    top.onemapDialog({
                        title: that.$data.statisData.statisName,
                        top: '70px',
                        width: '1150px',
                        height: '600px',
                        showClose: true,
                        params : {
                            range: range,
                            statisData: that.$data.statisData,
                            adcode: adcode,
                            table: {
                                tier: that.$states.data.tier,
                                store: that.$store,
                                state: that.$states,
                            },
                        },
                        path: '/staticDetail/detail',
                        onClose: function () {

                        },
                    });
                }else {
                    layer.msg("请检查后台配置")
                }
                
            })
        })

        // StatisConfig.on('chartSelect', function(data, chartTitle, type){
        //     that.$api.chartSelect(data, (res)=> {
        //         StatisConfig.charts(res, chartTitle, type)
        //     })
        // })

    },
    destory(){}
}
