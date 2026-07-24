(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}	
	
		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}	
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Slider Layout JS */
	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
		slidesPerView : 1,
		speed: 1000,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.hero-pagination',
			clickable: true,
		},
	});

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 3,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
				width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '50%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
				});
		});		
	}
	
	if ($('.text-anime-style-2').length) {				
		let	 staggerAmount 		= 0.03,
			 translateXValue	= 20,
			 delayValue 		= 0.1,
			 easeType 			= "power2.out",
			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}
	
	if ($('.text-anime-style-3').length) {		
		let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		
		 animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element,	start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});		
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Our Services Active Start */
	if ($('.our-services').length) {
		var element = $('.our-services');            
		var items = element.find('.service-item');
		if (items.length) {
			items.on({
				mouseenter: function() {
					if($(this).hasClass('active')) return;

					items.removeClass('active');
					$(this).addClass('active');

				},
				mouseleave: function() {
					//stuff to do on mouse leave
				}
			});
		}                 
	}
	/* Our Services Active End */
	
	/* Dynamic Free Consultation Modal Insertion & Handling */
	var modalHTML = `
	<div id="consultModal" class="consult-modal-overlay">
		<div class="consult-modal-container">
			<button id="consultModalClose" class="consult-modal-close">&times;</button>
			<div id="consultModalFormView">
				<div class="consult-modal-header">
					<h3>Book a Free Consultation</h3>
					<p>Register to receive honest guidance and start your study abroad journey.</p>
				</div>
				<form id="consultForm" novalidate>
					<div class="consult-form-group">
						<label for="consultName">Full Name*</label>
						<input type="text" id="consultName" name="name" class="consult-form-control" placeholder="Enter your full name" required>
						<div class="consult-error-msg" id="consultNameError">Please enter your name.</div>
					</div>
					<div class="consult-form-group">
						<label for="consultEmail">Email Address*</label>
						<input type="email" id="consultEmail" name="email" class="consult-form-control" placeholder="Enter your email address" required>
						<div class="consult-error-msg" id="consultEmailError">Please enter a valid email address.</div>
					</div>
					<div class="consult-form-group">
						<label for="consultPhone">Mobile Number*</label>
						<div class="consult-phone-row">
							<select id="consultDialCode" name="dial_code" class="consult-form-control consult-dial-code">
								<option value="+91" selected>IN +91</option>
								<option value="+1">CA +1</option>
								<option value="+44">GB +44</option>
								<option value="+1">US +1</option>
								<option value="+61">AU +61</option>
							</select>
							<input type="tel" id="consultPhone" name="phone" class="consult-form-control" placeholder="Enter mobile number" required>
						</div>
						<div class="consult-error-msg" id="consultPhoneError">Please enter a valid mobile number.</div>
					</div>
					<div class="consult-form-group">
						<label for="consultDestination">Your preferred study destination*</label>
						<select id="consultDestination" name="destination" class="consult-form-control" required>
							<option value="" disabled selected>Select study destination</option>
							<option value="Canada">Canada</option>
							<option value="UK">UK</option>
						</select>
						<div class="consult-error-msg" id="consultDestinationError">Please select a destination.</div>
					</div>
					<div class="consult-form-group">
						<label for="consultStudyLevel">Preferred study level*</label>
						<select id="consultStudyLevel" name="study_level" class="consult-form-control" required>
							<option value="" disabled selected>Select study level</option>
							<option value="UG">UG (Undergraduate)</option>
							<option value="PG">PG (Postgraduate)</option>
						</select>
						<div class="consult-error-msg" id="consultStudyLevelError">Please select a study level.</div>
					</div>
					<div class="consult-form-group">
						<label for="consultStartDate">When would you like to start studying?*</label>
						<select id="consultStartDate" name="start_date" class="consult-form-control" required>
							<option value="" disabled selected>Select start date</option>
							<option value="Immediate">Immediate</option>
							<option value="One month">One month</option>
							<option value="3 months">3 months</option>
							<option value="6 months">6 months</option>
						</select>
						<div class="consult-error-msg" id="consultStartDateError">Please select a start date.</div>
					</div>
					
					<div class="consult-checkbox-group">
						<input type="checkbox" id="consultAgreeTerms" name="agree_terms" required>
						<label for="consultAgreeTerms" class="consult-checkbox-label">
							I agree to CANSYZ <a href="terms.html" target="_blank">Terms</a> and <a href="privacy.html" target="_blank">privacy policy</a>.*
						</label>
					</div>
					<div class="consult-error-msg" id="consultAgreeError" style="margin-top: -8px; margin-bottom: 12px;">You must agree to the terms and privacy policy.</div>

					<div class="consult-checkbox-group">
						<input type="checkbox" id="consultAllowContact" name="allow_contact" checked>
						<label for="consultAllowContact" class="consult-checkbox-label">
							Please contact me by phone, email or SMS to assist with my enquiry
						</label>
					</div>
					<div class="consult-checkbox-group">
						<input type="checkbox" id="consultSubscribeNews" name="subscribe_news">
						<label for="consultSubscribeNews" class="consult-checkbox-label">
							I would like to receive updates and offers from CANSYZ
						</label>
					</div>

					<button type="submit" class="consult-btn-submit">Avail FREE Counselling</button>
				</form>
			</div>
			<div id="consultModalSuccessView" class="consult-success-view">
				<div class="consult-success-icon">
					<i class="fa-solid fa-check"></i>
				</div>
				<h3>Request Submitted!</h3>
				<p>Thank you for booking a free consultation. Our expert advisors will reach out to you shortly to map your study abroad journey.</p>
				<button id="consultSuccessOkBtn" class="consult-btn-ok">OK</button>
			</div>
		</div>
	</div>
	`;

	$('body').append(modalHTML);

	var $modal = $('#consultModal');
	var $form = $('#consultForm');
	var $formView = $('#consultModalFormView');
	var $successView = $('#consultModalSuccessView');

	function openConsultationModal() {
		$formView.show();
		$successView.hide();
		$form[0].reset();
		$('.consult-form-control').removeClass('is-invalid');
		$('.consult-error-msg').hide();
		$modal.addClass('active');
		$('body').css('overflow', 'hidden');
	}

	function closeConsultationModal() {
		$modal.removeClass('active');
		$('body').css('overflow', '');
	}

	// Click to open modal
	$(document).on('click', 'a, button', function(e) {
		var text = $(this).text().trim().toLowerCase();
		var href = $(this).attr('href');
		
		var isConsultationBtn = false;
		if (text.indexOf('free consultation') !== -1) {
			isConsultationBtn = true;
		} else if (text.indexOf('free counselling') !== -1) {
			isConsultationBtn = true;
		} else if (text.indexOf('book your free consultant') !== -1) {
			isConsultationBtn = true;
		} else if (href && (href.indexOf('book-consultation') !== -1 || href.indexOf('services.html') !== -1 && text.indexOf('consultation') !== -1)) {
			isConsultationBtn = true;
		}

		if (isConsultationBtn) {
			e.preventDefault();
			openConsultationModal();
		}
	});

	// Close buttons
	$('#consultModalClose, #consultSuccessOkBtn').on('click', function(e) {
		e.preventDefault();
		closeConsultationModal();
	});

	// Close on click outside modal container
	$modal.on('click', function(e) {
		if ($(e.target).is($modal)) {
			closeConsultationModal();
		}
	});

	// Show popup on first load of the session (2 seconds delay for premium experience)
	if (!sessionStorage.getItem('consultPopupShown')) {
		setTimeout(function() {
			openConsultationModal();
			sessionStorage.setItem('consultPopupShown', 'true');
		}, 2000);
	}

	// Form validation and submit
	$form.on('submit', function(e) {
		e.preventDefault();
		var isValid = true;

		// Validate Name
		var name = $('#consultName').val().trim();
		if (name === '') {
			$('#consultName').addClass('is-invalid');
			$('#consultNameError').show();
			isValid = false;
		} else {
			$('#consultName').removeClass('is-invalid');
			$('#consultNameError').hide();
		}

		// Validate Email
		var email = $('#consultEmail').val().trim();
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email === '' || !emailRegex.test(email)) {
			$('#consultEmail').addClass('is-invalid');
			$('#consultEmailError').show();
			isValid = false;
		} else {
			$('#consultEmail').removeClass('is-invalid');
			$('#consultEmailError').hide();
		}

		// Validate Phone
		var phone = $('#consultPhone').val().trim();
		if (phone === '' || phone.replace(/\D/g, '').length < 7) {
			$('#consultPhone').addClass('is-invalid');
			$('#consultPhoneError').show();
			isValid = false;
		} else {
			$('#consultPhone').removeClass('is-invalid');
			$('#consultPhoneError').hide();
		}

		// Validate Destination
		var dest = $('#consultDestination').val();
		if (!dest) {
			$('#consultDestination').addClass('is-invalid');
			$('#consultDestinationError').show();
			isValid = false;
		} else {
			$('#consultDestination').removeClass('is-invalid');
			$('#consultDestinationError').hide();
		}

		// Validate Study Level
		var level = $('#consultStudyLevel').val();
		if (!level) {
			$('#consultStudyLevel').addClass('is-invalid');
			$('#consultStudyLevelError').show();
			isValid = false;
		} else {
			$('#consultStudyLevel').removeClass('is-invalid');
			$('#consultStudyLevelError').hide();
		}

		// Validate Start Date
		var startDate = $('#consultStartDate').val();
		if (!startDate) {
			$('#consultStartDate').addClass('is-invalid');
			$('#consultStartDateError').show();
			isValid = false;
		} else {
			$('#consultStartDate').removeClass('is-invalid');
			$('#consultStartDateError').hide();
		}

		// Validate Agree Terms Checkbox
		var agree = $('#consultAgreeTerms').is(':checked');
		if (!agree) {
			$('#consultAgreeError').show();
			isValid = false;
		} else {
			$('#consultAgreeError').hide();
		}

		if (isValid) {
			$formView.fadeOut(200, function() {
				$successView.fadeIn(200);
			});
		}
	});

	// Dynamic validation feedback on input change
	$('.consult-form-control').on('input change', function() {
		if ($(this).val()) {
			$(this).removeClass('is-invalid');
			$(this).parent().siblings('.consult-error-msg').hide();
			$(this).siblings('.consult-error-msg').hide();
		}
	});
	$('#consultAgreeTerms').on('change', function() {
		if ($(this).is(':checked')) {
			$('#consultAgreeError').hide();
		}
	});

	/* Floating Action Buttons (Scroll to Top & WhatsApp) */
	var floatingButtonsHTML = `
	<div class="floating-actions-container">
		<a href="https://wa.me/917448865000" target="_blank" class="float-btn float-btn-whatsapp" title="Chat on WhatsApp">
			<img src="images/WhatsApp_icon.png" alt="WhatsApp">
		</a>
		<button id="scrollTopBtn" class="float-btn float-btn-scroll-top" title="Scroll to Top">
			<i class="fa-solid fa-chevron-up"></i>
		</button>
	</div>
	`;
	$('body').append(floatingButtonsHTML);

	var $scrollTopBtn = $('#scrollTopBtn');

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 300) {
			$scrollTopBtn.addClass('show');
		} else {
			$scrollTopBtn.removeClass('show');
		}
	});

	$scrollTopBtn.on('click', function(e) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

})(jQuery);