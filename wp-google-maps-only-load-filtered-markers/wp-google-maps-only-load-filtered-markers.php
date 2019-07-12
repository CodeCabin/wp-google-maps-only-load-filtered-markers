<?php
/*
Plugin Name: WP Google Maps - Only Load Filtered Markers
Description: Prevents the map from loading any markers outside the searched radius. Please note this plugin is not compatible with the marker listing feature. Requires WP Google Maps 8.0.0 and Pro 8.0.0 or above.
Version: 1.0
*/

add_action('wp_enqueue_scripts', function() {
	
	$scriptLoader	= new WPGMZA\ScriptLoader(true);
	$scripts		= $scriptLoader->getPluginScripts();
	$dependencies	= array_keys($scripts);
	
	wp_enqueue_script('wpgmza-only-load-filtered-markers', plugin_dir_url(__FILE__) . 'wp-google-maps-only-load-filtered-markers.js', $dependencies);
	
});


