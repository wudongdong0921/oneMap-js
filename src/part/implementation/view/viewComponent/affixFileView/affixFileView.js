////////////////////////////////////////////////
// 附件资料文件预览
// 穆松鹤
// 2020-11-09 10:44:08
////////////////////////////////////////////////
import imagePreview from '../../../../../common/imagePreview';

export default {
    render: function () {
        this.layout = this.$el.find('.viewBox');
        window.FileViewObject = this;
        this.select = new icu.formElement.select({
            data: [],
            getKey: 'object',
            setKey: 'cgsxId',
            showKey: 'elementName',
        });
        this.select.html.hide();
        this.layout.before(this.select.html);
    },
    set: function (id, fileName, url1) {
        var suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLocaleLowerCase();
        // else if (suffix == 'xls' || suffix == 'xlsx' || suffix == 'doc' || suffix == 'docx' || suffix == 'ppt' || suffix == 'pptx') { }
        if (suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif' || suffix == 'png') {
            // 2021-04-08 陈薪名 修改 tif文件预览问题，先调用转换jpg接口再展现
            var myUrl = '';
            if (suffix == 'tif') {
                this.$api.getTiffImage(id, (url) => {
                    myUrl = url.data;
                });
            }
            this.$api.getNormalFile(id, (url) => {
                this.layout.show();
                this.layout.empty();
                this.select.html.hide();
                this.layout.css({
                    top: '0px'
                });
                if (myUrl !== '') {
                    new imagePreview(this.layout, myUrl);
                } else {
                    new imagePreview(this.layout, url);
                }
            });
        // } else if (suffix == 'mdb' || suffix == 'mdbx' || suffix == 'xls' || suffix == 'xlsx') {
        //     this.layout.show();
        //     this.layout.empty();
        //     this.select.html.hide();
        //     this.layout.append('<div class="noFileView">暂不支持此类型文件预览</div>');
            // this.$api.getTableTitle(id, (data) => {
            //     this.layout.show();
            //     this.layout.empty();
            //     this.select.html.show();
            //     this.layout.css({
            //         top: '50px'
            //     });
            //     this.select.setData(data);
            //     this.select.set(data[0].cgsxId);
            //     var creatTable = (data) => {
            //         this.$api.getTableData(data.cgsxId, 1, 10, (content) => {
            //             var firstRunder = true;
            //             var _Options = {
            //                 tableOptions: {
            //                     height: this.layout.height() - 100,
            //                 },
            //                 cols: [],
            //                 pagingOptions: {
            //                     hasQuick: true,
            //                     limitPage: true,
            //                     countPage: true,
            //                     index: 1,
            //                     count: 10,
            //                 },
            //                 getEvent: (pageInfo, setData) => {
            //                     if (firstRunder) {
            //                         setData({
            //                             count: content.conut,
            //                             data: content.data,
            //                         });
            //                         firstRunder = false;
            //                     } else {
            //                         this.$api.getTableData(data.cgsxId, pageInfo.page, pageInfo.limit, function (res) {
            //                             setData({
            //                                 count: res.conut, // 表格总条数
            //                                 data: res.data, // 表格数据
            //                             });
            //                         });
            //                     };
            //                 },
            //             };
            //             for (const key in content.fieldName) {
            //                 if (content.fieldName.hasOwnProperty(key)) {
            //                     const element = content.fieldName[key];
            //                     _Options.cols.push({
            //                         key: key,// 表头关键字
            //                         type: 'string', // 类型
            //                         name: element, // 表头显示字段
            //                     });
            //                 }
            //             };
            //             var __table = new icu.table(_Options);
            //             this.layout.append(__table.html);
            //             __table.init();
            //         });
            //     };
            //     this.select.onChange((value) => {
            //         this.layout.empty();
            //         creatTable(value);
            //     });
            //     creatTable(data[0]);
            // });
        } else if(suffix == 'tif'){
            this.layout.show();
            this.layout.empty();
            this.select.html.hide();
            this.layout.append('<div class="noFileView">暂不支持此类型文件预览</div>');
        } else if (suffix == 'txt') {
            this.$api.getNormalFile(id, (url) => {
                this.layout.show();
                this.layout.empty();
                this.select.html.hide();
                this.layout.css({
                    top: '0px'
                });
                $.ajax({
                    url: url,
                    dataType: 'text',
                    success: (res) => {
                        this.layout.append('<div class="TextViewLayout"><pre><code>' + res + '</code></pre></div>');
                    },
                    error: function (error) {
                        layer.open({
                            title: '警告',
                            content: error
                        });
                    }
                });
            });
        // } else if (suffix == 'vct') {
        //     this.layout.show();
        //     this.layout.empty();
        //     this.select.html.hide();
        //     this.layout.append('<div class="noFileView">暂不支持此类型文件预览</div>');

            // this.$api.getMapFile(id, (content) => {
            //     if (content.length == 0 ) {
            //         this.layout.append('<div class="noFileView">暂无数据！</div>');
            //         return;
            //     }
            //     this.layout.show();
            //     this.layout.empty();
            //     this.select.html.show();
            //     this.layout.css({
            //         top: '50px'
            //     });
            //     for (let i = 0; i < content.length; i++) {
            //         let element = content[i];
            //         element.cgsxId = element.cgfwxxbId;
            //         element.elementName = element.tableName;
            //     };
            //     this.select.setData(content);
            //     var renderMap = (url) => {
            //         this.$api.getMapVectorstyles(url, (mapStyle) => {
            //             var zoom = mapStyle.zoom == null ? 0 : mapStyle.zoom;
            //             this.$api.getMapJson(url, (mapConfig) => {
            //                 this.layout.empty();
            //                 new mapboxgl.Map({
            //                     container: this.layout[0],
            //                     style: {
            //                         "version": 8,
            //                         "sources": {
            //                             "raster-tiles": {
            //                                 "type": "raster",
            //                                 //tiles: [url + '/zxyTileImage.png?prjCoordSys={"epsgCode":4490}&z={z}&x={x}&y={y}'],
            //                                 tiles: [url],
            //                                 rasterSource: 'iserver',
            //                                 "tileSize": 256,
            //                             }
            //                         },
            //                         "layers": [{
            //                             "id": "simple-tiles",
            //                             "type": "raster",
            //                             "source": "raster-tiles",
            //                             "minzoom": 0,
            //                             "maxzoom": 22 //最大不能小于设置
            //                         }],
            //                         //'sprite': 'http://iclient.supermap.io/web/styles/street/sprite'
            //                     },
            //                     center: mapStyle.center,
            //                     zoom: zoom,
            //                     minZoom: 0,
            //                     maxZoom: 22,
            //                     crs: "EPSG:" + mapConfig.prjCoordSys.epsgCode,
            //                 });
            //             });
            //         });
            //     };
            //     this.select.onChange((value) => {
            //         renderMap(value.mapServiceAddress);
            //     });
            //     this.select.set(content[0].cgsxId);
            //     renderMap(content[0].mapServiceAddress);
            // });
        } else if (suffix == 'pdf') {
            this.layout.show();
            this.layout.empty();
            this.select.html.hide();
            this.layout.css({
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px'
            });
            if (id) {
                this.$api.getNormalFile(id, (url) => {
                    this.layout.append('<iframe scrolling="auto" allowtransparency="true" style="display: block;width: 100%;height: ' + this.layout.height() + 'px;" frameborder="0" src="' + url + '"></iframe>');
                });
            }else{
                this.layout.append('<iframe scrolling="auto" allowtransparency="true" style="display: block;width: 100%;height: ' + this.layout.height() + 'px;" frameborder="0" src="' + url1 + '"></iframe>');
            }

        } else {
            this.layout.show();
            this.layout.empty();
            this.select.html.hide();
            this.layout.append('<div class="noFileView">暂不支持此类型文件预览</div>');
        }
    },
    show: function () {
        this.layout.show()
    },
    hide: function () {
        this.layout.hide()
    },
    destroy: function () {

    },
};