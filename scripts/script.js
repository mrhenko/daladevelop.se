var timer;
var urlStack = new Array;
var currentPosition = 0;

(function ($) { 
	$(document).ready(function() {
		/* Add a 'http-loaded'-class to the body.
			This will be used to prevent Chrome from
			sliding the first page
		*/
		$('body').addClass('http-loaded');
	
		// Hijack links and load via ajax
		$('body.page').delegate('li.ddajax a', 'click', function(event) {
			$('body').removeClass('http-loaded');
			if(! ($(this).parent('li').hasClass('current_page_item'))) {
				show_ajax_loading();
				event.preventDefault();
				var url = $(this).attr('href');
				
				urlStack.push(url);
				currentPosition = currentPosition + 1;
				
				load_page(url);
				$('nav#main-menu li').removeClass('current_page_item');
				$(this).parent('li').addClass('current_page_item');
			} else {
				event.preventDefault();
			}
		});

		// Load blog posts when tag checkboxes are clicked
		$('#tagcloud').delegate('#tag_box', 'change', function(event) {
			clearTimeout(timer);
			timer=setTimeout("post_tag_form()", 1300);
			$('#posts').animate({opacity: .5});
			$('#posts').css("background-color: #666;");
		});
		
		window.onpopstate = function(event) {
			if (!$('body').hasClass('http-loaded')) {
				console.log('not-http-loaded');
				if (event.state != null) {
					load_page(event.state['url'], true);
				} else {
					load_page('', true);
				}
			} else {
				console.log('http-loaded');
			}
		}
	
	}); // End of document.ready
	
	function load_page(url, history_search) {
		if (!history_search) {
			var stateObj = {url: url};
			history.pushState(stateObj, 'page', url);
		} else {
			/* Sätt .current_page_item på rätt länk */
			var selector = 'a[href=\'' + url + '\']';
			$('nav#main-menu li').removeClass('current_page_item');
			$(selector).parent('li').addClass('current_page_item');
			
			var stackPosition = $.inArray(url, urlStack);
			var direction;
			if (currentPosition > stackPosition) {
				// Back
				direction = 'back';
				currentPosition = currentPosition - 1;
			} else {
				// Forward
				direction = 'forward';
				currentPosition = currentPosition + 1;
			}
			
		}
		
		url = url + ' #wrapper article';
			
			
		$('body').append('<div id="tempload" class="hidden"></div>');
		$('#tempload').load(url, function() {
			if (!history_search) {
				$('div#tempload').children('article').addClass('fromright');
			} else {
				if (direction == 'back') {
					$('div#tempload').children('article').addClass('fromleft');
				} else {
					$('div#tempload').children('article').addClass('fromright');
				}
			}
			var newpage = $('div#tempload').html();
			$('#wrapper').children('article').addClass('old');
			
			$('#wrapper').append(newpage);
				
			$(this).remove();
			
			if (!history_search) {
				$('#wrapper').animate({
					left: '-960px'
				}, 1000, function() {
					$(this).css('left', '0px');
					$('#wrapper article.old').remove();
					$('#wrapper article.fromright').removeClass('hidden').removeClass('fromright');
					$('#dd_ajax_loading').remove();
				});
			} else {
				if (direction == 'back') {
					$('#wrapper').animate({
						left: '960px'
					}, 1000, function() {
						$(this).css('left', '0px');
						$('#wrapper article.old').remove();
						$('#wrapper article.fromleft').removeClass('hidden').removeClass('fromleft');
						$('#dd_ajax_loading').remove();
					});
				} else {
					$('#wrapper').animate({
						left: '-960px'
					}, 1000, function() {
						$(this).css('left', '0px');
						$('#wrapper article.old').remove();
						$('#wrapper article.fromright').removeClass('hidden').removeClass('fromright');
						$('#dd_ajax_loading').remove();
					});
				}
			}
		});
	}
})(jQuery)

function show_ajax_loading() {
			$('body').append('<div id="dd_ajax_loading"><p>Laddar...</p><div id="dd_squares"><span id="dd_ajax_loading_one"></span><span id="dd_ajax_loading_two"></span><span id="dd_ajax_loading_three"></span><span id="dd_ajax_loading_four"></span></div></div>');
			window.setTimeout(function() {$('#dd_ajax_loading_one').addClass('filled');}, 250);
			window.setTimeout(function() {$('#dd_ajax_loading_two').addClass('filled');}, 500);
			window.setTimeout(function() {$('#dd_ajax_loading_three').addClass('filled');}, 750);
			window.setTimeout(function() {$('#dd_ajax_loading_four').addClass('filled');}, 1000);
		}
		
		function post_tag_form() {
			show_ajax_loading();
			var data = { 'tags[]': [] };
			$(':checked').each(function() {
				data['tags[]'].push($(this).val());
			});

			$("#posts").load("/wp-content/themes/daladevelop.se/apps/get_posts.php", data);
			$("#posts").animate({opacity: 1});
			$("#posts").css("background-color: transparent;");
		}

function show_tags() {
}