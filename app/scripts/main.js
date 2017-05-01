//'use strict';

// initialize fullPage

$(document).ready(function () {
  $('#fullpage').fullpage({


    //resposiveWidth:640,
    verticalCentered: false,
    css3: false,//si se pone true cambia las fotos//to avoi problems with css 
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    //scrollOverflow: true    //navigationTooltips: ['Home', 'About', 'Portfolio','Expertise','Contact'],

//scrollingSpeed: 1000,
  






  });
});


//# sourceMappingURL=main.js.map

//WOW MOMENT 1

/*-----
Spanizer
- Wraps letters with spans, for css animations
-----*/
(function($) {
  var s,
    spanizeLetters = {
      settings: {
        letters: $('.js-spanize')
      },
      init: function() {
        s = this.settings;
        this.bindEvents();
      },
      bindEvents: function() {
        s.letters.html(function(i, el) {
          //spanizeLetters.joinChars();
          var spanizer = $.trim(el).split('');
          return '<span>' + spanizer.join('</span><span>') + '</span>';
        });
      }
    };
  spanizeLetters.init();
})(jQuery);


//WOW MOMENT 2


$(document).ready(function() {

  // Pause just a moment
  setTimeout(function() {

    var $book = $('.book');

    // Apply the intro classes that will 
    // appear to turn the book,
    // revealing its spine
    $book.addClass('bookIntro');

    // pause another moment, then turn back
    setTimeout(function() {
      $book.removeClass('bookIntro');
    }, 2000);


  }, 1000);


});

//SECTION3 CODE


var vid = document.getElementById('bgvid');
var pauseButton = document.querySelector('#polina button');

if (window.matchMedia('(prefers-reduced-motion)').matches) {
    vid.removeAttribute('autoplay');
    vid.pause();
    pauseButton.innerHTML = 'Paused';
}

function vidFade() {
  vid.classList.add('stopfade');
}

vid.addEventListener('ended', function()
{
// only functional if "loop" is removed 
vid.pause();
// to capture IE10
vidFade();
}); 


pauseButton.addEventListener('click', function() {
  vid.classList.toggle('stopfade');
  if (vid.paused) {
    vid.play();
    pauseButton.innerHTML = 'Pause';
  } else {
    vid.pause();
    pauseButton.innerHTML = 'Paused';
  }
})


