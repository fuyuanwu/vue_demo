$.extend(window[RO], {
    all_form_err: function(form, data) {
        if (data.reasons) {
            var needTopAlert = 0;
            $.each(data.reasons, function(key, val) {
                var em = form.find("[name=" + key + "],[data-name=" + key + "]");
                if (em.length) {
                    needTopAlert++;
                    if (em.length === 2) { // fix pwd
                        em = em.filter('[type=password]');
                    }
                    window[RO].show_form_error(em, val, 'input_hint-failure');
                }
                // needTopAlert = val;
            });
            // console.log(needTopAlert)
            if (needTopAlert === 0) {
                window[RO].show_top_dialog({
                    msg: data.responseMsg,
                    type: "failure",
                    auto_hide: false,
                    hide_time: 2500,
                    time: 88
                });
            }
        } else {
            window[RO].show_top_dialog({
                msg: data.responseMsg,
                type: "failure",
                auto_hide: false,
                hide_time: 2500,
                time: 88
            });
        }
    }
});