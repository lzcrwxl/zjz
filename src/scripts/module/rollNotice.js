/**
 * Created by NHY on 2017/1/3.
 */
$(function(){
    $("body").on('click','#moduleID04',function(){
        var html=template("rollTemplate");
        $("body").append(html);
        $("#bg").show();
        hideTopBottom();
    });
    $("body").on("click",".column-add-common-list-roll",function(){
        $(".list-roll-content").show();
        $(".list-roll-content1").hide();
        $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
    });
    $("body").on("click",".column-add-special-list-roll",function(){
        $(".list-roll-content1").show();
        $(".list-roll-content").hide();
        $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
    });
    $("body").on('click','.column-cancel-list-roll',function(){
        $("#head-column-list-roll").remove();
        $("#bg").hide();
    });
//移动节点
    $("body").on('click','#head-column-list-roll table tbody .up',function(){
        var par=$(this).parents("tr");
        par.insertBefore(par.prev());
        hideTopBottom();
    });
    $("body").on('click','#head-column-list-roll table tbody .down',function(){
        var par=$(this).parents("tr");
        par.insertAfter(par.next());
        hideTopBottom();
    });
    $("body").on('click','#head-column-list-roll table tbody .del',function(){
        var par=$(this).parents("tr");
        par.remove();
        hideTopBottom();
    });
    //弹出
    $('body').on('click','#add-roll',function(){
        var html='';
        html+='<div class="list-roll-pop">'+
            '<div class="head-column-head"><span>添加公告</span><span class="list-roll-pop-cancel">×</span></div>'+
                '<div class="ml15 mt10"><label for="">公告内容：</label><input type="text" id="roll-text"></div>'+
            '<div class="ml15 mt10"><label for="">跳转链接：</label><input id="roll-link" type="url"></div>'+
            '<div class="list-roll-btn"><span class="list-roll-pop-add">确定</span><span class="list-roll-pop-cancel">取消</span></div>'+
            '</div>';
        $("body").append(html);
        $("#bg1").show();
    });
    $("body").on("click",'.list-roll-pop-cancel',function(){
        $(".list-roll-pop").remove();
        $("#bg1").hide();
    });
    $("body").on('click','.list-roll-pop-add',function(){
        var text=$("#roll-text").val();
        var  link=$("#roll-link").val();
        if(text==''){
            alert("请输入公告内容");
            return false;
        }else{
            var html='<tr>'+
            '<td>'+text+'</td>'+
            '<td>'+link+'</td>'+
            '<td><span class="del">×</span><span class="up">↑</span><span class="down">↓</span></td>'+
            '</tr>';
            $("#head-column-list-roll table tbody").append(html);
            hideTopBottom();
            $(".list-roll-pop").remove();
            $("#bg1").hide();
        }

    });
    function hideTopBottom(){
        var par=$("#head-column-list-roll").find('table').find('tbody');
        par.find("tr").find(".up,.down").show();
        par.find("tr:first-child").find(".up").hide();
        par.find("tr:last-child").find('.down').hide();
    }
});