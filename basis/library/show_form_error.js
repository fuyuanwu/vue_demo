$.extend(window[RO], {
    show_form_error: function(input_em, msg, eclass, _delay) {
        _delay = _delay || 3000;
        // eclass
        // input_hint-success | input_hint-failure | ''
        // input_em.addClass("error");
        // input_em.css("border","1px solid #F99191");

        var par = input_em.parent();
        par.children("span.input_hint:last").stop(true, true).remove();
        // input_em.next('span.input_hint').stop(true, true).remove();
        var _hid = "";
        if (input_em.attr("data-hint_id")) {
            _hid = ' id="' + input_em.attr("data-hint_id") + '"';
        }
        // input_em.after('<span' + _hid + ' class="input_hint' + (eclass ? ' ' + eclass : '') + '" style="display: none;">' + msg + '</span>').next('span').show().delay(5000).fadeOut(200);
        var topVfield = input_em.parents("form") && input_em.parents("form").attr("data-tvfield");//表单校验信息放在头部需否判断

        par.append('<span' + _hid + ' class="input_hint' + (eclass ? ' ' + eclass : '') + '" style="display: none;">' + msg + '</span>')
            .children("span.input_hint:last").show(0, function() {
              !topVfield && input_em.attr('data-placeholder', input_em.attr('placeholder')).removeAttr('placeholder');
            }).delay(_delay).fadeOut(200, function() {
                $(this).remove();
                input_em.attr('placeholder', input_em.attr('data-placeholder')).removeAttr('data-placeholder');
                input_em.removeAttr("style");
            });
        input_em.is('select') && input_em.val('selectplease');

        var topBar = input_em.parents("form").find('.err_pos');
        $('span.input_hint ').length > 0 && topVfield && topBar.find(".err_info").remove().end().append('<p class="err_info"><i></i><span>'+$('span.input_hint ').eq(0).html()+'</span></p>');
        $('.err_info').delay(_delay).fadeOut(200,function(){
            $(this).remove();
        });

    }
});