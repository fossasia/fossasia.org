function reInit(target){


	"use strict";

    /************** Nav Scripts **************/

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1) {
            $(target+' nav').addClass('sticky-nav');
        } else {
            $(target+' nav').removeClass('sticky-nav');
        }
    });

    $(target+' a').click(function() {
        if ($(this).attr('href') === '#') {
            return false;
        }
    });

    // Margin on the menu to make room for sidebar menu if it exists

    if ($(target+' .sidebar-menu-toggle').length && !$(target+' .sidebar-menu-toggle i').hasClass('variant-deleted-mrv')) {
        $(target+' nav').find('.menu').css('margin-right', 32);
    }

    // Mobile menu toggle

    $(target+' .mobile-menu-toggle').click(function() {
        $(target+' nav').toggleClass('open-menu');
    });

    // Sidebar menu toggle

    $(target+' .sidebar-menu-toggle').click(function() {
        if ($(target+' .instagram-sidebar').hasClass('show-sidebar')) {
            $(target+' .instagram-sidebar').toggleClass('show-sidebar');
            $(target+' .sidebar-menu').toggleClass('show-sidebar');
        } else {
            $(target+' .sidebar-menu').toggleClass('show-sidebar');
            $(target+' .main-container').toggleClass('reveal-sidebar');
            $(target+' nav .container').toggleClass('reveal-sidebar');
        }
    });

    $(target+' .instagram-toggle').click(function() {
        if ($(target+' .sidebar-menu').hasClass('show-sidebar')) {
            $(target+' .sidebar-menu').toggleClass('show-sidebar');
            $(target+' .instagram-sidebar').toggleClass('show-sidebar');
        } else {
            $(target+' .instagram-sidebar').toggleClass('show-sidebar');
            $(target+' .main-container').toggleClass('reveal-sidebar');
            $(target+' nav .container').toggleClass('reveal-sidebar');
        }
    });

    $(target+' .main-container').click(function() {
        if ($(target+' .sidebar-menu').hasClass('show-sidebar')) {
            $(target+' .sidebar-menu').toggleClass('show-sidebar');
            $(target+' .main-container').toggleClass('reveal-sidebar');
            $(target+' nav .container').toggleClass('reveal-sidebar');
        }

        if ($(target+' .instagram-sidebar').hasClass('show-sidebar')) {
            $(target+' .instagram-sidebar').toggleClass('show-sidebar');
            $(target+' .main-container').toggleClass('reveal-sidebar');
            $(target+' nav .container').toggleClass('reveal-sidebar');
        }
    });

    /************** Slider Scripts **************/

    $(target+' .hero-slider').flexslider({
        directionNav: false
    });
    $(target+' .testimonials-slider').flexslider({
        directionNav: false
    });

    $(target+' .image-slider').flexslider({
        animation: "slide",
        directionNav: false
    });

    /************** Divider Scripts **************/

    $(target+' .background-image-holder').each(function() {

        // Append background-image <img>'s as li item CSS background for better responsive performance
        var imgSrc = $(this).children('.background-image').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('.background-image').hide();
        $(this).css('background-position', '50% 0%');
        // Check if the slider has a color scheme attached, if so, apply it to the slider nav
    });

    /************** Instagram Feed **************/

    jQuery.fn.spectragram.accessData = {
        accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        clientID: 'fedaafacf224447e8aef74872d3820a1'
    };

    $(target+' .instafeed').each(function() {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name')
        });
    });

    /************** Fullscreen Elements **************/

    $(target+' .fullscreen-element').each(function() {
        if ($(window).height() < 768) {
            $(this).css('height', 900);
        } else {
            $(this).css('height', $(window).height());
        }
    });

    /************** Twitter Feed **************/

    $(target+' .tweets-feed').each(function(index) {
        $(this).attr('id', 'tweets-' + index);
    }).each(function(index) {

        function handleTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var element = document.getElementById('tweets-' + index);
            var html = '<ul class="slides">';
            while (n < x) {
                html += '<li>' + tweets[n] + '</li>';
                n++;
            }
            html += '</ul>';
            element.innerHTML = html;
            return html;
        }

        twitterFetcher.fetch($(target+' #tweets-' + index).attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);

    });

    /************** Countdown Timer **************/

    $(target+' .countdown').each(function() {
        $(this).countdown({
            until: new Date($(this).attr('data-date'))
        });
    });

    /************** Map Interaction **************/

    $(target+' .fullwidth-map').click(function() {
        $(this).removeClass('screen');
    });

    $(window).scroll(function() {
        if (!$(target+' .fullwidth-map').hasClass('screen')) {
            $(target+' .fullwidth-map').addClass('screen');
        }
    });

    /************** Contact Form Code **************/

    $(target+' form.email-form').submit(function(e) {
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
            loadingSpinner = $(target+' <div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
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





	"use strict";

    var navHeight = $(target+' nav').outerHeight();
    $(target+' .inner-link').smoothScroll({
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

    $(target+' .parallax-background').each(function() {
        $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
        $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
        $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');
    });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }

    $(target+' .tweets-feed').flexslider({
        directionNav: false,
        controlNav: false
    });


    $(target+' .instagram li a').attr('title', '');

    setTimeout(function() {

        $(target+' .instagram li').each(function() {

            // Append background-image <img>'s as li item CSS background for better responsive performance
            var imgSrc = $(this).find('img').attr('src');
            $(this).css('background', 'url("' + imgSrc + '")');
            $(this).find('img').css('opacity', 0);
            $(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav
        });

    }, 1000);

    // Mailchimp/Campaign Monitor Mail List Form Scripts

    $(target+' form.mail-list-signup').on('submit', function() {

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
        $(target+' .loader').addClass('hide-loader');
        setTimeout(function() {
            $(target+' .loader').remove();
            $(target+' .main-container').addClass('show-content');
            $(target+' nav').addClass('show-content');
        }, 500);
    }, 10);




}