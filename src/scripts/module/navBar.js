/**
 * Created by NHY on 2017/3/6.
 */
(function(w){
    function NavBar(data){
        this.moduleObj={
            img:'/Public/Style/station/images/left11.jpg',
            name:'魔方导航'
        };
        this.id=Date.now();
        this.template_id=data.template_id;
        this.list=data.list;
        var d=this.bindData();
        this.html=$("<div class='module dads-children navigation module"+this.template_id+"' index='"+this.id+"' data="+d+"></div>")
    }
    NavBar.prototype={
        constructor:NavBar,
        bindTemplate:function(){
            this.bindDom();
        },
        bindDom:function(){
            var that=this;
            var lis='';
            for(var i=0;i<this.list.length;i++){
                lis+="<li><a href='"+this.list[i].url+"'><img src='"+this.list[i].img+"'/><p>"+this.list[i].title+"</p></a></li>"
            }
            var dom='<ul>'+
                    lis+
                    '</ul>';
            this.html.append(dom);
            $("#iframe").contents().find("#content").prepend(that.html);
        },
        bindStyle:function(type){
            var str='';
            switch(parseInt(type)){
                case 1:
                    break;
                case 2:;
                    break;
                default:
                    break;
            }
            return str;
        },
        bindEvent:function(type){
            var str='';

            switch(parseInt(type)){
                case 1:
                    break;
                case 2:
                    break;
                default:
                    break;
            }
            return str;
        },
        bindLoaded:function(){
            var str='<li index="'+this.id+'"><img src="'+this.moduleObj.img+'" alt=""><p>'+this.moduleObj.name+'</p></li>';
            $("#loaded-modules").prepend(str);
        },
        bindData:function(){
            var data={};
            data.module_id=7;
            data.template_id=this.template_id;
            data.list=this.list;
            data=JSON.stringify(data);
            return data;
        }
    };
    w.module_id7=function(data){
        return new NavBar(data);
    };
})(window);


$("body").on("click","#moduleID00",function(){
    var html=template("navBarTemplate");
    $("body").append(html);
    $("#bg").show();
});
$("body").on("click",".column-cancel-navbar",function(){
    $("#navBar").remove();
    $("#bg").hide();
});
$("body").on("click","#add-nav",function(){
    var html=template("navBarPop");
    $("body").append(html);
    $("#bg1").show();
});
$("body").on("click",".navbar-pop-cancel",function(){
    $(".navBarPop").remove();
    $("#bg1").hide();
});
$("body").on("click",".navbar-pop-add",function(){
    var title=$("#navTitle").val();
    var url=$("#navUrl").val();
    var img=$("#navImg").attr("data-url");

    var data={};
    data.title=title;
    data.url=url;
    data.img=img+"";

    data=JSON.stringify(data);

    var html='<tr data=\''+data+'\'>'+
    '<td><span>'+title+'</span></td>'+
    '<td><span>'+url+'</span></td>'+
    '<td><img src="'+img+'" alt=""></td> ' +
    '<td><span class="del">×</span></td>'+
   '</tr>';
    $("#navContent").append(html);
    $(".navBarPop").remove();
    $("#bg1").hide();
});

$("body").on("change","#navImg",function(){
    $.ajaxFileUpload({
        url: "/index.php/Home/Station/ajax_upload_images",
        type: 'post',
        data: {'file_name': 'navImg'},
        secureuri: false,
        fileElementId: 'navImg',
        dataType: 'json',
        success: function (data) {
            var url=data.data.src;
            console.log(data);
            $("#navImg").attr("data-url",url);
        },
        error: function (data) {
            loadingPop('上传失败');
        }
    });
});

$("body").on("click","#navBar table .del",function(){
    $(this).parents("tr").remove();
});

$("body").on("click",".navbar-add",function(){
    var data={};
    data.template_id=1;
    data.list=[];
    var p=$("#navContent").find("tr");
    var len=p.length;
    for(var i=0;i<len;i++){
        var d=p.eq(i).attr("data");
        d= JSON.parse(d);
        data.list.push(d);
    }
    module_id7(data).bindTemplate();
    $("#navBar").remove();
    $("#bg").hide();
});