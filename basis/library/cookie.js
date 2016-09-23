$.extend(window[RO], {
    /**
     * cookie
     * cookie operation fn
     * @ name       key for cookie (get|set)
     * @ value      value for set a cookie
     * @ options    detail options for set method
     * ~ exp:
     * get: w.cookie('name')
     * set: w.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘pay.sina.com.cn’, secure: true});
     * delete: w.cookie('name', null)
     */
    cookie: function(name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString())) { // expires can be passed as a Date obj
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    date = date.toUTCString();
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date;
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
});