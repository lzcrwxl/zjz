/**
 * Created by NHY on 2017/1/10.
 */
(function(w) {
    function ListImage(data) {
        this.id = Date.now();
        this.title = data.title;
        this.images = data.list;
        this.type = this.bindStyle(data.template_id);
        this.scripts=this.bindEvent(data.template_id);
        this.html = $("<div class='module imageList dads-children module" +data.template_id+"' index='" + this.id + "'></div>");
        //this.script1 = '$(".imageList[index=\'' + this.id + '\'] .imageListContent").width(130*$(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").length+10); ';
        //this.script2 = 'if($(".imageList[index=\'' + this.id + '\'] .imageListPage").length){' +
        //    '$(".imageList[index=\'' + this.id + '\'] .imageListPage").jqPaginator({' +
        //    'totalPages: Math.ceil($(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").length/4),' +
        //    'visiblePages: 1,' +
        //    'currentPage: 1,' +
        //    'prev: "<li class=\'prev\'>上一页<\/li>",' +
        //    'next: "<li class=\'next\'>下一页<\/li>",' +
        //    'page: "<li class=\'page\'> {{page}} / {{totalPages}} <\/li>",' +
        //    'onPageChange: function (n) {' +
        //    '$(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").hide();' +
        //    'for(var i=1;i<=4;i++){' +
        //    '$(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").eq(4*n-i).show();' +
        //    '}' +
        //    '}' +
        //    '});' +
        //    '}';

    }

    ListImage.prototype = {
        constructor: ListImage,
        that: this,
        bindTemplate: function () {
            this.bindDom();
        },
        bindDom: function () {
            var that = this;
            var style=this.type;
            var scripts=this.scripts;
            var id='.imageList[index="'+this.id+'"]';
            var str = '<div class="module-top">' +
                '<h3>' + this.title + '</h3>' +
                '</div>' +
                '<div class="imageListInclude">' +
                '<ul class="imageListContent">' +
                this.bindImage() +
                '</ul>' +
                '</div>' +
                '<ul class="imageListPage"></ul>';
            this.html.append(str);
            this.html.append(style);
            $("#iframe").contents().find("#content").prepend(that.html);
            var idocument = $('#iframe').prop('contentWindow').document;
            var el = idocument.createElement('script');
            $(el).attr("index", that.id);
            el.text = scripts;
            idocument.querySelector(id).appendChild(el);
        },
        bindStyle:function(type){
            var str="<style>";
            switch (type){
                case 1:str+='.imageList.module1[index='+this.id+'] {background: #fff;padding-bottom: 5px;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent {padding: 1px 8px 8px 10px;width: 100%;height: 230px;box-sizing: border-box;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent:after {display: block;content: "clear";height: 0;clear: both;overflow: hidden;visibility: hidden;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li {float: left;margin-top: 10px;width: 47.5%;display: none;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li:nth-of-type(1) {display: block;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li:nth-of-type(2) {display: block;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li:nth-of-type(3) {display: block;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li:nth-of-type(4) {display: block;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li:nth-of-type(odd) {margin-right: 2%;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li:nth-of-type(even) {margin-left: 2%;}'+
                '.imageList.module1[index='+this.id+'] .imageListContent li img {width: 100%;height: 90px;}'+
                '.imageList.module1[index='+this.id+'] .imageListPage {display: -ms-flexbox;display: flex;-moz-justify-content: space-between;-ms-flex-pack: justify;justify-content: space-between;-moz-align-items: center;-ms-flex-align: center;align-items: center;padding: 0 15px;}'+
                '.imageList.module1[index='+this.id+'] .imageListPage li {cursor: pointer;font-size: 14px;}'+
                '.imageList.module1[index='+this.id+'] .imageListPage li .public {width: 70px;height: 25px;text-align: center;line-height: 25px;border: 1px solid #999;}'+
                '.imageList.module1[index='+this.id+'] .imageListPage li.prev {width: 70px;height: 25px;text-align: center;line-height: 25px;border: 1px solid #999;}'+
                '.imageList.module1[index='+this.id+'] .imageListPage li.next {width: 70px;height: 25px;text-align: center;line-height: 25px;border: 1px solid #999;}'+
                    "</style>";
                    break;
                case 2:str+='.imageList.module2[index='+this.id+']{padding-bottom:10px;background:#fff}'+
                '.imageList.module2[index='+this.id+'] .imageListInclude{margin-top:10px;width:100%;overflow-x:scroll;overflow-y:hidden}'+
                '.imageList.module2[index='+this.id+'] .imageListInclude .imageListContent:after{display:block;content:"clear";height:0;clear:both;overflow:hidden;visibility:hidden}'+
                '.imageList.module2[index='+this.id+'] .imageListInclude .imageListContent li{float:left;margin-left:10px}'+
                '.imageList.module2[index='+this.id+'] .imageListInclude .imageListContent li img{width:120px;height:90px}'+
                '.imageList.module2[index='+this.id+'] .imageListPage{display:none}'+
                    '</style>';
                    break;
                default:
                    break;
            }
            return str;
        },
        bindEvent:function(type){
            var str="";
            switch(type){
                case 1:str+='if($(".imageList[index=\'' + this.id + '\'] .imageListPage").length){' +
                    '$(".imageList[index=\'' + this.id + '\'] .imageListPage").jqPaginator({' +
                    'totalPages: Math.ceil($(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").length/4),' +
                    'visiblePages: 1,' +
                    'currentPage: 1,' +
                    'prev: "<li class=\'prev\'>上一页<\/li>",' +
                    'next: "<li class=\'next\'>下一页<\/li>",' +
                    'page: "<li class=\'page\'> {{page}} / {{totalPages}} <\/li>",' +
                    'onPageChange: function (n) {' +
                    '$(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").hide();' +
                    'for(var i=1;i<=4;i++){' +
                    '$(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").eq(4*n-i).show();' +
                    '}' +
                    '}' +
                    '});' +
                    '}';
                    break;
                case 2:str='$(".imageList[index=\'' + this.id + '\'] .imageListContent").width(130*$(".imageList[index=\'' + this.id + '\'] .imageListContent").find("li").length+10); ';
                    break;
                default:
                    break;
            }
            return str;
        },
        bindImage: function () {
            var str = '';
            var images = this.images;
            for (var i = 0; i < images.length; i++) {
                str += '<li><a href="' + images[i].url + '"><img src="' + images[i].src + '"/></a></li>';
            }
            return str;
        }
    };

    w.module_id2=function(data){
        return new ListImage(data);
    };
})(window);
$(function(){
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