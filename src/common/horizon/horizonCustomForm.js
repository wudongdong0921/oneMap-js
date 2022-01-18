import request from '../ajax';

export default {
    prefix : "HORIZONCUSTOMDATA_",
    postData : new Map(), 
    clearPostData : function(){
        this.postData = new Map();
    },
    post : function(){
        
        this.postData.forEach(function(value,key){
            try{ 
                //console.log("=================================="+value['postUrl']);
                //console.log("=================================="+JSON.stringify(value));
                request.post({
                    url: value['postUrl'],
                    data: value,
                    async: true,
                    loading: false,
                    success: function (res) {
                        //success(res);
                    },
                });
            } catch(e){
                console.log(e);
            }
　　　　 });
    }
}