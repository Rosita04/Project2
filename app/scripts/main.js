//'use strict';

// initialize fullPage

$(document).ready(function () {
  $('#fullpage').fullpage({


  	//resposiveWidth:640,
    verticalCentered: false,
    css3: false,//si se pone true cambia las fotos//to avoi problems with css 
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    //navigationTooltips: ['Home', 'About', 'Portfolio','Expertise','Contact'],

	//scrollingSpeed: 700,
	






  });
});
//# sourceMappingURL=main.js.map

//CODE FOR SECTIO-0 WOW MOMENT

function moveLight (x, y, pointsAtX, pointsAtY, azimuth, dx, dy) {
    var spotLight = document.getElementById("spotLight");
    var distantLight = document.getElementById("distantLight");
    var offset = document.getElementById("offset");

    spotLight.setAttribute("x", x);
    spotLight.setAttribute("y", y);
    spotLight.setAttribute("pointsAtX", pointsAtX);
    spotLight.setAttribute("pointsAtY", pointsAtY);
    distantLight.setAttribute("azimuth", azimuth);
    offset.setAttribute("dx", dx);
    offset.setAttribute("dy", dy);
}

$(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var i=0;
    var j=0;
    var updateAnimationFrame = function() {
        i += 0.13;
        var si = Math.sin(i);
        j += 0.18;
        var cj = Math.cos(j);
        moveLight(
            300+si*300, 200+cj*200,
            300+si*200, 200+cj*120,
            Math.atan2(cj, si) * 180 / Math.PI,
            -si*20, -cj*20
        );
        requestAnimationFrame(updateAnimationFrame);
    };
    updateAnimationFrame();
});

