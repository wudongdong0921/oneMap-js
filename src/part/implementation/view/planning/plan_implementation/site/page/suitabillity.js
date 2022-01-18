
import Select from '../../../component/select'
import SuitabillityMain from './suitabillityMain'
var Suitabillity = function (_Map, _MapSymbol, analyses, view) {
    var _this = this;
    this.views = view;
    this.views.analyses = analyses
    var _html = '<div>' +
        '    <div style="padding: 20px 20px 0px 1px;z-index: 9999;" id="selectContent"></div>' +
        '    <div id="ListContent"></div>' +
        '</div>';
    this.html = $(_html);
    icu.session.set('typeMap', 'oneMap')
    this._select = new Select();
    this.suitabillityMain = new SuitabillityMain({
        _Map:_Map,
        _MapSymbol:_MapSymbol
    }, this.views);
    this.event = {}
    this.html.find('#ListContent').append(this.suitabillityMain.render())
    this.html.find('#selectContent').append(this._select._form.$html)
    this._select.on('rightAdministrativeDivision', (type, value) => {
        _this.acode = value.rightAdministrativeDivision
        _Map.map.handlePermisMapFull(value.rightAdministrativeDivision)
    })
    this.suitabillityMain.on('resultStatic', function (getResult, cb) {
        implementationDialog({
            top: '20%',
            left: '40%',
            width: '30%',
            height: '50%',
            path: '/planning/component/staticAnalyse',
            params: {
                getResult: getResult,
                acode: _this.acode
            },
            title: '分析控制台',
            events: {
                warchResult: function (showData) {
                    _this.views.showDatas = showData
                    analyses.show(showData,_this.suitabillityMain)
                    analyses.changeLeftView(true);
                    // _this.suitabillityMain.renderMap()
                    cb(showData.status)
                }
            },
            onClose: function (e) {
            },
        });
    })
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
