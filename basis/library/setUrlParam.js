$.extend(window[RO], {
    /**
     * setUrlParam
     * set url parameter by name
     * @ name      key for the parameter
     * @ val       value for the parameter
     * @ str       if exists, use str instead of url
     */
    setUrlParam: function(name, val, str) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)");
        var search = ("string" == typeof str) ? str : window.location.search;
        var r = search.substr(1);
        if (search.length > 3 && reg.test(search.substr(1))) {
            r = r.replace(reg, name + '=' + val);
        } else {
            r = str + (str.indexOf('=') === -1 ? '' : '&') + name + '=' + val;
        }
        (r.indexOf('?') === -1) && (r = '?' + r);
        return r;
    }
});