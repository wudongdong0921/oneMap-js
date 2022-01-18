
import customForm_districtLinkage from '../../../../../../../../common/customForm_districtLinkage'
import districtLinkage from '../../../../../../../../common/districtLinkage'

// import 

var formEvent = function (taget) {



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
        }, 
        {
            key: 'rightAdministrativeDivision',
            formlabel: '行政区划',
            col: 6,
            getKey: 'dictValue',
            object: customForm_districtLinkage,
            onChange: function (value) {
                changeValueEvent('rightAdministrativeDivision');
            },
        }
    ]
    ]);
    this.event = {
        onPlanningResultCodeChange: function () {},
        rightAdministrativeDivision: function (type, value) {},
    };
    var userData = icu.session.get('userInfo');
    var changeValueEvent = (type) => {
        _form.get((value) => {
            switch (type) {
                case 'planningResultCode':
                    this.event.onPlanningResultCodeChange(type, value);
                    break;
                case 'rightAdministrativeDivision':
                    this.event.rightAdministrativeDivision(type, value);
                    break;
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