$(function(){
'use strict';

$.fn.social = function() {
  $('.social-trigger').click(function() {
    $('.social-links').addClass("social-active");
      setTimeout(function () {
        $('.social-links').removeClass('social-active');
      }, 1500);
  });
}

$.fn.menu = function () {
  $('.menu-trigger').click(function() {
    $(this).toggleClass('icon-rotate');
    $('.mobile-menu-overlay').toggleClass('overlay-open');
    $('.mobile-menu-wrapper').fadeToggle();
    $('body').toggleClass('stop-scroll');
  });
}


$.fn.forms = function() {

var $contactForm = $('#contact-form');

 $contactForm.submit(function(e) {
 	e.preventDefault();
 	var $submit = $('input:submit', $contactForm);
 	var defaultSubmitText = $submit.val();

 	$.ajax({
 		url: '//formspree.io/contact@isaacmartin.co',
 		method: 'POST',
 		data: $(this).serialize(),
 		dataType: 'json',
 		beforeSend: function() {
 			//$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
 			$submit.attr('disabled', true).val('Sending message…');
 		},
 		success: function(data) {
 			//$contactForm.append('<div class="alert alert--success">Message sent!</div>');
 			$submit.val('Message sent!');
 			setTimeout(function() {
 				//$('.alert--success').remove();
 				$submit.attr('disabled', false).val(defaultSubmitText);
 			}, 5000);
 		},
 		error: function(err) {
 			//$contactForm.find('.alert--loading').hide();
 			//$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
 			$submit.val('Ops, there was an error.');
 			setTimeout(function() {
 				//$('.alert--error').remove();
 				$submit.attr('disabled', false).val(defaultSubmitText);
 			}, 5000);
 		}
 	});
 });

}


  $( document ).ready(function() {
      $().forms();
      $().social();
      $().menu();

  });

  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        debug: true,
        cacheLength: 2,
        onStart: {
          duration: 1000, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        },
        onAfter: function( $container ) {
            $().forms();
            $().social();
            $().menu();
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});
