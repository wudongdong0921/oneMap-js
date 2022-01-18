////////////////////////////////////////////////
// 
// 李雪
// 2020-10-15 10:13:19
//  1.引入控件在renderView方法里传入options参数，readonly为true时代表只读，无勾选改变状态功能，默认为false。
//  2.setdata方法传入数据
//  3.onUpdateStatus方法为点击对号或叉号时回调方法，改变当前单条数据的状态，可在此方法里调用接口
//  4.onShowDevent方法为点击绿色图标时回调方法
//  5.getList方法获取当前状态的所有数据（每项数据的勾选状态）
////////////////////////////////////////////////

export default {
    renderData: function () {
        return {
            treedata: [],
            readOnly: false,
            chooseList: [],
            treeBox: "" 

        }
    },
    getList: function () {
        return this.renderData.treeBox.getChooseList()
    },

    setdata:function (data) {
        if(this.renderData.treeBox!=''){
            this.renderData.treeBox.renderData(data);
        }       
    },
    onUpdateStatus:function (callback){
        this.renderData.treeBox.onUpdateStatus(function (data, status) {
            callback(data, status);
        })
    },
    onShowDevent:function (callback){
        this.renderData.treeBox.onShowDevent(function (data,readonly,html) {
            callback(data,readonly,html)
        })
    },
    
    render: function () {
        
        // this.renderData.treedata=this.$data.bb;
        var _this = this;
        var treeBox = function (data) {
            this.options = {
                readonly:false
            };
            this.options = $.extend({}, this.options, _this.$data.options);
            this.chooseList = _this.renderData.chooseList;
            this.childList = [];
            this.html = $("<div class='allbox'></div>");

            this.event = {
                updateStatus: function (e) { },
                showDevent: function (e) { }
            };
        };
        treeBox.prototype = {
            renderData: function (data) {
                var _this = this;
                _this.renderData.treedata = data;
                if (_this.renderData.treedata.length != 0) {
                    for (let i = 0; i < _this.renderData.treedata.length; i++) {
                        const element = _this.renderData.treedata[i];
                        var children = new creatTree(element, this);
                        this.childList.push(children)
                        this.html.append(children.render())
                    }
                };
            },
            onUpdateStatus: function (event) {
                this.event.updateStatus = event
            },
            onShowDevent: function (event) {
                this.event.showDevent = event
            },
            render: function () {
                return this.html
            },
            getChooseList: function () {
                this.chooseList = []
                for (let i = 0; i < this.childList.length; i++) {
                    const element = this.childList[i];
                    this.chooseList = this.chooseList.concat(element.get())
                }
                // _this.returnChooseList(this.chooseList)
                return this.chooseList
            }
        }
        var creatTree = function (data, parent) {
            this.parent = parent;
            this.showchild = false;
            this.childList = [];
            this.html = $(
                `<div class='item'>
                    <div class="parentNode">
                        <i class="fa fa-caret-right arrow" aria-hidden="true"></i>
                        ${data.reviewCategory}
                    </div>
                    <div class="chldrenNode" style="display:none"></div>                  
                </div>`
            )
            if (data.reviewList) {
                var item = this.html.find('.chldrenNode');
                for (let i = 0; i < data.reviewList.length; i++) {
                    const element = data.reviewList[i];
                    var child = new childrenItem(element, this);
                    this.childList.push(child);
                    item.append(child.render())
                }
            };
        }
        creatTree.prototype = {
            render: function () {
                this.html.find(".arrow").unbind().bind("click", () => {
                    if (!this.showchild) {
                        this.html.find(".arrow").removeClass('fa-caret-right').addClass("fa-caret-down")
                        this.html.find(".chldrenNode").css('display', "block");
                        this.showchild = true
                    } else {
                        this.html.find(".arrow").removeClass('fa-caret-down').addClass("fa-caret-right")
                        this.html.find(".chldrenNode").css('display', "none");
                        this.showchild = false
                    }

                })
                return this.html
            },
            get: function () {
                var list = []
                for (let i = 0; i < this.childList.length; i++) {
                    const element = this.childList[i];                   
                    list.push(element.data)
                    
                }
                return list
            },
        }
        var childrenItem = function (data, parent) {
            var icon
            console.log(_this.$data.options.icon);
            if(_this.$data.options.icon){
                // icon = data.reviewState === '0'? './static/img/u3050.svg' : './static/img/u5555.svg'
                icon = data.reviewState === ''? './static/img/u5555.svg':'./static/img/u3050.svg'  
            }else if(!_this.$data.options.icon){
                icon = data.reviewState === '0'? './static/img/u3050.svg' : ''
            }
            this.parent = parent;
            this.data = data;
            this.html = $(
                `<div class="childNode">
                    <div style="display: flex;width:70%">
                        <div class="name" title="${data.examineContent}">${data.examineContent}</div>
                        <div>
                            <i class="fa fa-check-circle" aria-hidden="true"></i>
                            <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </div>
                    </div>                   
                    <div style="width:30%;text-align: right;"><img src="${icon}"></div>
                </div>`

            );
            // 2021-04-07 陈薪名 修改 树展现回显对号与叉的状态
            if (this.data.sign_state == '0') {
                this.unactive()
            } else if (this.data.sign_state == '1') {
                this.active()
            }else{
                this.html.find('.fa-times-circle').removeClass("active")
                this.html.find('.fa-check-circle').removeClass("active");
            }
            //--------------old-------------STAR
            // if (this.data.reviewState == '0') {
            //     this.active()
            // } else if (this.data.reviewState == '1') {
            //     this.unactive()
            // }else{
            //     this.html.find('.fa-times-circle').removeClass("active")
            //     this.html.find('.fa-check-circle').removeClass("active");
            // }
            //--------------old-------------END
        }
        childrenItem.prototype = {
            render: function () {
                if(!this.parent.parent.options.readonly){
                    this.html.find('.fa-check-circle').unbind().bind('click', () => {
                        this.active()
                        // _this.updateStatus();
                        //this.event.active(this)
                    });
                    this.html.find('.fa-times-circle').unbind().bind('click', () => {
                        this.unactive()
                        // this.event.delete(this)
                    });
                }
                
                this.html.find('img').click(() => {
                    this.parent.parent.event.showDevent(this.data,this.parent.parent.options.readonly,this.html.find('img'));
                })

                return this.html
            },
            active: function () {
                this.html.find('.fa-times-circle').removeClass("active")
                this.html.find('.fa-check-circle').addClass("active");
                this.data.reviewState = 0;
                this.parent.parent.event.updateStatus(this.data, 0);
                // this.parent.changeStatus(this.data.id,true);
            },
            unactive: function () {
                this.html.find('.fa-times-circle').addClass("active")
                this.html.find('.fa-check-circle').removeClass("active");
                this.data.reviewState = 1;
                this.parent.parent.event.updateStatus(this.data, 1);
                // this.parent.changeStatus(this.data.id,false);
            }
        }
        this.renderData.treeBox = new treeBox(this.renderData.treedata),
        this.$el.find(".treebox").append(this.renderData.treeBox.render())

    },
    destroy: function () {

    }
}