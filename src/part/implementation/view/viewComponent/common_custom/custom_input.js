
import districtLinkage from '../../../../../common/districtLinkage'
var CustomForm = function(options){
    this.html = $('<div id="custom_input" class="custom_input"><div>')
    this._linkage = new districtLinkage(this.html);
    this._linkage.setUserData(["230400", "231000", '230000']);
    this._linkage.onChange(function (data) {
        console.log(11)
    });
}

CustomForm.prototype.set = function(data){
    
}

CustomForm.prototype.get = function(cb,ignore){
    callback(emsg,value);
}

export default CustomForm