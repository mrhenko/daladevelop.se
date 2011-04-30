<?php get_header(); ?>

<header id="branding">
	<h1><?php bloginfo('title'); ?></h1>
</header>

<nav id="main-menu">
	<?php wp_nav_menu(array('container' => false)); ?>
</nav>

<section id="wrapper">

<!-- BEGIN TEST //spektre -->
<h1>Testar</h1>
<p>
<li>
<ul>
<?php wp_tag_cloud('number=0'); ?>
</ul>
</li>
</p>
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
