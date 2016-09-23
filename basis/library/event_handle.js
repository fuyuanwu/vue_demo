$.extend(FT, {
    // event handle for listen once event
    event_handle: {
        esc_keyup: function(namespace, handle) {
            $(document).bind("keyup" + namespace, function(e) {
                if (e.which == 27) {
                    $(document).unbind("keyup" + namespace);
                    handle();
                }
            });
        },
        click: function(namespace, handle) {
            $(document).on('click' + namespace, function(e) {
                $(document).unbind("click" + namespace);
                handle();
            });
        }
    }
});