$(function () {
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