<?php get_header(); ?>

<section id="wrapper">

<!-- BEGIN TEST //spektre -->
<h1>Testar</h1>
<?php
$tags = get_tags();
foreach($tags as $tag)
{
  echo '<input type="checkbox" id="'.$tag->slug.'" name="'.$tag->slug.'" value="'.$tag->name.'">'.$tag->name.'</input>';
}
?>
<h1>Sluttestat</h1>
<!-- END TEST -->

<?php get_template_part('loop', 'index'); ?>

<?php get_footer(); ?>
