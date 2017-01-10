/*
* @Author: iceStone
* @Date:   2016-01-26 23:10:20
* @Last Modified by:   iceStone
* @Last Modified time: 2016-01-26 23:12:46
*/

//'use strict';
$(function(){
    $("#iframe").load(function(){
        //右边切换模块图片加载
        $.ajax({
            type: "POST",
            url: "json/module.json",
            dataType:"json",
            success: function(msg){
                var str='';
                for(var i in msg){
                    str+='<li><img src="'+msg[i]+'" alt=""></li>';
                }
                $(".content-right-content").html(str);
            }
        });
        //左边头部切换
        $(".content-left-top").find("div").on("click",function(){
            $(this).addClass("content-left-top-active").siblings().removeClass("content-left-top-active");
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
        $(".right-fenge").on("click",function(){
            $(".right-content").hide();
            $("#right-content1").show();
        });
        $(".right-lanmu").on("click",function(){
            $(".right-content").hide();
            $("#right-content2").show();
        });
        //初始化栏目
        //var head=[];
        //head.push(new Header("首页","www.baidu.com","../../../../Public/Style/station/images/template1/head1.png",true,true,true));
        //head.push(new Header("会员登录","www.sina.com","../../../../Public/Style/station/images/template1/head2.png",false,false,false));
        //head.push(new Header("留言板",true,"../../../../Public/Style/station/images/template1/head3.png",false,false,false));
        //head.push(new Header("会员注册",true,"../../../../Public/Style/station/images/template1/head4.png",false,false,true));
        //head.push(new Header("会员中心",true,"../../../../Public/Style/station/images/template1/head5.png",false,false,true));
        //head[0].title="尾页";
        //新增栏目
        (function(){
            var icon='';
            var title="";
            var url="";
            var power="";
            //打开弹窗
            $("#add-column").click(function(){
                addColumn();
            });
            //常规和高级切换
            $(".column-add-common").click(function(){
                $(".head-column-content1").toggle();
                $(".head-column-content2").toggle();
                $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
            });
            $(".column-add-special").click(function(){
                $(".head-column-content1").toggle();
                $(".head-column-content2").toggle();
                $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
            });
            //图标选择
            $("input[name='column-img']").click(function(){
                if($("#imgselect").is(":checked")){
                    $("#seticon").show();
                }else{
                    $("#seticon").hide();
                }
            });
            $(".column-cancel").click(function(){
                delColumn();
            });
            $(".column-add-btn").click(function(){
                addDetail();
            });
            $(".column-back-btn").click(function(){
                addBack();
            });
            //设置链接
            $("input[name='column-power']").click(function(){
                if($("#vippeople").is(":checked")){
                    $(".column-rank").show();
                }else{
                    $(".column-rank").hide();
                }
            });
            //设置可见
            $("input[name='column-link']").click(function(){
                if($("#selecticon").is(":checked")){
                    $(".column-link").show();
                }else{
                    $(".column-link").hide();
                }
            });
            //设置详细链接
            $("input[name='headlink']").click(function(){
                $("input[name='headlink']").each(function(){
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
                        $("#showlink").html(label+input);
                    }

                });
            });
            //弹出设置链接
            $("#setlink").click(function(){
                $("#bg1").show();
                $("#set-head-link").show();
            });
            //关闭设置链接
            $(".closelink").click(function(){
                $("#bg1").hide();
                $("#set-head-link").hide();
            });
            //选择图标
            $(".column-icon-content").find("li").click(function(){
                $(this).addClass("icon-active").siblings().removeClass("icon-active");
            });
            //选定图标
            $("#iconSure").click(function(){
                $(".column-icon-content").find("li").each(function(){
                    if($(this).hasClass("icon-active")){
                        icon=$(this).find("img")[0].src;
                    }
                });
                addBack();
            });
            //确定链接
            $("#linkSure").click(function(){
                if($("#vippeople").is(":checked")){
                    power=$("#powerRank").val();
                }else{
                    power="all";
                }
                $("#writeUrl").val($("#linkId").val());
                $("#bg1").hide();
                $("#set-head-link").hide();
            });
            //新增节点
            $(".addHeader").click(function(){
                //Header(title,url,icon,power,system)
                title=$("#headTitle").val();
                url="http://"+$("#writeUrl").val();
                power=false;
                var system=false;
                var value='';
                $("input[name='column-img']").each(function(){
                    if($(this).is(":checked")) value=$(this).val();
                });
                switch(value){
                    case '1':
                        icon=getAbsoluteUrl("/Public/style/station/images/template1/head1.png");
                        console.log(icon);
                        break;
                    case '2':
                        icon=false;
                        break;
                    case '3':
                        if(getFileUrl('addHeaderIcon')){
                            icon=getFileUrl('addHeaderIcon');
                        }else{
                            var iconUrl=$(".icon-active").find("img").attr("src");
                            icon=getAbsoluteUrl(iconUrl);
                        }
                        break;
                    default:break;
                }
                new Header(title,url,icon,power,system,true);
                var dx = document.getElementById('addHeaderIcon');
                dx.value = '';
                if(document.selection){
                    dx.select();
                    document.selection.clear();
                }
                $("#headTitle").val("");
                $("#writeUrl").val("");
                delColumn();
            });
            function addColumn(){
                $("#bg").show();
                $("#head-column").show();
            }
            function delColumn(){
                $("#bg").hide();
                $("#head-column").hide();
            }
            function addDetail(){
                $("#bg1").show();
                $(".head-column-set-img").show();
            }
            function addBack(){
                $("#bg1").hide();
                $(".head-column-set-img").hide();
            }
        })();

        //颜色选框
        $("#square_one").bigColorpicker(function(el, color) {
            $(el).css("background-color", color);
        });
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
    });
    //图文展示拖拽
    (function(){
        $("#iframe").load(function() {
            var imgText = {
                // 初始化
                init: function () {
                    var me = this;
                    me.parent=$(".content-left-list");
                    me.imageText ="#moduleID01";
                    me.imageList="#moduleID02";
                    me.imagePlay="#moduleID05";
                    me.panelList = $("#iframe").contents().find('body')[0];


                    // 为图文展示拖拽源监听dragstart,设置关联数据
                    me.parent.on("dragstart",me.imageText,function(e){
                        var event=e.originalEvent;
                        event.dataTransfer.setData('text/plain', 'imageText');
                        event.stopPropagation();
                    });
                    //为图文列表拖拽源监听dragstart,设置关联数据
                    me.parent.on("dragstart",me.imageList,function(e){
                        var event=e.originalEvent;
                        event.dataTransfer.setData('text/plain', 'imageList');
                        event.stopPropagation();
                    });
                    //为图文列表拖拽源监听dragstart,设置关联数据
                    me.parent.on("dragstart",me.imagePlay,function(e){
                        var event=e.originalEvent;
                        event.dataTransfer.setData('text/plain', 'imagePlay');
                        event.stopPropagation();
                    });


                    // 拖拽鼠标移入元素,在拖放目标上设置视觉反馈
                    me.panelList.addEventListener('dragenter', me.onDragEnter, false);

                    // 取消元素dragover默认行为,使其可拖放
                    me.panelList.addEventListener('dragover', me.onDragOver, false);

                    // 拖拽移出元素,清除视觉反馈
                    me.panelList.addEventListener('dragleave', me.onDragLeave, false);

                    // 鼠标释放,在拖放目标上接收数据并处理
                    me.panelList.addEventListener('drop', me.onDrop, false);
                },
                onDragEnter: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                },
                onMouseUp: function (e) {
                    e.preventDefault();
                },
                onDragLeave: function (e) {
                    e.stopPropagation();
                },
                onDragOver: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                },
                onDrop: function (e) {
                    var id = e.dataTransfer.getData('text/plain');
                    switch (id){
                        case "imageText":
                            $("#moduleID01").click();
                            break;
                        case "imageList":
                            $("#moduleID02").click();
                            break;
                        case "imagePlay":
                            $("#moduleID05").click();
                            break;
                        default:break;
                    }

                    e.preventDefault();
                    e.stopPropagation();
                }

            };

            imgText.init();
            document.body.addEventListener("drop", function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
    })();
});
