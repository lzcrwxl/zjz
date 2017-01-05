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
          addModule(data);
        } else {
          alert("请求失败");
        }
      },
      error: function () {
        alert("请求错误");
      }
    });
    /*function addModule(data) {
      var modules = data.data.modules;
      var html = ``;
      $.each(modules, function (k, v) {
        html = `
           <fieldset>
          <legend>${v.text}</legend>
          <ul data-id=${k}></ul>
        </fieldset>
        `;
        var innerHtml = ``;
        $.each(v.list, function (kay, value) {
          innerHtml += `
              <li>
              <img src="${value.icon}" alt="">
              <p>${value.text}</p>
            </li>
            `;
        })
        $('[data-module]').append(html);
        $("fieldset ul[data-id='" + k + "']").html(innerHtml);
      });
    }*/
    function addModule(data){
      var modules = data.data.modules;
      var html="";
      for(var i=0;i<modules.length;i++){
        var innerHtml="";
        var index="moduleID"+i;
        for(var j=0;j<modules[i].list.length;j++){
          var ii=index;
          ii+=j;
          innerHtml+='<li id="'+ii+'"><img src="'+modules[i].list[j].icon+'" alt=""> <p>'+modules[i].list[j].text+'</p> </li>';
        }
        html+='<fieldset><legend>'+modules[i].text+'</legend><ul>'+innerHtml+'</ul></fieldset>';
      }
      $('[data-module]').html(html);
    }
  });
});