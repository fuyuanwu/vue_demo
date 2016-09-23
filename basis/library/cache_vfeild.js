$.extend(window[RO], {
    cache_vfeild: function(set, isRevert) {
        if (isRevert) {
            set.each(function() {
                $(this).attr('data-vfield', $(this).attr('data-vfield-cached')).removeAttr('data-vfield-cached');
            });
        } else {
            set.each(function() {
                $(this).attr('data-vfield-cached', $(this).attr('data-vfield')).removeAttr('data-vfield');
            });
        }
    }
});