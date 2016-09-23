$.extend(window[RO], {
    /**
     * htmlEncode
     * encode html str
     * @ str       encode it~
     */
    htmlEncode: function(str) {
        //return $('<div/>').text(str).html().replace(/&amp;/g, "&");
        var dict = {
            '&': "&amp;",
            '<': "&lt;",
            '>': "&gt;",
            ' ': "&nbsp;",
            '\'': "&#039;",
            '"': "&quot;"
        };
        if ("string" !== typeof str) return str;
        if (str.length == 0) return "";
        return str.replace(/[&<> \'\"]/g, function(c) {
            return dict[c];
            // console.log(dict[c]);
        });
    }
});