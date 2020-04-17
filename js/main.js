function successSend() {
    $('.step-item_3').hide();
    $('.step-item_2').show();
    $('.form-success').addClass('show');
    setTimeout(function () {
        $('form').trigger("reset");
        $('input').removeClass('valid');
    }, 3000);
}

function closePop() {
    $('.pop-background').removeClass('active');
    $('body').removeClass('pop-visible');
    $('.step-item_3').hide();
    $('.step-item_2').show();
    $('.form-success').removeClass('show');
}

function showPop(pop) {
    $(pop).addClass('active');
    $('body').addClass('pop-visible');
}

var imNotARobot = function () {
    $('.error-capcha').removeClass('active');
};

jQuery(document).ready(function () {

    //-------------------------Age inc/dec
    $('#year').on('keydown keyup', function (e) {
        var input = $(this);
        if (e.key.length == 1 && e.key.match(/[^0-9'".]/)) {
            return false;
        };
        if (input.val() > 100) {
            input.val(100);
        }
    });
    $('#year').on('change', function (e) {
        var input = $(this);
        if (input.val().length == 0) {
            input.val(1);
        }
    });
    $('.input-number__inc').click(function () {
        var current = $('#year').val();
        if (current < 100) {
            current++;
        }
        $('#year').val(current);
    });
    $('.input-number__dec').click(function () {
        var current = $('#year').val();
        if (current > 1) {
            current--;
        }
        $('#year').val(current);
    });

    //-------------------------Nice Select
    $('select').niceSelect();


    //-------------------------Print Text
    if ($('#print').length > 0) {
        var typed = new Typed('#print', {
            strings: ["a Friend?", "a Boyfriend?", "a Girlfriend?", "your Mother?", "your Father?"],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
        });
    }


    //-------------------------Parallax
    if ($('#receiving').length > 0) {
        if ($(window).width() > 1000) {
            var scene = document.getElementById('receiving');
            var parallaxInstance = new Parallax(scene);
        }
    }

    //-------------------------FAQ
    $('.faq__question').click(function () {
        if ($(this).parent().hasClass('active')) {
            $('.faq__item').removeClass('active');
            $('.faq__answer').slideUp(200);
        } else {
            $('.faq__item').removeClass('active');
            $('.faq__answer').slideUp(200);
            $(this).parent().addClass('active');
            $(this).next().slideDown(200);
        }
    });
    $('.faq__item:first-child .faq__question').trigger('click');


    //-------------------------Mobile menu
    $('.icon-menu').click(function () {
        $('.navigation').toggleClass('active');
    });


    //-------------------------Pop-up
    $('.close, .button_close').click(function (e) {
        e.preventDefault();
        closePop();
    });
    $(document).click(function (event) {
        if ($(event.target).closest(".pop-scroll, .js-pop").length) return;
        closePop();
        event.stopPropagation();
    });
    $('body').on('click', '.js-pop', function (e) {
        e.preventDefault();
        var formInfo = 'Recipient’s Name: ' + $('input[name="recipientName"]').val() + '; Age: ' + $('input[name="recipientYear"]').val() + '; Occassion: ' + $('select[name="recipientOccassion"] option:selected').val() + '; ';
        $('.i-form').val(formInfo);
        var pop = '.pop-order';
        var form = $("#form-step-1");
        if (form.valid()) {
            showPop(pop);
			//ga('send', 'event', 'NCahootsStart', 'Click', {'hitCallback': function() {console.log('Sent!!');},'hitCallbackFail' : function () {console.log("Unable to send Google Analytics data");}});
        }
    });


    //-------------------------Validator
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "Value must not equal arg.");

    $.validator.addMethod("minlenghtphone", function (value, element, arg) {
        return value.replace(/\D+/g, '').length > arg;
    }, "Enter your full phone number");

    $('[name="tel"]').inputmask("(999) 999-9999");

    $("#form-step-1").validate({
        rules: {
            recipientName: {
                required: true,
            }
        }
    });

    $("#order-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                minlenghtphone: 9,
            },
            zip: {
                required: true,
                number: true,
                minlength: 5
            },
            address1: {
                required: true,
            },
            address2: {
                //required: true,
            },
            city: {
                required: true,
            },
        },
        submitHandler: function (form) {
            /*
            var response = grecaptcha.getResponse();
            if (response.length == 0) {
                $('.error-capcha').addClass('active');
            } else {
            */
            $.post("send/send.php", $("#order-form").serialize(), function () {});
            $('.error-capcha').removeClass('active');
            //grecaptcha.reset();
            successSend();
            /*
            }
            */

            return false;
        }
    });


    //-------------------------Benefit height
    function adaptiveHeightBenefits() {
        for (var i = 1; i < 4; i++) {
            var h1 = $('.benefit_1-' + i).outerHeight();
            var h2 = $('.benefit_2-' + i).outerHeight();
            if (h1 > h2) {
                var h = h1;
            } else {
                var h = h2;
            }
            $('.c-number-item-' + i + ', .benefit_1-' + i + ', .benefit_2-' + i).css({
                'minHeight': h
            });
        }
    }
    adaptiveHeightBenefits();
    $(window).resize(function () {
        adaptiveHeightBenefits();
    });



    //-------------------------Lazy load img
    $('.lazy').Lazy({
        bind: "event",
        delay: 0,
        visibleOnly: false,
        effect: "fadeIn",
        effectTime: 100,
        threshold: 0,
        onFinishedAll: function () {
            //alert('OK');
        }
    });


    //-------------------------AOS animation
    /*AOS.init({
        easing: 'ease',
        duration: 1000,
        disable: 'phone',
        once: true,
    });*/


    //-------------------------Step

    $('.js-next').click(function (e) {
        e.preventDefault();
        $('.step-item_2').hide();
        $('.step-item_3').show();
    });
    $('.prev-step').click(function (e) {
        e.preventDefault();
        $('.step-item_3').hide();
        $('.step-item_2').show();
    });


});









//-----------
