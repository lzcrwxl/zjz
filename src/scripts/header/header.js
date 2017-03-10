/**
 * Created by NHY on 2016/11/19.
 */
function Header(title,icon,open,id){
    this.template_id=id;
    this.id=Date.now();
    this.title=title;
    this.icon=icon;
    this.status=open;
    this.system=0;
    this.htmlHeader=new HtmlHeader(this.title,this.icon,this.status,this.id,this.template_id);
    this.dom=$("<tr index='"+this.id+"'></tr>");
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
        if(this.status==0){
            this.dom.find(".column-item1").click();
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
            if(that.status){
                ch.removeClass("column-select").addClass("column-select-active");
                ch.parent().siblings().find(".column-item3").remove();
                ch.parent().siblings().find(".column-item4").remove();
                father.find(".column-select").last().parents("tr").after(par);
                $(this).parents("tr").remove();
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').remove();
                $("#iframe").contents().find(".template-head").append(iframe);
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').toggle();
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').attr('show',0);
                that.status=0;
            }else{
                ch.removeClass("column-select-active").addClass("column-select");
                ch.parent().siblings().find(".column-item2").after('<span class="column-up column-item3"></span><span class="column-down column-item4"></span>');
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').remove();
                father.find(".column-select").last().parents("tr").after(par);
                if(father.find(".column-select").length){
                    father.find(".column-select").last().parents("tr").after(par);
                    $("#iframe").contents().find(".template-head").find('li:visible').last().after(iframe);
                }else{
                    father.prepend(par);
                    $("#iframe").contents().find(".template-head").prepend(iframe);
                }
                $(this).parents("tr").remove();
                that.status=1;
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').toggle();
                $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').attr('show',1);
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
            var index=$(this).parents('tr').attr('index');
            $(this).parents("tr").remove();
            var data=JSON.parse($("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').attr("data"));
            var d={"column_id":data.id};
            $.post("/index.php/Home/Station/ajax_delete_column_do.html",d,function(data){
                if(data.code==0){
                    loadingPop("删除栏目成功");
                }
            });
            $("#iframe").contents().find(".template-head").find('li[index="'+index+'"]').remove();
            that.changeUpDown();
        });
        //移入变色
        this.dom.find(".column-title").hover(function(){
            $(this).addClass("column-title-active");
        },function(){
            $(this).removeClass("column-title-active");
        });
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
