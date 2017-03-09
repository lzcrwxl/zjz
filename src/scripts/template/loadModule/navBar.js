/**
 * Created by NHY on 2017/3/9.
 */
(function(w){
    function NavBar(data){
        this.moduleObj={
            img:'/Public/Style/station/images/left11.jpg',
            name:'魔方导航'
        };
        this.id=Date.now();
        this.template_id=data.template_id;
        this.list=data.list;
        var d=this.bindData();
        this.html=$("<div class='module dads-children navigation module"+this.template_id+"' index='"+this.id+"' data="+d+"></div>")
    }
    NavBar.prototype={
        constructor:NavBar,
        bindTemplate:function(){
            this.bindDom();
        },
        bindDom:function(){
            var that=this;
            var lis='';
            for(var i=0;i<this.list.length;i++){
                lis+="<li><a href='"+this.list[i].url+"'><img src='"+this.list[i].img+"'/><p>"+this.list[i].title+"</p></a></li>"
            }
            var dom='<ul>'+
                lis+
                '</ul>';
            this.html.append(dom);
            $("#content").prepend(that.html);
        },
        bindStyle:function(type){
            var str='';
            switch(parseInt(type)){
                case 1:
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
                case 1:
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
            data.module_id=7;
            data.template_id=this.template_id;
            data.list=this.list;
            data=JSON.stringify(data);
            return data;
        }
    };
    w.module7=function(data){
        return new NavBar(data);
    };
})(window);