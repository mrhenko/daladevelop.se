    <?php global $post; ?>
    <article <?php post_class(); ?> id="page-<?php echo $post->post_name; ?>" style="background-image: url(<?PHP echo get_post_meta($post->ID, 'dd_post_background', TRUE);?>);">
        <header><h2><?php the_title(); ?></h2></header>
        <?php the_content(); ?>
    
    </article>
