$.extend(window[RO], {
    loading_info: function(show, text) {
        window[RO].UI.loading(show);
        if (show) {
            window[RO].shade(true, 100);
            var _l_i = $('.loading-info:first');
            _l_i.html(text).css('visibility', 'hidden').show().css({
                'margin-left': '-' + _l_i.width() / 2 + 'px',
                'visibility': 'visible'
            });
        } else {
            window[RO].shade(false, 100);
            $('.loading-info').hide();
        }
    }
});