/**
 * Created by NHY on 2017/1/3.
 */
$(function(){
    $("#iframe").load(function(){
        $("body").on("click",".column-add-common-list-roll",function(){
            $(".list-roll-content").show();
            $(".list-roll-content1").hide();
            $(this).addClass("head-column-nav-active").siblings();
        });
        $("body").on("click",".column-add-special-list-roll",function(){
            $(".list-roll-content1").show();
            $(".list-roll-content").hide();
        });


    });
});