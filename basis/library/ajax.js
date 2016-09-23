$.extend(window[RO], {
    /*
        此方法严重依赖与业务场景；
        所以此文件只作为备份，如需使用，
        请复制到项目中，按项目需求配置好后使用；
        只有注意mock的目录，和与后端约定的返回字段与返回值
    */
    ajax: function(config) {
        //本地化 配置mock目录
        if (window[RO].g_var.ISLOCAL) {
            config.url = '/mock' + config.url;
            config.type = 'GET';
        }
        $.ajax($.extend({
            //默认配置
            'dataType': 'json',
            'cache': false
        }, config));
    },
    ajax_success: function(data, callback, show_err_fn, clearpwd) {
        clearpwd && $('input[type=password]').val('');
        show_err_fn = show_err_fn || function(param) {
            window[RO].show_top_dialog({
                msg: param.responseMsg,
                type: "failure",
                auto_hide: false,
                hide_time: 2500,
                time: 88
            });
        };
        switch (data.responseCode) {
            case "200":
                break;
            case '500':
                data.responseMsg = "网络错误，请稍后再试！";
                show_err_fn(data);
                break;
            default:
                show_err_fn(data);
        }
    },
    ajax_error: function(xhr, status, error, show_err_fn, clearpwd) {
        clearpwd && $('input[type=password]').val('');
        show_err_fn = show_err_fn || function(param) {
            window[RO].show_top_dialog({
                msg: param.responseMsg,
                type: "failure",
                auto_hide: false,
                hide_time: 2500,
                time: 88
            });
        };
        switch (status) {
            case "timeout":
                show_err_fn("服务器响应超时，请重新再试！");
                break;
            case "error":
                if (xhr.status == 401) {
                    window[RO].show_login_dialog(true);
                } else {
                    show_err_fn("服务器错误，请重新再试！");
                }
                break;
            case "abort":
                console.log("用户放弃请求");
                break;
            case "parsererror":
                console.log("ajax parsererror:", error);
                break;
            default:
                show_err_fn("网络错误，请稍后再试！");
        }
    }
});