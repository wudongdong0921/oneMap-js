
import Select from '../../../component/select'
import SuitabillityMain from './suitabillityMain'
var Suitabillity = function (_Map, _MapSymbol, analyses,view) {
    console.log(_Map)
    var _this = this;
    this.views = view;
    var _html = '<div>' +
        '    <div style="padding: 20px 20px 0px 1px;z-index: 9999;" id="selectContent"></div>' +
        '    <div id="ListContent"></div>' +
        '</div>';
    this.html = $(_html);
    // this._select = new Select();
    this.suitabillityMain = new SuitabillityMain(_Map, _MapSymbol, analyses,this.views);
    this.event = {}
    this.html.find('#ListContent').append(this.suitabillityMain.render())
    // this.html.find('#selectContent').append(this._select._form.$html)
    // this.suitabillityMain.on('resultStatic', function () {
    //     implementationDialog({
    //         top: '20%',
    //         left: '40%',
    //         width: '55%',
    //         height: '66%',
    //         path: '/planning/component/staticAnalyse',
    //         params: {},
    //         title: '分析控制台',
    //         events: {
    //             warchResult: function () {
    //                 analyses.show()
    //                 analyses.changeLeftView(true);
    //                 // _this.closeEvent()
    //             }
    //         },
    //         onClose: function () { },
    //     });
    // })
};
Suitabillity.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};
Suitabillity.prototype.render = function () {
    return this.html
};
export default Suitabillity;
