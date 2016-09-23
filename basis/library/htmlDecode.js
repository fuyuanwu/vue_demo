$.extend(window[RO], {
    /**
     * htmlDecode
     * decode html str
     * @ str       decode it~
     */
    htmlDecode: function(val) {
        return $('<div/>').html(val).text().replace(/\u00a0/g, "\u0020");
    }
});