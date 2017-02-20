/**
 * Created by NHY on 2017/2/15.
 */
(function(w){
    function RollNotice(data){
        /*
         数据格式
         data={
         title:'abc',
         template_id:1,
         icon:'/Public/Style/station/images/noticeIco1.gif',
         speed:'1',
         direction:'left',
         list:[
         {
         url:'',
         text:'123'
         },
         {
         url:'',
         text:'123'
         }
         ]
         }
         */
        this.moduleObj={
            img:'/Public/Style/station/images/left15.jpg',
            name:'滚动公告'
        };
        this.module_id=5;
        this.id=Date.now();
        this.title=data.title;
        this.icon=data.icon;
        this.speed=data.speed;
        this.dir=data.direction;
        this.type=data.template_id;
        this.list=data.list;
        var d=this.bindData();
        this.html=$("<div class='module dads-children rollNotice module"+this.type+"' index='"+this.id+"' data="+d+"></div>")
    }
    RollNotice.prototype={
        constructor:RollNotice,
        bindTemplate:function(){
            this.bindDom();
        },
        bindDom:function(){
            var that=this;
            var lis='';
            var style=this.bindStyle(this.type);
            var script=this.bindEvent(this.type);
            var id='.rollNotice[index="'+this.id+'"]';
            for(var i=0;i<this.list.length;i++){
                lis+="<li><a href='"+this.list[i].url+"'>"+this.list[i].text+"</a></li>"
            }
            var dom='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<div class="df aic content">'+
                '<img src="'+this.icon+'" alt="">'+
                '<div class="roll">'+
                '<ul>'+
                lis+
                '</ul>'+
                '</div>';
            this.html.append(dom);
            this.html.append(style);
            $("#content").prepend(that.html);
            var el = document.createElement('script');
            el.text = script;
            document.querySelector(id).appendChild(el);
        },
        bindStyle:function(type){
            var str='';
            switch(parseInt(type)){
                case 1:str+='<style>'+
                    '.rollNotice.module1[index="'+this.id+'"] .content>div{ position:relative; white-space:nowrap; overflow:hidden; height:20px;}'+
                    '.rollNotice.module1[index="'+this.id+'"] ul{position:absolute; top:0; height:20px;display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; }'+
                    '.rollNotice.module1[index="'+this.id+'"] ul li{margin-left:10px;line-height: 20px;}'+
                    '</style>';
                    break;
                case 2:;
                    break;
                default:
                    break;
            }
            return str;
        },
        bindEvent:function(type){
            var str='';

            switch(parseInt(type)){
                case 1:str+='$.fn.textScroll=function(s){'+
                    'var speed=60;'+
                    'switch (s.speed){'+
                    'case 1:speed=40;'+
                    'break;'+
                    'case 2:speed=80;'+
                    'break;'+
                    'case 3:speed=120;'+
                    'break;'+
                    'default: break;'+
                    '}'+
                    'var flag=s.dir,that=$(this),child=that.children();'+
                    'var p_w=that.width(), w=child.width();'+
                    'child.css({flag:p_w});'+
                    'var t=(w+p_w)/speed * 1000;'+
                    'function play(m){'+
                    'var tm= m==undefined ? t : m;'+
                    'var dir={};'+
                    'dir[flag]=-w;'+
                    'child.animate(dir,tm,"linear",function(){'+
                    '$(this).css(flag,p_w);'+
                    'play();'+
                    '});'+
                    '}'+
                    'play();'+
                    '};'+
                    'var data={};'+
                    'data.speed='+this.speed+';'+
                    'data.dir="'+this.dir+'";'+
                    '$("[index=\''+this.id+'\'] .roll").textScroll(data);';
                    break;
                case 2:
                    break;
                default:
                    break;
            }
            return str;
        },
        bindLoaded:function(){
            var str='<li index="'+this.id+'"><img src="'+this.moduleObj.img+'" alt=""><p>'+this.moduleObj.name+'</p></li>';
            $("#loaded-modules",window.parent.document).prepend(str);
        },
        bindData:function(){
            var data={};
            data.module_id=this.module_id;
            data.template_id=this.type;
            data.direction=this.dir;
            data.title=this.title;
            data.icon=this.icon;
            data.speed=this.speed;
            data.list=this.list;
            data=JSON.stringify(data);
            return data;
        }
    };
    w.module5=function(data){
        return new RollNotice(data);
    };
})(window);