$.extend(window[RO], {
    /**
     * transJQSelector
     * translate jquery selector special char
     * @ str        selector str
     */
    transJQSelector: function(str) {
        if (typeof str == "string") {
            str = str.replace(/(:|\.|\[|\]|\#|\@|\$|\%|\^|\&|\*|\!)/g, '\\$&');
        }
        return str;
    }
});