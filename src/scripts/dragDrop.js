/**
 * Created by NHY on 2017/1/17.
 */
    //图文展示拖拽
(function(){
    $("#iframe").load(function() {
        var imgText = {
            // 初始化
            init: function () {
                var me = this;
                me.parent=$(".content-left-list");
                me.navBar="#moduleID00";
                me.imageText ="#moduleID01";
                me.imageList="#moduleID02";
                me.textList="#moduleID03";
                me.rollNotice='#moduleID04';
                me.imagePlay="#moduleID05";
                me.panelList = $("#iframe").contents().find('body')[0];


                // 为魔方导航拖拽源监听dragstart,设置关联数据
                me.parent.on("dragstart",me.navBar,function(e){
                    var event=e.originalEvent;
                    event.dataTransfer.setData('text/plain', 'navBar');
                    event.stopPropagation();
                });
                // 为图文展示拖拽源监听dragstart,设置关联数据
                me.parent.on("dragstart",me.imageText,function(e){
                    var event=e.originalEvent;
                    event.dataTransfer.setData('text/plain', 'imageText');
                    event.stopPropagation();
                });
                //为图文列表拖拽源监听dragstart,设置关联数据
                me.parent.on("dragstart",me.imageList,function(e){
                    var event=e.originalEvent;
                    event.dataTransfer.setData('text/plain', 'imageList');
                    event.stopPropagation();
                });
                //为图文列表拖拽源监听dragstart,设置关联数据
                me.parent.on("dragstart",me.imagePlay,function(e){
                    var event=e.originalEvent;
                    event.dataTransfer.setData('text/plain', 'imagePlay');
                    event.stopPropagation();
                });
                //为滚动公告添加拖拽监听事件
                me.parent.on('dragstart',me.rollNotice,function(e){
                    var event= e.originalEvent;
                    event.dataTransfer.setData('text/plain','rollNotice');
                    event.stopPropagation();
                });
                // 为图文展示拖拽源监听dragstart,设置关联数据
                me.parent.on("dragstart",me.textList,function(e){
                    var event=e.originalEvent;
                    event.dataTransfer.setData('text/plain', 'textList');
                    event.stopPropagation();
                });

                // 拖拽鼠标移入元素,在拖放目标上设置视觉反馈
                me.panelList.addEventListener('dragenter', me.onDragEnter, false);

                // 取消元素dragover默认行为,使其可拖放
                me.panelList.addEventListener('dragover', me.onDragOver, false);

                // 拖拽移出元素,清除视觉反馈
                me.panelList.addEventListener('dragleave', me.onDragLeave, false);

                // 鼠标释放,在拖放目标上接收数据并处理
                me.panelList.addEventListener('drop', me.onDrop, false);
            },
            onDragEnter: function (e) {
                e.preventDefault();
                e.stopPropagation();
            },
            onMouseUp: function (e) {
                e.preventDefault();
            },
            onDragLeave: function (e) {
                e.stopPropagation();
            },
            onDragOver: function (e) {
                e.preventDefault();
                e.stopPropagation();
            },
            onDrop: function (e) {
                var id = e.dataTransfer.getData('text/plain');
                switch (id){
                    case "navBar":
                        $("#moduleID00").click();
                        break;
                    case "imageText":
                        $("#moduleID01").click();
                        break;
                    case "imageList":
                        $("#moduleID02").click();
                        break;
                    case "textList":
                        $("#moduleID03").click();
                        break;
                    case "imagePlay":
                        $("#moduleID05").click();
                        break;
                    case "rollNotice":
                        $('#moduleID04').click();
                        break;
                    default:break;
                }

                e.preventDefault();
                e.stopPropagation();
            }

        };

        imgText.init();
        document.body.addEventListener("drop", function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });
})();