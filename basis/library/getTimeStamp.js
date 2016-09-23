$.extend(window[RO], {
    /**
     * getTimeStamp
     * Calculation timestamp by date
     * if m is not empty , return timestamp
     *  else return toLocaleString
     */
    getTimeStamp: function(y, m, d, h, mi, s) {
        if (m) {
            var _d = new Date();
            _d.setFullYear(y);
            _d.setMonth(m - 1); // month实际要减一，0开始
            _d.setDate(d);
            _d.setHours(h);
            _d.setMinutes(mi);
            _d.setSeconds(s);
            _d.setMilliseconds(0);
            return _d.getTime();
        } else {
            var _d = new Date(y);
            return _d.toLocaleDateString() + _d.toTimeString();
        }
    }
});