/**
 * Created by NHY on 2017/1/18.
 */
$(function(){
    $.ajax({
        type:'post',
        data:{column_id:_page_conf.column_id},
        url:'/index.php/Home/Station/ajax_get_column_data.html',
        dataType:'json',
        success:function(data){
            if(data.code==0){
                loadTemplate(data.data);
            }else{
                alert("请求失败");
            }
            //假如是单独打开的页面，去掉deltemplate文件
            if( window.top!==window.self){
                var el = document.createElement('script');
                $(el).attr("id", "templateDel");
                el.src="../../../../Public/Style/station/scripts/template/templateDel.js";
                document.body.appendChild(el);
            }
        },
        error:function(){

        }
    });
    function loadTemplate(data){
        for(var i=data.length-1;i>=0;i--){
            loadModule(data[i]);
        }
    }
    function loadModule(data){
        if(data.module_id==1){
            for(var i=0;i<data.list.length;i++){
                var id=Date.now();
                header(data.list[i],id);
                if( window.top!==window.self){
                    new Header(data.list[i],id);
                }
            }
        }else if(data.module_id==2){
            var m2=module2(data);
            m2.bindTemplate();
            if( window.top!==window.self){
                m2.bindLoaded();
            }
        }else if(data.module_id==3){
            var m3=module3(data);
            m3.bindTemplate();
            if( window.top!==window.self){
                m3.bindLoaded();
            }
        }else if(data.module_id==4){
            var m4=module4(data);
            m4.bindTemplate();
            if( window.top!==window.self){
                m4.bindLoaded();
            }
        }else if(data.module_id==5){
            var m5=module5(data);
            m5.bindTemplate();
            if( window.top!==window.self){
                m5.bindLoaded();
            }
        }

    }
});