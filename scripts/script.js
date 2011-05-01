(function ($) { 
	$(document).ready(function() {
		// Hijack links and load via ajax
		$('#wrapper').delegate('li.ddajax a', 'click', function(event) {
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
			});
		});
	});
})(jQuery)

function show_tags() {
}
