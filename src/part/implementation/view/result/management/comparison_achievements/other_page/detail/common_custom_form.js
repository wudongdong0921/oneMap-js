var CustomForm = function(options){
    this.html = $('<div id='+options.key+'><input spellcheck="false" autocomplete="off" type="text" class="form-control" placeholder="- 请选择 -" disabled="disabled"><div>')
}

CustomForm.prototype.set = function(data){}

CustomForm.prototype.get = function(cb,ignore){
    callback(emsg,value);
}

export default CustomForm
