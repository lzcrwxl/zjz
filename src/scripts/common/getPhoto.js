/**
 * Created by NHY on 2016/12/12.
 */
(function(w){
    function getFileUrl(sourceId) {
        var url;
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            if(!document.getElementById(sourceId).value) return false;
            url = document.getElementById(sourceId).value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            if(!document.getElementById(sourceId).files.item(0)) return false;
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            //if(document.getElementById(sourceId).files[0].name) return false;
            url = window.URL.createObjectURL(document.getElementById(sourceId).files[0]);
        }
        return url;
    }

    /**
     * 将本地图片 显示到浏览器上
     */
    function preImg(sourceId, targetId) {
        var url = getFileUrl(sourceId);
        var imgPre = document.getElementById(targetId);
        imgPre.src = url;
    }

    w.preImg=preImg;
    w.getFileUrl=getFileUrl;
})(window);