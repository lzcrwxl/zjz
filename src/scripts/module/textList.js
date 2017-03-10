/**
 * Created by NHY on 2017/2/22.
 */
(function(w){
    function TextList(data){
        this.moduleObj={
            img:'/Public/Style/station/images/left14.jpg',
            name:'文章列表'
        };
        this.id=Date.now();
        this.title=data.title||"文章列表";
        this.list=data.list;
        this.page_size=data.page_size;
        this.template_id=data.template_id;
        this.module=this.bindStyle(data.template_id);
        var d=this.bindData();
        this.dom=$("<div class='module textList dads-children module"+data.template_id+"' index="+this.id+" data="+d+"></div>");
    }
    TextList.prototype={
        constructor:TextList,
        bindTemplate:function(){
            this.bindDom();
            this.bindLoaded();
        },
        bindDom:function(){
            var lis="";
            for(var i=0;i<this.page_size;i++){
                lis+='<li><a href="'+this.list[i].url+'">'+this.list[i].title+'</a></li>';
            }
            var str='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<ul>'+
                lis+
                '</ul>';
            this.dom.html(str);
            this.dom.append(this.module);
            $("#iframe").contents().find('#content').prepend(this.dom);
        },
        bindStyle:function(id){
            var str='';
            switch(parseInt(id)){
                case 1:str+='<style>'+
                '.textList.module1[index="'+this.id+'"]{background: #fff;}'+
                '.textList.module1[index="'+this.id+'"] ul li{  height: 50px;  line-height: 50px;  font-size:12px ;  padding-left:10%;  padding-right:30%;  position: relative;  border-bottom: 1px solid #eee;  white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;  }'+
                '.textList.module1[index="'+this.id+'"] ul li:before{  line-height: 12px;  width:12px;  height: 12px;  content: ".";  position: absolute;  margin-top: 2px;  left:4%;  font-size: 50px;  }'+
                '.textList.module1[index="'+this.id+'"] ul li:after{  line-height: 12px;  width:12px;  height: 12px;  content: ">";  position: absolute;  top:25px;  margin-top: -6px;  right:10%;  font-size: 20px;  }'+
                    '</style>';
                    break;
                default:
                    break;
            }
            return str;
        },
        bindEvent:function(type){
        },
        bindLoaded:function(){
            var str='<li index="'+this.id+'"><img src="'+this.moduleObj.img+'" alt=""><p>'+this.moduleObj.name+'</p></li>';
            $("#loaded-modules").prepend(str);
        },
        bindData:function(){
            var data={};
            data.module_id=4;
            data.template_id=this.template_id;
            data.title=this.title;
            data.page_size=this.page_size;
            data.list=this.list;
            data=JSON.stringify(data);
            return data;
        }
    };

    w.module_id4=function(data){
        return new TextList(data);
    };
})(window);
(function(){
    $("#iframe").load(function() {
        $(".content-left-list").on("click", "#moduleID03", function () {
            var html=template('textlistTemplate');
            $("body").append(html);
            $("#bg").show();
        });
        $("body").on("click",".column-cancel-text-list",function(){
            $("#head-column-text-list").remove();
            $("#bg").hide();
        });
        //模块内容选择
        $("body").on("click",".text-list-add",function(){
            var data={};
            data.title=$(".text-list-title").find("input").val();
            data.template_id=$(".list-image-active.active").attr("index");
            data.page_size=$(".text-list-count").find("input").val();
            $.ajax({
                type: "POST",
                url: "/index.php/Home/Station/ajax_get_module_art_data.html",
                data:data.page_size,
                dataType:"json",
                success: function(msg){
                    data.list=msg.data;
                    module_id4(data).bindTemplate();
                    $("#head-column-text-list").remove();
                    $("#bg").hide();
                },
                error:function(){
                    loadingPop("获取文章列表失败");
                }
            });
        });
    });
})();