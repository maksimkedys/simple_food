$(function () {

  $(".burger-menu").on('click', () => {
    $(".mobile-menu").toggleClass("active");
    if ($(".mobile-menu").hasClass("active")) {
      $('body').addClass("lock");
    }
  });
  $(document).on('click', function (event) {
    if (event.target !== $(".burger-menu")[0] && event.target !== $(".mobile-menu")[0]) {
      $(".mobile-menu").removeClass("active");
      $('body').removeClass("lock");
    }
  });

  $(window).on("load resize", function () {
    if ($(window).width() < 577) {
      $(".restaurant__list:not(.slick-initialized)").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1
      });
    } else {
      $(".restaurant__list.slick-initialized").slick("unslick");
    }
  });

  $('.user-nav__btn--search').on('click', function () {
    $('.user-nav__search').toggleClass('active');
    $('.user-nav__search-input').trigger("focus");
    $('.user-nav__search-input').val('');
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

  var mixer = mixitup('.popular__catalog', {
    load: {
      filter: '.burger',
    },
    "animation": {
      "duration": 500,
      "nudge": false,
      "reverseOut": true,
      "effects": "fade"
    }
  });
});