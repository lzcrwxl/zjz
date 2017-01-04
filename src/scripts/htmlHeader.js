/**
 * Created by NHY on 2016/11/24.
 */
var HtmlHeaderCount=0;
function HtmlHeader(title,icon,url,power){
    this.title=title;
    this.icon=icon;
    this.url=url;
    this.power=power;
    this.index=HtmlHeaderCount++;
    this.dom=$('<li index="'+this.index+'"></li>');
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
    },
    bindEvent:function(){
        var that=this;
        this.dom.on("click",function(){
            window.location.href=that.url;
        });
    }
};