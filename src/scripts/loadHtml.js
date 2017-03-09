/**
 * Created by NHY on 2017/1/4.
 */

$(function(){
       $.ajax({
           type: "GET",
           url: "/index.php/home/station/ajax_get_conf.html",
           dataType: "json",
           success:function(data){
               console.log(data);
                if(data.code==0){
                    addModule(data);
                    barCode(data.data.wap);
                    //loadHeadColumn(data.data.column);
                }else{
                    alert("左边模板图片请求失败");
                }
           },
           error:function(){
               alert("请求错误");
           }
       });
       //加载二维码
       function barCode(data){
           var p=$("#content-middle-top");
           p.find("input").val(data.url);
           $("#iframe").attr('src',data.url);
       }
       function loadHeadColumn(data){
           var html=[];
           for(var i=0;i<data.length;i++){
               html.push(new Header(data[i].text,data[i].url,data[i].icon,true,data[i].type,data[i].status));
           }
       }
       function addModule(data){
           var modules = data.data.modules;
           var html="";
           for(var i=0;i<modules.length;i++){
               var innerHtml="";
               var index="moduleID"+i;
               for(var j=0;j<modules[i].list.length;j++){
                   var ii=index;
                   ii+=j;
                   innerHtml+='<li id="'+ii+'" module="'+modules[i].list[j].module_id+'"><img src="'+modules[i].list[j].icon+'" alt=""> <p>'+modules[i].list[j].text+'</p> </li>';
               }
               html+='<fieldset><legend>'+modules[i].text+'</legend><ul>'+innerHtml+'</ul></fieldset>';
           }
           $('.content-left-list').html(html);
       }
});