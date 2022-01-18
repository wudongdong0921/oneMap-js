////////////////////////////////////////////////
// 系统辅助审查弹出框
// 李雪
// 2020-10-15 11:16:38
////////////////////////////////////////////////

export default {
  render: function () {
      console.log(this.$data.examinProject)
      this.$el.find("#examineDailog").append($("<div><div class='inputbox'><label>检查内容</label></div><div class='tabbox'></div><div class='btnbox'><div class='layui-btn layui-btn-ys back'> 返回</div><div class='layui-btn layui-btn-ys startExamine'> 开始检测</div></div><div>"))
      if(this.$data.readonly){
          this.$el.find(".startExamine").hide();
      }
      this.$el.find('.back').unbind().bind('click', () => {
        this.closeEvent()
      })
      console.log(this.$data.cgscxmId);
      this.$api.resultsReview({
        cgscxmId: this.$data.cgscxmId
      },res=>{
          console.log(res);
          var inputDemo = new icu.formElement.input({
              size: 'normal', // 自定义Class属性
              inputType: 'text', // 可选值 text （文本输入框） password （密码提示框）
              readonly: true,  // 设置是否只读
              placeholder: res.examineContent
          });
          var strViewTemplate,
              arr = []
          for(var i =0,len = res.rrList.length;i < len; i++){
                strViewTemplate = `<div>检查图层：${res.rrList[i].examineProject+','+res.rrList[i].reviewCategory+','+res.rrList[i].recordContent}。检查通过。</div>`
                arr.push(strViewTemplate)
          }
          this.$el.find('.inputbox').append(inputDemo.html)
              var html = $(`
              <div class="layui-tab">
                  <ul class="layui-tab-title">
                      <li class="layui-this">检查结果</li>
                      <li>检查日志</li>
                  </ul>
                  <div class="layui-tab-content">
                      <div class="layui-tab-item layui-show examineResult"></div>
                      <div class="layui-tab-item examineLog" >
                          ${arr.join('')}
                      </div>                
                  </div>
              </div>
          `)

          var _table = new icu.datagrid();

          // getEvent: function (data, setData) {
          //     setData({
          //         count: 3,
          // data:,
          //     });
          // }, // 获取列表数据传值与赋值方法
          var errData = []
          for(var i = 0,len = res.rrList.length; i<len ;i++){
              if(res.rrList[i].recordType === '1'){
                  errData.push({
                      content: res.rrList[i].examineProject
                  })
              }
          }
          setTimeout(() => {
              html.find('.examineResult').append(_table.html)
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
              console.log(errData);
              _table.set(errData);
          }, 30)
          html.find('.examineLog').append()
          this.$el.find('.tabbox').append(html)
      })
  },
  destroy: function () { }
}
