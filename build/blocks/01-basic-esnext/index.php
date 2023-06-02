<?php

/**
 * Plugin Name: Gutenberg Examples Basic EsNext
 * Plugin URI: https://github.com/WordPress/gutenberg-examples
 * Description: This is a plugin demonstrating how to register new blocks for the Gutenberg editor.
 * Version: 1.1.0
 * Author: the Gutenberg Team
 *
 * @package vibemap
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function gutenberg_example_esnext_register_block() {

	// Register the block by passing the location of block.json to register_block_type.
	register_block_type( __DIR__ );

}
add_action( 'init', 'gutenberg_example_esnext_register_block' );
