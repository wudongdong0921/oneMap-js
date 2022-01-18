import fileManage from "./file"

export default {
    render(){
        var that = this;

        var FileManage = new fileManage(this.$el);
        FileManage.addChild(this.$data.subMenuData);
        FileManage.on('subMenuClick', function(data) {
            that.$api.fileTree(data.id,(res)=>{
                FileManage.setTree(res.data);
            })
        })

    },
    destory(){}
}
