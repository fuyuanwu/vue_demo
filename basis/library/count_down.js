$.extend(window[RO], {
    /**
      * count_down
      * simple count down fn
      * @ em              element to count down
      * @ configure       configure
      * ~ exp:
      * window[RO].UI.count_down($("#J-vcode_cd").children(".count_down"), {
                    start: 60,
                     cb: function() {
                         $("#J-vcode_cd").hide();
                         $("#active-get_vcode").data("disabled", false).removeClass("disabled");
                     }
                 });
     */
    count_down: function(em, configure) {
        var conf = {
            start: 60,
            // start time
            end: 0,
            // end now
            suffix: '',
            // suffix of display html
            speed: 1,
            // speed for 1 animate
            cb: function() { // callback
                console.log('count down over!');
            },
            set_context: function(that_em, context) {
                that_em.html(context);
            }
        }
        $.extend(conf, configure);
        em.data("cd", parseInt(conf.start, 10) + 1);
        var cd = function() {
            if (conf.end != em.data("cd")) {
                var _now = em.data("cd") - 1;
                if (_now < 0) {
                    conf.cb();
                } else {
                    em.data("cd", _now);
                    conf.set_context(em, _now + conf.suffix);
                    setTimeout(cd, 1000 * conf.speed);
                }
            } else {
                conf.cb();
            }
        }
        cd();
    }
});