<!DOCTYPE html>

<html class="no-js">

<head>
	<meta charset="UTF-8" />
	<title><?php bloginfo('title') ?></title>
</head>

<header id="branding">
	<h1><?php bloginfo('title'); ?></h1>
</header>

<section id="wrapper">
<?php if ( have_posts() ) : ?>
	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>
		<article>
			<header><h2><?php the_title(); ?></h2></header>
			<?php the_content(); ?>
		</article>
	<?php endwhile; ?>
<?php endif; ?>
</section>

</html>