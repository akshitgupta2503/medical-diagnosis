(function ($) {
    'use strict';

    var $window = $(window);

    // :: Preloader Active Code with debug logs
    $window.on('load', function () {
        console.log("✅ Window load event triggered");

        const preloader = $('#preloader');
        if (preloader.length) {
            console.log("✅ Preloader found, fading out...");
            preloader.fadeOut('slow', function () {
                $(this).remove();
                console.log("✅ Preloader successfully removed");
            });
        } else {
            console.warn("⚠️ #preloader not found in DOM");
        }
    });

    // :: Fullscreen Section Height Adjustment
    $window.on('resizeEnd', function () {
        $(".full_height").height($window.height());
    });

    $window.on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");

    // :: Sticky Header
    if ($window.width() > 767 && $.fn.sticky) {
        $("#stickyHeader").sticky({
            topSpacing: 0
        });
    }

    // :: Bootstrap Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // :: Nice Scroll
    if ($.fn.niceScroll) {
        $("body, textarea").niceScroll({
            cursorcolor: "#151515",
            cursorwidth: "6px",
            background: "#f0f0f0"
        });
    }

    // :: Nice Select
    if ($.fn.niceSelect) {
        $('select').niceSelect();
    }

    // :: Owl Carousel
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-slides');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['Prev', 'Next'],
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        $('.testimonials-slider').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });

        $('.medilife-gallery-area').owlCarousel({
            items: 4,
            margin: 0,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 }
            }
        });
    }

    // :: Magnific Popup
    if ($.fn.magnificPopup) {
        $('.gallery-img').magnificPopup({ type: 'image' });
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    // :: Match Height
    if ($.fn.matchHeight) {
        $('.equalize').matchHeight({ byRow: true, property: 'height' });
    }

    // :: CounterUp
    if ($.fn.counterUp) {
        $('.counter').counterUp({ delay: 10, time: 2000 });
    }

    // :: ScrollUp
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: Prevent # anchor default behavior
    $("a[href='#']").on('click', function (e) {
        e.preventDefault();
    });

    // :: WOW.js
    if ($window.width() > 767) {
        new WOW().init();
    }

})(jQuery);
