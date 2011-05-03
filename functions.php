<?php
	add_action('init', 'daladevelop_init');
    add_theme_support('menus');
    add_theme_support('post-thumbnails');
    add_image_size( 'headerimg', 940, 276 );

	/*
		Initialize stylesheets and scripts.
	*/	
	function daladevelop_init() {
		if(!is_admin()) { // Enqueue stylsheets and scripts if frontend
			wp_enqueue_script('script',  get_bloginfo('template_directory') . '/scripts/script.js');
			wp_enqueue_script('jquery-history', get_bloginfo('template_directory') . '/scripts/jquery.history.js');
			
			//wp_enqueue_style('inuit', get_bloginfo('template_directory') . '/styles/inuit.css', array(), '1.0', 'all');
			wp_enqueue_style('style', get_bloginfo('template_directory') . '/styles/screen.css','', '1.0', 'screen');
			
			wp_enqueue_style('ajax-slider', get_bloginfo('template_directory') . '/styles/ajax-slider.css');
			wp_enqueue_style('print', get_bloginfo('template_directory') . '/styles/print.css', '', '1.0', 'print');
        }
        else
        {
            wp_enqueue_script('script', get_bloginfo('template_directory') .  '/scripts/upload.js');
        }
		
		if (!is_page() || is_single()) {
		  // Here be blog code
		}
	}


    /////////////////////////////////////// Attach background image to Post /////

    //Hooka in en funktion för att skapa en box
    add_action('admin_init','dd_add_custom_box',1);

    //gör något med det som fylls i boxen när det sparas
    add_action('save_post','dd_save_post');
    add_filter( 'attachment_fields_to_edit', 'add_video_img', 20, 2 );

    function add_video_img($fields, $post ) {

        $id = (int) $post->ID;
        $button .= '<a data-id="' . $id . '" rel="'. wp_get_attachment_thumb_url($id) .'" class="button-primary ps-custom-media" href="#">Använd som bakgrund till sida</a>';

        $fields['image-size']['extra_rows']['ps_img_knapp']['html'] = $button;


        return $fields;
    }
    
    function dd_add_custom_box()
    {
        add_meta_box(
            'dd_sectionid',
            __('Bakgrundsbild till posten','dd_textdomain'),
            'dd_inner_custom_box',
            'post'
        );   
        add_meta_box(
            'dd_sectionid',
            __('Bakgrundsbild till posten','dd_textdomain'),
            'dd_inner_custom_box',
            'page'
        );
    }

    function dd_inner_custom_box()
    {
        global $post;

        //Använd nonce för att verifiera
        wp_nonce_field( plugin_basename(__FILE__), 'ddplugin_noncename' );

        // Fälten att fylla i

        $dd_post_background = get_post_meta($post->ID,'dd_post_background');
        if(count($dd_post_background))
            $text =  $dd_post_background[0];  
        else
            $text = '';
        echo '<input type="text" name="dd_background" id="dd_background" value="'.$text.'"><br/>';
           
        echo " <a href=\"\" id=\"ddAddBackground\">Lägg till en bakgrund</a><br/><br/>";
         echo "<img alt=\"Bild preview\" id=\"bild_img\" src=\"$text\">";
    }

    function dd_save_post()
    {
        global $post;
        //verifiera att informationen vi fått faktiskt kommer våran plugin och är ordentligt auktoriserad

        if( !wp_verify_nonce( $_POST['ddplugin_noncename'],plugin_basename(__FILE__) ) )
            return $post_id;

        //Vi kollar också om det är en autosave
        if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE )
            return $post_id;

        //kolla rättigheter
        if( 'page' == $_POST['post_type'] )
        {
            if( !current_user_can('edit_page',$post_id ) )
                return $post_id;
        }
        else
        {
            if( !current_user_can('edit_post',$post_id ) )
                return $post_id;

        }
        
        //OK allt verkar vara okej. Nu sparar vi helt enkelt bara datat!

        $ddBackground = $_POST['dd_background'];
        system('echo \'bakgrund: '.$ddBackground.'\' | tee -a  pelle.pelle');
        update_post_meta($post->ID, 'dd_post_background',$ddBackground);

        return TRUE; 
    }


?>


