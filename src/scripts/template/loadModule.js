/**
 * Created by NHY on 2017/1/18.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'/index.php/Home/Station/ajax_get_column_data.html',
        dataType:'json',
        success:function(data){
            if(data.code==0){
                loadTemplate(data.data);
            }else{
                alert("请求失败");
            }
        },
        error:function(){
            alert("中间模板请求失败");
        }
    });
    function loadTemplate(data){
        for(var i=data.length-1;i>=0;i--){
            loadModule(data[i]);
        }
    }
    function loadModule(data){
        console.log(data);
        if(data.module_id==1){
            for(var i=0;i<data.list.length;i++){
                var id=Date.now();
                console.log(id);
                header(data.list[i],id);
                if( window.top!==window.self){
                    new Header(data.list[i],id);
                }
            }
        }else if(data.module_id==2){
            //module2(data).bindTemplate();
        }else if(data.module_id==3){
            //module3(data).bindTemplate();
        }else if(data.module_id==4){
            var m4=module4(data);
            m4.bindTemplate();
            if( window.top!==window.self){
                m4.bindLoaded();
            }
        }
    }
});