$.extend(window[RO], {
    fix_browser: function() {
        if ($('html').hasClass('lt-ie9')) {
            // ie < 9
            if ($('html').hasClass('lt-ie8')) {
                // ie < 8
                // active
                $("body").on("mousedown", ".J-active", function() {
                    $(this).addClass("active");
                }).on("mouseup mouseleave", ".J-active", function() {
                    $(this).removeClass("active");
                });

                // focus
                $("body").on("focus", ".J-focus", function() {
                    $(this).addClass("focus");
                }).on("blur", ".J-focus", function() {
                    $(this).removeClass("focus");
                });
                if ($('html').hasClass('lt-ie7')) {
                    // ie < 7
                    // hover
                    $("body").on("mouseenter", ".J-hover", function() {
                        $(this).addClass("hover");
                    }).on("mouseleave", ".J-hover", function() {
                        $(this).removeClass("hover");
                    });
                }
            }
        }

        // placeholder
        if (!('placeholder' in document.createElement('input'))) {
            window[RO].UI.generate_placeholder();
            $("body").on("click", ".placeholder", function() {
                $(this).next("input").focus();
            });
        }
    }
});