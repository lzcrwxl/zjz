/**
 * Created by NHY on 2016/12/22.
 */
$(function(){
    function ListImage(title,images,type){
        this.title=title;
        //this.images=images;
        this.images=images;
        this.type=type;
        this.id=Date.now();
        this.html=$("<div class='module imageList dads-children module"+this.type+"' index='"+this.id+"'></div>");
        this.script1='$(".imageList[index=\''+this.id+'\'] .imageListContent").width(130*$(".imageList[index=\''+this.id+'\'] .imageListContent").find("li").length+10); ';
        this.script2= 'if($(".imageList[index=\''+this.id+'\'] .imageListPage").length){'+
                            '$(".imageList[index=\''+this.id+'\'] .imageListPage").jqPaginator({'+
                                'totalPages: Math.ceil($(".imageList[index=\''+this.id+'\'] .imageListContent").find("li").length/4),'+
                                'visiblePages: 1,'+
                                'currentPage: 1,'+
                                'prev: "<li class=\'prev\'>上一页<\/li>",'+
                                'next: "<li class=\'next\'>下一页<\/li>",'+
                                'page: "<li class=\'page\'> {{page}} / {{totalPages}} <\/li>",'+
                                'onPageChange: function (n) {'+
                                    '$(".imageList[index=\''+this.id+'\'] .imageListContent").find("li").hide();'+
                                    'for(var i=1;i<=4;i++){'+
                                        '$(".imageList[index=\''+this.id+'\'] .imageListContent").find("li").eq(4*n-i).show();'+
                                    '}'+
                                '}'+
                            '});'+
                        '}';
        this.init();
    }
    ListImage.prototype={
        constructor:ListImage,
        that:this,
        init:function(){
          this.bindDom();
        },
        bindDom:function(){
            var that=this;
            var str='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<div class="imageListInclude">'+
                '<ul class="imageListContent">'+
                this.bindImage()+
                '</ul>'+
                '</div>'+
                '<ul class="imageListPage"></ul>';
            this.html.append(str);
            $("#iframe").contents().find("#content").prepend(that.html);
            var idocument = $('#iframe').prop('contentWindow').document;
            var el = idocument.createElement('script');
            $(el).attr("index",that.id);
            if(that.type==1){
                el.text=that.script2;
                idocument.body.appendChild(el);
            }else{
                el.text=that.script1;
                idocument.body.appendChild(el);
            }
        },
        bindImage:function(){
            var str='';
            var images=this.images;
            for(var i=0;i<images.length;i++){
                str+='<li><a href="'+images[i].url+'"><img src="'+images[i].image+'"/></a></li>';
            }
            return str;
        }
    };

    var listImageIndex=0;
    $(".content-left-list").on("click","#moduleID02",function(){
        var html=template("arttemplate");
        $("#bg").show();
        $("body").append(html);
    });
    $("body").on("click",".list-image-active",function(){
       $(".list-image-active").removeClass("active");
        $(this).addClass("active");
    });
    $("body").on("mouseenter",".list-image-added",function(){
        $(this).append("<div class='del'><span>×</span></div>");
    });
    $("body").on("mouseleave",".list-image-added",function(){
        $(this).find(".del").remove();
    });
    $("body").on("click",".list-image-added .del span",function(){
        $(this).parents(".list-image-added").remove();
        $(".list-image-count span").html($(".list-image-images").find("li").length-1);
    });
    $("body").on("click",".list-image-pop-cancel",function(){
        $("#bg1").hide();
        $(".list-image-pop").remove();

    });
    $("body").on("click",'.column-cancel-list-image',function(){
        $("#bg").hide();
        $("#head-column-list-image").remove();
        listImageIndex=0;
    });
    $("body").on("change","#list-image-image",function(){
        var url=getUrl($(this)[0].files[0]);
        $(".list-image-image-select").css("backgroundImage","url("+url+")");
    });
    $("body").on("click",".list-image-pop-add",function(){
        var url=getUrl($("#list-image-image")[0].files[0]);
        var file=$("#list-image-image");
        //var nameId="listimage"+listImageIndex;
        file.attr({"id":"listimage"+listImageIndex,"name":"listimage"+listImageIndex});
        file.css("display",'none');
        var href=$("#list-image-link").val();
        var str=$('<li class="list-image-added" data-href="'+href+'"><img src="'+url+'" alt=""></li>');
        str.append(file);
        $(".list-image-select").before(str);
        $(".list-image-count span").html($(".list-image-images").find("li").length-1);
        $(".list-image-pop").remove();
        $("#bg1").hide();
        listImageIndex++;
    });
    $("body").on("click",'.list-image-select',function(){
        $("#bg1").show();
        var str='<div class="list-image-pop">';
            str+='<div class="head-column-head"><span>选择图片</span><span class="list-image-pop-cancel">×</span></div>';
            str+='<div class="list-image-image-select"><input type="file" id="list-image-image"></div>';
            str+='<div class="list-image-set-link"><label for="">链接地址：</label><input type="text" id="list-image-link" style="ime-mode:disabled"></div>';
            str+='<div class="list-image-btn"><span class="list-image-pop-add">确定</span><span class="list-image-pop-cancel">取消</span></div>';
            str+='</div>';
        $("body").append(str);
    });
    //上传显示图片
    $("body").on("click",".list-image-add",function(){
        var title=$(".list-image-title").find("input").val();
        var type=$(".list-image-active.active").attr("index");

        function getImage(){
            var buf=[];
            var lis=$(".list-image-images").find("li");
            if(lis.length>1){
                for(var i=0;i<lis.length-1;i++){
                    var obj={};
                    obj['image']=getUrlImages($(lis[i]).find("input")[0]);
                    obj['url']=$(lis[i]).attr("data-href");
                    buf.push(obj);
                }
            }
            return buf;
        }
        new ListImage(title,getImage(),type);
        $("#bg").hide();
        $("#head-column-list-image").remove();

        listImageIndex=0;
    });

});
