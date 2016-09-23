$.extend(window[RO], {
    /**
     * alert
     * show alert MSG without confirm buttom
     * @ msg
     * @ title : alert title if need
     * @ btn-text : btn text if need
     * @ animate_class : animate class by animate.css if need , base on css3
     * @ click_hide : click document to hide if need
     * @ callback : fire when alert closed
     **/
    alert: function(conf, callback) {
        var config = {
            msg: '给我一点儿提示',
            title: '',
            btn_text: '',
            animate_class: 'animated fadeIn',
            click_hide: false,
            status: 'V'
        }
        config = $.extend(config, conf);
        //拼接html
        var _title = '';
        if (config.title !== '') {
            _title += '<p class="alert_title" href="javascript:void(0)">' + config.title + '</p>';
        }
        var status_cl = config.status === "V" ? "small_green_icon" : (config.status === "F" ? "missing_icon" : "");
        var _html = '<div class="alert ' + config.animate_class + '" id="J-alert"><div class="alert_wrap">'
                    + _title + '<p class="alert_info"><i class="'+status_cl+'"></i>' + config.msg
                    + '<span class="alert_close">×</span></p>';
        if (config.btn_text !== '') {
            _html += '<a class="alert_btn_default" href="javascript:void(0)">' + config.btn_text + '</a>';
        }
        _html += '</div></div>';
        !$('#J-alert').length && $('body').append(_html);

        // 居中定位
        var $this = $('#J-alert');
        var _height = $this.height() / 2 + 'px';
        var _width = $this.width() / 2 + 'px';
        $this.css({
            'margin-top': '-' + _height,
            'margin-left': '-' + _width
        }).removeClass('dn');
        //点击消失
        function removeAlert() {
            $this.remove();
            window.clearInterval(countId);
        }
        if (config.click_hide) {
            $this.add('#shade').one('click', function() {
                removeAlert();
            });
        }
        $('.alert_close').one('click', function() {
            removeAlert();
        });
        //关闭按钮悬浮
        $('.alert_close').hover(function(){
            $(this).css("color","#43A6FC");
        },function(){
            $(this).css("color","#fff");
        })
        //倒计时关闭
        var count = 2;
        var countId = setInterval(function(){
            count = count -1;
            if(count==0){
                window.clearInterval(countId);
                $('.alert_close').click();
                count = null;
                countId = null;
            }
            if($('#J-alert').length==0){
                window.clearInterval(countId);
                count = null;
                countId = null;
            }
        },1000);

        //按钮回调函数
        if (typeof callback === 'function') {
            $('.alert_close').on('click', function(e) {
                e.stopPropagation();
                removeAlert();
                callback();
            });
        }
    }
});