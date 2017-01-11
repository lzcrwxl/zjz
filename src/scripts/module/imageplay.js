/**
 * Created by NHY on 2017/1/11.
 */
(function(w){
    function ImagePlay(title,type,images,interval,duration,text){
        this.title=title||"轮播多图";
        this.type=type;
        this.images=images;
        this.interval=4000;
        this.duration=500;
        this.text=text;
        this.id=Date.now();
        this.html=$('<div class="module imagePlay'+this.id+'" index='+this.id+'></div>');
        this.init();
    }
    ImagePlay.prototype={
        constructor:ImagePlay,
        init:function(){
            this.bindDom();
            this.bindEvent();
        },
        bindDom:function(){
            var dom=this.madeTemplateDom();
            var that=this;
            this.html.append(dom);
            if(that.text==2) this.html.find("h3").hide();
            $("#iframe").contents().find("#content").prepend(that.html);
            var idocument = $('#iframe').prop('contentWindow').document;
            var el = idocument.createElement('script');
            $(el).attr("index",that.id);
            el.text=this.madeTemplateScript();
            console.log(idocument);
            idocument.body.appendChild(el);
        },
        madeTemplateDom:function(){
            var items="";
            var style="";
            for(var i=0;i<this.images.length;i++){
                items+='<div class="section'+this.id+'" id="section'+(this.id+i)+'" onclick="window.location=\''+this.images[i].url+'\'"><h3>'+this.images[i].text+'</h3></div>';
                style+='#section'+(this.id+i)+' {background-image: url('+this.images[i].image+');  }';
            }
            var str='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<div class="imagePlayContainer">'+
                '<div class="sections'+this.id+'">'+
                items+
                '</div>'+
                '</div>'+
                '<style>'+
                '.imagePlayContainer {width: 100%;height: 200px;overflow: hidden;}'+
                '.sections'+this.id+',.section'+this.id+' {height:100%;}'+
                '.imagePlayContainer,.sections'+this.id+' {position: relative;}'+
                '.section'+this.id+' {background-color: #000;background-size: cover;background-position: 50% 50%;text-align: center;color: white;}'+
                style+
                '.pages li{list-style-type:none;width:6px;height:6px;border-radius:6px;background-color:white}'+
                '.pages li:hover{box-shadow:0 0 2px 1px white}'+
                '.pages li.active'+this.id+'{background-color:orange;box-shadow:0 0 2px 1px orange}'+
                '.pages{position:absolute;}.pages.horizontal{left:50%;transform:translateX(-50%);bottom:5px}'+
                '.pages.horizontal li{display:inline-block;margin-right:10px}'+
                '.pages.horizontal li:last-child{margin-right:0}'+
                '.pages.vertical{right:5px;top:50%;transform:translateY(-50%)}'+
                '.pages.vertical li{margin-bottom:10px}'+
                '.pages.vertical li:last-child{margin-bottom:0}'+
                '</style>';
            return str;
        },
        bindStyle:function(type){
            var style="";
            switch(parseInt(type)){
                case 1:;
                    break;
                default:
                    break;
            }
            return style;
        },
        bindEvent:function(type){
            var script="";
            switch(parseInt(type)){
                case 1:script= '$(".imagePlay'+this.id+'").PageSwitch({'+
                    'selectors : {'+
                    'sections : ".sections'+this.id+'",'+
                    'section : ".section'+this.id+'",'+
                    'pages : ".pages", '+
                    'active : ".active"'+
                    '},'+
                    'direction:"horizontal",'+
                    'easing:"ease-in",'+
                    'duration:'+this.duration+','+
                    'interval: '+this.interval+','+
                    'autoPlay:true,'+
                    'loop:false'+
                    '});';
                    break;
                default:
                    break;
            }
            return script;
        },
        madeTemplateScript:function(){
            var script= '$(".imagePlay'+this.id+'").PageSwitch({'+
                'selectors : {'+
                'sections : ".sections'+this.id+'",'+
                'section : ".section'+this.id+'",'+
                'pages : ".pages", '+
                'active : ".active"'+
                '},'+
                'direction:"horizontal",'+
                'easing:"ease-in",'+
                'duration:'+this.duration+','+
                'interval: '+this.interval+','+
                'autoPlay:true,'+
                'loop:false'+
                '});';
            return script;
        }
    };
    w.module_id3=function(data){
        return new ImagePlay(data);
    }
})(window);
$(function(){
    $("#iframe").load(function(){
        var listPlayIndex=0;
        $(".content-left-list").on("click","#moduleID05",function(){
            var html=template("imageplaytemplate");
            $("#bg").show();
            $("body").append(html);
        });
        $("body").on("click",".column-cancel-list-play",function(){
            $("#bg").hide();
            $("#head-column-list-play").remove();
        });
        $("body").on('click',".column-add-common-list-play",function(){
            $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
            $(".list-play-content").show();
            $(".list-play-content1").hide();
        });
        $("body").on('click',".column-add-special-list-play",function(){
            $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
            $(".list-play-content").hide();
            $(".list-play-content1").show();
        });
        $("body").on("click",'.list-play-select',function(){
            $("#bg1").show();
            var str='<div class="list-play-pop">';
            str+='<div class="head-column-head"><span>选择图片</span><span class="list-play-pop-cancel">×</span></div>';
            str+='<div class="list-play-image-select"><input type="file" id="list-play-image"></div>';
            str+='<div class="list-play-set-link"><label for="">链接地址：</label><input type="text" id="list-play-link" style="ime-mode:disabled"></div>';
            str+='<div class="list-play-set-link"><label for="">描述内容：</label><input type="text" id="list-play-text"></div>';
            str+='<div class="list-play-btn"><span class="list-play-pop-add">确定</span><span class="list-play-pop-cancel">取消</span></div>';
            str+='</div>';
            $("body").append(str);
        });
        $("body").on("click",".list-play-pop-cancel",function(){
            $(".list-play-pop").remove();
            $("#bg1").hide();
        });
        $("body").on("change","#list-play-image",function(){
            var url=getUrl($(this)[0].files[0]);
            $(".list-play-image-select").css("backgroundImage","url("+url+")");
        });
        $("body").on("click",".list-play-pop-add",function(){
            var url=getUrl($("#list-play-image")[0].files[0]);
            var file=$("#list-play-image");
            //var nameId="listimage"+listImageIndex;
            file.attr({"id":"listplay"+listPlayIndex,"name":"listplay"+listPlayIndex});
            file.css("display",'none');
            var href=$("#list-play-link").val();
            var text=$("#list-play-text").val();
            var str=$('<li class="list-play-added" data-href="'+href+'" data-text="'+text+'"><img src="'+url+'" alt=""></li>');
            str.append(file);
            $(".list-play-select").before(str);
            $(".list-play-count span").html($(".list-play-images").find("li").length-1);
            $(".list-play-pop").remove();
            $("#bg1").hide();
            listPlayIndex++;
        });
        $("body").on("click",".list-play-add",function(){
            var title=$(".list-play-title").find("input").val();
            var type=$(".list-play-active.active").attr("index");
            var show=$("[name='list-play-showtext']:checked").val();
            //$.ajaxFileUpload({
            //    url: "www.baidu.com",
            //    type: 'post',
            //    data:getImages().imageUrl,
            //    secureuri: false,
            //    fileElementId: getImages().fileUrl,
            //    dataType: 'json',
            //    success: function (data) {
            //        var images=[
            //            {
            //                "image":"../images/1.jpg",
            //                "url":"www.baidu.com",
            //                "text":"好好学习"
            //            },
            //            {
            //                "image":"../images/3.jpg",
            //                "url":"www.baidu.com",
            //                "text":"天天向上"
            //            },
            //            {
            //                "image":"../images/2.jpg",
            //                "url":"www.baidu.com",
            //                "text":"good good study day day up"
            //            },
            //            {
            //                "image":"../images/4.jpg",
            //                "url":"www.baidu.com",
            //                "text":"good good study day day up"
            //            }
            //        ];
            //        new ImagePlay(title,type,images,null,null,show);
            //        $("#bg").hide();
            //        $("#head-column-list-play").remove();
            //    },
            //    error: function (data) {
            //        var images=[
            //            {
            //                "image":"../images/1.jpg",
            //                "url":"www.baidu.com",
            //                "text":"好好学习"
            //            },
            //            {
            //                "image":"../images/3.jpg",
            //                "url":"www.baidu.com",
            //                "text":"天天向上"
            //            },
            //            {
            //                "image":"../images/2.jpg",
            //                "url":"www.baidu.com",
            //                "text":"good good study day day up"
            //            },
            //            {
            //                "image":"../images/4.jpg",
            //                "url":"www.baidu.com",
            //                "text":"good good study day day up"
            //            }
            //        ];
            //        new ImagePlay(title,type,images,null,null,show);
            //        $("#bg").hide();
            //        $("#head-column-list-play").remove();
            //    }
            //});
            //
            //function getImages(){
            //    var fileUrl=[];
            //    var imageUrl=[];
            //    var lis=$(".list-play-images").find("li");
            //    if(lis.length>1){
            //        for(var i=0;i<lis.length-1;i++){
            //            var obj={};
            //            var id=$(lis[i]).find("input").attr("id");
            //            obj[id]=$(lis[i]).attr("data-href");
            //            obj[id+"text"]=$(lis[i]).attr("data-text");
            //            fileUrl.push(id);
            //            imageUrl.push(obj);
            //        }
            //    }
            //    return {
            //        fileUrl:fileUrl,
            //        imageUrl:imageUrl
            //    };
            //}





            //实验
            function getImage(){
                var buf=[];
                var lis=$(".list-play-images").find("li");
                if(lis.length>1){
                    for(var i=0;i<lis.length-1;i++){
                        var obj={};
                        obj['image']=getUrlImages($(lis[i]).find("input")[0]);
                        obj['url']=$(lis[i]).attr("data-href");
                        obj['text']=$(lis[i]).attr("data-text");
                        buf.push(obj);
                    }
                }
                return buf;
            }
            new ImagePlay(title,type,getImage(),null,null,show);
            $("#bg").hide();
            $("#head-column-list-play").remove();
            listImageIndex=0;
        });
    });

});
