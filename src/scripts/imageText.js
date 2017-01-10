/**
 * Created by NHY on 2016/12/12.
 */
//图文展示模块的添加
(function(){
    $("#iframe").load(function() {
        function ImageText(title,img,url,text,module){
            this.title=title||"图文展示";
            this.img=img;
            this.url=url||" ";
            this.text=text||' ';
            this.module="module"+module;
            this.id=Data.now();
            this.dom=$("<div class='module imageText dads-children' index="+this.id+"></div>");
            this.init();
        }
        ImageText.prototype={
            constructor:ImageText,
            init:function(){
                this.bindDom();
                this.bindEvent();
            },
            bindDom:function(){
                this.dom.addClass(this.module);
                var str='<div class="module-top">'+
                    '<h3>'+this.title+'</h3>'+
                    '</div>'+
                    '<div>'+
                    '<a href="'+this.url+'">'+
                    '<img src="'+this.img+'" alt=""></a>'+
                    '<p>'+this.text+'</p>'+
                    '</div>';
                this.dom.html(str);
                $("#iframe").contents().find('#content').prepend(this.dom);
            },
            bindEvent:function(){
            }
        };

        $(".content-left-list").on("click", "#moduleID01", function () {
                $("#imageText,#imageTextBg").show();
            }
        );
        $(".imageTextClose").click(function () {
            $("#imageText,#imageTextBg").hide();
        });
        //模块内容选择
        $("#imageTextStyle li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).attr('index');
            $(".imageTextModule").hide();
            var showModule = ".imageTextModule" + index;
            $(showModule).show();
        });
        $("#imageTextSave").click(function () {
            var index = 0;
            $("#imageTextStyle").find('li').each(function () {
                if ($(this).hasClass("active")) index = $(this).attr('index');
            });
            var title = $('#imageTextNav').val();
            var text = $("#imageTextText" + index).val();
            var url = $("#imageTextUrl" + index).val();
            var img;
            if ($("#imgTextFile" + index).length) {
                img = getFileUrl("imgTextFile" + index);
            }
            new ImageText(title, img, url, text, index);
            $('#imageTextNav').val("");
            $("#imageTextText" + index).val("");
            $("#imageTextUrl" + index).val("http://");
            $("#imgPre" + index).attr('src', 'images/exampleImage.png');
            $("#imageText,#imageTextBg").hide();
        });
    });
})();