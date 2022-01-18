import paging from './../paging'
import api from "./../../apis/map"
var analyseConfigTable = function (data,parent) {
    this.parent = parent
    this.config = data;
    this.html = $('<div class="configObject_Table"></div>');
    var tableHtml = '';
    tableHtml += '        <div class="add-file-table" style="width:auto; margin: 0; height: 180px; ">';
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
    var showEnglishField = "account_number,special_name,rwbm_id,parsing_time,special_code,SMPERIMETER,SMAREA"
    var showChineseField = "用户,分析名称,任务编码,创建时间, 分析编码"
    this.keyArray = showEnglishField.split(',');
    this.TitleArray = showChineseField.split(',');
    this.header.append('<td>序号</td>');
    for (let i = 0; i < this.TitleArray.length; i++) {
        const element = this.TitleArray[i];
        this.header.append('<td>' + element + '</td>');
    };

    this.paging = new paging({
        data: {
            renderReady: true,
            pageInfo: {
                index: '1', // 第几页
                count: '6' // 每页多少条数据
            }
        },
        hasQuick: false, // 开启快速跳转
        ajaxEvent: (data, success) => {
            if (data.renderReady) {
                return;
            };
            //this.html.loading();
            api.getInfoTableList(data, (res) => {
                console.log(res)
               // this.html.loading();
                success({
                    totalRecord: res.data.total,
                    list: res.data.list
                });
            });
        },
        success: (result) => {
            this.renderTable(result);
        }
    });
    this.pagingBox.append(this.paging.render());
};
analyseConfigTable.prototype.refreshData = function (data) {
    // var showEnglishField = this.config.showEnglishField.split(',');
    // if (showEnglishField[showEnglishField.length - 1] == 'smarea') {
    //     showEnglishField.splice(showEnglishField.length - 1, 1)
    // };

    // if (showEnglishField[0] == 'number') {
    //     showEnglishField.splice(0, 1)
    // };
    // showEnglishField = showEnglishField.join(',');
    var _data = {
        rwbmId: data.rwbmId,
        // jibie: data.jibie,
        // layername: this.ZTConfig.sourceDataset, // 图层名称 (String) 
        // rwbmId: this.ZTConfig.rwbmId, // 任务id (String) 
        // gjpzId: this.config.gjpzId, // 高级配置id (String) 
        // id: data.id || '',  //决定看哪一层级
        // filed: this.config.showEnglishField, // 查看字段
        // dictType: this.config.groupDictionaries, // 字典类型 (String) 
        // groupField: this.config.groupEnglishField,// 分组字段
        pageInfo: {
            index: '1', // 第几页
            count: '6' // 每页多少条数据
        }
    };
    this.paging.refresh(_data);
};

analyseConfigTable.prototype.bindDBClick = function (data, ele) {
    var _this = this
    //console.log(_this.ZTConfig.rwbmId)
    ele.dblclick(function () {
        // api.getTableSimld(_this.ZTConfig.rwbmId,(res) => {
        //     console.log(res)
        // })
        _this.parent.parent._Map.addDataLayer(data);
    });
};

analyseConfigTable.prototype.renderTable = function (data) {
    this.body.empty();
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var tr = $('<tr></tr>');
        this.bindDBClick(element.SMGEOMETRY, tr);
        tr.append('<td>' + (i + 1) + '</td>');
        for (let d = 0; d < this.keyArray.length; d++) {
            // let key = this.keyArray[d].toLowerCase();
            let key = this.keyArray[d].toUpperCase();
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
export default analyseConfigTable