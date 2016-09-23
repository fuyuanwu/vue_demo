$.extend(window[RO], {
    number_exciting: function(ems) {
        function __do_ex() {
            ems.each(function() {
                var $em = $(this);
                if (!$em.data('number_exciting')) {
                    $em.css('visibility', 'hidden').removeClass('dn').show();
                    if (window[RO].browser.isIOS || ($(window).height() + $(window).scrollTop() > $em.offset().top && $em.offset().top > $(window).scrollTop())) {
                        var _html = $em.html();
                        var _text = $em.children().remove().end().html();
                        // console.log(_text);
                        if (_text !== '' && !isNaN(parseFloat(_text, 10))) {
                            var __html = _html;
                            var dot_pos = false;

                            var _suffix = _html.replace(_text, '');
                            _html = _text;

                            _suffix = _html.replace(/[0-9\.]/g, '') + _suffix;
                            _html = _html.replace(/[^0-9\.]/g, '');

                            if (_html.indexOf('.') !== -1) {
                                dot_pos = 0 - _html.slice(_html.indexOf('.')).length + 1;
                            }
                            _html = _html.replace('.', '');
                            var _html_len = _html.length;

                            var _number = parseInt(_html, 10);

                            var __now = new Date().getTime();

                            function _n_e_fn(current_val, interval, tspan) {
                                setTimeout(function() {
                                    if (current_val < _number) {
                                        current_val += tspan;
                                        if (current_val > _number) {
                                            current_val = _number;
                                        }
                                        var current_html = current_val.toString();
                                        if (dot_pos !== false) {
                                            if (current_html.length < _html_len) {
                                                current_html = new Array(_html_len - current_html.length + 1).join('0') + current_html;
                                            }
                                            // console.log(current_html,_html_len)

                                            current_html = current_html.slice(0, dot_pos) + '.' + current_html.slice(dot_pos);
                                            // console.log(current_html,dot_pos)
                                            // return false;
                                        }
                                        $em.html(current_html + _suffix);

                                        if (new Date().getTime() - __now > 3000) {
                                            // console.log(_number)
                                            $em.html(__html);
                                        } else {
                                            _n_e_fn(current_val, interval + 1, tspan);
                                        }
                                    }
                                }, interval);
                            }

                            $em.html('0' + _suffix).css('visibility', 'visible');

                            _n_e_fn(0, 10, Math.ceil(_number / 30));
                            $em.data('number_exciting', true);
                        } else {
                            $em.css('visibility', 'visible').removeClass('dn').show();
                        }
                    }
                }
            });
        }
        $(win).on('scroll.number_exciting' + Math.random(), function() {
            __do_ex();
        });
        __do_ex();
    }
});