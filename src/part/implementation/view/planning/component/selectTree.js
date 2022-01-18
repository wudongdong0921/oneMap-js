////////////////////////////////////////////////
// 查询树封装
// 吴野
// 2020-12-12 12:43:30
////////////////////////////////////////////////
import Option from './zTreeOption/index'
var SelectTree = function (options) {
    var _this = this;
    this._allOption = $.extend({}, options);
    this.event = {
        onClick: this._allOption.onClick ? this._allOption.onClick : function () { },
        beforeCheck: function () { },
        beforeClick: function () { },
        onCheck: function () { },
    }
    this._html = $('<div class="selectMore">' +
        '    <div class="selectInptu" id="selectInptu"></div>' +
        '    <div id="selectTree" class="selectTree ztree"></div>' +
        '</div>');
    this._electInput = $('<input type="text" id="searchTree" name="title" required lay-verify="required" placeholder="请输入关键字" autocomplete="off" class="layui-input">')
    this._html.find('#selectInptu').append(this._electInput);
    var $treeId = this._html.find('#selectTree');
    this._option = new Option(this._allOption.parame.optionKey, this.event)
    this.zTreeObj = $.fn.zTree.init($treeId, this._option, this._allOption.zNodes);
    this.zTreeObj.expandAll(true);
    this.searchTree('selectTree', '#searchTree', null, true); //初始化模糊搜索方法
}
// 初始化之前先绑定tree需要绑定的事件
SelectTree.prototype.on = function (str, event) {
    if (this.event.hasOwnProperty(str)) {
        this.event[str] = event;
    };
};

SelectTree.prototype.render = function () {
    return this._html;
}

SelectTree.prototype.searchTree = function (zTreeId, searchField, isHighLight, isExpand) {
    var _this = this;
    var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId);
    if (!zTreeObj) {
        alert("fail to get ztree object");
    }
    var nameKey = zTreeObj.setting.data.key.name;
    isHighLight = isHighLight === false ? false : true;
    isExpand = isExpand ? true : false;
    zTreeObj.setting.view.nameIsHTML = isHighLight;
    var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]';
    var rexMeta = new RegExp(metaChar, 'gi');
    function ztreeFilter(zTreeObj, _keywords, callBackFunc) {
        if (!_keywords) {
            _keywords = '';
        }
        function filterFunc(node) {
            if (node && node.oldname && node.oldname.length > 0) {
                node[nameKey] = node.oldname;
            }
            zTreeObj.updateNode(node);
            if (_keywords.length == 0) {
                zTreeObj.showNode(node);
                zTreeObj.expandNode(node, isExpand);
                return true;
            }
            if (node[nameKey] && node[nameKey].toLowerCase().indexOf(_keywords.toLowerCase()) != -1) {
                if (isHighLight) {
                    var newKeywords = _keywords.replace(rexMeta, function (matchStr) {
                        return '\\' + matchStr;
                    });
                    node.oldname = node[nameKey];
                    var rexGlobal = new RegExp(newKeywords, 'gi');
                    node[nameKey] = node.oldname.replace(rexGlobal, function (originalText) {
                        var highLightText =
                            '<span style="color: whitesmoke;background-color: darkred;">'
                            + originalText
                            + '</span>';
                        return highLightText;
                    });
                    zTreeObj.updateNode(node);
                }
                zTreeObj.showNode(node);
                return true;
            }

            zTreeObj.hideNode(node);
            return false;
        }

        var nodesShow = zTreeObj.getNodesByFilter(filterFunc);
        processShowNodes(nodesShow, _keywords);
    }
    function processShowNodes(nodesShow, _keywords) {
        if (nodesShow && nodesShow.length > 0) {
            if (_keywords.length > 0) {
                $.each(nodesShow, function (n, obj) {
                    var pathOfOne = obj.getPath();
                    if (pathOfOne && pathOfOne.length > 0) {
                        for (var i = 0; i < pathOfOne.length - 1; i++) {
                            zTreeObj.showNode(pathOfOne[i]);
                            zTreeObj.expandNode(pathOfOne[i], true);
                        }
                    }
                });
            } else {
                var rootNodes = zTreeObj.getNodesByParam('level', '0');
                $.each(rootNodes, function (n, obj) {
                    zTreeObj.expandNode(obj, true);
                });
            }
        }
    }
    _this._electInput.bind('input propertychange', function () {
        var _keywords = $(this).val();
        searchNodeLazy(_keywords);
    });
    var timeoutId = null;
    var lastKeyword = '';
    function searchNodeLazy(_keywords) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            if (lastKeyword === _keywords) {
                return;
            }
            ztreeFilter(zTreeObj, _keywords);
            lastKeyword = _keywords;
        }, 500);
    }
}
export default SelectTree;