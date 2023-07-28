$(function () {
  // Smooth scroll
  $(".logo, .menu__link, .mobile-menu__link").on("click", function () {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1000);
  });

  // Burger menu
  $(".burger-menu, .mobile-menu__btn, .mobile-menu a").on('click', () => {
    $(".mobile-menu").toggleClass("active");
    if ($(".mobile-menu").hasClass("active")) {
      $('body').addClass("lock");
    } else {
      $('body').removeClass("lock");
    }
  });
  // Filters menu
  $(".catalog__top-btn, .filters__close").on('click', () => {
    $(".filters").toggleClass("active");
    if ($(".filters").hasClass("active")) {
      $('body').addClass("lock");
    } else {
      $('body').removeClass("lock");
    }
  });
  // Slider mobile
  $(window).on("load resize", function () {
    if ($(window).width() < 577) {
      $(".restaurant__list:not(.slick-initialized), .promo__list:not(.slick-initialized)").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1
      });
      $(".swiper-slide.swiper-slide--hidden").removeClass('swiper-slide');
    } else {
      $(".restaurant__list.slick-initialized, .promo__list.slick-initialized").slick("unslick");
      $(".swiper-slide--hidden").addClass('swiper-slide');
    }
  });

  $('.filters__link').on('click', function () {
    $('.filters__link').removeClass('current');
    $(this).addClass('current');
  });

  new Swiper('.testimonials__swiper', {

    pagination: {
      el: '.pagination',
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

  $('.catalog__top-select, .product__quantity').styler();

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

  new Swiper('.recent__swiper', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,

    pagination: {
      el: '.recent__swiper-pagination',
      clickable: true
    },
    navigation: {
      prevEl: '#recentPrev',
      nextEl: '#recentNext',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    mousewheel: {
      invert: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 5,
        slidesPerGroup: 2
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
      }
    }
  });

  $(".rating").rateYo({
    "starSvg":
      '<svg>' +
      '<use href="../images/sprite.svg#star"></use>' +
      '</svg >',
    starWidth: "16px",
    spacing: "6px",
    normalFill: "#c1c1c1",
    ratedFill: "#FFB800",
    readOnly: true,
    fullStar: true
  });

  new Swiper('.product__gallery', {
    loop: true,
    navigation: {
      prevEl: '.product__prev',
      nextEl: '.product__next',
    },
    effect: 'coverflow',
  });

  new Swiper('.product-popup__wrapper', {
    loop: true,
    navigation: {
      prevEl: '.product-popup__arrows--prev',
      nextEl: '.product-popup__arrows--next',
    },
    pagination: {
      el: '.product-popup__pagination',
      clickable: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  $('.tab__head-link').on("click", function (e) {
    e.preventDefault();
    $('.tab__head-link').removeClass('current');
    $(this).addClass('current');

    $('.tab__content-item').removeClass('current');
    $($(this).attr('href')).addClass('current');
  });

});

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({ top: scrollController.scrollPosition })
    document.documentElement.style.scrollBehavior = '';
  },
}


const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
    ) {

      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = event => {
    event.preventDefault();
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.product-popup',
  btnOpen: '.product__link',
  btnClose: '.product-popup__close',
});
