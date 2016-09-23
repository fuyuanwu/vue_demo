$.extend(window[RO], {
    paging: function(conf) {
        var _this = this;
        conf = $.extend({
            tpl: '',
            api: '',
            type: 'POST',
            idx: 1,
            ptype: 1,
            jsontype: "json",
            container: '',
            callback: function() {
                void 0;
            },
            dataPreprocessor: false,
            genData: function() {
                return {};
            }
        }, conf);

        this._cached = {};
        this.inited = false;
        this.idx = conf.idx;
        this._genData = function() {
            var _d = conf.genData();

            _d.currentPage = _this.idx;
            // _d.rd = Math.random();
            _this._d = _d;

            var _order = conf.container.parent().find('.th_order_by');
            if (_order.length) {
                if (_order.filter('.th_order_by-desc').length) {
                    // _d[_order.filter('.th_order_by-desc').attr('data-key')] = 1;
                    _d['o'] = _order.filter('.th_order_by-desc').attr('data-key') + '1';
                }
                if (_order.filter('.th_order_by-asce').length) {
                    // _d[_order.filter('.th_order_by-asce').attr('data-key')] = 2;
                    _d['o'] = _order.filter('.th_order_by-desc').attr('data-key') + '2';
                }
            }
        };

        function loading_done() {
            _this.loading = false;
            $('#J-table_loading').remove();
        }

        this.getPage = function(callback, force) {
            if (!force && _this._cached[_this.idx]) {
                callback();
                return;
            }
            _this._genData();

            if (_this.loading) {
                return false;
            } else {
                if (!$($(conf.container).attr('data-paging')).length) {
                    $('.J-page', $(conf.container)).hide();
                } else {
                    $(conf.container).children('[data-idx]').hide();
                    $($(conf.container).attr('data-paging')).children('[data-idx]').hide();
                }
                if (conf.container[0].tagName.toLowerCase() === 'ul') {
                    conf.container.prepend('<li class="loading_wrapper" id="J-table_loading"><p>加载中</p><p><span class="loading"></span></p></li>');
                } else {
                    conf.container.prepend('<tr class="loading_wrapper" id="J-table_loading"><td colspan="' + conf.container.siblings('thead').find('th').length + '"><p>加载中</p><p><span class="loading"></span></p></td></tr>');
                }
                _this.loading = true;
            }
            _this._d['_'] = Math.random();

            function getPageData(data) {
                loading_done();
                var temp = data.body.data;
                data.body.data = null;
                data.body = $.extend(true, data.body, temp);

                if (data.body && typeof data.body.totalItem === 'number' && data.body.totalItem > 0) {
                    data.body.startRecord = (_this.idx - 1) * data.body.pageSize + 1;
                    data.body.endRecord = data.body.totalItem - (_this.idx - 1) * data.body.pageSize;
                    data.body.endRecord = data.body.endRecord > data.body.pageSize ? _this.idx * data.body.pageSize : data.body.startRecord + data.body.endRecord - 1;
                    data.body.hasPrev = _this.idx !== 1;
                    data.body.prev = _this.idx - 1;
                    data.body.hasNext = data.body.totalItem - _this.idx * data.body.pageSize > 0;
                    data.body.next = _this.idx + 1;
                    data.body.notFirst = _this.idx !== 1;
                    data.body.first = 1;
                    data.body.notLast = data.body.hasNext;
                    data.body.last = Math.ceil(data.body.totalItem / data.body.pageSize);
                    data.body.idx = _this.idx;
                    data.body.totalCount = data.body.totalItem;

                    data.body.prevLink = CP.getUrlWithoutParam() + '?';

                    var url_ps = CP.parseUrl(window.location.href);

                    for (var i in _this._d) {
                        url_ps[i] = _this._d[i];
                    }

                    for (var i in url_ps) {
                        if (i !== 'i') {
                            data.body.prevLink += i + '=' + url_ps[i] + '&';
                        }
                    }

                    data.body.nextLink = data.body.prevLink + 'currentPage=' + data.body.next;
                    data.body.firstLink = data.body.prevLink + 'currentPage=1';
                    data.body.lastLink = data.body.prevLink + 'currentPage=' + data.body.last;
                    data.body.prevLink += 'currentPage=' + data.body.prev;

                    (typeof conf.dataPreprocessor === 'function') && (data.body = conf.dataPreprocessor(data.body));

                    _this._cached[_this.idx] = data.body;

                    // window[RO].reqJs('tpl/'+[conf.tpl], function(Template) {
                    //     data.body.ptype = conf.ptype;
                    //     var res = nunjucks.render(conf.tpl + '.html', data.body);
                    //     // var paging = nunjucks.render('tpl/js/gallery/paging/bar.html', data.body);
                    //     if (force) {
                    //         $(conf.container).empty();
                    //     }

                    //     if ($($(conf.container).attr('data-paging')).length) {
                    //         $(conf.container).append(res);
                    //         force && $($(conf.container).attr('data-paging')).empty();
                    //         $($(conf.container).attr('data-paging')).append(paging);
                    //     } else {
                    //         $(conf.container).append(res + paging);
                    //     }
                    //     // FI.UI.layer_tips($(conf.container).find('.layer_tips:visible'));
                    //     typeof callback === 'function' && callback();
                    //     typeof conf.callback === 'function' && conf.callback();
                    // });
                } else {
                    window[RO].reqJs('tpl/'+[conf.tpl], function(Template) {
                        function nunjucksrender() {
                            var res = nunjucks.render(conf.tpl + '.html', data.body.data);

                            if (force) {
                                $(conf.container).empty();
                            }

                            if ($($(conf.container).attr('data-paging')).length) {
                                $($(conf.container).attr('data-paging')).empty();
                            }

                            $(conf.container).html(res);
                        }
                        nunjucksrender();
                        typeof callback === 'function' && callback();
                        typeof conf.callback === 'function' && conf.callback();
                    });
                }
            }

            if (conf.jsontype === "jsonp") {
                CP.helper.jsonpCall(conf.api + _this.idx, function(ret) {
                    CP.helper.ajax_success(ret, function(data) {
                        getPageData(ret);
                    }, function() {});
                });

            } else {
                $.ajax({
                    url: conf.api,
                    data: _this._d,
                    type: conf.type,
                    dataType: 'json',
                    success: function(data) {
                        if (data.body && data.body.errMsg) {
                            $('#J-table_loading').remove();
                            // FI.UI.show_top_dialog({
                            //     msg: data.body.errMsg,
                            //     type: "failure",
                            //     auto_hide: true,
                            //     hide_time: 5000,
                            //     time: 88
                            // });
                            alert(data.body.errMsg)
                                // return false;
                        };
                        getPageData(data);
                    },
                    error: function(xhr, status, error) {
                        loading_done();
                        window[RO].ajax_error(xhr, status, error);
                    }
                });
            }


        };

        this.goPage = function(idx, callback, force) {
            _this.idx = parseInt(idx, 10);
            var __wst = $(window).scrollTop();
            force && (_this._cached = {});

            _this.getPage(function() {
                if (!$($(conf.container).attr('data-paging')).length) {
                    $('.J-page', $(conf.container)).hide();
                    $('.J-page[data-idx=' + idx + ']', $(conf.container)).show();
                } else {
                    $(conf.container).children('[data-idx]').hide().filter('[data-idx=' + idx + ']').show();
                    $($(conf.container).attr('data-paging')).children('[data-idx]').hide().filter('[data-idx=' + idx + ']').show();
                    if (conf.jsontype === "jsonp") {

                        $($(conf.container).attr('data-paging')).children('[data-idx=' + idx + ']').find('span[data-idx]').removeClass('active').filter('[data-idx=' + idx + ']').addClass('active');
                        $($(conf.container).attr('data-paging')).each(function() {
                            var _h = $(this).html();
                            $(this).empty().html(_h)
                        }); // for chrome bug, hover style
                    }
                }
                setTimeout(function() {
                    $(window).scrollTop(__wst);
                }, 29);
                typeof callback === 'function' && callback();
            }, force);
        };

        this.init = function() {
            var cp = conf.container.parent();

            if (cp.find('.th_order_by').length) {
                cp.on('click', '.th_order_by', function() {
                    $(this).siblings('.th_order_by').removeClass('th_order_by-desc th_order_by-asce');
                    if ($(this).hasClass('th_order_by-desc')) {
                        $(this).addClass('th_order_by-asce').removeClass('th_order_by-desc');
                    } else {
                        $(this).addClass('th_order_by-desc').removeClass('th_order_by-asce');
                    }
                    _this.idx = 1;
                    _this.goPage(_this.idx, false, true);
                });
            }
            _this.goPage(conf.idx, function() {
                _this.inited = true;
                var _paging = $($(conf.container).attr('data-paging')) || $(conf.container).find('.paging');
                _paging.off('click').on('click', '.paging-link', function() {
                    _this.goPage($(this).attr('data-idx'));
                    return false;
                });
            });
        };
    }
});