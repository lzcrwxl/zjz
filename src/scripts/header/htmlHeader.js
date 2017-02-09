/**
 * Created by NHY on 2016/11/24.
 */
var HtmlHeaderCount=0;
function HtmlHeader(title,icon,status,id,tempalte_id){
    this.title=title;
    this.icon=icon;
    this.status=status;
    this.template_id=tempalte_id;
    this.id=id;
    var d=this.bindData();
    this.dom=$('<li index="'+this.id+'" data='+d+' show='+this.status+'></li>');
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