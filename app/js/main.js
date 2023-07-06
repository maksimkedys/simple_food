$(function () {
  
  $('.user-nav__btn--search').on('click', function () {
    $('.user-nav__search').toggleClass('active');
    $('.user-nav__search-input').trigger("focus");
    $('.user-nav__search-input').val('');
  });


  $('.testimonials__inner').slick({
    dots: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="slick-icon" width="11" height="19"><use href="images/sprite.svg#prev-arrow"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="slick-icon" width="11" height="19"><use href="images/sprite.svg#next-arrow"></use></svg></button>',
    fade: true
  });

  $('.slick-arrow').on('click', function() {
    $('.slick-arrow').removeClass('current');
    $(this).addClass('current');
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