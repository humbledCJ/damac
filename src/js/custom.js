'use strict';

var controller = new ScrollMagic.Controller();

function sendData(el) {
  var name = $('#modal-name').val();
  var extraPhone = $("#modal-extra-phone").val();
  var phone = (extraPhone === '') ? '+' + $('#modal-phone').val() : '+' + $('#modal-phone').val() + ' доб.: ' + extraPhone;
  var email = $('#modal-email').val();

  console.table([name, extraPhone, phone, email]);

  if (!$(el).hasClass('disabled') && !$(el).hasClass('loading')) {
    $.ajax({
      url: 'send_mail.php',
      method: 'POST',
      data: {
        name: name,
        phone: phone,
        email: email,
      },
      beforeSend: function() {
        switchLoading(el, 1);
      },
      error: function(response) {
        switchLoading(el, 0);
        showResponseMessage(el, 'danger');
      },
      success: function(response) {
        switchLoading(el, 0);
        showResponseMessage(el, 'success');
        $('input').val('');
      }
    });
  }
}

function sendPhone(el) {
  var phone = '+' + $(el).closest("form").find(".bfh-phone").val();

  console.log(phone);

  if (!$(el).hasClass('disabled') && !$(el).hasClass('loading')) {
    $.ajax({
      url: 'send_mail.php',
      method: 'POST',
      data: {
        name: '',
        phone: phone,
        email: '',
      },
      beforeSend: function() {
        switchLoading(el, 1);
      },
      error: function(response) {
        switchLoading(el, 0);
        showResponseMessage(el, 'danger');
      },
      success: function(response) {
        switchLoading(el, 0);
        showResponseMessage(el, 'success');
        $('input').val('');
      }
    });
  }
}

function switchLoading(el, stage) {
	if (stage === 1) {
		$(el).addClass('loading');
	}
	else {
		$(el).removeClass('loading');
	}
}

function showResponseMessage(el, status) {
	if (status === 'success') {
    $(el).popover({
      html: true,
      content: '<span class="text-success"><i class="fa fa-check" aria-hidden="true"></i>&nbsp; Спасибо! Ваша заявка успешно отправлена.</span>',
      placement: 'bottom',
    });
    $(el).popover('show');
	}
	else {
    $(el).popover({
      html: true,
      content: '<span class="text-danger"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp; К сожалению, произошла ошибка. Попробуйте позже.</span>',
      placement: 'bottom',
    });
    $(el).popover('show');
	}
	setTimeout(function() { 
    $(el).popover('hide');
  }, 2000);
  setTimeout(function() { 
    $(el).popover('dispose');
  }, 2100);
}

function smoothScroll(id) {
  $('html, body').animate(
    {
      'scrollTop': $('#' + id).offset().top
    },
    500
  );
}

function animateIntroElements() {
  var headerBg = TweenMax.staggerFromTo('header .header-bg', 1, {scale: 1.2, ease: Expo.easeOut}, {scale: 1}, 0);
  var headerTextLeft = TweenMax.staggerFromTo('header .animation-text-left', 1, {x: 100, opacity: 0, ease: Expo.easeOut}, {x: 0, opacity: 1}, 0);
  var headerTextRight = TweenMax.staggerFromTo('header .animation-text-right', 1, {x: -100, opacity: 0, ease: Expo.easeOut}, {x: 0, opacity: 1}, 0);
  var headerOpacity = TweenMax.staggerFromTo('header .animation-opacity', 1, {opacity: 0, ease: Expo.easeOut}, {opacity: 1, delay: 0.5},  0);
  var headerBox = TweenMax.staggerFromTo('header .box', 1, {y: 100, ease: Expo.easeOut}, {y: 0},  0);
}

function hidePreloadScreen() {
  var doc = $(document);
  var navbarHeight = $('.navbar').height();
  var navbarPrimaryPath = $('.navbar-block-primary');
  var currentLogo = (doc.width > 1400) ? $('.logo-lg') : $('.logo-sm');
  var preloadScreenStepOne = TweenMax.staggerTo('.preload-screen', 1, {height: navbarHeight, ease: Expo.easeOut}, 0);
  var preloadScreenStepTwo = TweenMax.staggerTo('.preload-screen', 1, {width: navbarPrimaryPath.outerWidth(), x: navbarPrimaryPath.offset().left, ease: Expo.easeOut, delay: 1}, 0);

  setTimeout(function() { 
    $('.preload-screen').css({
      display: 'none'
    });
  }, 2000);

  setTimeout(function() { 
    $('body').css({
      'overflowY': 'scroll'
    });
  }, 1000);
}

function animateScrollElements() {
  AOS.init();
}


$(function () {

  // var headerRellax = new Rellax('.header-bg');
  // var featuresRellax = new Rellax('.features-bg');
  // var primarySectionBgRelax = new Rellax('.primary-bg-element');
  // var primarySectionBgRelax2 = new Rellax('.primary-bg-element-2');
  // var actionScrollBlock = new Rellax('.action-scroll-block');
  // var historyLogoBlock = new Rellax('.after-logo');

  if ($(window).width() <= 576) {
    $('#features').addClass('owl-carousel');
    $('#features').addClass('owl-theme');
    $('#features').owlCarousel({
      dots: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
    });
  }
});


$(window).on('load', function(){
  //hidePreloadScreen();
  //animateIntroElements();
  animateScrollElements();
});
