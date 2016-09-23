/**
 * @ Widget: bank selector
 * @ Create time:2013-11-18
 * @ Author: John Zhou
 * @ Email: pansmaze@gmail.com
 * @ Usage:
    var BANKS = new bankSelector({
                picker: $('#J-select_bank'),
                container: $('#bind_card_form'),
                displayer: $('#J-bank_img'),
                feedback: function(code) {
                    $('#J-bank_code_input').val(code);
                },
                banks: [{
                    code: 'ABC'
                }, {
                    code: 'BOC'
                }, {
                    code: 'CCB'
                }]
            });
 */
$.extend(window[RO], {
    select_banks: function(conf){
        var _this = this;
        conf = $.extend({
            picker: null, // 选择器
            container: null, // 容器
            displayer: null, // 回填img展示容器
            autoHide: false, // 是否选中后自动隐藏
            needBack: false, // 是否需要callback，与下面的backCallBack同时使用
            hasWeiqianbao: true, // 是否有微钱包
            weiqianbaoAsOther: false, // 是否以微钱包作为其它支付方式
            nav: false, // 是否有导航
            /*nav: [{
                    name: '钱包余额',
                    type: 1,
                    autoPick: 'yes'
                }, {
                    name: '网上银行',
                    type: 0,
                    autoPick: 'yes'
                }, {
                    name: '银联支付',
                    type: 2,
                    autoPick: 'yes'
                }],*/
            needLimit: false, // 是否需要查看限额
            needLimit_credit: true, // 是否需要查看信用卡限额
            backCallBack: function() {
                void 0;
            },
            pre_show: function() {
                void 0;
            },
            feedback: function(code) {
                console.log(code);
            },
            banks: [{}]
        }, conf);

        this.rid = conf.banks.rid = FI.helper.generate_rdmid('banks_');
        this.getList = function() {
            return $('#' + _this.rid);
        };

        if (conf.picker) {
            this.show = function() {
                conf.pre_show();
                var _list = _this.getList();
                var _oft = conf.picker.position();
                _list.parents(".mod_banks").css({
                    top: (_oft.top + 50),
                    left: _oft.left
                }).show();

                if (conf.autoHide) {
                    FI.helper.event_handle.click('.' + this.rid, function() {
                        _this.hide();
                    });
                }
                conf.picker.addClass('focus');
                FI.UI.safeInput_display(false, _list.offset(), _list.outerHeight());
                return false;
            };

            this.hide = function() {
                _this.getList().parents(".mod_banks").hide();
                conf.picker.removeClass('focus');
                FI.UI.safeInput_display(true);
            };
            conf.picker.on('click', function() {
                _this.show();
                return false;
            });
        }

        var res = nunjucks.render('tpl/js/widget/select_banks/banks.html', {
            rid: _this.rid,
            banks: conf.banks,
            needBack: conf.needBack,
            hasWeiqianbao: conf.hasWeiqianbao,
            nav: conf.nav,
            needLimit: conf.needLimit,
            debitOnly: !conf.needLimit_credit,
            weiqianbaoAsOther: conf.weiqianbaoAsOther,
            cdnUrl : window.cdnUrl
        });

        conf.container.append(res).on('click', '.J-select_bank_cards', function() {
            conf.displayer && conf.displayer.html('<img class="selected_bank_logo" src="' + $(this).children('.bank_logo').attr('src') + '" />');
            conf.feedback($(this).attr('data-code'), $(this).attr('data-name'));
            $(this).siblings('.active').removeClass('active').end().addClass('active');
            if (conf.autoHide) {
                _this.hide();
            }
        });

        if (conf.nav) {
            conf.container.on('click', '.select_banks_nav-item', function() {
                $(this).siblings('.select_banks_nav-item').removeClass('current').end().addClass('current');
                var _type = $(this).attr('data-type');
                conf.container.find('.J-select_bank_cards').addClass('dn').filter('[data-type=' + _type + ']').removeClass('dn');
                if ($(this).attr('data-apick') === 'yes') {
                    conf.container.find('.J-select_bank_cards:visible:first').click();
                }
            }).find('.select_banks_nav-item:first').click();
        }

        if (conf.needLimit) {
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

        if (conf.needBack) {
            _this.getList().siblings('.J-back_call_back').on('click', function(e) {
                // console.log(e)
                conf.backCallBack();
                e.preventDefault();
                return false;
            });
        }
    }
});
