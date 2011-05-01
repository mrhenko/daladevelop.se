var timer;

(function ($) { 
	$(document).ready(function() {
		// Hijack links and load via ajax
		$('body').not(".current_page_item").delegate('li.ddajax a', 'click', function(event) {
			event.preventDefault();
			
			var url = $(this).attr('href') + ' #wrapper article';
			
			$('body').append('<div id="tempload" class="hidden"></div>');
			$('#tempload').load(url, function() {
				$('div#tempload').children('article').addClass('new');
				var newpage = $('div#tempload').html();
                $('#wrapper').children('article').animate({left:"500px"},{ duration: "slow" });

				$('#wrapper').children('article').addClass('hidden old').removeClass('current');
                $('#wrapper').append(newpage);
                $('#wrapper article.new').removeClass('hidden').removeClass('new');

				$(this).remove();
			});
		});

    // Load blog posts when tag checkboxes are clicked
    $('#tag_form').delegate('#tag_box', 'change', function(event) {
      clearTimeout(timer);
      timer=setTimeout("post_tag_form()", 2000);
    });
  });
})(jQuery)

function post_tag_form() {
  var data = { 'tags[]': [] };
  $(':checked').each(function() {
      data['tags[]'].push($(this).val());
  });

  $("#post_div").load("wp-content/themes/daladevelop.se/apps/get_posts.php",
      data);
}
function show_tags() {
}
