var isBuilder = $("html").hasClass("is-builder");
isBuilder ||
  "undefined" !== typeof window.initPopupBtnPlugin ||
  ((window.initPopupBtnPlugin = !0),
  $("section.popup-btn-cards .card-wrapper").each(function (a, b) {
    $(this).addClass("popup-btn");
  }));
