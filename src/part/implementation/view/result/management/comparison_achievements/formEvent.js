
import customForm_districtLinkage from '../../../../../../common/customForm_districtLinkage'
import checkFile from './select_juris_diction'
import selectTreeE from "../../../../../../../public/static/libs/zTree/selectTreeE";

var formEvent = function () {

    var _this = this;
    var selectId = 'select_' + Math.floor(Math.random() * 11);
    var _form = icu.templateForm({
        labelwidth: 110,
    });
    _form.$setOptions([
        [{
            key: 'planningResultCode',
            type: 'select',
            formlabel: '规划成果类型',
            col: 6,
            data: [],
            showKey: 'label',
            setKey: 'value',
            getKey: 'object',
            onChange: function (value) {
                _form.rightAdministrativeDivision.reset();
                changeValueEvent('planningResultCode');
            },
        }, {
            key: 'rightAdministrativeDivision',
            formlabel: '行政区划',
            col: 6,
            getKey: 'dictValue',
            object: customForm_districtLinkage,
            onChange: function (value) {
                changeValueEvent('rightAdministrativeDivision');
            },
        }], [{
            key: 'mc',
            type: 'select',
            formlabel: '规划成果名称',
            col: 12,
            data: [],
            showKey: 'planningResultName',
            setKey: 'planningResultId',
            getKey: 'object',
            onChange: function (value) {
                // console.log(value.cgfjxxbId);
                changeValueEvent('mc');
            },
        }], [{
            key: 'checkFile',
            formlabel: '选中文件',
            col: 12,
            object: checkFile,
        },]
    ]);

    this.event = {
        onPlanningResultCodeChange: function () { },
        rightAdministrativeDivision: function () { },
        mc: function () { },
        //checkFile: function () { },
    };
    var userData = icu.session.get('userInfo');
    var changeValueEvent = (type) => {
        _form.get((value) => {
            console.log(value);
            switch (type) {
                case 'planningResultCode':
                    _form.mc.clear();
                    //_form.checkFile.clear();
                    this.event.onPlanningResultCodeChange(type, value);
                    break;
                case 'rightAdministrativeDivision':
                    //行政规划改变
                    _form.mc.clear();
                    //_form.checkFile.clear();
                    this.event.rightAdministrativeDivision(type, value);
                    break;
                case 'mc':
                    this.event.mc(type, value);
                    break;
                // case 'checkFile':
                //     this.event.checkFile(type, value);
                //     break;
                default:
                    break;
            };
        });
    };

    // _form.set({
    //     rightAdministrativeDivision: userData.areacodeList
    // });
    this.form = _form;
};
formEvent.prototype.on = function (str, event) {
    this.event[str] = event;
}


export default formEvent;