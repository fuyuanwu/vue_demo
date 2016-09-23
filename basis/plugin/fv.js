
(function() {
    var DICT = { /*空*/
        empty: {
            exp: /[^\s]/,
            err: '请输入%s'
        },
        empty_select: {
            exp: /[^\s]/,
            err: '请选择%s'
        },
        /*纯数字*/
        number: {
            exp: /^[0-9]+$/,
            err: '%s只能输入数字'
        },
        /*整数*/
        integer: {
            exp: /^[0-9]+$/,
            err: '%s只能输入整数'
        },
        /*小数*/
        decimal: {
            exp: /^[0-9]+(\.[0-9]+)?$/,
            err: '%s只能输入整数或小数'
        },
        /*中文*/
        chinese: {
            exp: /^[\u2E80-\uFE4F]+$/,
            err: '%s只能输入汉字'
        },
        /*姓名*/
        name: {
            exp: /^([\u4e00-\u9fa5|A-Z]+\s*\.?\s*)+$/,
            err: '%s只能由中文汉字或大写英文字母构成'
        },

        /*真实姓名*/
        chinese_ch: {
            exp: /^[\u2E80-\uFE4F]{2,6}$/,
            err: '%s只能输入2-6位中文字'
        },

        consignee: {
            exp: /^[a-zA-Z\u4E00-\u9FA5]+$/i,
            err: '%s只能由中文汉字或英文字母构成'
        },
        address: {
            exp: /^[0-9a-zA-Z\-\u4E00-\u9FA5]+$/i,
            err: '%s只能由中文汉字、英文字母或者数字构成'
        },
        /*true name*/
        //truename: {exp: /^[\u2E80-\uFE4F]{2,50}|^\w{4,110}$/, err: '%s只能由2-50个中文汉字或4-110个英文字母构成'},
        truename: {
            exp: /^[^\*]{2,50}$/,
            err: '%s输入错误，请重新输入'
        },
        /*身份证*/
        id: {
            exp: /^\d{14}[0-9a-zA-Z]$|^\d{17}[0-9a-zA-Z]$/,
            // exp: /^\d{14}[0-9xX]$|^\d{17}[0-9xX]$/,
            err: '身份证号码输入错误，请重新输入'
        },
        passport: {
            exp: /^[A-Za-z]\d{7,8}$/,
            err: '护照号码输入错误，请重新输入'
        },
        /*邮箱*/
        email: {
            exp: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            err: '邮箱格式错误'
        },
        miemail: {
            exp: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2,5})?)$/,
            err: '邮箱格式错误'
        },
        /*手机号*/
        mobile: {
            exp: /^1[\d\s]{10}$/,
            err: '手机号格式有误'
                //err: '你输入的是一个无效手机号'
        },
        r_mobile: {
            exp: /^1\d{10}$/,
            err: '请填写11位手机号码'
        },
        t_mobile_e: {
            exp: /[^\s]/,
            err: '手机号未填写'
        },
        t_mobile: {
            exp: /^1\d{10}$/,
            err: '请填写11位手机号码'
        },
        /* 卡号 */
        bank_card: {
            exp: /^[0-9\s]{12,24}$/,
            err: '请输入正确的%s'
        },
        // bank_credit_card {
        //     exp: /^\d{6,25}$/,
        //     err: '%s只能是6~25位数字'
        // }
        /* CVV */
        CVV: {
            exp: /^\d{3,4}$/,
            err: '%s只能是3或4位数字'
        },
        /* 验证码 */
        vcode: {
            exp: /^\w{4}$/,
            err: '%s有误，重新输入'
        },
        /* 图片验证码 */
        pvcode: {
            exp: /^\w{4,8}$/,
            err: '%s有误，请重新输入'
        },
        /* 验证短信码 */
        sms_vcode: {
            exp: /^\w{6,8}$/,
            err: '%s有误，重新输入'
        },
        /* 有效期 */
        validDate: {
            exp: /^\d{4,10}$/,
            err: '%s只能是4~10位数字'
        },
        /*金额*/
        amount: {
            // exp: /^[0-9]+(\.[0-9]{0,2})?$/,
            exp: /^(([1-9][0-9]*)|0)\.[0-9]{1,2}$|^[1-9][0-9]*$/,
            err: '%s只能是整数或2位以内小数'
        },
        /*可以为0的金额*/
        money: {
            // exp: /^[0-9]+(\.[0-9]{0,2})?$/,
            exp: /^(([1-9][0-9]*)|0)\.[0-9]{1,2}$|^[0-9][0-9]*$/,
            err: '%s只能是整数或2位以内小数'
        },
        /*整数*/
        amount_integer: {
            exp: /^[0-9]+$/,
            err: '%s只能输入整数'
        },
        /*必须为100的倍数*/
        amount_hundred: {
            exp: /^[1-9]\d*00$/,
            err: '%s只能是100的倍数'
        },
        /*必须为1000的倍数*/
        amount_thousand: {
            exp: /^[1-9]\d*000$/,
            err: '%s只能是1000的倍数'
        },
        /*微博账号*/
        wbAccount: {
            exp: /^1\d{10}$|^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            err: '%s必须是手机号或邮箱地址'
        },
        /*密码*/
        password: {
            exp: /^\S{6,20}$/,
            err: '%s长度只能是6~20位'
        },
        /*支付密码*/
        paypassword: {
            exp: /^.{6,20}$/,
            err: '%s长度6~20位'
        },
        /*设置支付密码*/
        s_paypassword: {
            exp: /^.{8,16}$/,
            err: '%s长度8~16位'
        },
        /*验证支付密码*/
        v_paypassword: {
            exp: /^.{1,50}$/,
            err: '%s长度必须小于50位'
        },
        //m_paypassword: {exp: /^\S{8,20}$/, err: '支付密码太简单了，请重新输入，建议你修改成大小写字母+数字+符号的混合式密码'},
        /*微博密码*/
        wbPassword: {
            exp: /[^\s]/,
            err: '请输入微博登录密码'
        },
        /* 邮编 */
        zip: {
            exp: /^\d{6}$|^[\s]$/,
            err: '请正确的邮政编码'
        }
    };
    var LEN = {
        len: '%s1长度为%s2位',
        minlen: '%s1长度不能小于%s2位',
        maxlen: '%s1长度不能超过%s2位',
        minval: '%s1不能小于%s2',
        maxval: '%s1不能大于%s2',
        paybalance: ' '
    };

    var IDCard = {
        cities: {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        },
        checkCard: function(card) {
            return this.isCardNo(card) && this.checkProvince(card) && this.checkBirthday(card) && this.checkParity(card);
        },
        isCardNo: function(card) {
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/i;
            return reg.test(card);
        },
        checkProvince: function(card) {
            var province = card.substr(0, 2);
            if (this.cities[province] == undefined) {
                return false;
            }
            return true;
        },
        checkBirthday: function(card) {
            var len = card.length;
            //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
            if (len == '15') {
                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arr_data = card.match(re_fifteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date('19' + year + '/' + month + '/' + day);
                return this.verifyBirthday('19' + year, month, day, birthday);
            }
            //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
            if (len == '18') {
                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i;
                var arr_data = card.match(re_eighteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date(year + '/' + month + '/' + day);
                return this.verifyBirthday(year, month, day, birthday);
            }
            return false;
        },
        checkParity: function(card) {
            var len = card.length;
            if (len == '18') {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0,
                    i, valnum;
                for (i = 0; i < 17; i++) {
                    cardTemp += card.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[cardTemp % 11];
                if (valnum == card.substr(17, 1).toUpperCase()) {
                    return true;
                }
                return false;
            }
            return true;
        },
        verifyBirthday: function(year, month, day, birthday) {
            var now = new Date();
            var now_year = now.getFullYear();
            //年月日是否合理
            if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                //判断年份的范围（0岁到120岁之间)
                var time = now_year - year;
                if (time >= 0 && time <= 120) {
                    return true;
                }
                return false;
            }
            return false;
        }
    };


    window[RO].plugin.fv = function($form, config, RULE) {
        var _this = this;
        // validation core
        function v_it(show_err_fn, em) {
            var _set = em || $form.find("input[data-vfield]:visible:enabled,select[data-vfield]:visible:enabled,input[type=hidden][data-vfield],input[type=checkbox][data-vfield]:visible:enabled");
            // console.log(_set)
            var _v_ret = {
                result: true,
                ary: []
            };
            $form.find('.input_hint').hide();
            $.each(_set, function(k, v) {
                var $this = $(this);
                $this.val($.trim($this.val()));
                var _ret = true;
                var _msg = "";

                var name = $this.attr("data-vfield"),
                    val = $this.val(),
                    rules, empty_ignore, same_as_em, etext_same_as, not_same_as_em, etext_not_same_as;

                var this_id = $this.attr('id');
                if (RULE[this_id] && typeof RULE[this_id].forcepass === 'function' && RULE[this_id].forcepass(val)) { // force pass
                    // do nothings
                } else {
                    // console.log(RULE)
                    rules = RULE[this_id].rules;
                    empty_ignore = RULE[this_id].empty_ignore || false;
                    same_as_em = RULE[this_id].same_as;
                    etext_same_as = RULE[this_id].etext_same_as;

                    not_same_as_em = RULE[this_id].not_same_as;
                    etext_not_same_as = RULE[this_id].etext_not_same_as;
                    // console.log(rules)

                    if ($this[0].tagName == "SELECT") {
                        (val === "selectplease" || !val) && (val = "");
                        // console.log(val)
                    }
                    if ($this.attr('type') === 'checkbox') {
                        if (!$this.is(':checked')) {
                            _ret = false;
                            _msg = $this.attr('data-vfield');
                        }
                    } else {
                        rules = rules.split(" ");
                        for (var i = 0; i < rules.length; i++) {
                            // amount trim '0'
                            if (rules[i].indexOf('amount') !== -1) {
                                var _this_v = $this.val();
                                while (_this_v[0] === '0') {
                                    if (_this_v[1] === '.') {
                                        break;
                                    } else {
                                        _this_v = _this_v.slice(1);
                                    }
                                }
                                $this.val(_this_v);
                                val = _this_v;
                            }
                            // ignore empty
                            if (rules[i] === "empty") {
                                if (empty_ignore === $this.val()) {
                                    _ret = false;
                                    break;
                                }
                            }
                            // ignore empty
                            if (rules[i] === "jobNo") {
                                if (/^[0-9]+$/.test($this.val())) {
                                    _msg = "格式错误";
                                    _ret = false;
                                    break;
                                }
                            }
                            // ID card
                            if (rules[i] === "ID") {
                                if (!IDCard.checkCard(val)) {
                                    _msg = "身份证号码输入错误，请重新输入";
                                    _ret = false;
                                    break;
                                }
                            }
                            // 重复支付密码
                            if (rules[i] === "same_as") {
                                if ($(same_as_em).val() !== $this.val()) {
                                    _ret = false;
                                    _msg = etext_same_as; // must be private msg
                                    break;
                                }
                            }
                            // not重复支付密码
                            if (rules[i] === "not_same_as") {
                                if ($(not_same_as_em).val() === $this.val()) {
                                    _ret = false;
                                    _msg = etext_not_same_as; // must be private msg
                                    break;
                                }
                            }
                            if (DICT[rules[i]]) {
                                if (!DICT[rules[i]].exp.test(val)) {
                                    var alert_msg = RULE[this_id]["etext_" + rules[i]] || DICT[rules[i]]['err'];
                                    _ret = false;
                                    _msg = alert_msg.replace(/%s/g, name);
                                    break;
                                }
                            }
                            //自定义整数倍
                            if (rules[i] === "integer_multiples") {
                                var expect_text = parseInt(RULE[this_id][rules[i]]);
                                if (val % expect_text !== 0) {
                                    _ret = false;
                                    _msg = "请输入" + expect_text + "的整数倍";
                                    break;
                                }
                            }
                            if (LEN[rules[i]]) {
                                var r = true;
                                var expect_text = RULE[this_id][rules[i]];
                                var expect_int = parseInt(expect_text, 10);
                                var expect_float = parseFloat(expect_text, 10);
                                switch (rules[i]) {
                                    case "len":
                                        r = val.length == expect_int;
                                        break;
                                    case "minlen":
                                        r = val.length >= expect_int;
                                        break;
                                    case "maxlen":
                                        r = val.length <= expect_int;
                                        break;
                                    case "minval":
                                        r = parseFloat(val, 10) >= expect_float;
                                        // console.log(val, parseFloat(val, 10) >= expect_float, expect_float)
                                        break;
                                    case "maxval":
                                        r = parseFloat(val, 10) <= expect_float;
                                        break;
                                    case "paybalance":
                                        r = parseFloat(val, 10) <= expect_float;
                                        break;
                                    default:
                                        r = true;
                                }
                                if (!r) {
                                    var alert_msg = RULE[this_id]["etext_" + rules[i]] || LEN[rules[i]];
                                    _ret = false;
                                    _msg = alert_msg.replace(/%s1/g, name).replace(/%s2/g, expect_text);
                                    break;
                                }
                            }

                            /* 需要强制重置值为空的校验规则需要发生在empty校验之后 */
                            // 验证支付密码
                            if (rules[i] === "v_paypassword") {
                                if ((/[^\x00-\xff]/.test(val)) || /\s+/.test(val)) {
                                    // $this.val("");
                                    _ret = false;
                                    _msg = "支付密码错误";
                                    break;
                                }
                            }
                            // 修改支付密码
                            if (rules[i] === "m_paypassword") {
                                // if (parseInt(window[RO].helper.pwdStrength(val), 10) < 2) {
                                //     // $this.val("");
                                //     _ret = false;
                                //     _msg = "支付密码太简单了，请重新输入"; //，建议你修改成大小写字母+数字+符号的混合式密码"
                                //     break;
                                // } else if (/[^\x00-\xff]/.test(val) || /\s+/.test(val)) {
                                //     // $this.val("");
                                //     _ret = false;
                                //     _msg = "支付密码必须由6-20位字母、数字或符号组成";
                                //     break;
                                // }
                                if (/[^\x00-\xff]/.test(val) || /\s+/.test(val)) { // 特殊字符
                                    _ret = false;
                                    _msg = "支付密码必须由6-20位字母、数字或符号组成";
                                    break;
                                }
                                var _s = val.slice(0, 1),
                                    _ss = '';
                                for (var j = 0; j < val.length; j++) {
                                    _ss += _s;
                                }
                                if (_ss === val) {
                                    _ret = false;
                                    _msg = "支付密码不能设置相同的字母/数字/符号";
                                    break;
                                }
                                if (/^[0-9]+$/.test(val)) {
                                    var _s1 = '',
                                        _s2 = '';
                                    _s = parseInt(_s, 10);
                                    for (var j = 0; j < val.length; j++) {
                                        _s1 += _s + j;
                                        _s2 += _s - j;
                                    }
                                    if (_s1 === val || _s2 === val) {
                                        _ret = false;
                                        _msg = "支付密码不能设置连续的数字";
                                        break;
                                    }
                                }
                            }
                            // 金额不能为0
                            if (rules[i].indexOf("amount") !== -1) {
                                if (parseFloat((val), 10) === 0) {
                                    // $this.val("");
                                    _ret = false;
                                    _msg = "金额必须大于0";
                                    break;
                                }
                            }
                            // 自定义校验函数
                            // custom 接收参数为当前值，返回值为对象{result: 结果,msg:原因}
                            if (rules[i] === 'custom') {
                                var ret_obj = RULE[this_id].custom(val);
                                if (!ret_obj.result) {
                                    _ret = false;
                                    _msg = ret_obj.msg;
                                    break;
                                }
                            }
                        }
                    }
                    if (!_ret) { // push ret
                        _v_ret.result = false;
                        _v_ret.ary.push({
                            em: $this,
                            key: $this.attr('data-vfield'),
                            err: _msg
                        });

                        if (typeof show_err_fn === "function") {
                            show_err_fn($this, _msg);
                        }
                    }
                }
            });
            return _v_ret;
        }
        // form ajax submit core
        function form_ajax(configure) {
            var conf = {
                show_v_error: function(input_em, msg) {
                    window[RO].show_form_error(input_em, msg);
                },
                _init_even: function(s_v_e_fn) {
                    $form.find("input[data-vfield],textarea[data-vfield]").focus(function() {
                        $(this).parent().children("span.input_hint").stop(true, true).remove();
                    }).blur(function() {
                        var __this = $(this);
                        setTimeout(function() {
                            v_it(s_v_e_fn, __this);
                        }, (parseInt($(this).attr('data-vdelay'), 10) || 0));
                    });
                    $form.find('#J-mobile').on('keydown', function(e) {
                        var keydict = {
                            8: true, // backspace
                            46: true, // del
                            9: true, // tab
                            37: true, // <-
                            35: true, // home
                            36: true, // end
                            39: true, // ->
                            116: true, // F5
                            110: true, // del .
                            190: true // .
                        }
                        if ((47 < e.which && e.which < 58) || (95 < e.which && e.which < 106) || keydict[e.which]) {
                            void 0;
                        } else {
                            e.preventDefault();
                            return false;
                        }
                    });
                },
                start: function() {
                    console.log("start");
                },
                end: function() {
                    console.log("end");
                },
                success: function(data) {
                    console.log(data);
                },
                error: function(data) {
                    console.log(data);
                },
                _error: function(xhr, status, error) {
                    window[RO].ajax_error(xhr, status, error, conf.clearpwd);
                },
                no_ajax: false,
                just_verify: false
            };
            $.extend(conf, configure);
            conf._init_even(conf.show_v_error);

            // pub pay pwd fn
            var pwd_component = false;
            var safe_em_set = $form.find("input[data-encrypt]");
            if (safe_em_set.length) {
                function get_safe_html(t1, t2) {
                    return "<div class='safe_em_hint'><span>" + t1 + "</span><p></p></div><div class='safe_em_hint-action'><a href='http://download.pay.sina.com.cn/paycontrol/WeiboPayCtrl.exe' target='_blank'>" + t2 + "</a></div>";
                }
                window[RO].reqJs('plugin/safe_component', function() {
                    pwd_component = new CP.plugin.safe_component({
                        em: safe_em_set,
                        salt_url: "/ext/getSalt",
                        uninstalled: function() {
                            safe_em_set.after(get_safe_html('安全控件可以保护您输入信息的安全', '点击安装安全控件'));
                        },
                        need_update: function() {
                            safe_em_set.after(get_safe_html('您的安全控件版本过低，请升级', '点击升级安全控件'));
                        },
                        v_safe_tool_input: function(input_el, set_val) {
                            if (set_val === null || set_val === "") {
                                conf.show_v_error(input_el, "请填写" + input_el.attr("data-vfield"));
                            }
                            return set_val !== null;
                        },
                        component: { // component object configure
                            minVersion: "2.0.0",
                            curVersion: "2.0.4",
                            MaxLength: "20",
                            PassEdit: "2",
                            width: "234",
                            height: "32",
                            tabindex: "1",
                            base64Cert: "-----BEGIN CERTIFICATE-----\nMIICCzCCAXQCCQDS3bwzUSZwWTANBgkqhkiG9w0BAQUFADBJMQswCQYDVQQGEwJBVTETMBEGA1UEChMKV0VJSFVJLkNPTTElMCMGA1UECxMcV0VJSFVJIFRlbXBvcmFyeSBDZXJ0aWZpY2F0ZTAgFw0xMjA5MjkwMDUzNDJaGA8yMTEyMDkwNTAwNTM0MlowSTELMAkGA1UEBhMCQVUxEzARBgNVBAoTCldFSUhVSS5DT00xJTAjBgNVBAsTHFdFSUhVSSBUZW1wb3JhcnkgQ2VydGlmaWNhdGUwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAOInRLmoDJp1whLf3jvuaFGyB7OlmS5u4LmDX5rattEpLQ9uvUeEBPw8++ldD2Z6d5RNe7s5Y4RsaIn+FgjF+tSy3yIkpiZxxzXJMtIwzSbtXRgpa5fo0w0l/LgdHnMSTJzWncOGTrzmuuzAVtwa9NV89MzcsPoFOxftnVucud2xAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAvLtaFZb49HOKToh9/562CZlCZz9QNl3OQh+EmFP3tvuTsF0/0vRTM5fkfVXMilBBLiDiCchpY063iinV5oDgMjWQ4MfOj5jt2GUXiwsRXMM1Grb4NzSiMrwOEHoB3tm1W7Or/ffvcGF76WyE7fBg9s1sYT9xU/6gbkt0IyDuwj0=\n-----END CERTIFICATE-----",
                            pubkey: false
                        }
                    });
                });

            }

            $form.unbind('submit').submit(function(e) {
                var submiter = $form.find("[type=submit]");
                if (window[RO].submiter_block(submiter)) {
                    return false;
                }

                var ret = v_it(conf.show_v_error);
                if (!ret.result) {
                    conf.end();
                    return false;
                };

                function _really_submit(callback) {
                    // console.log(4)
                    if (conf.needBlankWindow) {
                        // FI.UI.blank_window($('#buybt_form'));
                    }

                    conf.start();
                    var send_data = {};
                    $.each($form.serializeArray(), function(key, val) {
                        if ($.trim(val.value) === "") {
                            if ($form.find("[name=" + val.name + "]:visible").length) {
                                send_data[val.name] = val.value;
                            }
                        } else {
                            send_data[val.name] = val.value;
                        }
                    });
                    send_data._rd = Math.random();
                    window[RO].submiter_block(submiter, true);

                    $.ajax({
                        url: $form.attr("action"),
                        type: $form.attr("method"),
                        data: send_data,
                        dataType: "json",
                        success: function(ret) {
                            // 表单提交成功
                            $form.removeData("submitting");
                            // $form.data('needLoading_info') && FI.UI.loading_info(false);
                            window[RO].submiter_block(submiter, false);
                            CP.ajax_success(ret, function(data) {
                                // 执行conf.success
                                (typeof callback === "function") && callback();
                                conf.end();
                                conf.success(data);
                            }, function(data) {
                                // 按reasons来显示form错误或者顶部alert
                                // console.log(data)
                                if (typeof callback === "function") {
                                    callback();
                                }
                                if (data.head.code !== '414') { // 414错误，不需要显示公共报错浮层，私有处理
                                    // FI.UI.all_form_err($form, data);
                                }
                                if (data.head.code == '205') { //205错误，刷新页面就好
                                    location.reload();
                                }
                                conf.end();
                                // 执行额外的error处理
                                conf.error(data);
                            }, true);
                        },
                        error: function(xhr, status, error) {
                            $form.removeData("submitting");
                            // $form.data('needLoading_info') && FI.UI.loading_info(false);
                            window[RO].submiter_block(submiter, false);
                            (typeof callback === "function") && callback();
                            conf.end();
                            conf._error(xhr, status, error);
                        }
                    });
                }

                if (!conf.no_ajax) {
                    if ($form.data("submitting") == "yes") {
                        return false;
                    }
                    $form.data("submitting", "yes");
                    // $form.data('needLoading_info') && FI.UI.loading_info(true, $form.data('needLoading_info'));
                    if (!pwd_component) {
                        _really_submit();
                    } else {
                        pwd_component.pre_submit(function() {
                            // avoid remember pwd fn of browser
                            safe_em_set.each(function() {
                                var _name = $(this).attr('name');
                                $form.find('input[type=hidden][name=' + _name + ']').remove().end().prepend('<input name="' + _name + '" type="hidden" />').find('input[type=hidden][name=' + _name + ']').val($(this).val());
                                $(this).attr('data-name', $(this).attr('name')).removeAttr('name').val('');
                            });
                            _really_submit(function() {
                                safe_em_set.each(function() {
                                    $(this).attr('name', $(this).attr('data-name')).removeAttr('data-name');
                                    if ($(this).attr('data-keep') === 'yes' && $(this).data("cache_val")) {
                                        $(this).val($(this).data("cache_val")).removeData("cache_val");
                                    }
                                });
                            });
                        }, function(xhr, status, error) {
                            $form.removeData("submitting");
                            $form.data('needLoading_info') && FI.UI.loading_info(false);
                            window[RO].submiter_block(submiter, false);
                            // FI.UI.show_top_dialog({
                            //     msg: '获取加密salt失败',
                            //     type: "failure",
                            //     auto_hide: true,
                            //     hide_time: 5000,
                            //     time: 88
                            // });
                            conf.error(xhr, status, error);
                        });
                    }

                    e.preventDefault();
                    return false;
                } else {
                    conf.start();
                    window[RO].submiter_block(submiter, true);
                    return true;
                }
            });

            if (conf.just_verify) {
                $form.unbind('submit').submit(function() {
                    var ret = v_it(conf.show_v_error);
                    if (ret.result) {
                        conf.success(ret);
                    } else {
                        conf.error(ret);
                    }
                    return false;
                });
            }

            _this.v_it = function(thisem) {
                return v_it(conf.show_v_error, thisem);
            };
        }

        form_ajax(config);


        /* deal with other pub form trick */
        // 金额输入规范化
        $form.find('.amount_fix').on('keydown', function(e) {
            // console.log(e.which);return true;
            var keydict = {
                8: true, // backspace
                46: true, // del
                18: true, // tab
                37: true, // <-
                35: true, // home
                36: true, // end
                39: true, // ->
                116: true, // F5
                110: true, // del .
                190: true // .
            }
            if ((47 < e.which && e.which < 58) || (95 < e.which && e.which < 106) || keydict[e.which]) {
                void 0;
            } else {
                e.preventDefault();
                return false;
            }
        }).on('keyup', function() {
            // 搜狗输入法会改变e.which，只好强制干掉非金额部分
            var $this = $(this);
            var this_val = $this.val();
            var this_val_replaced = this_val.replace(/[^0-9\.]/g, '');
            (this_val !== this_val_replaced) && $this.val(this_val_replaced);
        });

        // async single input feild validation
        $form.find('[data-async_sv]').on('blur.async_sv', function(e) {
            var $this_em = $(this);
            var _api = $this_em.attr('data-async_sv');
            var _val = $this_em.val();
            var _name = $this_em.attr('name');
            $.ajax({
                url: _api,
                type: 'GET',
                data: {
                    value: _val
                },
                dataType: "json",
                success: function(ret) {
                    window[RO].ajax_success(ret, function(data) {
                        // do nothing
                    }, function(data) {
                        window[RO].show_form_error($this_em, data.body.reasons[_name]);
                    });
                },
                error: function(xhr, status, error) {
                    // do nothing
                }
            });
        });
        //在每个表单里面插入存放token的隐藏input
        // $form.find('input[name=token]').length === 0 && $form.prepend('<input type="hidden" name="token" value="' + window[RO].htmlEncode(window[RO].g_var.token) + '" >');

        function toChinese(n) {
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                return "";
            var unit = "千百拾亿千百拾万千百拾元角分",
                str = "";
            n += "00";
            var p = n.indexOf('.');
            if (p >= 0)
                n = n.substring(0, p) + n.substr(p + 1, 2);
            unit = unit.substr(unit.length - n.length);
            for (var i = 0; i < n.length; i++)
                str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
            return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
        }

        if ($form.find('[data-chinese]').length) {
            function chinese_go() {
                setTimeout(function() {
                    $form.find('[data-chinese]').each(function(e) {
                        var _val = $(this).data('val_cached') || '';

                        if (_val !== $(this).val()) {
                            _val = $(this).val();
                            $(this).data('val_cached', _val);
                            $($(this).attr('data-chinese')).html(toChinese(_val));
                        }
                    });
                    chinese_go();
                }, 100);
            }
            chinese_go();
        }

    };

})();