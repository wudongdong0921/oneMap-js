// import printPdf from "mapbox-print-pdf"
import printPdf from "../../../../../../../public/static/pdf/js/mapbox-print-pdf"
var MapPrint = function () {
    var formatFull = [{
        value: 'a5',
        label: 'A5'
    }, {
        value: 'a4',
        label: 'A4'
    }, {
        value: 'a3',
        label: 'A3'
    }, {
        value: 'a2',
        label: 'A2'
    }, {
        value: 'a1',
        label: 'A1'
    }, {
        value: 'a0',
        label: 'A0'
    }, {
        value: 'Legal',
        label: 'Legal'
    }, {
        value: 'Letter',
        label: 'Letter'
    }, {
        value: 'Tabloid',
        label: 'Tabloid'
    }]
    var direction = [{
            value: 'transverse',
            label: '横向'
        },
        {
            value: 'longitudinal',
            label: '纵向'
        }
    ]
    var scales = [{
            value: 'metric',
            label: '米'
        },
        {
            value: 'imperial',
            label: '公制' //度
        },
        {
            value: 'nautical',
            label: '海制'
        }
    ]
    var _this = this
    var print = ''
    print += '<div id="webPnfMap">';
    print += '<form id="printForm" class="sidebar-config-wrap" role="form">';
    print += '  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
    print += '      <div class="panel panel-default">';
    print += '          <div class="panel-heading" role="tab" id="headingOne">';
    print += '              <h4 class="panel-title">';
    print += '                  <a role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapseOne">';
    print += '                      <span data-i18n="resources.text_baseInfo">基本信息</span>';
    print += '                      <span class="glyphicon glyphicon-chevron-down" aria-hidden="true">22</span>';
    print += '                      <span class="glyphicon glyphicon-chevron-up" aria-hidden="true">></span>';
    print += '                  </a>';
    print += '               </h4>';
    print += '           </div>';
    print += '           <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">';
    print += '                 <div class="panel-body">';
    print += '                      <div class="form-group">';
    print += '                          <label for="templateName" data-i18n="resources.text_layoutTemplates">纸张</label>';
    print += '                          <select class="form-control" id="templateName"></select>';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="title" data-i18n="resources.text_title">标题</label>';
    print += '                          <input autocomplete="off" type="text" class="form-control" id="title" data-i18n="[value]resources.title_mvtVectorLayer_mapboxStyle_landuse" />';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="subTitle" data-i18n="resources.text_subTitle">副标题</label>';
    print += '                          <input autocomplete="off" type="text" class="form-control" id="subTitle" />';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="copyright" data-i18n="resources.text_copyRightInfo">版权信息</label>';
    print += '                          <input autocomplete="off" type="text" class="form-control" id="copyright" />';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="author" data-i18n="resources.text_author">作者</label>';
    print += '                          <input autocomplete="off" type="text" class="form-control" id="author" value="" />';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="direction">布局</label>';
    print += '                          <select class="form-control" id="direction"></select>';
    print += '                      </div>';
    print += '                  </div>';
    print += '              </div>';
    print += '          </div>';
    // print += '          <div class="panel panel-default">';
    // print += '              <div class="panel-heading" role="tab" id="headingThree">';
    // print += '                  <h4 class="panel-title">';
    // print += '                      <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="collapseThree">';
    // print += '                          <span data-i18n="resources.text_littleMap">附图</span>';
    // print += '                          <span class="glyphicon glyphicon-chevron-down" aria-hidden="true">></span>';
    // print += '                          <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>';
    // print += '                      </a>';
    // print += '                  </h4>';
    // print += '              </div>';
    // print += '              <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">';
    // print += '                  <div class="panel-body">';
    // print += '                      <div class="form-group">';
    // print += '                          <label for="scale" data-i18n="resources.text_scale">比例尺</label>';
    // print += '                          <input type="text" class="form-control" id="scale" value="0" />';
    // print += '                      </div>';
    // print += '                      <div class="form-group">';
    // print += '                          <label for="center" data-i18n="resources.text_center">中心点</label>';
    // print += '                          <input type="text" class="form-control" id="center" data-i18n="[title]resources.text_centerTip" />';
    // print += '                      </div>';
    // print += '                  </div>';
    // print += '              </div>';
    // print += '          </div>';
    print += '          <div class="panel panel-default">';
    print += '              <div class="panel-heading" role="tab" id="scaleOptions">';
    print += '                  <h4 class="panel-title">';
    print += '                      <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="collapseFour">';
    print += '                          <span data-i18n="resources.text_scale">比例尺</span>';
    print += '                          <span class="glyphicon glyphicon-chevron-down" aria-hidden="true">></span>';
    print += '                          <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>';
    print += '                      </a>';
    print += '                  </h4>';
    print += '              </div>';
    print += '              <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="scaleOptions">';
    print += '                  <div class="panel-body">';
    // print += '                      <div class="form-group">';
    // print += '                          <label for="scaleText" data-i18n="resources.text_scaleText">比例尺文本</label>';
    // print += '                          <input type="text" class="form-control" id="scaleText" />';
    // print += '                      </div>';
    // print += '                      <div class="form-group">';
    // print += '                          <label for="type" data-i18n="resources.text_style">样式</label>';
    // print += '                          <select class="form-control" id="type">';
    // print += '                              <option value="LINE">line</option>';
    // print += '                              <option value="BAR" selected>bar</option>';
    // print += '                              <option value="BAR_SUB">bar_sub</option>';
    // print += '                          </select>';
    // print += '                      </div>';
    // print += '                      <div class="form-group">';
    // print += '                          <label for="intervals" data-i18n="resources.text_intervals">段数</label>';
    // print += '                          <input type="number" value="6" class="form-control" id="intervals" />';
    // print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="unit" data-i18n="resources.text_unit">单位</label>';
    print += '                          <select class="form-control" id="unit">';
    print += '                          </select>';
    print += '                      </div>';
    print += '                  </div>';
    print += '              </div>';
    print += '          </div>';
    print += '          <div class="panel panel-default">';
    print += '              <div class="panel-heading" role="tab" id="exportOptions">';
    print += '                  <h4 class="panel-title">';
    print += '                      <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="collapseFive">';
    print += '                          <span data-i18n="resources.text_exportOptions">导出选项</span>';
    print += '                          <span class="glyphicon glyphicon-chevron-down" aria-hidden="true">></span>';
    print += '                          <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>';
    print += '                      </a>';
    print += '                  </h4>';
    print += '              </div>';
    print += '              <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="exportOptions">';
    print += '                  <div class="panel-body">';
    print += '                      <div class="form-group">';
    print += '                          <label for="format" data-i18n="resources.text_format">格式</label>';
    print += '                          <select class="form-control" id="format">';
    print += '                              <option value="PDF">PDF</option>';
    // print += '                              <option value="PNG">PNG</option>';
    print += '                          </select>';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="dpi">DPI</label>';
    print += '                          <input type="text" class="form-control" id="dpi" value="96" />';
    print += '                      </div>';
    print += '                      <div class="form-group">';
    print += '                          <label for="exportScale" data-i18n="resources.text_scale">比例尺</label>';
    print += '                          <input type="text" class="form-control" id="exportScale" value="0" />';
    print += '                      </div>';
    print += '                  </div>';
    print += '              </div>';
    print += '          </div>';
    print += '      </div>';
    print += '      <div class="submit-btn-wrap">';
    print += '          <button type="submit" class="btn btn-primary" id="printBtn" data-i18n="resources.text_print">打印</button>';
    print += '          <div class="btn btn-primary" id="printBtning" data-i18n="resources.text_print">打印中</div>';
    print += '          <div  class="btn btn-primary" id="printCloseBtn" data-i18n="resources.text_print">关闭</div>';
    print += '          <div class="progress">';
    print += '              <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">printing...</div>';
    print += '          </div>';
    print += '      </div>';
    print += '</form>';
    print += '</div>';
    this.event = {
        closeEvent: function() {}
    }
    this.html = $(print)
    this.html.hide()
    formatFull.forEach(item => {
        this.html.find('#templateName').append(`<option value=${item.value}>${item.label}</option}`)
    })
    direction.forEach(item => {
        this.html.find('#direction').append(`<option value=${item.value}>${item.label}</option}`)
    })
    scales.forEach(item => {
        this.html.find('#unit').append(`<option value=${item.value}>${item.label}</option}`)
    })
    this.html.find('#printForm').on('click', '.panel-heading', function () {
        var next = $(this).next();
        $(this).next().slideToggle("slow")
        _this.html.find('.panel-collapse').not(next).slideUp();
    })
    this.html.find('#printBtning').hide();
    this.html.find('#printBtn').on('click', function (e) {
        _this.printMap(e)
       _this.clearInputVal()
    });
    this.html.find('#printCloseBtn').on('click', function(e) {
        _this.event.closeEvent()
        _this.clearInputVal()
    })
}
MapPrint.prototype.clearInputVal = function() {
    this.html.find('#title').val(""); //标题
    this.html.find('#subTitle').val(""); //副标题
    this.html.find('#copyright').val(""); //版权信息
    this.html.find('#author').val(""); //作者
}
MapPrint.prototype.closePrint = function (event) {
     this.event.closeEvent = event
}
MapPrint.prototype.printMap = function (e) {
    console.log(printPdf)
    var _this = this
    e.preventDefault();
    this.html.find('#printBtn').hide();
    this.html.find("#printBtning").show();
    var builder = printPdf.build()
    var formatVal = this.html.find('#templateName').val();//纸张
    var dpiVal = this.html.find('#dpi').val();//dpi
    var direction = this.html.find('#direction').val(); //布局
    var headerTitle = this.html.find('#title').val(); //标题
    var subTitle = this.html.find('#subTitle').val(); //副标题
    var footerText = this.html.find('#copyright').val(); //版权信息
    var author = this.html.find('#author').val(); //作者
    var scale = this.html.find('#unit').val(); //单位
    var scalwNumber = this.html.find('#exportScale').val(); //比例尺
    var directionLine = 'p'
    // var intervals = this.html.find('#intervals').val(); //段数
    // var maxWidth = parseInt(intervals);
    // if (isNaN(maxWidth) || maxWidth <= 0) return;
    //纸张
    builder.format(formatVal)
    builder.portrait()
    //dpi
    builder.dpi(dpiVal)
    //横纵向
    if (direction === 'transverse') {
        builder.landscape()
        directionLine = 'l'
    } else {
        builder.portrait()
        directionLine = 'p'
    }
    builder.scale({
        //maxWidthPercent: maxWidth,
        unit: scale
    })
    //标题
    builder.header({
        html: '<div class="header-title"><p data-scale-sum="font-size" class="header_main">' + headerTitle + '</p><p class="header_vice">' + subTitle + '</p></div>',
        baseline: {
            format: formatVal,
            orientation: directionLine
        }
    })
    builder.footer({
        html: '<div class="footer-text"><p data-scale-sum="font-size">' + footerText + '</p><p>' + author + '</p><p>'+"1:" + scalwNumber + '</p></div>',
        baseline: {
            format: formatVal,
            orientation: directionLine
        }
    },function(elem) {
        elem.removeAttribute("id");
      })
    builder.margins({
        top: 6,
        right: 3,
        left: 3,
        bottom: 6
    }, "mm")
    builder.print(this.map.map, mapboxgl).then(function (pdf) {
        console.log(pdf)
        _this.html.find('#printBtn').show();
        _this.html.find('#printBtning').hide();
        pdf.save('map.pdf');
    });
}
MapPrint.prototype.getPrintPdfMap = function (map,ButtonBar) {
    this.map = map
    this.ButtonBar = ButtonBar
}
MapPrint.prototype.getScaleValue = function(value) {
    this.html.find('#exportScale').val(value)
}
//"mapbox-print-pdf": "https://github.com/SuperMap/mapbox-print-pdf#enhance",
export default MapPrint