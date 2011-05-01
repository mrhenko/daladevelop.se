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

<?php get_template_part('loop', 'index'); ?>

<?php get_footer(); ?>
