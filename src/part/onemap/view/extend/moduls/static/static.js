
var statisConfig = function (el, data) {
    this.html = el;
    this.event = {
        staticCilik: function () { },
        statisTable: function () { },
        chartSelect: function () { },
        download: function () { },
    }
    this.rangeTreeDiv = $('<div></div>').appendTo($('#rangeTreeDiv'));  // 统计范围树形图
    this.addCards(data)
}

statisConfig.prototype.addCards = function (data) {
    // 左侧所有数据统计卡片
    var that = this;
    let box = $('<div class="OneMap_statisConfig_box"></div>').appendTo(this.html);
    for (const item of data) {
        let card = $('<div class="OneMap_statisConfig_card"></div>').appendTo(box);
        let icon = $('<div class="OneMap_statisConfig_box_barChart"></div>').appendTo(card);
        let iconImg = $(`<img src="${config.staticConfig.statisConfig.barIcon}" class="osbb_img"></img>`).appendTo(icon);
        let statisTitle = $(`<div class="OneMap_statisConfig_box_titileDiv" title="${item.statisName}"> ${item.statisName} </div>`).appendTo(card)

        card.unbind().bind('click', function () {
            top.layer.closeAll();
            that.event.staticCilik(item);
        })
    }

}

statisConfig.prototype.statisRange = function (data,values) {
    // 统计范围树形图
    var that = this;

    // 把list值转换成树形值
    var arrayToTree = function (arr, pid) {
        //  arr 是返回的数据  parendId 父id
        let temp = [];
        let treeArr = arr;
        treeArr.forEach((item, index) => {
            if (item.pid == pid) {
                if (arrayToTree(treeArr, treeArr[index].id).length > 0) {
                    // 递归调用此函数
                    treeArr[index].children = arrayToTree(treeArr, treeArr[index].id);
                }
                temp.push(treeArr[index]);
            }
        });
        return temp;
    }

    // 添加复选框需要的checkArr值
    var addcheckArr = function (arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].checkArr = "0";
        }
        return arr
    }
    //任航修改
    let pidList = [];
    let arr = addcheckArr(data);
    values.forEach((value) => {
        arr.forEach((item, index) => {
            if (item.dictValue == value) {
                pidList.push(item.pid);
            }
        });
    });
    var list = [];
    pidList.forEach(pid => {
        let trees = arrayToTree(arr, pid);
        trees.forEach( tree => {
            list.push(tree);
        })
    })


    this.rangeTreeDiv.empty();
    var rangeTreeBox = $('<div class="rangeTreeDiv_box"></div>').appendTo(this.rangeTreeDiv);
    var rangeTree = $('<ul id="rangeTree" style="width: 450px !important;"></ul>').appendTo(rangeTreeBox);
    var rangeTreeDiv_button = $('<div class="rangeTreeDiv_button"></div>').appendTo(this.rangeTreeDiv);
    var chooseAll = $('<button type="button" class="layui-btn layui-btn-primary">全选</button>').appendTo(rangeTreeDiv_button);
    var statisRange = $('<button type="button" class="layui-btn layui-btn-normal" style="margin-left: 10px;">统计</button>').appendTo(rangeTreeDiv_button)

    this.allSelect = 'noall';
    
    var statisTree = dtree.render({
        elem: '#rangeTree',
        data: list,
        height: '500',
        response: {
            parentId: "pid",
            title: "dictLabel",
            value: 'dictValue'
        },
        checkbar: true,
        checkbarType: 'self',
        checkbarData: 'choose',
        ficon: ["2", "-1"],
        icon: ['0', '-1'],
        skin: 'static',
    })

    chooseAll.unbind().bind('click', function () {
        const params = dtree.getCheckbarNodesParam("rangeTree");
        if (params.length == data.length) {
            that.allSelect = 'all'
        }

        if (that.allSelect == 'noall') {
            statisTree.checkAllNode();
            that.allSelect = 'all'
        } else {
            that.allSelect = 'noall';
            statisTree.cancelCheckedNode();
        }
    })

    statisRange.unbind().bind('click', function () {
        // 获取选中的节点值
        const params = dtree.getCheckbarNodesParam("rangeTree");
        let adcode = [];
        let range = [];
        for (const item of params) {
            for (const dataItem of data) {
                if (item.nodeId == dataItem.id) {
                    range.push(dataItem.dictLabel);
                    adcode.push(dataItem.dictValue);
                }
            }
        }

        if (params.length == data.length) {
            range = ['全部']
        }
        if (adcode.length <= 0) {
            return layer.msg('请选择统计范围', { icon: 7 })
        }
        that.event.statisTable(adcode, range);
    })


    setTimeout(() => {
        top.layer.open({
            type: 1,
            title: ['统计范围', 'background-color: #1958A6;line-height: 40px; padding-left: 10px; color: #fff; font-size: 16px;'],
            content: $('#rangeTreeDiv'),
            shade: 0,
            area: ['500px', '400px'],
            cancel: function (index, layero) {
                top.layer.closeAll();
            },
        })
    }, 100)

}

statisConfig.prototype.on = function (str, func) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = func;
    }
}

export default statisConfig;
