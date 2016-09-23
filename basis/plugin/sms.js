/**
 * @ Plugins: send sms code
 * @ Create time:2013-11-18
 * @ Author: John Zhou
 * @ Email: pansmaze@gmail.com
 * @ Usage:
    send_sms($('#J-send_sms'));
 */
// 依赖 /basis/library/cache_vfeild.js
//      /basis/library/count_down.js
(function() {
    function count_down_mvcode(em) {
        window[RO].count_down(em, {
            start: 60,
            suffix: "秒后重新获取",
            cb: function() {
                em.removeClass("disabled");
                em.removeClass("disabled").html("获取验证码");
            },
            set_context: function(that, ctxt) {
                that.html(ctxt);
            }
        });
    }
    window[RO].plugin.sms = function($this, fv_instance) {
        if ($this.hasClass("disabled")) {
            return false;
        }

        var mobile_data = {};
        var result = true;
        // count_down_mvcode($this);return false;

        if (fv_instance) {
            var _v_it = fv_instance.v_it();
            $form = $this.parents('form:first');
            window[RO].cache_vfeild($($this.attr('data-sms')));
            if (!_v_it) {
                window[RO].cache_vfeild($($this.attr('data-sms')), true);
                return false;
            }
            window[RO].cache_vfeild($($this.attr('data-sms')), true);

            mobile_data = $form.serialize();
            result = _v_it.result;
        } else {
            var _mobile_num_em = $($this.attr("data-mobile"));

            var _mobile_num_em_val = _mobile_num_em.val();

            if ($.trim(_mobile_num_em_val) === '') {
                window[RO].show_form_error(_mobile_num_em, '请填写手机号码', '');
                return false;
            } else if (!/^1\d{10}$/.test(_mobile_num_em_val)) {
                window[RO].show_form_error(_mobile_num_em, '手机号输入错误，请重新输入', '');
                return false;
            }

            if (_mobile_num_em.length) {
                mobile_data[_mobile_num_em.attr("name")] = _mobile_num_em_val;
            }
            console.log("go");
        }

        mobile_data._rd = Math.random();

        var _api = $this.attr("data-api");
        if (result) {
            $this.addClass("disabled");
            count_down_mvcode($this);
            window[RO].ajax({
                url: _api,
                type: 'POST',
                data: mobile_data,
                success: function(ret) {
                    window[RO].ajax_success(ret, function(data) {}, function(data) {
                        window[RO].alert({
                            msg: "获取验证码失败，" + data.responseMsg
                        });
                    });
                },
                error: function(xhr, status, error) {
                    window[RO].ajax_error(xhr, status, error, function(etxt) {
                        window[RO].alert({
                            msg: "获取验证码失败，" + etxt
                        });
                    });
                }
            });
        }
    };
})();