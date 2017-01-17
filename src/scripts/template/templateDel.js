/**
 * Created by NHY on 2016/12/28.
 */
$(function(){
    $('#content').dad({
        draggable:".module-top"
    });
    $("#content").on("mouseenter",".module",function(){
        $(this).append('<b class="module-del">×</b><b class="module-up">↑</b> <b class="module-down">↓</b>');
        hideTopBottom()
    });
    $("#content").on("mouseleave",".module",function(){
        $(this).find(".module-del").remove();
        $(this).find(".module-up").remove();
        $(this).find(".module-down").remove();
    });
    $("#content").on("click",".module-del",function(){
        $(this).parents(".module").remove();
        var index=$(this).parents('.module').attr('index');
        $("#loaded-modules",window.parent.document).find('[index="'+index+'"]').remove();
        hideTopBottom()
    });
    $("#content").on("click",".module-up",function(){
        var parent=$(this).parents(".module");
        parent.find(".module-del").remove();
        parent.find(".module-up").remove();
        parent.find(".module-down").remove();
        if(!parent.is(":first-child")){
            parent.prev().before(parent);
        }else{
            return false;
        }
        hideTopBottom()
    });
    $("#content").on("click",".module-down",function(){
        var parent=$(this).parents(".module");
        parent.find(".module-del").remove();
        parent.find(".module-up").remove();
        parent.find(".module-down").remove();
        if(!parent.is(":last-child")){
            parent.next().after(parent);
        }else{
            return false;
        }
        hideTopBottom();
    });
    function hideTopBottom() {
        var par = $("#content");
        par.find(".module:first-child").find(".module-up").hide().end().find('.module-down').css({"top":"27px",borderTop:'1px solid #fff',borderBottom:'1px solid #fff'});
        par.find(".module:last-child").find('.module-down').hide();
    }
});