/**
 * Created by NHY on 2016/11/19.
 */


//头部自适应高度
function headHeight(){
    var ele=$(".template-head");
    var h=ele.outerHeight();
    ele.css("bottom",-h);
}
$(function(){
    headHeight();
    $("#show").click(function(){
        if($(this).html()==="≡"){
            $(this).html("×");
        }else{
            $(this).html("≡");
        }
        $(".template-head").toggle();
    });
    //变化头部的高度
    $(".template-head").height(document.body.clientHeight);

    (function(){
        var oTop = document.getElementById("to-top");
        var screenw = document.documentElement.clientWidth || document.body.clientWidth;
        var screenh = document.documentElement.clientHeight || document.body.clientHeight;
        oTop.style.left = screenw - oTop.offsetWidth +"px";
        oTop.style.top = screenh - oTop.offsetHeight + "px";
        window.onscroll = function(){
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            oTop.style.top = screenh - oTop.offsetHeight + scrolltop +"px";
        };
        oTop.onclick = function(){
            document.documentElement.scrollTop = document.body.scrollTop =0;
        }
    })();

    //if($(".imageListPage").length){
    //    $(".imageListPage").jqPaginator({
    //        totalPages: Math.ceil($(".imageListContent").find("li").length/4),
    //        visiblePages: 1,
    //        currentPage: 1,
    //        prev: '<li class="prev">上一页<\/li>',
    //        next: '<li class="next">下一页<\/li>',
    //        page: '<li class="page"> {{page}} / {{totalPages}} <\/li>',
    //        onPageChange: function (n) {
    //            $(".imageListContent").find("li").hide();
    //            for(var i=1;i<=4;i++){
    //                $(".imageListContent").find("li").eq(4*n-i).show();
    //            }
    //        }
    //    });
    //}
});
$.fn.textScroll=function(s){
    var speed=60;
    switch (s){
        case 1:speed=80;
            break;
        case 2:speed=60;
            break;
        case 3:speed=40;
            break;
        default: break;
    }
    var flag=null,tt,that=$(this),child=that.children();
    var p_w=that.width(), w=child.width();
    child.css({left:p_w});
    var t=(w+p_w)/speed * 1000;
    function play(m){
        var tm= m==undefined ? t : m;
        child.animate({left:-w},tm,"linear",function(){
            $(this).css("left",p_w);
            play();
        });
    }
    child.on({
        mouseenter:function(){
            var l=$(this).position().left;
            $(this).stop();
            tt=(-(-w-l)/speed)*1000;
        },
        mouseleave:function(){
            play(tt);
            tt=undefined;
        }
    });
    play();
};
function loadingPop(msg){
    var str='<div class="loadingPop">'+
        '<div class="head-column-head">'+
        '<span>提示</span>'+
        '</div>'+
        '<p>'+msg+'</p>'+
        '<div class="loadingpop-btn">'+
        '<span class="loading-pop-add">确定</span>'+
        '</div>'+
        '</div>';
    $("#bg",window.parent.document).show();
    $("body",window.parent.document).append(str);
}