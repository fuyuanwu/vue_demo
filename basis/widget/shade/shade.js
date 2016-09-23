$.extend(window[RO], {
    /**
     * shade
     * page shade fn
     * @ showOrHide    true to show, false to hide
     * @ atime          animate time
     */
    shade: function(showOrHide, atime) {
        isNaN(atime) && (atime = 0);
        if (showOrHide) {
            if (!$("#shade").length) {
                $("body").append('<div id="shade" class="fixed_shade"/>');
                $("#shade").fadeTo(atime, 0.2);
            }
        } else {
            if ($("#shade").length) {
                $("#shade").fadeOut(atime, function() {
                    $("#shade").remove();
                });
            }
        }
    }
});