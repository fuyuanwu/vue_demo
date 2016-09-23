$.extend(window[RO], {
    layer_tips: function($layer_tips, callback) {
        var AL = arguments.length;
        $layer_tips.length && $layer_tips.mouseenter(function() {
            var oft = $(this).offset();
            var layer = $($(this).attr('data-layer'));

            var _css = {};
            // if (layer.attr('data-paralleling') === 'yes') {
            _css = {
                marginTop: -layer.outerHeight() + parseInt(layer.attr('data-y'), 10) + 'px',
                marginLeft: -layer.outerWidth() / 2 + $(this).outerWidth() / 2 + parseInt(layer.attr('data-x'), 10) + 'px'
            };
            // } else {
            //     _css = {
            //         top: (oft.top - parseInt(layer.attr('data-y'), 10)) + 'px',
            //         left: (oft.left - parseInt(layer.attr('data-x'), 10)) + 'px'
            //     };
            // }
            layer.show().css(_css).one('mouseleave', function() {
                $(this).hide();
            });
            (AL === 2) && callback(layer);
        }).mouseleave(function(e) {
            var pid = $(this).attr('data-layer');
            var rtarget = $(e.relatedTarget);
            if (rtarget.attr('id') === pid.slice(1) || rtarget.parents(pid).length) {
                e.preventDefault();
                return false;
            } else {
                $($(this).attr('data-layer')).hide();
            }
        });
    }
});