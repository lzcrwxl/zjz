/**
 * Created by NHY on 2017/2/13.
 */
(function(w) {
    function ListImage(data) {
        this.moduleObj={
            img:'/Public/Style/station/images/left13.jpg',
            name:'列表多图'
        };
        this.moduleName='列表多图';
        this.id = Date.now();
        this.title = data.title;
        this.images = data.list;
        this.template_id=data.template_id;
        this.type = this.bindStyle(data.template_id);
        this.scripts=this.bindEvent(data.template_id);
        var d=this.bindData();
        this.html = $("<div class='module imageList dads-children module" +data.template_id+"' index='" + this.id + "' data="+d+"></div>");
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
            $("#content").prepend(that.html);
            var el = document.createElement('script');
            $(el).attr("index", that.id);
            el.text = scripts;
            document.querySelector(id).appendChild(el);
        },
        bindStyle:function(type){
            var str="<style>";
            switch (parseInt(type)){
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
            switch(parseInt(type)){
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
        },
        bindLoaded:function(){
            var str='<li index="'+this.id+'"><img src="'+this.moduleObj.img+'" alt=""><p>'+this.moduleObj.name+'</p></li>';
            $("#loaded-modules",window.parent.document).prepend(str);
        },
        bindData:function(){
            var data={};
            data.module_id="3";
            data.template_id=this.template_id;
            data.title=this.title;
            data.list=this.images;
            data=JSON.stringify(data);
            return data;
        }
    };

    w.module3=function(data){
        return new ListImage(data);
    };
})(window);