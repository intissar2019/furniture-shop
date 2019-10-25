function runFormValidation()
{
    var $form;
    var formValidator;

    $form = $('form:not([data-no-validation=true])');

    // Y a t'il un formulaire à valider sur la page actuelle ?
    if($form.length == 1)
    {
        // Oui, exécution de la validation de formulaire.
        formValidator = new FormValidator($form);
        formValidator.run();
    }
}

function runOrderForm()
{
    var orderForm;
    var orderStep;

    orderForm = new OrderForm();

    // A quelle étape de la commande sommes-nous ?
    orderStep = $('[data-order-step]').data('order-step');

    switch(orderStep)
    {
        case 'run':
        orderForm.run();        // Commande en cours
        break;

        case 'success':
        orderForm.success();    // Succès du paiement de la commande
        break;
    }
}



(function ($) {
  "use strict";
 // Effet spécial sur la boite de notifications (le flash bag).
    $('#notice').delay(3000).fadeOut('slow');


    // Exécution de la validation de formulaire si besoin.
 

    // Exécution de la gestion du processus de commande si besoin.
    if(typeof OrderForm != 'undefined')
    {
        runOrderForm();
    }
 



  var review = $('.textimonial_iner');
  if (review.length) {
    review.owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
      responsive: {
        0: {
          margin: 15,

        },
        600: {
          margin: 10,
        },
        1000: {
          margin: 10,
        }
      }
    });
  }
  var best_product_slider = $('.best_product_slider');
  if (best_product_slider.length) {
    best_product_slider.owlCarousel({
      items: 4,
      loop: true,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: true,
      navText: ["suivant", "précédent"],
      responsive: {
        0: {
          margin: 15,
          items: 1,
          nav: false
        },
        576: {
          margin: 15,
          items: 2,
          nav: false
        },
        768: {
          margin: 30,
          items: 3,
          nav: true
        },
        991: {
          margin: 30,
          items: 4,
          nav: true
        }
      }
    });
  }



  //single banner slider
   var banner_slider = $('.banner_slider');
   if (banner_slider.length) {
     banner_slider.owlCarousel({
       items: 1,
       loop: true,
       dots: false,
       autoplay: true,
       autoplayHoverPause: true,
       autoplayTimeout: 5000,
       nav: true,
       navText: ["suivant","précédent"],
      smartSpeed: 1000,
    });
   }

  if ($('.img-gal').length > 0) {
    $('.img-gal').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }


  //single banner slider
  $('.banner_slider').on('initialized.owl.carousel changed.owl.carousel', function (e) {
    function pad2(number) {
      return (number < 10 ? '0' : '') + number
    }
    var carousel = e.relatedTarget;
    $('.slider-counter').text(pad2(carousel.current()));

  }).owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    nav: true,
    navText: ["next", "previous"],
    smartSpeed: 1000,
    responsive: {
      0: {
        nav: false
      },
      600: {
        nav: false
      },
      768: {
        nav: true
      }
    }
  });



  // niceSelect js code
  $(document).ready(function () {
    $('select').niceSelect();
  });

  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
     } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });


 


 
  //------- makeTimer js --------//  
  function makeTimer() {

    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
    var endTime = new Date("27 Sep 2019 12:56:00 GMT+01:00");
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $("#days").html("<span>Days</span>" + days);
    $("#hours").html("<span>Hours</span>" + hours);
    $("#minutes").html("<span>Minutes</span>" + minutes);
    $("#seconds").html("<span>Seconds</span>" + seconds);

  }
// click counter js
(function() {
 
  window.inputNumber = function(el) {

    var min = el.attr('min') || false;
    var max = el.attr('max') || false;

    var els = {};

    els.dec = el.prev();
    els.inc = el.next();

    el.each(function() {
      init($(this));
    });

    function init(el) {

      els.dec.on('click', decrement);
      els.inc.on('click', increment);

      function decrement() {
        var value = el[0].value;
        value--;
        if(!min || value >= min) {
          el[0].value = value;
        }
      }

      function increment() {
        var value = el[0].value;
        value++;
        if(!max || value <= max) {
          el[0].value = value++;
        }
      }
    }
  }
})();

inputNumber($('.input-number'));



  setInterval(function () {
    makeTimer();
  }, 1000);

  // click counter js


  // var a = 0;
  // $('.increase').on('click', function(){
     
    

  //   console.log(  $(this).innerHTML='Product Count: '+ a++ );
  // });

 var product_overview = $('#vertical');
 if(product_overview.length){
  product_overview.lightSlider({
    gallery:true,
    item:1,
    vertical:true,
    verticalHeight:450,
    thumbItem:3,
    slideMargin:0,
    speed:600,
    autoplay: true,
    responsive : [
      {
          breakpoint:991,
          settings: {
              item:1,
              
            }
      },
      {
          breakpoint:576,
          settings: {
              item:1,
              slideMove:1,
              verticalHeight:350,
            }
      }
  ]
  });  
 }
    



}(jQuery));