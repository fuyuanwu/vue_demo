$.extend(window[RO], {
    // get All class to write css
    getCssClass: function(em) {
        var _elm_class_obj = {};

        function _clog_class(elm) {
            var _elm_class = $.trim(elm.attr('class'));

            if (_elm_class.indexOf(' ') === -1) {
                _elm_class_obj[_elm_class] = true;
            } else {
                _elm_class = _elm_class.split(' ');
                for (var i = 0; i < _elm_class.length; i++) {
                    _elm_class_obj[_elm_class[i]] = true;
                }
            }
        }
        _clog_class(em);
        em.find('[class]').each(function() {
            _clog_class($(this));
        });

        var _cout = '';
        for (var i in _elm_class_obj) {
            if (i !== 'undefined') {
                _cout += '.' + i + ' {}\n';
            }
        }

        console.log(_cout);
    }
});