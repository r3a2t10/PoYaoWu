// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });


    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

        // Count items for each filter
        function updateFilterCounts() {
            var $container = $('.portfolio_container');
            
            $('.portfolio_filter a').each(function () {
                var filterValue = $(this).attr('data-filter');

                // count items
                var count;
                if (filterValue === '*') {
                    count = $container.find('.portfolio_item').length;
                } else {
                    count = $container.find(filterValue).length;
                }

                // update text: keep original text + number
                var baseText = $(this).data("base-text");
                if (!baseText) {
                    baseText = $(this).text();         // store original
                    $(this).data("base-text", baseText);
                }
                $(this).text(baseText + " | " + count);
            });
        }

        // Call on load
        updateFilterCounts();
    });

        // 讓所有 img-responsive 變成點擊可放大
    $('.modal-content').magnificPopup({
        delegate: 'img.img-responsive', // 只抓你的單頁這些圖
        type: 'image',
        gallery: {
            enabled: true  // 可以左右切換下一張/上一張
        },
        callbacks: {
            elementParse: function(item) {
                // 使用圖片自身的 src 當放大圖
                item.src = item.el.attr('src');
            }
        }
    });

    // ② 禁止圖片右鍵（只限這個頁面的內容區）
    $('.modal-content').on('contextmenu', 'img', function (e) {
        e.preventDefault();
        return false;
    });

    // ③ 禁止拖曳圖片（避免拖到桌面）
    $('.modal-content').on('dragstart', 'img', function (e) {
        e.preventDefault();
    });
    
    // Contact Form 	

    // validate contact form
    /*$(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });*/
});