$.extend(window[RO], {
    /**
     * parseUrl
     * get url parameter args
     * @ tourl       if tourl, use tourl instead of url
     */
    parseUrl: function(tourl) {
        tourl = tourl || window.location.href;
        try {
            if (tourl.indexOf('?') !== -1) {
                tourl = tourl.split('?')[1];
            }
            if (tourl.indexOf('&') === -1) {
                return {};
            }
            var paramsArr = tourl.split('&');
            var args = {},
                argsStr = [],
                param, name, value;
            // args['url'] = encodeURIComponent(tourl.split('?')[0]);
            for (var i = 0; i < paramsArr.length; i++) {
                param = paramsArr[i].split('=');
                name = param[0], value = param[1];
                if (name == "") name = "unkown";
                if (typeof args[name] == "undefined") {
                    args[name] = value;
                } else if (typeof args[name] == "string") {
                    args[name] = [args[name]];
                    args[name].push(value);
                } else {
                    args[name].push(value);
                }
            }
            var showArg = function(x) { //转换不同数据的显示方式
                    if (typeof(x) == "string" && !/\d+/.test(x)) return "'" + x + "'"; //字符串
                    if (x instanceof Array) return "[" + x + "]"; //数组
                    return x; //数字
                }
                // args.toString = function() { //组装成json格式
                //     for (var i in args) argsStr.push(i + ':' + showArg(args[i]));
                //     return '{' + argsStr.join(',') + '}';
                // }
            return args; //以json格式返回获取的所有参数
        } catch (e) {
            return {};
        }
    }
});