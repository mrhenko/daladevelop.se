var timer;

(function ($) { 
	$(document).ready(function() {
		// Hijack links and load via ajax
		$('body.page').delegate('li.ddajax a', 'click', function(event) {

			show_ajax_loading();
			
			if(! ($(this).hasClass('current_page_item'))) {
				event.preventDefault();
			}

			var url = $(this).attr('href') + ' #wrapper article';
			
			$('body').append('<div id="tempload" class="hidden"></div>');
			$('#tempload').load(url, function() {
				$('div#tempload').children('article').addClass('new');
				var newpage = $('div#tempload').html();
				$('#wrapper').children('article').addClass('old');
				$('#wrapper').append(newpage);
				
				$(this).remove();
				
				$('#wrapper').animate({
					left: '-100%'
				}, 1000, function() {
					$(this).css('left', '0%');
					$('#wrapper article.old').remove();
					$('#wrapper article.new').removeClass('hidden').removeClass('new');
					$('#dd_ajax_loading').remove();
				});
			});
		});

	// Load blog posts when tag checkboxes are clicked
	$('#tagcloud').delegate('#tag_box', 'change', function(event) {
  	clearTimeout(timer);
  	timer=setTimeout("post_tag_form()", 1300);
  	$('#posts').animate({opacity: .5});
  	$('#posts').css("background-color: #666;");

	});
  });
  
  function show_ajax_loading() {
	$('body').append('<div id="dd_ajax_loading"><p>Laddar...</p><div id="dd_squares"><span id="dd_ajax_loading_one"></span><span id="dd_ajax_loading_two"></span><span id="dd_ajax_loading_three"></span><span id="dd_ajax_loading_four"></span></div></div>');
	window.setTimeout(function() {$('#dd_ajax_loading_one').addClass('filled');}, 250);
	window.setTimeout(function() {$('#dd_ajax_loading_two').addClass('filled');}, 500);
	window.setTimeout(function() {$('#dd_ajax_loading_three').addClass('filled');}, 750);
	window.setTimeout(function() {$('#dd_ajax_loading_four').addClass('filled');}, 1000);
}
})(jQuery)


function show_tags() {
}


function post_tag_form() {
  var data = { 'tags[]': [] };
  $(':checked').each(function() {
  	data['tags[]'].push($(this).val());
  });

  $("#posts").load("/wp-content/themes/daladevelop.se/apps/get_posts.php", data);
  $("#posts").animate({opacity: 1});
  $("#posts").css("background-color: transparent;");
}