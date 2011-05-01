<?php get_header(); ?>

<section id="wrapper">

<!-- BEGIN TEST //spektre -->
<section id="tagcloud">
  <div id="post_div" name="post_div">
  </div>
	<?php
		$tags = get_tags();
		echo '<ul>';
		foreach($tags as $tag)
		{
			echo '<li><input type="checkbox" id="tag_box" name="tag_box" value="'.$tag->slug.'" /><label for="'.$tag->slug.'">'.$tag->name.'</label></li>';
		}
		echo '</ul>';
	?>
</section>
<!-- END TEST -->

<?php get_template_part('loop', 'index'); ?>

<?php get_footer(); ?>
