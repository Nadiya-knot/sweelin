// Global 
var a = 'active';
var cardActive = 0;
var sugarActive = 0;
var sectionActive = 0;
var sweelinActive = 0;
var sweelinActiveStop = 0;
var back = 0;
var card = 0;
var load = 0;




// no skroll

var block = $('<div>').css({'height':'50px','width':'50px'}),
	indicator = $('<div>').css({'height':'200px'});

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();

var scrollbar = w1 - w2;

$(':root').css('--scroll', scrollbar + 'px');


// Ready

function knotLoad() {

	// Lax

	knotLax();



	// Vending

	vending('#vending');


	// Slider

	sliderStart();



	// Cursor position

	cursorHover('._btn');

	$(document).on('mousemove', function(e) {
	  $('#cursor').show();
	  var mouseX = e.pageX; // Координата X курсора
	  var mouseY = e.pageY; // Координата Y курсора
	  
	  cursorPosition(mouseX, mouseY);
	});

	$(document).on('scroll', function() {
	  $('#cursor').hide();
	});

	$(document).on('mouseenter mouseleave', 'a, ._btn, .nav_triger, .nav_triger li, .machine_active, input, #threeDModel, ._select, textarea, label', function(e) {
	  if (e.type === 'mouseenter') {
	    $('#cursor').addClass('hover');
	  } else {
	    $('#cursor').removeClass('hover');
	  }
	});

	$(document).on('mouseenter mouseleave', '.machine_cards .machine_card', function(e) {
	  if (e.type === 'mouseenter') {
	    $('#cursor').removeClass(a).find('span').text('swipe');
	  } else {
	    $('#cursor').addClass(a).find('span').text('scroll');
	  }
	});


	// Move element with cursor.

	moveElement($('#cursor-text'), $('.sweelin_watch'));



	// Animating numbers

	$('.how_li_text span').each(function () {
		animateNumber($(this));
	});


	// Input fixed palceholder

	$(document).on('blur', '._input input:not([type=checkbox], [type=radio], [type=submit]), ._input textarea', function () {
		input_fixed_placeholder($(this), $(this).siblings('.input_palceholder'));
	})

	$(document).on('focus', '._input input:not([type=checkbox], [type=radio], [type=submit]), ._input textarea', function () {
		$(this).siblings('.input_palceholder').addClass(a);
	})




	// Comment change

	$(document).on('change keyup input', '.form_input textarea', function() {
		textarea_height($(this));
	});

	$(document).on('focus', '.form_input textarea', function() {
		textarea_height($(this));
	});
    

    
  // Select

  if ($('._select select').length) {
      $('._select select').knotSelect();
  };


  $('#food-nav, #sugar-nav').hide();
}



// Scroll
var dir = 0;

$(window).scroll(function () {
	var windowHeight = $(this).height();
	var windowScrollTop = $(this).scrollTop();

	if (windowScrollTop < $('#card').offset().top && cardActive == 1) {
		$('#card').hide();
		$('#sugar-nav').addClass('inactive');
		$('#card-machine').show();
		$('#food-nav, #sugar-nav').hide();
		$('#threeDModel').removeClass(a);

		cardActive = 0;
		sugarActive = 0;

		threeD_close();
	}

	if (windowScrollTop < $('#food-end').offset().top - windowHeight && sweelinActive == 1) {
		$('#sweelin').hide();
		sweelinActive = 0;
	}

	if (windowScrollTop >= $('#card-start').offset().top + 100) {
		if (card == 0) {
			$('#card').addClass(a);
			$('#card_bg').css('background-color', 'var(--s2)');
			card++;
		}
	} else {
		$('#card').removeClass(a);
		$('#card_bg').css('background-color', 'var(--s1)');
		card = 0;
	}


	// Nav visibility

	if (windowScrollTop >= windowHeight + 100) {
		$('#nav').fadeIn();
	} else {
		// $('#nav').fadeOut();
	}



	if (windowScrollTop >= 0 && windowScrollTop <= $('#home-end').offset().top) {
		$('#home-nav').fadeOut();
	} else {
		$('#home-nav').fadeIn();
	}

	if (windowScrollTop >= $('#food').offset().top - windowHeight * 1.2 && windowScrollTop <= $('#food-end').offset().top - windowHeight / 2) {
		$('#food-nav').addClass(a);
	} else {
		$('#food-nav').removeClass(a);
	}



  var bottomOffset = 50; // Допустимый отступ от конца страницы

  if (windowScrollTop >= $(document).height() - windowHeight - bottomOffset) {
    $('#cursor').addClass(a);
  } else {
  	$('#cursor').removeClass(a)
  }
})




/*
*     ███████╗██╗░░░██╗███╗░░██╗░█████╗░░██████╗
*     ██╔════╝██║░░░██║████╗░██║██╔══██╗██╔════╝
*     █████╗░░██║░░░██║██╔██╗██║██║░░╚═╝╚█████╗░
*     ██╔══╝░░██║░░░██║██║╚████║██║░░██╗░╚═══██╗
*     ██║░░░░░╚██████╔╝██║░╚███║╚█████╔╝██████╔╝
*     ╚═╝░░░░░░╚═════╝░╚═╝░░╚══╝░╚════╝░╚═════╝░
*/


// Vending

function vending(el, height, top) {
	var vendingImages = [];
  var imgElements = [];
  var count = 53;

  for (var i = 0; i <= count; i++) {
  	name = 'Vending_' + i + '.png';

    vendingImages.push(name);
    imgElements.push($(`<img src="/images/vending/${name}">`));
  }

  $(el).find('.vending_wrapper').append(imgElements);

  var end = $('#vending-end').offset().top;

  $(el).find('img').hide().first().show();

  if (!height) {
    height = $(el).height();
  }

  if (!top) {
    top = 0;
  }

  $(window).on('scroll', function() {
    var scrollPos = $(this).scrollTop();
    var scrollEndPos = top + height;

    if (scrollPos >= top && scrollPos <= scrollEndPos) {
      var progress = (scrollPos - top) / (scrollEndPos - top);
      var frameIndex = Math.floor(progress * (vendingImages.length));

      if (frameIndex <= count) {
      	$(el).find('img').hide().eq(frameIndex).show();
	     }
    }

    $(el).css('position', scrollPos >= end ? 'absolute' : 'fixed');

    if (scrollPos >= end + $(window).height() * 1.3) {
    	$('#text-rotate').css('position', 'absolute');	
    } else {
    	$('#text-rotate').css('position', 'fixed');	
    }
    
  });
}



// Slider

function sliderStart() {
	if ($('.machine_cards').length) {
		var mainSwiper = new Swiper(".machine_cards", {
	      effect: "cards",
	      grabCursor: true,
	      initialSlide: 1,
	      cardsEffect: {
	        perSlideOffset: 180,
	        perSlideRotate: 6,
	        slideShadows: false
		  }
	    });
	}

	if ($('.machine .machine_active').length) {
		var activeSlide = new Swiper(".machine .machine_active", {
			initialSlide: 1,
			allowTouchMove: false,
		});
	}

    mainSwiper.on('slideChange', function() {
	  var activeIndex = mainSwiper.activeIndex;
	  activeSlide.slideTo(activeIndex);
	});
}



// Machine anim - lax

function knotLax() {
  lax.init()

  lax.addDriver('scrollY', function () {
    return window.scrollY
  })

  var machine = $('#machine'),
  	machine_top = machine.offset().top;

	lax.addElements('#machine-active .machine_card span', {
	  scrollY: {
	  	scale: [
	  		[machine_top, machine_top + 200],
	    	['0', '1']
	  	],
	  }
	})

	lax.addElements('#machine-active .machine_card_name', {
	  scrollY: {
	  	translateY: [
	  		[machine_top + 180, machine_top + 400],
	    	['-elHeight - 2', '0']
	  	],
	  }
	})

	lax.addElements('#machine-active .machine_card_img', {
	  scrollY: {
	  	scale: [
	  		[machine_top + 350, machine_top + 550],
	    	['0', '1']
	  	],
	  	opacity: [
	  		[machine_top + 400, machine_top + 500],
	    	['0', '1']
	  	],
	  }
	})

	lax.addElements('#machine-cards', {
	  scrollY: {
	  	scale: [
	  		[machine_top + 600, machine_top + 800],
	    	['0', '1']
	  	],
	  	opacity: [
	  		[machine_top + 650, machine_top + 750],
	    	['0', '1']
	  	],
	  }
	})


	lax.addElements('#text-rotate', {
	  scrollY: {
	  	scale: [
	  		['screenHeight * .5', 'screenHeight * 1.4'],
	    	['0', '1']
	  	],
	  	opacity: [
	  		['screenHeight * .5', 'screenHeight * 1.4'],
	    	['0', '1']
	  	],
	  }
	})
}



// Сursor position at hover

function cursorPosition(mouseX, mouseY) {
  var blockWidth = $('#cursor').outerWidth(); // Ширина блока
  var blockHeight = $('#cursor').outerHeight(); // Высота блока

  // Вычисляем координаты для центрирования блока
  var blockX = mouseX - (blockWidth / 2);
  var blockY = mouseY - (blockHeight / 2);

  // Задаем положение блока
  $('#cursor').css({
    'left': blockX + 'px',
    'top': blockY + 'px'
  });
}

function cursorHover(el) {
  var el = $(el);

  el.mouseenter(function(e) {
    var offset = $(this).offset();

    el.find('span').css({
    	'top': e.pageY - offset.top,
    	'left': e.pageX - offset.left
    })
  });

  el.mouseleave(function(e) {
    var offset = $(this).offset();

    el.find('span').css({
    	'top': e.pageY - offset.top,
    	'left': e.pageX - offset.left
    })
  });
}



// Scroll to element

function scroll_to(e, speed, height) {
	if (!speed) {
		var speed = 500;
	}

	if (!height) {
		var height = 0;
	}

	if ($(e).length != 0) {
		$('html, body').animate({
			scrollTop: $(e).offset().top - height
		}, speed);
	}
}



// Card

function open_card(e) {
	if (load == 0) {
		var object = $(e).attr('data-object');

		threeD(object, e);
		sugar_count(object);
		$('.machine_cards_wrapper').css('pointer-events', 'none');
		load++;
	}
}

function sugar_count(urlName) {
	url = `/${urlName}.html`;
  $.ajax({
    url: url,
    success: function(response) {
      $('#sugar-content').html(response);
    }
  });
}

function open_card_load(e) {
	load--;
	var e = $(e),
		img = e.find('picture').clone(),
		object = e.attr('data-object');

	$('#card').show();
	$('#card-img').html(img);
	$('.card_elips').addClass(a);
	$('#sugar-nav').removeClass('inactive');
	$('.machine_cards_wrapper').css('pointer-events', 'visible');

	$('#food-nav, #sugar-nav').show();

	setTimeout(function() {
		cardLax();
		scroll_to('#card-start', 1000);
	}, 10);
	
	// threeD(object);

	setTimeout(function() {
		card_scroll();
		cardActive = 1;
		sugarActive = 1;
	}, 1000);
}



// Card anim - lax

function cardLax() {
    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    var card = $('#card-start'),
    	card_top = card.offset().top;

    var sugar = $('#pink-start'),
    	sugar_top = sugar.offset().top;

    var windowHeight = $(this).height();

	lax.addElements('.card_elips.active', {
	  scrollY: { 
	  	translateY: [
	  		[card_top - $(window).height(), card_top - $(window).height() / 2],
	    	['0', 'screenHeight / 2']
	  	],
	  	scale: [
	  		[card_top - $(window).height(), card_top - $(window).height() / 2],
	    	['0', '1']
	  	],
	  }
	})

	lax.addElements('#card-machine', {
	  scrollY: { 
	  	translateY: [
	  		[0],
	    	['-elHeight / 2']
	  	],
	  	translateX: [
	  		[0],
	    	['-elWidth / 2']
	  	],
	  	scale: [
	  		[card_top - $(window).height(), card_top - $(window).height() / 2],
	    	['1', '3.2']
	  	],
	  }
	})

	lax.addElements('#threeDModel', {
	  scrollY: {
	  	scale: [
	  		[card_top - $(window).height(), card_top - $(window).height() / 2],
	    	['0.3125', '1']
	  	],
	  }
	})

	lax.addElements('.card_sugar span', {
	  scrollY: {
	  	scale: [
	  		[sugar_top + $(window).height(), sugar_top + $(window).height() * 1.5],
	    	['0', '57']
	  	]
	  }
	})

	lax.addElements('#button', {
	  scrollY: {
	  	scale: [
	  		[$('#sugar').offset().top - windowHeight * .2, $('#sugar').offset().top - windowHeight * .1, $('#sugar').offset().top, $('#sugar').offset().top + windowHeight * .2],
	    	['0', '1', '1', '0']
	  	],
	  	rotate: [
	  		[$('#sugar').offset().top - windowHeight * .2, $('#sugar').offset().top - windowHeight * .1, $('#sugar').offset().top, $('#sugar').offset().top + windowHeight * .2],
	    	['0', '6', '6', '0']
	  	],
	  	opacity: [
	  		[$('#sugar').offset().top - windowHeight * .2, $('#sugar').offset().top - windowHeight * .1, $('#sugar').offset().top, $('#sugar').offset().top + windowHeight * .2],
	    	['0', '1', '1', '0']
	  	]
	  }
	})
}



// Inside scroll card

function card_scroll() {
	$(window).scroll(function () {
		var windowHeight = $(this).height();
		var windowScrollTop = $(this).scrollTop();

		if (sugarActive == 1) {
			var sugarStart = $('#sugar-start').offset().top;

			if (windowScrollTop >= sugarStart) {
				$('.card_sugar').css({
					'position': 'fixed',
					'top': 0
				});
			} else {
				$('.card_sugar').css('position', 'static');
			}

			var range = windowScrollTop / 4; // Диапазон прокрутки, при котором изменяется масштаб
			var maxVal = 18; // Максимальное значение
			var minVal = 0; // Минимальное значение

			// Рассчитать значение масштаба в зависимости от прокрутки
			var val = ((windowScrollTop - $('#pink-start').offset().top) / range) * (maxVal - minVal);

			// Ограничить значение масштаба в диапазоне
			val = Math.max(minVal, Math.min(val, maxVal));

			pink_anim(val);




			if (windowScrollTop >= $('#small-start').offset().top) {
				$('.sugar_wrapper').css({
					'position': 'fixed',
					'top': 0,
				});
			} else {
				$('.sugar_wrapper').css('position', 'relative');
			}

			if (windowScrollTop >= $('#sugar').offset().top - windowHeight / 2) {
				$('#sugar-nav').addClass(a);
			} else {
				$('#sugar-nav').removeClass(a);
			}




			var top = $('#small-start').offset().top + windowHeight * .1;
			var height = $('#small-start').height() * .98;
	    var scrollEndPos = top + height;
	    var sugarImage = $('#small-start').find('img');

	    if (windowScrollTop >= top && windowScrollTop <= scrollEndPos) {
	      var progress = (windowScrollTop - top) / (scrollEndPos - top);
	      var frameIndex = Math.floor(progress * (sugarImage.length));

	      if (frameIndex <= sugarImage.length) {
	      	$('#small-start').find('img').hide().eq(frameIndex).show();
	      } else {
	      	$('#small-start').find('img').hide();
	      }
	    } else if (windowScrollTop <= top) {
	    	$('#small-start').find('img').hide();
	    }



	    if (windowScrollTop >= $('#card').offset().top && windowScrollTop <= $('#sugar').offset().top && sweelinActive == 1) {
	    	$('#sweelin').hide();
				sweelinActive = 0;
			}

			if (windowScrollTop >= $('#small-start').offset().top && windowScrollTop <= $('#sugar').offset().top + $('#sugar').height()  - windowHeight) {
				$('.sugar_wrapper').css({
					'position': 'fixed',
					'top': 0,
				});
			} else {
				if (sweelinActiveStop == 1) {
					$('.sugar_wrapper').css({
						'position': 'absolute',
						'top':  $('#sugar').offset().top - $('#small-start').offset().top + $('#sugar').height() - windowHeight,
					});
				}
			}

			if (windowScrollTop >= $('#card').offset().top && windowScrollTop <= $('#sugar').offset().top) {
				$('#threeDModel').css({
					'position': 'fixed',
					'top': 'calc(50% - var(--size)/ 2)',
				});
			} else {
				if (sweelinActiveStop == 1) {
					$('#threeDModel').css({
						'position': 'absolute',
						// 'top':  $('.card_wrapepr').height() - windowHeight
						'top': $('#card-end').offset().top - windowHeight
					});
				}
			}

	    // $(el).css('position', windowScrollTop >= end ? 'absolute' : 'fixed');
		} else {
			return;
		}
	})
}



// Animation pink shadow

function pink_anim(val) {
	var el = $('.card_sugar p');

	el.css('text-shadow', '');
    for (var angle=0; angle<2*Math.PI; angle+=1/val) {
		appendShadow(el, Math.cos(angle) * val, Math.sin(angle) * val, '#FF7BA3');
	}
}

function appendShadow(item, x, y, col) {
  var textShadow = '';

  if (item.css('text-shadow') !== 'none') {
    textShadow = item.css('text-shadow') + ', ';
  }
  textShadow = textShadow + x + 'px ' + y + 'px ' + col;
  
  item.css('text-shadow', textShadow);
}




// Next section

function nextSection() {
	var speed = 2000;
	var percentIndexNumberOld = 60;

	$('#next-section').show();
	$('html').css('overflow', 'hidden');
	// percentNumber(percentIndexNumberOld, speed);

	setTimeout(function() {
		sectionLax();
		scroll_to('#next-section', speed);
	}, 10);
	$('#card_bg').css('background-color', 'var(--s1)');
	$('.card_sugar').fadeOut(speed);

	setTimeout(function() {
		section_scroll();
		sweelin_open();
		sectionActive = 1;
		$('html').css('overflow', 'auto');
	}, speed);

	setTimeout(function() {
		back = 0;
	}, 500);

	$(window).scroll(function() {
		var windowScrollTop = $(this).scrollTop();

		var top = $('#sugar').offset().top;
		var height = $('#sugar').height();
		var scrollEndPos = top + height;
		var sugarImage = $('#small-start').find('img');
		var oldIndex = $('#old-index').val();

		if (windowScrollTop >= top && windowScrollTop <= scrollEndPos) {
		  var progress = (scrollEndPos - windowScrollTop) / (scrollEndPos - top);
		  var frameIndex = Math.floor(progress * sugarImage.length);

		  if (frameIndex >= oldIndex) {
		  	console.log(frameIndex);
		    $('#small-start').find('img').hide().eq(frameIndex).show();
		  }
		}
	})



	var knotPercent = $('#percent');
			knotPercentIndex = Math.floor($('#percent').attr('data-index'));

	$(window).scroll(function() {
	  var windowScrollTop = $(this).scrollTop();
	  var top = $('#sugar').offset().top;
	  var height = $('#sugar').height();
	  var scrollEndPos = top + height;
	  var startNumber = 101;
	  var endNumber = knotPercentIndex;

	  if (windowScrollTop >= top && windowScrollTop <= scrollEndPos) {
	    var progress = (scrollEndPos - windowScrollTop) / (scrollEndPos - top);
	    var currentNumber = endNumber + Math.floor(progress * (startNumber - endNumber));
	    knotPercent.text(currentNumber + '%').fadeIn();
	  } else {
	  	if (windowScrollTop <= top) {
	  		knotPercent.fadeOut();
	  	}
	  }
	});

}

function backSection() {
	$('#next-section').hide();
	$('#sweelin').hide();
	$('.card_sugar').fadeIn(1000);
	$('#sweelin').hide();

	sweelinActive = 0;
	sweelinActiveStop = 0;
	sectionActive = 0;

	setTimeout(function() {
		$('#card_bg').css('background-color', 'var(--s2)');
	}, 1000);
}


// Inside scroll next section

function section_scroll() {
	$(window).scroll(function () {
		var windowHeight = $(this).height();
		var windowScrollTop = $(this).scrollTop();

		if (sectionActive == 1) {
			if (windowScrollTop >= $('#card').offset().top && windowScrollTop <= $('#next-section').offset().top - windowHeight && back == 0) {
				backSection();

				back = 1;
			}
		} else {
			return;
		}

		if (windowScrollTop >= $('#small-start').offset().top && windowScrollTop <= $('#small-end').offset().top + $('#small-end').height()  - windowHeight) {
			$('.sugar_wrapper').css({
				'position': 'fixed',
				'top': 0,
			});
		} else {
			$('.sugar_wrapper').css({
				'position': 'absolute',
				'top':  $('#small-end').offset().top - $('#small-start').offset().top + $('#small-end').height() - windowHeight,
			});
		}

		if (windowScrollTop >= $('#card').offset().top && windowScrollTop <= $('#card-end').offset().top  - windowHeight) {
			$('#threeDModel').css({
				'position': 'fixed',
				'top': 'calc(50% - var(--size)/ 2)',
			});
		} else {
			$('#threeDModel').css({
				'position': 'absolute',
				'top': $('#card-end').offset().top - windowHeight
			});
		}

		if (windowScrollTop >= $('#card').offset().top && windowScrollTop <= $('#card-end').offset().top  - windowHeight) {
			$('.card_rainbow').css({
				'position': 'fixed',
				'top': '50%',
			});
		} else {
			$('.card_rainbow').css({
				'position': 'absolute',
				'top':  $('.card_wrapepr').height() - windowHeight / 2 
			});
		}

		if (windowScrollTop <= $('#sugar-end').offset().top) {
			$('#sugar-nav').addClass(a);
		} else {
			$('#sugar-nav').removeClass(a);
		}
	})
}



// Next section anim - lax

function sectionLax() {
    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    var rainbow = $('#rainbow-start'),
    	rainbow_top = rainbow.offset().top;

	lax.addElements('.card_rainbow', {
	  scrollY: {
	  	scale: [
	  		[rainbow_top - $(window).height() / 2, rainbow_top],
	    	['0', '1']
	  	],
	  	rotate: [
	  		[0],
	    	['15.45']
	  	],
	  	translateX: [
	  		[0],
	    	[$('.card_rainbow').width() / -2]
	  	],
	  	translateY: [
	  		[0],
	    	[$('.card_rainbow').height() / -2]
	  	]
	  }
	})
}



// Move element with cursor.

function moveElement(element, container, fade) {
  var $container = $(container);
  var $element = $(element);

  if (fade == undefined) {
  	var fade = true;
  }

  $container.mousemove(function(e) {
    var x = e.pageX - $container.offset().left - ($element.width() / 2);
    var y = e.pageY - $container.offset().top - ($element.height() / 2);
    if (e.pageX - $container.offset().left < 0 || e.pageY - $container.offset().top < 0 || e.pageX - $container.offset().left > $container.width() || e.pageY - $container.offset().top > $container.height()) {
      if (fade) {
      	$element.fadeOut();
      }
    } else {
      $element.fadeIn();
      $element.css({
        left: x + 'px',
        top: y + 'px'
      });
    }
  }).mouseleave(function() {
    if (fade) {
    	$element.fadeOut();
    }
  });
}



// Animating numbers

function animateNumber(e) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          const valueText = $(e).text();
          const targetValue = parseFloat(valueText.replace(",", ".")); // Замена запятой на точку для парсинга числа
          const isInteger = Number.isInteger(targetValue);

          const decimalSeparator = valueText.includes(",") ? "," : ".";
          const decimalPlaces = isInteger ? 0 : valueText.split(decimalSeparator)[1].length;

          $({ numberValue: 0 }).animate(
            { numberValue: targetValue },
            {
              duration: 2000,
              easing: "linear",
              step: function (now, fx) {
                const formattedValue = isInteger ? Math.ceil(now) : now.toFixed(decimalPlaces);
                $(e).text(formattedValue.toString().replace(".", decimalSeparator));
              },
            }
          );
          observer.disconnect();
        }, $(e).attr('data-delay'));
      }
    },
    { threshold: 0.1 }
  );

  observer.observe($(e)[0]);
}



// Input fixed palceholder

function input_fixed_placeholder(e, b) {
	var input = e,
		palceholder = b;

	if (input.val().length > 0) {
		palceholder.addClass(a);
		input.addClass(a);
	} else {
		palceholder.removeClass(a);
		input.removeClass(a);
	}
}



// Textarea height

function textarea_height(e) {
	var e = $(e),
		val = e.val().replace(/\r\n|\r|\n/g,"<br />&nbsp");

	if (!e.siblings('.textarea_text').length) {
		e.after($('<div class="textarea_text"></div>'))
	}

	e.siblings('.textarea_text').html(val);
}




// Nav toggle

function nav_toggle() {
	var $nav = $('.nav_wrapper'),
			width = $nav.find('ul').outerWidth(true);

	$nav.toggleClass(a);
}

function nav_hide() {
	var $nav = $('.nav_wrapper');

	$nav.removeClass(a);
}

var timeout;

$('#nav').mouseenter(function() {
  clearTimeout(timeout);
});

$('#nav').mouseleave(function() {
  timeout = setTimeout(nav_hide, 3000);
});



// Svin_open

function sweelin_open(scrollTo) {
	$('#sweelin').show();
	sweelinActiveStop = 1;

	if (scrollTo) {
		setTimeout(function() {
			scroll_to(scrollTo);
		}, 10);
	}

	setTimeout(function() {
		sweelin_scroll();
		sweelin_lax();
		sweelinActive = 1;
	}, 500);
}

function sweelin_scroll() {
	$(window).scroll(function () {
		var windowHeight = $(this).height();
		var windowScrollTop = $(this).scrollTop();

		if (sweelinActive != 1) {
			return;
		}

		if (windowScrollTop >= $('#sweelin').offset().top - 1) {
			$('#sugar-nav').removeClass(a);
		}

		if (windowScrollTop >= $('#sweelin').offset().top - 1 && windowScrollTop <= $('#sweelin-end').offset().top) {
			$('#sweelin-nav').addClass(a);
		} else {
			$('#sweelin-nav').removeClass(a);
		}

		if (windowScrollTop >= $('#contact').offset().top - 1 && windowScrollTop <= $('#contact-end').offset().top) {
			$('#contact-nav').addClass(a);
		} else {
			$('#contact-nav').removeClass(a);
		}



		if (windowScrollTop >= $('#how').offset().top + windowHeight * .5) {
			$('#how').addClass(a);
		} else {
			$('#how').removeClass(a);
		}
	})
}



// Next section anim - lax

function sweelin_lax() {
  lax.addDriver('scrollY', function () {
    return window.scrollY
  })

  var how = $('#how'),
  		how_top = how.offset().top,
  		windowHeight = $(this).height();

	lax.addElements('.how_sugar_spoon', {
	  scrollY: {
	  	scale: [
	  		[how_top - windowHeight, how_top],
	    	['.7', '1']
	  	],
	  	rotate: [
	  		[how_top - windowHeight, how_top],
	  		['-40', '0']
	  	],
	  	translateX: [
	  		[how_top - windowHeight, how_top],
	    	['screenWidth * .32', '0']
	  	],
	  	translateY: [
	  		[0],
	    	['-elHeight / 2']
	  	]
	  }
	})
}



// ThreeD

function threeD_close() {
	// Удаление предыдущей модели, если она уже существует
  var previousCanvas = document.getElementById("renderCanvas");
  if (previousCanvas) {
      previousCanvas.parentNode.removeChild(previousCanvas);
  }
}

function threeD(object, elementSelected) {
	var model = 'threed/' + object + '.glb',
			animItems = true;

  // Создание элемента canvas и добавление его в контейнер
  var canvas = document.createElement("canvas");
  canvas.id = "renderCanvas";
  document.getElementById("threeDModel").appendChild(canvas);

	// Создание экземпляра движка Babylon.js
	var engine = new BABYLON.Engine(canvas, true);

	// Функция создания сцены
	var createScene = function () {
	    // Создание новой сцены
	    var scene = new BABYLON.Scene(engine);

	    // Установка прозрачности фонового цвета сцены
	    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	    // Создание камеры
	    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2 + .12, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	    camera.lowerBetaLimit = null; // Ограничение на вращение вниз
	    camera.upperBetaLimit = null; // Ограничение на вращение вверх
	    camera.attachControl(canvas, false, false, false); // Управления при помощи мыши
	    camera.lowerRadiusLimit = camera.upperRadiusLimit = 2;



	    // Создание источника света						# 1
	    var oneLight = new BABYLON.HemisphericLight("oneLight", BABYLON.Vector3(0, 0, 0), scene);
	    oneLight.intensity = .4; // Увеличение интенсивности света



	    // Создание дополнительного источника света		# 2
	    var twooLight = new BABYLON.PointLight("twooLight", new BABYLON.Vector3(0, 0, 0), scene);
	    twooLight.intensity = 600000;


			// Установка типа падения света на физический
			twooLight.falloffType = BABYLON.Light.FALLOFF_PHYSICAL;



	    // Создание дополнительного источника света		# 3
	    var threeLight = new BABYLON.PointLight("threeLight", new BABYLON.Vector3(0, 0, 0), scene);
	    threeLight.intensity = 70;


			// Установка типа падения света на физический
			threeLight.falloffType = BABYLON.Light.FALLOFF_PHYSICAL;



	    // Функция для обновления позиции источника света
	    scene.registerBeforeRender(function () {
	        var cameraPosition = camera.position;

	        // 1
	        oneLight.direction._x = camera.position._x;
	        oneLight.direction._y = camera.position._y - 8;
	        oneLight.direction._z = camera.position._z;

	        // 2
	        twooLight.position._x = camera.position._x + 300;
	        twooLight.position._y = camera.position._y + 300;
	        twooLight.position._z = camera.position._z;

	        // 3
	        threeLight.position._x = camera.position._x - 4;
	        threeLight.position._y = camera.position._y - 2;
	        threeLight.position._z = camera.position._z;
	    });


	    // Загрузка 3D модели .glb
	    BABYLON.SceneLoader.ImportMesh("", "", model, scene, function (meshes) {
	        // Создание нового материала PBRMaterial
	        var material = new BABYLON.PBRMaterial("material", scene);

	        // Установка прозрачности материала
	        material.alpha = 0.5;

	        // Установка режима прозрачности материала на ALPHABLEND
					material.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND;

					// Отключение отражения света (блика)
					material.reflectivityTexture = null;
					material.reflectivityColor = new BABYLON.Color3(0, 0, 0);

	        // Применение материала к первой сетке модели
	        meshes[0].material = material;

	        // Масштабирование и позиционирование модели
	        meshes[0].scaling = new BABYLON.Vector3(2.5, 2.5, -2.5);
	        meshes[0].position = new BABYLON.Vector3(0, -.15, 0);

	        $('#card-machine').hide();
	        $('#threeDModel').addClass(a);
	        open_card_load(elementSelected);
	    });

	    return scene;
	};

	var scrollPosOld = 0;
	var knot = 0;
	var knotTouch = 1;
	var knotDirect = 1;
	var scrollOld = 0;

  function updateAnimation(scrollPos) {

    if (scrollPos > scrollOld) {
        var scrollTo = 1;
    } else {
        var scrollTo = -1;
    }

    scrollOld = scrollPos;

    var camera = scene.getCameraByName("camera");
    camera.alpha = scrollPos * 0.005; // изменить этот параметр для управления скоростью вращения по горизонтали

		scrollPosCalc = knot + (scrollPosOld * knotTouch + scrollPos * 0.0005) * knotDirect;
		var minBeta = Math.PI * 0.25; // минимальное значение для camera.beta
		var maxBeta = Math.PI / 1.3; // максимальное значение для camera.beta

		if (scrollTo == 1) {
			if (maxBeta <= scrollPosCalc) {
				knot = maxBeta;
				scrollPosOld = scrollPos * 0.0005;
				knotTouch = -1;
				knotDirect = -1;
			}

			if (minBeta >= scrollPosCalc) {
				knot = minBeta;
				scrollPosOld = scrollPos * 0.0005;
				knotTouch = -1;
				knotDirect = 1;
			}
		} else {
			if (maxBeta <= scrollPosCalc) {
				knot = maxBeta;
				scrollPosOld = scrollPos * 0.0005;
				knotDirect = -1;
				knotDirect = 1;
			}

			if (minBeta >= scrollPosCalc) {
				knot = minBeta;
				scrollPosOld = scrollPos * 0.0005;
				knotTouch = -1;
				knotDirect = -1;
			}
		}

		var targetBeta = Math.max(minBeta, Math.min(maxBeta, scrollPosCalc)); // изменить этот параметр для управления скоростью вращения по вертикали
		var betaSpeed = (targetBeta - camera.beta) * 0.05; // коэффициент затухания для плавного перехода
		camera.beta += betaSpeed;
  }

  function scrollHandler() {
    var scrollPosCalc = window.pageYOffset || document.documentElement.scrollTop;
    updateAnimation(scrollPosCalc);
  }


	// Создание сцены
	var scene = createScene();

	// Запуск рендеринга сцены
	engine.runRenderLoop(function () {
	    scene.render();
	});

	// Обновление размеров канваса при изменении размера окна
	window.addEventListener("resize", function () {
	    engine.resize();
	});

	// Обработчик события прокрутки страницы
  window.addEventListener("scroll", scrollHandler);
}



function decreaseNumber(targetNumber, duration) {
  var startNumber = 100; // Начальное значение числа
  
  $({number: startNumber}).animate({number: targetNumber}, {
    duration: duration, // Продолжительность анимации в миллисекундах
    easing: 'linear', // Тип анимации (линейное изменение)
    step: function() {
      // Обновление значения числа на каждом шаге анимации
      var currentNumber = Math.floor(this.number);

      // Можно также использовать значение числа для обновления текста элемента
      например: $('#element').text(currentNumber);
    },
    complete: function() {
      console.log('Анимация завершена!'); // Действия по завершении анимации
    }
  });
}


// Btn

function preload_btn(i) {
	var btn = $(i);
	var btn_w = btn.outerWidth();
	var btn_h = btn.outerHeight();
	var btn_clone = btn.clone(true);

	btn.replaceWith('<div class="__btn _load"></div>');
	$('.__btn._load').outerWidth(btn_w).outerHeight(btn_h);

	return btn_clone;
}



// Send
	
function form_send(i) {
	var btn = preload_btn(i);
	$('.input_error').text('');

	var input_name = $('#name');
	var input_email = $('#email');
	var input_message = $('#message');
	var input_updates = $('#updates');
	var select = $('#interested option:selected');

	var name = input_name.val();
	var email = input_email.val();
	var message = input_message.val();
	var updates = input_updates.is(':checked');
	var selected = false;
	

	if (select.val() != 'placeholder') {
		selected = select.text();
	}

	$.ajax({
		type: 'POST',
		url: '/apps/send.app.php',
		data: {
			name: name,
			email: email,
			message: message,
			updates: updates,
			selected: selected,
		},

		success: function(html) {
			var json = JSON.parse(html);
			console.log(json);

			if (json.process == 1) {
				
			} else {
				if (json.errs.name) {
					input_name.siblings('.input_error').text(json.errs.name);
				}
				if (json.errs.email) {
					input_email.siblings('.input_error').text(json.errs.email);
				}
				if (json.errs.message) {
					input_message.siblings('.input_error').text(json.errs.message);
				}
			}

			$('.__btn._load').replaceWith(btn);
		},

		error: function(error) {
			console.log(error);

			$('.__btn._load').replaceWith(btn);
		}
	});
}