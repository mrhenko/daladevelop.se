<?php get_header(); ?>

<section id="wrapper">

<!-- Show all available tags here -->
<section id="tagcloud">
<?php
# Get all available tags from wordpress
$tags = get_tags();


# Print a checkbox for each tag
echo '<ul>';
foreach($tags as $tag) {
  echo '<li>'.
    '<input type="checkbox" id="tag_box" name="tag_box" '.
        'value="'.$tag->slug.'" />'.
    '<label for="'.$tag->slug.'">'.$tag->name.'</label>'.
  '</li>';
}
echo '</ul>';
?>
</section>


<!-- Put all selected blog posts in this div -->
<section id="article">
    <?php get_template_part('loop', 'index'); ?>
</section>

<?php get_footer(); ?>
