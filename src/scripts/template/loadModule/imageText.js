/**
 * Created by NHY on 2017/1/18.
 */
(function(w){
    function ImageText(data){
        this.moduleObj={
            img:'/Public/Style/station/images/left12.jpg',
            name:'图文展示'
        };
        this.id=Date.now();
        this.title=data.title||"图文展示";
        this.img=data.src;
        this.url=data.url||" ";
        this.text=data.intro||' ';
        this.template_id=data.template_id;
        this.module=this.bindStyle(data.template_id);
        var d=this.bindData();
        this.dom=$("<div class='module imageText dads-children module"+data.template_id+"' index="+this.id+" data="+d+"></div>");
    }
    ImageText.prototype={
        constructor:ImageText,
        bindTemplate:function(){
            this.bindDom();
            this.bindEvent();
        },
        bindDom:function(){
            var str='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<div>'+
                '<a href="'+this.url+'">'+
                '<img src="'+this.img+'" alt=""></a>'+
                '<p>'+this.text+'</p>'+
                '</div>';
            this.dom.html(str);
            this.dom.append(this.module);
            $('#content').prepend(this.dom);
        },
        bindStyle:function(id){
            var str='';
            switch(parseInt(id)){
                case 1:str+='<style>'+
                    '.imageText {background: #fff;}'+
                    '.imageText.module1[index='+this.id+'] > div:nth-of-type(2) img {display: none;}'+
                    '.imageText.module1[index='+this.id+'] > div:nth-of-type(2) p {font-size: 14px;color: #333;padding: 15px;}'+
                    '</style>';
                    break;
                case 2:str+='<style>'+
                    '.imageText.module2[index='+this.id+'] > div:nth-of-type(2) img {width: 100%;}'+
                    '.imageText.module2[index='+this.id+'] > div:nth-of-type(2) p {font-size: 14px;color: #333;padding: 15px;}'+
                    '</style>';
                    break;
                case 3:str+='<style>'+
                    '.imageText.module3[index='+this.id+'] > div:after {clear: both;content:".";height: 0;line-height: 0;visibility: hidden;display: block;}'+
                    '.imageText.module3[index='+this.id+'] > div:nth-of-type(2) img {width: 50%;float: left;}'+
                    '.imageText.module3[index='+this.id+'] > div:nth-of-type(2) p {width:50%;font-size: 14px;color: #333;padding: 15px;float: left;box-sizing: border-box}'+
                    '</style>';
                    break;
                case 4:str+='<style>'+
                    '.imageText.module4[index='+this.id+'] > div:after {clear: both;content: ".";height: 0;line-height: 0;visibility: hidden;display: block;}'+
                    '.imageText.module4[index='+this.id+'] > div:nth-of-type(2) img {width: 50%;float: right;}'+
                    '.imageText.module4[index='+this.id+'] > div:nth-of-type(2) p {font-size: 14px;color: #333;padding: 15px;float: left;}'+
                    '</style>';
                    break;
                default:
                    break;
            }
            return str;
        },
        bindEvent:function(type){
        },
        bindLoaded:function(){
            var str='<li index="'+this.id+'"><img src="'+this.moduleObj.img+'" alt=""><p>'+this.moduleObj.name+'</p></li>';
            $("#loaded-modules",window.parent.document).prepend(str);
        },
        bindData:function(){
            var data={};
            data.module_id=4;
            data.template_id=this.template_id;
            data.title=this.title;
            data.introduce=this.text;
            data.img=this.img;
            data=JSON.stringify(data);
            return data;
        }
    };

    w.module4=function(data){
        return new ImageText(data);
    };
})(window);
