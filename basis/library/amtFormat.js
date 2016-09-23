$.extend(window[RO], {
    /**
     * amtFormat
     * format amount style
     * @ amountStr        amount string
     */
    amtFormat: function(amountStr) {
        (window[RO].atom.type(amountStr) !== 'string') && (amountStr = amountStr.toString());
        if (amountStr.indexOf(',') === -1) {
            var l = amountStr.split(".")[0].split("").reverse(),
                r = amountStr.split(".")[1],
                t = "";
            r = r ? "." + r : "";

            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            amountStr = t.split("").reverse().join("") + r;
        }
        return amountStr;
    }
});