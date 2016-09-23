$.extend(window[RO], {
    compute_layer_y: function(layer_height) {
        var _ret = $(window).scrollTop() + $(window).height() / 2 - layer_height;
        if (_ret < 0) {
            _ret = 0;
        }
        return _ret;
    }
});