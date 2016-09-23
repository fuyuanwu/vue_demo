$.extend(window[RO], {
    /**
     * confirm
     * show confirm MSG without confirm buttom
     * @ msg : content info
     * @ title : alert title if need
     * @ btn-text : btn text if need
     * @ animate_class : animate class by animate.css if need , base on css3
     * @ click_hide : click document to hide if need
     * @ callback : fire when confirm closed
     **/
    confirm: function(conf, callback) {
        var config = {
            msg: '给我一点儿提示',
            title: '',
            btn_text: '',
            animate_class: 'animated fadeIn',
            click_hide: false
        }
        config = $.extend(config, conf);
        window[RO].shade(true);
        //拼接html
        var _title = '';
        if (config.title !== '') {
            _title += '<p class="confirm_title" href="javascript:void(0)">' + config.title + '</p>';
        }
        var _html = '<div class="confirm ' + config.animate_class + '" id="J-confirm"><div class="confirm_wrap">' + _title + '<span class="confirm_close">×</span><p class="confirm_info">' + config.msg + '</p>';
        if (config.btn_text !== '') {
            _html += '<div class="confirm_btn_wrap"><a class="confirm_btn_cancel" href="javascript:void(0)">取消</a><a class="confirm_btn_success" href="javascript:void(0)">' + config.btn_text + '</a></div>';
        }
        _html += '</div></div>';
        $('body').append(_html);
        // 居中定位
        var $this = $('#J-confirm');
        var _height = $this.outerHeight() / 2 + 'px';
        var _width = $this.outerWidth() / 2 + 'px';
        $this.css({
            'margin-top': '-' + _height,
            'margin-left': '-' + _width
        }).removeClass('dn');
        //点击消失
        function removeAlert() {
            $this.remove();
            window[RO].shade(false);
        }
        if (config.click_hide) {
            $this.add('#shade').one('click', function() {
                removeAlert()
            });
        }
        $('.confirm_btn_cancel,.confirm_close').one('click', function() {
            removeAlert()
        });
        //按钮回调函数
        if (typeof callback === 'function') {
            $('.confirm_btn_success').on('click', function(e) {
                e.stopPropagation();
                removeAlert();
                callback();
            });
        }
    }
});