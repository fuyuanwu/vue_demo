(function() {
    CP.plugin.safe_component = function(conf) {
        var self = this;
        /** conf setting **/
        conf = $.extend(true, {
            em: $("#pay_pwd"), // elements for safe component, need data-key_em="#foo" for submit. get salt once for this em set!
            salt_url: "", // salt url to get salt
            is_uninstalled: false,
            uninstalled: function() {
                alert("未安装控件，请安装！");
            },
            is_need_update: false,
            need_update: function() {
                alert("控件版本过低，请升级！");
            },
            v_safe_tool_input: function() { // validate safe tool input fn
                return true;
            },
            environment: false,
            component: { // component object configure
                minVersion: "2.0.0",
                curVersion: "2.0.4",
                MaxLength: "20",
                PassEdit: "2",
                width: "242",
                height: "30",
                tabindex: "1",
                base64Cert: "-----BEGIN CERTIFICATE-----\nMIICCzCCAXQCCQDS3bwzUSZwWTANBgkqhkiG9w0BAQUFADBJMQswCQYDVQQGEwJBVTETMBEGA1UEChMKV0VJSFVJLkNPTTElMCMGA1UECxMcV0VJSFVJIFRlbXBvcmFyeSBDZXJ0aWZpY2F0ZTAgFw0xMjA5MjkwMDUzNDJaGA8yMTEyMDkwNTAwNTM0MlowSTELMAkGA1UEBhMCQVUxEzARBgNVBAoTCldFSUhVSS5DT00xJTAjBgNVBAsTHFdFSUhVSSBUZW1wb3JhcnkgQ2VydGlmaWNhdGUwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAOInRLmoDJp1whLf3jvuaFGyB7OlmS5u4LmDX5rattEpLQ9uvUeEBPw8++ldD2Z6d5RNe7s5Y4RsaIn+FgjF+tSy3yIkpiZxxzXJMtIwzSbtXRgpa5fo0w0l/LgdHnMSTJzWncOGTrzmuuzAVtwa9NV89MzcsPoFOxftnVucud2xAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAvLtaFZb49HOKToh9/562CZlCZz9QNl3OQh+EmFP3tvuTsF0/0vRTM5fkfVXMilBBLiDiCchpY063iinV5oDgMjWQ4MfOj5jt2GUXiwsRXMM1Grb4NzSiMrwOEHoB3tm1W7Or/ffvcGF76WyE7fBg9s1sYT9xU/6gbkt0IyDuwj0=\n-----END CERTIFICATE-----",
                pubkey: false
            }
        }, conf);

        /** self tools fn **/
        var key_to_hex = function(key) {
            var _hex = "";
            for (var i = 0; i < key.length; i++) {
                _hex += key.charCodeAt(i).toString(16);
            }
            return _hex;
        };

        var __generate_rdmid = function(start) {
            return start + parseInt(Math.random() * 100000000, 10);
        };

        var __generate_IE_html = function(id) {
            return '<object class="safeInput" id="' + id + '" name="WeihuiEdit" classid="CLSID:1D1234A2-5EEB-4791-8D6C-B36BE22B78E4" tabindex="' + conf.component.tabindex + '" width="' + conf.component.width + '" height="' + conf.component.height + '"><param name="MaxLength" value="' + conf.component.MaxLength + '"><param name="PassEdit" value="' + conf.component.PassEdit + '"></object>';
        };

        var __generate_NP_html = function(id) {
            return '<object class="safeInput" id="' + id + '" name="WeihuiEdit" type="application/npWeiboPayEditCtl-plugin" tabindex="' + conf.component.tabindex + '" width="' + conf.component.width + '" height="' + conf.component.height + '"><param name="MaxLength" value="' + conf.component.MaxLength + '"><param name="PassEdit" value="' + conf.component.PassEdit + '"></object>';
        };

        var __needInstall = function() { // true: needed, false: no need
            // force user js RSA instead of object
            return false;
            if (conf.environment.isWin) { // only work in platform Windows...
                if (conf.environment.isIE) {
                    if (conf.environment.is64IE) { // not work in ie 64 bits
                        return false;
                    } else { // ie object
                        try {
                            return !new ActiveXObject("WeihuiEdit.WeihuiEditCtrl.1");
                        } catch (e) {
                            // do nothing
                        }
                        return true;
                    }
                } else { // NP object
                    return !(navigator.plugins["WeiboPay Safe Control"] || false);
                }
            } else { // other OS, no need install return false
                return false;
            }
        };

        var __needUpdate = function(el) {
            // force user js RSA instead of object
            return false;
            if (el[0] && typeof el[0].GetVersion == "function") {
                var v = el[0].GetVersion(p);
            } else {
                return false;
            }

            if (v == null || v == "") {
                return false;
            }
            var vlist = v.split(".");
            var clist = this.curVersion.split(".");
            for (var i = 0; i < 3; i++) {
                if (parseInt(vlist[i], 10) < parseInt(clist[i], 10)) {
                    return true;
                }
            }
            return false;
        };

        // environment juggle fn, return result like: {isWin7: true, isWin: true, OS: "Windows 7", isChrome: true, browser: "Chrome"}
        // isIE, is64IE, is[alias]
        var __env = function() {
            var agent = navigator.userAgent ? navigator.userAgent.toLowerCase() : "",
                platform = navigator.platform || "",
                result = {};
            result.OS = function(args) {
                for (var i = 0, len = args.length; i < len; i++)
                    if (args[i].matchMode.test(args[i].string)) {
                        ali = args[i].alias;
                        result["is" + ali] = true;
                        /win/i.test(ali) && (result.isWin = true);
                        return args[i].identity
                    }
                return ""
            }([{
                identity: "Windows XP",
                alias: "WinXP",
                string: agent,
                matchMode: /windows nt 5.1|windows xp/
            }, {
                identity: "Windows 7",
                alias: "Win7",
                string: agent,
                matchMode: /windows nt 6.1|windows 7/
            }, {
                identity: "Windows Vista",
                alias: "WinVista",
                string: agent,
                matchMode: /windows nt 6.0|windows vista/
            }, {
                identity: "Windows 2000",
                alias: "Win2K",
                string: agent,
                matchMode: /windows nt 5.0|windows 2000/
            }, {
                identity: "Windows",
                alias: "Win",
                string: platform,
                matchMode: /Win/
            }, {
                identity: "MacOS",
                alias: "Mac",
                string: platform,
                matchMode: /Mac/
            }, {
                identity: "Linux",
                alias: "Linux",
                string: platform,
                matchMode: /Linux/
            }]);
            result.browser = function(args) {
                for (var i = 0, len = args.length; i < len; i++)
                    if (Object.prototype.toString.apply(args[i].matchMode) === "[object Function]") {
                        if (args[i].matchMode()) {
                            result["is" + args[i].alias] = true;
                            return args[i].identity
                        }
                    } else {
                        var exeRet = args[i].matchMode.exec(agent) || [],
                            j = exeRet[2];
                        if (exeRet[1]) {
                            ali = args[i].alias;
                            result["is" + ali] = true;
                            if (j !== "0" && j) {
                                j = parseInt(j, 10);
                                result["is" + ali + j] = true;
                                return args[i].identity + " " + parseInt(j, 10)
                            }
                            return args[i].identity
                        }
                    }
                return ""
            }([{
                identity: "360\u6d4f\u89c8\u5668",
                alias: "360",
                matchMode: function() {
                    if (!result.isWin) return false;
                    try {
                        if (window.external && external.twGetRunPath) {
                            var a = external.twGetRunPath();
                            return a && a.toLowerCase().indexOf("360se") > -1
                        }
                        return false
                    } catch (b) {
                        return false
                    }
                }
            }, {
                identity: "Maxthon",
                alias: "Maxthon",
                matchMode: function() {
                    if (!result.isWin) return false;
                    try {
                        return window.external && external.max_version
                    } catch (a) {
                        return false
                    }
                }
            }, {
                identity: "Chrome",
                alias: "Chrome",
                matchMode: function() {
                    return /webkit/.test(agent) && /chrome\/([\d.]+)/.test(agent)
                }
            }, {
                identity: "Safari",
                alias: "Safari",
                matchMode: function() {
                    return /webkit/.test(agent) && !result.isChrome && /version\/([\d.]+)/.test(agent)
                }
            }, {
                identity: "Opera",
                alias: "Opera",
                matchMode: /(opera)(?:.*version)?[ \/]([\w.]+)/
            }, {
                identity: "Internet Explorer",
                alias: "IE",
                matchMode: /(msie) ([\w.]+)/
            }, {
                identity: "Internet Explorer 11",
                alias: "IE11",
                matchMode: /(trident|msie)/i
            }, {
                identity: "Firefox",
                alias: "Firefox",
                matchMode: function() {
                    return agent.indexOf("compatible") < 0 && agent.indexOf("gecko") > -1 && agent.indexOf("khtml") === -1
                }
            }]);
            result.isIE11 && (result.isIE = true);
            result.isIE && /Win64; x64;/i.test(agent) && (result.is64IE = true);
            return result;
        }


        /** private fn **/
        // init fn
        this._init = function() {
            var is_safe_component = false;
            // get environment info
            conf.environment = __env();

            // is installed or not
            if (__needInstall() === true) {
                conf.is_uninstalled = true;
                conf.uninstalled();
                return false;
            }

            // need update or not
            var _test_id = __generate_rdmid("test_component_");
            var _test_html = self._generate_html(_test_id);
            if (_test_html) {
                $("body").append(_test_html);
                conf.is_need_update = __needUpdate($(_test_id));
                $("#" + _test_id).remove();
                if (conf.is_need_update) {
                    conf.need_update();
                    return false;
                }
            }

            // draw safe component html
            conf.em.each(function() {
                var $this = $(this);
                var _component_id = __generate_rdmid("safe_component_");

                var obj_html = self._generate_html(_component_id);
                // obj_html = false, means that safe component is not surpport
                obj_html && $this.after(obj_html).attr("data-sc_id", "#" + _component_id);

                var _this_component = $("#" + _component_id);
                if (obj_html && typeof _this_component[0] !== "undefined") { // component is valuable
                    $this.hide();
                    is_safe_component = true;
                } else {
                    _this_component.remove();
                    is_safe_component = false;
                }
            });

            if (is_safe_component) {
                self.pre_submit = function(pre_submit_callback, pre_submit_failure_callback) {
                    $.ajax({
                        url: conf.salt_url + '?' + Math.random(),
                        dataType: 'json',
                        type: 'GET',
                        success: function(data) {
                            if (data != null && data.head.code === '200' && data.body.data.salt) {
                                var _salt = data.body.data.salt;
                                var saltId = data.body.data.saltId;
                                var v_ret = true;

                                conf.em.each(function() {
                                    var $this = $(this);
                                    var _this_component = $($this.attr("data-sc_id"));
                                    var _key = _this_component[0].GetKey(conf.component.base64Cert, _salt);
                                    var _value = _this_component[0].GetValue();

                                    // console.log(_value)

                                    v_ret = conf.v_safe_tool_input($this, _value);
                                    if (!v_ret) {
                                        return false;
                                    }

                                    $this.val(_value);
                                    $($this.attr("data-key_em")).val(saltId);
                                });

                                pre_submit_callback();
                            } else {
                                pre_submit_failure_callback(data, 'system error', 'salt can not get');
                            }
                        },
                        error: function(xhr, status, error) {
                            pre_submit_failure_callback(xhr, status, error);
                        }
                    });
                }
            } else {
                self.pre_submit = function(pre_submit_callback, pre_submit_failure_callback) {
                    $.ajax({
                        url: conf.salt_url + '?' + Math.random(),
                        dataType: 'json',
                        type: 'GET',
                        success: function(data) {
                            console.log(data.body.data.salt)
                            if (data != null && data.head.code === '200' && data.body.data.salt) {
                                var _salt = data.body.data.salt;
                                var saltId = data.body.data.saltId;

                                conf.em.each(function() {
                                    var $this = $(this);
                                    $this.data("cache_val", $this.val());
                                    var encrypt_type = $this.attr('data-encrypt'),
                                        _value = '';
                                    switch (encrypt_type) {
                                        // sha256 only
                                        case 'sha':
                                            _value = CP.plugin.sha256($this.val());
                                            break;
                                            // sha256(sha256+salt)
                                        case 'sha2':
                                            _value = CP.plugin.sha256(CP.plugin.sha256($this.val()) + _salt);
                                            break;
                                            // AES only
                                        case 'aes':
                                            _value = CP.plugin.aes.encrypt(key_to_hex(_salt), $this.val());
                                            break;
                                            // aes(salt, sha256)
                                        case 'sha_aes':
                                            _value = CP.plugin.aes.encrypt(key_to_hex(_salt), CP.plugin.sha256($this.val()));
                                            break;
                                            // AES only with spacious character
                                        case 'aess':
                                            _value = CP.plugin.aes.sencrypt(key_to_hex(_salt), $this.val());
                                            break;
                                        case 'rsa':
                                            conf.component.pubkey = conf.component.pubkey || window.RSA.readCertPEM(conf.component.base64Cert);

                                            window.RSA.setMaxDigits(Math.floor(conf.component.pubkey[0].length / 2) + 3);

                                            var key = new window.RSA.RSAKeyPair(conf.component.pubkey[1], '', conf.component.pubkey[0]);

                                            _value = window.RSA.encryptedString(key, _salt + $this.val());

                                            break;
                                        default:
                                            console.error('Please set data-encrypt prop conrectly!');
                                    }

                                    $this.val(_value);

                                    $($this.attr("data-key_em")).val(saltId);


                                });
                                pre_submit_callback();
                            } else {
                                pre_submit_failure_callback(data, 'system error', 'salt can not get');
                            }
                        },
                        error: function(xhr, status, error) {
                            pre_submit_failure_callback(xhr, status, error);
                        }
                    });
                }
            }
        };

        this._generate_html = function(id) {
            !conf.environment && (conf.environment = __env());

            // force user js RSA instead of object
            return false;

            if (conf.environment.isWin) { // only work in platform Windows...
                if (conf.environment.isIE) {
                    if (conf.environment.is64IE) { // not work in ie 64 bits
                        return false;
                    } else { // ie object
                        return __generate_IE_html(id);
                    }
                } else { // NP object
                    return __generate_NP_html(id);
                }
            } else { // other OS, return false
                return false;
            }
        };



        /** pub fn **/
        // get all conf
        this.get_conf = function() {
            return conf;
        }

        // set all html input value, ready for form submit~
        this.pre_submit = function() {
            console.log('error, can not init safe component...');
        }



        this._init();
    };
})();