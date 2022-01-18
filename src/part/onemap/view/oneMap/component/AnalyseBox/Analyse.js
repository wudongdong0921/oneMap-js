////////////////////////////////////////////////
// 分析结果
// 吴东东
// 2020-11-24 19:34:45
////////////////////////////////////////////////
import paging from './../paging'
import api from "./../../apis/map"
import apiEd from './../../apis/mapEd'
import apiSd from './../../apis/mapSd'
import Select from "./../Select/select"
import AnalyseConfigTable from './ConfigTable'
import tableString from './tableConst'
var apiObj = {
    "api": api,
    "apiEd": apiEd,
    "apiSd": apiSd
}
var _api;
var _select = new Select()
var unitList = [{
        name: '平方米',
        value: '0'
    },
    {
        name: '亩',
        value: '1'
    },
    {
        name: '公顷',
        value: '2'
    }
]

var Analyse = function () {
    this.html = $('<div class="OneMap_Analyse OneMap_dialog hide"></div>');
    this.title = $('<div class="OneMap_dialog_title">分析结果</div>').appendTo(this.html);
    this.export = $('<div class="OneMap_dialog_export">导出</div>')
    this.close = $('<div class="OneMap_dialog_close"><i class="fa fa-times" aria-hidden="true"></i></div>').appendTo(this.title);
    this.body = $('<div class="OneMap_dialog_body"></div>').appendTo(this.html);
    this.analysisHeader = $('<div class="OneMap_dialog_header clearfix"></div>').appendTo(this.body)
    this.analysisContent = $('<div class="OneMap_dialog_content configObjectBox"></div>').appendTo(this.body);
    this.unitSelect = '平方米'//null
    _select.selectData({
        options: unitList
    })
    var divisor = 1;
    var retentionDigit = 4;
    this.unitValue = '㎡'
    _select.onSelectChnage((val, value) => {
        this.unitSelect = val
        if (val == '公顷') {
            this.divisor = 10000
            this.retentionDigit = 4; //保留位数
            this.unitValue = '公顷'
        } else if (val == '亩') {
            this.divisor = parseFloat(10000 / 15);
            this.retentionDigit = 2;
            this.unitValue = "亩"
        } else if (val == '平方米') {
            this.unitValue = "㎡"
            this.divisor = 1;
            this.retentionDigit = 2;
        }
        this.configObject && this.configObject.analyseTree.unitRefersh(this.configObject.analyseTree.unitResult)
        this.configObject && this.configObject.analysePai.button1.click();
        //this.configObject && this.configObject.analyseTable.renderTable(this.configObject.analyseTable.tableresult)
    })
    this.body.append(_select.selectHtml)
    this.body.append(this.export)
    this.close.click(() => {
        this.hide();
    });
    this.export.click(() => {
        let xhr = new XMLHttpRequest()
        var url = config.InterfaceAddress.AnalysisServiceTest + '/csvExportController/download'
        xhr.open('POST', url, true)
        // 这部至关重要，命令xhr返回给你的时blob(二进制大对象)类型的数据
        xhr.responseType = 'blob'
        xhr.traditional = true
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (this.status === 200) {
                var blob = this.response;
                var reader = new FileReader();
                //reader.readAsText(blob);
                reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
                reader.onload = function (e) {
                    var a = document.createElement("a"); // 转换完成，创建一个a标签用于下载
                    a.download = '分析' + ".xlsx";
                    a.href = e.target.result;
                    $("body").append(a); // 修复firefox中无法触发click
                    a.click();
                    $(a).remove();
                };
            }
        }
        xhr.send(JSON.stringify(this.arrIdList))
    })
};
//二三调
var treeItemTop = function (data,config,parent) {
    this.html = $('<div class="configObject_treeItem"></div>');
    this.selectUnit = $('<div class="configObject_treeItem_unit"></div>').appendTo(this.html)
    this.title = $('<div class="configObject_treeItem_title"></div>').appendTo(this.html);
    this.icon = $('<i class="supermapol-icons supermapol-icons-legend-unfold"></i>');
    this.name = $('<span>' + data.dictLabel + '</span>').appendTo(this.title);
    this.number = $('<span>&nbsp;&nbsp;：'+"共压占" + data.amount + "个图斑"+'</span>').appendTo(this.title);
    data.tbmj && (this.area = $('<span>&nbsp;&nbsp; 总面积：' + data.tbmj + ''+parent.parent.unitValue+' </span>').appendTo(this.title));
    data.pressureArea && (this.yZarea = $('<span>&nbsp;&nbsp; 压占面积：' + data.pressureArea + ''+parent.parent.unitValue+' </span>').appendTo(this.title));
    
}
var treeItem = function (data, config, parent) {
    this.data = data;
    this.config = config;
    this.html = $('<div class="configObject_treeItem"></div>');
    this.selectUnit = $('<div class="configObject_treeItem_unit"></div>').appendTo(this.html)
    this.title = $('<div class="configObject_treeItem_title"></div>').appendTo(this.html);
    this.icon = $('<i class="supermapol-icons supermapol-icons-legend-unfold"></i>');
    this.name = $('<span>' + data.dictLabel + '</span>');
    this.number = $('<span>&nbsp;&nbsp;：' + data.amount + "个"+'</span>');
    // this.area = $('<span>&nbsp;&nbsp; 总面积：' + data.pressureArea + '' + parent.parent.unitValue + ' </span>');
    // this.yZarea = $('<span>&nbsp;&nbsp; 压占面积：' + data.tbmj + '' + parent.parent.unitValue + ' </span>');
    // this.tkmj = $('<span>&nbsp;&nbsp; 压占面积：' + data.tkmj + ' </span>');
    //this.dictValue = $('<span>&nbsp;&nbsp; 分组字段：' + data.dictValue + ' </span>');

    if (data.jibie == '3') {
        this.icon.css({
            opacity: 0,
        });
    } else {
        this.icon.click((e) => {
            e.stopPropagation();
            e.preventDefault();
            if (this.html.hasClass('show')) {
                this.html.removeClass('show');
                this.childBox.hide();
            } else {
                this.html.addClass('show');
                this.childBox.show();
            };
        });
    };

    this.title.click(() => {
        parent.active(this);
    });

    this.childBox = $('<div class="configObject_treeItem_children"></div>').appendTo(this.html);
    data.children.length > 0 && this.title.append(this.icon);
    data.dictLabel && this.title.append(this.name);
    for (var key in data.treeShowContent) {
        if (key == 'amount') {
            data.amount && this.title.append(this.number);
        } else if (key == 'pressureArea') {
            data.pressureArea && this.title.append($('<span>&nbsp;&nbsp; '+data.treeShowContent[key]+'：' + data.pressureArea + '' + parent.parent.unitValue + ' </span>'));
        } else if(key == 'tbmj') {
            data.tbmj && this.title.append($('<span>&nbsp;&nbsp; '+data.treeShowContent[key]+'：' + data.tbmj + '' + parent.parent.unitValue + ' </span>'));
        } else if(key == 'tkmj') {
            data.tkmj && this.title.append($('<span>&nbsp;&nbsp; '+data.treeShowContent[key]+'：' + data.tkmj + ' </span>'));
        }
        // else{
        //     data.dictValue && this.title.append(this.dictValue)
        // }
    }
    // data.dictLabel && this.title.append(this.name);
    // data.amount && this.title.append(this.number);
    // data.pressureArea && this.title.append(this.area);
    this.child = [];
    for (let i = 0; i < data.children.length; i++) {
        const child = data.children[i];
        var children = new treeItem(child, config, parent, unitList);
        this.child.push(children);
        this.childBox.append(children.html);
    };

};
treeItem.prototype.unAvtive = function () {
    this.title.removeClass('active');
    for (let i = 0; i < this.child.length; i++) {
        const element = this.child[i];
        element.unAvtive();
    };
};
treeItem.prototype.active = function () {
    this.title.addClass('active');
};


var analyseTree = function (item, loadingObj, ZTConfig, parent) {
    this.parent = parent
    this.ZTConfig = ZTConfig;
    this.config = item;
    this.html = $('<div class="configObject_Tree"></div>');
    this.child = [];
    this.event = {
        changeActive: function () {},
    };
    //loadingObj.loading();

    _api.getTreeData({
        layername: this.ZTConfig.sourceDataset, // 图层名称 (String) 必填
        rwbmId: this.ZTConfig.rwbmId, // 任务id (String) 必填
        gjpzId: item.gjpzId, // 高级配置id (String) 必填
        dictType: item.groupDictionaries, // 字典类型 (String) 必填
        jibie: item.showHierarchy, // 显示级别 (String) 必填
        groupField: item.groupEnglishField,
    }, (res) => {
        this.unitResult = res
        //loadingObj.loading();
        this.unitRefersh(res)
    });
};
analyseTree.prototype.unitRefersh = function (res) {
    this.obj = []
    this.deepClone(res, this.obj)
    this.html.empty()
    var treeObj = {};
    var treeTkObj = {}
    var treeArray = [];
    var levelList = []
    var index = 0
    for (let i = 0; i < this.obj.length; i++) {
        let element = this.obj[i];
        element.children = [];
        treeObj[element.id] = element;
        //treeTkObj[element.pid] = element
        if(element.dictLabel === '田坎') {
            index ++
            this.tkPid = element.pid
            element.tk = true
            //treeTkObj[element.pid] = element
        }
    };

    
    
    this.parent.objType.type === '6' && index > 0 && this.getTkList(treeTkObj)
    for (let i = 0; i < this.obj.length; i++) {
        let item = this.obj[i];
        item.pressureArea = parseFloat(item.pressureArea / this.parent.divisor).toFixed(this.parent.retentionDigit)
        item.tbmj && (item.tbmj = parseFloat(item.tbmj / this.parent.divisor).toFixed(this.parent.retentionDigit))
        if(item.jibie == 0) {
            const treeItemTopHtml = new treeItemTop(item,this.config,this)
            this.html.append(treeItemTopHtml.html);
        }
        if(typeof(this.newTreeTkObj) !== 'undefined' && this.newTreeTkObj.hasOwnProperty(item.pid)) {
            // this.tkPid = item.pid
            item.tk = true
        }
        if (treeObj.hasOwnProperty(item.pid)) {
            let element = treeObj[item.pid];
            
            element.children.push(item);
        } else {
            treeArray.push(item);
        };
    };
    
    this.TkList = treeArray
    for (let l = 0; l < treeArray.length; l++) {
        const item = treeArray[l];
        const itemHtml = new treeItem(item, this.config, this)
        this.child.push(itemHtml);
        this.html.append(itemHtml.html);
    };
    this.child[0].title.click();
}
analyseTree.prototype.getTkList = function(treeTkObj) {
    for(let i = 0; i < this.obj.length; i++) {
        let item = this.obj[i]
        if(this.tkPid === item.id) {
            this.tkPid = item.pid
            treeTkObj[item.pid] = item
        }
        
        
       
    }
    this.newTreeTkObj = treeTkObj
    if(this.tkPid === '0') {
        return
    } else {
        this.getTkList(treeTkObj)
    }
}
analyseTree.prototype.deepClone = function (origin, target) {
    var target = target || {};
    var tostr = Object.prototype.toString; //返回toString()
    var arrStr = "[object Array]"
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== null && typeof (origin[prop]) == 'object') { //判断是引用值还是原始值
                if (tostr.call(origin[prop]) == arrStr) {
                    target[prop] = []
                } else {
                    target[prop] = {}
                }
                this.deepClone(origin[prop], target[prop])
            } else {
                target[prop] = origin[prop]
            }
        }
    }
    return target;
}
analyseTree.prototype.onChange = function (event) {
    this.event.changeActive = event;
};
analyseTree.prototype.active = function (activeChild) {
    for (let i = 0; i < this.child.length; i++) {
        const child = this.child[i];
        child.unAvtive();
    };
    if (!activeChild.title.hasClass('active')) {
        activeChild.active();
        this.event.changeActive(activeChild.data);
    } else {
        this.event.changeActive(null);
    };
};



var analysePai = function (data, ZTConfig,parent) {
    this.config = data;
    this.ZTConfig = ZTConfig;
    this.parent = parent
    this.html = $('<div class="configObject_Pai"></div>');
    this.buttons = $('<div class="configObject_Pai_buttons"></div>').appendTo(this.html);
    this.chart = $('<div class="configObject_Pai_chart"></div>').appendTo(this.html);

    this.button1 = $('<button class="mapsetting-content-button">数量</button>').appendTo(this.html);
    this.button2 = $('<button class="mapsetting-content-button">压占面积</button>').appendTo(this.html);


    this.button1.click(() => {
        this.renderData('shuliang');
        this.button1.addClass('active');
        this.button2.removeClass('active');
    });
    this.button2.click(() => {
        this.renderData('yazhanmianji');
        this.button2.addClass('active');
        this.button1.removeClass('active');
    });

    this.data = [];
    setTimeout(() => {
        this.myChart = echarts.init(this.chart[0]);
    }, 200)
    //this.refreshData();
};

analysePai.prototype.renderData = function (type) {
    var _data = []
    var paiName = type === 'yazhanmianji' ? '压占面积' : '数量'
    for (let i = 0; i < this.data.length; i++) {
        const element = this.data[i];
        let tmp;
        if(type == 'yazhanmianji'){
            tmp = parseFloat(element[type] / this.parent.divisor).toFixed(this.parent.retentionDigit);
        }else {
            tmp = element[type];
        }
        _data.push({
            name: element.dictLable,
            value: tmp
        });
    }

    let item;
    if(paiName == "数量"){
        item = '{a} <br/>{b} : {c} ' + '个' + '({d}%)'
    }else {
        item = '{a} <br/>{b} : {c} ' + this.parent.unitValue + '({d}%)'
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: item
        },

        series: [{
            name: paiName,
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            label: {
                color: 'rgba(0, 0, 0, 1)'
            },
            data: _data
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    setTimeout(() => {
        this.myChart && this.myChart.setOption(option);
    }, 200)


    // 指定图表的配置项和数据

};

analysePai.prototype.refreshData = function (option,parent) {
    // layername: config.cache[0].sourceDataset,// 图层名称 (String) 必填
    // rwbmId: config.cache[0].rwbmId, // 任务id (String) 必填
    // gjpzId: item.gjpzId,// 高级配置id (String) 必填
    // dictType: item.groupEnglishField, // 字典类型 (String) 必填
    // jibie: item.showHierarchy,// 显示级别 (String) 必填

    //this.html.loading();
    _api.getTreePie({
        type: this.parent.objType.type ? this.parent.objType.type : '',
        jibie: option.jibie,
        layername: this.ZTConfig.sourceDataset, // 图层名称 (String) 
        rwbmId: this.ZTConfig.rwbmId, // 任务id (String) 
        gjpzId: this.config.gjpzId, // 高级配置id (String) 
        dictType: option.dictType, // 字典类型 (String) 
        pid: option.id, // pid (Long) 
        groupField: this.config.groupEnglishField // 分组字段
    }, (res) => {
        //this.html.loading();
        this.data = res;
        setTimeout(() => {
            this.button1.click();
        }, 200)
    });
};



var analyseTable = function (data, ZTConfig, parent,analyseTableHeaderEn,analyseTableHeaderCn) {
    this.parent = parent
    this.ZTConfig = ZTConfig;
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

    
    if(this.parent.objType.type === '5') {
        this.keyArray = analyseTableHeaderEn.split(',');
        this.TitleArray = analyseTableHeaderCn.split(',');
    }else {
        this.keyArray = data.showEnglishField.split(',');
        this.TitleArray = data.showChineseField.split(',');
    }
    this.renderHeader()
    // this.header.append('<td>序号</td>');
    // for (let i = 0; i < this.TitleArray.length; i++) {
    //     const element = this.TitleArray[i];
    //     this.header.append('<td>' + element + '</td>');
    // };
    
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
            _api.getTreeTable(data, (res) => {
                // this.html.loading();
                success({
                    totalRecord: res.total,
                    list: res.list
                });
            });
        },
        success: (result) => {
            this.tableresult = result
            this.renderTable(result);
        }
    });
    this.pagingBox.append(this.paging.render());
};
analyseTable.prototype.refreshData = function (data,value,analyseTableHeaderEnLay) {
    // var showEnglishField = this.config.showEnglishField.split(',');
    // if (showEnglishField[showEnglishField.length - 1] == 'smarea') {
    //     showEnglishField.splice(showEnglishField.length - 1, 1)
    // };

    // if (showEnglishField[0] == 'number') {
    //     showEnglishField.splice(0, 1)
    // };
    // showEnglishField = showEnglishField.join(',');
    var _data = {
        tk: data.tk,
        jibie: data.jibie,
        layername: value ? value : this.ZTConfig.sourceDataset, // 图层名称 (String) 
        rwbmId: this.ZTConfig.rwbmId, // 任务id (String) 
        gjpzId: this.config.gjpzId, // 高级配置id (String) 
        id: data.id || '', //决定看哪一层级
        layername: value ? value : '',
        filed: analyseTableHeaderEnLay ? analyseTableHeaderEnLay : this.config.showEnglishField, // 查看字段
        dictType: this.config.groupDictionaries, // 字典类型 (String) 
        groupField: this.config.groupEnglishField, // 分组字段
        pageInfo: {
            index: '1', // 第几页
            count: '6' // 每页多少条数据
        }
    };
    _data.rwbmId = _data.tk ? (_data.rwbmId + '_TK') : _data.rwbmId
    this.paging.refresh(_data);
};

analyseTable.prototype.bindDBClick = function (data, ele) {
    var _this = this
    ele.dblclick(function () {
        // api.getTableSimld(_this.ZTConfig.rwbmId,(res) => {
        //     console.log(res)
        // })
        _this.parent.parent._Map.addDataLayer(data);
    });
};
analyseTable.prototype.renderHeader = function() {
    this.header.empty()
    this.header.append('<td>序号</td>');
    for (let i = 0; i < this.TitleArray.length; i++) {
        const element = this.TitleArray[i];
        this.header.append('<td>' + element + '</td>');
    };
}
analyseTable.prototype.renderTable = function (data) {
    this.body.empty();
    if(!data && typeof(data) === 'undefined') {
        this.table.append('<div class="table-text">暂无数据</div>')
        return false
    }
    this.table.find('.table-text').remove()
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
//地类图斑
var tableTab = function(obj){
    this.html = $('<div class="tableTab"></div>');
    this.buttonTab = $('<div class="clearfix"></div>').appendTo(this.html);
    this.firstButton = null
    this.event= {
        getTabValue: function() {}
    }
    var tabList = obj.tabList
    for (let i = 0; i < tabList.length; i++) {
        const item = tabList[i];
        var button = this.TabAddButton(obj,item);
        if (!this.firstButton) {
            this.firstButton = button;
        };
    };
    //this.firstButton.click();

}
tableTab.prototype.TabAddButton = function(obj,itemObj){
    this.item = obj.item
    this.config = obj.config
    this.parent = obj.parent
    const button_item = $('<button class="mapsetting-content-button" style="margin: 8px 0 0 5px;float:left">' + itemObj.name + '</button>');
    this.buttonTab.append(button_item);
    button_item.click(() => {
        this.analyseTree = null;
        this.analysePai = null;
        this.analyseTable = null;
        if (button_item.hasClass('active')) {
            return
        };
        //
        var analyseTableHeaderEn,analyseTableHeaderCn
        if(itemObj.value === 'LYK_DLTB') {
            analyseTableHeaderEn = config.gpService ? tableString.gp.LYK_DLTB.en : tableString.oracle.LYK_DLTB.en
            analyseTableHeaderCn = config.gpService ? tableString.gp.LYK_DLTB.cn : tableString.oracle.LYK_DLTB.cn
        } else if (itemObj.value === 'LYK_XZDW') {
            analyseTableHeaderEn = config.gpService ? tableString.gp.LYK_XZDW.en : tableString.oracle.LYK_XZDW.en
            analyseTableHeaderCn = config.gpService ? tableString.gp.LYK_XZDW.cn : tableString.oracle.LYK_XZDW.cn
        } else {
            analyseTableHeaderEn = "DLBM,DLMC,QSXZ,QSDWMC,QSDWDM,LXDWBH,MJ,ZLTBBH,SMID"
            analyseTableHeaderCn = "地类编码,地类名称,权属性质,权属单位名称,权属单位代码,零星地物编号,面积,坐落图斑编号,SMID"
        }
        this.analyseTable = new analyseTable(this.item, this.config, this.parent,analyseTableHeaderEn,analyseTableHeaderCn);
        
        this.itemObjValue = itemObj.value
        this.analyseTableHeaderEn = analyseTableHeaderEn
        this.analyseTableHeaderCn = analyseTableHeaderCn
        this.event.getTabValue()
        this.buttonTab.find('.mapsetting-content-button').removeClass('active');
        button_item.addClass('active');

    });
    return button_item;
}
tableTab.prototype.getTableTabValue = function(event) {
    this.event.getTabValue = event
}
var configObject = function (data, config, parent) {
    this.parent = parent
    this.config = config;
    this.data = data;
    this.firstButton = null;
    this.html = $('<div style="width:100%"></div>');
    this.buttonBox = $('<div class="clearfix" style="margin:6px 0"></div>').appendTo(this.html);
    for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i];
        var button = this.addButton(item);
        if (!this.firstButton) {
            this.firstButton = button;
        };
    };
    this.content = $('<div class="configObjectBox"></div>').appendTo(this.html);
    this.analyseTree = null;
    this.analysePai = null;
    this.analyseTable = null;
    this.firstButton.click();
};
configObject.prototype.addButton = function (item) {
    const button_item = $('<button class="mapsetting-content-button" style="margin: 8px 0 0 5px;float:left">' + item.labelName + '</button>');
    this.buttonBox.append(button_item);
    button_item.click(() => {
        this.analyseTree = null;
        this.analysePai = null;
        this.analyseTable = null;
        if (button_item.hasClass('active')) {
            return
        };
        this.buttonBox.find('.mapsetting-content-button').removeClass('active');
        button_item.addClass('active');
        this.content.empty();
        if(!item.isShow) {
            this.content.append('<div class="resultText">' + item.isShowMsg + '</div>')
            return false
        }
        //判断是否为二三调
        
        if(this.parent.objType.type === '5') {
            var tabList = [{name: '地类图斑',value: 'LYK_DLTB'},{name: '线状地物',value: 'LYK_XZDW'},{name: '零星地物',value:'LYK_LXDW'}]
            var obj = {
                tabList: tabList,
                item:item,
                config: this.config,
                parent: this.parent
            }
            this.tabItem = new tableTab(obj)
            this.tabItem.firstButton.click()
            
            this.analyseTable = this.tabItem.analyseTable
            this.analyseTable.html.append(this.tabItem.html)
            this.tabItem.getTableTabValue((value,analyseTableHeaderEn) => {
                this.analyseTable.keyArray = this.tabItem.analyseTableHeaderEn.split(',')
                this.analyseTable.TitleArray = this.tabItem.analyseTableHeaderCn.split(',')
                this.analyseTable.renderHeader()
                this.analyseTable.refreshData(this.treeChangeData,this.tabItem.itemObjValue,this.tabItem.analyseTableHeaderEn);
            })
            
        } else {
            this.analyseTable = new analyseTable(item, this.config, this.parent);
        }
        if (item.isOpenTree == '0') {
            this.analyseTree = new analyseTree(item, this.content, this.config, this.parent);
            this.content.append(this.analyseTree.html);
            // if (item.isOpenMap == '0') {
            //     this.analysePai = new analysePai(item, this.config);
            //     this.content.append(this.analysePai.html);
            // } else {
            //     this.analyseTable.html.css('width', '70%');
            // };
        } else if (item.isOpenMap == '0') {
            this.analyseTable.html.css('width', '70%');
        } else {
            this.analyseTable.html.css('width', '100%');
        }
        if (item.isOpenMap == '0') {
            this.analysePai = new analysePai(item, this.config,this.parent);
            this.content.append(this.analysePai.html);
        } else if (item.isOpenTree == '0') {
            this.analyseTable.html.css('width', '70%');
        } else {
            this.analyseTable.html.css('width', '100%');
        }
        this.content.append(this.analyseTable.html);
        if (this.analyseTree) {
            this.analyseTree.onChange((data) => {
                this.treeChangeData = data
                // if (data.jibie == 1) {
                //     if (this.analysePai) {
                //         this.analysePai.refreshData(data);
                //     }
                // }
                if (this.analysePai) {
                    this.analysePai.refreshData(data,this.parent);
                }
                if(this.tabItem) {
                    this.analyseTable.refreshData(data,this.tabItem.itemObjValue,this.tabItem.analyseTableHeaderEn)
                } else {
                    this.analyseTable.refreshData(data)
                }
                // this.analyseTable.refreshData(data);
                // if (this.analysePai) {
                //     this.analysePai.refreshData(data);
                // }
            });
        } else {
            this.analyseTable && this.analyseTable.refreshData({});
            this.analysePai && this.analysePai.refreshData({});
        }

    });
    return button_item;
};
Analyse.prototype.renderData = function (_data) {
    this.body.text(_data.id);
    this.firstButton = null;
    this.analysisHeader.empty()
    for (let i = 0; i < _data.length; i++) {
        const item = _data[i];
        const button = this.addSpeciaName(item);
        if (!this.firstButton) {
            this.firstButton = button;
        }
    }
    this.firstButton.click();
};
//压占状态
//7
var executingStateObj = function (fn) {
    this.fn = fn;
    this.successNext = null;
}
executingStateObj.prototype.setNextSuccess = function (successNext) {
    return this.successNext = successNext
}
executingStateObj.prototype.nextPass = function () {
    var ret = this.fn.apply(this, arguments);
    if (ret === 'nextSucces') {
        return this.successNext && this.successNext.nextPass.apply(this.successNext, arguments)
    }
    return ret
}

var fnOne = function (obj) {
    var item = obj.item
    var that = obj.that
    that.export.show()
    _select.selectHtml.show()
    that.configObject = new configObject(item.caSqecialConfigurationBeanList, item, that);
    that.analysisContent.append(that.configObject.html);
}
var fnTwo = function (obj) {
    var item = obj.item
    var that = obj.that
    that.export.hide()
    _select.selectHtml.hide()
    that.AnalyseConfigTable = new AnalyseConfigTable(item, that)
    that.AnalyseConfigTable.html.css('width', '100%');
    that.analysisContent.append(that.AnalyseConfigTable.html)
    that.AnalyseConfigTable.refreshData(item)
}
var fnThree = function (obj) {
    var item = obj.item
    var that = obj.that
    that.export.hide()
    _select.selectHtml.hide()
    that.analysisContent.append('<div class="resultText">' + item[obj.reasonType] + '</div>')
}
var executingState7 = function (item, that) {
    if (item.executingState !== '7') {
        that.export.hide()
        _select.selectHtml.hide()
        that.analysisContent.html('<div class="resultText">' + item.failureReason + '</div>')
    } else {
        that.analysisContent.empty()
        that.AnalyseConfigTable = null;
        return "nextSucces"
    }
}
var executingStateWqyz = function (item, that) {
    var obj = {
        item: item,
        that: that,
        reasonType: 'completelyText'
    }
    if (item.overlyingStatus == 'wqyz') {
        if (item.completelyType == 'ZCSC') {
            fnOne(obj)
        } else if (item.completelyType == 'SCWYZ') {
            fnTwo(obj)

        } else {
            fnThree(obj)
        }
    } else {
        return "nextSucces"
    }
}
var executingStateBfyz = function (item, that) {
    var obj = {
        item: item,
        that: that,
        reasonType: 'partText'
    }
    if (item.overlyingStatus == 'bfyz') {
        if (item.partType == 'ZCSC') {
            fnOne(obj)
        } else if (item.partType == 'SCWYZ') {
            fnTwo(obj)
        } else {
            fnThree(obj)
        }
    } else {
        return "nextSucces"
    }
}
var executingStateWyz = function (item, that) {
    var obj = {
        item: item,
        that: that,
        reasonType: 'nothingText'
    }
    if (item.overlyingStatus == 'wyz') {
        if (item.nothingType == 'ZCSC') {
            fnOne(obj)
        } else if (item.nothingType == 'SCWYZ') {
            fnTwo(obj)
        } else {
            fnThree(obj)
        }

    }
}
var executingStateObj7 = new executingStateObj(executingState7)
var executingStateObjWqyz = new executingStateObj(executingStateWqyz)
var executingStateObjBfyz = new executingStateObj(executingStateBfyz)
var executingStateObjWyz = new executingStateObj(executingStateWyz)
executingStateObj7.setNextSuccess(executingStateObjWqyz)
executingStateObjWqyz.setNextSuccess(executingStateObjBfyz)
executingStateObjBfyz.setNextSuccess(executingStateObjWyz)
Analyse.prototype.addSpeciaName = function (item) {
    const button_item = $('<button class="mapsetting-content-button" style="margin: 8px 0 0 5px;float:left">' + item.specialName + '</button>');
    this.analysisHeader.append(button_item);
    button_item.click(() => {
        if (button_item.hasClass('active')) {
            return
        };
        // api.changeLayers(item.ztfxId, (res) => {
        //     this.events.changeMaplayer(res.data)
        // })
        this.analysisHeader.find('.mapsetting-content-button').removeClass('active');
        button_item.addClass('active');
        if (this.configObject) {
            this.configObject.html.remove();
        };
        //可优化
        if (this.objType.type === '2' || this.objType.type === '5' || this.objType.type === '6') {
            this.export.show()
            _select.selectHtml.show()
            this.configObject = new configObject(item.caSqecialConfigurationBeanList, item, this);
            this.analysisContent.append(this.configObject.html);
            return false
        }
        executingStateObj7.nextPass(item, this)


    });
    return button_item
};
Analyse.prototype.show = function (data, parent, arrIdList, obj) {
    this.parent = parent
    this.arrIdList = arrIdList
    this.objType = obj
    _api = apiObj[obj.api]
    if (this.html.hasClass('hide')) {
        this.html.show();
        $('body').find('#downBtn').css("display","block");
        //this.parent._Map.changeMapSize('analysis',true)
        setTimeout(() => {
            this.html.removeClass('hide');
        }, 10);
    };
    this.renderData(data);
};
Analyse.prototype.hide = function () {
    this.html.addClass('hide');
    $('body').find('#downBtn').css("display","none");
    //this.parent._Map.changeMapSize('analysis',false)
    setTimeout(() => {
        this.html.hide();
    }, 320);
};
Analyse.prototype.changeLeftView = function (type) {
    if (type) {
        this.html.css('left', '350px');
        $('.showhide').css('left', '350px');
    } else {
        this.html.css('left', '50px');
        $('.showhide').css('left', '50px');
    };
};

Analyse.prototype.changeRightView = function (type) {
    if (type) {
        this.html.css('right', '260px');
        $('.showhide').css('right', '260px');
        $('.bear_table').css("width",'47%');
    } else {
        this.html.css('right', '0px');
        $('.showhide').css('right', '0px');
        $('.bear_table').css("width",'55%');
    };
};




export default Analyse;