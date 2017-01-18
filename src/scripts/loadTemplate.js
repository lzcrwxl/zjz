/**
 * Created by NHY on 2017/1/7.
 */
$(function(){
    $("#iframe").load(function(){
        $.ajax({
            type:'get',
            url:'/index.php/Home/Station/ajax_get_column_data.html',
            dataType:'json',
            success:function(data){
                if(data.code==0){
                    //loadTemplate(data.data);
                }else{
                    alert("请求失败");
                }
            },
            error:function(){
                alert("中间模板请求失败");
            }
        });
        function loadTemplate(data){
            for(var i=data.length-1;i>0;i--){
                loadModule(data[i]);
            }
        }
        function loadModule(data){
            if(data.module_id==1){

            }else if(data.module_id==2){
                module_id2(data).bindTemplate();
            }else if(data.module_id==3){
                module_id3(data).bindTemplate();
            }else if(data.module_id==4){
                module_id4(data).bindTemplate();
            }
        }
    });
});