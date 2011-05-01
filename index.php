<?php get_header(); ?>

<section id="wrapper">

<!-- BEGIN TEST //spektre -->
<h1>Testar</h1>
<div id="post_div" name="post_div">
</div>
<form id="tag_form", name="tag_form" method="post">
<?php
$tags = get_tags();
foreach($tags as $tag)
{
  echo '<input type="checkbox" id="tag_box" name="tag_box" value="'.$tag->slug.'">'.$tag->name.'</input>';
}
?>
</form>
<h1>Sluttestat</h1>
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
