$.extend(window[RO], {
    /**
     * reqJs
     * load js fn
     * @ reqmodule       string | array, module to load
     * @ reqcallback      load callback
     * ~ exp:
     * *.reqJs('tpl/modify_authorize',function(){console.log('done')});
     */
    reqJs: function(reqmodule, reqcallback) {
        function _req_one(module, callback) {
            if (module.substring(0, 3) === 'http') { // absolute url
                // console.log(2)
                $.getScript(module, function() {
                    callback();
                });
            } else {
                // console.log(1)
                function _is_defined(key_ary) {
                    var i = 0;
                    var temp = window[RO];
                    while (typeof temp[key_ary[i]] !== 'undefined' && i < key_ary.length) {
                        temp = temp[key_ary[i]];
                        i++;
                    }

                    // console.log(i, key_ary.length);
                    return i === key_ary.length;
                }
                // var module = 'a.b.c';
                var module = module.replace(/\.js/, '');
                var api = module.replace('/', '.');
                var api_ary = api.split('.');
                // console.log(_is_defined(api_ary));

                if (_is_defined(api_ary)) {
                    // console.log(4)
                    callback();
                } else {
                    // console.log(5)
                    // var _now = new Date().getTime();

                    $.ajax({
                        url: window[RO].g_var.STATICURL + 'scripts/' + module + '.js?_=' + window[RO].g_var.TIMESTAMP,
                        cache: true,
                        dataType: "script",
                        success: function() {
                            callback();
                        }
                    });
                }
            }
        }

        if (typeof reqmodule === 'string') {
            _req_one(reqmodule, reqcallback);
        } else if (reqmodule.length > 0) {
            function _req_any(reqary, cb) {
                if (reqary.length === 1) {
                    _req_one(reqary[0], cb);
                } else if (reqary.length > 1) {
                    _req_one(reqary.shift(), function() {
                        _req_any(reqary, cb);
                    });
                }
            }
            _req_any(reqmodule, reqcallback);
        } else {
            reqcallback();
        }
    }
});