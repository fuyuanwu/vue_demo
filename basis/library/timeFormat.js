$.extend(window[RO], {
    /**
     * timeFormat
     * change timestamp to format time
     * @ timestamp        timestamp string
     */
    timeFormat: function(timestamp) {
        function _format_num(num) {
            return num < 10 ? '0' + num : num;
        }
        var thistime = new Date(timestamp);
        var year = thistime.getFullYear();
        var month = thistime.getMonth() + 1;
        month = _format_num(month);
        var date = thistime.getDate();
        date = _format_num(date);
        var hour = thistime.getHours();
        hour = _format_num(hour);
        var minute = thistime.getMinutes();
        minute = _format_num(minute);
        var second = thistime.getSeconds();
        second = _format_num(second);
        return year + "年" + month + "月" + date + "日   " + hour + ":" + minute + ":" + second;
    }
});