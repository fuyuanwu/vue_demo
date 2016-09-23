$.extend(window[RO], {
    // generate custom select
    generate_select: function(width, em) {
        em = em || $(".J-select[data-done!=yes]");
        em.wrap('<div class="custom_selector custom_selector-' + width + '"/>').before('<span class="arrow"></span><input type="text" class="input_field input_field-' + width + '" />').on("change.ui", function() {
            // console.log($(this));
            if (!$(this).val() || $(this).val() === "selectplease") {
                // console.log($(this).val(),$(this).find("option:selected").text())
                $(this).siblings(".input_field").addClass("c-disabled").val($(this).find("option:selected").text());
            } else {
                $(this).siblings(".input_field").removeClass("c-disabled").val($(this).find("option:selected").text());
            }
        }).trigger('change.ui').bind("focus", function() {
            $(this).siblings(".input_field").addClass("focus");
        }).bind("blur", function() {
            $(this).siblings(".input_field").removeClass("focus");
        }).attr('data-done', 'yes');
    }
});