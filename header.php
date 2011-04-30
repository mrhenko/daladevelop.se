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
	
	<!--[if lte IE 7]>
		<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/styles/ie7.css" media="screen" type="text/css" />
	<![endif]-->
	
	<!--[if lt IE 7]>
		<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/styles/ie6.css" media="screen" type="text/css" />
	<![endif]-->
</head>

<body <?php body_class(); ?>>