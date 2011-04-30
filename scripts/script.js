(function ($) { 
	$(document).ready(function() {
		// Hijack links and load via ajax
		$('a').click(function(event) {
			event.preventDefault();
			var url = $(this).attr('href');
			url = url + ' #wrapper article';
			$('body').append('<div id="tempload" class="hidden"></div>');
			$('#tempload').load(url, function() {
				var newpage = $('div#tempload').html();
				$('#wrapper').children('article').addClass('hidden');
				$('#wrapper').append(newpage);
				$(this).remove();
			});
		});
	});
})(jQuery)