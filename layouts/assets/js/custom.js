/* What we do slider */
      var swiper = new Swiper(".hero-section .mySwiper", {
        spaceBetween: 0,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
      });

/*sticky header*/
      window.onload = function() {
        $('.header-part').addClass("header-bar show");
        if ($(document).scrollTop() > 50) {
          $('.header-part').removeClass("header-bar");
        }
      }

    $(window).scroll(function() {
       if ($(this).scrollTop() > 50){  
          $('.header-part').removeClass("header-bar");
          $('.sticky-header').removeClass("open");
      }
      else{
          $('.header-part').addClass("open");
      }
  });

/*header class add*/
    if( $(window).width() >= 768 ) {
      if ($('.studio-map-stick').length>0){
        function sticky_relocate() {
          var window_top = $(window).scrollTop();
          var footer_top = $("#workout-details .ride-lift").offset().top + 160;
          var div_top = $('.studio-map-stick').offset().top - 50;
          var div_height = $(".studio-map-stick").height();
          
          if (window_top + div_height > footer_top)
              $('.main-navigation').removeClass('stick');    
          else if (window_top > div_top) {
              $('.main-navigation').addClass('stick');
          } else {
              $('.main-navigation').removeClass('stick');
          }
      };

      $(function () {
        $(window).scroll(sticky_relocate);
        sticky_relocate();
    });
      
    };
  }
