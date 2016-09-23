$.extend(window[RO], {
    /**
     * layer
     * @ showOrHide    true to show, false to hide
     * @ config          layer config
     */
    layer: function(showOrHide, config,callback) {
        var conf = {};
        $.extend(conf,{
            id: "",
            cancel_btn: true,
            confirm_html: "确定",
            cancel_html: "取消",
            head_title:  "",
            content_embed: ""
        },config);
        var structure = '<div class="layer" id="'+conf.id+'"><div class="head_bar"><p class="title">'+conf.head_title
                    +'<i class="close_icon"></i></p></div><div class="content">'
                    + conf.content_embed
                    +'<div class="btn_bar"><button class="btn btn-primary confirm_btn" submitting="false">'
                    +conf.confirm_html+'</button></div></div></div>'
        if (showOrHide) {
            if (!$(".layer").length) {
                $("body").append(structure);
                conf.cancel_btn && $('.confirm_btn').after('<button class="btn-hollow cancel_btn">'+conf.cancel_html+'</button>');
                $(".layer").fadeTo(0, 1);
                CP.shade(true);
            }
        } else {
            if ($(".layer").length) {
                $(".layer").fadeOut(0, function() {
                    $(".layer").remove();
                    CP.shade(false);
                    CP.loading(false);
                });
            }
        }
        $('.close_icon, .cancel_btn').click(function(){
            $(".layer").fadeOut(0, function() {
                $(".layer").remove();
                CP.shade(false);
                CP.loading(false);
            });
        });
        var width = $('.layer').width();
        var height = $('.layer').height();
        $('.layer').css("margin","-"+height/2+"px 0 0 -"+width/2+"px");
        !conf.cancel_btn && $('.confirm_btn').click(function(){
                $(".layer").remove();
                CP.shade(false);
                CP.loading(false);
            });
        //确认按钮回调函数
        if (typeof callback === 'function') {
            $('.confirm_btn').on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                callback(e);
                // $(".layer").remove();
                // CP.shade(false);
            });
        }
    }
});