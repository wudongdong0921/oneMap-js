
import customSearch from './customSearch';
import pointSearch from './pointSearch';

var MapSearch = function () {
    this.html = $('<div class="OneMap_LeftBar_box"></div>');
    // this.tab = $('<div class="OneMap_Search_Tab"></div>').appendTo(this.html);
    // this.pointSearchTab = $('<div class="OneMap_Search_Tab_Item active"><i class="fa fa-map-marker" aria-hidden="true"></i><span>地名地址查询</span></div>').appendTo(this.tab);
    // this.customSearchTab = $('<div class="OneMap_Search_Tab_Item"><i class="fa fa-file-archive-o" aria-hidden="true"></i><span>业务查询</span></div>').appendTo(this.tab);

    this.SearchSelect = $('<div class="OneMap_Search_Select"></div>').appendTo(this.html);
    this.SearchName = $('<span class="OneMap_Search_Select_name"><i class="fa fa-map-marker" aria-hidden="true"></i><span>地名地址查询</span></span>').appendTo(this.SearchSelect);
    this.SearchSwitch = $('<span class="OneMap_Search_Select_more"><i class="fa fa-angle-down" aria-hidden="true"></i></span>').appendTo(this.SearchSelect);
    this.SearchSelectBox = $('<div class="OneMap_Search_Select_Box hide"></div>').appendTo(this.html);
    this.pointItem = $('<div class="OneMap_Search_Select_Item active"><i class="fa fa-map-marker" aria-hidden="true"></i><span>地名地址查询</span></div>').appendTo(this.SearchSelectBox);
    this.customItem = $('<div class="OneMap_Search_Select_Item"><i class="fa fa-file-archive-o" aria-hidden="true"></i><span>业务查询</span></div>').appendTo(this.SearchSelectBox);
    this.Content = $('<div class="OneMap_Search_Content"></div>').appendTo(this.html);



    this.customSearch = new customSearch();
    this.customSearch.html.hide();

    this.pointSearch = new pointSearch();

    this.pointItem.click(() => {
        this.pointItem.addClass('active');
        this.customItem.removeClass('active');
        var _html = this.pointItem.html();
        this.SearchName.html(_html);
        this.pointSearch.html.show();
        this.customSearch.html.hide();
        this.customSearch.clear();
    });

    this.customItem.click(() => {
        this.customItem.addClass('active');
        this.pointItem.removeClass('active');
        var _html = this.customItem.html();
        this.SearchName.html(_html);
        this.customSearch.html.show();
        this.pointSearch.html.hide();
    });

    var _this = this;
    this.SearchSwitch.click((e) => {
        e.stopPropagation();
        if (_this.customSearch.SelectElement.showOptionBox) {
            _this.customSearch.SelectElement.nameBox.click();
        };
        if (_this.SearchSelectBox.hasClass('hide')) {
            _this.SearchSelectBox.removeClass('hide');
            document.onclick = () => {
                _this.SearchSelectBox.addClass('hide');
                document.onclick = function () { };
            };
        } else {
            _this.SearchSelectBox.addClass('hide');
        };
    });


    this.Content.append(this.pointSearch.html);
    this.Content.append(this.customSearch.html);
};

MapSearch.prototype.render = function () {
    return this.html
};


export default MapSearch;