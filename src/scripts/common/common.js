/**
 * Created by NHY on 2016/12/15.
 */
function getAbsoluteUrl(url){
    var img = new Image();
    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
    url = img.src;  // 此时相对路径已经变成绝对路径
    img.src = null; // 取消请求
    return url;
}

function getUrl(file){
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}

function getUrlImages(source){
    var url = null;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        if(!source.value) return false;
        url = source.value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        if(!source.files.item(0)) return false;
        url = window.URL.createObjectURL(source.files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        //if(source.files[0]) return false;
        console.log(source.files);
        url = window.URL.createObjectURL(source.files[0]);
    }
    return url
}

$.fn.togglefn = function( fn ) {
    // Save reference to arguments for access in closure
    var args = arguments,
        guid = fn.guid || jQuery.guid++,
        i = 0,
        toggler = function( event ) {
            // Figure out which function to execute
            var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
            jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

            // Make sure that clicks stop
            event.preventDefault();

            // and execute the function
            return args[ lastToggle ].apply( this, arguments ) || false;
        };

    // link all the functions, so any of them can unbind this click handler
    toggler.guid = guid;
    while ( i < args.length ) {
        args[ i++ ].guid = guid;
    }

    return this.click( toggler );
}