////////////////////////////////////////////////
// 系统辅助审查弹出框
// 李雪
// 2020-10-15 11:16:38
// 戴飞
// 2020-11-5 13:02:12
////////////////////////////////////////////////

export default {
  render: function () {
    this.$el.find("#examineDailog").append($(`
    <div>
        <div class='inputbox'>
            <label>检查内容</label>
        </div>
        <div class='tabbox'></div>
        <div class='btnbox'>
            <div class='layui-btn layui-btn-ys back'> 返回</div>
            <div class='layui-btn layui-btn-ys startExamine'> 开始检测</div>
        </div>
    </div>`))
    if(this.$data.readonly){
        this.$el.find(".startExamine").hide();
    }
    this.$el.find('.back').unbind().bind('click', () => {
        this.closeEvent()
    })
    var _table = new icu.datagrid();
    this.$api.resultsReview({
        cgscxmId: this.$data.cgscxmId
    },res=>{
        console.log(res);
        if(res.rrList.length > 0){
            this.$el.find('.startExamine').css('display','none')
        }
        var inputDemo = new icu.formElement.input({
            size: 'normal', // 自定义Class属性
            inputType: 'text', // 可选值 text （文本输入框） password （密码提示框）
            readonly: true,  // 设置是否只读
            placeholder: res.examineContent
        });
        var strViewTemplate,
        arr = []
        for(var i =0,len = res.rrList.length;i < len; i++){
            strViewTemplate = `<div>检查图层：${res.rrList[i].examineProject+','+res.rrList[i].reviewCategory+','+res.rrList[i].recordContent}</div>`
            arr.push(strViewTemplate)
        }
        this.$el.find('.inputbox').append(inputDemo.html)
        this.$el.find('.examineLog').html(`${arr.join('')}`)
        var errData = []
        for(var i = 0,len = res.rrList.length; i<len ;i++){
            if(res.rrList[i].recordType === '1'){
                errData.push({
                    content: res.rrList[i].examineProject
                })
            }
        }
        setTimeout(() => {
            this.$el.find('.examineResult').append(_table.html)
            _table.setCols([
                {
                    width: '5%',
                    key: 'index',
                    type: 'index',
                    name: '序号'
                }, {
                    width: '95%',
                    key: 'content',
                    type: 'string',
                    name: '不符合内容'
                },
            ]);
            _table.set(errData);
        }, 30)
        this.$el.find('.examineLog').append()
        this.$el.find('.tabbox').append(this.$el.find('.exa-box'))
        //开始检测
        this.$el.find('.startExamine').click(()=>{
            this.$api.examination({
                cgscxmId: this.$data.cgscxmId
            },res=>{
                this.$api.resultsReview({
                    cgscxmId: this.$data.cgscxmId
                },res=>{
                    console.log(res);
                    var strViewTemplate,
                    arr = []
                    for(var i =0,len = res.rrList.length;i < len; i++){
                        strViewTemplate = `<div>检查图层：${res.rrList[i].examineProject+','+res.rrList[i].reviewCategory+','+res.rrList[i].recordContent}</div>`
                        arr.push(strViewTemplate)
                    }
                    this.$el.find('.examineLog').html(`${arr.join('')}`)
                    var errData = []
                    for(var i = 0,len = res.rrList.length; i<len ;i++){
                        if(res.rrList[i].recordType === '1'){
                            errData.push({
                                content: res.rrList[i].examineProject
                            })
                        }
                    }
                    setTimeout(() =>_table.set(errData),30)
                    this.$el.find('.startExamine').css('display','none')
                    // 2021-04-08 陈薪名 修改辅助检测成功后，修改状态，标识检测小图标显示状态
                    this.$api.updateReviewState({
                        reviewState:0,
                        cgscxmId: this.$data.cgscxmId
                    },(res)=>{
                    })
                })
            })
        })
        // getEvent: function (data, setData) {
        //     setData({
        //         count: 3,
        // data:,
        //     });
        // }, // 获取列表数据传值与赋值方法
    })
  },
  destroy: function () { }
}
