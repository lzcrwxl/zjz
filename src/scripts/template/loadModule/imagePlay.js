/**
 * Created by NHY on 2017/2/14.
 */
(function(w){
    function ImagePlay(data){
        this.moduleObj={
            img:'/Public/Style/station/images/left16.jpg',
            name:'轮播多图'
        };
        this.id=Date.now();
        this.title=data.title;
        this.type=data.template_id;
        this.images=data.list;
        this.interval=4000;
        this.duration=500;
        var d=this.bindData();
        this.html=$('<div class="module dads-children imagePlay'+this.id+'" index='+this.id+' data='+d+'></div>');
    }
    ImagePlay.prototype={
        constructor:ImagePlay,
        bindTemplate:function(){
            this.bindDom();
        },
        bindDom:function(){
            var dom=this.madeTemplateDom();
            var that=this;
            var id='.imagePlay'+this.id;
            this.html.append(dom);
            $("#content").prepend(that.html);
            var el = document.createElement('script');
            $(el).attr("index",that.id);
            el.text=this.bindEvent(this.type);
            document.querySelector(id).appendChild(el);
        },
        madeTemplateDom:function(){
            var items="";
            for(var i=0;i<this.images.length;i++){
                items+='<div class="section'+this.id+'" id="section'+(this.id+i)+'" onclick="window.location=\''+this.images[i].url+'\'"></div>';
            }
            var str='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<div class="imagePlayContainer">'+
                '<div class="sections'+this.id+'">'+
                items+
                '</div>'+
                '</div>';
            str+=this.bindStyle(this.type);
            return str;
        },
        bindStyle:function(type){
            var style="";
            switch(parseInt(type)){
                case 1:
                    var s='';
                    for(var i=0;i<this.images.length;i++){
                        s+='#section'+(this.id+i)+' {background-image: url('+this.images[i].src+');  }';
                    }
                    style+='<style>'+
                        '.imagePlayContainer {width: 100%;height: 200px;overflow: hidden;}'+
                        '.sections'+this.id+',.section'+this.id+' {height:100%;}'+
                        '.imagePlayContainer,.sections'+this.id+' {position: relative;}'+
                        '.section'+this.id+' {background-color: #000;background-size: cover;background-position: 50% 50%;text-align: center;color: white;}'+
                        s+
                        '.pages li{list-style-type:none;width:6px;height:6px;border-radius:6px;background-color:white}'+
                        '.pages li:hover{box-shadow:0 0 2px 1px white}'+
                        '.pages li.active{background-color:orange;box-shadow:0 0 2px 1px orange}'+
                        '.pages{position:absolute;}.pages.horizontal{left:50%;transform:translateX(-50%);bottom:5px}'+
                        '.pages.horizontal li{display:inline-block;margin-right:10px}'+
                        '.pages.horizontal li:last-child{margin-right:0}'+
                        '.pages.vertical{right:5px;top:50%;transform:translateY(-50%)}'+
                        '.pages.vertical li{margin-bottom:10px}'+
                        '.pages.vertical li:last-child{margin-bottom:0}'+
                        '</style>';
                    break;
                default:
                    break;
            }
            return style;
        },
        bindEvent:function(type){
            var script="";
            switch(parseInt(type)){
                case 1:script= '$(".imagePlay'+this.id+'").PageSwitch({'+
                    'selectors : {'+
                    'sections : ".sections'+this.id+'",'+
                    'section : ".section'+this.id+'",'+
                    'pages : ".pages", '+
                    'active : ".active"'+
                    '},'+
                    'direction:"horizontal",'+
                    'easing:"ease-in",'+
                    'duration:'+this.duration+','+
                    'interval: '+this.interval+','+
                    'autoPlay:true,'+
                    'loop:false'+
                    '});';
                    break;
                default:
                    break;
            }
            return script;
        },
        bindLoaded:function(){
            var str='<li index="'+this.id+'"><img src="'+this.moduleObj.img+'" alt=""><p>'+this.moduleObj.name+'</p></li>';
            $("#loaded-modules",window.parent.document).prepend(str);
        },
        bindData:function(){
            var data={};
            data.module_id="3";
            data.template_id=this.type;
            data.title=this.title;
            data.list=this.images;
            data=JSON.stringify(data);
            return data;
        }
    };
    w.module3=function(data){
        return new ImagePlay(data);
    }
})(window);