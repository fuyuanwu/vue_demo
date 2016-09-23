$.extend(window[RO], {
    obj_blocker: function(showOrHide, em, adjust) { // em for position and must parent
        // if (showOrHide) {
        //     $("object.safeInput").hide();
        // } else {
        //     $("object.safeInput").show();
        // }
        // var need_of = !!em;
        if (adjust) {
            em.children(".mask_iframe").height(em.height()).width(em.width());
            return false;
        }

        var ignore_height = em ? false : true;
        em = em || $("body");
        if (showOrHide) {
            // need_of && em.attr("data-of", em.css("overflow")).css("overflow", "hidden");
            if (em.attr("data-mi_id")) {
                $(em.attr("data-mi_id")).show();
            } else {
                // em.css("position", "relative");
                var _rid = FI.helper.generate_rdmid("J_mask_iframe_");
                em.attr("data-mi_id", "#" + _rid).append('<iframe class="mask_iframe" id="' + _rid + '" frameborder="0" border="0" scrolling="" style="filter:Alpha(opacity=0);position:absolute; top:0px; left:0px; height:' + em.height() + 'px; width:' + (ignore_height ? "100%;" : (em.width() + 'px;')) + '" ></iframe>');
            }
        } else {
            // need_of && em.css("overflow", em.attr("data-of")).removeAttr("data-of");
            $(em.attr("data-mi_id")).hide();
            // $(".mask_iframe").hide();
        }
    }
});