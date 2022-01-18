export default {
    render: function () {
        var baseUrl = "ws://127.0.0.1:12345";
        var _this = this;
        var _imageCache = null;
        var imgPath = "";
        var imgPathsrc = '';
        var imgPathArray = new Array();
        var imaBase64Array = new Array();
        _this.uploadevent = function () { 
            removeAll()
            imaBase64Array = new Array();
            _imageCache = null
        }
        _this.setFileName = function (name) { 
            _this.fileName=name
        }
        this.socket = new WebSocket(baseUrl);
        this.socket.onclose = function () {
            console.error("web channel closed");
        };
        this.socket.onerror = function (error) {
            console.error("web channel error: " + error);
        };
        function checkboxClicked(checkboxItem) {
            var id=$(checkboxItem.target).parent('div').attr('id')
            var basesrc = $(checkboxItem.target).prev('img').attr('src')
            if (imgPathArray.indexOf(id )< 0) {
                imgPathArray.push(id);

            } else {
                var index = imgPathArray.indexOf(id);
                imgPathArray.splice(index, 1);
            }
            if (imaBase64Array.indexOf(basesrc) < 0) {
                imaBase64Array.push(basesrc);

            } else {
                var index = imaBase64Array.indexOf(basesrc);
                imaBase64Array.splice(index, 1);
            }
        }
        function addImgDiv() {
            var container = _this.$el.find('#container');
            container.append(imgItem());

        }
        var imgItem = function () {
            var newchild = $('<div style="float:left"></div>')
            imgPath = "file:///" + imgPath;
            newchild.attr("id", imgPath);
            imgPathArray.push(imgPath);////增加缩略图时默认把路径加入图片数组
            imaBase64Array.push(imgPathsrc);
            newchild.append("<img style='width:105px; height:85px;margin-right: 5px;' src='" + imgPathsrc + "' /></img><input type='checkbox' class='check' checked='checked' />");
            newchild.find('.check').unbind().bind('change', (e) => {
                console.log(e)
                checkboxClicked(e)
            })
            return newchild
        }

        //清空缩略图
        function removeAll() {
            _this.$el.find('#container').html("");
            imgPathArray = new Array();
            // imaBase64Array=[]
        }
        //处理缩略图CheckBox点击事件

        this.socket.onopen = function () {
            new QWebChannel(_this.socket, function (channel) {
                _this._GP = channel.objects.dialog;
                _this._GP.html_loaded("one");

                $(document).keyup(function (event) {
                    if (event.keyCode == 13) {
                        //   $("#output").trigger("click");
                        if(_imageCache!=null){
                            _this.$el.find('#container').html("");
                        }
                        _this._GP.photoBtnClicked("primaryDev_");
                        _this._GP.get_actionType("savePhotoPriDev");
                    }
                });
                _this.$el.find('#output').unbind().bind('click', () => {
                    if(_imageCache!=null){
                        _this.$el.find('#container').html("");
                    }
                    _this._GP.photoBtnClicked("primaryDev_");
                    _this._GP.get_actionType("savePhotoPriDev");
                })
               //设备列表点击
                document.getElementById("devList").onchange = function() {
                    //清除展示信息
                    var resolutionList = document.getElementById("resolutionList");
                    resolutionList.options.length = 0;
                    var modelList = document.getElementById("modelList");
                    modelList.options.length = 0;
                    var select = document.getElementById("devList");
                    _this._GP.devChanged("primaryDev_:" + select.value);
                };
                //模式列表点击
                document.getElementById("modelList").onchange = function() {
                    //清除展示信息
                    var resolutionList = document.getElementById("resolutionList");
                    resolutionList.options.length = 0;
                    var select = document.getElementById("modelList");
                    _this._GP.devChanged("primaryDev_:" + select.value);
                };
                
                //分辨率列表点击
                document.getElementById("resolutionList").onchange = function() {
                    //清除展示信息
                    var select = document.getElementById("resolutionList");
                    _this._GP.devChanged("primaryDev_:" + select.value);
                };
                //图片合成pdf
                _this.$el.find("#composePDF").click(function () {
                    if (imgPathArray.length > 0) {
                        for (var i = 0; i < imgPathArray.length; i++) {
                            //发送合成pdf图片的路径，第2个参数：图片文件路径，第3，第4个参数为空
                            var path = imgPathArray[i];
                            if (path.indexOf("file:///") >= 0) {
                                path = path.substr(8);
                            }
                            //_this._GP.get_functionTypes("sendPDFImgPath", path, "", "");
                        }
                        //发送合成pdf命令
                        //第2个参数：保存路径，如果该路径不存在则保存在.exe文件下的eloamFile文件夹
                        //第3个参数：保存文件名称，如果为空则按照当前时间命名，
                        //第4个参数为空
                        //_this._GP.get_functionTypes("composePDF", "C:", "eloamFile\\"+_this.fileName, "");
                    } else {
                        layer.open({
                            title: '警告',
                            content: '请选择数据后进行此操作'
                        });   
                    }
                });
                //删除本地文件
                _this.$el.find("#deleteFile").click(function () {
                    if (imgPathArray.length > 0) {
                        deleteFile(imgPathArray);
                        if(_imageCache){
                            removeAll();
                            imaBase64Array = new Array();
                            _imageCache=null
                            imgPathArray = new Array();
                        }
                        imgPathArray = new Array();
                        imaBase64Array = new Array();
                    } else {
                        layer.open({
                            title: '警告',
                            content: '请选择数据后进行此操作'
                        });   
                    }
                    
                });
                _this.$el.find('#upload').click(function () {
                    var container = $("#container").html().trim();
                    if("" == container){
                        layer.open({
                            title: '警告',
                            content: '请先拍照！'
                        }); 
                    } else {
                        if (imaBase64Array.length==0) {
                            layer.open({
                                title: '警告',
                                content: '请选择图片！'
                            });                       
                        } else {
                            if(_imageCache!=null){
                                _this.$data.onClick(_imageCache,'pdf',()=>{
                                    deleteFile(imgPathArray);
                                    deletePdfFile();
                                });
                                //_this.uploadevent(function (_imageCache) { })
                            }else{
                                _this.$data.onClick(imaBase64Array,'image',()=>{
                                    deleteFile(imgPathArray);
                                });
                                //_this.uploadevent(function (imaBase64Array) { }) 
                            }
                            
                        }
                    }
                    

                })
                //服务器返回消息
                _this._GP.sendPrintInfo.connect(function (message) {
                    //获取文件base64返回值
                    if (message.indexOf("fileBase64:") >= 0) {
                        var value = message.substr(11);
                        //console.log(value)
                        _imageCache = value;
                        // icu.alert.normal(value);
                        return;
                    }
                    //图片保存后返回路径关键字savePhoto_success:
                    else if (message.indexOf("savePhoto_success:") >= 0) {
                        imgPath = message.substr(18);
                         addImgDiv();
                    }
                    //合成pdf成功，返回路径关键字composePDF_success:
                    else if (message.indexOf("composePDF_success:") >= 0) {
                        var path = message.substr(19);
                        removeAll();
                        // console.log(path)
                        // 
                        layer.open({
                            title: '提示',
                            content: '合成pdf成功！'
                        });
                        var container = _this.$el.find('#container');
                        container.append($('<div>'+path+'</div>'));

                    }
                    //设备信息 priModel
                    if(message.indexOf("priDevName:") >= 0)
                    {
                        message = message.substr(11);
                        var select = document.getElementById("devList");
                        var flag = false;
                        var opts = select.options;
                        for(var i=0, n=opts.length; i<n; i++){
                            if(opts[i].text == message){
                                flag = true;
                            }
                        }
                        if(!flag){
                            if(message.indexOf("USB") >= 0)
                            {
                                select.add(new Option(message));									
                            } else{
                                select.add(new Option(message), 0);
                            }
                        }
                        
                        select.selectedIndex=0;
                    }
                    //设备出图格式
                    if(message.indexOf("priModel:") >= 0)
                    {
                        message = message.substr(9);
                        var select = document.getElementById("modelList");
                        var flag = false;
                        var opts = select.options;
                        for(var i=0, n=opts.length; i<n; i++){
                            if(opts[i].text == message){
                                flag = true;
                            }
                        }
                        if(!flag){
                            if(message.indexOf("MJPG") >= 0)
                            {
                                select.add(new Option(message), 0);									
                            } else{
                                select.add(new Option(message));
                            }
                        }
                        
                        select.selectedIndex=0;
                    }
                    //设备分辨率
                    if(message.indexOf("priResolution:") >= 0)
                    {
                        message = message.substr(14);
                        var select = document.getElementById("resolutionList");
                        select.add(new Option(message));
                        if(select.options.length > 1)
                        {
                            select.selectedIndex = 1;
                        }
                    }

                });
                //接收图片流用来展示，多个，较小的base64数据
                _this._GP.send_priImgData.connect(function (message) {
                    var element = _this.$el.find('#bigPriDev')[0];
                    element.src = "data:image/jpg;base64," + message;
                });
                //接收拍照base64
                _this._GP.send_priPhotoData.connect(function (message) {
                    var element = _this.$el.find('#devPhoto')[0];
                    element.src = "data:image/jpg;base64," + message;
                    imgPathsrc = "data:image/jpg;base64," + message;
                    _imageCache=null
                    //addImgDiv();
                });

                // 2021-04-12 陈薪名 修改 上传文件后，删除已上传的，保留未上传的
                // 删除已上传文件，保留未上传文件
                function deleteFile (imgPathArray){
                     for (var i = 0; i < imgPathArray.length; i++) {
                        //删除文件，第2个参数：图片文件路径，第3，第4个参数为空
                        var path = imgPathArray[i];
                        $("div[id*='"+path.substring(path.lastIndexOf("\\")+1)+"']").remove();
                        if (path.indexOf("file:///") >= 0) {
                            path = path.substr(8);
                        }
                        _this._GP.get_functionTypes("deleteFile", path, "", "");
                    }
                    imgPathArray = new Array();
                    imaBase64Array = new Array();
                }

                function deletePdfFile (){
                    $("#container").html("");
                }

                //网页加载完成信号
                _this._GP.html_loaded("one");
            });
        };

    },
    // onclick:function(callback){

    //     _this.uploadevent(function(imageCache){
    //         callback(imageCache);
    //     })

    // },
    destroy: function () {
        var _this = this;
        try {
            _this._GP.get_actionType("closeSignal");
        } catch (e) {
            console.error(e)
        }

    }
}

