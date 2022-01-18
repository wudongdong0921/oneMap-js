import CustomDst from '../../../../../common/customForm_districtLinkage'
var SelectXZ = function(){
    var _this = this;
    this._form = icu.templateForm({
        labelwidth: 90,
    });
    this.event = {
        rightAdministrativeDivision: function () { },
    };
    console.log(CustomDst)
    // 2021-05-14 陈薪名 修改 添加setTimeout是因为选择行政区划下拉框远离父类框需加载延迟
    setTimeout(() => {
        this._form.$setOptions([
            [{
                key: 'rightAdministrativeDivision',
                formlabel: '行政区划',
                col: 12,
                getKey: 'dictValue',
                object: CustomDst,
                onChange: function (value) {
                    changeValueEvent('rightAdministrativeDivision');
                },
            }]
        ]); 
    },400);
    
    var changeValueEvent = (type) => {
        _this._form.get((value) => {
            switch (type) {
                case 'rightAdministrativeDivision':
                    _this.event.rightAdministrativeDivision(type, value);
                    break;
                default:
                    break;
            };
        });
    };
    // this._form.set({
    //     rightAdministrativeDivision: ["230400", "231000", '230000']
    // });
}

SelectXZ.prototype.on = function (str, event) {
    this.event[str] = event;
}
export default SelectXZ