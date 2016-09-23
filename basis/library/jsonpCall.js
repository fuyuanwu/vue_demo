$.extend(window[RO], {
    jsonpCall: function(url, callback, randomStr) {
        if (url.replace(/http[s]:\/\//, '').indexOf(window.location.hostname) === 0) {
            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    _: randomStr || Math.random()
                },
                dataType: 'json'
            }).done(function(ret) {
                callback(ret);
            }).fail(function(xhr, status, error) {
                window[RO].helper.ajax_error(xhr, status, error);
            });
        } else {
            var thisjsonpfn = window[RO].helper.generate_rdmid('jsonp');
            window[RO].jsonfn[thisjsonpfn] = function(jsondata) {
                callback(jsondata);
            }
            $.getScript(url + (url.indexOf('?') === -1 ? '?' : '&') + 'jsonpcallback=window[RO].jsonfn.' + thisjsonpfn + (randomStr ? '&_=' + randomStr : ''));
        }
    }
});