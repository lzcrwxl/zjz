/**
 * Created by NHY on 2017/2/5.
 */
$(function(){
    $(".save").click(function(){
        var data=getData();
        $.post("/index.php/Home/Station/ajax_save_column_data.html",data,function(data){
            alert('保存成功');
        },"json");

    });
    function getData(){
        var data={};
        data.column_id=getColumnId();
        data.column_data=getColumnData();
        data.module_data=getModuleData();
        console.log(data);
        return data;
    }
    function getColumnId(){
        var val=$("#content-middle-top").find("input").val();
        val=val.split("?");
        val=val[1].split("=");
        return val[1];
    }
    function getColumnData(){
        var data=[];
        var lis=$("#iframe").contents().find(".template-head").find("li");
        for(var i=0;i<lis.length;i++){
            var d=$(lis[i]).attr("data");
            d=JSON.parse(d);
            if($(lis[i]).attr("show")==0){
                d.status=0;
            }else{
                d.status=1;
            }
            console.log(d);
            data.push(d);
        }
        return data;
    }
    function getModuleData(){
        var data=[];
        var lis=$("#iframe").contents().find("#content").children(".module");
        for(var i=0;i<lis.length;i++){
            var d=$(lis[i]).attr("data");
            d=JSON.parse(d);
            data.push(d);
        }
        return data;
    }
});