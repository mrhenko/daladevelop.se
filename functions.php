<?php
	add_action('init', 'daladevelop_init');
    add_theme_support('menus');

	/*
		Initialize stylesheets and scripts.
	*/	
	function daladevelop_init() {
		if(!is_admin()) { // Enqueue stylsheets and scripts if frontend
			wp_enqueue_script('script',  get_bloginfo('template_directory') . '/scripts/script.js');
			//wp_enqueue_style('inuit', get_bloginfo('template_directory') . '/styles/inuit.css', array(), '1.0', 'all');
			
			wp_enqueue_style('style', get_bloginfo('template_directory') . '/styles/screen.css','', '1.0', 'screen');
			
			wp_enqueue_style('ajax-slider', get_bloginfo('template_directory') . '/styles/ajax-slider.css');
			wp_enqueue_style('print', get_bloginfo('template_directory') . '/styles/print.css', '', '1.0', 'print');
        }
		
		if (!is_page() || is_single()) {
		  // Here be blog code
		}
	}
?>
