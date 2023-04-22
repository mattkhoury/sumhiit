/* What we do slider */
      var swiper = new Swiper(".hero .mySwiper", {
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
        $('.header').addClass("header-bar show");
        if ($(document).scrollTop() > 50) {
          $('.header').removeClass("header-bar");
        }
      }

    $(window).scroll(function() {
       if ($(this).scrollTop() > 50){  
          $('.header').removeClass("header-bar");
          $('.sticky-header').removeClass("open");
      }
      else{
          $('.header').addClass("open");
      }
  });

/*header class add*/
    if( $(window).width() >= 768 ) {
      if ($('.studio-map-stick').length>0){
        function sticky_relocate() {
          var window_top = $(window).scrollTop();
          var footer_top = $(".workout-details .ride-lift").offset().top + 160;
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
      
    

  /* form box slider */
  const buttons = document.querySelectorAll('.btn')
  const formPages = document.querySelectorAll('.form-page')
  const bars = document.querySelectorAll('.bar-circle')   

  let pageStates = {
      oldPageNum: null,
      currentPage: null,
  }

  const pageTransform = () => {
      formPages.forEach(page => {        
          page.style.transform = `translateX(-${(pageStates.currentPage) * 100}%)`
      })
  }

  const handleClasses = () => {     

      bars.forEach(bar => {
          bar.classList.remove('active')
      })

      if(bars[pageStates.currentPage]) {
          for(let i = 0; i < pageStates.currentPage + 1; i++) {
              bars[i].classList.add('active')
          }
      } else {
          bars.forEach(bar => {
              bar.classList.add('active')
              bar.classList.add('done')
          })
      }
  }

  const indexFinder = (el) => {    
      let i = 0;
      for(; el = el.previousElementSibling; i++);
      return i;
  }

  const pageHandler = (e) => {
      e.preventDefault()

      const navData = e.currentTarget.getAttribute('data-nav')
      pageStates.oldPageNum = indexFinder(e.currentTarget.parentElement)
      
      if(navData == "prev") {
          pageStates.currentPage = pageStates.oldPageNum - 1
      } else {
          pageStates.currentPage = pageStates.oldPageNum + 1
      }    

      pageTransform()
      handleClasses()
  }


  const barHandler = (e) => {
      e.preventDefault()
      pageStates.currentPage = indexFinder(e.currentTarget)

      pageTransform()
      handleClasses()
  }

  buttons.forEach(button => {
      button.addEventListener('click', pageHandler)
  })

  bars.forEach(bar => {
      bar.addEventListener('click', barHandler)
  })


