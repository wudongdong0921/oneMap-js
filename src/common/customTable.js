
import Util from './optionConfig/customTable/configData'
var CustomTable = function (options) {
    var _this = this;
    this.options = $.extend({}, {
        view:'',
        elem: '#table',
        title: 'xxx年xxx地区土地资源评价详情',
        toolbar: '<div>xxx年xxx地区土地资源评价详情</div>',
        defaultToolbar: ['exports'],
        table:table
    }, options)
}
CustomTable.prototype.init = function (data) {
    var _this = this;
    var allData = Util.handelData(data)
    // console.log(JSON.stringify(allData,null,2));
    
    this.options.view.find(_this.options.elem).empty()
    _this.options.table.render({
        elem: _this.options.elem,
        title: _this.options.title,
        toolbar: _this.options.toolbar,
        defaultToolbar: _this.options.defaultToolbar,
        url: '',
        even: true,
        page: false, //开启分页
        cols: [allData.header, allData.bottom],
        data: allData.data
    });
    _this.options.table.reload({
        data: allData.data
    });
}
CustomTable.prototype.colRowSpan = function () { }
export default CustomTable;