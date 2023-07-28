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
    } else {
      $(".restaurant__list.slick-initialized, .promo__list.slick-initialized").slick("unslick");
    }
  });

  $('.filters__link').on('click', function () {
    $('.filters__link').removeClass('current');
    $(this).addClass('current');
  });

  new Swiper('.testimonials__swiper', {

    pagination: {
      el: '.pagination',
      clickable: true,
      bulletElement: 'button',
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
      el: '.recent__pagination',
      clickable: true,
      bulletElement: 'button',
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
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 2,
        spaceBetween: 5,
        slidesPerGroup: 2,
        loop: false,
      }
    }
  });

  $(".rating").rateYo({
    "starSvg":
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">'+
      '<path d="M0.0229731 6.16432C0.0780973 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322151 6.334 0.0229731 6.16432Z"/>'+
      '</svg>',
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
      clickable: true,
      bulletElement: 'button',
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
try {
  modalController({
    modal: '.product-popup',
    btnOpen: '.product__link',
    btnClose: '.product-popup__close',
  });
} catch (error) {  
}
