<?php
<<<<<<< HEAD
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
=======
    print_r($_POST);
    require("../../../../wp-load.php"); // startup the wordpress instance

    //THIS IS ONLY A TEST
    //THIS TEST SHOULD BE SWITCHED TO THE SCRIPT THAT BUILDS UP THE QUERY STRING DEPENDING ON WHAT IS SENT FROM FORM.
    $tags = "cat=1";
    foreach($_POST as $tag)
    {
        $tags .= "&tag=$tag";
    }

    //END OF TEST


    //custom query
   query_posts($tags); 

    //the loop
    get_template_part('loop','index');
    
>>>>>>> 9e8ab9845cc736a1841c038f9f27ea375be368cd
?>
