<?php
# This does not work, not the right way to do it... Needs fixin'
#require('/var/www/wordpress/wp-includes/query.php');

print_r($_POST['tags']);

$tag_string = 'tag=';
foreach ($_POST['tags'] as $tag_slug) {
  $tag_string .= $tag_slug . ',';
}

$query = new WP_Query($tag_string);

echo '<ul>';
while ($query->have_posts()) : $query->the_post();
  echo '<li>';
  the_title();
  the_content();
  echo '</li>';
endwhile;
echo '</ul>';

wp_reset_postdata();
?>
