$.extend(window[RO], {
    hide_layer: function(layers) {
        layers = layers || $('.shade_layer:visible');
        layers.each(function() {
            var layer = $(this);
            var $close = layer.find('.close_cross:visible');
            if ($close.attr("data-close")) {
                $($close.attr("data-close")).stop(true, true)[($close.attr("data-animate") ? $close.attr("data-animate") : "fadeOut")]($close.attr("data-animate_time") ? parseFloat($close.attr("data-animate_time"), 10) : 300);
                if ($close.attr("data-shade") !== "no") {
                    window[RO].UI.shade(false);
                }
            }
        });
    }
});