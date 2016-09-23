$.extend(window[RO], {
    // loading...
    //依赖widget/shade
    loading: function(showOrHide) {
        if (showOrHide) {
            window[RO].shade(true);
            $('.loading-bar').length > 0 || $('body').append('<div class="loading-bar"></div>');
            $('.loading-bar').show();
        } else {
            window[RO].shade(false);
            $('.loading-bar').hide();
        }
    }
});