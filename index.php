<?php get_header(); ?>

<section id="wrapper">

<!-- BEGIN TEST //spektre -->
<section id="tagcloud">
	<h1>Testar</h1>
	<?php
		$tags = get_tags();
		echo '<ul>';
		foreach($tags as $tag)
		{
			echo '<li><input type="checkbox" id="'.$tag->slug.'" name="'.$tag->slug.'" value="'.$tag->name.'" /><label for="'.$tag->slug.'">'.$tag->name.'</label></li>';
		}
		echo '</ul>';
	?>
</section>
<!-- END TEST -->

<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
	<?php global $post; ?>
    <article <?php post_class(); ?> id="page-<?php echo $post->post_name; ?>">
        <header><h2><?php the_title(); ?></h2></header>
        <?php the_content(); ?>
    </article>
<?php endwhile; endif; ?>
</section>

<?php get_footer(); ?>
