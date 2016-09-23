$.extend(window[RO], {
    return function(conf) {
        var _this = this;
        conf = $.extend(true, {
            container: $('body'),
            channel: {
                quickpay: false,
                mycards: false,
                weiqianbao: false,
                weiqianbao_balance: false,
                savings: false,
                UPOP: false,
                netbank: false,
                basic_account: false,
                cdnUrl: window.cdnUrl
            }
        }, conf);

        var res = nunjucks.render('tpl/js/widget/payer/body.html', conf.channel);

        $(conf.container).html(res);

        FI.UI.generate_radio(conf.container.find(".J-radio"));

        if (conf.channel.netbank || conf.channel.UPOP) {
            require(['js/data/quota'], function(quota) {
                var _quota = quota(conf.needLimit_credit);
                conf.container.on('mouseenter', '.J-check_quota', function() {
                    var _layer = $(this).children('.bubble_layer');
                    if (_layer.html() === '') {
                        var _bcode = $(this).attr('data-code');
                        _layer.html('<span class="carrot_bottom"></span>' + _quota[_bcode]).css('visibility', 'hidden').show();

                        var __h = $(this).children('.bubble_layer').height();
                        var __w = $(this).children('.bubble_layer').width();
                        if (__h > 150) {
                            _layer.width(__w * 3);

                            var __tw = $(this).find('.quota_table').width();
                            _layer.width(__tw);
                        }

                        __w = $(this).children('.bubble_layer').width();
                        _layer.css('margin-left', '-' + (__w / 2 + 18) + 'px').hide().css('visibility', 'visible');
                    }

                    _layer.show();
                }).on('mouseleave', '.J-check_quota', function() {
                    $(this).children('.bubble_layer').hide();
                });
            });
        }

        if (conf.channel.netbank) {
            conf.container.find('.J-select_netbank').click(function() {
                $(this).find('.icon-lart').toggleClass('icon-larb');
                $(this).parent().next('.bubble_layer-netbank').toggleClass('dn');
            });

            conf.container.find('.J-radio_relative-netbank').click(function() {
                $('.J-radio_relative.active,.payer-channel.active,.J-radio_relative-netbank').removeClass('active');
                $(this).addClass('active');

                var netradio = conf.container.find('.J-payer-channel[value=netbank]');
                netradio.attr({
                    'data-code': $(this).attr('data-code'),
                    'data-name': $(this).attr('data-name')
                }).prop('checked', true).change();
            });
        }

        conf.container.find('.J-radio_relative').click(function() {
            var _radio = $(this).find('.J-payer-channel');

            $('.J-radio_relative.active,.payer-channel.active,.J-radio_relative-netbank').removeClass('active');
            $(this).addClass('active');

            if (!$(this).hasClass('payer-channel')) {
                $(this).parents('.payer-channel').addClass('active');
            }
            _radio.prop('checked', true).change();
        });

        conf.container.find('.J-payer-channel').change(function() {
            if ($(this).prop('checked')) {
                var p1 = $(this).attr('data-code') || $(this).attr('data-bcid');
                var p2 = $(this).attr('data-name');
                var _val = $(this).val();

                $form = $(this).parents('form:first');
                if (_val === 'savings' || _val === 'quickpay' || _val === 'mycards') {
                    $form.data('needLoading_info', '交易正在处理，请耐心等待');
                } else {
                    $form.removeData('needLoading_info');
                }
                conf.channel[_val].callback(p1, p2);
            }
        });
    };
});