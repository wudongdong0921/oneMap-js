////////////////////////////////////////////////
// 监测值走势
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////
import echOption from './option/echartsOption'
import Echart from '../../../../../../common/echart'
export default {
  render() {
    let _this = this
    var els = _this.$el.find('#polyline')[0];
    var indexMonitorList = this.$data.indexMonitorList;
    var title = this.$data.title;
    var dw = this.$data.dw;
    var xData = [];
    var seriesData = [];
    var unitCodeArray = [];
    indexMonitorList.forEach(element => {
      xData.push(element.dataOfScore);
      unitCodeArray.push(element.unitCode == null ? '' : element.unitCode)
      seriesData.push(element.monitoringValue);
    });
    var data = {
      xData: xData,
      seriesData: seriesData,
      unitCodeArray:unitCodeArray
    }
    var echartView = new Echart({
      option: echOption(data,title,dw),
      el: els
    })
  },
  destroyed() {

  },
}