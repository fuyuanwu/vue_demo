$.extend(window[RO], {
    reflow_area: function(area, condition) {
        // console.log('reflow_area');
        setTimeout(function() {
            if (condition()) {
                area.hide();
                setTimeout(function() {
                    area.show();
                }, 88);
            } else {
                window[RO].UI.reflow_area(area, condition);
            }
        }, 100);
    }
});