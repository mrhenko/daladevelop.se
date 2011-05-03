    <?php global $post; ?>
        <article <?php post_class(); ?> id="page-<?php echo $post->post_name; ?>" style="background-image: url(<?PHP echo get_post_meta($post->ID, 'dd_post_background', TRUE);?>);">
        <header class="post-header">
            <?php if( has_post_thumbnail()): ?>
                <?php the_post_thumbnail();  ?>
            <?php endif; ?>
            <h1><?php the_title(); ?></h1>
        </header>
        <?php the_content(); ?>
    
    </article>
