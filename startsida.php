<?php
/*
Template Name: Startsida
 */

get_header(); ?>

<section id="wrapper">
    <div id="startstor">
        <?php 
        $query = array(
            'post__in'=>get_option('sticky_posts')
        );
        query_posts($query);
        $counter = 0;
        while ( have_posts() ) : the_post(); ?>
        <?php if($counter++ == 0):?>
            <?php if(has_post_thumbnail()): ?>
                <?php the_post_thumbnail('biggie'); ?>
            <?php endif; ?>
            <div class="startingress">
                <?php the_excerpt(); ?>
            </div>
        </div>
    <?php else: ?> 

        <div class="startright">
            <?php if(has_post_thumbnail()): ?>
                <?php the_post_thumbnail('smallie'); ?>
            <?php endif; ?>
            <div class="startingress">
            <?php the_excerpt(); ?>
            </div>
    </div>
    <?php endif; ?>

    <?php endwhile; ?>
    </div>
</section>
