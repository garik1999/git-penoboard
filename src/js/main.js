$(document).ready(function() {
  $('#select_l').niceSelect();
  // document.get("body").requestFullscreen()
  // document.documentElement(document).requestFullScreen();

  let image = document.getElementsByClassName('js-scene');
  new simpleParallax(image, {
    scale: 1.3,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  $('.slider').slick({
    nextArrow: false,
    prevArrow: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 350,
    autoplay: false,
    autoplaySpeed: 3000,
  });

  particlesJS("background", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff",
        opacity: 0,
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 20,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          size_min: 0.1,
          sync: true
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "repulse"
        },
        onclick: {
          enable: false,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: .5,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        },
      },
    },
    retina_detect: false,
  });

  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })

  let flag = true
  $(window).scroll(function(){
    if ( $(this).scrollTop() > $('.section-data').offset().top - 300 && flag ) {
      $('.counting').each(function() {
        let $this = $(this),
            countTo = $this.attr('data-count');
        $({ countNum: $this.text()}).animate({
          countNum: countTo
        },{
          duration: 1500,
          easing:'linear',
          step: function() {
            $this.text(Math.floor(this.countNum).toLocaleString('ru'));
          },
          complete: function() {
            $this.text(this.countNum.toLocaleString('ru'));
            //alert('finished');
          }
        });
      });
      flag = false;
    }
  });

  $(window).scroll(function (e) {
    let target = e.currentTarget,
        $self = $(target),
        scrollTop = window.pageYOffset || target.scrollTop,
        lastScrollTop = $self.data("lastScrollTop") || 0;

    if (scrollTop > lastScrollTop) {
        $('header').addClass('min');
    } else {
        $('header').removeClass('min');
    }
    $self.data("lastScrollTop", scrollTop);
  });

  let flag_window = false;
  $('.handler').on('click', function () {
    if(flag_window) {
      // $('.sub').slideUp(300);
      $(this).next().slideToggle(300);
    }
  });
  let windowSize = 0;
  function checkWidth() {
    windowSize = $(window).width();
    if(windowSize < 1024) {
      flag_window = true;
    } else {
      flag_window = false;
    }
  }

  $(window).on('load resize', function () {
    checkWidth();
    if(flag_window) {
      $('.sub').slideUp(0);
    } else {
      $('.sub').slideDown(0);
    }
  });

  $('.js-log').on('click', function () {
    $('#login_modal').fadeIn();
    $('body').css({'overflow': 'hidden'})
  });
  $('.js-reg').on('click', function () {
    $('#registration_modal').fadeIn();
    $('body').css({'overflow': 'hidden'});
  });

  $('.modal__close, .overlay').on('click', function () {
    $(this).parents('.modal').fadeOut();
    $('body').removeAttr('style');
  });

  $('#open_menu').on('click', function () {
    $('.mob-menu').addClass('open');
    $('header .overlay').addClass('open');
    $('body').css({'overflow': 'hidden'});
  });

  $('.js-overlay, #close_menu').on('click', function () {
    $('.mob-menu').removeClass('open');
    $('header .overlay').removeClass('open');
    $('body').removeAttr('style');
  });
});
