$.extend(window[RO], {
    // to dialog
    // only one dialog existing
    show_top_dialog: function(config) {
        var conf = {};
        $.extend(conf, {
            msg: "",
            type: "", // '' | 'failure' | 'success'
            auto_hide: false,
            hide_time: 0,
            time: 230
        }, config);

        var __id = window[RO].generate_rdmid("J-dialog_");

        function __show() {
            window[RO].shade(true, 100);
            // var $this = $('<div class="dialog_top ' + conf.type + '" id="' + __id + '"><span class="close_cross" data-shade="no" data-close="#' + __id + '" data-animate="fadeOut" data-animate_time="' + conf.time + '"></span><div class="d_t-content">' + '<i>&nbsp;&nbsp;&nbsp;</i>' + conf.msg + '</div></div>').appendTo("body"); //.slideDown(conf.time);
            var $this = $('<div class="dialog_top d_t-' + conf.type + '" id="' + __id + '"><span class="close_cross" data-shade="no" data-close="#' + __id + '" data-animate="fadeOut" data-animate_time="' + conf.time + '"></span><div class="d_t-content">' + '<i>&nbsp;&nbsp;&nbsp;</i>' + conf.msg + '</div></div>').appendTo("body");
            $this.add('#shade').one('click.dialog', function(e) {
                $this.remove();
                window[RO].shade(false);
                e.preventDefault();
                return false;
            });
            var current_dialog = $('#' + __id);
            current_dialog.css({
                'top': window[RO].compute_layer_y(current_dialog.outerHeight()) + 'px',
                'margin-left': '-' + current_dialog.outerWidth() / 2 + 'px'
            }).fadeIn(200).addClass('d-e-popin');
            // console.log(current_dialog)
            if (conf.auto_hide) {
                setTimeout(function() {
                    $this.removeClass('d-e-popin').fadeOut(conf.time, function() {
                        $this.remove();
                        window[RO].shade(false);
                    });
                }, conf.hide_time);
            }
        }
        var current = $(".dialog_top:visible");
        if (current.length) {
            current.stop(true, true).removeClass('d-e-popin').fadeOut(conf.time, function() {
                current.remove();
                __show();
            });
        } else {
            __show();
        }
    }
});