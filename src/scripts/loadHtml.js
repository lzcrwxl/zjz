/**
 * Created by NHY on 2017/1/4.
 */
$(function () {
  $("#iframe").load(function () {
    $.ajax({
      type: "GET",
      url: "/index.php/home/station/ajax_get_conf.html",
      dataType: "json",
      success: function (data) {
        if (data.code == 0) {
          cc(data);
        } else {
          alert("请求失败");
        }
      },
      error: function () {
        alert("请求错误");
      }
    });
    //代码从这开始
    function cc(data){
      console.log(data);
    }
  });
});