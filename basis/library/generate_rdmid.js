$.extend(window[RO], {
    generate_rdmid: function(start) {
        return start + parseInt(Math.random() * 100000000, 10);
    }
});