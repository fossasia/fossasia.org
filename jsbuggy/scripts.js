$(document).ready(function() {

	"use strict";

    /************** Nav Scripts **************/
    var prevScrollpos = window.pageYOffset;
    var currentScrollPos = null; 
    $(window).scroll(function(){
        if ($(window).scrollTop() > 1) {
            $('nav').addClass('sticky-nav');
        } else {
            $('nav').removeClass('sticky-nav');
        }
    });
    $(window).scroll(function() {
        currentScrollPos = window.pageYOffset;
        if ( currentScrollPos < 780) {
            $('nav').css('top', '0px');
        } else if(currentScrollPos - prevScrollpos > 3){
            setTimeout(function(){
                $('nav').css('top', '-100px');
            },400)
        } else if(prevScrollpos - currentScrollPos > 3){
            setTimeout(function(){
                $('nav').css('top', '0px');
            }, 400);
        }
        prevScrollpos = currentScrollPos ;
        $('nav').clearQueue();
    });

    $('a').click(function() {
        if ($(this).attr('href') === '#') {
            return false;
        }
    });
    // Margin on the menu to make room for sidebar menu if it exists

    if ($('.sidebar-menu-toggle').length && !$('.sidebar-menu-toggle i').hasClass('variant-deleted-mrv')) {
        $('nav').find('.menu').css('margin-right', 32);
    }

    // Mobile menu toggle

    $('.mobile-menu-toggle').click(function() {
        $('nav').toggleClass('open-menu');
    });

    // Sidebar menu toggle

    $('.sidebar-menu-toggle').click(function() {
        if ($('.instagram-sidebar').hasClass('show-sidebar')) {
            $('.instagram-sidebar').toggleClass('show-sidebar');
            $('.sidebar-menu').toggleClass('show-sidebar');
        } else {
            $('.sidebar-menu').toggleClass('show-sidebar');
            $('.main-container').toggleClass('reveal-sidebar');
            $('nav .container').toggleClass('reveal-sidebar');
        }
    });

    $('.instagram-toggle').click(function() {
        if ($('.sidebar-menu').hasClass('show-sidebar')) {
            $('.sidebar-menu').toggleClass('show-sidebar');
            $('.instagram-sidebar').toggleClass('show-sidebar');
        } else {
            $('.instagram-sidebar').toggleClass('show-sidebar');
            $('.main-container').toggleClass('reveal-sidebar');
            $('nav .container').toggleClass('reveal-sidebar');
        }
    });

    $('.main-container').click(function() {
        if ($('.sidebar-menu').hasClass('show-sidebar')) {
            $('.sidebar-menu').toggleClass('show-sidebar');
            $('.main-container').toggleClass('reveal-sidebar');
            $('nav .container').toggleClass('reveal-sidebar');
        }

        if ($('.instagram-sidebar').hasClass('show-sidebar')) {
            $('.instagram-sidebar').toggleClass('show-sidebar');
            $('.main-container').toggleClass('reveal-sidebar');
            $('nav .container').toggleClass('reveal-sidebar');
        }
    });

    /************** Slider Scripts **************/

    $('.hero-slider').flexslider({
        directionNav: false
    });
    $('.testimonials-slider').flexslider({
        directionNav: false
    });

    $('.image-slider').flexslider({
        animation: "slide",
        directionNav: false
    });

    /************** Instagram Feed **************/

    jQuery.fn.spectragram.accessData = {
        accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        clientID: 'fedaafacf224447e8aef74872d3820a1'
    };

    $('.instafeed').each(function() {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name')
        });
    });

    /************** Fullscreen Elements **************/

    $('.fullscreen-element').each(function() {
        if ($(window).height() < 768) {
            $(this).css('height', 900);
        } else {
            $(this).css('height', $(window).height());
        }
    });

    /************** Twitter Feed **************/

    //in tweets.js file

    /************** Countdown Timer **************/

    $('.countdown').each(function() {
        $(this).countdown({
            until: new Date($(this).attr('data-date'))
        });
    });

    /************** Map Interaction **************/

    $('.fullwidth-map').click(function() {
        $(this).removeClass('screen');
    });

    $(window).scroll(function() {
        if (!$('.fullwidth-map').hasClass('screen')) {
            $('.fullwidth-map').addClass('screen');
        }
    });

    /************** Contact Form Code **************/

    $('form.email-form').submit(function(e) {
        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        var thisForm = $(this).closest('.email-form'),
            error = 0,
            originalError = thisForm.attr('original-error'),
            loadingSpinner;

        if (typeof originalError !== typeof undefined && originalError !== false) {
            thisForm.find('.form-error').text(originalError);
        }


        $(thisForm).find('.validate-required').each(function(){
            if($(this).val() === ''){
                $(this).addClass('field-error');
                error = 1;
            }else{
                $(this).removeClass('field-error');
            }
        });

        $(thisForm).find('.validate-email').each(function() {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });


        if (error === 1) {
            $(this).closest('.email-form').find('.form-error').fadeIn(200);
        } else {
            // Hide the error if one was shown
            $(this).closest('.email-form').find('.form-error').fadeOut(200);
            // Create a new loading spinner while hiding the submit button.
            loadingSpinner = $('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
            $(thisForm).find('input[type="submit"]').hide();
            jQuery.ajax({
                type: "POST",
                url: "mail/mail.php",
                data: thisForm.serialize(),
                success: function(response) {
                    // Swiftmailer always sends back a number representing numner of emails sent.
                    // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
                    $(thisForm).find('.form-loading').remove();
                    $(thisForm).find('input[type="submit"]').show();
                    if ($.isNumeric(response)) {
                        if (parseInt(response) > 0) {
                            thisForm.find('.form-success').fadeIn(1000);
                            thisForm.find('.form-error').fadeOut(1000);
                            setTimeout(function() {
                                thisForm.find('.form-success').fadeOut(500);
                            }, 5000);
                        }
                    }
                    // If error text was returned, put the text in the .form-error div and show it.
                    else {
                        // Keep the current error text in a data attribute on the form
                        thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
                        // Show the error with the returned error text.
                        thisForm.find('.form-error').text(response).fadeIn(1000);
                        thisForm.find('.form-success').fadeOut(1000);
                    }
                },
                error: function (errorObject, errorText, errorHTTP) {
                    // Keep the current error text in a data attribute on the form
                    thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
                    // Show the error with the returned error text.
                    thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
                    thisForm.find('.form-success').fadeOut(1000);
                    $(thisForm).find('.form-loading').remove();
                    $(thisForm).find('input[type="submit"]').show();
                }
            });
        }
        return false;
    });

});

$(window).load(function() {

	"use strict";

    var navHeight = $('nav').outerHeight();
    $('.inner-link').smoothScroll({
        offset: -navHeight,
        speed: 800
    });

    /************** Parallax Scripts **************/

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    $('.parallax-background').each(function() {
        $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
        $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
        $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');
    });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }

    $('.tweets-feed').flexslider({
        directionNav: false,
        controlNav: false
    });


    $('.instagram li a').attr('title', '');

    setTimeout(function() {

        $('.instagram li').each(function() {

            // Append background-image <img>'s as li item CSS background for better responsive performance
            var imgSrc = $(this).find('img').attr('src');
            $(this).css('background', 'url("' + imgSrc + '")');
            $(this).find('img').css('opacity', 0);
            $(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav
        });

    }, 1000);

    // Mailchimp/Campaign Monitor Mail List Form Scripts

    $('form.mail-list-signup').on('submit', function() {

        var iFrame = $(this).closest('section, header').find('iframe.mail-list-form'),

            userEmail = $(this).find('.signup-email-field').val(),
        userFullName = $(this).find('.signup-name-field').val(),
        userFirstName = $(this).find('.signup-first-name-field').val(),
        userLastName = $(this).find('.signup-last-name-field').val();

        iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
        iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
        iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
        iFrame.contents().find('#mce-FNAME, #fieldName').val(userFullName);

        iFrame.contents().find('form').attr('target', '_blank').submit();
        return false;
    });

    setTimeout(function() {
        $('.loader').addClass('hide-loader');
        setTimeout(function() {
            $('.loader').remove();
            $('.main-container').addClass('show-content');
            $('nav').addClass('show-content');
        }, 500);
    }, 10);


});
	//Sendy verify if email is empty
	function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
        };

	$('.email-subscribe').submit(function() {
        if ($.trim($("#email").val()) === "") {
        alert('Please enter your email address in the form');
        return false; }
        else if ( !isValidEmailAddress( $.trim($("#email").val())  ) ) {
        alert("Not a valid email address");
        return false;
    }
});
    /************** Defer offscreen images **************/
// Sections which have images have class lazy-section and the images have class lazy
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadSections ;    // Stores the elements for lazy loading
    var lazyLoadElements ;   // stores the img in the element
    var lazyloadThrottleTimeout;
    var scrollTop ;
    function lazyload () {
        lazyloadSections = document.querySelectorAll(".lazy-section");
        if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }    
        lazyloadThrottleTimeout = setTimeout(function() {
            scrollTop = window.pageYOffset;
            lazyloadSections.forEach(function(section) {
                if($(section).offset().top -1300 < (window.innerHeight + scrollTop)  && $(section).height() + $(section).offset().top + 1300 > scrollTop ) {
                    lazyLoadElements = section.querySelectorAll('img , iframe');
                    lazyLoadElements.forEach(function(element){
                        if($(element).hasClass('background-image'))
                        {
                            var elementSrc = $(element).attr('data-src');
                            $(element).parent('.background-image-holder').css('background', 'url("' + elementSrc + '")');
                            $(element).hide();
                            $(element).parent('.background-image-holder').css('background-position', '50% 0%');
                        }
                        else{
                            element.src = element.dataset.src;
                        }
                    });
                    section.classList.remove('lazy-section');
                }
            });
        }, 0);
        if(lazyloadSections.length == 0 && !$('.map').hasClass('hid')) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
        }
    }
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
    lazyload();
});
