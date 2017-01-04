/**
 * Created by NHY on 2016/12/20.
 */
//修改头部
function changeHead(img,txt,address,index,that){
    var image=img;
    var txt=txt;
    var address=address;
    var icon='';
    var title="";
    var url="";
    var power="";
    //打开弹窗
    //$(".column-item2").click(function(){
    //    addColumn();
    //    $("#headTitle1").val(txt);
    //    $("#writeUrl1").val(address);
    //    console.log(txt,address);
    //});
    //常规和高级切换
    $(".column-add-common1").unbind();
    $(".column-add-common1").click(function(){
        $(".head-column-content11").show();
        $(".head-column-content21").hide();
        $(this).addClass("head-column-nav-active1").siblings().removeClass("head-column-nav-active1");
    });

    $(".column-add-special1").unbind();
    $(".column-add-special1").click(function(){
        $(".head-column-content11").hide();
        $(".head-column-content21").show();
        $(this).addClass("head-column-nav-active1").siblings().removeClass("head-column-nav-active1");
    });

    //图标选择
    $("input[name='column-img1']").unbind();
    $("input[name='column-img1']").click(function(){
        if($("#imgselect1").is(":checked")){
            $("#seticon1").show();
        }else{
            $("#seticon1").hide();
        }
    });

    $(".column-cancel1").unbind();
    $(".column-cancel1").click(function(){
        delColumn();
    });

    $(".column-add-btn1").unbind();
    $(".column-add-btn1").click(function(){
        addDetail();
    });

    $(".column-back-btn1").unbind();
    $(".column-back-btn1").click(function(){
        addBack();
    });

    //设置链接
    $("input[name='column-power1']").unbind();
    $("input[name='column-power1']").click(function(){
        if($("#vippeople1").is(":checked")){
            $(".column-rank1").show();
        }else{
            $(".column-rank1").hide();
        }
    });

    //设置可见
    $("input[name='column-link1']").unbind();
    $("input[name='column-link1']").click(function(){
        if($("#selecticon1").is(":checked")){
            $(".column-link1").show();
        }else{
            $(".column-link1").hide();
        }
    });

    //设置详细链接
    $("input[name='headlink1']").unbind();
    $("input[name='headlink1']").click(function(){
        $("input[name='headlink1']").each(function(){
            var str="";
            var strResult="";
            var input="";
            if($(this).is(":checked")){
                str=$(this).siblings("label").html();
                strResult="选择"+str.slice(0,2)+"：";
                label="<label>"+strResult+"</label>";
                if(str=="自定义"){
                    input="<input type='text' id='linkId'>"
                    label="<label>自定义地址：</label>";
                }else{
                    input="<select id='linkId'></select>"
                }
                $("#showlink1").html(label+input);
            }

        });
    });

    //弹出设置链接
    $("#setlink1").unbind();
    $("#setlink1").click(function(){
        $("#bg11").show();
        $("#set-head-link1").show();
    });
    //关闭设置链接
    $(".closelink1").unbind();
    $(".closelink1").click(function(){
        $("#bg11").hide();
        $("#set-head-link1").hide();
    });
    //选择图标
    $(".column-icon-content1").find("li").unbind();
    $(".column-icon-content1").find("li").click(function(){
        $(this).addClass("icon-active1").siblings().removeClass("icon-active1");
    });

    //选定图标
    $("#iconSure1").unbind();
    $("#iconSure1").click(function(){
        $(".column-icon-content1").find("li").each(function(){
            if($(this).hasClass("icon-active1")){
                icon=$(this).find("img")[0].src;
            }
        });
        addBack();
    });

    //确定链接
    $("#linkSure1").unbind();
    $("#linkSure1").click(function(){
        if($("#vippeople1").is(":checked")){
            power=$("#powerRank1").val();
        }else{
            power="all";
        }
        $("#writeUrl1").val($("#linkId1").val());
        $("#bg11").hide();
        $("#set-head-link1").hide();
    });

    //新增节点
    $("#head-column1").off("click",".addHeader1");
    $("#head-column1").on("click",".addHeader1",function(){
        //Header(title,url,icon,power,system)
        title=$("#headTitle1").val();
        url="http://"+$("#writeUrl1").val();
        that.htmlHeader.url=url;
        power=false;
        var system=false;
        var value='';
        $("input[name='column-img1']").each(function(){
            if($(this).is(":checked")) value=$(this).val();
        });
        switch(value){
            case '1':
                icon=image;
                break;
            case '2':
                icon=false;
                break;
            case '3':
                if(getFileUrl('addHeaderIcon')){
                    icon=getFileUrl('addHeaderIcon');
                }else{
                    var iconUrl=$(".icon-active1").find("img").attr("src");
                    icon=getAbsoluteUrl(iconUrl);
                }
                break;
            default:break;
        }
        $(".right-content2-content").find("tr[index='"+index+"']").find(".column-title").html(title);
        var iframe=$("#iframe").contents().find(".template-head").find('li[index="'+index+'"]');
        if(icon){
            iframe.find("img").css("visibility","visible");
            iframe.find("img").attr("src",icon);
        }else{
            iframe.find("img").css("visibility","hidden");
        }
        iframe.find('p').text(title);
        iframe.click(function(){
            window.location.href=url;
        });
        //var dx = document.getElementById('addHeaderIcon1');
        //dx.value = '';
        //if(document.selection){
        //    dx.select();
        //    document.selection.clear();
        //}
        //$("#headTitle1").val("");
        //$("#writeUrl1").val("");
        delColumn();
    });

    function addColumn(){
        $("#bg").show();
        $("#head-column1").show();
    }
    function delColumn(){
        $("#bg").hide();
        $("#head-column1").hide();
    }
    function addDetail(){
        $("#bg11").show();
        $(".head-column-set-img1").show();
    }
    function addBack(){
        $("#bg11").hide();
        $(".head-column-set-img1").hide();
    }
}