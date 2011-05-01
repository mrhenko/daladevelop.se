<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
    include("loopMarkup.php");
<?php endwhile; endif; ?>
