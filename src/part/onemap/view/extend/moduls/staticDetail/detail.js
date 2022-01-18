import staticDetail from './staticDetail'

export default {
    render(){
        var that = this;

        var StaticDetail = new staticDetail(this.$el.find('#detail'), this.$data);
        var StaticChart = null;

        StaticDetail.on('download', function() {
            const data = {
                id: that.$data.statisData.id,
                adcode: that.$data.adcode
            }
            that.$api.download(data)
        })

        StaticDetail.on('chartSelect', function(chartData) {
            const data = {
                id: that.$data.statisData.id,
                adcode: that.$data.adcode,
                type: chartData.type,
                pid: chartData.pid
            }
            that.$api.chartSelect(data, (res)=> {
                top.onemapDialog({
                    title: chartData.value + '统计图',
                    top: '20%',
                    width: '600px',
                    height: '480px',
                    showClose: true,
                    params : {
                        data: data,
                        res: res,
                        statisData: that.$data.statisData
                    },
                    path: '/staticDetail/component/chartDialog',
                    onClose: function () {
                        
                    },
                });

            })
        })
    },
    destory(){}
}