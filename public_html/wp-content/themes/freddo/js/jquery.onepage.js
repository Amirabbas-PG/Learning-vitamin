(function($) {
	'use strict';
	$( window ).scroll(function () {
		if( $( 'ul.freddo_sectionmap' ).length ) {
			var currentNode = null;
			$('.freddo_onepage_section').each(function () {
				var s = $(this);
				var currentId = s.attr('id') || '';
				if ( $( window ).scrollTop() >= s.offset().top - 1) {
					currentNode = currentId;
				}

			});
			$('ul.freddo_sectionmap li').removeClass('current-section');
			if ( currentNode ) {
				$('ul.freddo_sectionmap li').find('a[href$="#' + currentNode + '"]').parent().addClass('current-section');
			}
		}
	});
	$(window).on('load', function() {
		if ( $( '.flexslider' ).length ) {
		  $('.flexslider').flexslider({
			animation: 'fade',
			controlNav: true,
			directionNav: false, 
			slideshowSpeed: $('.freddo_onepage_section.freddo_slider').attr('data-speed'),
			animationSpeed: 1000,
			pauseOnHover: $('.freddo_onepage_section.freddo_slider').attr('data-hover')
		  });
		}
	});
	$(document).ready(function() {
		/*-----------------------------------------------------------------------------------*/
		/*  Detect Mobile Browser
		/*-----------------------------------------------------------------------------------*/
			var mobileDetect = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		/*-----------------------------------------------------------------------------------*/
		/*  Waypoints general script
		/*-----------------------------------------------------------------------------------*/ 
		if($('body').hasClass('page-template-template-onepage')) {
			if ( $.isFunction($.fn.waypoint) ) {
				/*-----------------------------------------------------------------------------------*/
				/*  Waypoints for skills
				/*-----------------------------------------------------------------------------------*/ 
				$('section.freddo_skills').waypoint(function() {
					$('.skillBottom .skillRealBar').each( function() {
					var $this = $(this);
						setTimeout(function() {
							$this.css('width',$this.data('number'));
						}, $this.data('delay'));
					});
					$('.skillTop .skillValue').each( function() {
					var $this = $(this);
						setTimeout(function() {
							$this.css({'opacity':'1', 'bottom': '-5px'});
						}, 1000 + $this.data('delay'));
					});
				},{
					triggerOnce: true,
					offset: '60%'
				});
				/*-----------------------------------------------------------------------------------*/
				/*  Waypoints for contact icon
				/*-----------------------------------------------------------------------------------*/ 
				$('section.freddo_contact').waypoint(function() {
					$('.contact_columns .freddoContactIcon').css({'opacity':'0.1', 'right': '25px'});
				},{
					triggerOnce: true,
					offset: '20%'
				});
			}
		}
		/*-----------------------------------------------------------------------------------*/
		/*  Detect Mobile Browser
		/*-----------------------------------------------------------------------------------*/ 
			if ( !mobileDetect ) {
				/*-----------------------------------------------------------------------------------*/
				/*  Slider Parallax
				/*-----------------------------------------------------------------------------------*/ 
					if($('.freddo_slider').hasClass('withZoom')) {
						$( '.flexslider .slides > li .flexImage' ).data( 'height', $( '.flexslider .slides > li .flexImage' ).outerHeight() );
						$( window ).scroll( function() {
							var position = window.scrollY,
								bottom   = window.innerHeight - document.getElementById( 'colophon' ).offsetHeight,
								height   = $( '.flexslider .slides > li .flexImage' ).data( 'height' ),
								content  = $( 'section.freddo_slider' ).offset().top + $( 'section.freddo_slider' ).outerHeight() ,
								footer   = $( '#colophon' ).offset().top - position;

							if ( position > 0 && content > position && footer > bottom ) {
								if ( position < height ) {
									$('.flexslider .slides > li .flexImage').css({
										'transform' : 'scale('+( 1 + position / height * 0.3 )+','+( 1 + position / height * 0.3 )+')'
									});
								}
							} else if ( position <= 0 ) {
								$('.flexslider .slides > li .flexImage').css({
									'transform' : 'scale('+1+','+1+')'
								});
							}
						});
					}
			}
	});
})(jQuery);