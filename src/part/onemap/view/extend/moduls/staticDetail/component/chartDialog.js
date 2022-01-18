import staticChart from './staticChart'
export default {
    render() {
        var that = this;
        this.$data.colorList = [];
        var chartColor = function(params) {
            for (let index = 0; index < params; index++) {
                var r = Math.floor(Math.random()*255);
                var g = Math.floor(Math.random()*255);
                var b = Math.floor(Math.random()*255);
                var color = 'rgba('+ r +','+ g +','+ b +',0.8)';
                that.$data.colorList.push(color);
            }
        }
        chartColor(this.$data.res.data.length)
        var chart = new staticChart(this.$el.find("#chart"), this.$data);
        

        chart.on('chartSelect', function (pid) {
            const data = {
                adcode: that.$data.data.adcode,
                id: that.$data.data.id,
                type: that.$data.data.type,
                pid: pid
            }
            that.$api.chartSelect(data, (res) => {
                if(res.data.length - that.$data.colorList.length > 0) {
                    let length = (res.data.length) - (that.$data.res.data.length);
                    chartColor(length)
                }
                chart.view(res, that.$data.colorList);
            })
        })
    },
    destory() {}
}