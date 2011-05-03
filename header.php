<!DOCTYPE html>

<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width" />
	
	<title><?php bloginfo('name'); ?></title>
	
	<link href="favicon.ico" type="image/x-icon" rel="icon" />
	<link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
	<script type="text/javascript">
		if(typeof jQuery == 'undefined') { document.write(unescape("%3Cscript src='<?php bloginfo('template_directory'); ?>/scripts/jquery.min.js' type='text/javascript'%3E%3C/script%3E")); }
	</script>
	
	<?php wp_head(); ?>
	
	<!--[if lt IE 9]>
		<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/scripts/html5.js"></script>
	<![endif]-->
	
	<!--[if lte IE 7]>
		<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/styles/ie7.css" media="screen" type="text/css" />
	<![endif]-->
</head>

<body <?php body_class(); ?>>
	<header id="branding">
		<h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('title'); ?></a></h1>
	</header>
	
	<nav id="main-menu">
		<?php wp_nav_menu(array('container' => false)); ?>
    </nav>
