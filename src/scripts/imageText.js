/**
 * Created by NHY on 2016/12/12.
 */
function ImageText(title,img,url,text,module){
    this.title=title||"图文展示";
    this.img=img;
    this.url=url||" ";
    this.text=text||' ';
    this.module="module"+module;
    this.dom=$("<div class='module imageText dads-children'></div>");
    this.init();
}
ImageText.prototype={
    constructor:ImageText,
    init:function(){
        this.bindDom();
        this.bindEvent();
    },
    bindDom:function(){
        this.dom.addClass(this.module);
        var str='<div class="module-top">'+
            '<h3>'+this.title+'</h3>'+
            '</div>'+
            '<div>'+
            '<a href="'+this.url+'">'+
            '<img src="'+this.img+'" alt=""></a>'+
            '<p>'+this.text+'</p>'+
            '</div>';
        this.dom.html(str);
        $("#iframe").contents().find('#content').prepend(this.dom);
    },
    bindEvent:function(){
    }
};