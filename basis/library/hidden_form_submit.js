$.extend(window[RO], {
    /**
     * hidden_form_submit
     * submit a hidden form with form conf & data
     * @ conf    form configure
     * @ data    json data to submit
     */
    hidden_form_submit: function(conf, data) {
        var _h = "";
        if (data) {
            $.each(data, function(key, val) {
                _h += '<input type="hidden" name="' + window[RO].util.htmlEncode(key) + '"/>';
            });
        }

        var _form = $('<form action="' + conf.action + '" target="' + (typeof conf.target == "undefined" ? "_self" : conf.target) + '" method="' + (typeof conf.method == "undefined" ? "POST" : conf.method) + '" style="display:none;">' + _h + '</form>');
        _form.appendTo("body").children("input").each(function() {
            $(this).val(data[$(this).attr("name")]);
        }).end().submit();
    }
});