<?php
	$username = 'mrhenko';
	// Set Gravatar url
	$url = 'http://en.gravatar.com/' . $username . '.json';
			
	// Let's curl
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_URL, $url);
			
	$data = curl_exec($curl);
	curl_close($curl);
			
	// Decode
	$response = json_decode($data);
?>
<!DOCTYPE html>

<html>

<head>
	<meta charset="UTF-8" />
	<title>Test av Gravatars API</title>
	<link rel="stylesheet" href="styles/style.css" />
</head>

<body>

<div class="vcard">
	<?php	
		foreach ($response->entry as $entry) {
			$myemail = '';
			foreach ($entry->emails as $email) {
				if ($email->primary) {
					$myemail = $email->value;
					break;
				}
			}
			echo '<span class="fn">' . $entry->name->formatted . '</span>
			<a href="mailto:' . $myemail. '" class="email">' . $myemail . '</a>
			<span class="adr">' . $entry->currentLocation . '</span>
			<div>
				<p>' . $entry->displayName . '</p>
				<p>' . $entry->aboutMe . '</p>
			</div>';
			
			echo '<ul class="services">';
			
			foreach ($entry->accounts as $service) {
				echo '<li class="'.$service->shortname.'"><a href="'.$service->url.'">'.$service->domain.' ('.$service->display.')</a></li>';
			}
			
			echo '</ul>';
			
		}
	?>
</div>

<script src="scripts/core.js">
</script>
<script>
	jQuery(document).ready(function() {
		$('.services li').each(function() {
			var licontent = $(this).html();
			var liclass = $(this).attr('class');
			var letter ="";
			switch(liclass) {
				case 'twitter':
					letter = 't';
					break;
				case 'myspace':
					letter = 'm';
					break;
				case 'linkedin':
					letter = 'i';
					break;
				case 'flickr':
					letter = 'c';
					break;
				case 'wordpress':
					letter = 'w';
					break;
				case 'vimeo':
					letter = 'v';
					break;
			}
			
			licontent = '<span>' + letter + '</span> ' + licontent;
			
			$(this).html(licontent);
		});
	});
</script>

</body>

</html>