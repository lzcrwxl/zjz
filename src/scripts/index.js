/*
* @Author: iceStone
* @Date:   2016-01-26 23:10:20
* @Last Modified by:   iceStone
* @Last Modified time: 2016-01-26 23:12:46
*/

//'use strict';
$(function(){
    $("#iframe").load(function(){
        //左边头部切换
        $(".content-left-top").find("div:nth-of-type(1)").on("click",function(){
            $(this).addClass("content-left-top-active").siblings().removeClass("content-left-top-active");
            $("#modules").show();
            $("#loaded-modules").hide();
        });
        $(".content-left-top").find("div:nth-of-type(2)").on("click",function(){
            $(this).addClass("content-left-top-active").siblings().removeClass("content-left-top-active");
            $("#modules").hide();
            $("#loaded-modules").show();
        });
        //左边导航栏切换
        $(".content-left-nav").find("li").on("click",function(){
            $(this).addClass("content-left-nav-active").siblings().removeClass("content-left-nav-active");
        });
        //右边头部切换
        $(".content-right-top").find("div").on("click",function(){
            $(this).addClass("content-right-top-active").siblings().removeClass("content-right-top-active");
        });
        //右边导航栏切换
        $(".content-right-nav").find("li").on("click",function(){
            $(this).addClass("content-right-nav-active").siblings().removeClass("content-right-nav-active");
        });
        //右边主题切换
        $(".content-right-tab").find("span").on("click",function(){
            $(this).addClass("content-right-tab-active").siblings().removeClass("content-right-tab-active");
        });
        //主题具体切换
        $(".content-right-middle").find("ul").find("li").on("click",function(){
            $(this).addClass("list-active").siblings().removeClass("list-active");
        });
        //显示二维码
        $("#barcode").togglefn(function(){
            var that=this;
            $.ajax({
                type: "GET",
                url: "/index.php/home/station/ajax_get_conf.html",
                dataType: "json",
                success:function(data){
                    if(data.code==0){
                        $(that).after('<div class="url-barcode"><img src="'+data.data.wap.qr+'" alt=""><span></span></div>');
                    }else{
                        alert("请求失败");
                    }
                },
                error:function(){
                    alert("请求错误");
                }
            });

        },function(){
            $(".url-barcode").remove();
        });
        //栏目切换
        $(".right-content2-change1").on("click",function(){
            $(this).addClass("right-content2-top-active").siblings().removeClass("right-content2-top-active");
            $(".right-content2-content").show();
            $(".right-content2-content1").hide();
        });
        $(".right-content2-change2").on("click",function(){
            $(this).addClass("right-content2-top-active").siblings().removeClass("right-content2-top-active");
            $(".right-content2-content1").show();
            $(".right-content2-content").hide();
        });
        //右边切换
        $(".right-xitong").on("click",function(){
            $("#right-content2").hide();
            $("#right-content4").show();
        });
        $(".right-lanmu").on("click",function(){
            $("#right-content4").hide();
            $("#right-content2").show();
        });
    });
});