$.extend(window[RO], {
    show_layer: function(layer, stime) {
        window[RO].UI.shade(true, stime || 100);
        var ml = layer.outerWidth() / 2;
        layer.css({
            'top': window[RO].helper.compute_layer_y(layer.height() / 2) + 'px',
            'margin-left': -ml
        }).fadeIn(100);
        if (layer.find('.close_cross:visible').length) {
            layer.find('.close_cross').on('click', function() {
                window[RO].UI._hide_layer(layer);
            });
            window[RO].helper.event_handle.esc_keyup('.panel', function() {
                window[RO].UI._hide_layer(layer);
            });
        }
    }
});