$.extend(window[RO], {
    blank_window: function(em) {
        var r_a_id = FT.helper.generate_rdmid('temp_a-');
        $('body').append('<a id="' + r_a_id + '" target="_blank" style="position:absolute;"><span id="' + r_a_id + 'span">aaaa</span></a>');

        em.data('blank_window-a', r_a_id);

        function juggle_open() {
            setTimeout(function() {
                var b_w = em.data('blank_window');
                if (b_w) {
                    $('#' + em.data('blank_window-a')).attr('href', b_w);
                    $('#' + em.data('blank_window-a') + 'span').click();
                    em.removeData('blank_window-a').removeData('blank_window');

                    $('#' + r_a_id).remove();
                } else {
                    juggle_open();
                }
            }, 88);

        }

        juggle_open();
    }
});