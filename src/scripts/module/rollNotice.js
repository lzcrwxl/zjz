/**
 * Created by NHY on 2017/1/3.
 */
//(function(w){
//    function RollNotice(data){
///*
//数据格式
//data={
//    title:'abc',
//    template_id:1,
//    icon:'/Public/Style/station/images/noticeIco1.gif',
//    speed:'1',
//    direction:'left',
//    list:[
//        {
//            url:'',
//            text:'123'
//        },
//        {
//            url:'',
//            text:'123'
//        }
//    ]
//}
// */
//        this.id=Date.now();
//        this.title=data.title;
//        this.icon=data.icon;
//        this.speed=data.speed;
//        this.dir=data.direction;
//        this.type=data.template_id;
//        this.list=data.list;
//        this.html=$("<div class='module dads-children rollNotice module"+this.type+"' index='"+this.id+"'></div>")
//    }
//    RollNotice.prototype={
//        constructor:RollNotice,
//        bindTemplate:function(){
//            this.bindDom();
//        },
//        bindDom:function(){
//            var that=this;
//            var lis='';
//            var style=this.bindStyle(this.type);
//            var script=this.bindEvent(this.type);
//            var id='.rollNotice[index="'+this.id+'"]';
//            for(var i=0;i<this.list.length;i++){
//                lis+="<li><a href='"+this.list[i].url+"'>"+this.list[i].text+"</a></li>"
//            }
//            var dom='<div class="module-top">'+
//                '<h3>'+this.title+'</h3>'+
//                '</div>'+
//                '<div class="df aic content">'+
//                '<img src="'+this.icon+'" alt="">'+
//                '<div class="roll">'+
//                '<ul>'+
//                lis+
//                '</ul>'+
//                '</div>';
//            this.html.append(dom);
//            this.html.append(style);
//            $("#iframe").contents().find("#content").prepend(that.html);
//            var idocument = $('#iframe').prop('contentWindow').document;
//            var el = idocument.createElement('script');
//            el.text = script;
//            idocument.querySelector(id).appendChild(el);
//        },
//        bindStyle:function(type){
//            var str='';
//            switch(parseInt(type)){
//                case 1:str+='<style>'+
//                '.rollNotice.module1[index="'+this.id+'"] .content>div{ position:relative; white-space:nowrap; overflow:hidden; height:20px;}'+
//                '.rollNotice.module1[index="'+this.id+'"] ul{position:absolute; top:0; height:20px;display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; }'+
//                '.rollNotice.module1[index="'+this.id+'"] ul li{margin-left:10px;line-height: 20px;}'+
//                '</style>';
//                    break;
//                case 2:;
//                    break;
//                default:
//                    break;
//            }
//            return str;
//        },
//        bindEvent:function(type){
//            var str='';
//
//            switch(parseInt(type)){
//                case 1:str+='$.fn.textScroll=function(s){'+
//                    'var speed=60;'+
//                    'switch (s.speed){'+
//                        'case 1:speed=40;'+
//                            'break;'+
//                        'case 2:speed=80;'+
//                            'break;'+
//                        'case 3:speed=120;'+
//                            'break;'+
//                        'default: break;'+
//                    '}'+
//                    'var flag=s.dir,that=$(this),child=that.children();'+
//                    'var p_w=that.width(), w=child.width();'+
//                    'child.css({flag:p_w});'+
//                    'var t=(w+p_w)/speed * 1000;'+
//                    'function play(m){'+
//                        'var tm= m==undefined ? t : m;'+
//                        'var dir={};'+
//                        'dir[flag]=-w;'+
//                        'child.animate(dir,tm,"linear",function(){'+
//                            '$(this).css(flag,p_w);'+
//                            'play();'+
//                        '});'+
//                    '}'+
//                    'play();'+
//                '};'+
//                    'var data={};'+
//                    'data.speed='+this.speed+';'+
//                    'data.dir="'+this.dir+'";'+
//                    '$("[index=\''+this.id+'\'] .roll").textScroll(data);';
//                    break;
//                case 2:;
//                    break;
//                default:
//                    break;
//            }
//            return str;
//        }
//    };
//    w.module_id5=function(data){
//        return new RollNotice(data);
//    };
//})(window);
//$(function(){
//    $("#iframe").load(function() {
//        var data = {
//            title: 'abc',
//            template_id: 1,
//            icon: '/Public/Style/station/images/noticeIco1.gif',
//            speed: '1',
//            direction: 'left',
//            list: [
//                {
//                    url: '',
//                    text: '123'
//                },
//                {
//                    url: '',
//                    text: '123'
//                }
//            ]
//        };
//        $("body").on('click', '#moduleID04', function () {
//            var html = template("rollTemplate");
//            $("body").append(html);
//            $("#bg").show();
//            hideTopBottom();
//        });
//        $("body").on("click", ".column-add-common-list-roll", function () {
//            $(".list-roll-content").show();
//            $(".list-roll-content1").hide();
//            $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
//        });
//        $("body").on("click", ".column-add-special-list-roll", function () {
//            $(".list-roll-content1").show();
//            $(".list-roll-content").hide();
//            $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
//        });
//        $("body").on('click', '.column-cancel-list-roll', function () {
//            $("#head-column-list-roll").remove();
//            $("#bg").hide();
//        });
////移动节点
//        $("body").on('click', '#head-column-list-roll table tbody .up', function () {
//            var par = $(this).parents("tr");
//            par.insertBefore(par.prev());
//            hideTopBottom();
//        });
//        $("body").on('click', '#head-column-list-roll table tbody .down', function () {
//            var par = $(this).parents("tr");
//            par.insertAfter(par.next());
//            hideTopBottom();
//        });
//        $("body").on('click', '#head-column-list-roll table tbody .del', function () {
//            var par = $(this).parents("tr");
//            par.remove();
//            hideTopBottom();
//        });
//        //弹出
//        $('body').on('click', '#add-roll', function () {
//            var html = '';
//            html += '<div class="list-roll-pop">' +
//                '<div class="head-column-head"><span>添加公告</span><span class="list-roll-pop-cancel">×</span></div>' +
//                '<div class="ml15 mt10"><label for="">公告内容：</label><input type="text" id="roll-text"></div>' +
//                '<div class="ml15 mt10"><label for="">跳转链接：</label><input id="roll-link" type="url"></div>' +
//                '<div class="list-roll-btn"><span class="list-roll-pop-add">确定</span><span class="list-roll-pop-cancel">取消</span></div>' +
//                '</div>';
//            $("body").append(html);
//            $("#bg1").show();
//        });
//        $("body").on("click", '.list-roll-pop-cancel', function () {
//            $(".list-roll-pop").remove();
//            $("#bg1").hide();
//        });
//        $("body").on('click', '.list-roll-pop-add', function () {
//            var text = $("#roll-text").val();
//            var link = $("#roll-link").val();
//            if (text == '') {
//                alert("请输入公告内容");
//                return false;
//            } else {
//                var html = '<tr>' +
//                    '<td>' + text + '</td>' +
//                    '<td>' + link + '</td>' +
//                    '<td><span class="del">×</span><span class="up">↑</span><span class="down">↓</span></td>' +
//                    '</tr>';
//                $("#head-column-list-roll table tbody").append(html);
//                hideTopBottom();
//                $(".list-roll-pop").remove();
//                $("#bg1").hide();
//            }
//
//        });
//        //加载模块
//        $("body").on("click",".list-roll-add",function(){
//            console.log(0);
//        });
//        function hideTopBottom() {
//            var par = $("#head-column-list-roll").find('table').find('tbody');
//            par.find("tr").find(".up,.down").show();
//            par.find("tr:first-child").find(".up").hide();
//            par.find("tr:last-child").find('.down').hide();
//        }
//    })
//});