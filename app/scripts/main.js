//'use strict';

// initialize fullPage

$(document).ready(function () {
  $('#fullpage').fullpage({


  	//resposiveWidth:640,
    verticalCentered: false,
    css3: false,//si se pone true cambia las fotos//to avoi problems with css 
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    //navigationTooltips: ['Home', 'About', 'Portfolio','Expertise','Contact'],

//scrollingSpeed: 1000,
	






  });
});
//# sourceMappingURL=main.js.map

//WOW MOMENT 1
(function($) {
  var s,
  spanizeLetters = {
    settings: {
      letters: $('.js-spanize'),
    },
    init: function() {
      s = this.settings;
      this.bindEvents();
    },
    bindEvents: function(){
      s.letters.html(function (i, el) {
        //spanizeLetters.joinChars();
        var spanizer = $.trim(el).split("");
        return '<span>' + spanizer.join('</span><span>') + '</span>';
      });
    },
  };
  spanizeLetters.init();
})(jQuery);


//WOW MOMENT 2


