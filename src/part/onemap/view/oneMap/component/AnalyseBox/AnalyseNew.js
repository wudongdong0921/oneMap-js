////////////////////////////////////////////////
// 分析结果
// 吴东东
// 2020-11-24 19:34:45
////////////////////////////////////////////////
import paging from './../paging'
import api from "./../../apis/map"
import Select from "./../Select/select"
import AnalyseConfigTable from './ConfigTable'
var _select = new Select()
var unitList = [
    {
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
    this.unitSelect = null
    _select.selectData({
        options: unitList
    })
    var divisor = 1;
    var retentionDigit = 4;
    this.unitValue = '㎡'
    _select.onSelectChnage((val,value) => {
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
        xhr.traditional=true
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
var treeItem = function (data, config, parent) {
    this.data = data;
    this.config = config;
    this.html = $('<div class="configObject_treeItem"></div>');
    this.selectUnit = $('<div class="configObject_treeItem_unit"></div>').appendTo(this.html)
    this.title = $('<div class="configObject_treeItem_title"></div>').appendTo(this.html);
    this.icon = $('<i class="supermapol-icons supermapol-icons-legend-unfold"></i>');
    this.name = $('<span>' + data.dictLabel + '</span>');
    this.number = $('<span>&nbsp;&nbsp;：' + data.amount + '</span>');
    this.area = $('<span>&nbsp;&nbsp; 压占面积：' + data.pressureArea + ''+parent.parent.unitValue+' </span>');
    //this.dictValue = $('<span>&nbsp;&nbsp; 分组字段：' + data.dictValue + ' </span>');
    
    if (data.jibie == '1') {
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
    data.children.length> 0 && this.title.append(this.icon);
    data.dictLabel && this.title.append(this.name);
    for(var key in data.treeShowContent) {
        if (key == 'amount') {
            data.amount && this.title.append(this.number);
        } else if (key == 'pressureArea') {
            data.pressureArea && this.title.append(this.area);
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
        var children = new treeItem(child, config, parent,unitList);
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


var analyseTree = function (item, loadingObj, ZTConfig,parent) {
    this.parent = parent
    this.ZTConfig = ZTConfig;
    this.config = item;
    this.html = $('<div class="configObject_Tree"></div>');
    this.child = [];
    this.event = {
        changeActive: function () { },
    };
    //loadingObj.loading();

    api.getTreeData({
        layername: this.ZTConfig.sourceDataset,// 图层名称 (String) 必填
        rwbmId: this.ZTConfig.rwbmId, // 任务id (String) 必填
        gjpzId: item.gjpzId,// 高级配置id (String) 必填
        dictType: item.groupDictionaries, // 字典类型 (String) 必填
        jibie: item.showHierarchy,// 显示级别 (String) 必填
        groupField: item.groupEnglishField,
    }, (res) => {
        this.unitResult = res
        //loadingObj.loading();
        this.unitRefersh(res)
    });
};
analyseTree.prototype.unitRefersh = function(res) {
    this.obj = []
    this.deepClone(res,this.obj)
    this.html.empty()
    var treeObj = {};
        var treeArray = [];
        var levelList = []
        for (let i = 0; i < this.obj.length; i++) {
            let element = this.obj[i];
            element.children = [];
            treeObj[element.id] = element;
        };
        for (let i = 0; i < this.obj.length; i++) {
            let item = this.obj[i];
            item.pressureArea = parseFloat(item.pressureArea / this.parent.divisor).toFixed(this.parent.retentionDigit)
            if (treeObj.hasOwnProperty(item.pid)) {
                let element = treeObj[item.pid];
                element.children.push(item);
            } else {            
                treeArray.push(item);
            };
        };
        for (let i = 0; i < treeArray.length; i++) {
            const item = treeArray[i];
            const itemHtml = new treeItem(item, this.config, this)
            this.child.push(itemHtml);
            this.html.append(itemHtml.html);
        };
        this.child[0].title.click();
}
analyseTree.prototype.deepClone = function(origin,target) {
    var target = target || {};
        var tostr = Object.prototype.toString; //返回toString()
        var arrStr = "[object Array]"
        for(var prop in origin) {
            if(origin.hasOwnProperty(prop)) {
                if(origin[prop] !== 'null' && typeof(origin[prop]) == 'object') { //判断是引用值还是原始值
                    if(tostr.call(origin[prop]) == arrStr) {
                        target[prop] = []
                    }else{
                        target[prop] = {}
                    }
                    this.deepClone(origin[prop],target[prop])
                }else{
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



var analysePai = function (data, ZTConfig) {
    this.config = data;
    this.ZTConfig = ZTConfig;
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
    },200)
    //this.refreshData();
};

analysePai.prototype.renderData = function (type) {
    var _data = []
    for (let i = 0; i < this.data.length; i++) {
        const element = this.data[i];
        _data.push({
            name: element.dictLable,
            value: parseInt(element[type])
        });
    }
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        series: [{
            name: '数量',
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
    },200)
    
    
    // 指定图表的配置项和数据
    
};

analysePai.prototype.refreshData = function (option) {
    // layername: config.cache[0].sourceDataset,// 图层名称 (String) 必填
    // rwbmId: config.cache[0].rwbmId, // 任务id (String) 必填
    // gjpzId: item.gjpzId,// 高级配置id (String) 必填
    // dictType: item.groupEnglishField, // 字典类型 (String) 必填
    // jibie: item.showHierarchy,// 显示级别 (String) 必填

    //this.html.loading();
    api.getTreePie({
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
        },200)
    });
};



var analyseTable = function (data, ZTConfig,parent) {
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

    this.keyArray = data.showEnglishField.split(',');
    this.TitleArray = data.showChineseField.split(',');
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
            api.getTreeTable(data, (res) => {
               // this.html.loading();
                success({
                    totalRecord: res.total,
                    list: res.list
                });
            });
        },
        success: (result) => {
            this.renderTable(result);
        }
    });
    this.pagingBox.append(this.paging.render());
};
analyseTable.prototype.refreshData = function (data) {
    // var showEnglishField = this.config.showEnglishField.split(',');
    // if (showEnglishField[showEnglishField.length - 1] == 'smarea') {
    //     showEnglishField.splice(showEnglishField.length - 1, 1)
    // };

    // if (showEnglishField[0] == 'number') {
    //     showEnglishField.splice(0, 1)
    // };
    // showEnglishField = showEnglishField.join(',');
    var _data = {
        jibie: data.jibie,
        layername: this.ZTConfig.sourceDataset, // 图层名称 (String) 
        rwbmId: this.ZTConfig.rwbmId, // 任务id (String) 
        gjpzId: this.config.gjpzId, // 高级配置id (String) 
        id: data.id || '',  //决定看哪一层级
        filed: this.config.showEnglishField, // 查看字段
        dictType: this.config.groupDictionaries, // 字典类型 (String) 
        groupField: this.config.groupEnglishField,// 分组字段
        pageInfo: {
            index: '1', // 第几页
            count: '6' // 每页多少条数据
        }
    };
    this.paging.refresh(_data);
};

analyseTable.prototype.bindDBClick = function (data, ele) {
    var _this = this
    //console.log(_this.ZTConfig.rwbmId)
    ele.dblclick(function () {
        // api.getTableSimld(_this.ZTConfig.rwbmId,(res) => {
        //     console.log(res)
        // })
        _this.parent.parent._Map.addDataLayer(data);
    });
};

analyseTable.prototype.renderTable = function (data) {
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
var configObject = function (data, config,parent) {
    this.parent = parent
    this.config = config;
    this.data = data;
    this.firstButton = null;
    this.html = $('<div style="width:100%"></div>');
    this.buttonBox = $('<div class="clearfix"></div>').appendTo(this.html);
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
        this.analyseTable = new analyseTable(item, this.config,this.parent);
        if (item.isOpenTree == '0') {
            this.analyseTree = new analyseTree(item, this.content, this.config,this.parent);
            this.content.append(this.analyseTree.html);
            // if (item.isOpenMap == '0') {
            //     this.analysePai = new analysePai(item, this.config);
            //     this.content.append(this.analysePai.html);
            // } else {
            //     this.analyseTable.html.css('width', '70%');
            // };
        }  else if(item.isOpenMap == '0') {
            this.analyseTable.html.css('width', '70%');
        } else{
            this.analyseTable.html.css('width', '100%');
        }
        if (item.isOpenMap == '0') {
            this.analysePai = new analysePai(item, this.config);
            this.content.append(this.analysePai.html);
        } else if(item.isOpenTree == '0'){
            this.analyseTable.html.css('width', '70%');
        }else {
            this.analyseTable.html.css('width', '100%');
        }
        this.content.append(this.analyseTable.html);
        if (this.analyseTree) {
            this.analyseTree.onChange((data) => {
                // if (data.jibie == 1) {
                //     if (this.analysePai) {
                //         this.analysePai.refreshData(data);
                //     }
                // }
                if (this.analysePai) {
                    this.analysePai.refreshData(data);
                }
                this.analyseTable.refreshData(data);
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
//职责
//7
var executingStateObj = function(fn) {
    this.fn = fn;
    this.successNext = null;
}
executingStateObj.prototype.setNextSuccess = function(successNext) {
    return this.successNext = successNext
}
executingStateObj.prototype.nextPass = function() {
    var ret = this.fn.apply(this,arguments);//改变this指向
    if(ret === 'nextSucces') {
        return this.successNext && this.successNext.nextPass.apply(this.successNext,arguments)
    }
    return ret
}
var executingState7 = function(item,that) {
    if(item.executingState !== '7') {
        that.export.hide()
                _select.selectHtml.hide()
                that.analysisContent.html('<div class="resultText">'+ item.failureReason +'</div>')
    } else{
        that.analysisContent.empty()
        that.AnalyseConfigTable = null;
        return "nextSucces"
    }
}
var executingStateWqyz = function(item,that) {
    if(item.overlyingStatus == 'wqyz') {
        if(item.completelyType == 'ZCSC') {
            that.export.show()
            _select.selectHtml.show()
            that.configObject = new configObject(item.caSqecialConfigurationBeanList, item,that);
            that.analysisContent.append(that.configObject.html);
        }else if(item.completelyType == 'SCWYZ') {
            that.export.hide()
            _select.selectHtml.hide()
            that.AnalyseConfigTable = new AnalyseConfigTable(item,that)
            that.AnalyseConfigTable.html.css('width', '100%');
            that.analysisContent.append(that.AnalyseConfigTable.html)
            that.AnalyseConfigTable.refreshData(item)
            
        } else{
            that.export.hide()
            _select.selectHtml.hide()
            that.analysisContent.append('<div class="resultText">'+ item.completelyText +'</div>')
        }
    } else{
        return "nextSucces"
    }
}
var executingStateBfyz = function(item,that) {
    if(item.overlyingStatus == 'bfyz') {
        if(item.partType == 'ZCSC') {
            that.export.show()
            _select.selectHtml.show()
            that.configObject = new configObject(item.caSqecialConfigurationBeanList, item,that);
            that.analysisContent.append(that.configObject.html);
        }else if(item.partType == 'SCWYZ') {
            that.export.hide()
            _select.selectHtml.hide()
            that.AnalyseConfigTable = new AnalyseConfigTable(item,that)
            that.AnalyseConfigTable.html.css('width', '100%');
            that.analysisContent.append(that.AnalyseConfigTable.html)
            that.AnalyseConfigTable.refreshData(item)
        } else{
            that.export.hide()
            _select.selectHtml.hide()
            that.analysisContent.append('<div class="resultText">'+ item.partText +'</div>')
        }
    } else{
        return "nextSucces"
    }
}
var executingStateWyz = function(item,that) {
    if(item.overlyingStatus == 'wyz') {
        if(item.nothingType == 'ZCSC') {
            that.export.show()
            _select.selectHtml.show()
            that.configObject = new configObject(item.caSqecialConfigurationBeanList, item,that);
            that.analysisContent.append(that.configObject.html);
        }else if(item.nothingType == 'SCWYZ') {
            _select.selectHtml.hide()
            that.AnalyseConfigTable = new AnalyseConfigTable(item,that)
            that.AnalyseConfigTable.html.css('width', '100%');
            that.analysisContent.append(that.AnalyseConfigTable.html)
            that.AnalyseConfigTable.refreshData(item)
        } else{
            that.export.hide()
            _select.selectHtml.hide()
            that.analysisContent.append('<div class="resultText">'+ item.nothingText +'</div>')
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
    console.log(item)
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
        var statuList = ['wqyz','bfyz','wyz']
        if(this.objType.type === '2') {
            this.export.show()
            _select.selectHtml.show()
            this.configObject = new configObject(item.caSqecialConfigurationBeanList, item,this);
            this.analysisContent.append(this.configObject.html);
            return false
        }
        executingStateObj7.nextPass(item,this)

        
    });
    return button_item
};
Analyse.prototype.show = function (data,parent,arrIdList,obj) {
    this.parent = parent
    this.arrIdList = arrIdList
    this.objType = obj
    if (this.html.hasClass('hide')) {
        this.html.show();
        //this.parent._Map.changeMapSize('analysis',true)
        setTimeout(() => {
            this.html.removeClass('hide');
        }, 10);
    };
    this.renderData(data);
};
Analyse.prototype.hide = function () {
    this.html.addClass('hide');
    //this.parent._Map.changeMapSize('analysis',false)
    setTimeout(() => {
        this.html.hide();
    }, 320);
};
Analyse.prototype.changeLeftView = function (type) {
    if (type) {
        this.html.css('left', '350px');
    } else {
        this.html.css('left', '50px');
    };
};

Analyse.prototype.changeRightView = function (type) {
    if (type) {
        this.html.css('right', '260px');
    } else {
        this.html.css('right', '0px');
    };
};




export default Analyse;