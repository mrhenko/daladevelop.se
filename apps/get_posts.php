<?php
require("../../../../wp-load.php"); // startup the wordpress instance

$tag_string = 'tag=';
foreach ($_POST['tags'] as $tag_slug) {
  $tag_string .= $tag_slug . ',';
}

$query = new WP_Query($tag_string);
echo '<ul>';
while ($query->have_posts()) : $query->the_post();
/*echo '<li>';
  the_title();
  the_content();
  echo '</li>'; */
include("../includes/loopMarkup.php");
endwhile;
echo '</ul>';


//get_template_part('loop','index');
?>
