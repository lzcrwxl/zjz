/**
 * Created by NHY on 2017/1/4.
 */
$(function(){
   $("#iframe").load(function(){
       $.ajax({
           type: "GET",
           url: "/index.php/home/station/ajax_get_conf.html",
           dataType: "json",
           success:function(data){
                if(data.code==0){
                    barCode(data.data.wap);
                    loadHeadColumn(data.data.column)
                }else{
                    alert("请求失败");
                }
           },
           error:function(){
               alert("请求错误");
           }
       });
       //加载二维码
       function barCode(data){
           var p=$("#content-middle-top");
           p.find("p").html(data.url);
       }
       function loadHeadColumn(data){
           var html=[];
           for(var i=0;i<data.length;i++){
               html.push(new Header(data[i].text,data[i].url,data[i].icon,true,data[i].type,data[i].status));
           }
       }
   });
});