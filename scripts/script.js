var timer;

(function ($) { 
	$(document).ready(function() {
		// Hijack links and load via ajax
		
		$('body.page').delegate('li.ddajax a', 'click', function(event) {
			if(! ($(this).parent('li').hasClass('current_page_item'))) {
				show_ajax_loading();
				event.preventDefault();

				var url = $(this).attr('href');
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
			if (event.state != null) {
				load_page(event.state['url'], true);
			} else {
				load_page('', true);
			}
		}
	
	}); // End of document.ready
	
	function load_page(url, history_search) {
		//window.location.hash = url;
		
		if (!history_search) {
			var stateObj = {url: url};
			history.pushState(stateObj, 'what', url);
		}
		
		url = url + ' #wrapper article';
			
			
		$('body').append('<div id="tempload" class="hidden"></div>');
		$('#tempload').load(url, function() {
			if (!history_search) {
				$('div#tempload').children('article').addClass('new');
			} else {
				$('div#tempload').children('article').addClass('new_old');
			}
			var newpage = $('div#tempload').html();
			$('#wrapper').children('article').addClass('old');
			
			$('#wrapper').append(newpage);
				
			$(this).remove();
			
			if (!history_search) {
				$('#wrapper').animate({
					left: '-100%'
				}, 1000, function() {
					$(this).css('left', '0%');
					$('#wrapper article.old').remove();
					$('#wrapper article.new').removeClass('hidden').removeClass('new');
					$('#dd_ajax_loading').remove();
				});
			} else {
				$('#wrapper').animate({
					left: '100%'
				}, 1000, function() {
					$(this).css('left', '0%');
					$('#wrapper article.old').remove();
					$('#wrapper article.new_old').removeClass('hidden').removeClass('new_old');
					$('#dd_ajax_loading').remove();
				});
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