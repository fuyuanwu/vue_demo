$.extend(window[RO], {
    /**
     * pwdStrength
     * compute pwd strength
     * @ pwd    pwd to compute
     */
    pwdStrength: function(pwd) {
        function CharMode(iN) {
            if (iN >= 48 && iN <= 57) return 1;
            if (iN >= 65 && iN <= 90) return 2;
            if (iN >= 97 && iN <= 122) return 4;
            return 8;
        }

        function bitTotal(num) {
            var modes = 0;
            for (var i = 0; i < 4; i++) {
                if (num & 1) modes++;
                num >>>= 1;
            }
            return modes;
        }

        function checkStrong(sPW) {
            if (sPW.length <= 4) return 0;
            var Modes = 0;
            for (var i = 0; i < sPW.length; i++) {
                Modes |= CharMode(sPW.charCodeAt(i));
            }
            return bitTotal(Modes);
        }
        var _level;
        if (pwd == null || pwd == '') {
            _level = '0';
        } else {
            S_level = checkStrong(pwd);
            switch (S_level) {
                case 0:
                    _level = '0';
                case 1:
                    _level = '1';
                    break;
                case 2:
                    _level = '2';
                    break;
                case 3:
                default:
                    _level = '3';
            }
        }
        return _level;
    }
});