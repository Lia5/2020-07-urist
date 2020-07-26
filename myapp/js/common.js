$(function() {
    // $('.js-preloader').preloadinator({
    //     minTime: 2000,
    //     afterRemovePreloader: function() {
    //         $(this).remove();
    //         $('body').removeClass('body-modal-open');
    //     }
    // });
    //menu
    if(jQuery('.menu-toggle').length) {
        var menu = $('.menu-toggle');
        menu.on('click', function(){
            $('.main-menu').toggleClass('active');
            $('.menu-toggle').toggleClass('active');
            $('body').toggleClass('body-modal-open');
        });
        $('.main-menu').mouseup(function (e){ // событие клика по веб-документу
            var div = $(".main-menu ul"); // тут указываем ID элемента
            var close = $('.menu-toggle');
            if (close.is(e.target)) {
        
            } else if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.main-menu').toggleClass('active');
                $('.menu-toggle').toggleClass('active');
                $('body').toggleClass('body-modal-open');
              
            }
        });
    }
    if(jQuery('.scroll-to').length) {
        var $page = $('html, body');
        $('.scroll-to[href*="#"]').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
            if ( window.innerWidth < 992 || window.screen.width < 992) {
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
            }
            return false;
        });
    }

    //select-number form
    if(jQuery('.phone-mask').length) {
        jQuery(function($){
            $(".phone-mask").mask("+7 (111) 111-11-11");
        });
    }

    if( window.innerWidth < 750 || window.screen.width < 750){
        if(jQuery('.why__items').length) { 
            $('.why__item0').remove();
            $('.why__items').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true
            });
        }
    }

    //animation-text
    if(jQuery('.letters').length) {
        $.fn.animate_Text = function() {
            this.addClass('active');
            var string = this.text();
            return this.each(function(){
                var $this = $(this);
                $this.html(string.replace(/./g, '<span class="animated">$&</span>'));
                // $this.find('span.new').each(function(i, el){
                // setTimeout(function(){ $(el).addClass('fadeIn'); }, 40 * i);
                // });
            });
        };
        var letters = $('.letters');
        for (var j=0; j<=letters.length; j++) {
            $(letters[j]).animate_Text();
        }
    }
	//BEGIN Anchor menu
	//li.anchor(data-menuAnchor="#section")
	//section(data-anchor="#section")

	$('.fixed-nav li').on('click', function(e){
		var dataName = $(this).attr('data-menuAnchor');
		e.preventDefault();
		var id = $('[data-anchor="'+ dataName + '"]');
		$('html,body').stop().animate({ scrollTop: $(id).offset().top }, 1000);
	});

	function AnchorActive() {
		$('*[data-anchor]').each(function(e) {
			var dataName = $(this).attr('data-anchor');
			var posit = $(this).offset().top - 400;

			var windowPostition = $(window).scrollTop();

			if (windowPostition >= posit) {
                if (dataName == '#home') {
                    $('.fixed-nav ul li').removeClass('active');
                    $('.fixed-nav ul li').removeClass('active1');
                    $('[data-menuAnchor="'+ dataName + '"]').addClass('active1');
                } else {

                    $('.fixed-nav ul li').removeClass('active1');
                    $('.fixed-nav ul li').removeClass('active');
                    $('[data-menuAnchor="'+ dataName + '"]').addClass('active');
                }
			}

		});
	};

	AnchorActive();
	$(window).scroll(function() {
		AnchorActive();
	});

	$(window).resize(function() {
		AnchorActive();
	});
    //END Anchor menu
    
    //animation
    setTimeout(function(){  
            
        // var introLetter = $(".home__subtitle").find('.animated');
        // introLetter.each(function(i,t) {
        //     var $this = $(t);
        //     setTimeout(function(){ $this.addClass('fadeIn'); },i*20);
        // });
        
        var introLetter = $(".animated-parent").find('.animated');
        introLetter.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeIn'); },i*20);
        });

        var IntroLinks = $(".home__group").find('.animated');
        IntroLinks.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeInUp'); },i*200);
        });

        var IntroLinks = $(".advantages__item.animated");
        IntroLinks.each(function(i,t) {
            var $this = $(t);
            setTimeout(function(){ $this.addClass('fadeInUp'); },i*200);
        });
        
    },500);


    $('.useful__label').click(function(){
        if ($(this).hasClass('useful__label--email')) {
            $('.form-line--email').addClass('active');
            $('.form-line--email input').addClass('rfield');
        } else {
            $('.form-line--email').removeClass('active');
            $('.form-line--email input').removeClass('rfield');
        }
    });
    //quiz
    if(jQuery('.quiz').length) {
        // input other
        $('.pick-item__input').on('click', function(){
            if ( $(this).hasClass('other-input')) {
                var attrName =  $(this).attr('name');
                $(this).closest('.step-slide').find('.quiz__ans--other-text').addClass('active').find('input').attr('name', attrName);
            } else {
                $(this).closest('.step-slide').find('.quiz__ans--other-text').removeClass('active').find('input').removeAttr('name');
            }
            console.log($(this).val());
            
        });
        $('.qa-next').click(function(e){
            // console.log($(this).closest('.step-slide').find('input:checked').length);
            if($(this).hasClass('qa-del-discount')) {
                $('.quiz__discount').css('display', 'none');
            } 
            e.preventDefault();
            if($(this).closest('.step-slide').hasClass('step-slide--first') && $(this).closest('.step-slide').find('input:checked').length <2 ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('Выберите 2 варианта ответа!');
            } else if ($(this).closest('.step-slide').hasClass('step-slide--first') && $(this).closest('.step-slide').find('input:checked').length >2 ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('Выберите только 2 варианта ответа!');
            } else if ($(this).closest('.step-slide').hasClass('step-slide--text') && $(this).closest('.step-slide').find('input').val() == '' ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('Введите ответ');
            } else if ( $(this).closest('.step-slide').find('.quiz__ans--other-text.active input').val() == '') {
                console.log($(this));
                $(this).closest('.prev-next-container').find('.quiz__error').text('Введите ответ');
            
            } else if ($(this).closest('.step-slide').hasClass('step-slide--text') && $(this).closest('.step-slide').find('input').val() != '' ) {
                $(this).closest('.prev-next-container').find('.quiz__error').text('');
                $(this).closest('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
            } else {
                if($(this).closest('.step-slide').find('input:checked').length) {
                    $(this).closest('.prev-next-container').find('.quiz__error').text('');
                    $(this).closest('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
                    
                } else {
                    $(this).closest('.prev-next-container').find('.quiz__error').text('Выберите вариант ответа!');
                }
            }


            
        });
        // for radiobuttons
        $('input[type="radio"]+.pick-item__label').click(function(e){
            // $(this).parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');           
        });

        $(".qa-prev").click(function(e) {
            e.preventDefault();
                $(this).closest('.step-slide').removeClass('step-slide--active').prev().addClass('step-slide--active');
            
                // итоговая скидка
                if(jQuery('#total').length) {
                    var sum = +($('#total').html());
                    var total = sum - 500;
                    $('#total').html(total);
                }
        });
    }

    //popup
    if(jQuery('.modal__wrap').length) {
        let modalWrap = $('.modal__wrap');
        //popup
        $(".modal-open").click(function (e){
          e.preventDefault();
          var btn = $(this);
          var numModal = btn.attr('href');
        //   if($(this).closest('form').attr("name") == "quiz"){
        //     var numModal = btn.attr('data-modal');
        //   }
          if(numModal == '#modalQuiz'){

            $('.qa-del-discount').css('display', 'block');
          }
          var modal =  $(numModal);
        //   modalWrap.removeClass('fadeOutUp');
        //   modalWrap.addClass('fadeInDown');
          modalWrap.removeClass('animated zoomOut');
          modalWrap.addClass('animated zoomIn');
          modal.removeClass('disabled');
          modal.addClass('flex');
          $('body').addClass('body-modal-open');
          // body.addClass('body-modal');

        });
        $('.modal-close').click(function (){
            if ( window.innerWidth < 750 || window.screen.width < 750) {
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
            }
            // modalWrap.removeClass('fadeInDown');
            // modalWrap.addClass('fadeOutUp');
            modalWrap.removeClass('animated zoomIn');
            modalWrap.addClass('animated zoomOut');
            setTimeout(function() {
                $('.modal').addClass('disabled');
                }, 700);
            setTimeout(function() {
                $('.modal').removeClass('flex');
                $('body').removeClass('body-modal-open');
                }, 800);  
        });
        $('.modal').mouseup(function (e){ // событие клика по веб-документу
          var div = $(".modal__body"); // тут указываем ID элемента
          var close = $('.modal-close');
          if (close.is(e.target)) {
          } else if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.main-menu').removeClass('active');
                $('.menu-toggle').removeClass('active');
                var modalWrap = $('.modal__wrap');
                // modalWrap.removeClass('fadeInDown');
                // modalWrap.addClass('fadeOutUp');
                modalWrap.removeClass('animated zoomIn');
                modalWrap.addClass('animated zoomOut');
                setTimeout(function() {
                    $('.modal').addClass('disabled');
                }, 700);
                setTimeout(function() {
                    $('.modal').removeClass('flex');
                    $('body').removeClass('body-modal-open');
                }, 800);
          }
        });
    }
   // UTM
   function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    $('form').find('input.utm_source').each(function() {
        var a = getQueryVariable('utm_source');
        if(a){
            $(this).val(a);
        }
    }); 
    $('form').find('input.utm_medium').each(function() {
        var a = getQueryVariable('utm_medium');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_campaign').each(function() {
        var a = getQueryVariable('utm_campaign');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_term').each(function() {
        var a = getQueryVariable('utm_term');
        if(a){
            $(this).val(a);
        }
    });
    $('form').find('input.utm_content').each(function() {
        var a = getQueryVariable('utm_content');
        if(a){
            $(this).val(a);
        }
    });

    // form
    $('form').submit(function() { 
        var form = $(this);
        

        // Функция проверки полей формы
        // if(form.attr("name") == "popup"){
            if (form.find('.useful').find('input:checked').length) {
                form.find('.useful__input').removeClass('empty_field');
                form.find('.useful__label').removeClass('red');
                console.log('[[[');
            
        // }
        form.find('.rfield').addClass('empty_field');
        form.find('.rfield').each(function(){
            if($(this).val() != ''){
                // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');

                
                // && form.find('.useful__input:checked').length
                if((form.attr("name") == "quiz") || (form.attr("name") == "popup") || (form.attr("name") == "callback") ) {
                        console.log('2[[[');

                    if (!form.find('.empty_field').length) {
                        if(form.attr("name") == "popup"){
                            // ym(65723536,'reachGoal','leave')
                        }
                        console.log('3[[[');
                        $.ajax({
                            type: "POST",
                            url: "/dolg/mail.php", //Change
                            data: form.serialize()
                        }).done(function() {
                            console.log('4[[[');
                            if(form.attr("name") == "quiz"){
                            console.log('5[[[');
                                $('.step-slide--choise').removeClass('step-slide--active');
                                $('.step-slide--thank').addClass('step-slide--active');
                                $('.quiz__maintitle').addClass('disabled');
                                // ym(65723536,'reachGoal','quiz');
                            }
                            var numModal = form.find('.btn-finish').attr('data-modal');
                            var modal =  $(numModal);
                            var modalWrap = $('.modal__wrap');
                            // modalWrap.removeClass('fadeOutUp');
                            // modalWrap.addClass('fadeInDown');
                            modalWrap.removeClass('animated zoomOut');
                            modalWrap.addClass('animated zoomIn');
                            $('.modal').addClass('disabled');
                            modal.removeClass('disabled');
                            modal.addClass('flex');
                            if(form.attr("name") == "popup"){
                                $('body').addClass('body-modal-open');  
                            }
                            
                            setTimeout(function() {
                                // Done Functions
                                // form.trigger("reset");
                            }, 1000);
                        });
                        $.ajax({
                            method: "POST",
                            url: "/dolg/telegram.php", //Change
                            data: form.serialize()
                        }).done(function(){});
                    } else {
                        // console.log('111');
                        // form.find('.useful__input').addClass('empty_field rfield');
                        // form.find('.useful__label').addClass('red');
                    }

            } else {
            }
            } else {}
        });
    
    } else {
        console.log('111');
        form.find('.useful__input').addClass('empty_field');
        form.find('.useful__label').addClass('red');
    }

		return false;
    });

    if(jQuery('.list-title').length) {
        $('.list-title').on('click', function(){
            $(this).parent().toggleClass('active');
            $(this).parent().next().toggleClass('active');
        });
    }

});


    // функция возвращает cookie с именем name, если есть, если нет, то undefined    
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    // проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
    var alertwin = getCookie("alertwin");
    console.log(alertwin);
    if (alertwin != "no") { 
        $(document).on('mouseleave', function() {
            $('.modalLeave').removeClass('disabled');
            var modalWrap = $('.modalLeave .modal__wrap');
            modalWrap.removeClass('fadeOutUp');
            modalWrap.addClass('fadeInDown');
            // записываем cookie на 1 день, с которой мы не показываем окно
            var date = new Date;
            date.setDate(date.getDate() + 1);    
            document.cookie = "alertwin=no; path=/; expires=" + date.toUTCString();
       
        });
        $(document).click(function(e) {
            if (($(".modalLeave").is(':visible')) && (!$(e.target).closest(".modalLeave .modal__body").length)) {
                var modalWrap = $('.modalLeave .modal__wrap');
                modalWrap.removeClass('fadeInDown');
                modalWrap.addClass('fadeOutUp');
                setTimeout(function() {
                    $('.modalLeave').addClass('disabled');
                }, 700);
                setTimeout(function() {
                    $('.modalLeave').removeClass('flex');
                    $('body').removeClass('body-modal-open');
                    $(".modalLeave").remove();
              }, 800); 
            }
        });
    } 