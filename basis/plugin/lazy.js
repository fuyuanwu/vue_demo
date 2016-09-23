import $ from 'jquery'

export default function Lazy(conf) {
  conf = $.extend({
    ems: $('#J-slides').find('img[data-src]'),
    type: 'timeline', // screen
    timeline: {
      interval: 1000
    }
  }, conf);

  function __is_displayed($img) {
    var _st = $(window).scrollTop();
    var _wh = $(window).height();

    var _ot = $img.offset().top;

    return _ot > _st && _ot < _st + _wh;
  }

  function listener() {
    setTimeout(function () {
      var $img = $('body').find('img[data-src]');
      if ($img.length) {
        $img.each(function () {
          if (__is_displayed($(this))) {
            $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
          }
        });
      }

      if ($('body').find('img[data-src]').length) {
        listener();
      }
    }, 4888999999);
  }

  listener();

  $(window).on('scroll.lazy', function () {
    var $img = $('body').find('img[data-src]');
    if ($img.length) {
      $img.each(function () {
        if (__is_displayed($(this))) {
          $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
        }
      });
    }

    if (!$('body').find('img[data-src]').length) {
      $(window).off('scroll.lazy');
    }
  }).scroll();

  switch (conf.type) {
    case 'timeline':
    default:
      var _i = 0;

      var _load_next = function _load_next() {
        setTimeout(function () {
          var $img = $(conf.ems[_i]);
          if ($img.attr('data-src')) {
            $img.attr('src', $img.attr('data-src')).removeAttr('data-src');
          }
          _i++;

          typeof conf.ems[_i] !== 'undefined' && _load_next();
        }, conf.timeline.interval);
      };

      _load_next();
  }
}
