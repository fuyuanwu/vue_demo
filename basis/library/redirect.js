$.extend(window[RO], {
    /**
     * redirect
     * redirect current page to another
     * @ url        target page url
     * @ replace    redirect type ,can back or not
     */
    redirect: function(url, replace) {
        window[RO].loading(true);
        if (replace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    }
});