/**
 * jQuery-viewport-checker - v1.8.8 - 2017-09-25
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 *
 * Copyright (c) 2017 Dirk Groenen
 * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
 */
!(function (b) {
  b.fn.viewportChecker = function (n) {
    var e = {
      classToAdd: "visible",
      classToRemove: "invisible",
      classToAddForFullView: "full-visible",
      removeClassAfterAnimation: !1,
      offset: 100,
      repeat: !1,
      invertBottomOffset: !0,
      callbackFunction: function (b, e) {},
      scrollHorizontal: !1,
      scrollBox: window,
    };
    b.extend(e, n);
    var g = this,
      k = b(e.scrollBox).height(),
      p = b(e.scrollBox).width();
    return (
      (this.checkElements = function () {
        var f, h;
        e.scrollHorizontal
          ? ((f = Math.max(
              b("html").scrollLeft(),
              b("body").scrollLeft(),
              b(window).scrollLeft()
            )),
            (h = f + p))
          : ((f = Math.max(
              b("html").scrollTop(),
              b("body").scrollTop(),
              b(window).scrollTop()
            )),
            (h = f + k));
        g.each(function () {
          var a = b(this),
            c = {},
            d = {};
          if (
            (a.data("vp-add-class") && (d.classToAdd = a.data("vp-add-class")),
            a.data("vp-remove-class") &&
              (d.classToRemove = a.data("vp-remove-class")),
            a.data("vp-add-class-full-view") &&
              (d.classToAddForFullView = a.data("vp-add-class-full-view")),
            a.data("vp-keep-add-class") &&
              (d.removeClassAfterAnimation = a.data(
                "vp-remove-after-animation"
              )),
            a.data("vp-offset") && (d.offset = a.data("vp-offset")),
            a.data("vp-repeat") && (d.repeat = a.data("vp-repeat")),
            a.data("vp-scrollHorizontal") &&
              (d.scrollHorizontal = a.data("vp-scrollHorizontal")),
            a.data("vp-invertBottomOffset") &&
              (d.scrollHorizontal = a.data("vp-invertBottomOffset")),
            b.extend(c, e),
            b.extend(c, d),
            !a.data("vp-animated") || c.repeat)
          ) {
            0 < String(c.offset).indexOf("%") &&
              (c.offset = (parseInt(c.offset) / 100) * k);
            var d = c.scrollHorizontal ? a.offset().left : a.offset().top,
              g = c.scrollHorizontal ? d + a.width() : d + a.height(),
              l = Math.round(d) + c.offset,
              m = c.scrollHorizontal ? l + a.width() : l + a.height();
            c.invertBottomOffset && (m -= 2 * c.offset);
            l < h && m > f
              ? (a.removeClass(c.classToRemove),
                a.addClass(c.classToAdd),
                c.callbackFunction(a, "add"),
                g <= h && d >= f
                  ? a.addClass(c.classToAddForFullView)
                  : a.removeClass(c.classToAddForFullView),
                a.data("vp-animated", !0),
                c.removeClassAfterAnimation &&
                  a.one(
                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                    function () {
                      a.removeClass(c.classToAdd);
                    }
                  ))
              : a.hasClass(c.classToAdd) &&
                c.repeat &&
                (a.removeClass(c.classToAdd + " " + c.classToAddForFullView),
                c.callbackFunction(a, "remove"),
                a.data("vp-animated", !1));
          }
        });
      }),
      ("ontouchstart" in window || "onmsgesturechange" in window) &&
        b(document).bind(
          "touchmove MSPointerMove pointermove",
          this.checkElements
        ),
      b(e.scrollBox).bind("load scroll", this.checkElements),
      b(window).resize(function (f) {
        k = b(e.scrollBox).height();
        p = b(e.scrollBox).width();
        g.checkElements();
      }),
      this.checkElements(),
      this
    );
  };
})(jQuery);
var isBuilder = $("html").hasClass("is-builder");
isBuilder ||
  $(".counters").each(function () {
    $(this).viewportChecker({
      offset: 200,
      callbackFunction: function (b, n) {
        $("#" + b.attr("id") + " .count").each(function () {
          var b = $(this).text().trim(),
            g =
              2 < b.length - (b.indexOf(".") + 1)
                ? b.replace(/\./gi, "")
                : Math.floor(b);
          $(this)
            .prop("Counter", 0)
            .animate(
              { Counter: g },
              {
                duration: 3e3,
                easing: "swing",
                step: function (b) {
                  $(this).text(Math.ceil(b));
                },
                done: function () {
                  $(this).text(b);
                },
              }
            );
        });
      },
    });
  });
