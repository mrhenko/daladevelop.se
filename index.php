<?php get_header(); ?>

<header id="branding">
	<h1><?php bloginfo('title'); ?></h1>
</header>

<nav id="main-menu">
	<?php wp_nav_menu(); ?>
</nav>

<section id="wrapper">
<?php if ( have_posts() ) : ?>
	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>
		<?php global $post; ?>
		<article <?php post_class(); ?> id="page-<?php echo $post->post_name; ?>">
			<header><h2><?php the_title(); ?></h2></header>
			<?php the_content(); ?>
		</article>
	<?php endwhile; ?>
<?php endif; ?>
</section>

<?php get_footer(); ?>