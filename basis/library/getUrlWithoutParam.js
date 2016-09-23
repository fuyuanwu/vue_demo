$.extend(window[RO], {
    getUrlWithoutParam: function(str) {
        str = str || window.location.href;
        str = str.indexOf('?') === -1 ? (str.indexOf('#') === -1 ? str : str.slice(0, str.indexOf('#'))) : str.slice(0, str.indexOf('?'));
        return str;
    }
});