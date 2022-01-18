var progressLayout = '';

progressLayout += '        <div class="modal-content">';
progressLayout += '            <div class="add-from-file">';
progressLayout += '                <div class="add-file-content" style="position: relative;">';
progressLayout += '                    <div class="un-drag-content uploadBox" style="display:block">';
progressLayout += '                          <div style="overflow: auto;">'
progressLayout += '                                  <table cellpadding="0" cellspacing="0" style="height: auto; width:100%">';
progressLayout += '                                      <thead class="table-head" id="data_header">';
progressLayout += '                                          <tr ><td style="text-align: center;">加载中,请稍后...</td></tr>';
progressLayout += '                                      </thead>';
progressLayout += '                                  <tbody id="data_body"></tbody>';
progressLayout += '                                  </table>';
progressLayout += '                                  <div class="modal-footer modal-footer-bottom"></div>';
progressLayout += '                          </div>'                    
progressLayout += '                    </div>';
progressLayout += '                </div>';
progressLayout += '            </div>';
progressLayout += '        </div>';
var Progress = function() {
    this.scourceData = "";
    this.progress_ele = $(progressLayout)
}
Progress.prototype.create = function(ele,sty) {
    let element = document.createElement(ele)
    element
    element.style.cssText = sty
    return $(element)
}
Progress.prototype.render = function(option,timer) {
    
    // this.progress_ele.find('.modal-header #close-icon').click(() => {
    //     this.progress_ele.remove();
    //     clearInterval(timer)
    // });
    // this.progress_ele.find('.modal-footer #cancel').click(() => {
    //     this.progress_ele.remove();
    //     clearInterval(timer)
    // });
    $('body').append(this.progress_ele)
    this.scourceData = option.dataSorce
    var header = this.progress_ele.find('#data_header');
    var body = this.progress_ele.find('#data_body')
    header.empty()
    body.empty()
    var columns = []
    columns = option.columns ? option.columns : columns
    var Tr = this.create('tr')
    var Th = null
    for(let i =0;i<columns.length;i++) {
      Th = this.create('th','border-bottom: 1px solid #ddd;text-align: center;padding:4px 6px;min-width:120px')
      Th.text(columns[i].title)
      Tr.append(Th)
    }
    header.find('th').remove()
    header.append(Tr)
    //
    var body_tr = null
    var body_td = null
    if(option.dataSorce != null){
        for(let i =0;i<option.dataSorce.length;i++) {
            let source = option.dataSorce[i]
            body_tr = this.create('tr')
            body_tr.data('index',i)
            for(let j =0;j<columns.length;j++) {
                let dataIndex = columns[j].dataIndex
                body_td = this.create('td','border-bottom: solid 1px #ddd;text-align: center;padding:4px 6px;min-width:120px')
                body_td.text(source[dataIndex])
                
                body_tr.append(body_td)
            }
            
            body.append(body_tr)
        }
    }
    return this.progress_ele
}
export default Progress