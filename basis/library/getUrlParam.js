$.extend(window[RO], {
    /**
     * getUrlParam
     * get url parameter by name
     * @ name      key for the parameter
     * @ str       if exists, use str instead of url
     */
    getUrlParam: function(name, str) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var search = ("string" == typeof str) ? str : window.location.search;
        var r = search.substr(1).match(reg);
        (r != null) ? r = decodeURIComponent(r[2]): r = undefined;
        return r;
    }
});