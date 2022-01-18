////////////////////////////////////////////////
// 属性查询
//AttributeQuery
// 吴东东
// 2021-05-12 11:08:13
////////////////////////////////////////////////
import api from './../../apis/business'
import BlockListy from './BlockList'
var AttributeQuery = function(obj) {
    this._Map = obj._Map
    this.html = $('<div class="attributeQuery-wrapper"></div>')
    this.attributeBox = $('<div class="attributeQuery-box"></div>').appendTo(this.html)
    //this.refreshAttribute(obj)
}
AttributeQuery.prototype.refreshAttribute = function(obj) {
    this.attributeBox.empty()
    this.attributeSelect = $('<div class="attributeSelect-box"></div>').appendTo(this.attributeBox)
    this.attributeContent = $('<div class="attributeContent-box"></div>').appendTo(this.attributeBox)
    this.buttonBox = $('<div class="attributeQuery-button-wrapper"></div>').appendTo(this.attributeBox)
    this.queryBtn = $('<button type="button" class="wdd-btn wdd-btn-primary business_btn wdd-btn-sm" style="width:80px; margin-top:-10px;" id="attributeQueryBtn">查询</button>').appendTo(this.buttonBox)
    this.resetBtn = $('<button type="button" class="wdd-btn wdd-btn-primary business_btn wdd-btn-sm" style="width:80px; margin-top:-10px;" id="attributeResetBtnBtn">重置</button>').appendTo(this.buttonBox)
    this.setSelectResher()
    var _BlockListy = new BlockListy(obj._Map)
    
    this.queryBtn.click(() => {
        this._formContent.get((data) => {
            const obj = {
                sxcxId: this.sxcxId,
                searchData:data,
                api: "getPropertySearchPlot"
            }
           
            this.attributeBox.empty()
            _BlockListy.refreshBlockData(obj)
            this.attributeBox.append(_BlockListy.html)
            
        })
    })
    this.resetBtn.click(() => {
        this._formContent.set(this.formListKey)
    })
    _BlockListy.getEventClear(() => {
        this.attributeBox.empty()
        this._Map.removeCreateMap()
        this.refreshAttribute(obj)
    })
}
AttributeQuery.prototype.setSelectResher = function() {
    this.getBusinessSelect(() => {
        this.select.get((emsg,value)=>{
            this.sxcxId = value
            this.businessSetForm(value)
        })
        this.select.onChange((value) => {
            this.sxcxId = value
            this.businessSetForm(value)
        })
    })
}
AttributeQuery.prototype.getBusinessSelect = function(callback) {
    api.selectBusiness(res => {
        var list = res.data
        this.attributeSelect.empty()
        this.select = new icu.formElement.select({
            checkAll: false, // 是否显示全选
            getType: 'array',
            // 进行赋值的数组
            data: list,
            default: list[0].value
        });
        this.attributeSelect.append(this.select.html)
        const items = this.select.html.find('.form_select_option')
        for(let i =0;i<items.length;i++) {
            $(items[i]).attr('title',$(items[i]).html())    // HGPTGCH-153
            // $(items[i]).webuiPopover({
            //     style: 'inverse',
            //     trigger: 'hover',
            //     placement: 'bottom-right',
            //     autoHide:1000
            // })
        }
        
        callback && callback()
    })
}
const formList = function(sxcxId) {
    return new Promise((resolve,reject) => {
        api.getSearchField(sxcxId,res => {
            if(res.code === 200) {
                resolve(res)
            }
        })
    })
}
AttributeQuery.prototype.reshBusinessForm = function(data) {
    var list = []
    var objKey = {}
    data.forEach(item => {
        list.push({
            key:item.searchField,
            type: 'input',
            col: 12,
            placeholder: '请输入' + item.searchFieldName,
            formlabel: item.searchFieldName
        })
        objKey[item.searchField] = ""
    })
    return {
        list: list,
        objKey: objKey
    }
}
AttributeQuery.prototype.businessSetForm = function(sxcxId) {
    formList(sxcxId).then(res => {
        const obj = this.reshBusinessForm(res.data)
        this.formListKey = obj.objKey
        this.attributeContent.empty()
    this._formContent = new icu.templateForm({
        labelwidth: 0, // labelwidth 整体控制表单前方元素宽度
    });
    this._formContent.$setOptions(
        [obj.list]
    );
    if(obj.list.length > 0){
        this.attributeContent.append(this._formContent.$html)
    }else {
        this.attributeContent.append('<div class="attribute-more">暂无数据</div>')
    }
    
    })
    
}
export default AttributeQuery