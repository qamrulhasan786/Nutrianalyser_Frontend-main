function featuredmenus()
		{
		
			/*  testimonial one function by = owl.carousel.js */
			jQuery('.featured-menus').owlCarousel({
				loop:false,
				margin:30,
				nav:true,
				autoplaySpeed: 3000,
				navSpeed: 3000,
				paginationSpeed: 3000,
				slideSpeed: 3000,
				smartSpeed: 3000,
				autoplay: false,
				dots: false,
				navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
				responsive:{
					0:{
						items:1
					},
					576:{
						items:1
					},	
					767:{
						items:1
					},			
					991:{
						items:2
					},
					1200:{
						items:2
					},
					1600:{
						items:3
					}
				}
			})
		}
		
		jQuery(window).on('load',function(){
			setTimeout(function(){
				featuredmenus();
			}, 1000); 
		});