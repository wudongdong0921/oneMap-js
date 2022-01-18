import paging from './../../paging'
import TABLES from './documentTables'
import _api from './../../../apis/mapInfo'
var linkDocumentTable = function (data, ZTConfig, parent,analyseTableHeaderEn,analyseTableHeaderCn) {
    this.parent = parent
    this.ZTConfig = ZTConfig;
    this.config = data;
    this.html = $('<div class="configObject_Table" style="width:100%"></div>');
    var tableHtml = '';
    tableHtml += '        <div class="add-file-table" style="width:auto; margin: 0; height: 408px; ">';
    tableHtml += '            <table cellpadding="0" cellspacing="0" style="height: auto; width:100%">';
    tableHtml += '                <thead>';
    tableHtml += '                    <tr id="data_header"></tr>';
    tableHtml += '                </thead>';
    tableHtml += '                <tbody id="data_body"></tbody>';
    tableHtml += '            </table>';
    tableHtml += '        </div>';
    this.table = $(tableHtml).appendTo(this.html);


    this.pagingBox = $('<div class="pagingBox"></div>').appendTo(this.html);


    this.header = this.table.find('#data_header');
    this.body = this.table.find('#data_body');
    this.keyArray = TABLES.en.split(',');
    this.TitleArray = TABLES.cn.split(',');
    this.event = {
        MapPdfPrewEvent: function() {}
    }
    this.renderHeader()
    this.refreshPagin()
    
};
linkDocumentTable.prototype.refreshPagin = function() {
    this.paging = new paging({
        data: {
            renderReady: true,
            pageInfo: {
                index: '1', // 第几页
                count: '10' // 每页多少条数据
            }
        },
        hasQuick: false, // 开启快速跳转

        ajaxEvent: (data, success) => {
            if (data.renderReady) {
                return;
            };
            _api.getMapInfoList(data, (res) => {
                if(res.data) {
                    success({
                        totalRecord: res.data.totalCount,
                        list: res.data.list
                    });
                }else {
                    success({
                        totalRecord: 0,
                        list: []
                    });
                    this.renderTable(res.data);
                }
            });
            //this.html.loading();

        },
        success: (result) => {
            this.tableresult = result
            this.renderTable(result);
        }
    });
    this.pagingBox.append(this.paging.render());
}
linkDocumentTable.prototype.refreshData = function (obj) {
    var _data = {
        mapId:obj.mapId,
        documentName: obj.documentName,
        pageInfo: {
            index: '1', // 第几页
            count: '10' // 每页多少条数据
        }
    };
    this.paging.refresh(_data);
    
};

linkDocumentTable.prototype.bindDBClick = function (data, ele) {
    var _this = this
    ele.on('dblclick',function() {
        _this.event.MapPdfPrewEvent(data)
    })
};
linkDocumentTable.prototype.renderHeader = function() {
    this.header.empty()
    this.header.append('<td>序号</td>');
    
    for (let i = 0; i < this.TitleArray.length; i++) {
        const element = this.TitleArray[i];
        this.header.append('<td>' + element + '</td>');
    };
}
linkDocumentTable.prototype.renderTable = function (data) {
    this.body.empty();
    this.table.find('.table-text').remove()
    if((!data && typeof(data) === 'undefined') || !data) {
        this.table.append('<div class="table-text">暂无数据</div>')
        return false
    }
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var tr = $('<tr></tr>');
        this.bindDBClick(element, tr);
        tr.append('<td>' + (i + 1) + '</td>');
        for (let d = 0; d < this.keyArray.length; d++) {
            // let key = this.keyArray[d].toLowerCase();
            let key = this.keyArray[d]
            if (element.hasOwnProperty(key)) {
                const _value = element[key];
                if (_value == null || _value == 'null') {
                    tr.append('<td>&nbsp;</td>');
                } else {
                    tr.append('<td>' + _value + '</td>');
                };
            } else {
                if (key == 'number') {
                    tr.append('<td>' + (i + 1) + '</td>');
                } else {
                    tr.append('<td>&nbsp;</td>');
                };
            }
        };
        this.body.append(tr);
    }
};

linkDocumentTable.prototype.handleMapPdfPrew = function(event){
    this.event.MapPdfPrewEvent = event
}
export default linkDocumentTable
