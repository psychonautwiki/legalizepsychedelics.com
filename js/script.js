const $ = jQuery = require('./jquery');

jQuery(document).on('ready', function() {

	var $window = jQuery(window),
		$body = jQuery('body'),
		$document = jQuery(document),
		drew = {
			headerFloatingHeight: 60,
		};

	/**
	 * =======================================
	 * Function: Detect Mobile Device
	 * =======================================
	 */
	// source: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		},
	};

	/**
	 * =======================================
	 * Function: Resize Background
	 * =======================================
	 */
	// var resizeBackground = function() {

	// 	jQuery( '.section-background-video > video, .section-background-image > img, .two-cols-description-image > img' ).each(function( i, el ) {

	// 		var $el       = jQuery( el ),
	// 			$section  = $el.parent(),
	// 			min_w     = 300,
	// 			el_w      = el.tagName == 'VIDEO' ? el.videoWidth : el.naturalWidth,
	// 			el_h      = el.tagName == 'VIDEO' ? el.videoHeight : el.naturalHeight,
	// 			section_w = $section.outerWidth(),
	// 			section_h = $section.outerHeight(),
	// 			scale_w   = section_w / el_w,
	// 			scale_h   = section_h / el_h,
	// 			scale     = scale_w > scale_h ? scale_w : scale_h,
	// 			new_el_w, new_el_h, offet_top, offet_left;

	// 		if ( scale * el_w < min_w ) {
	// 			scale = min_w / el_w;
	// 		};

	// 		new_el_w = scale * el_w;
	// 		new_el_h = scale * el_h;
	// 		offet_left = ( new_el_w - section_w ) / 2 * -1;
	// 		offet_top  = ( new_el_h - section_h ) / 2 * -1;

	// 		$el.css( 'width', new_el_w );
	// 		$el.css( 'height', new_el_h );
	// 		$el.css( 'marginTop', offet_top );
	// 		$el.css( 'marginLeft', offet_left );
	// 	});

	// };
	// $body.on( 'pageStart', function() {
	// 	resizeBackground();
	// });

	/**
	 * =======================================
	 * IE9 Placeholder
	 * =======================================
	 */
	jQuery('form').on('submit', function() {
		jQuery(this).find('[placeholder]').each(function() {
			var $input = jQuery(this);
			if ($input.val() == $input.attr('placeholder')) {
				$input.val('');
			};
		});
	});

	jQuery('[placeholder]').on('focus', function() {
		var $input = jQuery(this);
		if ($input.val() == $input.attr('placeholder')) {
			$input.val('');
			$input.removeClass('placeholder');
		};
	}).on('blur', function() {
		var $input = jQuery(this);
		if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
			$input.addClass('placeholder');
			$input.val($input.attr('placeholder'));
		};
	}).blur();

	/**
	 * =======================================
	 * Detect Mobile Device
	 * =======================================
	 */
	if (isMobile.any()) {
		// add identifier class to <body>
		$body.addClass('mobile-device');
		// remove all element with class "remove-on-mobile-device"
		jQuery('.remove-on-mobile-device').remove();
	};

	/* =======================================
		* Resize Video Background
		* =======================================
		*/
	$window.on('resize', function() {
		resizeBackground();
	});

	/* =======================================
		* Slideshow Background
		* =======================================
		*/
	if ($.fn.responsiveSlides) {
		$body.on('pageStart', function() {
			jQuery('.section-background-slideshow').responsiveSlides({
				speed: jQuery(this).data('speed') ? jQuery(this).data('speed') : 800,
				timeout: jQuery(this).data('timeout') ? jQuery(this).data('timeout') : 4000,
			});
		});
	};

	/* =======================================
		* Testimonial Slider
		* =======================================
		*/
	if ($.fn.responsiveSlides) {
		$body.on('pageStart', function() {
			jQuery('.testimonial-slider').responsiveSlides({
				speed: jQuery(this).data('speed') ? jQuery(this).data('speed') : 800,
				timeout: jQuery(this).data('timeout') ? jQuery(this).data('timeout') : 4000,
				auto: jQuery(this).data('auto') ? jQuery(this).data('auto') : false,
				pager: true,
			});
		});
	};

	/* =======================================
		* Hero Slider
		* =======================================
		*/
	if ($.fn.responsiveSlides) {
		$body.on('pageStart', function() {
			jQuery('.section-slider').responsiveSlides({
				speed: jQuery(this).data('speed') ? jQuery(this).data('speed') : 800,
				timeout: jQuery(this).data('timeout') ? jQuery(this).data('timeout') : 4000,
				auto: jQuery(this).data('auto') ? jQuery(this).data('auto') : false,
				nav: true,
			});
		});
	};

	/* =======================================
		* Video Embed Async Load
		* =======================================
		*/
	$body.on('pageStart', function() {
		jQuery('.video-async').each(function(i, el) {
			var $el = jQuery(el),
				source = $el.data('source'),
				video = $el.data('video'),
				color = $el.data('color');

			if (source == 'vimeo') {
				$el.attr('src', '//player.vimeo.com/video/' + video + (color ? '?color=' + color : ''));
			} else if (source == 'youtube') {
				$el.attr('src', '//www.youtube.com/embed/' + video + '?rel=0');
			}

		});
	});

	/**
	 * =======================================
	 * Initiate Stellar JS
	 * =======================================
	 */
	if ($.fn.stellar && !isMobile.any()) {
		$.stellar({
			responsive: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			verticalOffset: 0,
			horizontalOffset: 0,
		});
	};

	/**
	 * =======================================
	 * Numbers (Counter Up)
	 * =======================================
	 */
	if ($.fn.counterUp) {
		jQuery('.counter-up').counterUp({
			time: 1000,
		});
	};

	/**
	 * =======================================
	 * Scroll Spy
	 * =======================================
	 */
	var toggleHeaderFloating = function() {
		// Floating Header
		if ($window.scrollTop() > 80) {
			jQuery('.header-section').addClass('floating');
		} else {
			jQuery('.header-section').removeClass('floating');
		};
	};

	$window.on('scroll', toggleHeaderFloating);

	/**
	 * =======================================
	 * One Page Navigation
	 * =======================================
	 */
	if ($.fn.onePageNav) {
		// jQuery( '#header-nav' ).onePageNav({
		// 	scrollSpeed : 1000,
		// 	filter : ':not(.external)',
		// 	begin : function() {
		// 		jQuery( '#navigation' ).collapse( 'toggle' );
		// 	},
		// });
	};

	/**
	 * =======================================
	 * Anchor Link
	 * =======================================
	 */
	$body.on('click', 'a.anchor-link', function(e) {
		e.preventDefault();

		var $a = jQuery(this),
			$target = jQuery($a.attr('href'));

		if ($target.length < 1) return;

		jQuery('html, body').animate({
			scrollTop: Math.max(0, $target.offset().top - drew.headerFloatingHeight)
		}, 1000);
	});

	$window.trigger('resize');
	$window.trigger('scroll');
});