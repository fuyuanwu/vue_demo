$.extend(window[RO], {
    date_minpicker: function(trigger_em,input_em) {
        var input_width = input_em.width();
        var input_height = input_em.height();
        var input_pos = input_em.offset();
        var alert_pos_top = input_pos.top + input_height + "px";
        var alert_pos_left = input_pos.left + "px";
        var TODAY_y_m, TODAY_y, TODAY_m, TODAY, ym_box, input_val;
        TODAY = new Date(input_em.val()) || new Date();
        TODAY_y = TODAY.getFullYear();
        TODAY_m = TODAY.getMonth() + 1;
        // @@ 'input'==="click"==="绑定框点击"
        trigger_em.on('click', function(e) {
            e.stopPropagation();
            ym_box = '<p class="date_top" id="J-p_01"><i class="prev">&laquo</i><span class="show_year">' + (TODAY_y - 1) + '</span><i class="next J-next" data-toNum="02">&raquo</i></p>' +
                '<p class="date_top date_top_index" id="J-p_02"><i class="prev J-prev" data-toNum="01">&laquo</i><span class="show_year">' + TODAY_y + '</span><i class="next J-next" data-toNum="03">&raquo</i></p>' +
                '<p class="date_top" id="J-p_03"><i class="prev J-prev" data-toNum="02">&laquo</i><span class="show_year">' + (TODAY_y + 1) + '</span><i class="next">&raquo</i></p>' + '<ul class="date_list date_list_prev" id="J-u_01">' +
                '<li><span>1</span></li><li><span>2</span></li><li><span>3</span></li><li><span>4</span></li>' +
                '<li><span>5</span></li><li><span>6</span></li><li><span>7</span></li><li><span>8</span></li>' +
                '<li><span>9</span></li><li><span>10</span></li><li><span>11</span></li><li><span>12</span></li>' + '</ul>' + '<ul class="date_list date_list_index" id="J-u_02">' +
                '<li><span>1</span></li><li><span>2</span></li><li><span>3</span></li><li><span>4</span></li>' +
                '<li><span>5</span></li><li><span>6</span></li><li><span>7</span></li><li><span>8</span></li>' +
                '<li><span>9</span></li><li><span>10</span></li><li><span>11</span></li><li><span>12</span></li>' + '</ul>' + '<ul class="date_list date_list_next" id="J-u_03">' +
                '<li><span>1</span></li><li><span>2</span></li><li><span>3</span></li><li><span>4</span></li>' +
                '<li><span>5</span></li><li><span>6</span></li><li><span>7</span></li><li><span>8</span></li>' +
                '<li><span>9</span></li><li><span>10</span></li><li><span>11</span></li><li><span>12</span></li>' + '</ul>';
            $("body").find(".date_box").remove();
            $("body").append('<div class="date_box"></div>').find('.date_box').css({
                "height": "130px",
                "width": '184px',
                "position": "fixed",
                "left": alert_pos_left,
                "top": alert_pos_top
            }).html(ym_box);
            $(".date_list_index li").eq(TODAY_m - 1).removeClass("c_blue").addClass("c_blue");
            // @@@
            if (TODAY_m > 6) {
                var t_sf = TODAY_m - 5;
                var t_sf_2 = t_sf-2;
                console.log(t_sf_2)
                $(".date_list_index li:gt("+t_sf_2+")").addClass('on_click');
                $(".date_list_next li:lt("+t_sf+")").addClass('on_click');
                $('#J-p_02 .prev').off('click').removeClass('J-prev');
                // $('#J-p_03 .next').css("cursor","none");
            } else {
                var t_st = 6 + new Number(TODAY_m);
                var t_st_2 = t_st -2;
                $(".date_list_index li:lt("+t_st+")").addClass('on_click');
                $(".date_list_prev li:gt("+t_st_2+")").addClass('on_click');
                $('#J-p_02 .next').off('click').removeClass('J-next');
                 // $('#J-p_01 .prev').css("cursor","none");
            }
            //@@@ 'li'==="click blind"==="月份数选取---iput框得到值"
            $(".date_box .date_list li.on_click").on('click', function(e) {
                    e.stopPropagation();
                    var Chose_m = $(this).children('span').html(),
                        Chose_y;
                    var tN = $(this).parent("ul").attr("id").slice(-2);
                    Chose_y = $("#J-p_" + tN).children('span').html();
                    if (Chose_m < 10) {
                        Chose_m = "0" + Chose_m;
                    }
                    input_em.val(Chose_y + "-" + Chose_m);
                    $(".date_box").remove();
                })
                //@@@ 'li'==="hover blind"==="月份数选取"
            $(".date_box .date_list li.on_click").hover(function() {
                    $(this).addClass("ch_blue");
                }, function() {
                    $(this).removeClass("ch_blue");
                })
                // @@@
            $(".J-next").on('click', function(e) {
                    e.stopPropagation();
                    var $this = $(this);
                    var tN = $this.attr("data-toNum");
                    $(".date_top").hide();
                    $(".date_list").hide();
                    $("#J-p_" + tN).show();
                    $("#J-u_" + tN).show();
            })
            // @@@
            $(".J-prev").on('click', function() {
                e.stopPropagation();
                var $this = $(this);
                var tN = $this.attr("data-toNum");
                $(".date_top").hide();
                $(".date_list").hide();
                $("#J-p_" + tN).show();
                $("#J-u_" + tN).show();
            })
            // @@@
            $(document).on("click", function(e) {
                $(".date_box").remove();
            })
            $(".date_box").on('click', function(e) {
                e.stopPropagation();
            })
            // ======@@@
        })
            // ======@@
    }
});