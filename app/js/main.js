$(function () {
  $(".logo, .menu__link, .mobile-menu__link").on("click", function (event) {
    // event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1000);
  });

  $(".burger-menu, .mobile-menu__btn, .mobile-menu a").on('click', () => {
    $(".mobile-menu").toggleClass("active");
    if ($(".mobile-menu").hasClass("active")) {
      $('body').addClass("lock");
    } else {
      $('body').removeClass("lock");
    }
  });
  $('body.lock').on("click", function (event) {

    $(".mobile-menu").toggleClass("active");
    $('body').removeClass("lock");
  });
  // $(document).on('click', function (event) {
  //   if (event.target !== $(".burger-menu")[0] && event.target !== $(".mobile-menu")[0]) {
  //     $(".mobile-menu").removeClass("active");
  //     $('body').removeClass("lock");
  //   }
  // });

  $(".catalog__top-btn, .filters__close").on('click', () => {
    $(".filters").toggleClass("active");
    if ($(".filters").hasClass("active")) {
      $('body').addClass("lock");
    } else {
      $('body').removeClass("lock");
    }
  });

  $(window).on("load resize", function () {
    if ($(window).width() < 577) {
      $(".restaurant__list:not(.slick-initialized), .promo__list:not(.slick-initialized)").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1
      });
    } else {
      $(".restaurant__list.slick-initialized, .promo__list.slick-initialized").slick("unslick");
    }
  });

  $('.filters__link').on('click', function () {
    $('.filters__link').removeClass('current');
    $(this).addClass('current');
  });

  new Swiper('.swiper', {

    pagination: {
      el: '.testimonials__pagination',
      clickable: true
    },

    navigation: {
      nextEl: '#arrowNext',
      prevEl: '#arrowPrev',
    },
  });

  $(window).on('scroll', function () {
    $('.header__container').toggleClass('header__container--scrolled', $(window).scrollTop() > 0);
  });

  $('.catalog__top-select').styler();

  var $range = $(".filters__price-input"),
    $inputFrom = $(".filters__price-from"),
    $inputTo = $(".filters__price-to"),
    instance,
    min = 0,
    max = 1100;

  $range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    hide_min_max: true,
    hide_from_to: true,
    onStart: updateInputs,
    onChange: updateInputs
  });
  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value");

    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });
  });

  $inputTo.on("input", function () {
    var val = $(this).prop("value");

    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
    });
  });

  try {
    mixitup('.popular__catalog', {
      load: {
        filter: '.burger',
      },
      animation: {
        duration: 500,
        nudge: false,
        reverseOut: true,
        effects: 'fade',
      },
    });
  } catch (error) {
  }
});