(function ($) { 
	$(document).ready(function() {
		// Hijack links and load via ajax
		$('body').delegate('li.ddajax a', 'click', function(event) {
			//show_ajax_loading();
			event.preventDefault();
			
			var url = $(this).attr('href') + ' #wrapper article';
			
			$('body').append('<div id="tempload" class="hidden"></div>');
			$('#tempload').load(url, function() {
				$('div#tempload').children('article').addClass('new');
				var newpage = $('div#tempload').html();
				$('#wrapper').children('article').addClass('hidden old').removeClass('current');
				$('#wrapper').append(newpage);
				$('#wrapper article.new').removeClass('hidden').removeClass('new');
				$(this).remove();
				//hide_ajax_loading();
			});
		});
	});
})(jQuery)

function show_tags() {
}

function show_ajax_loading() {
	$('body').append('<div id="dd_ajax_loading"><p>Laddar...</p><span id="dd_ajax_loading_one"></span><span id="dd_ajax_loading_two"></span><span id="dd_ajax_loading_three"></span><span id="dd_ajax_loading_four"></span></div>');
	var t = setTimeout($('#dd_ajax_loading span').addClass('filled'), 1000);
}

function hide_ajax_loading() {
	$('#dd_ajax_loading').remove();
}