<?php
/**
 * Plugin Name:       Vibemap Blocks
 * Description:       Draft blocks for Vibemap listings, events and maps scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Vibemap, Inc.
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       test-block
 *
 * @package           create-block
 */


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_test_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}

defined( 'ABSPATH' ) || exit;

require plugin_dir_path( __FILE__ ) . 'build/blocks/01-basic-esnext/index.php';
require plugin_dir_path( __FILE__ ) . 'build/blocks/02-single-post/index.php';
require plugin_dir_path( __FILE__ ) . 'build/blocks/03-vibemap-map-embed/index.php';
require plugin_dir_path( __FILE__ ) . 'build/blocks/04-vibemap-map-mini/index.php';
require plugin_dir_path( __FILE__ ) . 'build/blocks/05-vibemap-embed-events/index.php';
require plugin_dir_path( __FILE__ ) . 'build/blocks/06-vibemap-add-event/index.php';

add_action( 'init', 'create_block_test_block_block_init' );
