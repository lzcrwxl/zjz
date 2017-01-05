/**
 * Created by NHY on 2016/11/19.
 */
function Header(title,url,icon,power,system,open){
    this.title=title;
    this.url=url;
    this.icon=icon;
    this.power=power;
    this.open=true;
    this.close=open;
    this.system=system||false;
    this.htmlHeader=new HtmlHeader(this.title,this.icon,this.url,this.power);
    this.dom=$("<tr index='"+this.htmlHeader.index+"'></tr>");
    this.init();
}
Header.prototype={
    constructor:Header,
    that:this,
    //初始化
    init:function(){
        this.bindDom();
        this.bindEvent();
        this.changeUpDown();
        if(!this.close){
            this.close=true;
            this.dom.find(".column-item1").trigger("click");
        }
    },
    //绑定节点
    bindDom:function(){
        var ele="";
        if(!this.system){
            ele='<td><span class="column-title">'+this.title+'</span></td><td><span class="column-item1 column-select"></span></td><td><span class="column-edit-active column-item2"></span><span class="column-up column-item3"></span><span class="column-down column-item4"></span><span class="column-del column-item5"></span></td>';
        }else{
            ele='<td><span class="column-title column-system">'+this.title+'</span></td><td><span class="column-item1 column-select"></span></td><td><span class="column-edit-active column-item2"></span><span class="column-up column-item3"></span><span class="column-down column-item4"></span></td>';
        }
        var d=this.dom.append(ele);
        $(".right-content2-content").find("tbody").append(d);
        $("#iframe").contents().find(".template-head").append(this.htmlHeader.dom);
        //this.changeHeight();
    },
    //绑定事件
    bindEvent:function(){
        var father=$(".right-content2-content").find("tbody");
        //栏目开启
        var that=this;
        this.dom.on("click",".column-item1",function(){
            var par=$(this).parents("tr").clone(true);
            var ch=par.find(".column-item1");
            var index=$(this).parents('tr').attr('index');
            var iframe=$("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').clone(true);
            if(that.close){
                ch.removeClass("column-select").addClass("column-select-active");
                ch.parent().siblings().find(".column-item3").remove();
                ch.parent().siblings().find(".column-item4").remove();
                father.find(".column-select").last().parents("tr").after(par);
                $(this).parents("tr").remove();
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').remove();
                $("#iframe").contents().find(".template-head").append(iframe);
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').toggle();
                that.close=false;
            }else{
                if(!that.close) {
                    ch.removeClass("column-select-active").addClass("column-select");
                    ch.parent().siblings().find(".column-item2").after('<span class="column-up column-item3"></span><span class="column-down column-item4"></span>');
                    father.find(".column-select").last().parents("tr").after(par);
                    $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').remove();
                    $("#iframe").contents().find(".template-head").find('li:visible').last().after(iframe);
                    $(this).parents("tr").remove();
                }
                that.close=true;
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').toggle();
            }
            //father.find(".column-select").last().parents("tr");
            that.changeUpDown();
        });
        //向上
        this.dom.on("click",".column-item3",function(){
            $(this).siblings().removeClass("column-down-active");
            var par=$(this).parents("tr").clone(true);
            var index=$(this).parents('tr').attr('index');
            var rev=$("#iframe").contents().find(".template-head").find('li[index="'+index+'"]');
            var iframeClone=rev.clone(true);
            if($(this).parents("tr").prevAll().length) {
                //if($(this).parents("tr").nextAll().length==1) {
                //    par.find(".column-item3").addClass("column-up-active");
                //}
                rev.prev().before(iframeClone);
                rev.remove();
                $(this).parents("tr").prev().before(par);
                $(this).parents("tr").remove();
            }
            //father.find("tr").find(".column-item3").removeClass("column-up-active").end().first().find(".column-item3").addClass("column-up-active");
            //father.find("tr").find(".column-item4").removeClass("column-down-active").end().last().find(".column-item4").addClass("column-down-active");
            that.changeUpDown();
        });
        //向下
        this.dom.on("click",".column-item4",function(){
            $(this).siblings().removeClass("column-up-active");
            var par=$(this).parents("tr").clone(true);
            var index=$(this).parents('tr').attr('index');
            var rev=$("#iframe").contents().find(".template-head").find('li[index="'+index+'"]');
            var iframeClone=rev.clone(true);
            if($(this).parents("tr").nextAll().length){
                //if($(this).parents("tr").nextAll().length==1) {
                //    par.find(".column-item4").addClass("column-down-active");
                //}
                rev.next().after(iframeClone);
                rev.remove();
                $(this).parents("tr").next().after(par);
                $(this).parents("tr").remove();
            }
            //father.find("tr").find(".column-item3").removeClass("column-up-active").end().first().find(".column-item3").addClass("column-up-active");
            //father.find("tr").find(".column-item4").removeClass("column-down-active").end().last().find(".column-item4").addClass("column-down-active");
            that.changeUpDown();
        });
        //删除
        this.dom.on("click",".column-item5",function(){
            $(this).parents("tr").remove();
            var index=$(this).parents('tr').attr('index');
            $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').remove();
            that.changeUpDown();
        });
        //移入变色
        this.dom.find(".column-title").hover(function(){
            $(this).addClass("column-title-active");
        },function(){
            $(this).removeClass("column-title-active");
        });
        //编辑
        this.dom.on("click",'.column-item2',function(){
            var index=$(this).parents('tr').attr('index');
            var iframe=$("#iframe").contents().find(".template-head").find('li[index="'+index+'"]');
            var img=iframe.find('img').attr('src');
            var txt=iframe.find('p').text();
            var address=that.htmlHeader.url;
            $("#headTitle1").val(txt);
            $("#writeUrl1").val(address);
            $("#bg").show();
            $("#head-column1").show();
            changeHead(img,txt,address,index,that);
        })
    },
    //渲染最上和最下面的节点
    changeUpDown:function(){
        var father=$(".right-content2-content").find("tbody");
        father.find("tr").find(".column-item3").removeClass("column-up-active").end().first().find(".column-item3").addClass("column-up-active");
        father.find("tr").find(".column-item4").removeClass("column-down-active").end().last().find(".column-item4").addClass("column-down-active");
    },
    //改变模板头部的高度
    changeHeight:function(){
        var ele=$("#iframe").contents().find(".template-head");
        var h=ele.outerHeight();
        console.log(h);
        ele.css("bottom",-h);
    }
};
