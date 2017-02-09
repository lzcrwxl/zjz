/**
 * Created by NHY on 2017/1/19.
 */
(function(w){
    function HtmlHeader(data,id){
        this.id=id;
        this.template_id=data.id;
        this.title=data.text;
        this.icon=data.icon;
        this.status=data.status;
        this.url=data.url;
        var d=this.bindData();
        this.dom=$('<li index="'+this.id+'" data='+d+' show='+this.status+'></li>');
        if( window.top==window.self){
            if(this.status==0){
                this.dom.hide();
            }
        }
        this.init();
    }
    HtmlHeader.prototype={
        constructor:HtmlHeader,
        init:function(){
            this.bindDom();
            this.bindEvent();
        },
        bindDom:function(){
            var img="<img src='"+this.icon+"' />";
            var p="<p>"+this.title+"</p>";
            this.dom.append(img);
            this.dom.append(p);
            $(".template-head").append(this.dom);
        },
        bindEvent:function(){
            var that=this;
            this.dom.on("click",function(){
                window.location.href=that.url;
                if(window.top!==window.self){
                    $("#content-middle-top input",window.parent.document).val(that.url);
                    $("#loaded-modules",window.parent.document).empty();
                    $(".right-content2-content tbody",window.parent.document).empty();
                    //parent.location.reload();
                }
            });
        },
        bindData:function(){
            var data={};
            data.id=this.template_id;
            data.text=this.title;
            data.status=this.status;
            data.icon=this.icon;
            var dataStringify=JSON.stringify(data);
            return dataStringify;
        }

    };
    w.header=function(data,id){
        return new HtmlHeader(data,id);
    }
})(window);