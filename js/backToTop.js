// Scroll to Top
// $(window).scroll(function() {
//     if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
//         $('#return-to-top').fadeIn(200);    // Fade in the arrow
//     } else {x
//         $('#return-to-top').fadeOut(200);   // Else fade out the arrow
//     }
// });
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});
var timer; 
$('.no-loader').bind('scroll wheel mousemove touchmove tap swipeleft swipeup swipedown swiperight', function(e) { 
    var circle= $('#return-to-top');
    if ($(window).scrollTop() < 50) return circle.fadeOut('slow');
    if (!circle.is(":visible")) {
        circle.fadeIn(20);
    }    
    if (timer) clearTimeout(timer);
    timer = setTimeout(function(){ circle.fadeOut('slow') }, 4000);
}); 
