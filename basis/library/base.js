(function() {
    window.RO = 'FB';
    var ISLOCAL = window.location.href.indexOf('localhost') !== -1 || window.location.href.indexOf('10.65') !== -1 ? true : false;
    (function($, window, undefined) {
        var temp = {
            plugin: {},
            data: {},
            g_var: {
                STATICURL: ISLOCAL ? '/' : 'https://static.wexfin.com/enterprisecube/',
                TIMESTAMP: ISLOCAL ? "88888888" : "TIMESTAMP_REPLACE",
                ISLOCAL: ISLOCAL
            },
            jsonfn: {}
        };
        window[RO] = temp;
        if (typeof console === "undefined") {
            console = {
                log: function() {
                    void 0;
                },
                error: function() {
                    void 0;
                },
                info: function() {
                    void 0;
                }
            }
        }
    })(jQuery, window);
    return RO;
})();