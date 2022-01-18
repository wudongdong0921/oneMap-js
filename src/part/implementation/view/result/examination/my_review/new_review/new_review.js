////////////////////////////////////////////////
// 新建审查
// 2020-11-02 09:07:45
// 戴飞
////////////////////////////////////////////////

export default {
  render: function () {
    var areacode = icu.session.get('userInfo').areacodeList.join(',')
    console.log(icu.session.get('userInfo'));
    console.log(areacode);
    this.$api.getAttachmentTree( {
      "areacode": areacode
    },res=>{
      console.log(res);
      var dataSelect = res.data.map(res=>{ return {label: res.planningResultName,value : res} })
      console.log(dataSelect);
      if(dataSelect == ''){
        dataSelect.push({label:'暂无数据',value : res});
      }
      var _form = icu.templateForm({
        labelwidth: 120,
      });
      this.$el.find("#newReview").prepend(_form.$html);
      _form.$setOptions([
        [
          {
            key: "select",
            type: "select",
            formlabel: "规划成果名称",
            col: 6,
            data: dataSelect,
            verify: {
              text: "规划成果名称",
              rules: ["notNull"], 
            },
            onChange: function (e) {
              _form.set({
                uploadFilesName: e.uploadFilesName
              })
            },
          },
          {
            key: "uploadFilesName",
            col: 6,
            formlabel: "规划成果包",
            type: "input",
            readonly: true,
            verify: {
              text: "规划成果包",
              rules: ["notNull"], 
            }
          },
        ],
        [
          {
            key: "submitReview",
            type: "textarea",
            formlabel: "提交审查说明",
            col: 12,
            verify: {
              text: "提交审查说明",
              rules: ["notNull",'gre$200'], 
            }
          },
        ],
      ]);
      this.$el.find('#close').click(()=>{
        this.closeEvent()
      })
      this.$el.find("#sub").click((e) => {
        _form.get((value) => {
          console.log(value);
          this.$api.createNewReview({
            "submitReview": value.submitReview,
            "cgxxbId": value.select.cgxxbId,
            "accessToken": icu.session.get('huizheng-token'),
            "userName": icu.session.get('userInfo').id
          },res=>{
            if(res.code !== 200) return icu.alert(res.msg)
            this.closeEvent()
          })
        });
      });
    })
  },
  destroy: function () {},
};
