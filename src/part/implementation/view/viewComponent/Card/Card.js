////////////////////////////////////////////////
// 面板组件
// 戴飞
// 2020-11-23 13:10:30
////////////////////////////////////////////////


export default {
  renderData() {
    return {
    };
  },
  render() {
    let template = `
      <div class="layui-card">
        <div class="layui-card-header">
          <div class="card-title"><span class="title"></span><span class="toDoListSum"><img class="title-icon" width="25px" alt=""></span></div>
        </div>
        <div class="layui-card-body card-in-height card-list" class="toDoList">
          <div class="detail"><a></a></div>
        </div>
      </div>
    `
    this.$el.find('#detail').hide()
    for (let index = 0,len=this.$data.length; index < len; index++) {
      this.$el.find('#cardView').append(template)
      if(this.$data[index].active){
        this.$el.find('.layui-card').eq(index).addClass('card-active')
        this.$el.find('.layui-card').eq(index).css('background',this.$data[index].active)
      }
      this.title(this.$data[index],index)
      this.content(this.$data[index],index)
      this.bot(this.$data[index],index)
    }
  },
  title(item,i){
    if(!item.title) return
    this.$el.find('.title').eq(i).html(item.title.text)
    if(item.title.icon){
      this.$el.find('.title-icon').eq(i).attr('src', item.title.icon.src)
    }else if(item.title.iconText){
      this.$el.find('.toDoListSum').eq(i).empty()
      this.$el.find('.toDoListSum').eq(i).html(item.title.iconText)
      this.$el.find('.toDoListSum').eq(i).css(item.title.iconStyle)
    }
    this.$el.find('.title').eq(i).css(item.title.style?item.title.style:'')
  },
  content(item,i){
    if(!item.content) return
    for(let it of item.content){
      this.$el.find('.card-list').eq(i).append(`
        <div class="body-box">
          <div>
            <img src="${it.src?it.src:''}" alt="">
            <span style='vertical-align: bottom;'>
            ${it.title?it.title:''}
            </span>
          </div>
          <p><span class="body-count" style=${it.style?it.style:''}>${it.count?it.count:''}</span>
          <sub>${it.unit?it.unit:''}</sub>
          </p>
        </div>
    `)
    }
  },
  bot(item,i){
    if(!item.bot) return
    if(item.bot.a){
      this.$el.find('.detail').eq(i).show()
      this.$el.find('.detail a').eq(i).html(item.bot.a.text)
      this.$el.find('.detail a').eq(i).css(item.bot.a.style?item.bot.a.style:'')
    }
  },
  destroyed() {
    
  },
}