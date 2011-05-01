<?php
    print_r($_POST);
    require("../../../../wp-load.php"); // startup the wordpress instance

    //THIS IS ONLY A TEST
    //THIS TEST SHOULD BE SWITCHED TO THE SCRIPT THAT BUILDS UP THE QUERY STRING DEPENDING ON WHAT IS SENT FROM FORM.
    $tags = "cat=1";
    foreach($_POST as $tag)
    {
        $tags .= "&tag=$tag";
    }

    //END OF TEST


    //custom query
   query_posts($tags); 

    //the loop
    get_template_part('loop','index');
    
?>
