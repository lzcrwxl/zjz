/**
 * Created by NHY on 2017/1/19.
 */
(function(){
    var icon='';
    var title="";
    var power="";
    //打开弹窗
    $("#add-column").click(function(){
        $("#bg").show();
        var temp=template("headColumnTemp");
        $("#head-column").html(temp);
        $("#head-column").show();
        $(".head-column-btn2").show();
    });
    //常规和高级切换
    $("body").on('click',"column-add-common",function(){
        $(".head-column-content1").show();
        $(".head-column-content2").hide();
        $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
    });
    //图标选择
    $("body").on('click',"input[name='column-img']",function(){
        if($("#imgselect").is(":checked")){
            $("#seticon").show();
        }else{
            $("#seticon").hide();
        }
    });
    $("body").on('click',".column-cancel",function(){
        delColumn();
    });
    $("body").on('click',".column-add-btn",function(){
        addDetail();
    });
    $("body").on('click',".column-back-btn",function(){
        addBack();
    });
    //设置可见
    $("body").on('click',"input[name='column-link']",function(){
        if($("#selecticon").is(":checked")){
            $(".column-link").show();
        }else{
            $(".column-link").hide();
        }
    });
    //选择图标
    $("body").on('click',".column-icon-content li",function(){
        $(this).addClass("icon-active").siblings().removeClass("icon-active");
    });
    //选定图标
    $("body").on('click',"#iconSure",function(){
        $(".column-icon-content").find("li").each(function(){
            if($(this).hasClass("icon-active")){
                icon=$(this).find("img")[0].src;
                $(".column-add-btn").attr("data-url",icon);
            }

        });
        addBack();
    });
    //新增节点
    $("body").on('click',"#addHeader",function(){
        var data={};
        title=$("#headTitle").val();
        power=$("input[name='column-power']:checked").val();
        var value='';
        $("input[name='column-img']").each(function(){
            if($(this).is(":checked")) value=$(this).val();
        });
        switch(value){
            case '1':
                icon=getAbsoluteUrl("/Public/style/station/images/template1/head1.png");
                break;
            case '2':
                icon=false;
                break;
            case '3':
                if($('#addHeaderIcon').val()){
                    icon=$('#addHeaderIcon').attr('data-url');
                }else{
                    icon=$(".column-add-btn").attr("data-url");
                }
                break;
            default:break;
        }
        data.text=title;
        data.status=power;
        data.icon=icon;
        $.post("/index.php/Home/Station/ajax_add_column_do.html",data,function(d){
            console.log(d);
            if(d.code==0){
                new Header(d.data.text, d.data.icon, d.data.status, d.data.id);
                delColumn();
            }else{
                alert("添加失败");
            }
        },"json");


    });
    function delColumn(){
        $("#bg").hide();
        $("#head-column").hide();
        $("#head-column").empty();
    }
    function addDetail(){
        $("#bg1").show();
        var temp=template("headSetImg");
        $(".head-column-set-img").html(temp);
        $(".head-column-set-img").show();
    }
    function addBack(){
        $("#bg1").hide();
        $(".head-column-set-img").hide();
        $(".head-column-set-img").empty();
    }
})();

//模板显示图文
$("#hasImg1").click(function(){
    $("#iframe").contents().find(".template-head li").each(function(){
        $(this).find("img").show();
        $(this).css("textAlign","left");
    });
});
$("#hasImg2").click(function(){
    $("#iframe").contents().find(".template-head li").each(function(){
        $(this).find("img").hide();
        $(this).css("textAlign","center");
    });
});
//获取图片地址
$('body').on("change","#addHeaderIcon",function(){
    $.ajaxFileUpload({
        url: "/index.php/Home/Station/ajax_upload_images",
        type: 'post',
        data: {'file_name': 'addHeaderIcon'},
        secureuri: false,
        fileElementId: 'addHeaderIcon',
        dataType: 'json',
        success: function (data) {
            var url=data.data.src;
            $("#addHeaderIcon").attr("data-url",url);
        },
        error: function (data) {
            alert('图片选取失败'+data);
        }
    });
});
//删除模块
$("body").on("click",".column-item5",function(){
    var index=$(this).parents("tr").attr("index");
    var iframe=$("#iframe").contents().find(".template-head").find('li[index="'+index+'"]');
    var data=JSON.parse(iframe.attr("data"));
    var d={"column_id":data.id};
    $.post("/index.php/Home/Station/ajax_delete_column_do.html",d,function(data){
        if(data.code==0){
            alert("删除栏目成功");
        }
    });
});