$.extend(window[RO], {
    /*
        依赖loading
    */
    submiter_block: function(submiter, isStart) {
        if (typeof isStart === 'undefined') {
            return submiter.hasClass("btn-disabled");
        } else {
            if (isStart) {
                submiter.addClass("btn-disabled").attr('disabled', 'disabled'); //.after('<i class="loading" style="margin: ' + (submiter.outerHeight() + 3) + 'px 0 0 -' + (parseInt(submiter.css('margin-right'), 10) + submiter.outerWidth() / 2 + 60) + 'px;"></i>');
                window[RO].loading(true);
            } else {
                submiter.removeClass("btn-disabled").removeAttr('disabled', 'disabled'); //.next('i.loading').remove();
                window[RO].loading(false);
            }
        }
    }
});