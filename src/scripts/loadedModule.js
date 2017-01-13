/**
 * Created by NHY on 2017/1/12.
 */
(function(){
    $("#loaded-modules").on('mouseenter','li',function(){
        $(this).append("<div class='del'>×</div>");
    });
    $("#loaded-modules").on('mouseleave','li',function(){
        $(this).find("div").remove();
    });
    $("#loaded-modules").on('click','.del',function(){
        var par=$(this).parents("li");
        var index=par.attr("index");
        par.remove();
        $("#iframe").contents().find(".module[index='"+index+"']").remove();
    });
})();